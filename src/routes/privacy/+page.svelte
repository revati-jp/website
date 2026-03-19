<script lang="ts">
	import HeadMetadata from '$lib/components/HeadMetadata.svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import Policy from './policy.svelte';

	import { SITE_URL } from '$lib/scripts/variables';
	import { _ } from 'svelte-i18n';
	import { date as dateI18n } from 'svelte-i18n';

	const establishedData = new Date('2024-12-11T09:00:00Z');
	const revisedDates = [
		'2025-02-14T09:00:00Z',
		'2025-04-23T09:00:00Z',
		'2025-05-11T09:00:00Z',
		'2025-07-24T09:00:00Z'
	].map((d) => new Date(d));
</script>

<HeadMetadata
	title="Privacy Policy"
	desc="弊チームのプライバシーポリシーです。"
	canonicalUrl="{SITE_URL}/privacy"
/>

<div class="container">
	<section class="no-max-width">
		<SectionTitle name="privacy policy" />
		<p>REVATI {$_('privacy.privacyPolicy')}</p>
		<hr />
		<div class="content"><Policy /></div>
		<hr />
		<p>
			<time datetime={establishedData.toISOString()}
				>{$_('w.establishedOn', {
					values: { date: $dateI18n(establishedData, { format: 'long' }) }
				})}</time
			>
			{#each revisedDates as date (date)}
				<br />
				<time datetime={date.toISOString()}
					>{$_('w.revisedOn', { values: { date: $dateI18n(date, { format: 'long' }) } })}</time
				>
			{/each}
		</p>
	</section>
</div>

<style lang="scss">
	@use '$lib/stylesheets/variables/color' as *;

	hr {
		margin: 24px 0;
		border: 1px solid $primary-color-pale-lighter;
	}
</style>
