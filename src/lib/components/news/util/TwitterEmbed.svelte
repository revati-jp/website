<script lang="ts">
	import { browser } from '$app/environment';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

{#if browser}
	{#if children}{@render children()}{:else}⚠️ SET TWITTER EMBED ⚠️{/if}
{/if}
