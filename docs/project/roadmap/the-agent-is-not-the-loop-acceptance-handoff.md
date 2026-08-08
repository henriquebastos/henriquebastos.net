---
level: Maintenance
status: Planned
status_reason: awaiting Navigator second pass and editorial acceptance
updated: 2026-08-08
related:
  - ../article-map.md
  - ../decisions/records/2026-08-08T0223Z-first-article-editorial-choices.md
---

# Final acceptance and map handoff for “The Agent Is Not the Loop”

## Intent

Resume the preserved working draft, obtain explicit Navigator acceptance, and
return the article's earned knowledge to the editorial map without merging,
publishing, or broadening scope automatically.

## Durable starting point

- Repository: `henriquebastos/henriquebastos.net`
- Canonical branch: `main`
- Draft: `drafts/the-agent-is-not-the-loop.md`
- Editorial state: `drafts/the-agent-is-not-the-loop.editorial-state.md`
- Map: `docs/project/article-map.md`
- Open choices:
  `docs/project/decisions/records/2026-08-08T0223Z-first-article-editorial-choices.md`

The draft and editorial-state appendix on `main` are sufficient for a successor
to resume. Conversation threads provide provenance and clarification, not the
only copy of editorial state.

Preservation branch `draft/the-agent-is-not-the-loop` at
`e83212e3ee2284de7f299201025f6f96bd19e0b9` is provenance only. Its earlier
draft revision and unrelated ancestry are superseded and must not be restored
as another working copy.

## Scope

1. Read the entire draft and editorial-state appendix.
2. Ask the Navigator where to resume; default to the recorded full second pass.
3. Resolve consequential choices one at a time using complete concrete text.
4. Run the agreed compression pass after the second pass.
5. Present full clean snapshots until the Navigator explicitly accepts one.
6. Resolve or explicitly defer every linked Open decision.
7. Only after acceptance, prepare repository-native frontmatter and a proposed
   production file.
8. Verify source claims and the rendered article.
9. Hand accepted content and map proposals back to the map context.

## Acceptance / Done Condition

Given the complete working draft, editorial-state appendix, and linked Open
choices

When the Driver presents a full final snapshot, source verification, and
repository validation evidence

Then:

- every pending choice is resolved or explicitly deferred;
- the Navigator explicitly accepts the complete article;
- accepted prose is canonicalized in the repository's post format;
- production status, date, links, and images remain honest;
- the Navigator separately authorizes any push, merge, publication, or
  deployment;
- the map handoff contains proposals rather than silently changing editorial
  direction.

Driver QA is not Navigator acceptance. A passing build does not publish the
article, and a complete draft is not an accepted article.

## Validation Route

After a production candidate exists:

1. Run `pnpm check`.
2. Run `pnpm build`.
3. Verify the expected writing route renders the complete accepted text.
4. Check title, description, publication state, links, cover image and alt
   text against the accepted artifact.
5. Inspect desktop and mobile reading flow and confirm no unintended overflow
   or console errors.
6. Recheck public claims against authoritative Petrus, Arx, and HamsterDAN
   sources as applicable.
7. Present the final artifact and evidence to the Navigator for acceptance.

## Map handoff

After explicit acceptance, report:

1. canonical article path, commit, and acceptance/publication status;
2. settled thesis and intended reader effect;
3. consequential voice and structural rulings;
4. ideas deliberately excluded to protect the article boundary;
5. claims verified with exact authoritative sources;
6. unresolved factual or editorial issues;
7. validation performed and observed results;
8. proposed map additions, removals, merges, splits, or changed relationships.

The map context reviews item 8. It does not automatically adopt those changes.

## Out of Scope

- Expanding this essay to explain all of Petrus, Petri nets, Impetus, Motus,
  Agenticus, Arx, distribution, sandboxing, or HamsterDAN.
- Selecting or drafting the next article before this handoff.
- Moving the article into `src/content/post/`, publishing, or deploying without
  explicit authorization after acceptance.
- Treating the provisional map as a promised publication plan.

## Completion record

After handoff is complete, create one milestone under
`docs/process/worklog/entries/` recording accepted state, verification,
Navigator acceptance, conscious exclusions, and the next owner/action.
