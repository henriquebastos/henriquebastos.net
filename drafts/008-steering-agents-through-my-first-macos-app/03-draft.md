# Steering Agents Through My First macOS App

My disk was 99% full. Seven gigabytes free. So I opened a chat with an agent and typed the most ordinary request
of the week: help me find what is eating my disk.

Six days later I had a native macOS app that I use every day. It has a Rust
core and a Swift interface. I had never written a line of either language. I
had never built a Mac app, and I have no design skills.

The app brings back an old friend. Disk Inventory X was one of those small
tools I loved: point it at a folder and it draws every file as a rectangle,
sized by the space it takes. You see the fat at once. It still runs, but it
feels slow nowadays and it stopped in time. I wanted it back, and I wanted it
fast.

<!-- media: dogfooding video from X, 28 Oct -->

It was a side problem, and I used it to try building in public for the first
time. I posted the mockups, the design reviews, the first video of me using
it. "Sharing incomplete work requires a healthy detachment," I wrote at the
time. I am still learning that part.

The agents wrote the code. What I did was steer. That is what I want to share
here: the moves I made, the scenes where I made them, and the ones I would
make differently. None of them depend on Rust or Swift.

## Keep the problem small

The first useful thing was not an app. After a few rounds of `du`, I got tired
of waiting for the same scan to answer each new question. So I asked for a
map: "can we have a temporary sqlite db with all existing files with size so
we can du once and investigate big files or big dirs iteratively?"

That became the shape of everything after it. Build the map once, query it
many times, clean up outside the tool, resync. A new repository and a small
CLI.

Then the agent proposed filters and sort options for the CLI. I said no. Unix
already sorts and filters. The tool exports CSV, TSV or JSONL, and jq, sort and
SQLite do the rest. The agent's reply is my favorite sentence of the week:
"Yes. I proposed too much."

With the export in place, the agent queried the map itself to find what was
eating my disk. The narrow core paid off later. When I asked "what if it had a
picture?", the picture only had to read the map. When I asked "what if it were
a native app?", the app only had to show the picture. Each "what if" was cheap
because the step before it was small and finished.

## Measure before choosing

I wanted it fast: "I want it to be really as fast as possible." The agent
proposed C with `getattrlistbulk`, a macOS call that reads the metadata of many
directory entries at once. I did not know enough to choose a language, so I
asked what Rust or Zig would bring, and then asked for the experiment in Rust.

The experiment answered a better question than mine. The agent wrote: "The
biggest expected gains are fewer metadata syscalls and less per-entry
allocation, not simply choosing a faster language." Reading entries in bulk was
about twice as fast as asking for each file on its own. The language mattered
less than the API.

Then it ran on my whole disk: 5 million entries in 34 seconds, saved to a map I
could reopen in a couple of seconds. (Entries are files and folders together,
and the scan skipped about 270 protected places I never gave it access to.)

A few days later I tweeted, proud: "3.4MM files in 250Gb mapped in about 30
sec." I wrote that number from memory. The measured run was better. It is the
only time I can remember a tweet of mine underselling anything.

On a test tree of half a million entries, the tool scans and saves a reusable
map in 0.6 seconds. `du -sk`, which only adds up sizes, takes 0.9 seconds on the
same tree.

## Send the agent to find out

On the Mac I was a tourist, and I did not pretend otherwise. When I did not
know something, I made the agents find out. The good moves came from how I
asked.

The first treemap came from screenshots on the Disk Inventory X website. It
looked right and felt wrong. I opened the real app and described what I saw:
"top left I see the bigger things… bottom right the smaller things." Then I
asked the agent to study the installed app instead of pictures of it. It found
the framework bundled inside, TreeMapView 1.2, and its squarified layout.
Screenshots show the result. The binary shows the rule.

For the interface I needed a designer, and I am not one. So I had an agent
build a context package for another agent that had never seen our
conversation. It held screenshots of my very bad first prototype, screenshots
of the old app, my design invariants, and every preference and UX fact it could
mine from the session where we built the core. The prompt said: "Disk
Inventory X is a reference for the discovery experience, not a design that our
app must copy." Claude Design took the package and returned an interactive
mockup with twelve flows, every scenario laid out for comments.

