<script lang="ts">
	import { SPONSORS } from '$lib/scripts/data/SPONSORS';
	import Sponsor from './Sponsor.svelte';
</script>

{#if 0 < SPONSORS.length}
	<div class="banner-container" tabindex="-1">
		<div class="banner-content">
			<ul>
				{#each SPONSORS as sponsor (sponsor.name)}
					<Sponsor {...sponsor} />
				{/each}
			</ul>
			<ul>
				{#each SPONSORS as sponsor (sponsor.name)}
					<Sponsor {...sponsor} />
				{/each}
			</ul>
		</div>
	</div>
{/if}

<style lang="scss">
	@use '$lib/stylesheets/variables/dimension' as *;
	@use '$lib/stylesheets/variables/mixin' as *;

	// 広い画面におけるスポンサーのロゴの間隔指数。
	// 200% 超過である必要があります。
	// 間隔の目安は、「バナーが狭い画面用に切り替わらない最小の画面幅(≒788)」の際に、妥協できる限界の狭さ。
	// The interval index for the sponsor logos on wide screens.
	// Must be greater than 200.
	// Set the interval to be as narrow as is acceptable in the case of the minimum screen width (≈788) at which the banner does not switch for narrow screens.
	$interval-on-wide: 201%;
	// 狭い画面におけるスポンサーのロゴの間隔指数。
	// 200% 超過である必要があります。
	// 間隔の目安は、「iPhone SE (第2世代) の画面幅(≒375)」の際に、妥協できる限界の狭さ。
	// The interval index for the sponsor logos on narrow screens.
	// Must be greater than 200.
	// Set the interval to be as narrow as is acceptable in the case of the screen width of the iPhone SE (2nd generation) (≈375).
	$interval-on-narrow: 210%;

	// 広い画面においてバナーが一周するまでの期間。
	// 間隔の目安は、「バナーが狭い画面用に切り替わらない最小の画面幅(≒788)」の際に、妥協できる限界の短さ。
	// The duration for the banner to go around on wide screens.
	// Set the duration to be as short as is acceptable in the case of the minimum screen width (≈788) at which the banner does not switch for narrow screens.
	$duration-on-wide: 10s;
	// 狭い画面においてバナーが一周するまでの期間。
	// 間隔の目安は、「iPhone SE (第2世代) の画面幅(≒375)」の際に、妥協できる限界の短さ。
	// The duration for the banner to go around on narrow screens.
	// Set the duration to be as short as is acceptable in the case of the screen width of the iPhone SE (2nd generation) (≈375).
	$duration-on-narrow: 15s;

	.banner-container {
		background-color: #111111;
		box-shadow: 0 6px 18px #00000050;
		overflow-x: hidden;
	}

	.banner-content {
		display: flex;
		width: $interval-on-wide;
		height: 98px;

		&:hover ul {
			animation-play-state: paused;
		}

		@include sp {
			width: $interval-on-narrow;
			height: 70px;
		}
	}

	ul {
		display: flex;
		height: 100%;
		width: 200%;
		margin: 0;
		padding: 0;
		justify-content: space-around;
		list-style: none;
		translate: 0;
		animation: slide $duration-on-wide linear infinite;

		@keyframes slide {
			to {
				translate: -100%;
			}
		}

		@include sp {
			animation: slide $duration-on-narrow linear infinite;
		}
	}
</style>
