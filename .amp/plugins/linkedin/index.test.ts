import { expect, test } from "bun:test";

import linkedinPlugin from "../linkedin";

test("blocks a concurrent duplicate publication while the first awaits confirmation", async () => {
	const tools = new Map<string, any>();
	let releaseConfirmation: ((value: boolean) => void) | undefined;
	let confirmations = 0;
	const amp = {
		configuration: {
			get: async () => ({}),
			update: async () => {},
		},
		helpers: { filePathFromURI: () => "/workspace" },
		registerTool(definition: any) {
			tools.set(definition.name, definition);
		},
		system: { workspaceRoot: { toString: () => "file:///workspace" } },
	} as any;
	linkedinPlugin(amp);
	const publish = tools.get("linkedin_publish_image_post");
	expect(publish).toBeDefined();
	const input = {
		text: "Exact post",
		imagePath: "cover.png",
		imageAlt: "Cover",
		firstComment: "Read it here",
	};
	const context = {
		ui: {
			confirm: () => {
				confirmations += 1;
				return new Promise<boolean>((resolve) => {
					releaseConfirmation = resolve;
				});
			},
		},
	} as any;

	const first = publish.execute(input, context);
	while (!releaseConfirmation) await Bun.sleep(0);
	const second = await publish.execute(input, context);
	expect(second).toContain("already being published");
	expect(confirmations).toBe(1);
	releaseConfirmation(false);
	expect(await first).toBe("LinkedIn publication cancelled. Nothing was posted.");
});
