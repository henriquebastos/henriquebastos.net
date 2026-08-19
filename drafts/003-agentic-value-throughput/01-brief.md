# Brief: Agentic Value Throughput

Working name only. The title has not emerged.

This brief is the first hypothesis produced from the source notes. It must be
settled enough to bound the claim inventory, but the graph and prose are
expected to change it.

## Topic

Companies are adopting coding agents as a multiplier inside a software
development system designed around scarce human coding capacity. The visible
result is more work moving in parallel through the same tickets, branches,
pull requests, CI, and review queues. The more consequential possibility is
not doing more of the old work at once. It is changing the shape of the work.

This is not a neutral mismatch. Companies have fractured the path from
engineering work to experienced value across specialized functions, so leaders
measure the visible artifacts produced by their local stage: code, tickets,
features, and roadmap progress. They demand more of those outputs as though
access to agents creates productivity by itself, then use developer attention
to compensate for the unexamined coordination and quality burden. Teams are
being pushed to produce more before their companies understand what became
possible, what became dangerous, or what system the new work requires.

Agents and shared executable environments could let a team follow one thin
line of value through design, implementation, architecture, validation,
integration, release, observation, and repair. The familiar handoffs might
shrink or disappear because people and agents can collaborate around a live
system instead of exchanging static artifacts after periods of isolation.

The article maps the coherent old system, the tension created by injecting
agent output into it, and the different future that tension makes imaginable.

## Audience

Developers and engineering leaders watching agentic development become a
demand for greater individual output and more parallel work. Some are already
absorbing the pressure and exhaustion produced by that demand. They recognize
the existing pipeline and can feel its coordination costs, even if they have
not questioned why its boundaries exist.

## Why

The industry is asking how one developer can produce ten times more without
finishing the question: more code, more features, or more value?

The immediate trigger was Typecraft's video "I was replaced by AI." He
describes returning to a company where AI was being pushed hard on developers,
project managers were creating pull requests, and everyone was racing to ship
features for the expected return of becoming a 4x or 10x engineer. The result
for him was harder and longer work, constant agent babysitting, and burnout.
Henrique recognizes the same blind pressure in what friends across the
industry are experiencing.

The Syntax video "The True Cost of AI Coding" adds a useful contrast. Aaron
Francis describes abandoning the broad ambition to build forty products and
increasing his vertical ambition on one or two instead. He calls the change a
move from broad to deep and reports that he did not burn out. The video also
notes that he controls his own workload, while an employee under output
pressure may not be free to establish the same limits. Together, the two
accounts point toward the shape of the work and the system around it rather
than treating the tool itself as a mechanical cause of one human outcome.

For decades, developer time made code expensive. Tickets contained the cost of
mistakes. Branches isolated parallel changes. Pull requests synchronized
developers after periods of private iteration. CI reassembled the parts and
certified a stable main branch. Platform and operations work carried that
branch into production. The system was a rational response to its constraint.

Joran Greef's explanation of software economics adds a distinction the article
needs to preserve. Scarce coding was a production constraint, but code was
never the economic output. One implementation becomes valuable by running for
many users over many years. Building and maintenance remain roughly linear
inputs while the value of the running asset can grow exponentially across users
and time. Quality and harm are amplified by the same scale.

Customers buy the resulting value, quality, and experience rather than the
development time embedded in the code. Collapsing coding cost therefore does
not collapse product value. Treating code volume or pull requests as
productivity mistakes a cheaper input for the output of the system.

Coding agents change the cost and location of that work. Leadership cannot
obtain the resulting transformation merely by demanding more productivity.
Using agents only to increase output sends more inventory toward the existing
handoffs, moves the bottleneck into review, and makes developers carry the
contradiction. It treats the old constraint as though it still defined the
system.

At the same time, cloud sandboxes, persistent agents, multiplayer sessions,
executable architectural rules, richer automated evaluation, progressive
delivery, and production observability suggest another shape. A narrow feature
can be complete in depth from its first tracer bullet. Humans can remain at the
level of intent, design, and judgment while agents spend time crossing and
maintaining all the layers beneath them.

That shift also changes what development tooling optimizes. Local IDEs were
organized around a developer performing and personalizing the implementation.
When agents carry the mechanical work across layers, typing speed stops being
the primary constraint. Amp, HumanLayer, remote environments, and multiplayer
tools look like fragments of an unfinished production system organized around
human direction and judgment instead.

