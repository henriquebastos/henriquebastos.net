# Notes: Steering Agents Through My First macOS App

## Decisions so far

- **Angle.** The post is about the process: how Henrique steered agents through
  his first macOS app. Disk Inventory is the setting. Architecture and
  performance appear as the effect of decisions, not as a changelog.
- **No narration of code changes.** Code appears only at high level: layers,
  responsibilities, components, contracts, flows. No code listings.
- **Must include.** The layers of the application, the separation of
  responsibilities, the components of each layer, and performance evidence.
- **Content shape.** Learnings, surprises, high points, and what he could have
  done better in conducting the project. Not a faithful timeline.
- **Language.** English first. A Portuguese adaptation follows, as with 003/004.
- **Media.** His X posts (videos and images), plus new diagrams and screenshots.
- **Tokens, not dollars (29 Oct).** The recorded costs are estimates, so the
  post mentions token counts instead. Figures in "Tokens" below.
- **Build in public is in (29 Oct).** It was parked in the first brief. Henrique
  moved it into the post: the project was a satellite problem that became his
  first build-in-public experience, and this post exists to share what he
  learned from it.
- **The core is the steering strategies (29 Oct).** They hold for any
  language. Each strategy enters through a concrete scene from the session,
  never as an abstract rule. See "Steering strategies" below.

## Sources

- Build session (the real one): `~/.pi/agent/sessions/--Users-henrique-me-dotfiles--/2026-10-23T18-11-20-159Z_01a169f5-d1de-7169-ba9c-2666edb855ca.jsonl`,
  23 to 29 Oct, 125 MB. 147 user messages, 1,538 assistant messages,
  70 compactions, 13 model changes, 4 provider failovers, 123 subagent runs.
  The session Henrique first pointed to (`…01a16c13…`) is the pflow video
  session; it only touches Disk Inventory in passing.
- Repository: `~/me/open-source/disk-inventory` at `8d79931` (51 commits,
  24 to 29 Oct).
- Working research (disposable, full detail and line pointers):
  `/tmp/di-blog/notes-process.md`, `notes-architecture.md`,
  `notes-performance-history.md`, `notes-performance-bench.md`.
  Timestamps below are UTC from the session JSONL.

## X posts

| Date | Post | Media |
|---|---|---|
| 26 Oct | "Claude Design is out of this world. I'm building my first macOS app, inspired by an outdated one I loved. I shared my goals and UX ideas, built a reference package, and got an interactive mockup that lets a dev with no design skills create something slick." (`2114855561082896879`) | none |
| 26 Oct | "Claude Design helping me figure out my first macOS app. Look how cool this is. Every user scenario organized for quick comments and feedback." (`2114866444601102841`) | video 15 s |
| 26 Oct | "And the interactive mockup is absurd. All my feedback was readily available for experimentation." (`2114869040854315447`) | video 46 s |
| 26 Oct | Reply: "Disk Inventory X. Such a cool app, but it feels slow nowadays. So I am attempting to hack a very fast version with a Rust core. It is working on my machine. 😅" | none |
| 27 Oct | Reply: "I had opus 5.5 gather screenshots of my first working prototype very bad UI, screenshots of the old disk inventory, extract my design invariants, user preferences and any UX relevant information from the session building the rust core and the macos prototype." | none |
| 27 Oct | "I asked Opus to make sure our designs are aligned with Apple's style guide. The level of detail of the analysis and fixes are incredible." (`2115217453382783485`) | 3 images |
| 28 Oct | "Less than a day and I am already dog fooding my first macOs app… The Rust core is quite fast. 3.4MM files in 250Gb mapped in about 30 sec. A lot faster than the original app ux." (`2115257404783014392`) | video 48 s |
| 28 Oct | Reply: "I started the Rust core focusing on speed. The original plan was to build a CLI with export and have the agent querying the map. That worked great and was very fast. Then I asked 'what if' and started the GUI lane. Laser focus on composition pays off." | none |
| 28 Oct | "I think I am starting to get this #buildinpublic thing. Sharing incomplete work requires a healthy detachment." Replies on detachment, on product vs OSS ("I would have to learn how to build a product… that has always been my Achilles heels"). | none |

