import { relative, resolve } from "node:path";
import type { PluginAPI, PluginToolContext } from "@ampcode/plugin";

import { defaultLinkedInVersion, LinkedInClient, LinkedInRequestError } from "./linkedin/client";

export const description =
	"Publishes this project’s explicitly confirmed personal LinkedIn image posts and first comments through LinkedIn’s supported API.";

interface PublishedRecord {
	commentId?: string;
	postUrn: string;
	publishedAt: string;
	url: string;
}

type PublishedRecords = Record<string, PublishedRecord>;

const recordsKey = "linkedinPublishedPostFingerprints";
const inFlight = new Set<string>();
const commentRecordsKey = "linkedinPublishedCommentFingerprints";
const commentsInFlight = new Set<string>();

function requiredString(input: Record<string, unknown>, key: string): string {
	const value = input[key];
	if (typeof value !== "string" || !value.trim()) throw new Error(`${key} is required.`);
	return value.trim();
}

function optionalString(input: Record<string, unknown>, key: string): string | undefined {
	const value = input[key];
	return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function client(): LinkedInClient {
	const token = process.env.LINKEDIN_ACCESS_TOKEN?.trim();
	if (!token) {
		throw new Error(
			"LINKEDIN_ACCESS_TOKEN is not configured. Add it as an Amp project secret or shell environment variable.",
		);
	}
	return new LinkedInClient(
		token,
		process.env.LINKEDIN_API_VERSION?.trim() || defaultLinkedInVersion,
	);
}

async function fingerprint(parts: readonly string[]): Promise<string> {
	const digest = await crypto.subtle.digest(
		"SHA-256",
		new TextEncoder().encode(JSON.stringify(parts)),
	);
	return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function publishedRecords(amp: PluginAPI): Promise<PublishedRecords> {
	const value = (await amp.configuration.get())[recordsKey];
	if (!value || typeof value !== "object" || Array.isArray(value)) return {};
	return value as PublishedRecords;
}

async function rememberPublished(
	amp: PluginAPI,
	key: string,
	record: PublishedRecord,
): Promise<void> {
	const records = await publishedRecords(amp);
	await amp.configuration.update({ [recordsKey]: { ...records, [key]: record } }, "global");
}

async function publishedComments(amp: PluginAPI): Promise<Record<string, string>> {
	const value = (await amp.configuration.get())[commentRecordsKey];
	if (!value || typeof value !== "object" || Array.isArray(value)) return {};
	return value as Record<string, string>;
}

async function rememberComment(amp: PluginAPI, key: string, postUrn: string): Promise<void> {
	const records = await publishedComments(amp);
	await amp.configuration.update({ [commentRecordsKey]: { ...records, [key]: postUrn } }, "global");
}

function workspacePath(amp: PluginAPI, requestedPath: string): string {
	if (!amp.system.workspaceRoot)
		throw new Error("Open a workspace before publishing a local image.");
	const root = amp.helpers.filePathFromURI(amp.system.workspaceRoot);
	const fullPath = resolve(root, requestedPath);
	const fromRoot = relative(root, fullPath);
	if (fromRoot.startsWith("..") || fromRoot === "") {
		throw new Error("imagePath must name an image file inside the current workspace.");
	}
	return fullPath;
}

async function readImage(
	amp: PluginAPI,
	requestedPath: string,
): Promise<{ bytes: Uint8Array; mimeType: string }> {
	const path = workspacePath(amp, requestedPath);
	const file = Bun.file(path);
	if (!(await file.exists())) throw new Error(`Image file does not exist: ${requestedPath}`);
	const mimeType = file.type;
	if (!["image/png", "image/jpeg", "image/gif"].includes(mimeType)) {
		throw new Error("LinkedIn images must be PNG, JPEG, or GIF files.");
	}
	return { bytes: new Uint8Array(await file.arrayBuffer()), mimeType };
}

function outcomeMessage(error: unknown): string {
	if (error instanceof LinkedInRequestError && error.outcome === "unknown") {
		return `${error.message} Inspect the LinkedIn profile before any retry.`;
	}
	return error instanceof Error ? error.message : String(error);
}

async function confirmPublish(
	ctx: PluginToolContext,
	text: string,
	firstComment: string,
	imagePath: string,
): Promise<boolean> {
	return ctx.ui.confirm({
		title: "Publish this LinkedIn post?",
		message: [text, "", `**Image:** ${imagePath}`, "", "**First comment:**", firstComment].join(
			"\n",
		),
		confirmButtonText: "Publish to LinkedIn",
	});
}

export default function linkedinPlugin(amp: PluginAPI): void {
	amp.registerTool({
		name: "linkedin_connection_status",
		description:
			"Check whether the authenticated personal LinkedIn publishing connection works. This is read-only and never returns the access token.",
		inputSchema: { type: "object", properties: {} },
		async execute() {
			try {
				const identity = await client().identity(process.env.LINKEDIN_PERSON_URN?.trim());
				return `LinkedIn connection is ready for ${identity.name ?? identity.personUrn}. API version ${process.env.LINKEDIN_API_VERSION?.trim() || defaultLinkedInVersion}.`;
			} catch (error) {
				return `LinkedIn connection is not ready: ${outcomeMessage(error)}`;
			}
		},
	});

	amp.registerTool({
		name: "linkedin_publish_image_post",
		description:
			"Publish a personal LinkedIn feed post with one workspace image and optionally add its first comment. Use only after the user has approved the exact text, image, and comment. The tool always opens a final confirmation dialog and deduplicates successful content.",
		inputSchema: {
			type: "object",
			properties: {
				text: { type: "string", description: "Exact text of the LinkedIn feed post." },
				imagePath: {
					type: "string",
					description: "Path to a PNG, JPEG, or GIF inside the current workspace.",
				},
				imageAlt: {
					type: "string",
					description: "Accessible image description, preferably under 120 characters.",
				},
				firstComment: {
					type: "string",
					description: "Exact first comment. Omit it to publish no comment.",
				},
			},
			required: ["text", "imagePath", "imageAlt"],
		},
		async execute(input, ctx) {
			let key: string | undefined;
			try {
				const text = requiredString(input, "text");
				const imagePath = requiredString(input, "imagePath");
				const imageAlt = requiredString(input, "imageAlt");
				const firstComment = optionalString(input, "firstComment") ?? "";
				if (imageAlt.length > 4086)
					throw new Error("imageAlt exceeds LinkedIn’s 4,086-character limit.");
				key = await fingerprint([text, imagePath, imageAlt, firstComment]);
				const existing = (await publishedRecords(amp))[key];
				if (existing) return `This exact LinkedIn post was already published: ${existing.url}`;
				if (inFlight.has(key))
					return "This exact LinkedIn post is already being published. Wait for that request to finish.";
				inFlight.add(key);
				if (!(await confirmPublish(ctx, text, firstComment || "(none)", imagePath))) {
					return "LinkedIn publication cancelled. Nothing was posted.";
				}
				const api = client();
				const identity = await api.identity(process.env.LINKEDIN_PERSON_URN?.trim());
				const image = await readImage(amp, imagePath);
				const imageUrn = await api.uploadImage(identity.personUrn, image.bytes, image.mimeType);
				const published = await api.createImagePost(identity.personUrn, text, imageUrn, imageAlt);
				const record: PublishedRecord = {
					postUrn: published.postUrn,
					publishedAt: new Date().toISOString(),
					url: published.url,
				};
				try {
					await rememberPublished(amp, key, record);
				} catch (error) {
					return `LinkedIn post published at ${published.url}, but its duplicate-prevention record could not be saved (${outcomeMessage(error)}). The first comment was not attempted. Do not republish the post.`;
				}
				if (!firstComment) return `LinkedIn post published: ${published.url}`;
				try {
					record.commentId = await api.createComment(
						published.postUrn,
						identity.personUrn,
						firstComment,
					);
					await rememberPublished(amp, key, record);
					return `LinkedIn post and first comment published: ${published.url}`;
				} catch (error) {
					return `LinkedIn post published at ${published.url}, but the first comment was not confirmed: ${outcomeMessage(error)}`;
				}
			} catch (error) {
				return `LinkedIn publication failed: ${outcomeMessage(error)}`;
			} finally {
				if (key) inFlight.delete(key);
			}
		},
	});

	amp.registerTool({
		name: "linkedin_add_comment",
		description:
			"Add a personal first-level comment to an existing LinkedIn post. Use to recover when a post succeeded but its intended first comment did not. Always opens a final confirmation dialog.",
		inputSchema: {
			type: "object",
			properties: {
				postUrn: { type: "string", description: "LinkedIn share or UGC post URN." },
				text: { type: "string", description: "Exact comment text." },
			},
			required: ["postUrn", "text"],
		},
		async execute(input, ctx) {
			let key: string | undefined;
			try {
				const postUrn = requiredString(input, "postUrn");
				const text = requiredString(input, "text");
				if (!/^urn:li:(share|ugcPost):[^\s]+$/.test(postUrn)) {
					throw new Error("postUrn must identify a LinkedIn share or UGC post.");
				}
				key = await fingerprint([postUrn, text]);
				if ((await publishedComments(amp))[key]) {
					return `This exact LinkedIn comment was already published on https://www.linkedin.com/feed/update/${postUrn}/`;
				}
				if (commentsInFlight.has(key)) {
					return "This exact LinkedIn comment is already being published. Wait for that request to finish.";
				}
				commentsInFlight.add(key);
				if (
					!(await ctx.ui.confirm({
						title: "Publish this LinkedIn comment?",
						message: `${text}\n\n**On:** ${postUrn}`,
						confirmButtonText: "Publish comment",
					}))
				)
					return "LinkedIn comment cancelled. Nothing was posted.";
				const api = client();
				const identity = await api.identity(process.env.LINKEDIN_PERSON_URN?.trim());
				await api.createComment(postUrn, identity.personUrn, text);
				try {
					await rememberComment(amp, key, postUrn);
				} catch (error) {
					return `LinkedIn comment published on https://www.linkedin.com/feed/update/${postUrn}/, but its duplicate-prevention record could not be saved (${outcomeMessage(error)}). Do not republish it.`;
				}
				return `LinkedIn comment published on https://www.linkedin.com/feed/update/${postUrn}/`;
			} catch (error) {
				return `LinkedIn comment failed: ${outcomeMessage(error)}`;
			} finally {
				if (key) commentsInFlight.delete(key);
			}
		},
	});
}
