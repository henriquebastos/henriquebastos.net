# Promotion

Article:
<https://henriquebastos.net/writing/the-10x-era-is-here/>

Article status: draft. Nothing in this file is approved for publication yet.

Cover: `src/content/post/the-10x-era-is-here.png`

Cover alt: Aerial view of sports cars gridlocked on one interchange while
traffic streaks past around them.

## Format decision

Working format: publish the complete article natively on LinkedIn and X, with
the blog as the canonical source. This is an experiment, not a new standing
rule for every article.

The previous promotion put the article link in a comment or reply. Its X API
metrics on August 19, 2026 were:

| Item       | Impressions | Engagements | URL clicks | Likes | Replies | Reposts | Bookmarks | Profile clicks |
| ---------- | ----------: | ----------: | ---------: | ----: | ------: | ------: | --------: | -------------: |
| Main post  |         586 |          40 |          0 |    10 |       3 |       1 |         2 |              1 |
| Link reply |          90 |          36 |         25 |     3 |       0 |       0 |         1 |              0 |

The measured link clicks equal 4.3% of impressions on the main post, or 27.8%
of impressions on the reply. The two denominators answer different questions,
and neither tells us how many people read the article after clicking.

The previous LinkedIn promotion record contains no analytics snapshot. The
public page exposes comments and reactions but not the author's impression or
article-view data. There is no comparable LinkedIn number in the repository.

One post is not an A/B test. It is enough evidence to try removing the outbound
click from the reading path and measure the result.

## Shared native article

Title: The 10x Era Is Here. Ten Times More What?

Body: the exact accepted article body from
`src/content/post/the-10x-era-is-here.md` at the publication commit. The native
versions keep its headings and external links. The title, site byline, and
draft marker are not duplicated inside the body.

End note:

> This article also lives on my site:
> <https://henriquebastos.net/writing/the-10x-era-is-here/>

Approval status: not approved.

## LinkedIn

Format: native LinkedIn Article with the cover image, followed by LinkedIn's
feed introduction for the article.

Publication method: manual LinkedIn article editor. The current project plugin
publishes personal feed posts, not native articles.

Status: draft.

### Feed introduction

An agent builds in one afternoon what used to take days.

The roadmap is full. Competitors are moving. The obvious reaction is: we must
go 10x.

Ten times more what?

If every boundary stays where it was, more agents do not create leverage. They
create the traffic jam faster.

I wrote about the economic magic of software, a production lesson from 1896,
and what changed when I aimed agent capacity at depth instead of scope.

## X

Format: native X Article with the cover image. Publishing creates the post that
opens the Article. Reply to that post with the canonical blog URL.

Publication method: X's official Articles API or the web editor. The API accepts
a DraftJS content state and optional cover media, then publishes the saved
draft. The current project workflow handles normal posts and must be extended
and reviewed before it can publish an Article.

The authenticated `@henriquebastos` account reports a blue Premium
subscription. Creating the remote draft is the first mutating eligibility test
and requires explicit approval.

Status: draft.

### First reply

The article also lives on my site:

<https://henriquebastos.net/writing/the-10x-era-is-here/>

## Measurement

Record the available author analytics after 24 hours and seven days.

For both platforms, capture impressions or views, reactions, comments or
replies, reposts, bookmarks, profile activity, and article opens or reads when
the platform exposes them. Also capture clicks to the canonical blog URL. Keep
the native-article numbers beside the previous X baseline above instead of
claiming a format winner from unlike metrics.
