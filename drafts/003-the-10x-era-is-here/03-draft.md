# Ten Times More What?

<!--
Status: Complete pre-review draft that entered author review on August 18, 2026.
It is preserved as the baseline for comparison with the reviewed article in
`src/content/post/the-10x-era-is-here.md`.
-->

An engineering leader watches an agent build in one afternoon what used to
take days. The demo works. The roadmap is full, competitors are moving, and the
obvious question appears: how much more can the team ship now?

That is not a stupid question. Everything the leader can see points toward it.
Tickets close. Pull requests merge. Features move to done. The expensive part
suddenly looks cheap.

Ten times more what?

Follow one of those features. The agent writes it, the tests pass, reviewers
approve it, and the code merges. The company spent less than it would have
before, but it has not created value yet, only a change that must be understood,
operated, maintained, and eventually used.

Value begins when the running feature does something useful for a customer.
The same implementation can serve thousands of people for years. A useful
behavior scales across them. A defect scales across them too.

I heard [Joran Greef explain the economics of
software](https://www.youtube.com/watch?v=8br5QcmYq84), and he gave me the
language for what just happened. Building the software was the expensive input,
not the economic output: research, design, code, tests, architecture,
infrastructure, and maintenance are investment. Code is inventory.

The cost of building and maintaining the system grows roughly linearly, while
the value of the running system can grow much faster across users and time.
Customers buy what the software makes possible, along with its quality and
experience. If I can create the same value with less code, that is a better
result, not a smaller accomplishment.

I have been working in software for more than thirty years, and the desire to
remove the developer constraint is not new. Developers are scarce and
expensive because their work and judgment can create an asset with that kind of
leverage. The market keeps trying to obtain the scalable return without waiting
or paying for the scarce input.

Rapid application development tools, low-code platforms, and no-code platforms
all solved localized problems. They made particular kinds of software cheaper
to build, but they fell short of removing software development. Developers
moved upward into the architecture, integration, design, and judgment the tools
could not contain.

The larger transformations changed more than construction. The Internet
changed distribution and, with it, how software was built and updated. The Lean
Startup movement attacked investment risk before market fit through small
experiments designed to learn whether something valuable existed before anyone
put fuel in the engine.

Coding agents bring the same old problem back with a much more powerful tool.
They can remain another local accelerator inside the coding stage, or they can
help move the whole investment-to-value loop to a higher level. The response I
keep seeing is to expand the inventory. If a roadmap was expected to take two
years, perhaps agents can finish it this quarter. But a roadmap is still a list
of investments the company hopes will become valuable. Completing it faster
does not improve the hope.

## Alternate timelines, now faster

The software pipeline we inherited was built around a real constraint.
Software construction was slow, and building the wrong thing put a large
investment at risk. The work had to be divided among developers moving at
different speeds, then repeatedly reconciled before the whole system could run.

A ticket bounded one piece of the investment. A branch isolated the change by
creating an alternate timeline. Main kept moving, the branch kept moving, and
every other branch created another possible future racing beside them.

A pull request forced those timelines to meet. Reviewers reconstructed the
intention and risk from the diff. CI checked whether the proposed future could
rejoin the current product. When the checks passed and people agreed, the
branch became part of the timeline called stable.

This ceremony was not arbitrary: it coordinated scarce human work and limited
the risk that accumulated before production. It also resisted entropy. A
provisional shortcut can help a startup find product market fit, then become
the foundation of the successful product. Every valuable change after that has
to accommodate decisions made when survival mattered more than the future.

Agents make the alternate timelines move faster. They do not make the collision
go away.

Most companies I see are keeping every boundary and multiplying what enters it.
More people can create changes. More agents can open pull requests. More
features can race toward release. The first result is more inventory waiting
for integration and judgment, not more value.

The name "pull request" is doing wonderful public relations for a push system.
The change already exists. Now someone downstream has to stop, reconstruct it,
and accept responsibility for what happens next.

That responsibility usually lands on developers. A plausible implementation
and a good change to a running system are different things. Someone still has
to see the hidden coupling, the architectural consequence, the invariant the
change breaks, and the behavior nobody thought to test. Generation expands.
Accountability concentrates.

The organizational structure makes this mistake easier. Engineering owns code.
Product, sales, support, and customer success own different fragments of the
customer's experience, while platform and operations own other parts of
operating it. Each function measures what it can see: in engineering, tickets
close, pull requests merge, and roadmap items move. Measuring value requires
following the work beyond those local outputs and connecting it to what changed
after the software ran.

Coding agents arrive, local output becomes cheap, and leadership asks for more
of it. Developers absorb the coordination, review, and quality burden. Then
their finite attention becomes the next bottleneck to optimize.

[Typecraft's account](https://www.youtube.com/watch?v=0Lo6MSGrxEA) gave this
failure a human body for me. He returned from paternity leave to a company
pushing AI throughout the organization. People talked about becoming four or
ten times more productive. Project managers were opening pull requests. The
company raced to ship features before competitors did.

The agents did not make his work lighter: they added more activity to follow,
more output to evaluate, and more pressure to carry. The same machine that
could continue producing while he slept gave him another reason to keep
checking while he was awake.

I keep hearing versions of this from friends. The coordination and judgment
that the production system fails to absorb return as stress, longer hours,
continuous babysitting, and lost ownership. Fragmentation explains why
leadership falls back to visible output, but it does not absolve leadership.
Seeing across functions, connecting activity to outcomes, and changing a system
that consumes people as compensation are leadership responsibilities. Applying
more pressure while allowing the same failure to scale is incompetence, even
when nobody intended the damage.

## The loom did not need a pep talk

Toyota's production system has roots in textile machinery. An automatic loom
could produce cloth much faster than a person while the thread remained intact.
When a thread broke and the loom kept moving, the same speed wasted material
and produced defects faster.

The immediate response was reasonable: put a person beside the machine. The
loom supplied speed while the person watched for the condition it could not
recognize and stopped it when something went wrong. More looms then required
more watchers, or one worker had to divide attention among several machines.
Every increase in machine capacity consumed more human attention.

Sakichi Toyoda changed that relationship. He built abnormality detection,
automatic stopping, and signaling into the loom. The principle became
[jidoka](https://global.toyota/en/company/vision-and-philosophy/production-system/).
Normal operation stopped consuming continuous attention. The machine called
for a person when judgment was needed.

The stop protected the cloth, but the signal changed the human role too. A
failure became an event the production system could observe. People could
repair the machine, study repeated failures, and improve the conditions under
which production continued. The machines ran at machine speed while humans
improved the system that made the speed useful.

Toyota did not obtain safe parallelism by demanding that workers watch faster.
It redesigned the machinery until one person could attend several machines.

This is what the current software multiplier gets backward. Adding more agents
while every output still depends on downstream human reconstruction does not
create leverage. It parallelizes the babysitting.

## Six disposable answers

I saw a different use of the same capacity in one of my own projects. The work
required a strategy that nobody had used inside the company. Without agents, I
would have relied on experience, a few affordable experiments, and the best
guess available within the schedule.

Instead, I tried six approaches.

Most of that code was disposable. Each implementation existed to expose a
limit, answer a question, or reveal one useful property. An agent could
investigate one direction while measurements and other experiments continued.
The work ran in parallel, but my objective did not. Every result fed the same
design.

Together, the six approaches showed me which solution was worth keeping. Then I
could build the complete path around it: user behavior, operations, platform,
architecture, instrumentation, and future scaling. The project took around two
months. By the shape of it, I estimate that it would previously have taken
around eight.

The speed is impressive, but it is not the part I want to multiply. Cheap
exploration let me avoid committing to the first plausible answer. The
discarded code bought the knowledge that made the final system deeper, and the
team that owned it could ship something better than we had originally imagined
without sacrificing the structures that would support what came next.

AI did not make product scope irrelevant: the value target remained narrow.
What expanded was the search, and what deepened was the engineering behind the
answer.

That distinction also changed my attention. I was not juggling six products or
six unrelated features. Research, measurements, and experiments that could
continue without me did so. Results waited until they needed judgment. I stayed
on one problem.

This is why [Aaron Francis's account](https://www.youtube.com/watch?v=iPUn1Fnfn0k)
resonated with me. Agent capacity first made him imagine forty products. Then
he redirected that ambition into taking one or two products further. He changed
the direction of his ambition, not its size. Going deep is not the opposite of
parallelism: parallel execution converges on one intention instead of
scattering human attention across many objectives.

Agent capacity can also protect the selected design. It can measure a database
query's impact before the choice hardens into architecture. It can search for
properties the tests fail to protect, inspect coupling, drive a browser through
the real interaction, and look for ways to break what it built. I use AST Graph
to make modularity inspectable instead of leaving it as an opinion a reviewer
has to recover from a diff. The experiments create better design knowledge. The
architecture, tests, instrumentation, and evidence preserve what that knowledge
produced.

The path cannot stop at merge because a merged feature is still inventory until
the running system reaches a user. A narrow change can integrate behind a
feature flag, carry its instrumentation, and reach the team or a small group of
customers before it reaches everyone.

Did people complete the task? Did the system remain healthy? Did an assumption
fail? A defect detected under limited exposure and repaired immediately can
produce less harm than a rarer defect distributed to every customer and
discovered through support weeks later.

Observation and repair give later work something real to strengthen. More
agents can widen the behavior after the narrow path establishes the value and
quality conditions that must remain true.

The behavior stays small. The path becomes complete.

## The level above the ticket

Much of this can happen now: agents can research and measure in parallel.
Architectural exploration and evaluation can receive more machine time.
Trunk-based integration, feature flags, observability, and controlled exposure
already exist. At team and company scale, these practices still feel ad hoc
because the larger production system has not caught up.

A ticket may be too low-level to contain a loop that crosses design,
implementation, architecture, release, observation, and repair. An abstract
goal such as "increase activation" remains too high-level to tell several
people and agents what must stay true. As developers move up the abstraction
ladder, the company has to find the working level between the ticket and the
goal.

Instead of handing over a static diff, collaborators may enter a shared
executable environment where the feature, system, tests, evidence, and agents
remain available together. Agreement can develop with the work. Production
signals may eventually call an agent to investigate a regression before the
trend becomes an incident. Amp's multiplayer orbs and [Zed's
Delta](https://zed.dev/blog/introducing-delta) look like fragments of that
future, not the completed system.

Leadership does not need to predict the final tool stack. It does need to move
above code output, ticket counts, and agent utilization. The new work is to
bound the value intention, protect the conditions that make quality possible,
and connect the investment to its running result. That higher level turns cheap
experiments into better design while keeping shared environments and production
response pointed at the same value intention.

AI has made code faster. Whether it makes software better is now a leadership
decision.