## Central tension

Agentic development is being used to widen a pipeline built for scarce coding,
while its deeper possibility may be to collapse that pipeline around a shared
end-to-end value loop.

The old pipeline was organized around a costly input. The value of software was
always in its running effect across users and time. Coding agents weaken the
input constraint without changing where the economic value resides.

The pipeline also fragments development from that running effect. It commonly
calls the work complete at merge, before controlled exposure, observation, and
repair reveal whether the investment produced value. Agents may accelerate the
loop, but they do not create the need to reconnect it.

Parallelism is the visible target in the first model. In the second, agent work
can still run in parallel, but it converges on one value direction instead of
multiplying objectives that compete for human attention. Safe parallelism
emerges as a consequence of redesigning the system.

Leadership wants the return from a new production system while treating
agentic coding as a magic wand waved over the old one. Developers receive the
pressure, the queues, and the responsibility for whatever the wish failed to
engineer.

## Promise

The reader will see why the familiar development pipeline formed, why
multiplying code production inside it creates both an anachronism and a human
cost, and what could become possible if the unit of collaboration changed from
an isolated patch to a live vertical path toward value.

The reader will also see why cheaper code does not make code the unit to
optimize. Software turns linear development effort into a scalable asset, so
quality and failure both compound across its users and lifetime.

The article offers a way to see the transition, not a methodology for managing
it. It leaves the reader with a different question from "How much more can a
developer produce?": what could software development become once producing
code is no longer its organizing constraint?

## The possible future

The future model is intentionally a vision rather than a proposed workflow.
It is not a prerequisite for correcting the current output target. One
developer can already concentrate parallel agent work beneath one intention,
remain focused, gather better evidence, and invest more deeply in the narrow
path's engineering. New collaboration and production machinery becomes a
separate question when that practice scales across a team and company.

Its visible contours are:

- A shared executable feature environment replaces the local checkout as the
  primary place where the work lives.
- Multiple humans and agents can enter that environment synchronously or
  asynchronously as their judgment or expertise becomes useful.
- The running behavior, implementation, tests, architectural invariants, and
  generated evidence remain available together.
- A colleague can exercise the feature and interrogate its agents instead of
  reconstructing the work from a static diff.
- CI's functions can move into the environment instead of arriving as a
  separate downstream gate.
- A thin tracer bullet can include its production scaffolding,
  instrumentation, and controlled exposure from the beginning rather than
  becoming real after a proof of concept is approved.
- Trunk-based integration, latent code, feature flags, limited exposure, and
  rapid observation can make review proportional to blast radius instead of a
  mandatory handoff for every change.
- Production behavior and repair remain inside the development loop instead
  of becoming a later operational concern.
- Production signals can trigger agent investigation before a trend becomes a
  human-visible incident, returning narrowed evidence or a candidate repair for
  judgment.
- Humans guide a large amount of activity they do not perform mechanically,
  applying attention where direction and judgment matter.
- Long-running research, measurement, experiments, and implementation can run
  concurrently under one intention. Completed work waits for human judgment
  instead of making the human continuously schedule and watch every agent.
- Agents can search for failures and strengthen quality rather than being used
  only to construct more implementations.

Going deep does not mean working serially or increasing scope before feedback.
The first behavior can be narrow while parallel investigation and execution
strengthen the complete path carrying it from intent to production observation.
Once that path establishes something worth strengthening, agents can widen it
into more behavior and more variants.

That depth is both newly affordable and increasingly necessary. Agent capacity
can move architecture, evaluation, instrumentation, and behavioral evidence
into the first real version. Without the discipline that protects those
structures, the same production capacity accelerates entropy and makes every
later change more expensive.

The complete transition remains speculative but belongs as the essay's
horizon. Immediate corrections can happen inside today's tools. Realizing the
larger potential may require software development to become more real-time and
reactive to production, with confidence and response distributed through the
system instead of concentrated in a downstream code-review queue. Amp's
orb-backed multiplayer and Zed's Delta make parts of the collaboration change
visible; the production-connected system is still being invented.

## Toyota's role

The loom makes the contradiction concrete. Increasing machine speed while a
human must continuously watch for failure couples every increase in machine
capacity to more human attention. Sakichi Toyoda changed that relationship by
building abnormality detection, stopping, and signaling into the loom. Normal
operation stopped consuming attention. A worker could attend several machines
because parallelism had become safe, not because the worker had been told to
watch faster.

