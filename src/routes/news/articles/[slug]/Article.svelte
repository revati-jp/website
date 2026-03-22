<script lang="ts">
	import type { Component } from 'svelte';

	interface Props {
		body: Component;
	}

	let { body }: Props = $props();

	const SvelteComponent_1 = $derived(body);
</script>

<article class="article-body"><SvelteComponent_1 /></article>

<style lang="scss" global>
	@use '$lib/stylesheets/news/article_body';
</style>
