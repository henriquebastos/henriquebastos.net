#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { basename, isAbsolute, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const PLAYWRIGHT_VERSION = "1.62.1";

const usage = `Usage: export-html.mjs <slug-or-url> [options]

Options:
  --repo <path>         Blog repository root (default: current directory)
  --base-url <url>      Running Astro origin (default: discovered blog service)
  --output-dir <path>   HTML output directory (default: .amp/in/artifacts)
  --help                Show this help
`;

function parseArgs(argv) {
	const options = { repo: process.cwd() };
	const positional = [];
	for (let i = 0; i < argv.length; i += 1) {
		const arg = argv[i];
		if (arg === "--help" || arg === "-h") {
			console.log(usage);
			process.exit(0);
		}
		if (["--repo", "--base-url", "--output-dir"].includes(arg)) {
			const value = argv[i + 1];
			if (!value) throw new Error(`${arg} requires a value`);
			options[arg.slice(2).replaceAll("-", "_")] = value;
			i += 1;
			continue;
		}
		if (arg.startsWith("--")) throw new Error(`Unknown option: ${arg}`);
		positional.push(arg);
	}
	if (positional.length !== 1) throw new Error("Provide exactly one article slug or URL");
	options.input = positional[0];
	options.repo = resolve(options.repo);
	return options;
}

function discoverBaseUrl(repo) {
	const portsFile = join(repo, ".amp", "portals", ".service-ports");
	if (existsSync(portsFile)) {
		const ports = JSON.parse(readFileSync(portsFile, "utf8"));
		if (ports.servicePorts?.blog) return `http://127.0.0.1:${ports.servicePorts.blog}`;
	}
	return "http://127.0.0.1:4321";
}

