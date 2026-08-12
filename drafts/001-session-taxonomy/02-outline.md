# Outline: session taxonomy

Every node is a complete sentence stating the information of its level, never a
section title.

Addressing follows the post's own grammar: node number, group letter, item
number. `6c2` is node 6, group c, item 2. Groups exist so items can cluster
without adding a level, so a group is a move in the argument, gets its own
sentence, and every item under it must serve that sentence.

No em-dashes anywhere in this project.

Nodes are units of argument, not headings. How many of them get a visible
heading in the finished post is a separate decision, made during prose.

Sort order is settled: it does not matter in practice, so the post does not sell
it as a benefit. Only 6a4 mentions it, to explain why zero-padding was skipped.

---

## 1. I run many agent sessions in parallel, each one spawning more, and within a single day I open one and genuinely cannot tell what it is.

**1a. The volume is what sets it up.**
- 1a1. I run many sessions in parallel, and each one spawns children that carry their own worktrees and their own follow-on work.
- 1a2. At around 20 sessions and 30 worktrees, the names are the only thing I have to go on.

**1b. The names tell me nothing, and the failure lands the same day rather than weeks later.**
- 1b1. Four session titles share the prefix "Build & publish…", and worktree directories arrive as `goofy-mclaren-e45a74`.
- 1b2. I open one, read its name, and still have to go digging to find out what it is.

## 2. This is a naming problem, and naming is hard for a reason older than software: the name has to be chosen before anyone knows what the thing will become.

**2a. My culture names at birth, and other cultures wait until there is something to name.**
- 2a1. I named my daughters before they were born, for people nobody had met, and they carry those names for life.
- 2a2. Other cultures wait, and the name is earned in adolescence from something the person did or something they carry, conferred by the group that watched it happen.
- 2a3. A name given at the start is an intention, and a name earned later is a description.

## 3. Agent sessions are the worst case for naming, and everything wrong with how the tools manage them follows from that.

**3a. A session is named at birth, by a machine, at the least informed moment in its life.**
- 3a1. The app writes each title from the first message, which states an intention rather than what the work turned into.
- 3a2. Unlike a baby, a session keeps turning into something else while it runs, which is what makes it the worse case rather than the same case.
- 3a3. Writing a better first message does not help, because the context that would make the name right does not exist yet.

## 4. So I stopped trying to name and changed what the identifier carries, because a description says what a thing is while a coordinate says where and when it is.

**4a. Where and when are both knowable on day one, which is exactly what a name is not.**
- 4a1. Where means which thread this belongs to and what it descends from.
- 4a2. When means creation order, since IDs are minted in sequence and never reused.
- 4a3. Both are true the instant the session exists, which is why they can be recorded then and a name cannot.

**4b. The flip is that I can place a session among the others without knowing what it is.**
- 4b1. Knowing how it relates to the others is enough, so identifying it is no longer a precondition for navigating.
- 4b2. This is what made dozens of parallel sessions manageable rather than merely labelled.

**4c. The structure was always there, and the coordinates are what finally display it.**
- 4c1. The work was always a tree, since each session spawns children.
- 4c2. Nothing displayed it as one, and no name could have.
- 4c3. The coordinates do, which is the reversal the whole convention buys.

## 5. Luhmann's Zettelkasten is the proven implementation of that idea, so I applied his numbering to sessions and worktrees instead of index cards.

**5a. The method comes from someone whose output is the evidence that it works.**
- 5a1. Niklas Luhmann was a German sociologist who published some 70 books and 400 articles, and attributed that output to the paper card index he kept beside him for decades rather than to himself.
- 5a2. He ran roughly 90,000 cards this way without a database, which is why I trust the method further than anything I would invent myself.

**5b. His numbering put lineage inside the identifier, which is what removes the need for a registry.**
- 5b1. He numbered cards so that `21` branches to `21a`, which branches to `21a1`, while `22` is a sibling of `21`.
- 5b2. Because the ID encodes its parent, no separate registry is needed to know where a card came from.

**5c. The transfer to sessions is exact, and it costs nothing to adopt.**
- 5c1. A session is a card and a spawned session is a branch.
- 5c2. There is nothing to install, because the entire mechanism is a rule about what to type into a name field.

## 6. The convention is an ID grammar that alternates numbers and letters, carried in the two namespaces I fully own and nowhere else.

