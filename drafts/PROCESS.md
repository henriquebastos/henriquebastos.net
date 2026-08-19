# Process

Provisional. This records lessons from completed articles rather than claiming
one universal writing method. The active version favors early prose and narrow
review surfaces over perfect planning artifacts.

## The shape

Expand and collapse, looping, searching for the right content. Expand to find
what could be said, collapse to find what must be. The loop runs at three
altitudes and is the same loop at each one, only the unit changes:

- **Items.** Expand a node into everything it could say, collapse to what it
  must say.
- **Paragraphs.** Expand into full prose, collapse arguments into clauses.
- **Sentences.** Expand to be precise, collapse to remove what precision cost.

## The two directions

Expand and collapse govern how much material exists. These govern where the
meaning comes from. Both run at once, for the whole length of a post, which is
why it feels like a spiral rather than two phases.

**Top down.** A conceptual frame produces arguments, arguments produce
paragraphs, paragraphs produce sentences. The brief says what the post is for,
the outline derives what must be said, the prose derives how. This direction is
what keeps a post coherent. Left to run alone it produces something abstract,
orderly, and tiring.

**Bottom up.** A concrete example produces the concept. Naming a baby produced
the distinction between an intention and a description, which became the spine
of the whole post. A sidebar that suddenly made sense produced the closing.
Reading a draft and feeling tired produced over-proving as a named failure
mode. This direction is what makes a post true rather than merely consistent.
Left to run alone it produces a pile of good anecdotes that argue nothing.

**Explanation comes from example, never before it.** When both are present, cut
the explanation and let the example teach. Node 4 lost two sentences defining
where and when because node 5 was about to show a numbered index card. Node 5
shows `21a1` before node 6 states the grammar it obeys, and the grammar is
easier to state afterwards because the reader already has an instance to
generalize from.

The test for whether an example is load-bearing: does it **produce** the
concept, or merely illustrate a concept already stated? Producing earns any
length. Illustrating is decoration, and decoration is what the Weigh pass
removes.

## The finding that matters most

The three largest structural improvements all arrived after prose existed, not
during outlining:

1. Reframing the problem from "the tool names things badly" to "naming is the
   wrong instrument, a coordinate is the right one."
2. Interleaving the concrete pain with the diagnosis, so the symptom follows
   the cause instead of preceding it.
3. Moving a realization from the middle, where it read as another argument, to
   the end, where it reads as a payoff.

None were visible in the outline. Two came from reading the draft aloud and
noticing fatigue. So the outline is not something to perfect before writing. It
is scaffolding, built well enough to start, then corrected by the prose.

## Two rules about subject matter

**The publication repo owns the draft; source repositories own technical
truth.** When a post describes something that lives in code, read that code
before writing about it and keep the post honest to it, but do not try to keep
the source repo in sync with the post. The first post was written against
`github.com/henriquebastos/zettelkasten` this way, and an older reference file
describing a superseded version of the same system was explicitly abandoned
rather than reconciled.

**Park adjacent ideas rather than absorbing them.** An attractive neighboring
topic included only because it is nearby is how an article loses its boundary.
Name what a piece deliberately excludes, so the exclusion is a decision on the
record rather than an oversight, and so the parked idea stays visible as
possible future work.

**For a series, take one article all the way through before planning the
rest.** Settle the through-line and the reader's journey, then complete a
single piece end to end and feed what it taught back into the series
conventions. Deeply outlining several unwritten articles produces plans that
the first finished one invalidates.

## The graph is scaffolding, not a review interface

A claim graph is optional. Use it when several arguments genuinely share
premises or depend on one another in ways a compact outline would hide. Keep one
canonical `02-graph.md`. Do not create derived graph files.

The agent owns the graph's complexity. Henrique should not have to navigate
claim IDs, choose between a graph and a workbench, or reread a large planning
document to answer a question. Before asking for judgment, compress the graph
into at most seven complete argumentative moves. Every question quotes enough
of the relevant move to stand alone, states the decision in plain language, and
offers concrete alternatives when alternatives exist.

