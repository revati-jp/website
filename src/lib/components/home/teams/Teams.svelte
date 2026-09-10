<script lang="ts">
	import MemberCard from './MemberCard.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import GearsAndSettings from '$lib/components/home/teams/GearsAndSettings.svelte';

	import { MEMBER_LISTS, TEAM_SECTIONS, LEGACY_DIVISION_IDS } from '$lib/scripts/data/MEMBERS';
	import { divisionHref, getTeamSections, resolveDivision } from '$lib/scripts/teamNavigation';
	import { type GearsAndSettings as GearsAndSettingsType } from '$lib/scripts/types';
	import { isGearsAndSettingsModalOpen } from '$lib/scripts/stores';
	import { page } from '$app/state';
	import { tick } from 'svelte';
	import { _ } from 'svelte-i18n';

	const sections = getTeamSections(TEAM_SECTIONS, MEMBER_LISTS);
	let currentDivision = $derived(
		resolveDivision(page.url.searchParams.get('div'), sections, LEGACY_DIVISION_IDS)
	);
	let currentSection = $derived(
		sections.find((section) => section.id === currentDivision?.sectionId)
	);
	let navigation: HTMLDivElement | undefined = $state();

	// Native focus scrolling can leave a partially visible link clipped (e.g. in Chromium).
	// Keep the focus outline visible without scrolling the page.
	function revealLink(link: HTMLElement) {
		const scroller = link.closest<HTMLElement>('.nav-scroll');
		if (scroller === null) return;
		const bounds = scroller.getBoundingClientRect();
		const target = link.getBoundingClientRect();
		const padding = 16;
		if (target.left < bounds.left + padding) {
			scroller.scrollLeft += target.left - bounds.left - padding;
		} else if (bounds.right - padding < target.right) {
			scroller.scrollLeft += target.right - bounds.right + padding;
		}
	}

	// CSS handles overflow hints without observation. Positioning needs a small fallback:
	// after shrinking a wide viewport, browsers can leave the selected link off-screen.
	$effect(() => {
		if (currentDivision === undefined || navigation === undefined) return;
		const root = navigation;
		let cancelled = false;
		const revealCurrent = () => {
			if (cancelled) return;
			root.querySelectorAll<HTMLElement>('[aria-current="true"]').forEach(revealLink);
			const focused = root.querySelector<HTMLElement>('a:focus');
			if (focused !== null) revealLink(focused);
		};
		const resize = new ResizeObserver(revealCurrent);
		resize.observe(root);
		void tick().then(revealCurrent);
		return () => {
			cancelled = true;
			resize.disconnect();
		};
	});

	let gearsAndSettingsModalContent: {
		playerName: string;
		gearsAndSettings: GearsAndSettingsType;
	} | null = $state(null);
	$effect(() => {
		if (!$isGearsAndSettingsModalOpen) gearsAndSettingsModalContent = null;
	});
</script>

<div
	class="team-navigation"
	bind:this={navigation}
	data-sveltekit-replacestate
	data-sveltekit-noscroll
	data-sveltekit-keepfocus
	data-sveltekit-preload-data="false"
>
	{#if currentSection !== undefined && currentDivision !== undefined}
		<nav class="nav-scroll" aria-label={$_('teams.selectSection')}>
			<ul class="sections nav-items">
				{#each sections as section (section.id)}
					{@const selected = section.id === currentSection.id}
					<li>
						<a
							href={divisionHref(page.url, selected ? currentDivision.id : section.divisions[0].id)}
							class="section-link"
							onfocus={(event) => revealLink(event.currentTarget)}
							aria-current={selected ? 'true' : undefined}>{section.label}</a
						>
					</li>
				{/each}
			</ul>
		</nav>
		{#if 1 < currentSection.divisions.length}
			<nav
				class="nav-scroll division-navigation"
				aria-label={$_('teams.selectDivision', { values: { section: currentSection.label } })}
			>
				<ul class="nav-items">
					{#each currentSection.divisions as division (division.id)}
						<li>
							<a
								href={divisionHref(page.url, division.id)}
								class="division-link"
								onfocus={(event) => revealLink(event.currentTarget)}
								aria-current={division.id === currentDivision.id ? 'true' : undefined}
								>{division.navLabel ?? division.divisionName}</a
							>
						</li>
					{/each}
				</ul>
			</nav>
		{/if}
	{/if}
</div>

<div class="selected-division">
	{#if currentDivision !== undefined}
		<h2 class="division-name">{currentDivision.divisionName}</h2>
		{#if currentDivision.divisionSubName !== undefined}
			<p class="division-sub-name">{currentDivision.divisionSubName}</p>
		{/if}
	{/if}
	{#if currentDivision === undefined || currentDivision.members.length === 0}
		<p>{$_('teams.comingSoon')}</p>
	{:else}
		<ul class="members">
			{#each currentDivision.members as member (member.memberName)}
				<MemberCard
					{member}
					onOpenGearsAndSettingsModal={(detail) => (gearsAndSettingsModalContent = detail)}
				/>
			{/each}
		</ul>
	{/if}
</div>

<Modal open={isGearsAndSettingsModalOpen} minWidth={432}>
	{#if gearsAndSettingsModalContent !== null}
		<GearsAndSettings {...gearsAndSettingsModalContent} />
	{/if}
</Modal>

<noscript>
	{#each MEMBER_LISTS as { id, divisionName, divisionSubName, members } (id)}
		<h2 class="division-name">{divisionName}</h2>
		{#if divisionSubName !== undefined}
			<p class="division-sub-name">{divisionSubName}</p>
		{/if}
		{#if members.length === 0}
			<p>{$_('teams.comingSoon')}</p>
		{/if}
		<ul class="members">
			{#each members as member (member.memberName)}
				<MemberCard
					{member}
					onOpenGearsAndSettingsModal={(detail) => (gearsAndSettingsModalContent = detail)}
				/>
			{/each}
		</ul>
	{:else}
		<p>{$_('teams.comingSoon')}</p>
	{/each}
</noscript>

<style lang="scss">
	@use '$lib/stylesheets/home/teams';
</style>
