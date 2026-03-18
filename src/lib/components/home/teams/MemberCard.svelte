<script lang="ts">
	import type { Member } from '$lib/scripts/types';
	import MaterialIcon from '$lib/components/MaterialIcon.svelte';

	import type { IconKind } from '$lib/components/MaterialIcon.svelte';
	import { createEventDispatcher } from 'svelte';
	import { calcAge, zeroPad } from '$lib/scripts/util';
	import { _, date } from 'svelte-i18n';
	import { isGearsAndSettingsModalOpen } from '$lib/scripts/stores';

	interface Props {
		member: Member;
	}

	let { member }: Props = $props();
	let age = $derived(member.age);
	let birthday = $derived(member.birthday);
	let twitter = $derived(member.twitter);
	let youtube = $derived(member.youtube);
	let twitch = $derived(member.twitch);
	let homepage = $derived(member.homepage);
	let gearsAndSettings = $derived(member.gearsAndSettings);

	const dispatch = createEventDispatcher();

	const LOCK_ICON: {
		kind: IconKind;
		height: string;
		style: string;
	} = {
		kind: 'lock-fill_inline',
		height: '15px',
		style: 'position: relative; top: 2px; pointer-events: none;'
	};
</script>

<li class="member">
	<img src="/images/members/{member.icon ?? 'noimage.webp'}" alt="" loading="lazy" class="icon" />
	<div class="info">
		<div class="role-and-country">
			<span class="role" class:inactive={member.role === null}>{member.role ?? '　'}</span>
			{#if member.country !== null}
				<img src="/images/flags/{member.country}.svg" alt={$_('w.nationalFlag')} class="flag" />
			{/if}
		</div>
		<h3>{member.memberName}</h3>
		<div class="details">
			Age:
			{#if age === null && birthday !== null && birthday.year !== null}
				{calcAge(new Date(birthday.year, birthday.month - 1, birthday.day))}
			{:else if age !== null}
				{age}
			{:else}
				<MaterialIcon {...LOCK_ICON} />
			{/if}
			<br />
			Birthday:
			{#if birthday !== null}
				{#if birthday.year !== null}
					{$date(new Date(birthday.year, birthday.month - 1, birthday.day), {
						year: 'numeric',
						month: '2-digit',
						day: '2-digit'
					})}
				{:else}
					{zeroPad(birthday.month, 2)}/{zeroPad(birthday.day, 2)}
				{/if}
			{:else}
				<MaterialIcon {...LOCK_ICON} />
			{/if}
		</div>
	</div>
	<ul class="socials">
		{#if twitter !== null}
			<li>
				<a
					href="https://x.com/{twitter}"
					class="no-after-icn member-twitter"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src="/images/logos/x_logo_white.svg"
						alt="X"
						width="125"
						height="128"
						title="@{twitter}"
						loading="lazy"
					/>
				</a>
			</li>
		{/if}
		{#if youtube !== null}
			{@const path = youtube[0] === '@' ? youtube : `channel/${youtube}`}
			<li>
				<a
					href="https://youtube.com/{path}"
					class="no-after-icn member-youtube"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src="/images/logos/yt_icon_rgb.webp"
						alt="YouTube"
						width="128"
						height="90"
						title="/{path}"
						loading="lazy"
						class="wide-icn"
					/>
				</a>
			</li>
		{/if}
		{#if twitch !== null}
			<li>
				<a
					href="https://twitch.tv/{twitch}"
					class="no-after-icn member-twitch"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src="/images/logos/twitch.svg"
						alt="Twitch"
						width="118"
						height="138"
						title="@{twitch}"
						loading="lazy"
					/>
				</a>
			</li>
		{/if}
		{#if homepage !== null}
			<li>
				<a
					href={homepage}
					class="no-after-icn member-homepage"
					target="_blank"
					rel="noopener noreferrer"
					title={homepage}
				>
					<MaterialIcon
						kind="link-45deg"
						width="34px"
						style="
							filter:
								brightness(0)
								saturate(100%)
								invert(99%)
								sepia(10%)
								saturate(2437%)
								hue-rotate(284deg)
								brightness(129%)
								contrast(87%);
							margin-top: 11px;
							user-select: none;
						"
					/>
				</a>
			</li>
		{/if}
		{#if gearsAndSettings !== undefined}
			<li class="gears-and-settings">
				<button
					onclick={() => {
						dispatch('openGearsAndSettingsModal', {
							playerName: member.memberName,
							gearsAndSettings
						});
						isGearsAndSettingsModalOpen.set(true);
					}}
					class="gears-and-settings-btn"
					title={$_('teams.gearsAndGameSettingsOfThisPlayer')}
				>
					<MaterialIcon kind="stadia-controller" width="28px" />
				</button>
			</li>
		{/if}
	</ul>
</li>

<style lang="scss">
	@use '$lib/stylesheets/home/member_card';
</style>
