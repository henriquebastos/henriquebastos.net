import rss from "@astrojs/rss";
import { getLocaleConfig } from "@/data/locale";
import { getPostPath, getPostsByLanguage } from "@/data/post";
import { siteConfig } from "@/site-config";
import type { SiteLanguage } from "@/types";
import { absoluteUrl } from "@/utils/path";

export async function createArticleFeed(language: SiteLanguage) {
	const locale = getLocaleConfig(language);
	const posts = await getPostsByLanguage(language);

	return rss({
		title: locale.feedTitle(siteConfig.title),
		description: locale.description,
		site: absoluteUrl("/", import.meta.env.SITE),
		customData: `<language>${language}</language>`,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.publishDate,
			link: getPostPath(post).replace(/^\//, ""),
		})),
	});
}
