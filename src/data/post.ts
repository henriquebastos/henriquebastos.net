import { type CollectionEntry, getCollection } from "astro:content";
import { siteConfig } from "@/site-config";
import type { SiteLanguage } from "@/types";

function validateTranslations(posts: CollectionEntry<"post">[]): void {
	const postsById = new Map(posts.map((post) => [post.id, post]));
	const translationsBySource = new Map<string, string>();

	for (const post of posts) {
		const sourceId = post.data.translationOf;
		if (!sourceId) continue;

		if (sourceId === post.id) {
			throw new Error(`Post "${post.id}" cannot translate itself.`);
		}

		const source = postsById.get(sourceId);
		if (!source) {
			throw new Error(`Post "${post.id}" references missing translation source "${sourceId}".`);
		}

		if (source.data.lang === post.data.lang) {
			throw new Error(
				`Post "${post.id}" and translation source "${sourceId}" both use ${post.data.lang}.`,
			);
		}

		const existingTranslation = translationsBySource.get(sourceId);
		if (existingTranslation) {
			throw new Error(
				`Posts "${existingTranslation}" and "${post.id}" both translate "${sourceId}".`,
			);
		}

		translationsBySource.set(sourceId, post.id);
	}
}

/** Fetch all posts. Drafts are excluded in production builds. */
export async function getAllPosts(): Promise<CollectionEntry<"post">[]> {
	const posts = await getCollection("post", ({ data }) => {
		return import.meta.env.PROD ? !data.draft : true;
	});
	validateTranslations(posts);
	return posts;
}

/** Fetch posts written in one language. */
export async function getPostsByLanguage(
	language: SiteLanguage,
): Promise<CollectionEntry<"post">[]> {
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
