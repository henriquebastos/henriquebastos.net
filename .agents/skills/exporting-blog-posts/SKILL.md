---
name: exporting-blog-posts
description: Exports a rendered Astro blog post as one self-contained, offline HTML file with embedded images and fonts. Use when asked to make a post downloadable or shareable without publishing it.
---

# Exporting Blog Posts

Export a rendered article from Henrique's Astro blog as a single offline HTML file. The exporter renders the
real page in Chromium, keeps the article header and body, embeds the selected image sources and
Newsreader fonts, removes scripts and site controls, and checks desktop and mobile rendering without
network access.

## Workflow

1. Work from the blog repository root. Confirm the requested slug exists under `src/content/post/`.
2. Ensure the local Astro service is available with `amp orb services ensure`. The exporter discovers
   the `blog` service port from `.amp/portals/.service-ports`.
3. Run `node scripts/export-html.mjs <slug>` from this skill's directory while passing the repository
   explicitly when it is not the current directory:

   ```bash
   node scripts/export-html.mjs the-10x-era-is-here --repo /home/user/workspace/repo
   ```

4. The output is `.amp/in/artifacts/<slug>.html`. Link that file for review or sharing.
5. Never commit the generated HTML unless the user explicitly asks. It is a review artifact, not
   published site content.

The first export in an orb installs a pinned Playwright runtime and Chromium under the user's cache,
outside the repository. Later exports reuse that installation.

## Options

```text
--repo <path>         Blog repository root. Defaults to the current directory.
--base-url <url>      Running Astro origin. Normally discovered automatically.
--output-dir <path>   Destination directory. Defaults to .amp/in/artifacts.
```

The first positional argument may also be a complete article URL. Use `--help` for command help.
