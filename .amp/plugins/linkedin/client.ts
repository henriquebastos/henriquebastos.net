export const defaultLinkedInVersion = "202607";

type Fetch = typeof fetch;

interface UserInfo {
	sub?: unknown;
	name?: unknown;
}

interface InitializeImageResponse {
	value?: {
		uploadUrl?: unknown;
		image?: unknown;
	};
}

export interface LinkedInIdentity {
	name?: string;
	personUrn: `urn:li:person:${string}`;
}

export interface PublishedPost {
	postUrn: string;
	url: string;
}

export class LinkedInRequestError extends Error {
	constructor(
		message: string,
		readonly outcome: "rejected" | "unknown",
		readonly status?: number,
	) {
		super(message);
		this.name = "LinkedInRequestError";
	}
}

function responseDetail(body: string): string {
	const normalized = body.replace(/\s+/g, " ").trim();
	return normalized ? `: ${normalized.slice(0, 500)}` : "";
}

function memberPostUrl(postUrn: string): string {
	return `https://www.linkedin.com/feed/update/${postUrn}/`;
}

export class LinkedInClient {
	constructor(
		private readonly accessToken: string,
		private readonly version = defaultLinkedInVersion,
		private readonly request: Fetch = fetch,
	) {}

	private apiHeaders(contentType = "application/json"): Headers {
		return new Headers({
			Authorization: `Bearer ${this.accessToken}`,
			"Content-Type": contentType,
			"LinkedIn-Version": this.version,
			"X-Restli-Protocol-Version": "2.0.0",
		});
	}

	private async apiRequest(
		url: string,
		init: RequestInit,
		operation: string,
		mutating = false,
	): Promise<Response> {
		let response: Response;
		try {
			response = await this.request(url, init);
		} catch (error) {
			const detail = error instanceof Error ? error.message : String(error);
			throw new LinkedInRequestError(
				`${operation} did not return a response (${detail}). ${mutating ? "Its outcome is unknown; do not retry blindly." : "No result was received."}`,
				mutating ? "unknown" : "rejected",
			);
		}
		if (!response.ok) {
			const body = await response.text();
			throw new LinkedInRequestError(
				`${operation} failed with HTTP ${response.status}${responseDetail(body)}`,
				response.status >= 500 && mutating ? "unknown" : "rejected",
				response.status,
			);
		}
		return response;
	}

	async identity(configuredPersonUrn?: string): Promise<LinkedInIdentity> {
		if (configuredPersonUrn) {
			if (!/^urn:li:person:[^\s]+$/.test(configuredPersonUrn)) {
				throw new Error("LINKEDIN_PERSON_URN must use the form urn:li:person:<id>.");
			}
			return { personUrn: configuredPersonUrn as `urn:li:person:${string}` };
		}
		const response = await this.apiRequest(
			"https://api.linkedin.com/v2/userinfo",
			{ headers: this.apiHeaders(), method: "GET" },
			"LinkedIn identity lookup",
		);
		const body = (await response.json()) as UserInfo;
		if (typeof body.sub !== "string" || !body.sub.trim()) {
			throw new Error("LinkedIn identity response did not contain a member ID.");
		}
		return {
			name: typeof body.name === "string" ? body.name : undefined,
			personUrn: `urn:li:person:${body.sub}`,
		};
	}

	async uploadImage(owner: string, image: Uint8Array, mimeType: string): Promise<string> {
		const initialized = await this.apiRequest(
			"https://api.linkedin.com/rest/images?action=initializeUpload",
			{
				body: JSON.stringify({ initializeUploadRequest: { owner } }),
				headers: this.apiHeaders(),
				method: "POST",
			},
			"LinkedIn image initialization",
		);
		const body = (await initialized.json()) as InitializeImageResponse;
		const uploadUrl = body.value?.uploadUrl;
		const imageUrn = body.value?.image;
		if (typeof uploadUrl !== "string" || typeof imageUrn !== "string") {
			throw new Error("LinkedIn image initialization returned an invalid upload target.");
		}
		await this.apiRequest(
			uploadUrl,
			{
				body: image,
				headers: new Headers({
					Authorization: `Bearer ${this.accessToken}`,
					"Content-Type": mimeType,
				}),
				method: "PUT",
			},
			"LinkedIn image upload",
		);
		return imageUrn;
	}

	async createImagePost(
		author: string,
		commentary: string,
		imageUrn: string,
		altText: string,
	): Promise<PublishedPost> {
		const response = await this.apiRequest(
			"https://api.linkedin.com/rest/posts",
			{
				body: JSON.stringify({
					author,
					commentary,
					visibility: "PUBLIC",
					distribution: {
						feedDistribution: "MAIN_FEED",
						targetEntities: [],
						thirdPartyDistributionChannels: [],
					},
					content: { media: { altText, id: imageUrn } },
					lifecycleState: "PUBLISHED",
					isReshareDisabledByAuthor: false,
				}),
				headers: this.apiHeaders(),
				method: "POST",
			},
			"LinkedIn post creation",
			true,
		);
		const postUrn = response.headers.get("x-restli-id");
		if (!postUrn) {
			throw new LinkedInRequestError(
				"LinkedIn created the post but did not return its ID. The post may be live; do not retry.",
				"unknown",
				response.status,
			);
		}
		return { postUrn, url: memberPostUrl(postUrn) };
	}

	async createComment(postUrn: string, actor: string, text: string): Promise<string | undefined> {
		const response = await this.apiRequest(
			`https://api.linkedin.com/rest/socialActions/${encodeURIComponent(postUrn)}/comments`,
			{
				body: JSON.stringify({ actor, object: postUrn, message: { text } }),
				headers: this.apiHeaders(),
				method: "POST",
			},
			"LinkedIn comment creation",
			true,
		);
		return response.headers.get("x-restli-id") ?? undefined;
	}
}
