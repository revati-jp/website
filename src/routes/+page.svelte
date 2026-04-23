<script lang="ts">
	import HeadMetadata from '$lib/components/HeadMetadata.svelte';
	import MainVisual from '$lib/components/home/MainVisual.svelte';
	import SponsorBanner from '$lib/components/home/sponsor_banner/SponsorBanner.svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import RevealFadeIn from '$lib/components/RevealFadeIn.svelte';
	import NewsList from '$lib/components/news/NewsList.svelte';
	import Teams from '$lib/components/home/teams/Teams.svelte';
	import Event from '$lib/components/home/Event.svelte';
	import Creative from '$lib/components/home/Creative.svelte';
	// import Coaching from '$lib/components/home/coaching/Coaching.svelte';
	// import Goods from '$lib/components/home/Goods.svelte';
	import Sponsors from '$lib/components/home/Sponsors.svelte';

	import type { PageData } from './$types';
	import { SITE_URL } from '$lib/scripts/variables';
	import { _ } from 'svelte-i18n';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<HeadMetadata
	desc="勝負の世界である以上、成績が低迷してしまうこともあると思います。そんなときでも私たちは物事の目的達成のために継続的に粘り強く努力することを厭わず 最後までやり遂げる無限のパワー・可能性を秘めています。"
	canonicalUrl={SITE_URL}
/>

<div class="container"><MainVisual /><SponsorBanner /></div>

<div class="container">
	<section id="about">
		<SectionTitle name="about" />
		<div class="content">
			<RevealFadeIn>
				<div class="slogan">
					<h1>UNDEFEATED SPIRIT</h1>
					<h2>{$_('top.about.undefeatedSpirit')}</h2>
				</div>
			</RevealFadeIn>
			<br />
			<RevealFadeIn>
				<p>
					{$_('top.about.0')}
					<br /><br />
					{$_('top.about.1')}
				</p>
			</RevealFadeIn>
		</div>
	</section>
</div>

<div class="container">
	<section id="news">
		<SectionTitle name="news" />
		<div class="content">
			<NewsList articles={data.articles} thumbnailImgFmts={data.thumbnailImgFmts} />
			<p><a href="/news">ALL</a></p>
		</div>
	</section>
</div>

<div class="container">
	<section id="teams">
		<SectionTitle name="teams" />
		<div class="content"><Teams division={data.division} /></div>
	</section>
</div>

<div class="container">
	<section id="event">
		<SectionTitle name="event" />
		<div class="content"><Event /></div>
	</section>
</div>

<div class="container">
	<section id="creative">
		<SectionTitle name="creative" />
		<div class="content"><Creative /></div>
	</section>
</div>

<!-- <div class="container">
	<section id="coaching">
		<SectionTitle name="coaching" />
		<div class="content"><Coaching /></div>
	</section>
</div> -->

<!-- <div class="container">
	<section id="goods">
		<SectionTitle name="goods" />
		<div class="content"><Goods /></div>
	</section>
</div> -->

<div class="container">
	<section id="sponsors">
		<SectionTitle name="sponsors" />
		<div class="content"><Sponsors /></div>
	</section>
</div>

<style lang="scss">
	@use '$lib/stylesheets/home/home';
</style>
