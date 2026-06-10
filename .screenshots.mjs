import { chromium } from "playwright";
import { mkdirSync } from "fs";

const OUT = "/tmp/site-shots";
mkdirSync(OUT, { recursive: true });

const pages = [
  { name: "01-home-light", path: "/", dark: false },
  { name: "02-home-dark", path: "/", dark: true },
  { name: "03-writing-list", path: "/writing", dark: false },
  {
    name: "04-post-code-org",
    path: "/writing/the-art-of-code-organization",
    dark: false,
  },
  {
    name: "05-post-symbolic",
    path: "/writing/the-future-is-symbolic-a-providential-review",
    dark: true,
  },
  { name: "06-about", path: "/about", dark: false },
  { name: "07-search", path: "/search", dark: false },
];

const browser = await chromium.launch();
for (const p of pages) {
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    colorScheme: p.dark ? "dark" : "light",
  });
  const page = await ctx.newPage();
  await page.goto(`http://localhost:4321${p.path}`, {
    waitUntil: "networkidle",
  });
  await page.screenshot({
    path: `${OUT}/${p.name}.png`,
    fullPage: false,
  });
  await ctx.close();
  console.log(`captured ${p.name}`);
}
await browser.close();
