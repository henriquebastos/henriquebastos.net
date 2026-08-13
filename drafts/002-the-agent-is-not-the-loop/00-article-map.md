# Petrus Editorial Map

> Travels with whichever article is currently being worked on. When the next
> one starts, move this file into its directory. It is a map of possible essays
> about the Petrus family, not a backlog and not a commitment to write them.

## Purpose

This is a low-resolution map of possible standalone essays about Petrus,
Impetus, Motus, Agenticus, Arx, and HamsterDAN. It makes conceptual areas,
relationships, and tensions visible so one article can be chosen and examined
at higher resolution.

The map is not the territory. It is not a publication sequence, backlog, table
of contents, or commitment to write every visible article. Each completed
article may add, remove, merge, split, or reconnect parts of the map.

## Editorial direction

- Every article must stand on its own.
- The collection should help developers understand why and how the Petrus
  architecture works, why it matters, how it can be used, and what makes it
  interesting.
- The purpose is to open discussion about agentic-system architecture, not
  merely drive adoption.
- Each article should carry one central tension and one meaningful reader
  transformation.
- Length follows necessary depth. Conceptual sprawl is not depth. Protect the
  reader's attention and time.
- Current implementation, qualified evidence, experiments, historical
  lineage, and future direction must remain distinct.
- Canonical names are Petrus, Impetus, Motus, Agenticus, Arx, and HamsterDAN.
  Ordinary Petri-net arcs remain lowercase.

## Current terrain

These areas are hypotheses about where essays may exist, not article promises.

### Hidden coordination

- The agent is not the loop.
- Agent systems become fragile when one loop owns process state, scheduling,
  recovery, and execution.
- DAGs and worker-role graphs can conceal cycles, waiting, joins, contention,
  human intervention, and changing external conditions.

### Durable process truth

- History is process truth, not retrospective logging.
- Replay reapplies accepted facts; it does not rerun external work.
- Waiting, quiescence, and dormancy can be healthy process states.
- Durable Instance identity and live Engine motion are separate concerns.

### Execution and authority

- Semantic History and operational queue custody are different durable truths.
- Distribution can route work without creating shared semantic authorship.
- A sandbox does not by itself solve credential custody, capability authority,
  effect fencing, continuation, cleanup, or recovery.
- Natural language can select bounded capabilities without receiving authority.
- At-least-once effects require stable identity, fencing, lookup, and recovery,
  not exactly-once mythology.

### Agent composition

- Agent state can be decomposed into Brain, Hands, Connection, Thread, Episode,
  and host-owned authority instead of one universal Session.
- Agenticus is optional Petrus-level composition over Impetus and Motus, not a
  fourth foundation or owner of canonical History.
- Agent-as-a-Net is a future falsifiable experiment, not current evidence.

### Human understanding

- Arx should make semantic and operational truth understandable without
  becoming a second semantic authority.
- Runtime progress and reader attention are independent cursors.
- Strict refusal and provenance-preserving presentation are product behavior,
  not merely parser implementation details.

### Concrete evidence

- HamsterDAN treats pull-request readiness as a living coordination system,
  not a task handed to one bot.
- Its strongest evidence concerns durable workflow, fresh provider authority,
  explicit human judgment, credential boundaries, and recoverable effects.
- HamsterDAN does not currently use Agenticus.

## Provisional relationships

- “The Agent Is Not the Loop” currently provides conceptual gravity, but it is
  not “part one” and does not commit the collection to its neighboring topics.
- Durable History connects process modeling to replay, waiting, recovery,
  distribution, HamsterDAN, and Arx.
- HamsterDAN provides concrete pressure tests for Petrus, Impetus, and Motus.
- Arx tests whether technically correct process structure remains cognitively
  understandable.
- Agenticus explores agent-specific composition after process and execution
  responsibilities are separated.

## Current focus

The first chosen article is **“The Agent Is Not the Loop,”** now being redone
under the process in `drafts/PROCESS.md`. Its prior material sits beside this
file:

- `00-prior-draft.md`
- `00-prior-editorial-state.md`

Neither is accepted or for publication. Both are source material to mine into
a new `01-brief.md`, not drafts to resume.

## Map review after each accepted article

After acceptance, review the map without forcing a change:

1. Did the article reveal a distinction the map missed?
2. Did two apparent topics become one, or one topic split?
3. Did a presumed relationship disappear or change direction?
4. Did the article create a clearer entry point into neighboring territory?
5. Which attractive ideas were excluded and still deserve visibility?
6. Which claims changed status because new evidence was produced?

Map changes remain proposals until the Navigator reviews them.

## Evidence provenance

The bird's-eye map was informed by read-only repository research in:

- Petrus: https://ampcode.com/threads/T-019fcc69-641c-72e8-bb41-d47adbb00a10
- Arx: https://ampcode.com/threads/T-019fcc69-6b22-736c-aa09-ee872e746f1b
- HamsterDAN: https://ampcode.com/threads/T-019fcc69-7333-746c-a875-453fc9cebf06

Those research threads are evidence inputs, not canonical editorial direction.
The Navigator's rulings in the map and article threads govern the work.
