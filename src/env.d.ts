/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

/* Raw font imports handled by the vite rawFonts plugin (astro.config.ts). */
declare module "*.woff" {
	const data: Buffer;
	export default data;
}

interface ImportMetaEnv {
	readonly WEBMENTION_API_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
