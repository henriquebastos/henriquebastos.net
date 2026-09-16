// Run after pnpm build. Check public routes and exclusion from blog discovery.
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { gunzipSync } from "node:zlib";
import sharp from "sharp";

const root = new URL("../dist/", import.meta.url);
const base = (process.env.BASE_PATH || "/").replace(/\/$/, "");
const appPath = `${base}/apps/personal-vault/`;
const pages = ["", "privacy/", "terms/"];

for (const page of pages) {
	const html = await readFile(new URL(`apps/personal-vault/${page}index.html`, root), "utf8");
	assert.match(html, /<h1[\s>]/, `Missing heading: ${page}`);
	assert.match(
		html,
		/data-pagefind-ignore=(?:"all"|'all'|all)/,
		`Search exclusion missing: ${page}`,
	);
	assert.doesNotMatch(
		html,
		/googletagmanager\.com|google-analytics\.com|gc\.zgo\.at\/count\.js/i,
		`Unexpected analytics loader: ${page}`,
	);
	assert.doesNotMatch(html, /noindex/i, `Crawler exclusion: ${page}`);
	assert.match(html, /mailto:henrique@bastos.net/, `Contact missing: ${page}`);
	assert.ok(
		html.includes(`https://henriquebastos.net${appPath}${page}`),
		`Canonical URL missing: ${page}`,
	);
	const links = [...html.matchAll(/<a\b[^>]*\bhref=(?:"([^"]+)"|'([^']+)'|([^\s>]+))/g)].map(
		(match) => match[1] ?? match[2] ?? match[3],
	);
	for (const destination of pages) {
		assert.ok(
			links.includes(`${appPath}${destination}`),
			`App navigation missing: ${page} -> ${destination}`,
		);
	}
}

async function filesUnder(directory) {
	const files = [];
	for (const entry of await readdir(directory, { withFileTypes: true })) {
		const path = join(directory, entry.name);
		if (entry.isDirectory()) files.push(...(await filesUnder(path)));
		else files.push(path);
	}
	return files;
}

const files = await filesUnder(root.pathname);
for (const path of files) {
	if (path.endsWith(".html") && !path.includes("/apps/personal-vault/")) {
		assert.ok(
			!(await readFile(path, "utf8")).includes("/apps/personal-vault"),
			`Blog links to app: ${path}`,
		);
	}
	if (path.endsWith(".xml")) {
		assert.ok(
			!(await readFile(path, "utf8")).includes("/apps/personal-vault"),
			`Feed or sitemap lists app: ${path}`,
		);
	}
}

const fragments = files.filter((path) => path.endsWith(".pf_fragment"));
assert.ok(fragments.length > 0, "Pagefind index missing. Run the postbuild script.");
for (const path of fragments) {
	const decoded = gunzipSync(await readFile(path)).toString("utf8");
	assert.ok(decoded.startsWith("pagefind_dcd"), `Unexpected Pagefind format: ${path}`);
	const fragment = JSON.parse(decoded.slice("pagefind_dcd".length));
	assert.ok(!fragment.url.includes("/apps/personal-vault"), `Search indexes app: ${fragment.url}`);
}

const robots = await readFile(new URL("robots.txt", root), "utf8");
assert.match(robots, /Allow: \/(?:\s|$)/);
assert.doesNotMatch(robots, /Disallow:\s*\/(?:apps(?:\/personal-vault)?\/?|)\s*$/m);
const logoPath = new URL("apps/personal-vault/logo-120.png", root);
const logo = await readFile(logoPath);
const metadata = await sharp(logo).metadata();
assert.equal(metadata.format, "png");
assert.equal(metadata.width, 120);
assert.equal(metadata.height, 120);
assert.ok(logo.byteLength < 1_000_000);
console.log(
	`Personal Vault checks passed: 3 routes, public access metadata, logo, blog links, feeds, sitemap, and ${fragments.length} search fragments.`,
);
