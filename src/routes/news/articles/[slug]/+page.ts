import type { PageLoad } from './$types';
import type { Component } from 'svelte';
import type { ArticleMetadata } from '$lib/scripts/types';
import { ArticleId } from '$lib/scripts/ArticleId';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({
	params,
	fetch
}): Promise<{
	component: Component;
	frontmatter: ArticleMetadata;
	thumbnailImgFmt: string | null;
}> => {
	const slug = params.slug;
	const id = new ArticleId(slug);
	const {
		default: component,
		metadata: frontmatter
	}: {
		default: Component;
		metadata: ArticleMetadata;
	} = await import(`../../../../../articles/${id.year}/${id.month}/${slug}.md`).catch(err);
	if (!frontmatter.published) err();

	const redirectTo = frontmatter.redirect;
	const thumbnailImgFmt = await (await fetch('/api/articles/thumbnail-imgs'))
		.json()
		.then(
			(imgs: { [slug: string]: string }) =>
				imgs[redirectTo === undefined ? params.slug : redirectTo] ?? null
		);

	return { component, frontmatter, thumbnailImgFmt };
};

function err() {
	throw error(404);
}
