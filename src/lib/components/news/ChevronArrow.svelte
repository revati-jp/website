<script lang="ts">
	interface Props {
		direction: 'left' | 'right';
		transparent?: boolean;
	}

	let { direction, transparent = false }: Props = $props();
</script>

<div class:transparent>
	{#if direction === 'left'}
		<!--
			Google Material Symbols and Icons - Arrow Back iOS
			https://fonts.google.com/icons?selected=Material%20Symbols%20Outlined%3Aarrow_back_ios%3AFILL%400%3Bwght%40500%3BGRAD%400%3Bopsz%4040
			This icon is licensed under the Apache License Version 2.0: https://github.com/google/material-design-icons/blob/master/README.md
		-->
		<svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"
			><path
				d="M406.377-73.623 0-480l406.377-406.377 67.377 68.043L135.42-480l338.334 338.334-67.377 68.043Z"
			/></svg
		>
	{:else if direction === 'right'}
		<!--
			Google Material Symbols and Icons - Arrow Forward iOS
			https://fonts.google.com/icons?selected=Material%20Symbols%20Outlined%3Aarrow_forward_ios%3AFILL%400%3Bwght%40500%3BGRAD%400%3Bopsz%4040
			This icon is licensed under the Apache License Version 2.0: https://github.com/google/material-design-icons/blob/master/README.md
		-->
		<svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"
			><path
				d="M309.666-74.957 242.29-143l338.333-338.333L242.29-819.667l67.376-68.043 406.377 406.377L309.666-74.956Z"
			/></svg
		>
	{/if}
</div>

<style lang="scss">
	@use '$lib/stylesheets/variables/mixin' as *;

	.transparent {
		opacity: 0.15;
	}

	svg {
		fill: white;
		width: 64px;
		height: auto;
		transition: 0.2s;
	}

	@include not-wide-width {
		svg {
			width: 39px;
		}
	}
</style>
