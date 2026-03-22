<script lang="ts">
	import { SITE_URL, PAGE_FULL_TITLE_PART } from '$lib/scripts/variables';

	interface Props {
		/**
		 * ex: `NEWS` (REVATI | NEWS)
		 *
		 * Default: `REVATI` (REVATI)
		 */
		title?: string;
		/** ex: `Rinrin.rs のホームページです。` */
		desc: string;
		/** ex: `{SITE_URL}/profile` */
		canonicalUrl: string;
		/**
		 * ex: `article`
		 *
		 * Default: `website`
		 */
		ogType?: string;
		/**
		 * ex: `summary`
		 *
		 * Default: `summary_large_image`
		 */
		ogCardType?: string;
		/**
		 * Whether to set the thumbnail image.
		 *
		 * If `false`, set `<meta name="thumbnail" content=ABS_PATH />` and `<meta property="og:image" content=ABS_PATH />`.
		 *
		 * Default: `false`
		 */
		doesNotSetThumbnailImg?: boolean;
	}

	let {
		title = 'REVATI',
		desc,
		canonicalUrl,
		ogType = 'website',
		ogCardType = 'summary_large_image',
		doesNotSetThumbnailImg = false
	}: Props = $props();

	let fullTitle = $derived(title === 'REVATI' ? title : PAGE_FULL_TITLE_PART + title);
	const absThumbnailPath = SITE_URL + '/images/logos/revati/header_mini_oxipng.png';
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="title" content={fullTitle} />
	<meta name="description" content={desc} />
	{#if !doesNotSetThumbnailImg}
		<meta name="thumbnail" content={absThumbnailPath} />
	{/if}

	<meta property="og:title" content={title} />
	<meta property="og:description" content={desc} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:type" content={ogType} />
	<meta name="twitter:card" content={ogCardType} />
	{#if !doesNotSetThumbnailImg}
		<meta property="og:image" content={absThumbnailPath} />
	{/if}

	<link rel="canonical" href={canonicalUrl} />
</svelte:head>
