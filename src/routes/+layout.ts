import type { LayoutLoad } from './$types';
import { browser } from '$app/env';
import { locale, waitLocale } from 'svelte-i18n';
import '#lib/scripts/i18n/index.ts';

export const load: LayoutLoad = async () => {
	if (browser) locale.set(window.navigator.language);
	await waitLocale();
};