The "3.4MM files in 250Gb" figure does not appear in the session. It was his
own impression, and he undersold it. The measured full-disk scan (24 Oct) was
5,008,789 entries in 34.3 s, about 146k entries per second against the
tweet's implied 113k. Decision (29 Oct): no new real-disk measurement. The post
uses the session numbers and the fixture benchmark, and tells the tweet as a
joke on himself: he bragged, and the brag was too small. Henrique: "eu falei
isso mas na verdade eu tava errado, era melhor do que o que eu falei".
Precision for the draft: "entries" count folders as well as files, and that
scan was partial (270 access errors in protected locations, no elevation).

## The human frame (Henrique, 29 Oct)

In his words, condensed: he had a problem, a satellite one. He wanted back a
piece of software he loved, which had become slow and stuck in time. He used
it to do build in public for the first time, and it was a great experience. He
had never written anything in Rust or in Swift. The process was a process of
guiding the agent. "Eu não estou querendo dar aula de nada, eu quero falar do
que eu sei, falar do que eu aprendi, mas compartilhar o processo."

## Steering strategies (the core)

His list, in his order, with the scene that shows each one.

1. **Focus on a small problem and solve it.** The project began as "find what
   is eating my disk". The first product was a map you build once and query
   many times, then a CLI with export and no filter language. Each step
   solved the problem in front of him before the next "what if".
2. **Make estimates, measure.** "I want it to be really as fast as
   possible." Before choosing, he asked what Rust or Zig would bring over C,
   and asked for the experiment. Benchmarks: bulk collection 2.09× faster than
   per-file stat; the full disk in 35.6 s. The agent's finding: the API
   mattered more than the language.
3. **Guide the agent to discover the best way.** He did not know the answer
   and did not pretend to. He framed questions and asked for experiments, for
   reverse-engineering the installed DIX binary, for a design specialist, for
   the HIG review, for the Oracle's opinion.
4. **Let the agent walk, even in the wrong place, for a long time.** The
   inspector with async file metadata was built, tested and polished, then
   removed: "low level file information is not needed". Also the Back history,
   Open Snapshot, the SVG prototype, the DIX strip layout. His framing is a
   strategy, not a regret: building was cheap, so seeing it was the cheapest
   way to know. (Tension with "What he could have done better": the draft must
   choose one reading or show both honestly.)
5. **Ask for analyses that separate components; focus on single
   responsibility.** "we spend a lot of time clicking on things to validate
   state" started the architecture rethink: each view got its own state, one
   shared background worker, the cheapest test layer. The app model went from
   1,195 lines to 284. He steered toward a good architecture in technologies
   he had never used, by asking for the analysis and judging the result.
6. **Read the numbers as the signal that the architecture is right.** Tests
   got faster (about 800 s to 520 s, later 449 s). The app felt fast in use.
   Delete went from 6.1 s to 3.0 s. When the structure got better, the numbers
   moved without anyone optimizing them directly.
7. **When a symptom is strange, investigate; it is usually repetition.**
   - Delete felt frozen: Trash took about 4 s while the move took under 1 ms.
     The time went into up to four full safety walks of the same folder.
   - The UI suite was slow: about 290 Apple waits each paused about 1 s.
   - The map flickered: a progress strip changed the map's height and started
     another render, again and again.
   - Hardlinks: quadratic work in the accounting.
8. **Then change the strategy: react to failure instead of checking
   everything first.** "ask the oracle to analyze what would be the downside
   of not having … the check… we just not delete what we can't delete." The
   Oracle: "your idea is the recommended design, with one condition… these
   late checks are safer than today's early checks." Checks before the dialog
   went from about 1 s to under 1 ms.

## The arc (for orientation, not for the post's order)

1. A cleanup chat. "Eu preciso de ajuda para identificar o que está consumindo
   muito espaço em disco." The Data volume was 99% full, 7 GiB free.
2. Map once, query many. "can we have a temporary sqlite db with all existing
   files with size so we can du once and investigate big files or big dirs
   iteratively?" (24 Oct 11:45)
3. Speed first. "I want it to be really as fast as possible." The agent
   proposed `getattrlistbulk()` in C. He asked what Rust or Zig would bring,
   then "do the experiment in rust".
4. Product shape. Build the map once, query it many times, operate on the
   filesystem outside the tool, resync. New repo.
5. Composition over features. The agent proposed filtering and sorting. He
   rejected it: Unix tools are enough, export and pipe into SQLite, "fully
   decoupled". The agent: "Yes. I proposed too much."
