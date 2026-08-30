import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { updateVh001 } from '$lib/scripts/util';
import { lockPageScroll } from '$lib/scripts/scrollLock';

export const isDrawerMenuOpened = writable(false);
let unlockDrawerScroll: (() => void) | undefined;
isDrawerMenuOpened.subscribe((isOpened) => {
	if (browser) {
		if (isOpened) unlockDrawerScroll ??= lockPageScroll();
		else {
			unlockDrawerScroll?.();
			unlockDrawerScroll = undefined;
		}

		// If don't update the CSS variable `--vh001` here,
		// an incorrect value will be passed on some environments as `--vh001`.
		updateVh001();
	}
});

export const isHamburgerButtonEnabled = writable(false);

export const isContactModalOpen = writable(false);
export const isFeesModalOpen = writable(false);
export const isCoachesModalOpen = writable(false);
export const isGearsAndSettingsModalOpen = writable(false);
