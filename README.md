# henriquebastos.net

Personal site built with [Astro](https://astro.build/), using the
[astro-sienna](https://github.com/AnjayGoel/astro-sienna) theme.

## Local development

Requires Node 22 (see `.nvmrc`) and [pnpm](https://pnpm.io/).

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

Output goes to `dist/` (includes the Pagefind search index).

## Content

- Posts: `src/content/post/*.md` — served at `/writing/<slug>/`
- About: `src/content/page/about.md`
- Site config & profile: `src/site.config.ts`

## Deploy

Push to `main`. GitHub Actions builds and deploys to GitHub Pages
(custom domain `henriquebastos.net` via `public/CNAME`).
