---
title: "Making Sense of Harness Engineering"
publishDate: 2026-04-09
description: "Harness engineering was invented in 1999 — we just didn't call it that. The XP practices Kent Beck wrote about are being demanded again, now by AI agents."
coverImage:
  src: ./making-sense-of-harness-engineering.png
  alt: "A black horse wearing a glowing technological harness, running at high speed."
---

A harness is what channels a horse's strength so the force serves a purpose, repeatedly. You don't create the horse's strength. You channel it so the force serves a purpose, repeatedly, without having to tame the horse again each time.

A hydroelectric dam works the same way. The water and gravity already exist. Without the dam, the river flows and the energy dissipates. With the dam, every cycle of water generates work. The reservoir level is the accumulated state. Nobody needs to remember how much water there is. The gauge tells you.

And it's literally a loop: water falls, generates energy, evaporates, rains, fills the reservoir, falls again.

This is the idea I keep circling back to. When I pair with friends. When I read about AI agent workflows. When I notice some teams compounding their gains while others run in place.

A harness is what turns an ad hoc process into a loop by making the cost of the next iteration approach zero.

You don't create the force. You build the channel.

## What makes a process ad hoc

An ad hoc process is one that's designed from scratch every time it runs. No structure carries over. No learning accumulates. Each execution is independent of the last.

Context lives in someone's head. Restarting requires that person to reconstruct the setup and push through the same friction all over again.

Four properties define an ad hoc process:

1. Output doesn't feed input

2. Restarting requires human memory

3. Each execution costs roughly the same as the first

4. Context is lost between executions

A process becomes a loop when those properties flip:

1. Output IS the setup for the next execution

2. No one needs to remember anything

3. The marginal cost of the next iteration drops toward zero

4. Context accumulates in artifacts, not in heads

Deming described the loop in the 1950s. Plan, Do, Check, Act. Toyota built an empire on it. What none of them named was the infrastructure that makes the loop possible. Without it, PDCA is just a poster on the wall.

The harness is that infrastructure. The thing that converts one list into the other. The dam that turns a river into a power source.

## The harness fractal

This isn't just about code. The pattern operates at every level of abstraction.

**In code,** a test suite is the simplest harness. The test output IS the input for the next decision. Cost of the next iteration: near zero.

**In tasks,** a skill is a single command that encapsulates a procedure: commit, deploy, lint, migrate. The procedure is encoded, not remembered. That's a harness at the task level.

**In workflows,** a well-designed workflow moves through states: todo, in progress, review, done. Each state produces what the next needs. Artifacts carry context between states, not people's memory.

**In systems,** an orchestrator polls, dispatches, executes, reconciles, polls again. Retry happens with backoff, scoped to the failing unit. The system doesn't need a human to restart it.

**In codebases,** every new contributor starts from a better baseline than the last. The docs, linters, structural tests, and principles that encode "good" are the harness. Quality compounds across sessions.

At every level, the pattern is identical. The harness is what makes the next iteration cheap.

## Harness engineering was invented in 1999

In 1999, Kent Beck published Extreme Programming Explained. Every practice in that book is a harness-construction technique. We just didn't have a name for the meta-pattern.

1. **TDD** stabilizes the code after every change. You know immediately if something broke, instead of wandering through side effects trying to find what went wrong.

2. **Small releases** keep each iteration small enough to understand. When something fails, you know exactly what changed.

3. **Continuous integration** guarantees the codebase is always in a working state. Every iteration starts from a green baseline, not from "let me fix the build first."

4. **Refactoring** keeps the design simple enough to change safely. Without it, complexity accumulates until every change is a risk and every iteration starts with "I need to understand this first."

5. **Pair programming** adds a convergence loop between two minds. The machine only executes your commands. A pair challenges your reasoning in real time, catching flawed assumptions before they become code.

6. **Collective ownership** means anyone can pick up any part of the work. The loop doesn't block waiting for the one person who knows.

7. **Coding standards** make the code look the same everywhere. You read structure, not style. Signal, not noise.

AI agents need all of these properties to function. A codebase without them is an ad hoc process for the agent. Every session starts from scratch. The cost never drops.

Before AI, the cost of not doing XP was systemic. It showed up in lead time, incidents, throughput at the organizational level. Individual developers felt the inefficiency as stress, but the metric they used to evaluate themselves was personal coding speed. And by that metric, XP looked slower. Tests before code. Refactoring things that already work. Pairing when you could be coding alone.

The real cost was invisible because it was distributed across the system. Their measurement was local; the damage was global.

Writing code is not the bottleneck anymore. What's expensive is the environment not being ready for the next iteration. The AI agent stalls, produces garbage, doesn't converge. The cause is the absence of the properties XP always demanded. The cost that used to live at the company level moved to the individual.

XP was always harness engineering. The cost of ignoring it was always real. But it was hidden behind an organizational abstraction. AI made it personal and immediate. Developers who don't master XP values aren't just "slower." They're incompatible with the tool. They end up stuck in chat mode, running the loop manually, one prompt at a time.

## The minimum viable harness

"Systematizing is expensive." I hear this from friends all the time. It doesn't have to be.

Years ago, I visited a friend's office. He had a fancy espresso machine and offered me one. I asked if I could make it myself. He agreed.

I went through the full process myself: weighing the beans, grinding them to a certain size, brewing. When I finished pouring, I started cleaning up. He stopped me. Their culture was to clean before you use the machine, not after. You leave the mess for the next person, who cleans it as part of their setup.

