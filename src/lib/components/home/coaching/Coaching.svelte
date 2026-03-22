<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import Fees from './Fees.svelte';
	import Coaches from './Coaches.svelte';

	import { _ } from 'svelte-i18n';
	import { isFeesModalOpen, isCoachesModalOpen } from '$lib/scripts/stores';

	let modalTitles = $derived({
		fees: $_('coaching.fees'),
		coaches: $_('coaching.coaches')
	});

	const X_HANDLE = 'NGRev_coaching';
</script>

<img src="/images/coaching-poster.webp" alt={$_('w.poster')} class="poster" />

<p class="desc">
	{$_('coaching.desc.0')}
</p>

<p class="desc note">
	{$_('coaching.desc.1')}
</p>

<div class="buttons">
	<div>
		<button onclick={() => isFeesModalOpen.set(true)}>{modalTitles.fees}</button>
		<Modal open={isFeesModalOpen} title={modalTitles.fees} minWidth={485}><Fees /></Modal>
	</div>
	<div>
		<a
			href="https://x.com/{X_HANDLE}"
			target="_blank"
			rel="noopener noreferrer"
			class="no-after-icn"
		>
			<img
				src="/images/logos/x_logo_white.svg"
				alt="X"
				width="125"
				height="128"
				title="@{X_HANDLE}"
				loading="lazy"
				class="social-logo"
			/>
		</a>
	</div>
	<div>
		<button onclick={() => isCoachesModalOpen.set(true)}>{modalTitles.coaches}</button>
		<Modal open={isCoachesModalOpen} title={modalTitles.coaches}><Coaches /></Modal>
	</div>
</div>

<div>
	<a href="https://forms.gle/3QAXzbQSeh9i6118A" target="_blank" rel="noopener noreferrer"
		>{$_('coaching.form')}</a
	>
</div>

<style lang="scss">
	@use '$lib/stylesheets/home/coaching';
</style>