6. What if it had a picture? He remembered Disk Inventory X. First an SVG
   treemap prototype whose rectangles summed exactly to the inventory.
7. What if it were a native app? "less code is better. i am ok with swift +
   rust". Operations like Trash in the Rust core, drawing in Swift. Fully
   automatic GUI tests with no real side effects.
8. "It feels different from Disk Inventory X." Reverse-engineering the
   installed DIX binary and its TreeMapView framework.
9. Make it work, then make it good. A context package for a design specialist
   (Claude Design), then an interactive mockup with every scenario.
10. Audit against the design, then validate everything against Apple's Human
    Interface Guidelines.
11. Dogfooding from `~/Applications`. The richest feedback round.
12. "we spend a lot of time clicking on things to validate state." The
    architecture and test-layer rethink.
13. Quality pass with Oracle reviews between slices. Merge, cleanup, restart
    from `main`.

## Learnings that changed the process

- **Composition beats a feature list.** The CLI has no filter or sort
  language. It exports CSV, TSV or JSONL and lets jq, sort and SQLite do the
  rest. The agent then queried the map itself. This narrow core is what made
  the GUI "what if" cheap. His tweet: "Laser focus on composition pays off."
- **The language mattered less than the API.** The agent: "The biggest
  expected gains are fewer metadata syscalls and less per-entry allocation,
  not simply choosing a faster language." Bulk collection was about 2× faster
  than per-file stat at the same worker count.
- **Inspect the reference, not screenshots of it.** The first treemap was
  built from DIX website screenshots. The real study came 14 hours later,
  after he felt the mismatch and opened the installed app: "top left I see the
  bigger things… bottom right the smaller things". The agent inspected the
  binary: "Disk Inventory X 1.3, with TreeMapView 1.2 bundled inside it… a
  squarified-style treemap."
- **A context package for an agent that never saw the conversation.** The
  package gathered the bad prototype, DIX screenshots, design invariants, user
  preferences and UX facts mined from the build session. Its prompt: "Disk
  Inventory X is a reference for the discovery experience, not a design that
  our app must copy… If your tools cannot inspect images, say so." It is still
  in `~/Downloads/ux-design-package/` (160 files).
- **The specialist design is input; the HIG is the arbiter.** The HIG review
  overrode parts of the design: Cancel placement, destructive buttons, 700 ms
  animations cut to about 200 ms. Implementation also corrected the plan: on
  macOS 26 the SwiftUI sheet draws its destructive button gray; only
  `NSAlert` draws it red.
- **Before/after screenshots with callouts as the acceptance artifact.** "I
  want you to record a video or screenshots of what was changed with the
  proper callouts." Every slice after that produced annotated before/after
  images.
- **Realistic fixtures before algorithm changes.** He saw misaligned
  rectangles twice. The second time the algorithm was right and the fixture
  was wrong: "128 files of almost the same size… names have no extensions…
  every tile gets the gray 'other' color." A parity test then proved the
  layout matched the designer's code: "All 514 files match… The largest edge
  error is 0.000000000005 px." Screenshot saved as
  `media/misaligned-fixture-screenshot.png`.
- **The test rule he set, and why he had to replace it.** First: every visible
  claim needs its own real UI test ("don't forget the xtest thing"). The suite
  grew to about 22 minutes. The replacement rule: "Each change gets a test in
  the cheapest layer that can catch it: Rust, then state, then a picture of
  one part of the screen."
- **State per component.** Once each view got its own plain-value state, it
  could be tested and previewed in every state without clicks. The app model
  went "from 1,195 lines to 284".
- **Question the platform assumption.** "Why aren't we deleting the folder
  and moving the folder to the trash? Because this how the system works." The
  answer: Trash already moved the whole folder in one step; the time went to
  the app's own safety checks. His optimistic-delete idea went to the Oracle,
  which approved it with one condition and found the late checks safer.
- **Docs describe the current state only.** "The documentation should state
  what we have now." Docs fell from 787 to 200 lines, and a docs check now
  fails when a doc cites a test that does not exist.
- **Commit at stable checkpoints**, and **Oracle review between slices**
  (worker, commit, Oracle, fix, commit). The Oracle caught real gaps, such as
  "no test checks the real Stop button anymore".
- **Agent tooling is product work.** Two agents could break each other's UI
  test runs. A lock now lets only one UI run use the screen at a time.

