# AGENTS.md

Henrique's personal blog. Astro, posts in `src/content/post/<slug>.md` with a
co-located cover image. Routes in `src/pages` and assets in `public` are also
published. Drafts in `drafts/` are not published unless a route imports them.

## Writing

Pre-writing lives in `drafts/`, one directory per post. Read
[drafts/PROCESS.md](drafts/PROCESS.md) before touching a draft: it holds the
passes, the failure modes, and the outline conventions. Read
[drafts/README.md](drafts/README.md) for the directory layout.

## Personal Vault app pages

The standalone app pages live in `src/pages/apps/personal-vault/` and use
`src/layouts/PersonalVault.astro`. Keep them out of blog navigation, article
collections, feeds, the sitemap, and Pagefind. They remain directly accessible
for Google OAuth review, without `noindex` or crawler blocking.

Keep Google data practices accurate in the privacy page. Do not import the
blog's analytics-enabled layout into these pages. After changes, run
`pnpm build && node scripts/check-personal-vault.mjs`. The check verifies the
built routes, logo, policy links, and exclusions from blog discovery.

## Voice

These apply to everything written here, posts and drafts alike.

**Not teaching, sharing.** A post reports what Henrique does for himself. First
person, descriptive rather than prescriptive, no "you should." Design decisions
are told as choices he made, with the alternative he rejected. Failure modes
stay in, because a share that only reports what worked is a pitch.

**No em-dashes.** They read as a tell that a machine wrote the text, which
undercuts a post whose credibility rests on being a first-hand account. Use a
colon when the second clause explains the first, a period when it can stand
alone, parentheses for a true aside. Do not mechanically swap every em-dash for
a comma; that produces comma splices.

**No disclaimers.** A post is a perspective offered, not a claim defended, and
the reader is expected to come and visit the experience. Hedges like "that is a
short track record and I am not claiming durability from it" protect the writer
from a grading that is not happening. State it and move on. Approximating a
real quantity ("roughly ninety thousand cards") is accuracy, not hedging.
Naming a genuine limit ("it is not a product, fork it") is a stance, not a
disclaimer.

**Humor is wanted.** Propose wordplay and cultural references rather than
defaulting to plain informative prose. English is not Henrique's first
language, so he cannot always tell what lands and falls back to being
informative with short sentences. That fallback is understatement, which is the
dominant humor register in English essay writing and a genuine strength, so
keep it as the baseline. Offer the louder version when one exists and let him
judge it. Say plainly whether a reference is universally safe or regionally
narrow, since that is the specific thing he cannot check.

**American spelling.** `organize`, `recognize`, `behavior`.

## Memory

Orbital supplies `ORBITAL_ORB_NAME` to repository hooks. `.agents/resume` leaves
service startup to portal demand when that marker is present; without the marker,
it retains the Amp service-ensure behavior.

Anything an agent learns about working on this repo belongs in this file or in
`drafts/PROCESS.md`, committed. Per-project agent memory is an index into the
repo, never the only copy: a memory entry points at the file and section that
holds the real content. If a rule exists only in memory, it is not yet written
down.
