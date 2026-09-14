<script lang="ts">
	import Socials from './Socials.svelte';
	import LangSwitcher from './LangSwitcher.svelte';

	import { isDrawerMenuOpened } from '$lib/scripts/stores';
	import { COPYRIGHT } from '$lib/scripts/variables';
	import { SOCIALS } from '$lib/scripts/variables';

	const REVATI_STUDIO_TITLE = 'REVATI Studio（レバスタ）';
</script>

<footer inert={$isDrawerMenuOpened}>
	<p class="copyright">{COPYRIGHT}</p>
	<div>
		<a href="/privacy">Privacy</a><a href="mailto:{SOCIALS.email}">Contact</a><a href="/licenses"
			>Licenses</a
		><a href="/feed" target="_blank" class="no-after-icn">Feed</a><a
			href="https://github.com/revati-jp/website">Source</a
		>
	</div>
	<div class="socials"><Socials style="margin-top: 21px;" /></div>
	<div>
		<a href="https://studio.revati.jp" target="_blank" rel="noopener" class="no-after-icn"
			><img
				src="/images/logos/REVATI-Studio/250724_studio_logo_banner.webp"
				alt={REVATI_STUDIO_TITLE}
				title={REVATI_STUDIO_TITLE}
			/></a
		>
	</div>
	<div class="lang-btn"><LangSwitcher /></div>
</footer>

<style lang="scss">
	@use '$lib/stylesheets/variables/mixin' as *;

	footer {
		// Ensures the footer stays anchored to the bottom on pages with short content, especially on high-resolution screens (e.g., 4K).
		min-height: 24vh;
		background-color: #0a0a0a;

		.copyright {
			font-size: 16px;
			margin-top: 2em;
		}

		.socials {
			margin-bottom: 16px;
		}

		.lang-btn {
			margin: 0 32px 24px 0;
			float: right;
		}
	}

	a {
		margin: 0 15px;

		&:not(:hover, :focus) {
			color: #eeeeee;
			text-decoration: none;
		}
	}

	img {
		width: 256px;
		height: auto;
		aspect-ratio: 4 / 1;
		margin-bottom: 12px;

		&:hover {
			opacity: 0.8;
		}
	}

	@include sp {
		a {
			margin-inline: 10px;
			font-size: 15px;
		}
	}
</style>
