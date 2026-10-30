# Brief: Steering Agents Through My First macOS App

Slug: `steering-agents-through-my-first-macos-app` (working).

## Audience

A developer who already builds with coding agents and wonders what it takes to
steer them through something they could not build alone: a new language, a new
platform, real stakes (the app deletes files).

## Why

Henrique had a small, satellite problem. He wanted back an app he loved, Disk
Inventory X, which had become slow and stuck in time. He had never written Rust
or Swift and had never shipped a macOS app. In six days, agents built him a
native app he now uses every day, and he shared it as it grew: his first build
in public.

This post exists to share what he learned doing it. Not a lesson. What he did,
what worked, and what he would change. The agents wrote the code. What he did
was steer, and the steering moves hold for any language.

## What the reader gets

1. The human frame: a beloved old app, a first build in public, two languages
   he had never used.
2. The steering moves, each through a scene from the session:
   - Focus on a small problem and solve it before the next "what if".
   - Measure before choosing.
   - Guide the agent to discover the best way instead of pretending to know.
   - Let the agent walk, even in the wrong place, for a long time.
   - Ask for analyses that separate components and responsibilities.
   - Read the numbers as the signal that the structure is right.
   - When a symptom is strange, investigate: it is usually repetition.
   - Then change the strategy: react to failure instead of checking
     everything first.
3. The shape of the result, without code: the layers, what each one owns and
   what it must not do. This is the evidence for the "separate components"
   move.
4. Performance as evidence: the tweet that undersold it, a reproducible
   benchmark against `du`, tests getting faster as the structure improved.
5. The scale: almost a billion tokens in six days, about 80% processed by
   subagents.
6. What he would do differently.

## Promise

Here is how I steered agents through software I could not build myself, the
moves that worked, and what I would change. The moves are the point. The app is
where I learned them.

## Voice

Not teaching, sharing. The full rules live in [AGENTS.md](../../AGENTS.md).
Experience first, then the pattern, then why it matters, then what he does now.
Every move enters through a scene, with his own words when they exist. Warm
and human: the pleasure of the project is part of the story.

Humor candidates, all universally safe:

- The tweet: "3.4MM files in 250Gb mapped in about 30 sec." The measured run
  was 5 million entries in 34 seconds. The rare tweet that undersold.
- Agents building a disk-space tool filled the disk under `/tmp`.
- The agent proposed a filter language. He said no. "Yes. I proposed too
  much."
- Move to Trash took 4 seconds. The move itself took less than a millisecond.
  The rest was the app checking the same folder up to four times.

## Boundaries

- Not a timeline and not a changelog. Code appears only through its effect.
- No code listings. Layers, responsibilities, components and flows only.
- Not a Rust vs Swift post, and not a review of models or providers.
- No dollar figures. Tokens only, because the costs on record are estimates.
- No product pitch. The app is a personal tool, open source.
- Build in public appears as frame and motivation. The longer reflection on
  detachment and on product vs open source stays out.

## Open tension for the draft

"Let the agent walk in the wrong place" (a move) and "features built and then
removed" (a regret) describe the same events. The draft must pick one reading
or show both honestly.

## Media

- His X videos: the Claude Design scenario board, the interactive mockup, the
  dogfooding video. The three Apple HIG analysis images.
- The "misaligned" screenshot next to the final map.
- Diagrams: the layers with what each owns, and the cost ladder.
