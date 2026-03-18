<script lang="ts">
	import Header from '$lib/components/header/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import { BREAKPOINT_HB } from '$lib/scripts/variables';
	import { updateVh001 } from '$lib/scripts/util';
	import { isDrawerMenuOpened, isHamburgerButtonEnabled } from '$lib/scripts/stores';
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';
	import { navigating, page } from '$app/stores';
	import { COPYRIGHT, SITE_URL, PAGE_FULL_TITLE_PART } from '$lib/scripts/variables';
	import { browser } from '$app/environment';
	import { HEADER_ITEMS } from '$lib/scripts/data/HEADER_ITEMS';
	import { SECTIONS } from '$lib/scripts/data/SECTIONS';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	let maxVh1: number;

	if (browser) {
		let bp_hb = window.matchMedia(BREAKPOINT_HB);
		isHamburgerButtonEnabled.set(bp_hb.matches);

		window.addEventListener('resize', () => {
			updateVh001();
			if (maxVh1 < window.innerHeight) updateMaxVh001();

			isHamburgerButtonEnabled.set(bp_hb.matches);
			if (!$isHamburgerButtonEnabled) isDrawerMenuOpened.set(false);
		});

		updateVh001();
		updateMaxVh001();
	}

	$effect(() => {
		if (
			$navigating !== null &&
			$navigating.to !== null &&
			$navigating.to.url.href !== $page.url.href
		)
			NProgress.start();
		else NProgress.done();
	});

	/**
	 * Updates the CSS variable `--max-vh001`.
	 *
	 * **＊ Must be called in the browser environment.**
	 */
	function updateMaxVh001() {
		maxVh1 = window.innerHeight;
		document.documentElement.style.setProperty('--max-vh001', maxVh1 * 0.01 + 'px');
	}
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width,initial-scale=1" />
	<meta name="format-detection" content="telephone=no,address=no,email=no" />

	<!-- ▼ Google Fonts ▼ -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@400;900&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap&text={HEADER_ITEMS.join(
			''
		).toUpperCase()}"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@700&display=swap&text={SECTIONS.join(
			''
		).toUpperCase()}"
		rel="stylesheet"
	/>
	<!-- ▲ Google Fonts ▲ -->

	<meta property="og:site_name" content="REVATI" />
	<meta property="og:locale" content="ja_JP" />
	<meta name="twitter:site" content={SITE_URL} />
	<!-- ↓ $primary-color -->
	<meta name="theme-color" content="#154c83" />

	<meta name="keywords" content="sarf,revati" />
	<meta name="author" content="Rinrin.rs <rinrin0413.valley@gmail.com>, GEN3987" />
	<meta name="copyright" content={COPYRIGHT} />

	<link rel="icon" href="/images/logos/revati/icon_180px_oxipng.png?v=4" />
	<link
		rel="alternate"
		href="/feed"
		type="application/atom+xml"
		title="{PAGE_FULL_TITLE_PART}News"
	/>
</svelte:head>

<noscript class="global-noscript">
	JavaScript is disabled in your browser. Some features don't work properly.
	<br /><br />
	お使いのブラウザでは JavaScript が無効になっています。 一部の機能が正常に動作しません。
	<br /><br />
	사용 중인 브라우저에서 JavaScript 가 비활성화되어 있습니다. 일부 기능이 정상적으로 작동하지 않습니다.
</noscript>

<Header />

<main id="main-content" inert={$isDrawerMenuOpened}>{@render children?.()}</main>

<Footer />

<style lang="scss" global>
	@use '$lib/stylesheets/layout';
	@use '$lib/stylesheets/style';
</style>
