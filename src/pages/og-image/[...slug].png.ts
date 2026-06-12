import InterBold from "@/assets/fonts/inter-bold.woff";
import JetBrainsMono from "@/assets/fonts/jetbrainsmono-regular.ttf";
import NewsreaderItalic from "@/assets/fonts/newsreader-italic.ttf";
import NewsreaderRegular from "@/assets/fonts/newsreader-regular.ttf";
import NewsreaderSemiBold from "@/assets/fonts/newsreader-semibold.ttf";
import { getAllPosts } from "@/data/post";
import { siteConfig } from "@/site-config";
import { formatBylineDate } from "@/utils/date";
import { Resvg } from "@resvg/resvg-js";
import type { APIContext, InferGetStaticPropsType } from "astro";
import { render } from "astro:content";
import satori, { type SatoriOptions } from "satori";
import { html } from "satori-html";

const ogOptions: SatoriOptions = {
	fonts: [
		{ data: Buffer.from(NewsreaderRegular), name: "Newsreader", style: "normal", weight: 400 },
		{ data: Buffer.from(NewsreaderSemiBold), name: "Newsreader", style: "normal", weight: 600 },
		{ data: Buffer.from(NewsreaderItalic), name: "Newsreader", style: "italic", weight: 400 },
		{ data: Buffer.from(JetBrainsMono), name: "JetBrains Mono", style: "normal", weight: 400 },
		{ data: Buffer.from(InterBold), name: "Inter", style: "normal", weight: 700 },
	],
	height: 630,
	width: 1200,
};

const SEP = " · ";

/*
 * Pick the largest font size whose wrapped title fits the vertical budget.
 * Greedy wrap simulation with an average glyph width measured from rendered
 * Newsreader 600 output (~0.43em). Misestimates degrade to extra wrapping,
 * never overflow: the worst case (3 lines at 96px) still fits the card.
 */
const TITLE_WIDTH = 1040; // card width minus px-20 padding
const TITLE_BUDGET = 360; // title box: top anchor down to the lower third (3 lines at 96px)
const TAGS_ROW = 70; // vertical px a tags row consumes from the title box
const AVG_CHAR_EM = 0.43;
const LINE_HEIGHT = 1.2;

const wrappedLines = (title: string, fontSize: number): number => {
	const maxChars = Math.floor(TITLE_WIDTH / (fontSize * AVG_CHAR_EM));
	let lines = 1;
	let len = 0;
	for (const word of title.split(" ")) {
		const added = word.length + (len > 0 ? 1 : 0);
		if (len + added > maxChars) {
			lines++;
			len = word.length;
		} else {
			len += added;
		}
	}
	return lines;
};

const fitTitleSize = (title: string, budget: number): number => {
	for (const px of [96, 72, 60, 48]) {
		if (wrappedLines(title, px) * px * LINE_HEIGHT <= budget) return px;
	}
	return 44;
};

/* HB monogram, same geometry as the header logo. */
const monogram = (size: number, fill: string) =>
	`<svg width="${size}" height="${(size * 400) / 500}" viewBox="0 0 500 400">
		<g fill="${fill}">
			<rect x="0" y="50" width="100" height="300"></rect>
			<rect x="0" y="150" width="200" height="100"></rect>
			<rect x="200" y="0" width="100" height="400"></rect>
			<path d="M400,50 h50 a50,50 0 0 1 0,100 h-50 z"></path>
			<path d="M400,250 h50 a50,50 0 0 1 0,100 h-50 z"></path>
		</g>
	</svg>`;

const markup = (props: {
	name: string;
	title: string;
	byline: string;
	tagsLine: string;
}) =>
	/* Build the string first; the html\`\` tag form escapes interpolated markup (the svg). */
	html(`<div tw="flex flex-col w-full h-full px-20 py-14" style="background-color: #1e1b18; font-family: Newsreader;">
		<div tw="flex w-16 h-1.5 mt-8 mb-10" style="background-color: #ff9400;"></div>
		<h1 tw="m-0" style="font-size: ${fitTitleSize(props.title, TITLE_BUDGET - (props.tagsLine ? TAGS_ROW : 0))}px; line-height: ${LINE_HEIGHT}; color: #f3eee3; font-weight: 600;">
			${props.title}
		</h1>
		${
			props.tagsLine
				? `<p tw="text-xl tracking-wider uppercase mt-8 mb-0" style="font-family: JetBrains Mono; color: #ff9400;">${props.tagsLine}</p>`
				: ""
		}
		<div tw="flex flex-1"></div>
		<div tw="flex justify-between items-center w-full">
			<p tw="text-xl m-0" style="font-family: JetBrains Mono; color: #a89e90;">
				${props.byline}
			</p>
			<div tw="flex items-center">
				${monogram(44, "#2fb3d4")}
				<span tw="ml-4 text-xl uppercase" style="font-family: Inter; font-weight: 700; letter-spacing: 3px; color: #f3eee3;">
					${props.name}
				</span>
			</div>
		</div>
	</div>`);

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export async function GET(context: APIContext) {
	const { pubDate, title, tags, readingTime } = context.props as Props;

	const date = new Date(pubDate);
	const name = siteConfig.profile?.name ?? siteConfig.author;
	const bylineParts = [formatBylineDate(date), readingTime].filter(Boolean) as string[];

	const svg = await satori(
		markup({
			name,
			title,
			byline: bylineParts.join(SEP),
			tagsLine: tags.join(SEP),
		}),
		ogOptions,
	);
	const png = new Resvg(svg).render().asPng();
	return new Response(new Uint8Array(png), {
		headers: {
			"Cache-Control": "public, max-age=31536000, immutable",
			"Content-Type": "image/png",
		},
	});
}

export async function getStaticPaths() {
	const posts = await getAllPosts();
	const filtered = posts.filter(({ data }) => !data.ogImage);
	const items = await Promise.all(
		filtered.map(async (post) => {
			const { remarkPluginFrontmatter } = await render(post);
			const readingTime =
				(remarkPluginFrontmatter as { minutesRead?: string })?.minutesRead ?? "";
			return {
				params: { slug: post.id },
				props: {
					pubDate: (post.data.updatedDate ?? post.data.publishDate).toISOString(),
					title: post.data.title,
					tags: post.data.tags ?? [],
					readingTime,
				},
			};
		}),
	);
	return items;
}
