<script lang="ts">
	import { COACHES } from '$lib/scripts/data/COACHING_PJ';
</script>

<ul>
	{#each COACHES as { name, icon, affiliation, twitter } (name)}
		<li>
			<img src="/images/members/{icon ?? 'noimage.webp'}" alt="" loading="lazy" class="icn" />
			<span>{affiliation} 所属</span>
			<h2>{name}</h2>
			{#if twitter !== null}
				<a
					href="https://x.com/{twitter}"
					target="_blank"
					rel="noopener noreferrer"
					class="no-after-icn"
				>
					<img
						src="/images/logos/x_logo_white.svg"
						alt="X"
						width="125"
						height="128"
						title="@{twitter}"
						loading="lazy"
						class="social-logo"
					/>
				</a>
			{/if}
		</li>
	{/each}
</ul>

<style lang="scss">
	@use '$lib/stylesheets/variables/color' as *;
	@use '$lib/stylesheets/variables/mixin' as *;

	ul {
		display: flex;
		width: 650px;
		max-width: 100%;
		margin: 0 auto;
		margin-top: 38px;
		margin-bottom: 22px;
		padding: 0;
		gap: 36px 0;
		flex-wrap: wrap;
		justify-content: center;
	}

	li {
		width: 168px;
		list-style: none;
	}

	.icn {
		width: 88px;
		height: auto;
		aspect-ratio: 1 / 1;
		border: 3px solid $primary-color-pale-darker;
		border-radius: 50%;
		pointer-events: none;
		user-select: none;
	}

	span {
		display: block;
		font-size: 14px;
	}

	h2 {
		font-size: 22px;
		font-weight: 900;
		margin: 0 auto;
	}

	.social-logo {
		width: 20px;
		height: auto;
		margin-top: 6px;
	}

	@include sp {
		ul {
			width: min(504px, 100%);
		}
	}
</style>
