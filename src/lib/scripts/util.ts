import type { ArticleMetadata } from '$lib/scripts/types';
import { ArticleId } from '$lib/scripts/ArticleId';

/**
 * Adds a specified class to specified elements when they are scrolled into view.
 *
 * @param elements - The elements to be observed.
 * @param className - The class to be added.
 *
 * **＊ Must be called in the browser environment.**
 *
 * # Example:
 *
 * ```svelte
 * <script lang="ts">
 *     import { onMount } from 'svelte';
 *     import { browser } from '$app/environment';
 *     import { addClassOnVisible } from '$lib/scripts/util';
 *
 *     onMount(fadeIn);
 *     if (browser) window.addEventListener('scroll', fadeIn);
 *
 *     function fadeIn() {
 *         addClassOnVisible(
 *             document.getElementsByClassName('foo'),
 *             'fade-in-up'
 *         );
 *     }
 * </script>
 *
 * <div class="foo" class:fade-in-up={false} />
 * <a class="foo" class:fade-in-up={false} />
 * ```
 */
export function addClassOnVisible(
	elements:
		| HTMLElement[]
		| HTMLCollectionOf<Element>
		| NodeListOf<Element>
		| HTMLElement
		| Element
		| null
		| undefined,
	className: string
) {
	if (elements instanceof Array) {
		elements.forEach((e) => addClassOnVisible_(e, className));
	} else if (elements instanceof HTMLCollection || elements instanceof NodeList) {
		[...elements].forEach((e) => addClassOnVisible_(e, className));
	} else if (elements instanceof HTMLElement || elements instanceof Element) {
		addClassOnVisible_(elements, className);
	}
}

/** **＊ Must be called in the browser environment.** */
function addClassOnVisible_(element: Element | HTMLElement, className: string) {
	if (element.getBoundingClientRect().top < window.innerHeight) element.classList.add(className);
}

/** Calculates the age of a person from their birthday. */
export function calcAge(birthday: Date) {
	const today = new Date();
	const year = today.getFullYear();
	const month = today.getMonth() + 1;
	const date = today.getDate();
	let age = year - birthday.getFullYear();
	const birthMonth = birthday.getMonth() + 1;
	age -= month < birthMonth || (month === birthMonth && date < birthday.getDate()) ? 1 : 0;
	return age;
}

/** Pads a number with zeros. */
export function zeroPad(num: number, len: number) {
	return num.toString().padStart(len, '0');
}

/**
 * Updates the CSS variable `--vh001`.
 *
 * **＊ Must be called in the browser environment.**
 */
export function updateVh001() {
	document.documentElement.style.setProperty('--vh001', window.innerHeight * 0.01 + 'px');
}

/** Reconstructs the `ArticleId` instances of the `slug` field in the `ArticleMetadata` instance array. */
export function reconstructIdsOfArticleMetadata(articles: ArticleMetadata[]) {
	return articles.map((a) => {
		if (a.slug !== undefined) a.slug = new ArticleId(a.slug);
		return a;
	});
}
