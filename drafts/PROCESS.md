# Process

Provisional. Written after one post reached a settled opening, so it records
what happened rather than what always works. Nodes 5 to 12 of that post, and
the post after it, are what will decide which of these passes survive.

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

## The passes

1. **Brief.** Why, audience, promise, voice. It is a hypothesis, not a
   contract: it exists so there is something to judge against, and the writing
   is expected to disprove parts of it. Revise it when the prose reveals the
   real argument, and keep what changed, since the gap between the first brief
   and the final one is the clearest record of what the post turned out to be.
2. **Skeleton.** Top-level nodes only, each a complete sentence.
3. **Expand.** Items under every node.
4. **Sweep.** One global pass across all nodes for duplication and
   misplacement. Only possible once everything is expanded, and impossible to
   do node by node, because a repetition is invisible from inside either of the
   two places it appears.
5. **Group.** Cluster items into moves, each move getting its own sentence.
   Order falls out of grouping, so this replaces ordering as a separate step.
6. **Draft.** Convert to prose several nodes at a time, so the sequence can be
   judged as continuous reading rather than paragraph by paragraph.
7. **Weigh.** Per paragraph: what does the reader believe now that they did not
   believe before this paragraph? "The same thing, more firmly" means cut or
   compress. This is the only pass that catches over-proving, and no
   sentence-level check can find it.
8. **Scrub.** Per sentence: no filler, self-contained, connected to its
   neighbors, actually supported.
9. **Collapse.** Fold paragraphs into clauses, merge sentences that explain
   each other.

Less certain that these generalize, but both earned their keep once:

10. **Turn.** Find the point where the section should stop arguing and start
    delivering, then move material so the release lands there.
11. **Reversal.** Check that the close answers the open. An ending only lands
    as a reversal if the opening set up the thing being reversed.

## The one rule stated as law

**Weigh before Scrub.** Polishing sentences inside a paragraph that should be
cut is the most expensive mistake available.

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
- **Announcing.** "Underneath both of those sits a mismatch I could not fix"
  tells the reader more proving is coming. Start on the fact instead.
- **Explaining the explanation.** Two consecutive sentences where the second
  restates the first in different words. Almost always the tail of a paragraph.
- **Definitional scaffolding.** Defining a term before showing an instance of
  it. Usually cheaper to delete and let the example carry it.
- **Headline sentences.** A short sentence that announces what the next
  sentence says. The next sentence can absorb it.

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

Nodes are units of argument, not headings. Headings are a side effect of the
prose and get added afterwards to organize what is already written, never
beforehand to plan it. A heading written first becomes a promise the paragraph
underneath has to keep.

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
