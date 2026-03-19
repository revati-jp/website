<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { addClassOnVisible } from '$lib/scripts/util';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	let effect: HTMLElement | undefined = $state();

	onMount(fadeIn);
	if (browser) window.addEventListener('scroll', fadeIn);

	/** **＊ Must be called in the browser environment.** */
	function fadeIn() {
		addClassOnVisible(effect, 'active');
	}
</script>

<div class="effect" class:active={false} bind:this={effect}>
	<div class="container">
		{@render children?.()}
	</div>
</div>

<style lang="scss">
	@use '$lib/stylesheets/reveal_fade_in';
</style>