The change also made abnormalities measurable. Humans could organize around
repairing failures and improving the machinery while machines produced at
machine speed. Their capacities could reinforce one another instead of human
attention compensating continuously for machine limitations.

The analogy supports the article's central tension: companies are trying to
parallelize the babysitting. The larger opportunity is to reconsider the
machine, the flow, the available measurements, and the place where human
judgment enters.

Historical details must remain accurate, but the analogy does not turn the
article into an empirical case for the envisioned future.

## Voice

First person, opinionated, exploratory, and grounded in Henrique's reading of
the market. The article maps what was, what Henrique sees happening, and what
he senses could emerge. It does not prescribe a target operating model or ask
current implementations to authorize the intuition.

The criticism of engineering leadership is part of the article's energy, not
a problem to neutralize into process language. Leaders are pushing teams for
returns they have not engineered and making developers absorb the cost. Keep
that anger precise: the target is blind pressure, local output measurement, and
the use of people to compensate for a fragmented production system, not wider
access to code or the people outside engineering who use it.

The structural explanation does not absolve leadership. Seeing across
organizational boundaries, connecting production measures to running value,
and changing a system that consumes people as compensation are leadership
responsibilities. Allowing the failure to continue while increasing output
pressure is a failure of competence, even when it is not malicious.

Uncertainty is part of the territory: Henrique sees the outline of a different
system without claiming to know its final machinery. State that boundary when
it moves the thought forward, not as a recurring disclaimer.

The general voice rules in [AGENTS.md](../../AGENTS.md) apply, including no
em-dashes and no prescriptive "you should."

## Deliberate exclusions

- This is not a blueprint for replacing pull requests, branches, or CI.
- This is not an argument that every change can safely bypass human judgment.
- This is not an argument that project managers, designers, or support people
  should be prevented from creating changes.
- This is not a comparison of local development with cloud development.
- This is not a claim that a complete replacement pipeline already exists.
- This is not a case study requiring measured proof of value throughput.
- This is not an article about TigerBeetle, its business model, Jepsen report,
  or implementation methods.
- This is not the adjacent argument that cheap code will replace one shared
  SaaS product with a different product for every customer.
- This is not an implementation guide to tests, AST analysis, sandboxes,
  feature flags, observability, or agent harnesses.

These may appear only when they make the central transition visible.

## Open language

The current working phrase is "value throughput." It names a desirable result
AI may help produce, not the article's economic foundation. The article has not
decided whether that phrase belongs in the final prose or whether value loop or
value feedback loop better names the possible result. That choice belongs to
the argument development and prose rather than the brief.

The title is open. "Ten times more what?", "parallelize the babysitting", and
"widening the pipeline or deepening the value loop" are source phrases, not
title decisions.

## How the source material changed the hypothesis

The first voice note appeared to center on jidoka, review queues, and building
quality into agent output. The clarification moved the subject outward: code
review is one boundary in a complete development system organized around
expensive coding.

The later note established the governing contrast between widening and depth.
The essay is not about making developers review generated code more
efficiently. It is about the anachronism of scaling the old pipeline when
agents make a different unit of work imaginable.

The editorial stance then removed an evidentiary requirement that did not
belong. Henrique's intuition leads. Historical and technical facts remain
accurate, but the possible future does not need to have happened already.

The Typecraft video and Henrique's experience through friends added the human
consequence and clarified the target of the criticism. The old pipeline is not
merely becoming inefficient. Engineering leaders are increasing pressure
without engineering the system that would make greater throughput safe, then
leaving developers to carry the resulting work and burnout.

The Software Unscripted interview added the missing economic explanation. The
old pipeline formed around the cost of producing code, but software value did
not reside in that cost. One implementation creates leverage through its users
and lifetime. Coding agents can collapse an input cost without changing the
value, quality, experience, or production consequences of the running product.

The Syntax video then made the alternative inside the central tension visible
in another developer's practice. Aaron Francis moved from broad product output
to deeper vertical ambition. His account does not make individual discipline
the answer. The video's own qualification about workload control reinforces
the article's criticism: human consequences depend on the production system
that companies build around the new capacity. Henrique's tooling observation
then extends that system beyond workflow into the environment where human
direction and judgment happen.
