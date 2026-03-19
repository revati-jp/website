<script lang="ts">
	import HbBtn from './HamburgerButton.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Socials from '$lib/components/Socials.svelte';
	import LangSwitcher from '$lib/components/LangSwitcher.svelte';
	import Contact from './Contact.svelte';

	import { browser } from '$app/environment';
	import { HEADER_ITEMS, NON_SECTION_ITEMS } from '$lib/scripts/data/HEADER_ITEMS';
	import {
		isContactModalOpen,
		isDrawerMenuOpened,
		isHamburgerButtonEnabled
	} from '$lib/scripts/stores';
	import { _ } from 'svelte-i18n';
	import { COPYRIGHT } from '$lib/scripts/variables';
	import { page } from '$app/stores';

	let url = $derived($page.url);
	let currentSection = $state('');

	if (browser) {
		window.addEventListener('scroll', function () {
			if (url !== undefined && url.pathname === '/') {
				let sectionPositions = HEADER_ITEMS.filter((i) => !NON_SECTION_ITEMS.includes(i)).map(
					(item) => {
						return {
							item,
							relPos:
								document.getElementById(item)!.getBoundingClientRect().top! -
								window.innerHeight * 0.45
						};
					}
				);
				sectionPositions.forEach(({ item, relPos }) => {
					if (relPos < 0) currentSection = item;
				});
				if (0 <= sectionPositions[0].relPos) currentSection = 'top';
			} else {
				currentSection = '';
			}
		});
	}
</script>

<div id="header-bg" class:visible={$isDrawerMenuOpened}></div>

<header class:open={$isDrawerMenuOpened}>
	<nav>
		{#if !$isHamburgerButtonEnabled}
			<a href="#main-content" class="skip-btn">{$_('header.skip')}</a>
		{/if}
		<a href="/" draggable="false" tabindex="-1" title={$_('header.back')}><span></span></a>
		<HbBtn />
		<ul inert={$isHamburgerButtonEnabled && !$isDrawerMenuOpened}>
			{#each HEADER_ITEMS as item (item)}
				{#if item === 'contact'}
					<li class="item-contact">
						<button class:active={false} onclick={() => isContactModalOpen.set(true)}
							>CONTACT</button
						>
					</li>
				{:else}
					<li>
						<a
							href="/#{item}"
							class:active={currentSection === ''
								? url.hash === '#' + item || url.pathname.split('/')[1] === item
								: currentSection === item}
							onclick={() => isDrawerMenuOpened.set(false)}>{item.toUpperCase()}</a
						>
					</li>
				{/if}
			{/each}
		</ul>
		<h3>{COPYRIGHT}</h3>
	</nav>
</header>

<Modal open={isContactModalOpen} title="CONTACT US"><Contact /></Modal>

<div id="header2" class:open={$isDrawerMenuOpened} inert={!$isDrawerMenuOpened}>
	<div class="socials">
		<Socials
			style="
				justify-content: left;
				margin-top: 5vh;
				margin-left: 5vh;
				margin-bottom: calc(13vh - 56px);
			"
		/>
	</div>
	<div class="lang-switcher"><LangSwitcher /></div>
</div>

<style lang="scss">
	@use '$lib/stylesheets/header/header';
</style>
