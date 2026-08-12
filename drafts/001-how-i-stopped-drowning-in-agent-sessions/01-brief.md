# Brief: How I Stopped Drowning in Agent Sessions

Slug: `how-i-stopped-drowning-in-agent-sessions`.

A brief is a hypothesis. This one has been rewritten twice, because the writing
disproved parts of it both times. What changed is recorded at the bottom, and
that record is the most useful thing in the file.

## Audience

Someone who runs many agent sessions in parallel and has lost track of them.
They already feel the pain and do not need convincing that it exists.

## Why

Agent sessions multiply. Every session spawns more, each carrying its own
worktree and its own follow-on work, and somewhere between twenty and thirty of
them the names become the only thing left to go on. They tell you nothing.

The reason is not that the tools name things badly. It is that naming is the
wrong instrument. A name has to say what a thing is, and it has to be chosen
before anyone knows what the thing will become. A session is the worst case for
this: named at birth, by a machine, from its first message.

So stop recording what a session is and record where and when it is instead.
Where it descends from and what order it arrived in are both true the instant
the session exists, which is exactly when its name is not. That flip is what
makes dozens of parallel sessions manageable, because placing a session among
the others no longer requires knowing what it is.

## What the reader gets

1. The reframe: naming is the wrong instrument, and a coordinate is the right
   one, for a reason that predates software.
2. Luhmann's Folgezettel as the proven implementation, so the method carries a
   track record rather than a claim.
3. The convention itself, complete enough to adopt by hand in any tool.
4. The argument: session management is not a first-class concern in any coding
   agent, which is why automating a two-character prefix took a web service.
5. A link to that implementation, offered as code that works rather than as a
   product.

## Promise

Here is the idea, and the one rule that makes it work. Adopt it by hand in five
minutes. My automation is public if you want it.

This is deliberately not "reproduce my system." The build lives in the
`zettelkasten` repo, which can be corrected when the tools change, and a post
cannot.

## Voice

Not teaching, sharing. The full voice rules live in [AGENTS.md](../../AGENTS.md)
and govern every post, not just this one.

## Credibility

Borrowed, not claimed. The authority is Luhmann's track record, not my
cleverness, which also answers "why would this work?" before it is asked.

## Source of record

The draft is authoritative. `github.com/henriquebastos/zettelkasten` is the
current implementation and the thing the post links to.
`~/.claude/skills/taxonomy/REPRODUCE.md` describes the earlier shell-based
system and is now out of date; do not reconcile the post against it.

## What the writing changed

**First rewrite.** The original brief framed the problem as a data-structure
mismatch: the tool hands you a list, what you have is a tree. That is true, and
it is now the closing beat of the opening rather than its frame, because
drafting revealed it is a consequence rather than the cause. The cause is that
naming cannot carry position, and no name written at the moment a session is
created can be right.

**Second rewrite.** The brief promised the build and the adoption pitfalls, and
half the outline was a tutorial. The implementation had by then become a hosted
service with four harness plugins, which is both too large to explain in a post
and too perishable to fossilize in one. Cutting the tutorial exposed the better
argument underneath: the service exists because session management is not first
class, so the machinery is evidence rather than a feature. The post got shorter
and started arguing something.
