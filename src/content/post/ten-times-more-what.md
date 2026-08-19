---
title: "The 10x Era Is Here. Ten Times More What?"
publishDate: 2026-08-18
description: "Coding agents make code cheaper. The real opportunity is to improve how software creates value, not accumulate code inventory faster."
draft: true
coverImage:
  src: ./ten-times-more-what.png
  alt: "Aerial view of sports cars gridlocked on one interchange while traffic streaks past around them."
---

You are a software engineering leader walking out of a meeting where everyone
asked when the project will be done. You open the roadmap. It is already full.

Meanwhile, your team is experimenting with AI. You watch an agent build in one
afternoon what used to take days. The demo works. There is hope of shipping
before your competitors. The obvious question follows: how much more can your
team ship now?

That is not a stupid question. Everything in front of you points toward it.
Tickets close. Pull requests merge. Features move to done. Building software
suddenly looks cheap. We must go 10x!

It feels like a dream come true. The agent writes a feature, the tests pass,
reviewers approve it, and the code merges. The company gets a working feature
for less than it would have spent before. It is hard not to be blown away.

But there is a catch. We write code and build software, but that is what we do,
not why we do it. The value is not in the code. The investment pays off only
when someone uses the running system to solve a problem. That relationship
between running software and a happy user is where value lives.

## The Economic Magic of Software

Empires were built on software because the same implementation can serve
thousands of people for years. A useful behavior scales across all of them. A
defect does too. The leverage works both ways.

