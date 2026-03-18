<script lang="ts">
	import { SECTIONS } from '$lib/scripts/data/SECTIONS';

	interface Props {
		/** Name of the section. */
		name: (typeof SECTIONS)[number];
	}

	let { name }: Props = $props();
</script>

<h1>{name.toUpperCase()}</h1>

<style lang="scss">
	@use '$lib/stylesheets/variables/mixin' as *;

	h1 {
		font-family: 'Josefin Sans', sans-serif;
		font-weight: 700;
		font-size: 70px;
		color: #d6ffff;
		margin-bottom: 32px;
		padding-top: 64px;
		filter: drop-shadow(0 0 36px #caffffa0) drop-shadow(0 0 86px #7fffffa0);

		@include sp {
			font-size: 48px;
		}
	}
</style>
