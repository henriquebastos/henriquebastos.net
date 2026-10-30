# Outline

Skeleton. Each node states what the section must leave in the reader's head.
The moves follow Henrique's own order. Every move opens with a scene from the
session and states the move only after it. Sources and quotes for every node
are in [00-notes.md](00-notes.md).

## Open

1. My disk was 99% full, I asked an agent to find what was eating it, and six
   days later I had a native macOS app, written in two languages I had never
   used, that brings back an old app I loved and that I now use every day.
2. I shared it as it grew, my first build in public, and what I want to share
   now is not the app but how I steered the agents that wrote it.

## The moves

3. I kept the problem small and solved it before the next "what if": a map
   built once and queried many times, a CLI that exports instead of filtering,
   and that narrow core is what made "what if it had a picture" cheap.
4. I measured before choosing, and the measurement said the API mattered more
   than the language, and that my own tweet undersold the result.
5. I did not pretend to know the platform: I asked the agents to find out, by
   reading the old app's binary instead of its screenshots, by preparing a
   context package for a design specialist, and by letting Apple's guidelines
   overrule the design.
6. I let the agent walk off course and watched, and I stepped in when the
   scope diverged from the direction, not when it grew, because walking back
   was cheap.
7. When validating meant clicking through the app, I asked for an analysis
   that gave each part one job, and the shape that came out is seven layers
   where Swift owns the input and Rust owns the data, the pixels and the
   safety.
8. I read the numbers as the signal that the structure was right: tests got
   faster, delete got faster, and the cost of any action follows the size of
   the change, not the size of the disk.
9. Every strange symptom we investigated turned out to be repetition: the same
   folder checked four times, the same one-second pause 290 times, the same
   render started again and again.
10. Then I changed the strategy itself: react to failure instead of checking
    everything first, and an independent review found the late checks safer.

## What I would do differently

11. I would start a fresh session in the project, keep side requests out of
    running work, remove environment friction on day one, and question a slow
    test suite before it reached twenty minutes.

## Close

12. Almost a billion tokens went through in six days, most of them in
    subagents, and the moves are what I keep: the app is where I learned them.
    Callback candidate: it started with an agent freeing disk space and ended
    with me asking agents to stop filling `/tmp`.
