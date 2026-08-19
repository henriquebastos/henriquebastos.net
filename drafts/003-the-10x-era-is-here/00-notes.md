# Source notes: Agentic Development and Value Throughput

The raw voice note recorded on August 14, 2026 appears first. The durable
decisions collected from later clarification and argument review follow it.
Intermediate source-note files were consolidated here after the process
retrospective.

I have an idea for a new article and to start a new draft process a new blog
post I will share my thoughts freely here I don't know the title the theme I
just feel there's a I'll see the facts and then things will emerge so I'm
observing companies rushing to move into agentic development where programmers
do not write code and agents write code and I feel I feel I feel pressure
happening for developers to do more parallelized work.

Companies want to ship faster, ship more code And the problem is So agentic AI
and coding agents and agentic programming Is not a new, is not only a new tool.
And most people are dealing with this as a new tool. It's a paradigm shift.

We have to go back and rethink software development from first principles so
the Adding agents to the same way you do we the industry used to do software
development, I don't believe this will work. And I already see symptoms that
it's not working.

I see developers burdened with a bunch of like PRs piling up. I see developers
suffering because now CTO is creating PRs and the product people is creating
PRs and designers is creating PR. Everyone is touching the code, it's touching
the system. And the companies and the companies are trying to rearrange
themselves into making developers code reviewers and what's hidden is This
quakes have big imbalance because People who generate the PRs are not the one
responsible for ensuring they will run properly and the variants will hold.

And this is not a new problem. We've seen this before. It remind reminds me of
the Toyota story where Toyota worked with um texture, um, textile industry and
there was a textile machine and if it's called the weaver in Portuguese it
would be called teah and they had a big problem where the machine broke but
kept working wasting the input, the threads that went came in so you you lost
source material so this management solution was putting a human being
babysitting the machine, so when the machine broke, the human being would stop
it really fast to minimize the waste, and then fix the machine and move it to
run again.

And of course this has scaling problems, right? And metrics problems. There's
there's a contradiction. The contradiction is the machine is a lot faster than
the human being to produce to generate output but only on the good conditions
and you cannot trust the machine to know everything is right so you have to use
a human being judgment to make it right and to compensate and to stop the
machine to produce bad things.

When the Toyota boss Taishio, I think his name is Taishiono. He saw that, he
thought it was an absurd so he went up to create a new machine that had a
quality barrier so when the machine when something broke the machine detected
and stopped and then fired an alarm and that would fire a human being that a
machine needed help.

So now instead of stopping the machine to avoid waste, the human was going
there to fix it to improve throughput. And now of course that scales because
you don't need human attention, you don't need human judgment reduced into
attention monitoring process to babysit machine.

I believe that this is what they call pokay. And now it scales better because
you have metrics about how machines fail so we can provision mechanical
engineers to fix them right you can balance that and the more you get the more
you make the machines work, the less you need those people devoted to that
function, they can do a higher level functions.

Creating even better machines. So I believe this maps perfectly to what's
happening in software development right now. Everything is new, everything is
happening fast, but I don't think it's just a matter of tooling. It's not that
we have a new tool.

We have a complete new paradigm. It's a complete new paradigm. We have to
rethink software development from first principles.

So we're seeing s I I see companies and people trying to adopt this Agentic
strategy without rethinking the process. And there's all sort of princip
conflicts happening, contradictions happen. One is I see developers burnt out,
I see developers being moved into uh pure code review role I see PR spiling up
I think that's the canonical one but PR spiling up because now any people with
access with access to a coding agent can create a PR and I don't think this is
a problem.

I think that's the way it should be. Yeah why not? Why can't a support person
create a PR for fixing a pixel issue or a color or an icon or a button on the
wrong place? Why a designer cannot create there for a new screen or changing a
button behavior?

So yeah, they should be able to. That's not the problem. The problem is there's
no safe way for them to do it because they see even if they see things working
on the surface they don't see they they cannot judge what's the impact of that
change the change on the system and this is where developers come in so now
what's happening is the PR influx, the people who create PRs are not the one
responsible for For ensuring they will work properly.

And because everyone wants to move fast, it will pile up and then developers
will be the bottleneck. And of course then you create metrics on developers how
long up here is in review mode what's going on So You're trying to solve a
paradox.

You're trying to solve the the incentives are not aligned. The flow is not
aligned. Right? So you don't have a and also it comes to mind that these
companies are optimizing code output and not out optimizing value outcome. And
I think this is a very, very big point Also, I see how the work is designed,
the value flow is designed, right?

One thing is to push, you push work from one step to the other. The other thing
is you pull, work is pulled naturally because there's a vacuum in front of it.
So if you push you're starting queuing things. If you pull Then you create
flow.

