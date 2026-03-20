<script lang="ts">
	import ChevronArrow from './ChevronArrow.svelte';
	import ArticleCard from './ArticleCard.svelte';

	import type { ArticleMetadata, ArticleThumbnailImgFmts } from '$lib/scripts/types';
	import { fly } from 'svelte/transition';
	import { _ } from 'svelte-i18n';

	interface Props {
		articles: ArticleMetadata[];
		thumbnailImgFmts: ArticleThumbnailImgFmts;
		showAll?: boolean;
	}

	let { articles, thumbnailImgFmts, showAll = false }: Props = $props();

	const MAX_ARTICLES = 4;
	let currentPage = $state(0);

	const pages = $derived(Math.ceil(articles.length / MAX_ARTICLES));

	let isFirstPage = $derived(currentPage <= 0);
	let isLastPage = $derived(pages - 1 <= currentPage);

	let flipTo: 1 | -1 = 1;

	let t9nPageN = $derived([$_('w.pageN.0'), $_('w.pageN.1')]);

	function pageFlip(to: number, isAbsolute = false) {
		const toAbs = isAbsolute ? to : currentPage + to;
		if ((toAbs < currentPage && !isFirstPage) || (currentPage < toAbs && !isLastPage)) {
			flipTo = toAbs < currentPage ? -1 : 1;
			currentPage = toAbs;
		}
	}

	function pageFlipAnim(node: Element, inOrOut: 'in' | 'out') {
		if (showAll) return fly(node, { duration: 300, y: 128 });

		const ANIM = {
			duration: { in: 700, out: 200 },
			offset: { in: 1024, out: -256 }
		};

		return fly(node, {
			duration: ANIM.duration[inOrOut],
			x: ANIM.offset[inOrOut] * flipTo
		});
	}
</script>

<svelte:window
	onkeydown={(e) => {
		const key = e.key;
		if (key === 'ArrowLeft') pageFlip(-1);
		else if (key === 'ArrowRight') pageFlip(1);
	}}
/>

<div class="news-list-container" class:show-all={showAll}>
	{#if !showAll}
		<div class="arrows">
			<button
				onclick={() => pageFlip(-1)}
				aria-label={$_('w.prev')}
				class="arrow back-arrow"
				class:inactive={isFirstPage}
				><ChevronArrow direction="left" transparent={isFirstPage} /></button
			><button
				onclick={() => pageFlip(1)}
				aria-label={$_('w.next')}
				class="arrow forward-arrow"
				class:inactive={isLastPage}
				><ChevronArrow direction="right" transparent={isLastPage} /></button
			>
		</div>
	{/if}

	<ul class="articles">
		{#each showAll ? articles : articles.slice(currentPage * MAX_ARTICLES, (currentPage + 1) * MAX_ARTICLES) as meta, i (meta.slug)}
			<li class="article pos-{i}" in:pageFlipAnim|global={'in'} out:pageFlipAnim|global={'out'}>
				<ArticleCard {meta} {thumbnailImgFmts} forceDesktopVerOnSemiNarrow={showAll} />
			</li>
		{/each}
	</ul>

	{#if !showAll}
		<ul class="indicators">
			<!-- ↓ Wait until Svelte become can omit the `as` clause. See: https://github.com/sveltejs/svelte/issues/8348 -->
			<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
			{#each Array(pages) as _, i (i)}
				<li>
					<button
						aria-label="{t9nPageN[0]}{i + 1}{t9nPageN[1]}"
						class="indicator"
						class:active={i === currentPage}
						onclick={() => pageFlip(i, true)}
					></button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="scss">
	@use '$lib/stylesheets/news/news_list';
</style>