**6a. The grammar alternates numbers and letters so that any ID parses into a tree without a lookup.**
- 6a1. An unbounded number at top level, then alternating letters and numbers with no zero-padding: `12` → `12a` → `12a3`.
- 6a2. A parent ending in a digit gets letter children, and a parent ending in a letter gets number children.
- 6a3. Digit-to-letter boundaries self-delimit, so any tool can reconstruct the whole tree with one regex.
- 6a4. I skipped zero-padding on purpose, because the ID is for identity and lineage rather than sort order.

**6b. A session title is the ID followed by prose.**
- 6b1. The title is the ID, one space, then free prose.

**6c. A worktree directory carries the same ID, and the ID is the only part that has to match.**
- 6c1. The directory is the ID plus a kebab-cased description: `~/.worktrees/repo/21a-retry-logic`.
- 6c2. It gets renamed exactly once, because a worktree is created before its session exists and arrives with a generated random name.
- 6c3. The description trailing the ID may drift out of sync with the session title, which is fine, because the ID is what says which thread the worktree belongs to.

**6d. The ID lives only in namespaces I fully own, and it is never recycled.**
- 6d1. Branches never carry the ID and keep the company Jira convention instead, because reviewers see them and adopting this should never touch an open PR.
- 6d2. Numbers are assigned in creation order and never renumbered or reused.
- 6d3. The namespace is global across every repo, so the repo is metadata while the lineage is the ID.

**6e. Everything to this point is portable, and only what follows is specific to one tool.**
- 6e1. The convention itself is agent-agnostic, and I apply it across codex, pi, and amp as well.
- 6e2. Everything after this runs in the Claude Code desktop app, which is what I use day to day, and only the enforcement machinery is specific to it.

## 7. Three judgment calls remain that no mechanism can make, and the system survives them because the ID means exactly one thing.

**7a. Filing a node is a judgment about what the work serves, not about which window spawned it.**
- 7a1. The parent is what the work serves rather than the window that spawned it, since otherwise the tree's shape depends on which window happened to be focused.
- 7a2. I default to the spawning parent but override to the thread the work actually continues.
- 7a3. My tiebreaker is asking where I will look for this in three weeks.
- 7a4. I promote to a new top-level number when the work will outlive its parent's tree.

**7b. Getting those calls wrong is cheap, which is what makes living with the judgment tolerable.**
- 7b1. A misfiled node is still findable.
- 7b2. Refiling is a single retitle, because nothing else depends on the ID.

**7c. The ID carries lineage and nothing else, which is the decision the whole system rests on.**
- 7c1. I deliberately encode no dates, Jira IDs, or status.
- 7c2. Jira lives on the branch, status lives on the PR, and dates live in session metadata.
- 7c3. Luhmann's system worked precisely by making the number mean one thing.

## 8. Claude Code's session management is the weakest part of this, and its limitations dictated the shape of everything downstream, with each one below costing me an experiment to establish.

**8a. A session has no way to name itself, which is the single fact that forced every workaround.**
- 8a1. The rename tool rejects the current session.
- 8a2. A session cannot even discover its own registry id from the inside, since the id hooks see is a runtime UUID while the registry id is `local_<uuid>`, and `list_sessions` excludes the caller.
- 8a3. Renaming is therefore inherently a second-party act.
- 8a4. Any other session can rename it and the rename sticks, including over the app's own auto-title, and this is the only channel that works at all.

**8b. The hook that exists for naming sessions cannot name a session.**
- 8b1. The desktop app honors a SessionStart hook's `additionalContext` but silently ignores that same hook's `sessionTitle`.
- 8b2. I verified that with a sentinel token, which was delivered and echoed verbatim in the session's first reply, so the channel works and only the title field is dead.

**8c. Every obvious way around it is closed.**
- 8c1. A subagent can rename any session it can name but never its own parent, because it inherits the parent's identity and the parent is absent from its `list_sessions`.
- 8c2. An independent `claude -p --no-session-persistence` process is no help either, because the session-management server is injected only into desktop-app sessions.
- 8c3. Titles live in the app's Electron LevelDB, locked and memory-cached while it runs, so writing there directly is a corruption risk rather than an escape hatch.

**8d. Two remaining behaviors shape the design without blocking it.**
- 8d1. There is no documented way to turn the auto-titling off, which turns out not to matter because an explicit rename overrides it durably.
- 8d2. The auto-generated terminal title is a different field that these tools cannot set and that refreshes on its own.

**8e. How much of this difficulty belongs to Claude Code rather than to the problem is still open.**
- 8e1. I intend to build the same system on the other agents I use, and I do not expect it to be this hard elsewhere.

## 9. I mint IDs by scanning what already exists rather than counting from memory, which is only possible because sessions are never deleted and therefore act as the registry.

