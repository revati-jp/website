<script lang="ts">
	import { PAGE_FULL_TITLE_PART } from '$lib/scripts/variables';

	import { page } from '$app/state';
	import { _ } from 'svelte-i18n';

	let status = $derived(page.status);
	let is404 = $derived(status === 404);
	let err = $derived(page.error);
	let msg = $derived(
		is404 ? 'Page not found' : err !== null ? err.message : 'Something went wrong'
	);
	let title = $derived(`${status} ${msg}`);
</script>

<svelte:head>
	<title>{PAGE_FULL_TITLE_PART}{title}</title>
</svelte:head>

<div>
	<h1>{title}</h1>
	<p>{is404 ? $_('error.404') : $_('error.unknown')}</p>
	<p><a href="/">{$_('w.backToTop')}</a></p>
</div>

<style lang="scss">
	@use '$lib/stylesheets/variables/color' as *;
	@use '$lib/stylesheets/variables/mixin' as *;

	div {
		min-height: 36vh;
		margin-top: 40vh;
	}

	h1 {
		font-size: 42px;

		@include sp {
			font-size: 28px;
		}

		@include pc {
			letter-spacing: 4px;
		}
	}

	p {
		margin-top: 32px;
		filter: drop-shadow(1px 1px 0 #030303) drop-shadow(1px -1px 0 #030303);
		font-size: 24px;

		@include sp {
			font-size: 16px;
		}
	}

	a {
		font-size: 18px;
	}
</style>
