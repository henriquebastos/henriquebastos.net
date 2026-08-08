---
status: Open
raised: 2026-08-08
decided:
deciders:
  - Navigator
supersedes:
related:
  - ../../article-map.md
  - ../../roadmap/the-agent-is-not-the-loop-acceptance-handoff.md
  - ../../../../drafts/the-agent-is-not-the-loop.editorial-state.md
---

# Resolve the remaining choices for “The Agent Is Not the Loop”

## Question

Which remaining editorial and publication choices must be resolved before the
working draft can become an accepted article and return knowledge to the map?

## Decision

Pending.

The Navigator still owns these choices:

1. Complete a full second pass over the current draft.
2. Accept or revise the subsequent compression pass.
3. Decide whether the PR-readiness experiment names HamsterDAN or remains
   unnamed.
4. Decide whether “The net is the program” links to a Petri-net explainer.
5. Confirm or replace the working title “The Agent Is Not the Loop.”
6. After accepting the prose, decide title, description, publication date,
   cover image, cover alt text, and production placement.

## Rationale

The draft on `main` contains a complete skeleton and many settled rulings, but it
is explicitly not accepted. These choices affect scope, voice, factual framing,
and publication readiness. Guessing them during clean-slate preservation would
silently transfer Navigator authority to the Driver.

The canonical detailed editorial state is preserved on `main` in:

- `drafts/the-agent-is-not-the-loop.md`
- `drafts/the-agent-is-not-the-loop.editorial-state.md`

Preservation branch `draft/the-agent-is-not-the-loop` at
`e83212e3ee2284de7f299201025f6f96bd19e0b9` records the provenance of these
files. Its earlier prose revision is superseded by the current working draft
and is not a second canonical artifact.

## Options Considered

- Resume with the Navigator's second pass, then compress the accepted
  direction. This is the recorded default.
- Ask a successor Driver to compress before the Navigator returns. Rejected
  for now because it would alter an unaccepted artifact without focused
  Navigator judgment.
- Promote the current complete skeleton directly to production. Rejected
  because complete is not accepted.

## Consequences

- The draft remains outside `src/content/post/`.
- No frontmatter, fabricated date, cover, link, or publication status is added
  during preservation.
- A successor resumes from the two canonical draft files on `main` rather than depending on
  a live thread.
- Acceptance follows the linked handoff record.

## Review Trigger

Reopen when the Navigator resumes this article. Update this same record to
`Decided` when every choice is resolved or explicitly deferred.
