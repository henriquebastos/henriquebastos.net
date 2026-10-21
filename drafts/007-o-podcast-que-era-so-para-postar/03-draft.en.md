# I was only going to upload the video

I recorded a conversation with Alisson Vale over Zoom. We have been talking for twenty years, and this time we left the recorder on. The plan was no plan: put it on YouTube, and whoever listens, listens.

On Monday morning a silly question came to me. Would AI make any difference here? I dictated a long message to the agent, the kind that comes out crooked from voice transcription: download the video from Drive, transcribe it, analyze it, look at how the podcasts I follow work, Latent Space, Next Token and Armin Ronacher's. And I ended with "I'm not worried about editing the video right now."

Two and a half days later the episode was live, with a cold open, music, animated bands, chapters, reviewed subtitles, a thumbnail, six scheduled Shorts and a blog post. I would not have done that alone. Not out of laziness: I lack the talent for design and mixing, the technical skill for motion graphics, and the time. I want to tell how it went, what worked, what went wrong and what it cost.

## A login screen in front of 336 MB

The first obstacle was as dull as it gets. Alisson had left the recording behind a "shared" Drive link, and the link asked for a login. The agent tried four routes in a minute, including [Executor](https://github.com/RhysSullivan/executor), which I use as a bridge to Google's APIs. Executor could find the file, but had no way to write 336 MB to disk.

While the download was stuck, it did not sit still. It installed the transcriber, tested the pipeline on synthetic audio made with macOS `say`, analyzed the three reference podcasts through the YouTube API, and opened a conduit in my Obsidian, which is where I plan long work with agents. All of that in seven minutes, and then it came back with three options for the download.

The fix was a copy of the file in my Drive, shared for a few minutes, downloaded with `curl` and deleted right after. The size matched to the byte: 336,565,359.

Then came the first decision it made on its own. I had suggested Parakeet, which is local and fast. It ran, and in some five-minute blocks up to 78% of the words came out in English. Where Alisson says "porque eu acho que a IA é um veículo novo de expressão" (because I think AI is a new vehicle of expression), Parakeet wrote "Because I ask that a IA is expression". The agent tried Whisper on the same passage, saw that it worked, switched, and told me afterwards: "This is the most important change, and I made it without asking you first."

I liked two things there. It switched because it had the evidence in hand, and it did not hide that it switched.

## Half the screen was black, and the editor was blind

The recording was Zoom's side-by-side view: 1280 by 720, but only a 1280 by 360 strip had any picture. The other half was black, above and below. Both audio channels were identical, so nothing separated my voice from Alisson's.

The agent proposed using the black as space: the title on top, chapters at the bottom, and a label whenever someone mentions a project. And it said something that stayed with me for the rest of the process: "I can't watch the video. You will be the only one to really see the result."

That changed how both of us worked. It started checking its own work in other ways. To know whether a cut clipped half a word, it rendered the passage and transcribed it again. That is how it found that the transition sound in the cold open covered the word "Amp": Whisper heard "a galera do REN". To know whether the final video stayed in sync after thirteen pause cuts, it compared frames of the recording with frames of the episode. And every time it delivered something, it separated what it had checked from what it had not: "I didn't watch the Shorts with motion and sound; I only saw still frames."

On my side, I became the only pair of eyes and ears. That came due when it showed me an animation as loose frames. I answered: "You made an animation, but you didn't render it for me to watch the animation." From then on, every test arrived as a video.

## The conversation happened in Obsidian

Decisions were born in the conduit pages, not in the chat. For each delivery the agent wrote a page: the video embedded, a table of times, what it had decided alone and why, and numbered questions, each with a recommendation. I read in Obsidian and answered right there, inside the page, or in the chat by number: "1a ok 1b ok", "3b B", "65%".

Almost everything I sent was dictated. The messages arrived looking like voice transcription, half Portuguese, half English, with "you gostei mucho" in the middle of a sentence and "umg2" instead of "1g2". It had to guess, and when it guessed, it said what it had assumed.

This format has an advantage I did not expect. My answers lived in git. It read the page's `git diff` to see what I had changed, and each round became a commit. There were 49 commits in the conduit during production. When I wanted to review the episode's text, I asked it to mark the changes with Obsidian's own highlight. That way I only read what had changed.

I sent 71 messages in two and a half days. Many are a single word: "sim", "aprovado", "pode.", "push". The active work, the two of us together, came to about seven hours. The rest was the agent working while I slept, had lunch or did something else.

## Beautiful, not fancy

Before any editing, I put on the brakes: "My concern is the aesthetics. So I think before you do a lot of editing, which can be expensive, maybe you should do some exercises." And I gave the only direction I knew how to give: "Nothing too sophisticated or elaborate, but something beautiful."

It went after references in a way I would not have thought of. It read the CSS of Alisson's site and of mine to find the fonts and colors, and built three directions over real frames of the recording. I picked the third one. The thumbnail came from a cubist painting generated by AI, because the conversation goes through photography, painting and Picasso. The gold that ended up everywhere came from the median of that painting's pixels, slightly lightened: `#c9a25a`.

My role there was the filter. One of the cards had a border on the left side only, and I recognized it at once: "This style with a border only on the left is very common in things generated by AI." It had also proposed a timeline with a running clock in the band. I turned it down for taste and for engineering: a running clock would force a dynamic render of the whole video. The band changes only when the chapter changes.

Something went wrong in a very human way: I answered "Dourado" (gold) to a question, meaning that gold became the highlight of everything. It understood that only the thumbnail turned gold. It cost one render and one message.

## Cut before the promise

The cold open was the part where I taught the most. The first version ran 47 seconds and every clip gave away the answer. I explained what I see in the podcasts I follow: "people usually cut a sentence in the middle when it is about to deliver a promise." The new version dropped to 27 seconds and stopped each clip before the conclusion.

Then came the sound, and there only I could decide. It generated ten music and effect options on ElevenLabs, for about 65 cents, and I listened. I dropped the transition sound, picked the electronic track, asked for the whoosh "very low" and then "a little louder". Five mixes in one evening. When it offered to darken the bands by 40% or 55%, I answered "65%".

## Five mistakes, none serious

**The invention that was true.** In the analysis, the agent wrote that Jev was "from TypeSafe". Later, reviewing, it could not find that in the transcript, concluded it had made it up, told me so in plain words, and removed it. When I sent the links to the projects mentioned, Jev's link was TypeSafe's. The mistake was not the sentence. It was removing the sentence without checking outside the transcript. In the same round, "Petros" became Petrus, the project Whisper did not know.

**The late chapters.** At first it computed the chapters by adding 47 seconds to the recording times, the length of the cold open. Then came the pause cuts and a shorter cold open, and the rule stayed. When it recomputed from the real timeline, every chapter was 17 to 39 seconds late.

**The silent night.** The full render failed on the first attempt. Retrying was no option anyway: the motion graphics tool extracts every frame of the video before it starts, about 27 GB for the whole episode, and the disk had 25 free. It split the render into nine ten-minute parts and ran them one at a time. That was an hour and a half of rendering, in the middle of the night, and it waited without telling me anything. At 2:34 a.m. I sent: "is this working?". It was. But I had no way to know.

**The locked Mac.** To upload the videos in YouTube Studio, I suggested it use a browser with a profile just for this project, and I signed in myself. The episode went up fine. On the first Short, Studio's dialogs stopped showing. It investigated for about ten minutes and some 25 tool calls: the page, the process, the browser, the window. The cause was that I had stepped away and the Mac's screen locked. With the screen locked, the browser does not draw. It stopped, explained, and waited for me to come back.

**The post without my corrections.** At the end, with the blog text ready, I reviewed the final version directly in the conduit page and fixed a few things. It published from another file. I wrote: "I think you published without my corrections." Worse: one of its commits had swept my edits in with an unrelated change, which made the problem harder to find. The wrong text was live for about ten minutes and cost a second deploy.

Almost all of them have the same shape: information that existed somewhere and was not checked before it turned into action.

## Fifty dollars, seven hours of mine

The whole session is saved, so it can be counted. From the first message to the last scheduled Short, about 55 hours went by on the clock, about seven of them with me active. The agent gave 770 responses and made 806 tool calls, 539 of them in the terminal. The model cost for the production was US$ 49.46, plus about 65 cents on ElevenLabs. The generated images are not in that count.

I made 29 course corrections. Some were taste, like the gold, the "EP #1" and the 65%. Others were content: the Shorts' titles, for one. I rewrote four of the six because "zoológico" (zoo) alone says nothing to someone scrolling. In my words: "it has to have something to do with AI, a little AI pen for you to live in."

## Episode 1 became a test

The part that interests me most now is the next one. One episode is too little to draw conclusions, but it is enough not to pay for everything again.

After publishing, I asked for two things: this story and a recipe. The recipe had one requirement. If I want to change the visual style, I change only the style. If the next recording comes with each person in a separate file, only the montage changes. Transcription works for everything.

To write this story, the agent sliced the 108 MB session at its compaction points. Each slice went to a subagent that extracted the facts, and at the end a single timeline was checked against the commits and the file dates. The numbers in this text came from there.

The recipe became a set of skills in the podcast project. Each episode has one file with its content: the cuts, the chapters, the titles and the name corrections. The recording format has its own file, and the visual style has a folder. The scripts take the episode folder and read the rest from there. A skill looks at the folder, says which stage the episode is in, and points to what to do and what is waiting for my approval.

And the recipe's test is episode 1 itself. A script rebuilds the episode from those files and compares it with what was published. The animation pages come out identical byte for byte. A Short rendered again came out identical pixel for pixel, and the final file has the same video and audio hashes. If I touch the style and episode 1 changes, the test says so. Whether the recipe works for a new episode, only episode 2 will tell.

## What I did not know how to do

The episode I recorded with Alisson is about AI as a vehicle of expression, more than as a tool. He compares it with photography, which forced painting to reinvent itself.

I had not thought about it while producing, but that is what happened to me. I don't know how to mix sound, how to make motion graphics, how to pick a serif. I do know when a cut gives away the promise too early, when a card looks like AI, when the whoosh is too loud. The agent did what I don't know how to do, and I decided what it had no way of knowing.

It was an amazing experience. The episode is [on YouTube](https://youtu.be/2VQ58dqC12k), in Portuguese, and what we talked about became [this post](/pt/artigos/eu-nao-quero-morar-dentro-do-seu-produto/).
