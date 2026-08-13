---
name: publishing-linkedin-promotions
description: Publishes approved blog promotion posts to Henrique's personal LinkedIn feed with the project-local plugin. Use when drafting, checking, publishing, or recovering a LinkedIn promotion for an article in this repository.
compatibility: Requires the project-local LinkedIn plugin and LINKEDIN_ACCESS_TOKEN as an Amp project secret.
---

# Publishing LinkedIn Promotions

Use the repository's promotion record and guarded LinkedIn plugin to publish to
Henrique's personal feed.

## Source of truth

1. Read `drafts/PROCESS.md`, especially **Promotion**.
2. Find the article's `drafts/<post>/05-promotion.md`.
3. Treat that file as the source for the article URL, cover path, cover alt,
   exact LinkedIn text, first comment, approval status, and published URL.
4. If the file does not exist, create it using the layout in `drafts/README.md`.

Draft curiosity-first copy that establishes the problem and surprise without
spending the article's reveal. Save proposals in `05-promotion.md`. Drafting is
not permission to publish.

## Approval boundary

Require explicit approval of the exact bundle before publishing:

- post text and paragraph breaks
- cover image
- cover alt text
- first comment text, including the article URL

If any part changes after approval, obtain approval again. Never infer approval
from discussion of what the post should eventually contain.

## Connection check

Call `linkedin_connection_status` before any mutation. Continue only when it
resolves to Henrique Bastos. Never print, request, or persist access tokens.

Project secrets added or replaced after an orb started require a fresh orb.

## Publish

1. Re-read the exact approved bundle from `05-promotion.md`.
2. Call `linkedin_publish_image_post` with the exact post text, workspace cover
   path, and alt text.
3. Omit `firstComment` for the current self-service app. Its
   `w_member_social` permission can create the feed post, but LinkedIn's current
   Comments API requires `w_member_social_feed`, which this app cannot obtain
   through self-service.
4. Review the plugin's final confirmation dialog and publish only if it displays
   the approved content and target.
5. Ask Henrique to add the approved first comment manually.

The plugin fingerprints successful payloads and does not retry uncertain create
requests. If it reports an uncertain outcome, inspect the LinkedIn profile
before doing anything else. Never recreate a post merely because its first
comment failed.

## Record the result

After publication, update the LinkedIn section of `05-promotion.md`:

- set `Status: published`
- add the canonical post URL
- record that the first comment was manual

Do not commit or push unless Henrique asks. This workflow creates a personal
feed post, not a native LinkedIn Article or Newsletter.
