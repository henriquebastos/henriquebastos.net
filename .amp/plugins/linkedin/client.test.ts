import { describe, expect, test } from "bun:test";

import { LinkedInClient, type LinkedInRequestError } from "./client";

function mockFetch(
	responses: Array<Response | Error>,
	calls: Array<{ input: string; init?: RequestInit }>,
): typeof fetch {
	return (async (input, init) => {
		calls.push({ input: String(input), init });
		const response = responses.shift();
		if (!response) throw new Error("Unexpected request");
		if (response instanceof Error) throw response;
		return response;
	}) as typeof fetch;
}

describe("LinkedInClient", () => {
	test("derives a person URN from OpenID userinfo", async () => {
		const calls: Array<{ input: string; init?: RequestInit }> = [];
		const client = new LinkedInClient(
			"token",
			"202607",
			mockFetch([Response.json({ sub: "member-id", name: "Henrique" })], calls),
		);
		expect(await client.identity()).toEqual({
			name: "Henrique",
			personUrn: "urn:li:person:member-id",
		});
		expect(calls[0]?.input).toBe("https://api.linkedin.com/v2/userinfo");
		expect(new Headers(calls[0]?.init?.headers).get("authorization")).toBe("Bearer token");
	});

	test("uploads an image and creates a member post with accessible alt text", async () => {
		const calls: Array<{ input: string; init?: RequestInit }> = [];
		const responses = [
			Response.json({
				value: { uploadUrl: "https://upload.test/image", image: "urn:li:image:cover" },
			}),
			new Response(null, { status: 201 }),
			new Response(null, { status: 201, headers: { "x-restli-id": "urn:li:share:123" } }),
		];
		const client = new LinkedInClient("token", "202607", mockFetch(responses, calls));
		const imageUrn = await client.uploadImage(
			"urn:li:person:member",
			new Uint8Array([1, 2]),
			"image/png",
		);
		expect(imageUrn).toBe("urn:li:image:cover");
		const post = await client.createImagePost(
			"urn:li:person:member",
			"Post text",
			imageUrn,
			"Cover alt",
		);
		expect(post).toEqual({
			postUrn: "urn:li:share:123",
			url: "https://www.linkedin.com/feed/update/urn:li:share:123/",
		});
		expect(calls.map((call) => [call.input, call.init?.method])).toEqual([
			["https://api.linkedin.com/rest/images?action=initializeUpload", "POST"],
			["https://upload.test/image", "PUT"],
			["https://api.linkedin.com/rest/posts", "POST"],
		]);
		const body = JSON.parse(String(calls[2]?.init?.body));
		expect(body.content.media).toEqual({ altText: "Cover alt", id: "urn:li:image:cover" });
		expect(body.author).toBe("urn:li:person:member");
	});

	test("creates a first-level comment against the returned post URN", async () => {
		const calls: Array<{ input: string; init?: RequestInit }> = [];
		const client = new LinkedInClient(
			"token",
			"202607",
			mockFetch([new Response("{}", { status: 201, headers: { "x-restli-id": "456" } })], calls),
		);
		expect(
			await client.createComment("urn:li:share:123", "urn:li:person:member", "Read it here"),
		).toBe("456");
		expect(calls[0]?.input).toBe(
			"https://api.linkedin.com/rest/socialActions/urn%3Ali%3Ashare%3A123/comments",
		);
		expect(JSON.parse(String(calls[0]?.init?.body))).toEqual({
			actor: "urn:li:person:member",
			object: "urn:li:share:123",
			message: { text: "Read it here" },
		});
	});

	test("does not retry a post when the response outcome is unknown", async () => {
		const calls: Array<{ input: string; init?: RequestInit }> = [];
		const client = new LinkedInClient(
			"token",
			"202607",
			mockFetch([new Error("connection reset")], calls),
		);
		await expect(
			client.createImagePost("urn:li:person:member", "Post", "urn:li:image:cover", "Alt"),
		).rejects.toMatchObject({ outcome: "unknown" } satisfies Partial<LinkedInRequestError>);
		expect(calls).toHaveLength(1);
	});
});
