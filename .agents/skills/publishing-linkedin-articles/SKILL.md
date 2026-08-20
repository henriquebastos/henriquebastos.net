---
name: publishing-linkedin-articles
description: Reproduces a selected blog post in LinkedIn's native Article editor with its cover, headings, links, and formatting, then leaves it as a private draft. Use when preparing or reviewing a LinkedIn Article from this repository.
---

# Publishing LinkedIn Articles

Reproduce an accepted blog post in LinkedIn's native Article editor and stop at
the saved-draft boundary. The browser workflow uses a local rendered copy only
as a rich-clipboard source. Henrique reviews and publishes inside LinkedIn.

## Boundaries

LinkedIn does not provide a member Article publishing API. Browser automation
is unsupported and may violate LinkedIn's automated-activity policy. Confirm
that Henrique wants browser automation before its first use in a new thread.

Creating or updating the requested private draft is authorized. Clicking
**Next**, **Schedule**, **Publish**, or another control that makes content
public requires separate explicit approval. Never infer publication approval
from approval to prepare, reproduce, preview, or review an Article.

Avoid duplicate drafts. When LinkedIn already has a draft with the exact title,
continue that draft instead of creating another one. Stop when a mutation has
an unknown outcome and inspect LinkedIn's drafts before retrying it.

## Authentication and public-repository safety

Keep all browser credentials and state outside this repository:

- Do not commit cookies, cURL requests, storage state, credentials, browser
  profiles, encryption keys, or screenshots containing account data.
- Do not put `li_at` or a complete Cookie header in an Amp project secret. It
  is a bearer credential equivalent to an authenticated LinkedIn session, and
  copied cookie snapshots may be rejected after a device or IP transition.
- Use a dedicated persistent Chrome profile on Henrique's machine. The default
  path is `${HOME}/.linkedin-article-browser`; override it with
  `LINKEDIN_BROWSER_PROFILE`. Restrict the directory to its owner.
- Authorize once by signing into LinkedIn interactively in that exact profile.
  Do not import cookies from another browser. Later runs reuse the profile's
  native cookie store.

A browser profile is machine-local. If the current executor is an Amp orb and
does not already have an authenticated dedicated profile, use Henrique's live
local runner or ask him to start the workflow there. Do not substitute a remote
cookie export. The public repository contains only this workflow and the
content it already publishes.

The workflow accepts both published posts and posts marked `draft: true`. That
flag keeps a post out of the built site, but it does not make source committed
to this public Git repository private.

Initialize the browser consistently:

```bash
SESSION="$(agent-browser session id --scope worktree --prefix linkedin-article)"
PROFILE="${LINKEDIN_BROWSER_PROFILE:-$HOME/.linkedin-article-browser}"
mkdir -p "$PROFILE"
chmod 700 "$PROFILE"
export AGENT_BROWSER_SESSION="$SESSION"
export AGENT_BROWSER_PROFILE="$PROFILE"
export AGENT_BROWSER_HEADED=true
```

For first authorization, start it headed on Henrique's machine and open
`https://www.linkedin.com/in/me/`. Henrique signs in himself. Never request or
type his password or one-time code. Before every draft mutation, open that URL
and require all of these facts:

- the page remains on `linkedin.com`, not a login, auth wall, or checkpoint
- the profile resolves to **Henrique Bastos**
- no account challenge is visible

If authentication fails, stop. Do not loop requests, replay a cookie snapshot,
or continue in an unidentified account.

## Source of truth

1. Read `drafts/PROCESS.md`, especially **Rendered review and publishing** and
   **Promotion**.
2. Resolve the selected article to `src/content/post/<slug>.md`.
3. Read its corresponding `drafts/<post>/05-promotion.md` when one exists.
4. Use the source post's exact title, rendered body, cover, and cover alt text.
   Do not copy the site byline, publication date, tags, or draft marker into the
   LinkedIn body.
5. Append an end note only when `05-promotion.md` specifies its exact text and
   URL. Draft preparation is not approval to change the article.

Ask a focused question when the selected article or an end-note value is
ambiguous. A private LinkedIn draft may reproduce an unpublished blog draft
when Henrique requests that exact rehearsal.

