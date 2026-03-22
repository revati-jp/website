<script lang="ts">
	import MemberCard from './MemberCard.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import GearsAndSettings from '$lib/components/home/teams/GearsAndSettings.svelte';

	import { MEMBER_LISTS } from '$lib/scripts/data/MEMBERS';
	import { type GearsAndSettings as GearsAndSettingsType } from '$lib/scripts/types';
	import { isGearsAndSettingsModalOpen } from '$lib/scripts/stores';
	import { replaceState } from '$app/navigation';

	interface Props {
		division: string | null;
	}

	let { division }: Props = $props();

	let currentDivisionIndex = $state(
		(() => {
			if (division === null) return 0;
			const index = MEMBER_LISTS.findIndex(({ divisionName }) => divisionName === division);
			return index === -1 ? 0 : index;
		})()
	);

	let currentDivisionMembers = $derived(MEMBER_LISTS[currentDivisionIndex].members);

	let gearsAndSettingsModalContent: {
		playerName: string;
		gearsAndSettings: GearsAndSettingsType;
	} | null = $state(null);
	$effect(() => {
		if (!$isGearsAndSettingsModalOpen) gearsAndSettingsModalContent = null;
	});
</script>

<ul class="divisions">
	{#each MEMBER_LISTS as { divisionName }, i (divisionName)}
		<li class="division">
			<button
				class="div-btn"
				class:active={i === currentDivisionIndex}
				onclick={() => {
					currentDivisionIndex = i;
					replaceState(`?div=${divisionName.replaceAll(' ', '+')}#teams`, {});
				}}>{divisionName}</button
			>
		</li>
	{/each}
</ul>

{#if MEMBER_LISTS[currentDivisionIndex].divisionSubName !== undefined}
	<h2 class="division-sub-name">{MEMBER_LISTS[currentDivisionIndex].divisionSubName}</h2>
{/if}

{#if currentDivisionMembers.length <= 0}
	<p>Coming soon...</p>
{/if}

<ul class="members">
	{#each currentDivisionMembers as member (member.memberName)}
		<MemberCard
			{member}
			onOpenGearsAndSettingsModal={(detail) => (gearsAndSettingsModalContent = detail)}
		/>
	{/each}
</ul>

<Modal open={isGearsAndSettingsModalOpen} minWidth={432}>
	{#if gearsAndSettingsModalContent !== null}
		<GearsAndSettings {...gearsAndSettingsModalContent} />
	{/if}
</Modal>

<noscript>
	{#each MEMBER_LISTS as { divisionName, divisionSubName, members } (divisionName)}
		<h2 class="division-name">
			{divisionName}
		</h2>
		{#if divisionSubName !== undefined}
			<h3>{divisionSubName}</h3>
		{/if}
		<ul class="members noscript">
			{#each members as member (member.memberName)}
				<MemberCard
					{member}
					onOpenGearsAndSettingsModal={(detail) => (gearsAndSettingsModalContent = detail)}
				/>
			{/each}
		</ul>
	{/each}
</noscript>

<style lang="scss">
	@use '$lib/stylesheets/home/teams';
</style>
