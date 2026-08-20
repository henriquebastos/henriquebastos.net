#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, isAbsolute, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const usage = `Usage: prepare-linkedin-article.mjs <slug> [options]

Options:
  --repo <path>                  Blog repository root (default: current directory)
  --output-dir <path>            Output directory (default: .amp/in/artifacts)
  --source-url <url>             Canonical source URL (default: blog URL for the slug)
  --end-note-text <text>         Exact linked end-note text to append to the body
  --end-note-url <url>           Exact URL for the end note
  --feed-introduction <text>     Exact feed introduction to include as a copyable field
  --help                         Show this help
`;

function parseArgs(argv) {
	const options = { repo: process.cwd() };
	const positional = [];
	for (let index = 0; index < argv.length; index += 1) {
		const argument = argv[index];
		if (argument === "--help" || argument === "-h") {
			console.log(usage);
			process.exit(0);
		}
		if (
			[
				"--repo",
				"--output-dir",
				"--source-url",
				"--end-note-text",
				"--end-note-url",
				"--feed-introduction",
			].includes(argument)
		) {
			const value = argv[index + 1];
			if (!value) throw new Error(`${argument} requires a value`);
			options[argument.slice(2).replaceAll("-", "_")] = value;
			index += 1;
			continue;
		}
		if (argument.startsWith("--")) throw new Error(`Unknown option: ${argument}`);
		positional.push(argument);
	}
	if (positional.length !== 1) throw new Error("Provide exactly one article slug");
	const slug = positional[0].replace(/^writing\//, "").replace(/^\/+|\/+$/g, "");
	if (!slug || slug.includes("/") || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
		throw new Error(`Invalid article slug: ${positional[0]}`);
	}
	if (Boolean(options.end_note_text) !== Boolean(options.end_note_url)) {
		throw new Error("--end-note-text and --end-note-url must be provided together");
	}
	return { ...options, repo: resolve(options.repo), slug };
}

function escapeHtml(value) {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;");
}

const stagingCss = `
    .publisher-tools {
      width: min(100% - 32px, 920px);
      margin: 24px auto 0;
      padding: 22px;
      border: 1px solid #cfd4cf;
      border-radius: 8px;
      color: #202421;
      background: #f7f7f3;
      font: 16px/1.5 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    .publisher-tools h2 { margin: 0 0 8px; font: 650 22px/1.25 system-ui, sans-serif; }
    .publisher-tools p { margin: 8px 0; }
    .publisher-tools a { color: #7d301d; }
    .publisher-actions { display: flex; flex-wrap: wrap; gap: 10px; margin: 18px 0 12px; }
    .publisher-actions button {
      appearance: none;
      padding: 9px 13px;
      border: 1px solid #7a7f7a;
      border-radius: 5px;
      color: #202421;
      background: #fff;
      font: 600 14px/1.2 system-ui, sans-serif;
      cursor: pointer;
    }
    .publisher-actions button:hover { border-color: #a84b2f; color: #8b3923; }
    .publisher-actions button:focus-visible { outline: 3px solid #d99a88; outline-offset: 2px; }
    .publisher-status { min-height: 24px; margin: 0; color: #436047; font-weight: 600; }
    .publisher-report { color: #5d625d; font-size: 14px; }
    .publisher-copy {
      margin: 14px 0 6px;
      padding: 14px;
      white-space: pre-wrap;
      color: #202421;
      background: #fff;
      border: 1px solid #d9ddd8;
      border-radius: 5px;
      font: 15px/1.5 system-ui, sans-serif;
    }
    @media print { .publisher-tools { display: none; } }
`;

function stagingControls(config) {
	const feedIntroduction = config.feedIntroduction
		? `
    <p><strong>Feed introduction:</strong></p>
    <pre class="publisher-copy">${escapeHtml(config.feedIntroduction)}</pre>`
		: "";
	const feedButton = config.feedIntroduction
		? '<button type="button" data-copy-feed>Copy feed introduction</button>'
		: "";
	return `
  <section class="publisher-tools" aria-labelledby="publisher-title">
    <h2 id="publisher-title">LinkedIn Article staging page</h2>
    <p>This page never connects to LinkedIn. It supplies the exact content and rich clipboard source for the native editor workflow.</p>
    <p><strong>Canonical source:</strong> <a href="${escapeHtml(config.sourceUrl)}">${escapeHtml(config.sourceUrl)}</a></p>
    ${feedIntroduction}
    <div class="publisher-actions">
      <button type="button" data-copy-title>Copy title</button>
      <button type="button" data-copy-body>Copy formatted body</button>
      <button type="button" data-download-cover>Download cover image</button>
      <button type="button" data-copy-cover-alt>Copy cover alt text</button>
      ${feedButton}
    </div>
    <p class="publisher-status" role="status" aria-live="polite"></p>
    <p class="publisher-report"></p>
  </section>`;
}

function stagingScript(config) {
	const serialized = JSON.stringify(config).replaceAll("<", "\\u003c");
	return `<script type="application/json" id="publisher-config">${serialized}</script>
<script>
  (() => {
    const config = JSON.parse(document.querySelector("#publisher-config").textContent);
    const article = document.querySelector("article");
    const cover = document.querySelector("img.cover");
    const title = document.querySelector("main h1");
    const status = document.querySelector(".publisher-status");
    const report = document.querySelector(".publisher-report");

    function setStatus(message, failed = false) {
      status.textContent = message;
      status.style.color = failed ? "#9e2f22" : "#436047";
    }

    async function copyPlainText(text, label) {
      try {
        await navigator.clipboard.writeText(text);
        setStatus(label + " copied.");
      } catch {
        setStatus("Clipboard access failed. Select and copy the content manually.", true);
      }
    }

    function cleanArticle() {
      const clone = article.cloneNode(true);
      for (const container of clone.querySelectorAll(".expressive-code")) {
        const source = container.querySelector("pre");
        if (!source) continue;
        const pre = document.createElement("pre");
        const code = document.createElement("code");
        code.textContent = source.textContent;
        pre.append(code);
        container.replaceWith(pre);
      }
      for (const unwanted of clone.querySelectorAll("script, style, button, .heading-anchor")) {
        unwanted.remove();
      }
      for (const element of clone.querySelectorAll("*")) {
        for (const attribute of [...element.attributes]) {
          if (attribute.name === "href" || attribute.name === "src" || attribute.name === "alt") continue;
          element.removeAttribute(attribute.name);
        }
      }
      return clone;
    }

    async function copyBody() {
      const clone = cleanArticle();
      const html = clone.innerHTML;
      const plain = article.innerText;
      try {
        if (!window.ClipboardItem) throw new Error("Rich clipboard is unavailable");
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": new Blob([html], { type: "text/html" }),
            "text/plain": new Blob([plain], { type: "text/plain" }),
          }),
        ]);
        setStatus("Formatted article body copied.");
      } catch {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(article);
        selection.removeAllRanges();
        selection.addRange(range);
        const copied = document.execCommand("copy");
        selection.removeAllRanges();
        setStatus(
          copied ? "Formatted article body copied." : "Clipboard access failed. Select the article body and copy it manually.",
          !copied,
        );
      }
    }

    async function downloadCover() {
      if (!cover) {
        setStatus("This article has no cover image.", true);
        return;
      }
      try {
        const response = await fetch(cover.src);
        const blob = await response.blob();
        const extension = blob.type === "image/jpeg" ? "jpg" : blob.type === "image/webp" ? "webp" : "png";
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = config.slug + "." + extension;
        link.click();
        URL.revokeObjectURL(url);
        setStatus("Cover image downloaded.");
      } catch {
        setStatus("Cover download failed. Save the displayed cover image manually.", true);
      }
    }

    const inlineMedia = article.querySelectorAll("img, video, audio, iframe").length;
    const tables = article.querySelectorAll("table").length;
    const codeBlocks = article.querySelectorAll("pre").length;
    report.textContent =
      "Manual review: " + inlineMedia + " inline media item(s), " + tables + " table(s), and " + codeBlocks +
      " code block(s). Check these in LinkedIn Preview after pasting.";

    document.querySelector("[data-copy-title]").addEventListener("click", () =>
      copyPlainText(title.textContent.trim(), "Title"),
    );
    document.querySelector("[data-copy-body]").addEventListener("click", copyBody);
    document.querySelector("[data-download-cover]").addEventListener("click", downloadCover);
    document.querySelector("[data-copy-cover-alt]").addEventListener("click", () =>
      cover ? copyPlainText(cover.alt, "Cover alt text") : setStatus("This article has no cover image.", true),
    );
    document.querySelector("[data-copy-feed]")?.addEventListener("click", () =>
      copyPlainText(config.feedIntroduction, "Feed introduction"),
    );
  })();
</script>`;
}

function addStagingUi(html, config) {
	if (
		!html.includes("</style>") ||
		!html.includes("<body>") ||
		!html.includes("</article>") ||
		!html.includes("</body>")
	) {
		throw new Error("The blog exporter returned an unexpected HTML document");
	}
	const endNote = config.endNoteText
		? `<p class="linkedin-end-note"><a href="${escapeHtml(config.endNoteUrl)}">${escapeHtml(config.endNoteText)}</a></p>`
		: "";
	return html
		.replace("</style>", `${stagingCss}\n  </style>`)
		.replace("<body>", `<body>${stagingControls(config)}`)
		.replace("</article>", `${endNote}</article>`)
		.replace("</body>", `${stagingScript(config)}\n</body>`);
}

function main() {
	const options = parseArgs(process.argv.slice(2));
	const sourcePost = join(options.repo, "src", "content", "post", `${options.slug}.md`);
	if (!existsSync(sourcePost)) throw new Error(`Article source does not exist: ${sourcePost}`);

	const exporter = join(
		options.repo,
		".agents",
		"skills",
		"exporting-blog-posts",
		"scripts",
		"export-html.mjs",
	);
	if (!existsSync(exporter)) throw new Error(`Blog exporter does not exist: ${exporter}`);

	const outputDir = options.output_dir
		? isAbsolute(options.output_dir)
			? options.output_dir
			: resolve(options.repo, options.output_dir)
		: join(options.repo, ".amp", "in", "artifacts");
	const outputFile = join(outputDir, `${basename(options.slug)}-linkedin.html`);
	const sourceUrl =
		options.source_url || `https://henriquebastos.net/writing/${encodeURIComponent(options.slug)}/`;
	for (const [label, value] of [
		["source URL", sourceUrl],
		["end-note URL", options.end_note_url],
	]) {
		if (!value) continue;
		const url = new URL(value);
		if (!/^https?:$/.test(url.protocol)) throw new Error(`${label} must use HTTP or HTTPS`);
	}
	const temporaryDirectory = mkdtempSync(join(tmpdir(), "linkedin-article-"));

	try {
		execFileSync(
			process.execPath,
			[exporter, options.slug, "--repo", options.repo, "--output-dir", temporaryDirectory],
			{ stdio: "inherit" },
		);
		const exportedFile = join(temporaryDirectory, `${basename(options.slug)}.html`);
		const prepared = addStagingUi(readFileSync(exportedFile, "utf8"), {
			endNoteText: options.end_note_text,
			endNoteUrl: options.end_note_url,
			feedIntroduction: options.feed_introduction,
			slug: options.slug,
			sourceUrl,
		});
		mkdirSync(outputDir, { recursive: true });
		writeFileSync(outputFile, prepared);
	} finally {
		rmSync(temporaryDirectory, { force: true, recursive: true });
	}

	console.log(`Prepared LinkedIn Article staging page for ${options.slug}`);
	console.log(pathToFileURL(outputFile).href);
}

try {
	main();
} catch (error) {
	console.error(`Preparation failed: ${error instanceof Error ? error.message : String(error)}`);
	process.exitCode = 1;
}
