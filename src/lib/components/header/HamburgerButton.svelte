<script lang="ts">
	import { fly, scale } from 'svelte/transition';
	import { isDrawerMenuOpened, isHamburgerButtonEnabled } from '$lib/scripts/stores';

	const FLY_OFFSET = 32;
</script>

{#if $isHamburgerButtonEnabled}
	<button
		class:is-opened={$isDrawerMenuOpened}
		onclick={() => isDrawerMenuOpened.update((v) => !v)}
		transition:fly|global={{ x: FLY_OFFSET, y: -FLY_OFFSET, duration: 600 }}
	>
		{#key $isDrawerMenuOpened}
			<span transition:scale|global={{ duration: 300 }}
				>{$isDrawerMenuOpened ? 'CLOSE' : 'MENU'}</span
			>
		{/key}
	</button>
{/if}

<style lang="scss">
	@use '$lib/stylesheets/header/hamburger_btn';
</style>