function articleTarget(input, baseUrl) {
	if (/^https?:\/\//i.test(input)) {
		const url = new URL(input);
		const parts = url.pathname.split("/").filter(Boolean);
		const writingIndex = parts.indexOf("writing");
		const slug = writingIndex >= 0 ? parts[writingIndex + 1] : parts.at(-1);
		if (!slug) throw new Error(`Could not determine an article slug from ${input}`);
		return { slug, url: url.toString() };
	}
	const slug = input.replace(/^writing\//, "").replace(/^\/+|\/+$/g, "");
	if (!slug || slug.includes("/")) throw new Error(`Invalid article slug: ${input}`);
	return { slug, url: new URL(`/writing/${slug}/`, `${baseUrl}/`).toString() };
}

function ensurePlaywright() {
	const cache = join(homedir(), ".cache", "amp", "tools", `playwright-${PLAYWRIGHT_VERSION}`);
	const packageFile = join(cache, "node_modules", "playwright", "package.json");
	if (!existsSync(packageFile)) {
		mkdirSync(cache, { recursive: true });
		console.log(`Installing Playwright ${PLAYWRIGHT_VERSION} in ${cache} ...`);
		execFileSync(
			"npm",
			[
				"install",
				`playwright@${PLAYWRIGHT_VERSION}`,
				"--prefix",
				cache,
				"--no-save",
				"--no-audit",
				"--no-fund",
			],
			{ stdio: "inherit" },
		);
	}
	return cache;
}

async function loadChromium() {
	const cache = ensurePlaywright();
	const moduleUrl = pathToFileURL(join(cache, "node_modules", "playwright", "index.mjs")).href;
	const { chromium } = await import(moduleUrl);
	if (!existsSync(chromium.executablePath())) {
		console.log("Installing Chromium in the user cache ...");
		execFileSync(
			process.execPath,
			[join(cache, "node_modules", "playwright", "cli.js"), "install", "chromium"],
			{ stdio: "inherit" },
		);
	}
	return chromium;
}

function fontData(repo, file) {
	const path = join(repo, "node_modules", "@fontsource-variable", "newsreader", "files", file);
	if (!existsSync(path)) {
		throw new Error(`Missing ${path}. Install the project dependencies before exporting.`);
	}
	return `data:font/woff2;base64,${readFileSync(path).toString("base64")}`;
}

function escapeHtml(value) {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;");
}

const articleCss = `
    :root {
      color-scheme: light;
      --ink: #202421;
      --muted: #6f746f;
      --accent: #a84b2f;
      --line: #dcded9;
      --paper: #f7f7f3;
    }
    * { box-sizing: border-box; }
    html { background: #fff; }
    body {
      margin: 0;
      color: var(--ink);
      background: #fff;
      font-family: "Newsreader Embedded", Georgia, serif;
      font-size: 20px;
      font-weight: 450;
      line-height: 1.7;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
    }
    main {
      width: min(100% - 44px, 696px);
      margin: 0 auto;
      padding: 54px 0 72px;
    }
    .draft {
      display: inline-block;
      margin-bottom: 11px;
      color: #c14a2b;
      font: 600 11px/1.4 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      letter-spacing: .08em;
      text-transform: uppercase;
    }
    h1 {
      margin: 0 0 14px;
      font-size: clamp(34px, 6vw, 50px);
      font-weight: 500;
      letter-spacing: -.022em;
      line-height: 1.08;
      text-wrap: balance;
    }
    .byline {
      margin: 0 0 30px;
      color: var(--muted);
      font-size: 18px;
      font-style: italic;
      line-height: 1.5;
    }
    .byline .sep { margin: 0 6px; color: #aaa; font-style: normal; }
    .post-tags, .post-updated {
      margin: -18px 0 28px;
      color: var(--muted);
      font: 500 11px/1.5 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      letter-spacing: .05em;
      text-transform: uppercase;
    }
    .post-tags .sep { margin: 0 5px; }
    .cover {
      display: block;
      width: 100%;
      height: auto;
      max-height: 380px;
      margin: 0 0 36px;
      object-fit: cover;
      border: 1px solid var(--line);
      border-radius: 4px;
      background: var(--paper);
    }
    article > p { margin: 0 0 24px; }
    article > p:first-of-type::first-letter {
      float: left;
      margin: 4px 10px 0 0;
      padding-top: 4px;
      color: var(--accent);
      font-size: 3.6em;
      font-style: italic;
      font-weight: 500;
      line-height: .82;
    }
    h2 {
      margin: 56px 0 20px;
      font-size: 30px;
      font-weight: 500;
      letter-spacing: -.014em;
      line-height: 1.22;
      text-wrap: balance;
    }
    h3 {
      margin: 38px 0 14px;
      font-size: 23px;
      font-style: italic;
      font-weight: 500;
      line-height: 1.3;
    }
    h4 { margin: 30px 0 12px; font-size: 20px; font-weight: 500; line-height: 1.35; }
    a {
      color: inherit;
      text-decoration-color: #999;
      text-decoration-thickness: 1px;
      text-underline-offset: 3px;
      overflow-wrap: anywhere;
    }
    a:hover { color: var(--accent); text-decoration-color: currentColor; }
    strong { font-weight: 650; }
    blockquote {
      margin: 28px 0;
      padding: 4px 0 4px 22px;
      border-left: 2px solid var(--accent);
      color: var(--muted);
      font-style: italic;
    }
    blockquote p { margin: 0 0 12px; }
    blockquote p:last-child { margin-bottom: 0; }
    blockquote p:first-of-type::first-letter { all: unset; }
    ul, ol { margin: 0 0 28px; padding-left: 24px; }
    li { margin-bottom: 8px; }
    li > p { margin: 0; }
    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: .82em;
      background: var(--paper);
      border: 1px solid var(--line);
      border-radius: 3px;
      padding: 1px 5px;
    }
    pre {
      max-width: 100%;
      margin: 28px 0;
      padding: 16px;
      overflow-x: auto;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
      background: var(--paper);
      border: 1px solid var(--line);
      border-radius: 4px;
      font-size: 15px;
      line-height: 1.6;
    }
    pre code { padding: 0; background: transparent; border: 0; font-size: inherit; }
    figure { margin: 36px 0; }
    article img, article video, article audio { display: block; max-width: 100%; height: auto; }
    figcaption { margin-top: 10px; color: var(--muted); font-size: 15px; font-style: italic; }
    table { width: 100%; margin: 28px 0; border-collapse: collapse; font-size: 16px; }
    th, td { padding: 8px 12px; border-bottom: 1px solid var(--line); text-align: left; }
    th { font-weight: 650; }
    article hr { height: 1px; margin: 40px 0; border: 0; background: var(--line); }
    footer {
      width: min(100% - 44px, 696px);
      margin: 0 auto 36px;
      padding-top: 18px;
      border-top: 1px solid var(--line);
      color: var(--muted);
      font-size: 14px;
      font-style: italic;
    }
    @media (max-width: 520px) {
      body { font-size: 18px; }
      main { width: min(100% - 32px, 696px); padding-top: 30px; }
      h1 { font-size: 34px; }
      .byline { margin-bottom: 24px; font-size: 16px; }
      .cover { margin-bottom: 28px; }
      h2 { margin-top: 44px; font-size: 26px; }
      footer { width: min(100% - 32px, 696px); }
    }
    @media print {
      body { font-size: 12pt; }
      main { width: auto; padding: 0; }
      h1 { font-size: 30pt; }
      h2 { break-after: avoid; }
      p { orphans: 3; widows: 3; }
      footer { width: auto; }
    }
`;

async function extractArticle(page) {
	return page.evaluate(async () => {
		await document.fonts.ready;
		await Promise.all(
			[...document.images].map((image) =>
				image.complete
					? undefined
					: new Promise((done) => {
							image.addEventListener("load", done, { once: true });
							image.addEventListener("error", done, { once: true });
						}),
			),
		);

		const header = document.querySelector(".post-header");
		const article = document.querySelector(".post-article");
		if (!header || !article) throw new Error("The rendered page does not contain a blog post");

		const assetToDataUrl = async (url) => {
			if (!url || url.startsWith("data:")) return url;
			const response = await fetch(url);
			if (!response.ok) throw new Error(`Could not embed ${url}: HTTP ${response.status}`);
			const blob = await response.blob();
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.addEventListener("load", () => resolve(reader.result), { once: true });
				reader.addEventListener("error", () => reject(reader.error), { once: true });
				reader.readAsDataURL(blob);
			});
		};

		const contentRoot = document.querySelector(".post-main");
		for (const image of contentRoot.querySelectorAll(".post-cover img, .post-article img")) {
			image.src = await assetToDataUrl(image.currentSrc || image.src);
			for (const attribute of ["srcset", "sizes", "loading", "decoding", "fetchpriority"])
				image.removeAttribute(attribute);
		}
		for (const media of contentRoot.querySelectorAll(".post-article video, .post-article audio")) {
			if (media.getAttribute("poster"))
				media.setAttribute("poster", await assetToDataUrl(media.poster));
			if (media.getAttribute("src")) media.src = await assetToDataUrl(media.currentSrc || media.src);
			for (const source of media.querySelectorAll("source[src]"))
				source.src = await assetToDataUrl(source.src);
		}

		const canonical = document.querySelector('link[rel="canonical"]')?.href;
		const publicOrigin = canonical ? new URL(canonical).origin : undefined;
		for (const link of article.querySelectorAll("a[href]")) {
			if (link.classList.contains("heading-anchor")) {
				link.remove();
				continue;
			}
			const href = link.getAttribute("href");
			if (!href || href.startsWith("#") || !publicOrigin) continue;
			const resolved = new URL(href, document.baseURI);
			if (resolved.origin === location.origin)
				link.href = new URL(`${resolved.pathname}${resolved.search}${resolved.hash}`, publicOrigin);
		}

		for (const element of contentRoot.querySelectorAll("*")) {
			for (const attribute of [...element.attributes]) {
				if (attribute.name.startsWith("data-astro-") || attribute.name.startsWith("data-pagefind-"))
					element.removeAttribute(attribute.name);
			}
		}

		const cover = document.querySelector(".post-cover img");
		const tags = header.querySelector(".post-tags");
		const updated = header.querySelector(".post-updated");
		return {
			title: header.querySelector(".post-title")?.textContent?.trim() || document.title,
			titleHtml: header.querySelector(".post-title")?.innerHTML || document.title,
			bylineHtml: header.querySelector(".byline")?.innerHTML || "",
			draft: Boolean(header.querySelector(".draft-flag")),
			tagsHtml: tags?.outerHTML || "",
			updatedHtml: updated?.outerHTML || "",
			coverHtml: cover
				? `<img class="cover" src="${cover.src}" alt="${cover.alt.replaceAll("&", "&amp;").replaceAll('"', "&quot;")}">`
				: "",
			articleHtml: article.innerHTML,
			author: document.querySelector('meta[name="author"]')?.content || "Henrique Bastos",
			language: document.documentElement.lang || "en-US",
		};
	});
}