But then when you think about how to change this in software development, you
have to challenge a bunch of things. The first one to change is why a PR? Why a
pull request is necessary? Is a pull request necessary?

Why? Oh because we need to review and sock too, whatever. You need
traceability, you don't need a pull request for traceability. Changes must be
auditable. That's fine. Git is auditable, it's already there.

But my question is why for example, just as a small example, as I I see
happening with me, I don't want to do PRs. I have an agent in a sandbox with
everything that's necessary that ran the entire CI with the code changes there.

Why a PR? Why my colleagues are not either cloning or observing those changes
with an agent on that sandbox? Ask a question and making a judgment c And ask
their agents to run the code and to generate videos and generate explanations
and and applying changes as they see.

So maybe IPR is not necessary. Even a branch is not necessary because if we do
this and like two people agree on and they're the they're responsible for the
change, they go and merge. It's good enough. And if you add the proper
instrumentation to the code and to the system and logs and you have systems
agents things monitoring the behavior of the system, monitoring what's going
on, then you you can quickly react to it.

And you can do it with feature flags and other structures you can you know
release this not to everyone at once But how you can establish predictable
progressions, right? It worked for those people, everything looks fine, more
people, all the way into okay, remove the future flag, and everything is good.

So now we go end to end-to-end with your work. The development work doesn't
stop with the code, the code being merged. So a lot of the practices from the
era where coding was extremely expensive, we were trying to optimize code
generation and trying to make sure we are coding the right way for the right
reasons and we have all we have also constraints because code are so
expensive.

I needed one code one feature, the same feature for all my customers. That's
the SAS vision, right? One product with enough features that works for 80% of
the people and then you can sell the same project to everyone but now code is
not cheap anyway now code is cheap.

So why do you need one product to everyone? Of course if you have one specific
to each one it might be hard but you know the tension changes the structure of
the parts changes and the cool thing is that all the discipline that we used we
had to learn with extreme programming and and all the attempts, all the good
stuff in software engineering, now it's it's necessary it's absolutely
necessary to ensure a good architecture to allow for high productivity.

You can't be productive. You couldn't in in in normal software development.
But you can't be productive in with coupled codes with AI at all.

I think this is the gist. I have more to speak about to say about but you can
probably look at this. Look at what you know about software development,
engineering, software development like cycle and create questions that I could
answer to enrich this text.

If you already see what matters, like the core, or one or more you can propose
as well, and then I'll have a hunch, you know, by exposing several options of
how what's look like it's the core of the article, then I can react to it and
we can still in the you know conceptualized briefing mode.

I don't want to rush to the next mode.

## Decisions that survived later review

- The article maps a transition rather than prescribing a methodology. Henrique's
  experience, intuition, and reading of the market lead. Historical claims still
  require factual support.
- Code is investment and inventory. Software realizes value through running
  behavior that serves users across time. Agents compress the investment side
  without changing where value lives.
- The inherited pipeline was a rational response to slow construction, temporal
  risk, coordination, and entropy. Treating it as foolish would weaken the
  argument.
- The central leadership failure is optimizing visible local outputs after the
  value path has been fragmented across the company. The structure explains the
  mistake but does not absolve leadership of responsibility for redesigning it.
- The Toyota loom supplies the production-system turn. Safe parallelism emerges
  when machinery detects abnormalities and calls for judgment instead of
  consuming continuous human attention.
- The positive alternative is wide exploration under one narrow value target,
  followed by deep engineering. Product scope stays constrained while evidence,
  architecture, operation, instrumentation, and quality receive more attention.
- Parallel agent execution is useful. Parallel human objectives are the problem.
  Long-running work can queue results while one person remains focused on the
  same design and applies judgment when needed.
- Cheap agent time makes stronger engineering more affordable and more necessary.
  Without architecture and discipline, increased production accelerates entropy.
- Controlled exposure, observation, and repair belong to the present value loop.
  Multiplayer environments and production-connected agents belong to the bounded
  future horizon.
- The future branch should stay concrete but short. Amp multiplayer and Zed Delta
  are visible fragments, not claims that the final production system exists.
- Explanation must move from concrete experience to abstraction. The leader,
  one feature, the watched loom, and the six disposable approaches produce the
  concepts instead of decorating them.

## Preserved independent sources

- [Typecraft transcript](00-typecraft-transcript.md), with the relevant account
  beginning around 07:12.
- [Syntax transcript](00-syntax-transcript.md), with Aaron Francis's move from
  broad to deep beginning around 15:19.
- [Joran Greef interview transcript](00-tigerbeetle-transcript.md), with the
  software economics discussion beginning around 54:00.
