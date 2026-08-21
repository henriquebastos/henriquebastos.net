import { type CollectionEntry, getCollection } from "astro:content";
import { siteConfig } from "@/site-config";

/** Fetch all posts. Drafts are excluded in production builds. */
export async function getAllPosts(): Promise<CollectionEntry<"post">[]> {
	return await getCollection("post", ({ data }) => {
		return import.meta.env.PROD ? !data.draft : true;
	});
}

/** Fetch posts written in one language. */
export async function getPostsByLanguage(language: string): Promise<CollectionEntry<"post">[]> {
	return (await getAllPosts()).filter(({ data }) => data.lang === language);
}

/** Public URL path for a post in its language section. */
export function getPostPath(post: CollectionEntry<"post">): string {
	return post.data.lang === "pt-BR" ? `/pt/artigos/${post.id}/` : `/writing/${post.id}/`;
}

/** Date used for sorting — `updatedDate` if `siteConfig.sortPostsByUpdatedDate`, else `publishDate`. */
export function getPostSortDate(post: CollectionEntry<"post">): Date {
	return siteConfig.sortPostsByUpdatedDate && post.data.updatedDate !== undefined
		? new Date(post.data.updatedDate)
		: new Date(post.data.publishDate);
}

/** Sort by `getPostSortDate`, newest first. Mutates input. */
export function sortMDByDate(posts: CollectionEntry<"post">[]): CollectionEntry<"post">[] {
	return posts.sort((a, b) => {
		const aDate = getPostSortDate(a).valueOf();
		const bDate = getPostSortDate(b).valueOf();
		return bDate - aDate;
	});
}
