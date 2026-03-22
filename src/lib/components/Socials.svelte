<script lang="ts">
	import { SOCIALS } from '$lib/scripts/variables';

	interface Props {
		/** Inline styles. */
		style?: string;
	}

	let { style = '' }: Props = $props();
</script>

<ul {style}>
	<li>
		<a
			href="https://x.com/{SOCIALS.twitter}"
			target="_blank"
			rel="noopener noreferrer"
			title="X: @{SOCIALS.twitter}"
			class="no-after-icn"
		>
			<img src="/images/logos/x_logo_white.svg" alt="X" width="125" height="128" id="x-logo" />
		</a>
	</li>
	<li>
		<a
			href="https://www.youtube.com/{SOCIALS.youtube}"
			target="_blank"
			rel="noopener noreferrer"
			title="YouTube: /{SOCIALS.youtube}"
			class="no-after-icn"
		>
			<img src="/images/logos/yt_icon_mono_dark.webp" alt="YouTube" width="128" height="90" />
		</a>
	</li>
	<li>
		<a
			href="https://github.com/{SOCIALS.github}"
			target="_blank"
			rel="noopener noreferrer"
			title="GitHub: @{SOCIALS.github}"
			class="no-after-icn"
		>
			<img src="/images/logos/github-mark-white.svg" alt="GitHub" width="98" height="96" />
		</a>
	</li>
</ul>

<style lang="scss">
	ul {
		margin-top: 64px;
		padding: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;

		li {
			margin: 0 12px;

			img {
				width: 34px;
				height: auto;
				color: white;
			}
		}
	}

	#x-logo {
		width: 28px;
	}
</style>
