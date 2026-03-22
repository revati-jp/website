<script lang="ts">
	import { _ } from 'svelte-i18n';

	import { SPONSORS } from '$lib/scripts/data/SPONSORS';
</script>

{#if 0 < SPONSORS.length}
	<ul>
		{#each SPONSORS as { name, url, logo } (name)}
			<li>
				<a href={url} target="_blank" rel="noopener noreferrer">
					<img src="/images/logos/{logo}" alt={$_('w.logoOf', { values: { name } })} />
					<span>{name}</span>
				</a>
			</li>
		{/each}
	</ul>
{:else}
	<p>...( 'ω')</p>
{/if}

<style lang="scss">
	ul {
		padding: 0;
		list-style: none;
	}

	li {
		margin: 0;
		transition: 0.1s;

		&:hover {
			background-color: #ffffff12;
		}
	}

	a {
		display: inline-block;
		color: inherit;
		padding: 44px 0;

		&::after {
			filter: grayscale(1) brightness(1.3);
		}
	}

	img {
		display: block;
		max-width: 100%;
		max-height: 94px;
		margin: 0 auto;
		margin-bottom: 22px;
	}

	span {
		font-size: 16px;
	}
</style>