<!-- media: Claude Design scenario board and interactive mockup videos, X, 26 Oct -->

I loved it, and I still did not give it the last word. I asked another agent
to check the design against Apple's Human Interface Guidelines, and the
guidelines won the arguments: where Cancel goes, how destructive buttons look,
animations cut from 700 to about 200 milliseconds. The design was input.
Apple's rules were the arbiter. The implementation then corrected both: on this
macOS version, the dialog that draws a destructive button in red is the old
`NSAlert`, not the SwiftUI sheet.

<!-- media: three HIG analysis images, X, 27 Oct -->

Finding out also worked against me. Twice I complained that the rectangles
looked misaligned. The second time the agent showed that the layout matched
the designer's code to within 0.000000000005 pixels across 514 files. The
problem was my test data: 128 files of almost the same size, without
extensions, all painted the same gray. The algorithm was fine. The fixture was
lying.

<!-- media: misaligned-fixture-screenshot.png next to the final map -->

From then on, every change came with before and after screenshots and callouts
pointing at what changed. I could judge a change by looking at it, which is the
one thing I can do well on a platform I do not know.

## Let it walk, and watch

At one point the agent grew the scope. It planned an inspector, a side panel
with file metadata loaded in the background. I saw it and did not stop it. I
wanted to see whether it would arrive where I wanted.

A few hours later it had not. The panel worked, and it made the app about
something else. So I wrote: "watch out for not complicating the UI, we should
keep it as simple as possible. the goal is to find dirs and files using too
much space to free them up. low level file information is not needed." Three
minutes later: "we can remove the inspector."

The same happened to a navigation history, an Open Snapshot command, the first
SVG prototype and a layout copied from the old app. Each one was built, seen
and removed.

I do not count these as waste. Scope growing was never the problem. Scope
diverging from the direction was, and that is when I stepped in. Walking back
cost a message. Seeing the thing built was the cheapest way to know whether I
wanted it, and looking back I could have let it walk a little more. That room
to walk is a big part of why this took days, with the agents doing most of the
work.

## Ask for one job per part

Late in the week the slowest part of the project was clicking. Every change
needed someone to open the app, click through the states and confirm. I had
made it worse myself. I had set a rule that every visible claim needed its own
real UI test, one that drives the actual app with mouse and keyboard. The suite
grew to about twenty minutes.

"we spend a lot of time clicking on things to validate state." I did not know
the fix in SwiftUI, so I asked for an analysis of why.

The answer was structure. Each part of the screen got its own state, plain
values that a test can set directly. One shared background worker replaced the
ones each view had built for itself. The main model of the app went from 1,195
lines to 284. Every part could now be tested and previewed in every state
without a single click, and I replaced my rule with a better one: "Each change
gets a test in the cheapest layer that can catch it: Rust, then state, then a
picture of one part of the screen."

From far away, what came out is seven layers. Nothing below knows anything
above it.

<!-- diagram: the layers, with what each one owns and what it must not do -->

At the top, SwiftUI and AppKit views own input and draw the overlays. Below
them, a Swift model coordinates the work in the background, so nothing slow
runs on the main thread. A generated bridge connects Swift to Rust. Under it, a
Rust presentation core turns the saved map into a tree, a treemap layout,
pixels and colors. Beside it live the operations: Trash, Delete and Refresh,
always confirmed and never falling back from one to the other. At the bottom,
the inventory core scans, accounts for hardlinks, sums the totals, saves the
map and exports it. The CLI talks to that same core.

The rule I ended up caring about: Swift owns threads and input, and Rust owns
the data, the geometry, the pixels, the colors and the safety. Even the treemap
is drawn in Rust, together with a map of which file owns each pixel, so hover
is a single lookup. Swift shows the image and paints hover and selection on
top, so moving the mouse never rebuilds the picture. Nothing big crosses the
bridge either. The tree comes in slices of at most 256 rows, the map in at
most 4,096 tiles.

The test seam is the filesystem, not the core. In test mode, the real Rust core
runs over an in-memory filesystem with about thirty named scenarios, so the
tests and the app run the same code. The project now has more test code than
product code.