Stop graph work as soon as the brief, dependencies, and candidate reader
movement are clear enough to draft the complete article. The graph earns its
cost by improving the prose. It is not a gate the author must operate.

## The passes

1. **Brief.** Why, audience, promise, voice. It is a hypothesis, not a
   contract: it exists so there is something to judge against, and the writing
   is expected to disprove parts of it. Revise it when the prose reveals the
   real argument. Preserve the earlier state in Git, since the gap between the
   first brief and the final one is the clearest record of what the post turned
   out to be.
2. **Skeleton.** Top-level nodes only, each a complete sentence.
3. **Expand.** Items under every node.
4. **Sweep.** One global pass across all nodes for duplication and
   misplacement. Only possible once everything is expanded, and impossible to
   do node by node, because a repetition is invisible from inside either of the
   two places it appears.
5. **Group.** Cluster items into moves, each move getting its own sentence.
   Order falls out of grouping, so this replaces ordering as a separate step.
6. **Draft.** Convert the plan into one complete article. Connected batches can
   be written internally, but the first author review receives continuous prose
   rather than a sequence of fragments.
7. **Weigh.** Per paragraph: what does the reader believe now that they did not
   believe before this paragraph? "The same thing, more firmly" means cut or
   compress. This is the only pass that catches over-proving, and no
   sentence-level check can find it.
8. **Scrub.** Per sentence: no filler, self-contained, connected to its
   neighbors, actually supported.
9. **Collapse.** Fold paragraphs into clauses, merge sentences that explain
   each other.
10. **Humanize audit.** After Collapse and before further editing, inspect the
    prose for accumulated machine-writing patterns. This is a read-only audit,
    not a rewrite. Every finding quotes an exact passage, names the pattern,
    and classifies it as a must fix, a judgment call, or intentional voice. The
    audit does not infer authorship, assign a score, or change the draft.

Less certain that these generalize, but both earned their keep once:

11. **Turn.** Find the point where the section should stop arguing and start
    delivering, then move material so the release lands there.
12. **Reversal.** Check that the close answers the open. An ending only lands
    as a reversal if the opening set up the thing being reversed.
13. **Reverse outline.** After the draft is finished, rebuild the outline from
    it, one sentence per paragraph, and compare it with the original in Git.
    The comparison is the only honest measure of how much the plan was worth.
    On the first post it showed that twelve nodes became five sections, that
    every node written from design notes rather than practice was cut, that the
    three strongest paragraphs were never planned, and that the one section
    which survived intact was the only one describing mechanics. Arguments
    resist outlining; mechanics do not.

## The one rule stated as law

**Weigh before Scrub.** Polishing sentences inside a paragraph that should be
cut is the most expensive mistake available.

## The Humanize audit cannot become the author

The audit is a lint layer over settled prose. It runs after Collapse because
structure, argument weight, and duplicated explanation must be resolved before
surface patterns are judged. It runs before Turn and Reversal so those passes
can still make deliberate use of rhythm, emphasis, and callbacks.

The audit and the edit are separate boundaries. Present the findings before
changing prose. Accepted findings become targeted edits in the active draft,
visible in its Git diff; rejected findings remain in the temporary audit until
the pass closes so they are not proposed again.

For every finding:

1. Quote the exact passage. No passage means no finding.
2. Name the pattern and explain what it damages in this essay. A generic list
   of suspicious words is not an explanation.
3. Classify it as **must fix**, **judgment call**, or **intentional voice**.
4. Treat a single word, short sentence, reversal, question, or rhetorical
   device as insufficient. Look for a repeated shell or a cluster.
5. Suggest the smallest correction only for a must fix. Judgment calls belong
   to Henrique.

The audit checks for leaked chatbot language, placeholders, citation artifacts,
unnamed authority, speculative gap filling, unsupported novelty, generic
inflation, promotional language, empty conclusions, repeated sentence shells,
forced triads, synonym cycling, and mechanically uniform rhythm. It also asks
whether paragraphs could trade places without damaging the argument, since
that reveals connective language disguising a missing dependency.

