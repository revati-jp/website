<script lang="ts">
	import { _ } from 'svelte-i18n';

	interface Props {
		name: string;
		url: string;
		logo: string;
	}

	let { name, url, logo }: Props = $props();
</script>

<li>
	<a
		href={url}
		target="_blank"
		rel="noopener noreferrer"
		title={name}
		class="no-after-icn"
		tabindex="-1"
	>
		<img src="images/logos/{logo}" alt={$_('w.logoOf', { values: { name } })} />
	</a>
</li>

<style lang="scss">
	li {
		height: 100%;
	}

	a:hover img {
		translate: 0 -54%;
		scale: 1.04;
	}

	img {
		height: 50%;
		position: relative;
		top: 50%;
		translate: 0 -50%;
		transition: 0.1s;
	}
</style>
