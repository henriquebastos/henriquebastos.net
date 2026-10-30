# Brief: Steering Agents Through My First macOS App

Slug: `steering-agents-through-my-first-macos-app` (working).

## Audience

A developer who already builds with coding agents and wonders what it takes to
steer them through something they could not build alone: a native app, on a
platform they never shipped for, with real safety stakes (it deletes files).

## Why

In six days Henrique went from "help me find what is eating my disk" to a
native macOS app he uses every day: a Rust core, a Swift interface, and a full
disk mapped in about 35 seconds. He had never built a macOS app and has no
design skills. The agents wrote the code. What he did was steer, and the
steering is the part worth sharing: the "what ifs", the rejections, the rules
he set and later had to replace, and the mistakes in how he ran it.

## What the reader gets

1. The arc in a few scenes: a cleanup chat, then "map once, query many", a CLI
   built on composition, a "what if it had a picture", a native app.
2. What changed how he steers: composition over features, inspecting the
   reference instead of screenshots, a context package for a design
   specialist, the HIG as arbiter, before/after callouts as proof, testing in
   the cheapest layer that can catch it.
3. The shape of the result, without code: seven layers, what each one owns and
   what it must not do, and why Rust owns the pixels while Swift owns the
   input.
4. Performance as evidence, not as a brag. The tweet that undersold it. A
   reproducible benchmark against `du`. Cost follows the change, not the disk.
5. What he would do differently: session hygiene, late reference research,
   features built and removed, environment friction, slow tests accepted for
   too long.

## Promise

Here is how I steered agents through a kind of software I could not build
myself, what worked, and what I would change. Take the moves; the app is just
where I learned them.

## Voice

Not teaching, sharing. The full rules live in [AGENTS.md](../../AGENTS.md).
Experience first, then the pattern, then why it matters, then what he does now.
Every learning enters through a scene from the session, with his own words when
they exist.

Humor candidates, all universally safe:

- The tweet: "3.4MM files in 250Gb mapped in about 30 sec." The measured run
  was 5 million entries in 34 seconds. The rare tweet that undersold.
- Agents building a disk-space tool filled the disk under `/tmp`.
- The agent proposed a filter language. He said no. "Yes. I proposed too
  much."
- Move to Trash took 4 seconds; the move itself took less than a millisecond.

## Boundaries

- Not a timeline and not a changelog. Code appears only through its effect.
- No code listings. Layers, responsibilities, components and flows only.
- Not a Rust vs Swift post, and not a review of models or providers.
- No product pitch. The app is a personal tool, open source.
- Parked: the build-in-public reflection (detachment, product vs OSS) is its
  own post.

## Media

- His X videos: the Claude Design scenario board, the interactive mockup, the
  dogfooding video. The three Apple HIG analysis images.
- The "misaligned" screenshot next to the final map.
- Diagrams: the layers with what each owns, and the cost ladder.