function renderHtml(article, normalFont, italicFont) {
	const footer = article.draft
		? `${escapeHtml(article.author)} · Draft for review`
		: escapeHtml(article.author);
	return `<!doctype html>
<html lang="${escapeHtml(article.language)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(article.title)}</title>
  <style>
    @font-face {
      font-family: "Newsreader Embedded";
      src: url("${normalFont}") format("woff2");
      font-style: normal;
      font-weight: 200 800;
      font-display: swap;
    }
    @font-face {
      font-family: "Newsreader Embedded";
      src: url("${italicFont}") format("woff2");
      font-style: italic;
      font-weight: 200 800;
      font-display: swap;
    }
${articleCss}
  </style>
</head>
<body>
  <main>
    <header>
      ${article.draft ? '<span class="draft">(Draft)</span>' : ""}
      <h1>${article.titleHtml}</h1>
      <p class="byline">${article.bylineHtml}</p>
      ${article.tagsHtml}
      ${article.updatedHtml}
      ${article.coverHtml}
    </header>
    <article>${article.articleHtml}</article>
  </main>
  <footer>${footer}</footer>
</body>
</html>
`;
}

async function verifyOffline(browser, outputFile) {
	const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
	const page = await context.newPage();
	const networkRequests = [];
	page.on("request", (request) => {
		if (!request.url().startsWith("file:") && !request.url().startsWith("data:"))
			networkRequests.push(request.url());
	});
	await page.goto(pathToFileURL(outputFile).href, { waitUntil: "load" });
	await page.evaluate(() => document.fonts.ready);
	for (const width of [1280, 390]) {
		await page.setViewportSize({ width, height: 900 });
		const state = await page.evaluate(() => ({
			overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
			brokenImages: [...document.images].filter((image) => !image.complete || image.naturalWidth === 0)
				.length,
		}));
		if (state.overflow > 1) throw new Error(`${width}px layout overflows by ${state.overflow}px`);
		if (state.brokenImages) throw new Error(`${state.brokenImages} embedded image(s) failed to load`);
	}
	await context.close();
	if (networkRequests.length)
		throw new Error(`Offline verification made network requests:\n${networkRequests.join("\n")}`);
}

