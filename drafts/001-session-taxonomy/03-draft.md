# Draft: session taxonomy

<!-- node 1 -->

I run a lot of agent sessions in parallel. Each one spawns children, those
children spawn their own, and most of them carry a git worktree. Somewhere
between twenty and thirty sessions, the names become the only thing I have to go
on.

They tell me nothing. Four of my session titles opened with "Build & publish".
The worktree directories had names like `goofy-mclaren-e45a74`. I would open
one, read its name, and still have to go digging through the transcript to find
out what it was. Not weeks later, when forgetting would be reasonable. The same
afternoon.

<!-- node 2 -->

This is a naming problem, and naming is hard for a reason that has nothing to do
with software: the name has to be chosen before anyone knows what the thing will
become.

I named my daughters before they were born. The names were chosen for people
nobody had met yet, by people who knew nothing about who they would turn out to
be, and they will carry them for the rest of their lives. It is an act of hope.

Other cultures wait. The name is earned later, in adolescence, taken from something the person did or something they carry, and
conferred by the group that watched it happen. A name given at the start is an
intention. A name earned later is a description.

<!-- node 3 -->

A session is named at birth too, by a machine, from the first message I send it,
which is the least informed moment in its life.

I tried writing better first messages, and it does not help, because the context
that would make the name right does not exist yet.

<!-- node 4 -->

So I stopped trying to say what a session is, and started recording where and
when it is. Where it descends from, and what order it arrived in. Both of those
are true the instant a session exists.

This flip is what made dozens of sessions manageable. I no longer need to know
what a session is. Just how it relates to the others.

It turns out the work was always a tree. Nothing displayed it as one, and no
name I could write would have changed that. The coordinates do.

<!-- node 5 -->

Thankfully, this is a solved problem. The solution is Niklas Luhmann's
Zettelkasten. Luhmann was a German sociologist who published around seventy
books and four hundred articles. He credited the output not to himself but to a
cabinet of index cards he kept beside his desk. Roughly ninety thousand of
them, with no database anywhere in sight. That is a better track record than
anything I could ever invent.

The cards were numbered. Card 21 branched into 21a, which branched into 21a1,
while 22 was a sibling of 21 rather than its continuation. The number said
nothing about what was written on the card. It said where the card sat, and it
could be assigned the moment the card existed.

Nothing else recorded that 21a came from 21. The number already said so. There
was no index to maintain and nothing to keep in sync.

<!-- node 6 -->

On my machine, a session called `21 inbox rewrite` spawns one called `21a retry
logic`, which spawns `21a1 backoff jitter`. The next unrelated thing I start is
`22`.

The grammar is one rule. A parent ending in a digit gets letter children, and a
parent ending in a letter gets number children. There is no zero-padding,
because the ID is for identity rather than for sorting.

A title is the ID, one space, then whatever prose I want. In practice I do not
write that prose at all. I keep whatever the app generated. The description was
never the part I needed.

The worktree directory carries the same ID:
`~/.worktrees/repo/21a-retry-logic`. It gets renamed exactly once, because a
worktree is created before its session exists and arrives with a generated
random name. What has to match is the ID. The description trailing it can drift
out of sync with the session title, and that is fine. The ID is what tells me
which thread a worktree belongs to.

Git branches never carry the ID. They keep the company convention,
`DEV-2318-retry-logic`, because reviewers see branches and my coordinate system
is mine.

Numbers go in creation order and are never renumbered or reused.

None of this is specific to one tool. I use the same convention in Codex,
Claude Code, Pi and Amp.

The payoff is visual. `21`, `21a` and `21a1` share their first characters, so
they read as a family in a list that has no idea they are related.

<!-- node 8 -->

You can do all of this by hand. Put the number in front of whatever the app
already called the session, rename the worktree once, and that is the system.
It is what I still do in the tools I have not automated, and it costs nothing.

Automating it is a different matter, and it came out the same in every tool I
tried. A session is not a first-class object in any of them.

Claude Code knows when a session is a fork of another one, because it tells the
hook `source: "fork"`. It will not say which session it forked from. The parent
exists, the harness knows it, and there is no supported way to ask.

The ways a session can produce another session are unrelated features that
share nothing. A subagent runs inside the parent's transcript and hands back an
answer. A background session runs on its own, appears in the agent list, and
you go and visit it. A fork branches the history. Pi moves the terminal into a
new child and leaves the parent resumable. Those are four implementations of
one idea, a session that came from a session, and none of them share an
identity space or a lifecycle.

There is nowhere solid to stand, either. In Codex, a hook on subagent
start cannot stop the subagent: returning `continue: false`, exiting non-zero,
and timing out all let the child run regardless.

So there was nothing local I could trust to answer the only question that
matters: what the next ID should be. Every scheme raced another window
or guessed at a parent. What I ended up with is a single choke point: a small
service that is the only thing allowed to hand out a number, keyed on whatever
opaque ID each harness will admit to. Clients ask, they never invent, and when
the service is unreachable nothing gets numbered at all.

That is a preposterous amount of machinery for putting a number in front of a
title. It exists because the number has to come from a relationship the tools
will not expose. If sessions were first class, with a stable ID, a parent you
can ask for, and one concept covering subagents and forks and background work,
this would be a few lines of configuration.

<!-- node 9 -->

The code is public. There is a Worker you can deploy yourself and plugins for
Amp, Claude Code, Codex and Pi, which share one hierarchy when you point them
at the same namespace. It is not a product, I am not running it as one, and it
works for me. Fork it and do whatever you want with it.

<!-- node 11 -->

What still surprises me is how small the cause is. A few characters in front of
a title, nothing else, and the sidebar became a different thing to look at.

It is structurally the same sidebar I was complaining about. Same list, same
order, same titles the app wrote for me. What changed is that related work now
sits together, so instead of scanning a column of unrelated things I see a
handful of groups, each one visibly a body of work. I find my place in a second
and get back to it.

I would rather not have built any of this. If session management were first
class, the agent would already know that this session came from that one, and
it could simply show me the tree. Nobody would need a numbering convention,
because the numbers exist only to carry a relationship the tool already has and
will not surface.

In the end, the work was always a tree. A knowledge tree.
