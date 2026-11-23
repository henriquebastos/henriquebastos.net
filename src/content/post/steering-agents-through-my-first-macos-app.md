---
title: "Steering Agents Through My First macOS App"
publishDate: 2026-11-02
description: "Six days, no Rust or Swift, and a native Mac app I use every day. The moves I used to steer the agents, and what I would change."
draft: true
---

This is an account of how I used AI for six days to rebuild a macOS app I loved, and how simple the process was.

## Why

My disk was 99% full, so I opened a chat with an agent to find what was eating it. After a few rounds use `du` I missed the visualization of Disk Inventory X, an old tool I loved. It draws every file as a rectangle, sized by the space it takes. It still runs, but it is slow. I wanted it back, and fast.

<!-- media: original disk inventory X screenshot -->

I had never written Rust or Swift, never built a Mac app, and I have no design skills. Six days later I had a native app with a very fast Rust core and a Swift interface. It was also my first time building in public for real: I posted each small and incomplete progress and it was an amazing experience.

<!-- media: dogfooding video from X, 28 Oct -->

The agents wrote the code. I steered. Over six days I sent 151 messages. I will share all the numbers and the actual session bellow.

These are the moves I used.

## Keep the problem small and solve it first

I got tired of waiting for `du` to answer each new question, so I asked for a map: "can we have a temporary sqlite db with all existing files with size so we can du once and investigate big files or big dirs iteratively?"

That became a small CLI: build the map once, query it many times. When the agent proposed filters and sort options, I said no, and I think this was very important decision. The tool exports CSV, TSV or JSONL, and jq, sort and SQLite do the rest.

Commiting to a narrow scoped core in the best unix style was the single most important design decision.

## Measure before choosing

To make sure the core was fast, I wanted it to run closer to the metal. I said: "I want it to be really as fast as possible." The agent proposed C. I remembered all recent stories about agents "liking" Rust, so I asked what Rust or Zig would bring, and asked for the experiment in Rust.

The agent's finding: "The biggest expected gains are fewer metadata syscalls and less per-entry allocation, not simply choosing a faster language." Reading metadata in bulk was about twice as fast as asking for each file. The API mattered more than the language.

The tests were fast and I decided to stick with Rust. On my whole disk, it mapped about 5 million entries in about 34 seconds.

## Send the agent to find out

When I did not know something, I asked the agents to find out.

The first treemap came from screenshots on the Disk Inventory X website. It looked right and felt wrong. I asked the agent to study the installed app instead, and it found the layout framework bundled inside. Screenshots show the result. The binary shows the rule.

For the interface I needed a designer. I had an agent build a context package for another agent that had never seen our conversation: my very bad first prototype, the old app, my design invariants, and the preferences it could mine from the session. The prompt said: "Disk Inventory X is a reference for the discovery experience, not a design that our app must copy." Claude Design returned an interactive mockup with twelve flows. Then another agent checked it against Apple's Human Interface Guidelines, and where they disagreed, the guidelines won.

<!-- media: Claude Design scenario board and interactive mockup videos, X, 26 Oct -->

<!-- media: three HIG analysis images, X, 27 Oct -->

Finding out also worked against me. Twice I complained that the rectangles looked misaligned. The second time, the agent showed that the layout matched the designer's code. The problem was my test data: 128 files of almost the same size, all painted the same gray. The fixture was lying.

<!-- media: misaligned-fixture-screenshot.png next to the final map -->

From then on, every change came with before and after screenshots. On a platform I do not know, looking is what I can judge.

This design process was a lot of fun because the agent could present me with options and variations which allowed me to make decisions after I experimented the UX. I can't design, but I can tell when I don't like a design and that is an amazing feedback cicle for learning.

## You are the uttermost guardrail

For some reason the agent assumed we needed all the available metadata about each file and directory. I did not notice that for a while. At some point I saw observed the agent churning on a file inspector, a side panel with file metadata. I let it go to see where it would arrive. The panel worked, but I noticed the existence of the metadata was adding small compliations in different areas of the app. So I course corrected: "watch out for not complicating the UI, we should keep it as simple as possible. the goal is to find dirs and files using too much space to free them up. low level file information is not needed." Three minutes later the inspector was gone and everything looked fast and simple again.

