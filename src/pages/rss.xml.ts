import { getPostPath, getPostsByLanguage } from "@/data/post";
import { siteConfig } from "@/site-config";
import { absoluteUrl } from "@/utils/path";
import rss from "@astrojs/rss";

export const GET = async () => {
	const posts = await getPostsByLanguage(siteConfig.lang);

	return rss({
		title: siteConfig.title,
		description: siteConfig.description,
		site: absoluteUrl("/", import.meta.env.SITE),
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.publishDate,
			link: getPostPath(post).replace(/^\//, ""),
		})),
	});
};