## Prepare the rich source

Invoke the bundled generator from the repository root:

```bash
node .agents/skills/publishing-linkedin-articles/scripts/prepare-linkedin-article.mjs <slug> \
  --end-note-text '<exact text>' \
  --end-note-url '<exact URL>' \
  --feed-introduction '<exact introduction, when one exists>'
```

It renders the real Astro page through the existing blog exporter and writes
`.amp/in/artifacts/<slug>-linkedin.html`. The generated page never connects to
LinkedIn. It contains controls that place the title or semantic body HTML on
the browser clipboard and expose the cover and alt text. `.amp/in/` is ignored
by Git; do not override that protection or commit the generated file.

Open the generated `file:` URL in a source tab in the authenticated browser
session. Before touching LinkedIn, inspect the source DOM and record:

- exact title and normalized body text
- ordered heading texts and levels
- ordered link texts and destinations
- cover path and alt text
- counts of headings, links, lists, blockquotes, code blocks, tables, and inline
  media

The generated body preserves headings, links, emphasis, lists, blockquotes,
dividers, and simple code markup. Any inline media, table, or code block needs
an explicit native-editor check after paste.

## Reproduce the Article in LinkedIn

Use accessibility snapshots and freshly resolved element references. Do not
hard-code LinkedIn's generated CSS class names.

1. Open LinkedIn and enter its native **Write article** flow. If LinkedIn asks
   **Publish as**, select Henrique's personal profile and an individual
   Article.
2. Inspect the available drafts before creating anything. Continue the draft
   whose title exactly matches the source, or begin one new Article.
3. Upload the source PNG as the Article cover. Use the exact alt text wherever
   LinkedIn exposes an alt-text field. Record when the editor has no such field.
4. Fill the Article title exactly.
5. In the source tab, activate **Copy formatted body**. Return to LinkedIn,
   focus the empty body editor, and paste once. Rich clipboard HTML is the
   transfer contract. Do not paste Markdown syntax or reconstruct paragraphs
   one keystroke at a time.
6. If LinkedIn strips a semantic element, repair that element with the native
   editor toolbar. For links, preserve the complete destination including UTM
   parameters.
7. Wait for LinkedIn's visible saved or draft state. Do not click **Next**.

Keep the authoring session headed through the copy and paste. If the browser
daemon resumed headless, reopen the same draft headed with the same persistent
profile before copying. A paste shortcut issued from a headless session can
report success without changing LinkedIn's editor. Inspect the body before any
retry.

If updating an existing nonempty draft, compare it with the source first. Do
not select-all and overwrite work that differs without asking Henrique.

## Verify the saved draft

Inspect the editor DOM and visible UI rather than trusting the paste action.
Require:

- exact title
- normalized body text equal to the generated source, including the end note
- the same ordered headings and heading levels (LinkedIn labels an H2 block
  **Subheading**)
- the same ordered links and complete destinations
- the expected list, blockquote, divider, code-block, table, and inline-media
  counts
- the expected cover visibly present
- LinkedIn's saved or draft indicator

Open LinkedIn's preview only if it does not cross the **Next** or publication
boundary. Check representative desktop and narrow widths when preview supports
them. Save one targeted screenshot for Henrique only when it helps review; keep
account menus and unrelated private data out of the frame.

Report the draft title, verified formatting counts, cover/alt result, and the
exact LinkedIn location Henrique should open to review it. Say explicitly that
the Article remains unpublished.

After successful verification, close the local source tab and delete the
generated HTML plus every temporary copy transferred to another runner. Keep
the dedicated browser profile: it owns the reusable authenticated session. If
verification is blocked, keep a transfer file only while investigating that
run, then delete it.

## Record publication later

Only after Henrique publishes and provides the canonical LinkedIn Article URL,
update the relevant section of `05-promotion.md` without replacing any existing
feed-post record:

- record the native Article format
- set its status to `published`
- add its canonical URL
- record that final publication was manual unless the approved action says
  otherwise

Do not claim publication from a saved draft. Do not commit or push unless
Henrique asks.
