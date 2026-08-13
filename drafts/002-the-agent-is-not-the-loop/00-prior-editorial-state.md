# Editorial State Record: "The Agent Is Not the Loop"

PRIOR WORK. Durable record of an earlier editorial session that stalled. The
draft it produced is `00-prior-draft.md`.

The rewrite does not inherit this file's process rules, roles, or handoff
procedures. What is worth mining: the settled rulings, the source guardrails,
and the verified external sources. Those cost real work to establish and should
survive into `01-brief.md`.

## Identity

- Essay: "The Agent Is Not the Loop" (working title, settled in practice).
- Repo: henriquebastos/henriquebastos.net, canonical branch `main`.
- Studio thread (live session): https://ampcode.com/threads/T-019fcf1d-6d30-75b0-9533-7e90f7052774
- Source thread (full prior history): https://ampcode.com/threads/T-019fccfa-221e-70c2-85c0-e4dbd85d4917
- Map/parent thread (handoff target after acceptance): https://ampcode.com/threads/T-019fcc36-f2df-77b9-b301-dd4968c4665c
- Audit thread: https://ampcode.com/threads/T-019fde6b-d484-77ae-af44-2b2c8c260971

## Status

Complete skeleton drafted, opening settled by the Navigator. NOT accepted,
NOT for publication. Awaiting: Navigator second pass, then compression pass,
then acceptance, then handoff.

## Preservation disposition

- Canonical files live on `main`; unfinished status is represented by this
  record, the Open decision, and the Planned roadmap handoff.
- Preservation source: branch `draft/the-agent-is-not-the-loop` at
  `e83212e3ee2284de7f299201025f6f96bd19e0b9`.
- The earlier prose revision at `69dba8fc1fa95ad5ebb51ed55a7d297e64acde9c`
  is superseded by the current working draft. It is retained only as provenance
  here, not as a second artifact or publication candidate.
- The preservation branch's unrelated historical ancestry is excluded. It is
  neither required editorial state nor an alternative site history.

## Process rules (binding)

- Progressive sculpture with the Navigator, one consequential choice at a time.
- Navigator owns purpose, audience, voice, taste, tradeoffs, acceptance.
- Studio acquires/verifies evidence, exposes choices, maintains one evolving
  artifact, distinguishes facts/proposals/settled rulings.
- Every proposal is presented as the ENTIRE snapshot, never fragments
  (Navigator reads whole text to connect ideas; thinks with examples, not
  abstractions: always propose concrete versions to judge).
- `snapshot` command: return only settled article content in reading order,
  honest placeholders, no commentary.
- Production (src/content/post/) untouched until acceptance.
- No reporting to map/source threads until Navigator says done and asks for
  handoff.

## Settled rulings

1. Thesis: an agentic system should express a system of work, not simulate an
   organization of agent roles.
2. Slogan: "Model the work. Bind the workers later." ("later" over
   "separately"; gloss "binding is a separate decision, not a postponed one"
   lives in the gradient section).
3. Diagnosis line: "We are using intelligence to compensate for process state
   we never represented."
4. Opening: Navigator-authored bottleneck framing; provocation WITHOUT the
   "I did this too" confession (cut by Navigator); settled support line:
   "when the work is invisible, we manage the workers instead."
5. Register: teach, don't prosecute; argument developed, not asserted; punches
   rationed; ends in agency. Inputs: `src/content/post/making-sense-of-harness-engineering.md`
   (structure/voice) and Petrus landing copy (explanatory confidence).
