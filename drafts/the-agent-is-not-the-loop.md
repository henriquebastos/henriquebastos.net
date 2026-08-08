# The Agent Is Not the Loop

> STATUS: Working draft under active editorial sculpting. NOT accepted, NOT for publication.
> Studio thread: https://ampcode.com/threads/T-019fcf1d-6d30-75b0-9533-7e90f7052774
> Source/prior thread: https://ampcode.com/threads/T-019fccfa-221e-70c2-85c0-e4dbd85d4917
> Map/parent thread (handoff target after acceptance): https://ampcode.com/threads/T-019fcc36-f2df-77b9-b301-dd4968c4665c

---

Loop engineering revealed our need to move the bottleneck up in agentic programming. It was the next step in our search to transform AI's unlimited output capacity into valuable business outcomes.

Then, in about a week, we turned loops of To Do, Doing, Done into planner, coder, reviewer and called it graph engineering.

While token spend exploded, results have been dubious, and I believe the root cause is that we are conflating the agent with its loop, and the loop with the system. The side effect is that builders keep landing in the same place. [Reusable harnesses keep collapsing into bespoke ones](https://yegge.ai/essays/the-shape-of-things-to-come/). [Dark factories run until nobody understands what they produce](https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/wsff.md). These feel like new problems, born with agents. They are not. They are the oldest problem in software delivery, wearing new clothes: when the work is invisible, we manage the workers instead.

We have always described roles instead of work. An org chart tells you who belongs to a company, not how value moves through it. Lean and Kanban existed precisely to make work visible, because in knowledge work the work is invisible. You can see a person typing. You cannot see the queue behind them, the dependency they wait on, the rework loop they are stuck in.

Nobody writes the work system down because coordination comes naturally to us. We absorb it through conversation, memory, and judgment, and human intelligence quietly compensates for process state nobody represented. It works well enough that we never notice a model is missing. When outcomes drift, we reorganize the team or bring in consultants, because the org chart is the only model we have.

Then we automated. We automated the part we could see: the people. An agent resembles a colleague, so we gave it a job title. Planner, coder, reviewer. The work system between them stayed unmodeled, and we asked the agents to do what humans have always done: interpret, remember, negotiate, compensate. We are using intelligence to compensate for process state we never represented. Except now the compensation runs on tokens, and the longer the system runs, the more intelligence it spends keeping itself alive.

This essay argues for a different arrangement. An agentic system should express a system of work, not simulate an organization of agent roles. Model the work. Bind the workers later. What follows explains what that means, why it is the natural conclusion of how agents already execute, and what changes when you build this way.

## The system that narrates itself

Start with the failure mode. A planner agent writes a plan and passes it to a coder agent as a summary. The coder writes code and passes another summary to a reviewer. Somewhere around step four, a tool call fails. Now try to answer the questions that matter. Which steps completed? Which side effects already happened? Can we resume from where it stopped, or do we replay everything and hope? The honest answer is that you read the transcripts. Or you paste them into yet another agent and ask what it thinks happened.

The plan lives in one agent's context. The code's status lives in another agent's summary. The review verdict lives in a third. Nowhere in the system is there a record of the work itself. When edges carry summaries, every node becomes an interpreter. Each handoff is a retelling, and each retelling is a chance to drift. The system does not know its own progress. It narrates it.

## Process and execution were always separate

Here is the part we rarely say out loud. A language model call is stateless. Every turn, the loop gathers state from outside the model, composes a context window, and replays it into a function that remembers nothing. The model reasons, returns, and forgets. Then the loop does it again.

So the agent never actually held the work. The loop held it, in the shape of a transcript, and rebuilt the agent's mind from it on every call. What we call an agent is really two different things wearing one name. Execution: stateless acts of intelligence, reasoning over whatever context we compose. And process: the durable facts of the work, what exists, what is waiting, what may happen next. Execution belongs to the agent. Process never did.

Seen this way, the question is not whether to keep process state outside the agent. It already lives outside. The question is what shape it has. Today it has the shape of a conversation: a story that grows turn by turn, that only a model can interpret, that no one can query, measure, or resume from the middle. The alternative is to give it the shape of the work.

## Model the work

What shape is that? Start with what it is not: three columns. To Do, Doing, Done is a degenerate board. A serious map of work exposes what the columns hide: queues, waiting, dependencies, work in progress, rework, incidents, scarce capacity, external events, deadlines, and the policies that decide whether something may proceed. Kanban practitioners have known this for decades. The board is not a status display. It is a model of how value moves, precise enough to reason about.

There is a simple test for whether work is actually modeled: try to measure it. Teams that have run boards and burndown charts for a decade still cannot compute the basic indicators of flow. Lead time, cycle time, throughput, cost of delay. Not because the math is hard. Because the math needs inputs that were never captured: when work arrived, what it waited on, where it queued, how long it aged. You cannot measure a flow you never represented, and you cannot improve a pressure point your model erased. I know people who have truly mastered making work visible. I can count them on one hand.

The same test applies to agentic systems. Take a pull request. "Reviewer" is a role, and it tells you nothing about whether this PR can merge. What tells you is a handful of facts. CI passed on this exact commit. The approval covers this revision, not the one from three pushes ago. Every requested change has been resolved. The branch is current with its target. None of these facts belong to any agent. They belong to the work.

Modeling the work means answering plain questions, in this order. What is true now? What must be true before this task can start? What changes when it completes? What may happen independently of it? And only then: who or what should perform it? Notice that the last question, the one we usually ask first, is the only one that never touches the work itself. That is the whole argument in miniature. Model the work. Bind the workers later.

## What changes when the work is modeled

I can testify to the unmodeled version. I built that machine many times: agent frameworks, subagents, Markdown workflows, custom harnesses. Modular code, coupled execution. Routing, data flow, external effects, retries, and recovery all met inside one path. The happy path hid the coupling. Retry revealed it. And every time I learned something about the workflow, I had to rewrite the machine running it.

Make the facts of the work explicit and durable, and the properties flip.

1. **Retry stops being replay.** A failed step runs again from recorded facts, scoped to what actually failed, instead of replaying the whole story from the top.

2. **Progress becomes a query, not an interpretation.** What is true now has an answer that no model needs to reconstruct. The indicators of flow become computable for machines doing knowledge work, perhaps for the first time.

3. **Independent work needs no order.** Order exists only where the process declares a dependency. Parallelism stops being a prompt-engineering trick and becomes a property of the model.

4. **Workers become bindings.** If a step's prerequisites and effects are explicit, then who performs it, an agent, a human, a webhook, or plain code, is a decision you can change without touching the process. This is what "bind the workers later" buys.

5. **The system survives your learning.** When you discover a better rule, you change the model of the work, not the machine running it. My abandoned systems died precisely here.

## Start with judgment, extract the rule

None of this requires designing the perfect process up front. You rarely know the process yet, and that is exactly what agents are for. Start with judgment in the agent. Extract the rule when it stops being judgment: routing that repeats, checks that never vary, conditions for done that everyone can state. Move those into explicit state and policy, and let the agent keep what still requires judgment.

One invariant makes the extraction possible. The facts of the work must live outside any agent's context from day one. What this task is, what it needs, what it produced. If progress exists only inside transcripts, there is nothing to extract from later, only archaeology. That is what "later" means: binding is a separate decision, not a postponed one.

I have been testing this on the pull request problem. In that experiment, the object in the system is not an agent reviewing a PR. The object is the readiness of the PR itself, tracked as the facts from before. Agents still investigate, fix, and judge. They just do not keep the work alive in their contexts. Readiness belongs to the system. Judgment belongs to the agents. The work survives any of them.

Starting is smaller than it sounds. Pick one fact your agents keep re-deriving from transcripts. Which revision was actually tested. Whether the approval is still current. Make that one fact durable, outside any context window. That is your first piece of modeled work, and it compounds, because facts accumulate where transcripts only grow.

## The net is the program

I first saw this inversion work at Routable, on payment infrastructure. Multi-leg payment flows produce more possible timelines than anyone can script, and the way out was a very old idea: Petri nets. Stop writing every possible story. Represent the conditions and dependencies, and let the stories emerge. The topology shows what may happen. The recorded history shows what did happen. The current state says what is true now.

A Petri net is not a diagram of the program. It is the coordination program: executable rules for what may proceed, kept separate from whoever performs it. A transition in the net does not know whether an agent, a human, or a webhook will fire it. Those are bindings, decided separately. The slogan again, this time as architecture.

Petrus is my current attempt to build on this, a runtime where the durable thing is the process instance, its event history and its state, and agents live inside it as one kind of worker among others. It is early, and it is not the point of this essay. The point is the discipline.

## The agent is not the loop

None of this argues against agents, or against loops. A bounded exploratory conversation is correctly a loop that one agent owns. The discipline matters when work is long-running, multi-step, resumable, or consequential, when it must survive failures, restarts, and everyone's learning. Then the separation that was always there at the bottom should become the architecture. Execution lives in the agents. Process lives in the system. An agentic system is not a larger agent. It is a system in which agents are allowed to be parts.

So the next time you design one, ask the questions before you name the roles. What is true now? What must be true before each task can start? What changes when each one completes? Write the answers down as state, not as a prompt. That is your model of the work. The workers, you can bind later.

---

EDITORIAL STATE: see `drafts/the-agent-is-not-the-loop.editorial-state.md`
(settled rulings, unresolved choices, procedures, guardrails, resumption steps).
