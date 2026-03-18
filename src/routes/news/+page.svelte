<script lang="ts">
	import HeadMetadata from '$lib/components/HeadMetadata.svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import NewsList from '$lib/components/news/NewsList.svelte';

	import type { PageData } from './$types';
	import { SITE_URL } from '$lib/scripts/variables';
	import { _ } from 'svelte-i18n';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<HeadMetadata title="NEWS" desc="REVATIの最新情報をお届けします。" canonicalUrl="{SITE_URL}/news" />

<div class="container">
	<section class="no-max-width" id="news">
		<SectionTitle name="news" />
		<p>{$_('news.desc')}</p>
		<div class="content">
			<NewsList articles={data.articles} thumbnailImgFmts={data.thumbnailImgFmts} showAll />
		</div>
	</section>
</div>

<style lang="scss">
	@use '$lib/stylesheets/variables/mixin' as *;

	.no-max-width {
		max-width: none !important;

		p {
			font-size: 24px;
			margin-bottom: 48px;

			@include sp {
				font-size: 18px;
			}
		}
	}
</style>