6. Landing-copy boundary: site slogans ("Free agents from the loop", "The
   loop is a chip, not the computer", etc.) stay exclusive to the site;
   below-slogan paraphrase allowed (e.g. "intelligence it spends keeping
   itself alive").
7. No em dashes anywhere (matches Petrus site copy rule and Navigator taste).
8. Anthropomorphization: describe the behavior ("an agent resembles a
   colleague, so we gave it a job title"), never the clinical term, never
   causal.
9. Yegge/Horthy: inline links in opening only, attached to claims each
   actually makes; no witness paragraphs. Horthy is pressure, not ally.
10. Mechanism section ("Process and execution were always separate") is the
    essay's core argument: LLM calls are stateless; the loop rebuilds context
    each turn; process state already lives outside the agent, currently
    shaped as a conversation; give it the shape of the work.
11. Structure: opening -> The system that narrates itself -> Process and
    execution were always separate -> Model the work -> What changes when the
    work is modeled (5 flips) -> Start with judgment, extract the rule ->
    The net is the program -> The agent is not the loop (ending).
12. Measurement proof (flow indicators uncomputable) lives in "Model the
    work"; personal lineage compressed into one paragraph opening "What
    changes"; PR facts serve as the concrete roles-vs-facts example.
13. Ending: discipline wins; Petrus named once ("It is early, and it is not
    the point of this essay. The point is the discipline."); reader leaves
    with an actionable move.
14. Routable: one paragraph of lineage/gratitude, no case study.
15. Purposeful repetition of the slogan is accepted by the Navigator.

## Unresolved choices

- Navigator's full second pass over the entire draft (pending; explicitly
  planned by the Navigator).
- Compression pass (see procedure below), queued after the second pass.
- Whether to name HamsterDAN for the PR-readiness experiment (currently "the
  pull request problem" / "that experiment").
- Whether to link a Petri-net explainer/video in "The net is the program".
- Frontmatter not yet drafted (see publication procedure).
- Final title confirmation ("The Agent Is Not the Loop" is the working title).

## Compression-pass procedure (queued)

Goal: shrink total length without losing punch. Method agreed with Navigator:
- Cut re-emphasis: each claim gets stated once at full strength; delete
  restatements unless the repetition is the settled purposeful slogan return.
- Reduce staccato density: merge short-sentence chains into explanatory
  sentences except where a short line is the earned punch of its section.
- Prefer facts over verdicts; delete narration about the argument itself.
- Preserve all settled lines verbatim (slogan, diagnosis line, support line,
  "When edges carry summaries, every node becomes an interpreter", "The happy
  path hid the coupling. Retry revealed it.", "Readiness belongs to the
  system. Judgment belongs to the agents.").
- Present result to Navigator as a full snapshot next to the settled version.

## Frontmatter / publication handoff procedure (only after Navigator accepts)

1. Draft frontmatter matching existing posts (see
   `src/content/post/making-sense-of-harness-engineering.md`): `title`,
   `publishDate`, `description`, `coverImage.src`/`.alt` (cover image to be
   generated/approved by Navigator).
2. Move accepted article to `src/content/post/the-agent-is-not-the-loop.md`.
3. Do not push or publish without an explicit new instruction.
4. Handoff message to map thread
   https://ampcode.com/threads/T-019fcc36-f2df-77b9-b301-dd4968c4665c must
   include: canonical article path and status; settled thesis, reader effect,
   voice/structural rulings, key exclusions; claims verified with exact
   sources; unresolved issues; what validation ran; proposed map changes as
   proposals only.

## Resumption steps for a successor thread

1. Read `drafts/the-agent-is-not-the-loop.md` (current artifact) and this file.
2. Read the source thread and studio thread for anything ambiguous here.
3. Confirm with the Navigator where to resume (default: their second pass).
4. Maintain full-snapshot proposals and all rulings/guardrails above.

## Source guardrails (binding, from source thread)

- No landing-copy slogans in essay text.
- No internal vocabulary: marking, enabledness, Instance, capital-H History,
  semantic plane.
- "Durable" modifies record/state, never outcome.
- No exactly-once, arbitrary-scale, hostile-isolation, or "shipped" claims.
- Petrus is publicly pre-beta; avoid maturity/license claims beyond that.
- Single-writer/append-only/canonical history are Petrus's chosen guardrails,
  not laws; single-writer is per instance.
- HamsterDAN does not use Agenticus; no approval/merge authority implied.
- Historical petrus-engine/petrus-viewer are not current capability evidence.
- Token cost/latency are consequences, not proof.
- Do not claim graph frameworks (LangGraph etc.) inherently model workers;
  critique the habit, not the tools. No notation essentialism (a Petri net
  can encode a bad org chart too).

## Evidence / external sources

- Steve Yegge, "The Shape of Things to Come" (Aug 2026):
  https://yegge.ai/essays/the-shape-of-things-to-come/ (gave up on reusable
  harnesses; "chemically bonded"; fourth orchestrator; do NOT use his token
  spend figures).
- Dexter Horthy, "Why Software Factories Fail (or: harness engineering is not
  enough)": https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/wsff.md
  (lights-off factory; maintainability, no fast oracle for design quality;
  his diagnosis is adjacent, not ours).
- Talk: https://www.youtube.com/watch?v=Ib5GBkD555M ; HN:
  https://news.ycombinator.com/item?id=49023019
- Petrus repo (henriquebastos/petrus): landing copy at
  docs/project/roadmap/cv19-petrus-public-presence/landing-page-content.md;
  harness-is-the-net doc at
  docs/references/2026-07-11-harness-is-the-net-anthropocentric-substrate.md.
- Voice reference: src/content/post/making-sense-of-harness-engineering.md.
