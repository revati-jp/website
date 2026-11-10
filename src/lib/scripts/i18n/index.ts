import { browser } from '$app/env';
import { init, register } from 'svelte-i18n';

const DEFAULT_LOCALE = 'ja';

register('ja', () => import('./locales/ja.json'));
register('en', () => import('./locales/en.json'));
register('ko', () => import('./locales/ko.json'));

init({
	fallbackLocale: DEFAULT_LOCALE,
	initialLocale: browser ? window.navigator.language : DEFAULT_LOCALE
});