**9a. The archive can serve as the registry only because I turned retention up.**
- 9a1. I set `cleanupPeriodDays` to 36500 because Claude Code offers no way to simply turn session deletion off, which still baffles me given that the archive is the only durable record of what I have done.

**9b. Minting is a scan, and doing it from memory collides silently.**
- 9b1. Minting means scanning existing session titles plus worktree directory names, taking the max, and adding one.
- 9b2. Deriving an ID from my own memory of what children exist collides silently, because children also get created by hand outside any spawn I remember.
- 9b3. `mint.sh` implements this with titles piped in on stdin and worktree directories scanned automatically, giving the next top-level number with no arguments and the next child with `--parent 10d`.
- 9b4. Minting is a script rather than a judgment call, on the principle that code answers anything code can answer.

**9c. Only local sessions may originate a top-level number.**
- 9c1. Cloud sessions can carry IDs, but their retention is not under my control.

## 10. Because none of those limits can be removed, I aimed at easy correction instead of prevention, and three paths keep the convention true.

**10a. Prevention was never on the table.**
- 10a1. The harness auto-generates a name before any convention gets a say.

**10b. In the common case the parent names the child, which works because the parent is exactly the second party.**
- 10b1. The parent mints the child ID, retitles the new session immediately, and opens the child's prompt with the ID so the child knows its own coordinates.
- 10b2. That path has zero lag and needs no hooks.

**10c. A session with no parent declares its own title and waits for someone else to apply it.**
- 10c1. When the work reveals its thread, the session writes the intended title to `~/.claude/taxonomy/<runtime-session-id>` and ends that reply with a `⟦title⟧` beacon line.
- 10c2. Runtime session ids stay stable across app restarts, which is what makes them safe as marker keys.
- 10c3. The next session that starts finds the pending marker and applies it, which is the workaround for the dead `sessionTitle` field.

**10d. A janitor sweep catches what markers cannot carry.**
- 10d1. The `/taxonomy` sweep handles worktree renames, grammar violations, duplicate IDs, stale worktree pins, and cloud strays.
- 10d2. Nothing runs on every turn, and the only standing mechanism is one instruction injected at session start.

## 11. The whole system is five files, and the expensive part was adopting it over existing work, because session metadata lies about where the work actually lives.

**11a. The machinery is five files.**
- 11a1. `AGENTS.md` holds the contract and loads in every session, `SKILL.md` holds the janitor procedure, `mint.sh` does the scanning, `taxonomy-title.sh` injects the marker chore at SessionStart, and `settings.json` registers that hook.

**11b. Reproducing it is four steps, and retention comes first.**
- 11b1. Raise `cleanupPeriodDays` before anything else, because the entire no-registry design rests on sessions never being deleted.
- 11b2. Then put the convention in the global instructions file, add `mint.sh`, register the hook, and write the janitor skill.

**11c. Adopting it over existing work goes rescue, then retitle, then rename, and the rescue is not optional.**
- 11c1. Every worktree needs auditing for unpushed commits and dirty files before anything is touched.
- 11c2. Four worktrees that looked dead held 36, 21, 14, and 8 unpushed commits.

**11d. Session metadata is not evidence of where the work lives.**
- 11d1. Several sessions ran in one worktree while committing in another.
- 11d2. Ranking vehicles by session recency gave eight PR-carrying worktrees a `-prev` suffix while empty scaffolds took the canonical names.
- 11d3. I check `git rev-list --count origin/main..HEAD` before deciding which worktree is the real one.
- 11d4. Session metadata can point at a worktree that was deleted outside git, so it has to be verified against `git worktree list`.

**11e. Renaming a worktree costs more than the rename.**
- 11e1. Renames go through `git worktree move` and never `mv`.
- 11e2. The harness does not follow moves, so live sessions pinned to a moved worktree need re-pinning and any sandbox keyed by worktree name has to be recreated.

## 12. Living with it, I navigate by the ID and reach for the description only when I want context, which is the reversal that tells me it works.

**12a. The sidebar became legible without the titles getting any better written.**
- 12a1. The descriptions are no better than what the app was generating; what changed is that lineage is now visible in the list.
- 12a2. I orient by scanning IDs rather than by reading titles.
- 12a3. The description is still there and I reach for it when I want context, but it is no longer how I find anything.

**12b. The failure that opened this stopped, though it has not been long.**
- 12b1. Opening a session and not knowing what it is has not happened since I adopted the convention.
- 12b2. It has been one day, which is a real result and not yet evidence of durability.
