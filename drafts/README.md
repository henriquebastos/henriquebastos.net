# Drafts

Pre-writing for posts. Astro only builds `src/content`, so nothing here is
published. It exists to keep the working process visible and resumable.

One directory per post, named `NNN-<working-slug>`, a three-digit ordinal in
creation order, then the working slug (renamed if the final slug differs). The
ordinal keeps the directory listing chronological regardless of what the posts
end up being called. Inside, one file owns the current state of each stage:

| File                  | Holds                                                                                              |
| --------------------- | -------------------------------------------------------------------------------------------------- |
| `00-notes.md`         | First-hand source material and durable decisions carried into the brief.                           |
| `00-*-transcript.md`  | A large independent source worth preserving verbatim.                                              |
| `01-brief.md`         | Topic, audience, why, promise, voice, and deliberate boundaries.                                   |
| `02-outline.md`       | The compact argument plan.                                                                         |
| `02-graph.md`         | An optional canonical claim graph when dependencies are genuinely non-linear.                      |
| `02-reading-order.md` | The compact rhetorical projection selected from a graph. Omit it when the outline already does it. |
| `03-draft.md`         | The complete working draft before it moves into `src/content`.                                     |
| `04-retrospective.md` | Evidence about what the process cost, what worked, and what changes next time.                     |
| `05-promotion.md`     | Promotion copy, links, assets, approval, and publication status.                                   |

After a complete draft moves into `src/content`, that source post owns all
further prose edits and `03-draft.md` remains the pre-review baseline. The
retrospective can close the writing process while the source post is still a
draft. Promotion can be prepared at that point too, but each file must state
clearly what remains unapproved or unpublished.

The shape of a post usually follows the same arc: why someone should read it,
the problem or tension that why connects to, the idea or possibility it opens,
then its mechanics, consequences, or what it makes imaginable.

The process and its optional graph boundary live in [PROCESS.md](PROCESS.md).

Knowledge is cumulative; files are not. Refine each stage in place and let Git
carry its versions. Create two files at one stage only when Henrique explicitly
wants to compare alternatives side by side. Once he chooses, keep the winner as
the active file and leave the rejected route in Git history.

Audits, diffs, and review reports are temporary views. A decision that changes
the reusable process belongs in `PROCESS.md`; a prose edit belongs in the
draft's Git diff, not in another Markdown record.
