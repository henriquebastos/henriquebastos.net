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

## 1 OAuth client metadata

`public/oauth/executor.json` supplies public OAuth client metadata at
`https://henriquebastos.net/oauth/executor.json`. This lets providers identify
my private Executor without public access to the service. The JSON contains no
credentials, but it discloses the internal hostname and callback URL. Keep its
`client_id` equal to the public JSON URL. Changes to `redirect_uris` change the
allowed login destinations and require security review.

Build with `pnpm build` and inspect `dist/oauth/executor.json`. After deployment,
verify HTTP 200 with JSON content, then test provider authorization. A successful
build does not prove that a provider accepts the private callback.

## Deploy

Push to `main`. GitHub Actions builds and deploys to GitHub Pages
(custom domain `henriquebastos.net` via `public/CNAME`).
