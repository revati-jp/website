<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { fly } from 'svelte/transition';

	interface Props {
		open: Writable<boolean>;
		title?: string | null;
		/**
		 * The minimum width of the modal. (`px`)
		 *
		 * But it will be `100vw - 29px` if it is bigger than `100vw - 29px`.
		 */
		minWidth?: number;
		children?: import('svelte').Snippet;
	}

	let { open, title = null, minWidth = 382, children }: Props = $props();

	let dialog: HTMLDialogElement | undefined = $state();
	$effect(() => {
		if (dialog !== undefined) {
			if ($open && !dialog.open) dialog.showModal();
			else if (dialog.open) dialog.close();
		}
	});

	function close() {
		open.set(false);
	}
</script>

<!-- Is the `<dialog>` element really not a non-interactive element? -->
<!-- And `8px` in the `style` attribute is the sum of the maximum border width of the `<dialog>` element. -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<dialog
	onclick={(e) => {
		if (e.target === dialog) close();
	}}
	onclose={close}
	bind:this={dialog}
	class="modal"
	style="min-width: min({minWidth}px, 100vw - 8px);"
>
	{#if $open}
		<div class="modal-content" transition:fly|global={{ y: -64, duration: 240 }}>
			{#if title !== null}
				<h1>{title}</h1>
			{/if}
			{@render children?.()}
			<button onclick={close}>
				<!--
					Google Material Symbols and Icons - Close
					https://fonts.google.com/icons?selected=Material+Symbols+Outlined:close:FILL@0;wght@400;GRAD@200;opsz@24&icon.query=close&icon.size=24&icon.color=%23e8eaed
					This icon is licensed under the Apache License Version 2.0: https://github.com/google/material-design-icons/blob/master/README.md
				-->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24px"
					viewBox="0 -960 960 960"
					width="24px"
					fill="#e8eaed"
					><path
						d="m252-176-74-76 227-228-227-230 74-76 229 230 227-230 74 76-227 230 227 228-74 76-227-230-229 230Z"
					/></svg
				>
			</button>
		</div>
	{/if}
</dialog>

<style lang="scss">
	@use '$lib/stylesheets/modal';
</style>