I heard [Joran Greef explain the economics of software very
clearly](https://www.youtube.com/watch?v=8br5QcmYq84&t=3240s). Building the
software was the expensive input, not the economic output: research, design,
code, tests, architecture, infrastructure, and maintenance are investment. Code
is inventory.

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
experiments designed to learn whether something valuable existed. Once it did,
the company could [focus entirely on
growth](https://paulgraham.com/earn.html).

Coding agents may be the most powerful technology of our lifetime. The danger
is using that power to expand inventory inside the same software pipeline. That
is the response I keep seeing across the industry: if a roadmap was expected to
take two years, perhaps agents can finish it this quarter. But a roadmap remains
a list of investments the company hopes will become valuable. Completing it
faster does not improve the hope. It can make the company look like it is
shipping faster while its software degrades faster.

To realize what coding agents make possible, software development has to change
around them. Their potential is not merely to accelerate coding while every
other boundary remains in place. It is to move the whole investment-to-value
loop to a higher level.

## A dev and an agent walk into a PR at 100 mph

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

This ceremony was not arbitrary: it coordinated scarce human work, limited the
risk that accumulated before production, and resisted entropy. A provisional
shortcut can help a startup find product-market fit, then harden into a
foundation that every later change must accommodate.

Agents make the alternate timelines move faster. They do not make the collision
go away.

Most companies I see keep every boundary and multiply what enters it. Product
managers, designers, support teams, and managers can now create changes
alongside developers. Agents open more pull requests, and more features race
toward release. The first result is more inventory waiting for integration and
judgment, not more value.

[Brandolini's law](https://en.wikipedia.org/wiki/Brandolini%27s_law) says
refuting bullshit takes an order of magnitude more energy than producing it.
Agent-generated changes create a similar asymmetry. Generating a plausible
change is cheap. Proving that it belongs in a running system is not. A pull
request pushes that change downstream for someone else to reconstruct and
accept, usually a developer. Hidden coupling, architectural consequences,
broken invariants, and untested behavior still require judgment. Generation
expands. Accountability concentrates.

This is the core problem: the value path is fragmented across the company.
Engineering owns code; product, sales, support, and customer success own pieces
of the customer experience; platform and operations own the running system.
Each function measures its own piece, so engineering counts tickets, pull
requests, and roadmap progress. When agents make those outputs cheap,
leadership asks for more, and developers absorb the coordination, review, and
quality burden. Their finite attention becomes the next bottleneck to optimize.

I saw the human cost of this in [Typecraft's
account](https://www.youtube.com/watch?v=0Lo6MSGrxEA&t=432s). He returned from
paternity leave to a company pushing AI throughout the organization. People
talked about becoming four or ten times more productive. Project managers were
opening pull requests. The company raced to ship features before competitors
did.

The agents did not make his work lighter: they added more activity to follow,
more output to evaluate, and more pressure to carry. The same machine that
could continue producing while he slept gave him another reason to keep
checking while he was awake.

I keep hearing versions of this from friends: stress, longer hours, continuous
babysitting, and lost ownership. Fragmentation explains why leadership falls
back to visible output, but it does not absolve leadership. Seeing across
functions, connecting activity to outcomes, and redesigning a system that uses
people to compensate for structural failure are leadership responsibilities.
Applying more pressure while scaling the same failure is incompetence, even
when nobody intended the damage.

## The solution is older than software

The embarrassing part is that this production problem was solved 130 years ago.
Toyota traces the lesson to [a loom built in
1896](https://global.toyota/en/company/vision-and-philosophy/production-system/).
We are making the same mistake again.

An automatic loom could produce cloth much faster than a person while the
thread remained intact. When a thread broke and the loom kept moving, the same
speed wasted material and produced defects faster. The immediate response was
reasonable: put a person beside it. More looms required more watchers, or one
worker dividing attention among several machines. Production scaled. So did
vigilance. Does this ring a bell?

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

This is what the industry gets backward about coding agents: adding more agents
while every output still waits for downstream human reconstruction does not
create leverage. It feeds the same traffic jam at machine speed.

## One target, deep engineering

A technology this powerful gives me reason to rethink software development from
first principles instead of feeding more work into the old machinery.

I saw a different use of that capacity in one of my own projects. The work
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
around six.

I did not use agents for research and then return to an IDE for the real work. I
worked through coding agents from beginning to end. I designed with them, built
the context they needed, and used them to implement both the disposable
approaches and the system we kept.

The speed is impressive, but speed is not what I want to multiply. Cheap
exploration let me avoid committing to the first plausible answer. The
discarded code bought the knowledge that made the final system stronger without
sacrificing the structures that would support what came next. I am happy with
the quality. The team is happy too, and they are already building new things on
top of the system.

AI did not widen the product scope. The value target remained narrow, but I
could take the engineering much deeper. I learned faster, measured the effects
of design choices across several layers before they hardened into architecture,
compared alternative implementations, and discovered where each one broke
down. Agents could search for properties the tests did not protect, drive a
browser through the real interaction, collect evidence for me to judge, and
look for ways to break what we had built. Those are the details I would usually
postpone to fit a schedule. I spent more time designing the system and less
time fighting the code until it worked.

I used plenty of parallel work, but I was not context-switching. I was doing one
thing the whole time. Research, measurements, and experiments continued without
me; their results waited in a queue until they needed my judgment. Instead of
juggling six unrelated features, I could keep following one vision deeper.

This is why [Aaron Francis's
account](https://www.youtube.com/watch?v=iPUn1Fnfn0k&t=919s) resonated with me.
Agent capacity first made him imagine forty products. Then he narrowed that to
one or two and raised his vertical ambition. He changed the direction of his
ambition, not its size.

That depth cannot stop at merge because a merged feature is still inventory
until the running system reaches a user. A narrow change can integrate behind a
feature flag, carry its instrumentation, and reach the team or a small group of
customers before it reaches everyone.

Did people complete the task? Did the system remain healthy? Did an assumption
fail? Limited exposure makes those answers part of the design. A defect found
and repaired there can produce less harm than one distributed to every customer
and discovered through support weeks later.

That is what I want 10x to mean: not more lamps scattering light across
the roadmap, but a laser focusing that energy on one value target and carrying
it through the system end to end, all the way to a user. The target stays
narrow. The engineering reaches all the way through.

## Free your mind

Everything is still changing fast. It is too early to lock any of this into a
fixed long-term answer. My development environment changes every few weeks: I
learn another technique, find another tool, and adjust my process. I build
software completely differently now than I did a year ago, and I expect that to
continue.

But it is not too early to choose a direction. Whatever its resources or
starting point, a company can aim this new capacity at accumulating code
inventory faster, or at increasing the whole system's value throughput: how
quickly an investment reaches a user, creates value, and informs the next
change. That second direction requires learning, experimentation, and a
willingness to take risks. In my experience, it pays off.

I can already see pieces of a new production system forming. [Amp's multiplayer
orbs](https://ampcode.com/news/multiplayer) and [Zed's
Delta](https://zed.dev/blog/introducing-delta) bring people and agents into
shared, executable environments. Conversation, code, running behavior, and
evidence can converge there. I do not see either as the final machinery, but
both are signs that software development is moving up another level of
abstraction.

Today, users experience the defect first, support eventually reveals the
pattern, and engineering reconstructs what happened. In a production system
connecting agents to running behavior, an agent can detect a negative trend as
it forms, narrow it to a regression, and prepare a repair with evidence for the
developer to judge. Detection and investigation move forward in time,
containing the problem before it becomes the product's reputation.

Getting there raises the bar for leadership. The bet is not to maximize token
spend or attach more developers to babysit more agents. It is to give teams
room to rethink how they design, build, evaluate, release, and learn from
software while keeping the whole system connected to the value experienced by
a user. Making that bet before the methods have settled takes courage. That is
part of the job.

AI has made code faster. Whether it makes software better is now a leadership
decision.
