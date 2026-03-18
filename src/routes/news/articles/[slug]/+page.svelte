<script lang="ts">
	import { run } from 'svelte/legacy';

	import HeadMetadata from '$lib/components/HeadMetadata.svelte';
	import Article from './Article.svelte';

	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { ArticleId } from '$lib/scripts/ArticleId';
	import { HEADER_1200x600_PATH, SITE_URL } from '$lib/scripts/variables';
	import { _, date as dateI18n } from 'svelte-i18n';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let metadata = $derived(data.frontmatter);

	let redirectTo = $derived(metadata.redirect);
	let willRedirect = $derived(redirectTo !== undefined);
	onMount(() => {
		if (redirectTo !== undefined) goto(redirectTo);
	});

	let paths = $derived($page.url.pathname.split('/'));
	let pathnameLength = $derived(paths.length);
	let isPathnameEndsWithSlash = $derived(paths[pathnameLength - 1] === '');
	let id = $derived(
		new ArticleId(redirectTo ?? paths[pathnameLength - (isPathnameEndsWithSlash ? 2 : 1)])
	);
	let slug = $derived(id.string);

	let thumbnailImgFmt = $derived(data.thumbnailImgFmt);
	let hasThumbnailImg = $derived(thumbnailImgFmt !== null);
	let thumbnailImgPath = $derived(
		hasThumbnailImg ? `/images/news/thumbnails/${slug}.${thumbnailImgFmt}` : HEADER_1200x600_PATH
	);
	let absThumbnailImgPath = $derived(SITE_URL + thumbnailImgPath);

	let date = $derived(willRedirect ? null : id.date);
	let datePlus9h: Date = $state();
	run(() => {
		if (date !== null) {
			datePlus9h = new Date(date);
			datePlus9h.setHours(datePlus9h.getHours() + 9);
		}
	});
</script>

<HeadMetadata
	title="NEWS - {metadata.title}"
	desc=""
	canonicalUrl={SITE_URL + '/news/articles/' + slug}
	ogType="article"
	doesNotSetThumbnailImg
/>

<svelte:head>
	<meta property="og:image" content={absThumbnailImgPath} />
	<meta name="thumbnail" content={absThumbnailImgPath} />
	<meta name="robots" content="max-image-preview:large" />

	{#if !metadata.indexed || willRedirect}
		<meta name="robots" content="noindex" />
	{/if}
</svelte:head>

<div class="container">
	{#if hasThumbnailImg}
		<div id="bg" style="background-image: url({thumbnailImgPath});"></div>
	{/if}
	<div id="content">
		{#if hasThumbnailImg}
			<img src={thumbnailImgPath} alt="" />
		{/if}
		<h1>{metadata.title}</h1>
		{#if willRedirect}
			<p>
				{$_('news.wasRedirect.0')}<a href={redirectTo}>/news/articles/{redirectTo}</a>{$_(
					'news.wasRedirect.1'
				)}
			</p>
		{:else}
			{#if date !== null}
				<h2>
					<time datetime={datePlus9h.toISOString()}>{$dateI18n(date, { format: 'long' })}</time>
				</h2>
			{/if}
			<hr />
			<Article body={data.component} />
		{/if}
		<a href="/news"
			>{$_(
				'news.back'
			)}<!--
				Bootstrap Icons - Box arrow in down left
				https://icons.getbootstrap.com/icons/box-arrow-in-down-left
				Copyright (c) 2019 The Bootstrap Authors
				under the MIT License: https://github.com/twbs/icons/blob/main/LICENSE
			--><svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				class="bi bi-box-arrow-in-down-left"
				viewBox="0 0 16 16"
			>
				<path
					fill-rule="evenodd"
					d="M9.636 2.5a.5.5 0 0 0-.5-.5H2.5A1.5 1.5 0 0 0 1 3.5v10A1.5 1.5 0 0 0 2.5 15h10a1.5 1.5 0 0 0 1.5-1.5V6.864a.5.5 0 0 0-1 0V13.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
				/>
				<path
					fill-rule="evenodd"
					d="M5 10.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 0-1H6.707l8.147-8.146a.5.5 0 0 0-.708-.708L6 9.293V5.5a.5.5 0 0 0-1 0v5z"
				/>
			</svg>
		</a>
	</div>
</div>

<style lang="scss">
	@use '$lib/stylesheets/news/article_page';
</style>
