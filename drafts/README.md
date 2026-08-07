# Drafts

Pre-writing for posts. Astro only builds `src/content`, so nothing here is
published. It exists to keep the working process visible and resumable.

One directory per post, named `NNN-<working-slug>`, a three-digit ordinal in
creation order, then the working slug (renamed if the final slug differs). The
ordinal keeps the directory listing chronological regardless of what the posts
end up being called. Inside, one file per stage:

| File | Holds |
|---|---|
| `01-brief.md` | Topic, audience, why, the promise, the voice. Settled before any outlining. |
| `02-outline.md` | Every node a complete sentence, never a section title. |
| `03-draft.md` | Prose, converted from the outline one top-level group at a time. |

The shape of a post follows the same arc: why someone should read this, the
problem that why connects to, the idea that solves it, then how it was actually
done.

The passes that get it there, and the conventions the outline follows, live in
[PROCESS.md](PROCESS.md).

Refinement happens in place. Git history carries the versions.