async function main() {
	const options = parseArgs(process.argv.slice(2));
	const baseUrl = options.base_url || process.env.ARTICLE_EXPORT_BASE_URL || discoverBaseUrl(options.repo);
	const target = articleTarget(options.input, baseUrl);
	const outputDir = options.output_dir
		? isAbsolute(options.output_dir)
			? options.output_dir
			: resolve(options.repo, options.output_dir)
		: join(options.repo, ".amp", "in", "artifacts");
	const outputFile = join(outputDir, `${basename(target.slug)}.html`);

	const response = await fetch(target.url).catch((error) => {
		throw new Error(
			`Could not reach ${target.url}. Start the blog with "amp orb services ensure".\n${error.message}`,
		);
	});
	if (!response.ok) throw new Error(`Could not render ${target.url}: HTTP ${response.status}`);

	const chromium = await loadChromium();
	const browser = await chromium.launch({ headless: true });
	try {
		const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
		await page.goto(target.url, { waitUntil: "networkidle" });
		const article = await extractArticle(page);
		const normalFont = fontData(options.repo, "newsreader-latin-wght-normal.woff2");
		const italicFont = fontData(options.repo, "newsreader-latin-wght-italic.woff2");
		mkdirSync(outputDir, { recursive: true });
		writeFileSync(outputFile, renderHtml(article, normalFont, italicFont));
		await verifyOffline(browser, outputFile);
	} finally {
		await browser.close();
	}

	console.log(`Exported ${target.slug}`);
	console.log(pathToFileURL(outputFile).href);
}

main().catch((error) => {
	console.error(`Export failed: ${error.message}`);
	process.exitCode = 1;
});
