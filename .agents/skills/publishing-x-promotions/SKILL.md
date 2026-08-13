---
name: publishing-x-promotions
description: Publishes approved blog promotion posts with cover images and first replies to Henrique's personal X account through xurl. Use when drafting, checking, publishing, or recovering an X promotion for an article in this repository.
compatibility: Requires xurl 1.3.1 and four X OAuth 1.0a credentials as Amp project secrets.
---

# Publishing X Promotions

Use the repository's promotion record and pinned official xurl client to
publish to `@henriquebastos`.

## Source of truth

1. Read `drafts/PROCESS.md`, especially **Promotion**.
2. Find the article's `drafts/<post>/05-promotion.md`.
3. Treat that file as the source for the article URL, cover path, cover alt,
   exact X text, first reply, approval status, and published URLs.
4. If the file does not exist, create it using the layout in `drafts/README.md`.

Draft curiosity-first copy that establishes the problem and surprise without
spending the article's reveal. Save proposals in `05-promotion.md`. Drafting is
not permission to publish.

## Approval boundary

Require explicit approval of the exact bundle before publishing:

- post text and paragraph breaks
- cover image
- cover alt text
- first reply text, including the article URL

If any part changes after approval, obtain approval again. Never infer approval
from discussion of what the post should eventually contain.

## Authentication and identity gate

Require these Amp project secrets without printing their values, lengths,
prefixes, suffixes, hashes, or Authorization headers:

- `X_CONSUMER_KEY`
- `X_CONSUMER_SECRET`
- `X_ACCESS_TOKEN`
- `X_ACCESS_TOKEN_SECRET`

Use OAuth 1.0a. Do not use xurl 1.3.1's built-in OAuth 2 login because it asks
for unrelated permissions. Project secrets added or replaced after an orb
started require a fresh orb.

Configure xurl in an isolated temporary `HOME`, keep shell tracing off, set
`NO_COLOR=1`, and securely remove the temporary directory when done. Before any
mutation, make a signed GET to `/2/users/me`. Continue only if it resolves to
Henrique Bastos, `@henriquebastos`, user ID `14227855`.

Never use xurl's verbose output. It can expose the OAuth Authorization header
and mixes diagnostics into stdout.

## Publish

1. Re-read the exact approved bundle from `05-promotion.md`.
2. Validate that the cover exists and is an X-supported image within the API's
   size limit.
3. Upload it with `xurl media upload --auth oauth1 <cover>`.
4. Require exit status zero. xurl 1.3.1 prints a JSON object followed by the
   labeled line `Media uploaded successfully! Media ID: <id>`. Do not parse the
   whole output as JSON. Extract exactly one final ID from that labeled line and
   require it to match `^[0-9]{1,19}$`.
5. Add the exact approved alt text before posting:

   ```json
   {"id":"<id>","metadata":{"alt_text":{"text":"<alt>"}}}
   ```

   Send it with OAuth 1.0a to `POST /2/media/metadata`. Require a successful,
   parseable JSON response before continuing.
6. Create the main post with `xurl post <text> --auth oauth1 --media-id <id>`.
   Successful non-verbose output is one JSON object. Save and validate
   `.data.id` as a numeric string before attempting the reply.
7. Create the first reply with
   `xurl reply <main-id> <reply-text> --auth oauth1`. Save and validate its
   `.data.id`.
8. Construct canonical URLs as
   `https://x.com/henriquebastos/status/<id>`.

## Uncertain outcomes

Post and reply creation are non-idempotent. Never blindly repeat a create call
after a network interruption, tool failure, or unparseable response. Use a
read-only timeline or post lookup to determine whether the exact text exists.
If the main post exists but its reply definitively failed, preserve the main
post and retry only the reply after explicit approval. Never delete and recreate
the main post as recovery.

An uploaded image without a post is an unattached media asset, not public feed
content. It can be left to expire, but the next upload must still use the known
xurl output parser.

## Record the result

After both creations succeed, update the X section of `05-promotion.md`:

- set `Status: published`
- add the canonical main post URL
- add the canonical first reply URL

Do not commit or push unless Henrique asks.