The same happened to a navigation history and a layout copied from the old app. Built, seen, removed. This is an area I would investigate more to learn how to avoid. How to make scope detours more salient to me so we don't waste energy on what does not matter. But since most of the time the agent was working without my oversight, my time was not wasted, only a few million tokens. Subs FTW!

## Ask for one job per part

Late in the week, the slowest part was clicking. I had set a rule that every visible claim needed a real UI test, one that drives the app with mouse and keyboard. The suite grew to about twenty minutes. "we spend a lot of time clicking on things to validate state." I did not know the fix in SwiftUI, so I asked for an analysis.

The answer was structure. Each part of the screen got its own state, plain values a test can set directly. One shared background worker replaced the ones each view had built. The main model went from about 1,200 lines to under 300. I replaced my rule too: "Each change gets a test in the cheapest layer that can catch it: Rust, then state, then a picture of one part of the screen."

The app ended up in seven layers, and nothing below knows anything above it.

<!-- diagram: the layers, with what each one owns and what it must not do -->

The views take input and draw. A Swift model runs the slow work in the background. A bridge connects Swift to Rust. In Rust, one layer turns the saved map into a tree, a layout, pixels and colors. Another handles Trash, Delete and Refresh. At the bottom, the inventory core scans and saves the map, and the CLI uses that same core.

Swift owns threads and input. Rust owns the data, the geometry, the pixels, the colors and the safety. Even the treemap is drawn in Rust, with a map of which file owns each pixel, so hover is a single lookup.

That design was completely emergent from my constraints and invariants. I did not ask for it explicitly. I did ask for single responsibility, composable units, fast lookups and other higher level software qualities. The model built it, and judged whether the next change got easier one responsibility at a time.

## Read the numbers

I could not judge the structure by reading the code. I could judge it by how the app behaved. It felt fast, and the numbers explained why: the cost of an action follows the size of the change, not the size of the disk. A map of almost six million entries opens in under three seconds. Deleting one item in a folder with a million children costs under a millisecond in the core. Only a full scan pays for the whole disk.

Having the reproducible fixtures to measure behaior over and over again is a materialization of some quality aspects that mattered to me and helped the agent to adapt to protect that.

<!-- diagram: the cost ladder, from microseconds to the full scan -->

## Strange symptoms are usually repetition

Delete felt frozen. Move to Trash took about four seconds, but the move itself took under a millisecond. The rest was the app walking the same folder up to four times to check that it was safe.

The UI tests were slow. The agents found about 290 calls to an Apple wait that pauses about a second before looking. Replacing it took the suite from about 800 seconds to about 520.

The map flickered. A progress strip changed the map's height, which started another render, again and again.

Each time, the same work was happening more than once.

The agent could spot the problems immediately once I pointed at them. Figuring out how to point at issues and how to let the agent stumble upon the symptoms might increase productivity quite a lot.

## React to failure instead of checking first

The Trash case made me question the checks themselves: "Why aren't we deleting the folder and moving the folder to the trash? Because this how the system works." What if we just tried, and skipped what could not be deleted? I asked the Oracle for the downside.

Its answer: "your idea is the recommended design, with one condition." The condition was three fast checks before the confirmation, so a failure halfway would not leave half a folder gone. It also found the late checks safer than the early ones: an early check can go stale before the delete happens.

The checks before the confirmation went from about a second to under a millisecond.

## What I would do differently

- I ran everything in one session, started in my dotfiles folder as a cleanup chat. I would open a fresh session in the repository once the CLI existed.
- I dropped small requests into running work, like a window title and the app icon. The slices grew and ran again. Those belong in a queue.
- I let the environment fight us too long. The screen lock blocked the UI tests for about nine hours. Day one is the time to fix that.
- I accepted slow tests too long, partly because of my own rule.

## The disk

Near the end, a review stopped because the disk was full. The agents building a disk-space tool had filled `/tmp`.

The app does what I wanted. It shows me where my disk went, fast, and lets me clean it up. None of the moves needed me to know Rust or Swift.

## All the numbers

<!-- to agent: We should add here all the cool numbers about the project. I remember I tweeted a lot of them -->