That sparked an intense discussion. My argument: keeping the system tidy and ready reduces the time to value. If you clean after, you're already sipping your coffee while you do it. The machine is always ready for the next person. Walk up, press go, drink. If you clean before, the next person walks up to a dirty machine and has to wait through cleanup before they even start.

We disagreed. Their culture was settled. But the story stayed with me for years, because it captures a design decision that matters: where does the setup cost live in the loop?

Their version optimized for the current user's exit speed. My version optimized for the next iteration's time to value. That's the difference between a process that feels ready and one that feels like work before the work.

Readiness isn't just faster. It's emotionally lighter. You walk up to a clean machine, a green test suite, a repo that passes CI. The cost of starting is near zero. You don't have to think. You just go.

You don't need to reinvent your processes. You need to find the right places to draw clear boundaries.

A minimum viable harness is just that: one entry, one exit, clear boundaries. Inside the boundaries, non-determinism is free to happen. Outside, the world sees a stable interface. You don't need to control the interior. You need to contain it.

Programmers know what happens when functions mutate global state, depend on hidden variables, and produce differently shaped outputs depending on which path they took. Debugging becomes archaeology.

Processes break the same way. When boundaries aren't clear, effects leak between iterations. Someone needs to remember where things were. Setup cost grows. The loop degrades into ad hoc execution.

Start with one boundary. One process that today requires someone to remember where things were. Draw the entry, draw the exit, make it leave the system ready for the next run. That's enough. The rest improves with time, because now you have a loop, and loops compound.

## Improvement is not a separate phase

Most people treat improvement as something you do later, when there's time. There's never time. The trick is to make every iteration of the loop generate information about its own performance.

Remember the espresso experiments? Each shot told me something. Too bitter: grind too fine. Too watery: dose too low. Sour: extraction too short. I didn't need to stop and analyze. The information was in the output itself. The feedback wasn't a separate step. It was the taste.

I do this with my AI coding sessions. After each session, an automated review analyzes the transcript. Command line errors. Divergences between what was implemented and what code review found. Repeated commands that signal a missing tool. Moments where the agent wrote a throwaway script to parse something that should have been simpler. Every deviation is a signal pointing at a gap in the harness.

Every iteration produces different output. That's not a bug, it's the reason loops work. Each run is a sample. Some converge, some don't. The ones that don't aren't failures. They're signals pointing at where to tighten the boundaries next. Capture what happened, because that's how the harness gets better.

## Where humans stay

My first instinct with AI agents was to stay in the loop. Chat mode. Give an instruction, read the output, correct the mistakes, give the next instruction. I was the state machine. Every session started from my memory of the last one.

It was exhausting, and it didn't scale. I was correcting the agent instead of improving the environment. Each fix died with the session. The next session started from the same broken baseline.

The shift happened when I realized my job wasn't to correct the agent. It was to improve the harness so the agent doesn't need correction. When the agent produces garbage, the answer isn't a better prompt. It's a better linter rule, a clearer spec, a tighter boundary. Fix the environment, let the agent retry. That fix compounds. The prompt fix doesn't.

This reframes where humans belong in the loop. Not inside it, correcting each step. Between iterations, improving the conditions for the next run.

In practice, humans do three things:

1. **Steer.** Set the goal for the next iteration. Build this feature. Fix this bug. Direction, not execution.

2. **Evaluate.** Good enough. Needs rework. Wrong approach. Quality judgment at the boundary.

3. **Improve the harness.** New linter rule. Tighter constraints. A better workflow state. Meta-work that compounds.

The moment you find yourself carrying state between iterations, making routing decisions inside the loop, or being the only way to detect completion, you've reintroduced ad hoc execution. Step out. Encode what you know into the harness. Let the loop run.

The loop teaches you where human judgment actually matters. It's usually in far fewer places than you think.

## Brownfield and greenfield

Most developers work in brownfield. Large codebases, legacy processes, no clean slate. You can't stop everything and rebuild with harnesses. You don't need to.

The Strangler Fig pattern applies directly. Build a small loop beside the ad hoc system. Handle one slice of the work. Gradually route more to the loop until the ad hoc process starves.

1. **Pick the most painful repetition.** Not the most important system. The one where someone repeats the same manual work every week and hates it.

2. **Build the loop for just that slice.** One entry, one exit. The output is the setup for the next run. It doesn't replace the full system. It handles one path.

3. **Let the ad hoc system stay alive.** The loop handles case A. Cases B and C go through the old way. Next month, A and B. The ad hoc process eventually handles nothing.

4. **Never big-bang.** "Let's redesign everything as loops" is an ad hoc project to build a loop system. Ironic. It will fail for the same reasons ad hoc processes always fail.

I've been doing this in large codebases that aren't AI-first. You draw boundaries in new areas of the code, add harness progressively as you evolve. The existing code doesn't need to change all at once. The strangler fig IS a loop. Each iteration claims a little more territory.

In greenfield, the equation is different. If you're starting from scratch, start AI-first. Build the boundaries from day one. The cost of adding harness later is always higher than building it in from the start.

The hardest shift for a programmer isn't learning a new tool. It's resisting the instinct to tell the machine what to do. We've spent entire careers giving instructions. Write this function. Fix this bug. Deploy this. The muscle memory is deep.

Harness engineering asks you to step back. Stop telling the machine what to do. Start building the environment where the machine figures it out. The payoff isn't immediate. The first iteration is slow. But the second is faster. And the third. And every one after that.

An ad hoc process costs the same forever. A loop costs less every iteration. That's compounding.

Next time an AI agent produces garbage, don't fix the prompt. Fix the environment. Add a linter rule. Write a test. Tighten a boundary. That's your first harness. The rest follows.
