<script lang="ts">
	import MaterialIcon from '$lib/components/MaterialIcon.svelte';

	interface Props {
		members: {
			name: string;
			socials?: {
				twitter?: string;
				youtube?: string;
				twitch?: string;
				other?: string;
			};
			additional?: string;
		}[];
	}

	let { members }: Props = $props();
</script>

<ul>
	{#each members as { name, socials, additional }}
		<li>
			<strong>{name}</strong>
			{#if additional !== undefined}
				{additional}
			{/if}
			{#if socials}
				{@const { twitter, youtube, twitch, other } = socials}
				-
				{#if twitter}
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
							class="vertical-icn"
						/></a
					>{/if}{#if youtube}{@const path = youtube[0] === '@' ? youtube : `channel/${youtube}`}
					<a
						href="https://youtube.com/{path}"
						target="_blank"
						rel="noopener noreferrer"
						class="no-after-icn"
						><img
							src="/images/logos/yt_icon_rgb.webp"
							alt="YouTube"
							width="128"
							height="90"
							title="/{path}"
							loading="lazy"
						/></a
					>{/if}{#if twitch}
					<a
						href="https://twitch.tv/{twitch}"
						target="_blank"
						rel="noopener noreferrer"
						class="no-after-icn twitch-icn-a"
						><img
							src="/images/logos/twitch.svg"
							alt="Twitch"
							width="118"
							height="138"
							class="vertical-icn"
							title="@{twitch}"
							loading="lazy"
						/></a
					>{/if}{#if other}
					<a href={other} target="_blank" rel="noopener noreferrer" class="no-after-icn">
						<MaterialIcon
							kind="link-45deg"
							width="30px"
							style="
								filter:
									brightness(0)
									saturate(100%)
									invert(68%)
									sepia(86%)
									saturate(149%)
									hue-rotate(171deg)
									brightness(93%)
									contrast(94%);
								vertical-align: middle;
							"
						/>
					</a>
				{/if}
			{/if}
		</li>
	{/each}
</ul>

<style lang="scss">
	@use '$lib/stylesheets/variables/color' as *;

	li {
		margin-bottom: 0.4rem;
	}

	a {
		margin-right: 0.75rem;
	}

	.twitch-icn-a {
		margin-right: 0.45rem;
	}

	img {
		width: 27px;
		height: auto;
		color: $primary-color-pale;
		vertical-align: middle;
	}

	.vertical-icn {
		width: 22px;
	}
</style>