## Surprises

- **mmap was planned and never needed.** He agreed to memory-mapped loading
  early. The README now says "This is not mmap or lazy loading." Eager loading
  opened 5.7 million entries in about 2.5 s.
- **SQLite never entered the core.** It started as "a temporary sqlite db" and
  ended as one consumer of the export.
- **"Delete feels frozen" was safety overhead, not I/O.** "Move to Trash takes
  about 4 s, even though the move itself takes less than 1 ms."
- **The slow UI suite came from one Apple API.** The standard wait paused
  about 1 s before its first look, about 290 times. Fixing it took the suite
  from about 800 s to about 520 s.
- **A flicker from a layout feedback loop.** A progress strip changed the
  map's height, which started another render. Found by checking the
  recording frame by frame.
- **Agent behavior.**
  - It over-engineered unprompted (the filter language) and conceded at once.
  - It admitted its own misses: "I should have checked this setting earlier".
  - It lost its shell tool mid-session and needed a repair session.
  - It kept rules only when reminded ("you need to remember to start the
    xtest tool").
  - Status chatter: about 34 "not stuck" messages and about 36 repeated
    decision requests.
  - A worker waited on a "quit unexpectedly" crash dialog and burned tokens
    asking about 10 times for a click.
  - Reviewers caught real bugs before he did: a floating-point layout
    overlap, a work-budget overrun, quadratic hardlink work.
- **The irony.** The agents building a disk-space tool filled the disk under
  `/tmp`. An ENOSPC stopped a review. "you've been using a lot of space under
  /tmp". Cleanup took free space from 539 MiB to about 11 GiB, and it dropped
  again later. The pflow session the same week: "I cleaned up some space for
  you to work".

## High points

- The benchmark day: a full Data volume mapped in 35.6 s (24 Oct).
- The first picture: rectangles that summed exactly to the inventory, showing
  offenders the file list had missed (Homebrew Cellar, 10.92 GiB).
- Reverse-engineering DIX from the installed binary. "With 72 equal-sized
  files, the new placement produces three aligned rows of 24 rectangles."
- The Claude Design mockup (his X posts).
- "Ready for dogfooding": the independent review found no defects; installed
  in `~/Applications` on 27 Oct. His "loved the overall result."
- The 5e-12 px parity proof.
- The optimistic-delete design: his intuition, confirmed by the Oracle.
- The end: 35% faster tests, four quality slices green on the first run,
  `main` fast-forwarded with 48 commits.

## What he could have done better

- **Session hygiene.** One 125 MB session, opened in `~/me/dotfiles` as a
  cleanup chat, carried the whole product through 70 compactions. Cleanup
  requests kept arriving mid-build ("while you're working, get me top 25
  files"). A fresh session in the repo after the CLI would have isolated the
  context.
- **Scope mixing inside slices.** Locale formatting, a "SIMULATED" title and
  the app icon arrived while workers were busy on other things. The agent
  absorbed them; slices grew and re-ran.
- **Late reference research.** The DIX study came after a GUI was already
  built on a different layout policy. The layout then changed again to the
  specialist's design. Partly hindsight: the study fed the design package.
- **Built, then removed.** An inspector with async metadata, a 64-entry Back
  history (replaced by breadcrumbs), Open Snapshot (replaced by folder only),
  accounting texts, the SVG prototype, the DIX strip layout with cushion
  shading. His own principle came late: "watch out for not complicating the
  UI… low level file information is not needed."
- **Environment friction removed late.** Screen lock blocked UI tests for
  about 9 hours. Touch ID prompts until one `automationmodetool` command
  fixed it. A 401 started a provider failover chain and he re-sent the same
  long message three times. Missing tools. The disk under `/tmp`.
- **Slow UI tests accepted for too long.** Runs grew to 13 to 25 minutes
  before "why the UI tests take so long?", partly because of his own rule.
- **Many clicks to validate state.** About four days of click-driven UI tests
  before state per component.
- **Model switching mid-task.** Each switch needed a handoff check for partial
  edits.
- **Terse approvals** ("y", "Ywa"). They worked because the agent proposed
  defaults, but the agent had to interpret.
- **A long-lived branch.** 48 commits stayed on the feature branch until "is
  the code merged in the main repo?". Dogfooding builds came from the branch.

## Who did what

- **Henrique:** direction, "what ifs", boundaries, taste, rejections, the
  dogfooding feedback, the test rule and its replacement, the delete question.
- **Orchestrator** (the parent session): wrote briefs and contracts, launched
  workflows, answered 76 worker questions, verified claims, committed,
  installed builds. Models over time: gpt-6-astra, then Opus 5.5 and
  gpt-6.1-sol during failovers, then Opus 5.5 to the end.
- **Subagents** (from run metadata; costs are recorded API-equivalent
  estimates, not billing):

  | Role | Model | Runs |
  |---|---|---:|
  | worker (writes code) | Opus 5.5 high | 40 |
  | worker | gpt-6-astra high | 32 |
  | reviewer (read-only) | gpt-6-astra high / Opus 5.5 | 24 / 6 |
  | expert-oracle (fresh context, read-only) | Opus 5.5 high | 6 |
  | librarian (docs and API research) | gpt-6-luna | 10 |
  | locator | gpt-6-astra low | 5 |

  Token totals are in "Tokens" below.
- **Design specialist:** Claude Design, outside Pi. It received the package and
  returned an interactive HTML prototype with 12 flows.
- **Orchestration rules:** one writer at a time, each in a git worktree;
  read-only reviewers in parallel with the writer; review gates between
  stages; each new test must fail first on a broken version; resume the same
  worker after a failure.
- **Skill:** Laws of UX (Jakob's Law, Doherty Threshold, Fitts's Law).

## Architecture (effect, not code)

Seven layers. Dependencies point down; nothing lower knows anything higher.

| Layer | Owns | Must not |
|---|---|---|
| Views (SwiftUI/AppKit): tree, map, selection card, banner, header, menus | input, geometry of hit targets, drawing overlays | compute layout or accounting, hold Rust handles, check busy flags on their own |
| App model (Swift) | async orchestration, selection, focus, history, one latest-request worker per slot, scan progress polling, result motion | own the inventory, call Rust on the main thread, publish stale answers |
| Generated bridge (UniFFI) | session, opaque keys, single-use prepared actions, progress control, bounded views | transfer the whole inventory, let a view authorize an operation |
| Presentation core (Rust) | virtual tree, squarified layout, bitmap and per-pixel owner map, file-type colors | touch the filesystem |
| Live operations (Rust) | confirmed Trash and Delete, directory refresh, in-memory reconciliation, the filesystem adapter | rewrite the snapshot, fall back from Trash to Delete |
| Inventory core (Rust) | bulk scan, hardlink attribution, bottom-up totals, binary snapshot, streaming export | print, set exit codes, read file contents, depend on SQLite |
| CLI (beside the bridge) | `create`, `sync`, `info`, `export`; exit codes 0/2/1 | delete anything |

Key facts for the post:

- **Swift owns threads and input. Rust owns data, geometry, pixels, colors and
  safety.** The treemap is laid out and rasterized in Rust, including a map of
  which item owns each pixel, so hover is one lookup. Swift shows the image
  and draws dim, hover and selection on top. Hover and selection never
  rebuild the picture.
- **Everything that crosses the bridge is bounded:** tree slices of up to 256
  rows, at most 4096 tiles, at most 64 issues per update. The app never holds
  the inventory.
- **The test seam is the filesystem, not the core.** Fixture mode runs the
  real Rust core over an in-memory filesystem with about 30 named scenarios.
  Tests and the app use the same core.
- **Test layers, cheapest first:** Rust tests (150, including pixel tests at
  window size), a bridge smoke client, Swift model tests (154) with offscreen
  drawing, then UI tests (33) only for real mouse, keyboard, menus and sheets.
- **Safety shapes the design:** metadata only, no symlink following, one
  device, atomic publication, single-use confirmations that pin the target,
  no Trash-to-Delete fallback, partial and unknown reported as such.
- **Size:** about 15.9k lines of Rust and 9.8k of Swift. Test code (about
  13.6k lines) is larger than product code (about 12.3k).
- Mermaid sources for six diagrams are in `/tmp/di-blog/notes-architecture.md`
  section 7: layers, scan pipeline, operation round trip, test pyramid,
  ownership, snapshot lifecycle.

## Performance evidence

All numbers are warm or mixed cache, on Henrique's M3 Pro (11 cores, 18 GiB),
macOS 26.6.2, APFS internal SSD. No cold-cache numbers exist.

From the build (session):

| What | Result |
|---|---|
| Full Data volume, 24 Oct | 5,008,789 entries scanned in 34.3 s, saved map in 35.6 s, 671 MiB peak, 470 MiB snapshot |
| Bulk vs per-file stat (pnpm store, 497k entries, 8 workers) | 1.15 s vs 2.41 s (2.09×) |
| Open 5.7M-entry snapshot through the bridge | 2.48 s; root layout 0.42 ms; 1.53 GB peak |
| Treemap, 1M synthetic files | 46.7 ms layout + 58.6 ms raster |
| Delete in a million-child folder (core) | 0.76 ms |
| Refresh of a 25,000-file folder | 23 to 28 ms, zero per-file stat calls |
| Delete of 100k files | 6.1 s to 3.0 s; checks before the dialog 1 s to under 1 ms |
| UI suite | about 800 s to 520 s (36 tests); later 449 s (33 tests) |

Fresh, reproducible benchmark (29 Oct, owned fixtures in `/private/tmp`,
median of 3; raw data in `/private/tmp/di-blog-bench`):

| Operation | 99k entries | 495k entries |
|---|---|---|
| `create`, 1 worker | 0.129 s | 0.999 s |
| `create`, 4 workers (default) | 0.064 s | 0.608 s |
| `create`, 8 workers | 0.067 s | 0.973 s |
| `du -sk` | 0.099 s | 0.877 s |
| `info` | 0.022 s | 0.106 s |
| `export jsonl` | 0.067 s | 0.323 s |
| `sync`, no change | 0.084 s | 0.653 s |
| Snapshot size | 7.6 MiB | 38.1 MiB (about 81 B per entry) |
| Bulk vs stat scan, 4 workers | 43 vs 76 ms | 360 vs 977 ms (2.7×) |

- With 4 workers, a full scan that also writes a reusable snapshot beats
  `du -sk` on the same tree (1.4× to 1.5×). Byte totals matched `du` exactly.
- More workers is not always faster: 8 was slower than 4 on this machine.
- `sync` rescans the whole root; it has no incremental speedup. Operations in
  the app reconcile locally instead.
- Story line for a visual: **cost follows the change, not the disk.** A ladder
  from 16 µs (layout) through 0.76 ms (delete in a huge folder), 25 ms (folder
  refresh), 2.5 s (open 5.7M entries) to 35.6 s (full scan).
- No head-to-head with Disk Inventory X exists. Only his impression: "DIX was
  not fast, I want a fast software."

## Tokens

Computed on 29 Oct from `usage` in the build session JSONL (parent, 1,614
assistant messages) and in the 123 `*_meta.json` files whose
`parentSessionId` starts with `01a169f5` (subagents, 4,827 turns).

| | Parent | Subagents | Total |
|---|---:|---:|---:|
| Input (uncached) | 1.96M | 3.39M | 5.35M |
| Output | 0.79M | 4.15M | 4.95M |
| Cache read | 160.4M | 726.8M | 887.2M |
| Cache write | 15.8M | 10.7M | 26.4M |
| **All** | **178.9M** | **745.0M** | **923.9M** |

- Almost a billion tokens processed in six days; 96% were cache reads, the
  same context read again on every turn.
- About 5M output tokens (this includes reasoning) for about 25.7k lines of
  Rust and Swift.
- Subagents processed about 80% of all tokens. The parent mostly steered.

## Media inventory

- His X videos and images (table above). Download the MP4s for the post.
- `~/Downloads/ux-design-package/`: the context package (`index.html`
  gallery, `SPECIALIST-PROMPT.md`, `REFERENCE-DIX.md`, 27 app screenshots, 20
  DIX screenshots).
- `~/Downloads/macOS app UX design.zip`: the Claude Design output.
- `~/Applications/DiskInventory.app` (build of `8d79931`) for fresh
  screenshots and GIFs.
- `media/misaligned-fixture-screenshot.png`: his pasted screenshot of the
  "misaligned" map (27 Oct), copied out of a temp folder.
- 69 images embedded in the build session JSONL (prototype, DIX reference,
  alignment probe, specialist renders, flicker frames, removal montages,
  annotated before/after, icon previews, crash dialog), plus 425 in subagent
  transcripts. Not extracted yet.
- The 62 MB design package ZIP and the XCUITest videos are gone.

## Open questions

- None open. Costs settled as tokens, 29 Oct.