The audit protects first-person authority, concrete examples, domain terms,
humor, callbacks, unresolved observations, and deliberate variation in
sentence length. Short punchlines, negative reversals, and chosen repetition
are not defects merely because language models also produce them. Compare them
with the brief, explicit decisions recorded during the draft, the voice rules
in [AGENTS.md](../AGENTS.md), and recent published posts before flagging them.
Those local sources outrank a generic pattern catalog.

Never add a fact, source, anecdote, emotion, opinion, joke, aside, rough edge,
or cultural reference to make prose appear human. Preserve every claim. The
audit cannot send an unpublished draft to another service, use a scalar
"AI probability" as evidence, or optimize prose against a detector score.

External catalogs can supply questions, not verdicts. The current references
are [Humanizer](https://github.com/blader/humanizer) and
[Avoid AI Writing](https://github.com/conorbronsdon/avoid-ai-writing). Their
instructions do not override this process or Henrique's established voice.

## Versions and author review

**Cumulative means decisions compound, not files.** One file owns each active
stage. Edit it in place. Git carries the previous versions.

Establish a Git baseline before author review. Apply one coherent review batch
to the same draft, show the exact changed passages and why they changed, then
commit the accepted batch at a meaningful boundary. A commit for every sentence
creates noise; a commit for every accepted section, pass, or review session
creates a useful diff.

Do not create per-review Markdown records or a new full draft after every pass.
Create simultaneous draft files only when Henrique asks to compare materially
different alternatives, such as route A against route C. Once the choice is
made, the selected route becomes the active draft and Git retains the other.

Author questions are direct and self-contained. Quote the relevant assertion,
summarize what it currently does, and ask for one decision. Never send an ID
such as `T06` without the assertion it names. If the author must reopen a large
document to understand the question, the agent has not done the compression.

Portal review edits the same `src/content` file. After each coherent batch,
report the precise before and after plus the reason. Do not make the author
reread the article to discover what changed.

## Failure modes seen so far

- **Over-proving.** Four consecutive arguments for one verdict. The reader wins
  the point at the third and keeps paying. Felt as tiredness, not as length,
  which is why word count is the wrong instrument for diagnosing it.
- **Tidying.** A sentence that closes the frame instead of moving the reader.
  A paragraph explains why branches never carry the ID, and then doubles back
  to restate a boundary established two paragraphs earlier. Completeness is the
  writer's concern. The chain of thought is the reader's, and tidying
  interrupts it to reassure the writer that nothing was left open. The test:
  does this sentence advance the chain, or does it make the section feel
  covered?
- **Inventing process.** Describing a deliberation that does not actually
  happen. Design notes record intent, including rules never exercised in
  practice, and carrying those into prose puts decisions in the reader's head
  that the writer never makes. Only write the judgments you actually perform.
- **Future capability in present tense.** Writing what will be true as though
  it already is. The draft said "the code is public" before there was a link,
  and an earlier brief promised gists that did not exist. Distinct from
  over-claiming: the statement is not false, it is just not true yet. Anything
  that depends on work not yet done gets flagged, not smoothed over.
- **Jargon before definition.** A term doing load-bearing work before the
  reader has been given it. Usually invisible to the writer, who defined it
  months ago in their own head.
- **Repeated slogans.** A metaphor, phrase, or conclusion that returns without
  being asked to. Purposeful repetition is a deliberate device and has to be
  chosen; accidental repetition just flattens the line each time it recurs.
- **Announcing.** "Underneath both of those sits a mismatch I could not fix"
  tells the reader more proving is coming. Start on the fact instead.
- **Explaining the explanation.** Two consecutive sentences where the second
  restates the first in different words. Almost always the tail of a paragraph.
- **Definitional scaffolding.** Defining a term before showing an instance of
  it. Usually cheaper to delete and let the example carry it.
- **Headline sentences.** A short sentence that announces what the next
  sentence says. The next sentence can absorb it.
- **The planning model becomes the author interface.** Raw graph IDs, multiple
  planning files, and oversized workbenches move synthesis back onto the
  author. Compress the model into contextual decisions before asking for input.
- **Version files impersonate history.** A new Markdown file for every pass
  hides changes across paths and forces complete rereads. Edit one owner in
  place and use Git diffs and review-boundary commits.

## Conventions

Outline nodes are complete sentences stating the information of the whole
level. A node that reads like a heading has failed: it names a topic instead of
asserting something, and nothing downstream can be checked against it.

Items are addressed by node number, group letter, item number, following the
Folgezettel grammar: `3c2` is node 3, group c, item 2. Groups let items cluster
without adding a level, so a group is a move in the argument, gets its own
sentence, and every item under it must serve that sentence or move elsewhere.

Nodes belong to the outline. The draft is prose, and it carries `<!-- node N -->`
comments only while the outline is still live, as scaffolding tying paragraphs
back to the moment they came from. They never render, and they come out before
publication.

Addresses extend to the draft as a way of pointing, not as a structure it has to
carry. Paragraphs and sentences are counted within their node: `4b` is the
second paragraph of node 4, `5b3` the third sentence of the second paragraph of
node 5. Nothing is numbered in the text and no tooling is involved. When the
draft is shown for review, the node boundaries are marked so the counting starts
from something visible.

Words are not addressed. Numbering every word would make the draft unreadable,
and a word can simply be quoted.

`snapshot` returns only the settled content, in reading order, and nothing
else. No commentary, no rationale, no rejected alternatives, no new proposals,
no account of how it got that way. Unresolved areas appear as honest
placeholders rather than being smoothed over. It is the clean reading surface,
not a freeze.

When a pass produces several findings, separate the ones that must change from
the ones that could, and batch the mechanical corrections instead of presenting
them as equals. Nine findings of equal weight, two of which are real, is a
report that makes the reader do the triage.

Nodes are units of argument, not headings. Headings are a side effect of the
prose and get added afterwards to organize what is already written, never
beforehand to plan it. A heading written first becomes a promise the paragraph
underneath has to keep.

A title compresses the article's central tension rather than merely naming its
topic. Run the title and heading pass after the argument has settled. Read the
title and headings alone: together they should create curiosity, reveal the
article's movement, and expose any section boundary the prose is missing.

A heading is a hook, not a label. It separates sections, but its real job is to
catch attention and open a question the section then answers.

The technique that works is an image plus an incongruity, not withholding. "The
knowledge graph built with pen and paper" collides a modern term with an
anachronistic medium, so the reader gets something to picture and something
that does not fit, and goes in to resolve it. "The answer is seventy years old"
only withholds: it makes the reader curious and hands them nothing. "What I
actually type" is a plain label and does neither.

Never spend the section's best concrete detail in its own heading. A heading
that says "ninety thousand index cards" leaves the paragraph poorer than it
found it.

Voice rules, including no em-dashes and no disclaimers, live in
[AGENTS.md](../AGENTS.md) because they govern everything written here, not just
drafts.

## Rendered review and publishing

Move the complete draft into `src/content` only after continuous prose exists.
From that point onward the source post owns the active prose and Portal review
edits that file in place.

1. Strip the `<!-- node N -->` comments. They are outline scaffolding and never
   ship.
2. Create `src/content/post/<slug>.md` with `draft: true` and frontmatter
   matching the existing posts: `title`, provisional `publishDate`,
   `description`, and `coverImage` with `src` and `alt`.
3. Extract several visual concepts from the settled article before generating
   cover candidates. Select the concept first, then refine composition and
   style. Co-locate the accepted image as `src/content/post/<slug>.png`.
4. Run `pnpm check`, then `pnpm build`.
5. Open the rendered page and read it, rather than trusting a passing build.
   Check the title, description, cover and alt text against the accepted text,
   at desktop and mobile widths, with no overflow and no console errors, and
   confirm every link resolves.
6. When an unpublished article needs to travel as a file, use the
   [project exporter](../.agents/skills/exporting-blog-posts/SKILL.md). Its
   self-contained HTML belongs in `.amp/in/artifacts`, never in Git.
7. Publication is a separate, explicitly approved action. Replace the
   provisional date with the actual publication date, set `draft: false`, run
   the checks again, publish, and verify the public page.

Never invent a publication date, a cover image, a link, or a claim about
something being available. A passing build is not an accepted article, a
finished draft is not a published one, and preparing a publication does not
authorize it.

## Promotion

Promotion planning can start after the prose is settled. Publishing the
promotion waits until the article is public and the exact promotion bundle is
approved. A feed post is not a summary: it should give away enough to establish
the problem and the surprise, then preserve the explanation for the article.
The first post worked when it named the knowledge graph made with pen and paper
and the discovery that coding agents are vibe coded. Explaining the coordinate
system there would have spent the article's reveal in the advertisement.

`05-promotion.md` is the record for this stage. Keep the article URL, cover and
exact alt text at the top. For each channel, keep the format, exact post and
comment or reply, approval status, and canonical URLs after publication. Record
manual recovery steps too. Approval applies to the complete exact bundle: text,
paragraph breaks, image, alt text, and first comment or reply. A changed part
needs approval again.

Publication calls are non-idempotent. Resolve the authenticated account before
the first mutation, upload the image and alt text before creating the post, and
save the returned post ID before creating its reply. Never blindly repeat a
create call whose outcome is uncertain. Use a read-only lookup to establish
whether the exact content exists first.

### LinkedIn

The project-local workflow and connection setup live in
[the plugin README](../.amp/plugins/linkedin/README.md). The current
self-service permission can publish a member feed post, but not its first
comment. Publish the comment manually unless LinkedIn makes the required
permission available to the app. Record that manual step in `05-promotion.md`.

### X

The orb setup installs the official `xurl` release at a pinned version and
checksum. This single-account publisher uses OAuth 1.0a because xurl 1.3.1's
built-in OAuth 2 authorization asks for unrelated permissions. Keep these four
values in Amp project secrets, never in the repository:

- `X_CONSUMER_KEY`
- `X_CONSUMER_SECRET`
- `X_ACCESS_TOKEN`
- `X_ACCESS_TOKEN_SECRET`

The consumer pair and access-token pair must come from the same X app. Set the
app to Read and write before generating the access-token pair. Start a fresh orb
after adding or replacing project secrets, then require `/2/users/me` to resolve
to `@henriquebastos`, user ID `14227855`, before publishing.

xurl 1.3.1 has three output contracts that matter for safe automation:

- `xurl media upload` prints a JSON response followed by `Media uploaded
successfully! Media ID: <id>`. Its whole output is not one JSON document.
  Extract and validate the numeric ID from the labeled final line.
- Add image alt text before posting with `POST /2/media/metadata` and the body
  `{"id":"<id>","metadata":{"alt_text":{"text":"<alt>"}}}`.
- Successful `xurl post` and `xurl reply` calls each print one JSON object. The
  created post ID is `.data.id`.

Do not use verbose xurl output in automation. It mixes diagnostics into stdout
and can expose the OAuth Authorization header.

## Closing a writing thread

A writing thread can close before publication or promotion. The state is safe
to resume elsewhere when:

1. One tracked file owns every active stage and superseded review artifacts are
   gone.
2. The source post explicitly says whether it is a draft.
3. The retrospective records the reusable lessons, and `PROCESS.md` contains
   any resulting workflow change.
4. `05-promotion.md` states the article and approval status when promotion work
   exists.
5. Pending actions such as the actual publication date, publication, promotion
   approval, and later analytics are named rather than left in the thread.
6. Generated review artifacts remain outside Git, and the tracked worktree is
   clean and synchronized when Henrique asks for the work to be pushed.
