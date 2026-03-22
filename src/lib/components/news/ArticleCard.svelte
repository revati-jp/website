<script lang="ts">
	import type { ArticleMetadata, ArticleThumbnailImgFmts } from '$lib/scripts/types';
	import { HEADER_1200x600_PATH } from '$lib/scripts/variables';
	import { _, date as dateI18n } from 'svelte-i18n';
	import { SvelteDate } from 'svelte/reactivity';

	interface Props {
		meta: ArticleMetadata;
		thumbnailImgFmts: ArticleThumbnailImgFmts;
		forceDesktopVerOnSemiNarrow?: boolean;
	}

	let { meta, thumbnailImgFmts, forceDesktopVerOnSemiNarrow = false }: Props = $props();

	const articleId = $derived(meta.slug!);
	const slug = $derived(articleId.string);
	const thumbnailImgFmt = $derived(thumbnailImgFmts[slug] ?? null);
	const date = $derived(articleId.date);
	const datePlus9h = $derived.by(() => {
		const d = new SvelteDate(date);
		d.setHours(d.getHours() + 9);
		return d;
	});
</script>

<a href="/news/articles/{slug}"
	><article class:force-pc-v-on-semi-narrow={forceDesktopVerOnSemiNarrow}>
		<div class="thumbnail-img">
			<img
				src={thumbnailImgFmt === null
					? HEADER_1200x600_PATH
					: `/images/news/thumbnails/${slug}.${thumbnailImgFmt}`}
				alt={$_('w.articleThumbnailImg')}
				loading="lazy"
			/>
		</div>
		<div class="meta">
			<h2>{meta.title}</h2>
			<time datetime={datePlus9h.toISOString()}>{$dateI18n(date, { format: 'long' })}</time>
		</div>
	</article></a
>

<style lang="scss">
	@use '$lib/stylesheets/news/article_card';
</style>