I could not have designed that. I could ask for it, one responsibility at a
time, and judge whether the result made the next change easier.

## Let the numbers tell

Without experience in these technologies, I could not tell by reading the code
whether the structure was good. I could tell by how the app behaved, and by the
numbers.

The app felt fast in my hands, and the numbers explained why: the cost of an
action follows the size of the change, not the size of the disk. Opening a map
of 5.7 million entries takes about 2.5 seconds. Drawing the treemap of a
million files takes about a tenth of a second. Deleting one item inside a
folder with a million children costs under a millisecond in the core.
Refreshing a folder of 25,000 files takes about 25 milliseconds. Only a full
scan pays for the whole disk.

<!-- diagram: the cost ladder, from microseconds to the full scan -->

The numbers also saved work. Early on I agreed to load the map with memory
mapping, the clever way. It was never built. Plain loading was already fast
enough, and the README now says it outright: "This is not mmap or lazy
loading."

When something felt slow, the numbers were where the investigation started.

## Strange symptoms are usually repetition

Delete felt frozen. Move to Trash took about four seconds. I asked why, and the
agent measured: the move itself took less than a millisecond, because macOS
moves a whole folder to the Trash in one step. The other four seconds were the
app walking the same folder, up to four times, to check that it was safe.

The UI tests were slow. The agents found about 290 calls to a standard Apple
wait that pauses about a second before its first look. Replacing it took the
suite from about 800 seconds to about 520.

The map flickered. Checking a recording frame by frame, the agent found a
loop: a progress strip changed the map's height, which started another render,
again and again.

Every strange symptom I chased turned out to be the same work happening more
than once.

## React to failure instead of checking first

The Trash case did not stop at removing the repeated checks. It made me
question the checks themselves.

I asked: "Why aren't we deleting the folder and moving the folder to the trash?
Because this how the system works." Then I had an idea I was not sure about.
What if we did not check everything first? Just try, and skip what cannot be
deleted. I asked the Oracle, a reviewer that starts fresh without the
session's history, to analyze the downside.

Its answer: "your idea is the recommended design, with one condition." The
condition was three fast checks before the confirmation, for the cases where
finding a problem halfway would leave half a folder gone. Then came the part I
did not expect. The late checks are safer than the early ones: between an
early check and the delete, something can change, and a late check happens
microseconds before it.

The checks before the confirmation dialog went from about a second to under a
millisecond. Deleting 100,000 files went from 6.1 to 3.0 seconds.

## What I would do differently

I ran the whole project in one session. It started in my dotfiles folder as a
cleanup chat and carried the product through 70 context compactions. I kept
asking for cleanup in the middle of the build: "while you're working, get me
top 25 files." I would start a fresh session in the repository as soon as the
CLI existed.

I dropped small requests into running work: number formats, a window title,
the app icon. The agents absorbed them, and the slices grew and ran again.
Those belong in a queue.

I let the environment fight us for too long. The screen locked and blocked the
UI tests for about nine hours. Touch ID prompts interrupted runs until a single
command turned on automation mode. A provider failure started a chain of
fallbacks, and I sent the same long message three times. Day one is the time
to fix those.

And I accepted slow tests for too long. The suite reached twenty minutes before
I asked "why the UI tests take so long?", partly because of my own rule.

## The disk, again

Over six days I sent 151 messages, many of them a single word. "y" was a
favorite. The orchestrating agent ran 123 subagents: workers that wrote code,
reviewers that read it, a librarian for documentation, and the Oracle for the
hard questions. Together they processed almost a billion tokens, most of it the
same context read again on every turn.

It started with an agent freeing space on my disk. Near the end, a review
stopped with the disk full. The agents building a disk-space tool had filled
`/tmp`. "you've been using a lot of space under /tmp," I wrote, in the tone of
a man who has seen this movie before.

The app now does what I wanted. It shows me where my disk went, fast, and lets
me clean it up. The moves are what I keep from building it: a small problem
first, a measurement before a choice, agents sent to find out, room to walk,
one job per part, numbers as the signal, and a hard look at anything that
happens twice. None of them needed me to know Rust or Swift.
