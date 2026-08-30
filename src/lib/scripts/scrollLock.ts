interface SavedStyleProperty {
	style: CSSStyleDeclaration;
	property: string;
	value: string;
	priority: string;
}

interface PageScrollState {
	x: number;
	y: number;
	styles: SavedStyleProperty[];
	scrollBehavior: SavedStyleProperty;
}

let pageScrollState: PageScrollState | null = null;
let pageScrollLockCount = 0;

function saveStyleProperty(style: CSSStyleDeclaration, property: string): SavedStyleProperty {
	return {
		style,
		property,
		value: style.getPropertyValue(property),
		priority: style.getPropertyPriority(property)
	};
}

function restoreStyleProperty({ style, property, value, priority }: SavedStyleProperty) {
	if (value === '') style.removeProperty(property);
	else style.setProperty(property, value, priority);
}

/**
 * Locks page scrolling until the returned function is called.
 *
 * Multiple callers can hold a lock at the same time. The page styles and scroll
 * position are restored after every caller has released its lock.
 *
 * **＊ Must be called in the browser environment.**
 */
export function lockPageScroll() {
	let released = false;

	if (pageScrollLockCount === 0) {
		const root = document.documentElement;
		const body = document.body;
		const rootStyle = root.style;
		const bodyStyle = body.style;
		const unlockedRootWidth = root.clientWidth;
		const hasScrollbarGutter = 0 < window.innerWidth - unlockedRootWidth;
		const bodyPaddingRight = getComputedStyle(body).paddingRight;
		const scrollBehavior = saveStyleProperty(rootStyle, 'scroll-behavior');
		const styles = [
			saveStyleProperty(rootStyle, 'overflow'),
			saveStyleProperty(rootStyle, 'scrollbar-gutter'),
			saveStyleProperty(bodyStyle, 'box-sizing'),
			saveStyleProperty(bodyStyle, 'left'),
			saveStyleProperty(bodyStyle, 'overflow'),
			saveStyleProperty(bodyStyle, 'padding-right'),
			saveStyleProperty(bodyStyle, 'position'),
			saveStyleProperty(bodyStyle, 'top'),
			saveStyleProperty(bodyStyle, 'width')
		];

		pageScrollState = {
			x: window.scrollX,
			y: window.scrollY,
			styles,
			scrollBehavior
		};

		// `position: fixed` also locks scrolling in iOS/iPadOS PWAs, where
		// `overflow: hidden` on its own can still allow the page to move.
		rootStyle.setProperty('scroll-behavior', 'auto', 'important');
		rootStyle.setProperty('scrollbar-gutter', 'stable', 'important');
		rootStyle.setProperty('overflow', hasScrollbarGutter ? 'hidden scroll' : 'hidden', 'important');
		bodyStyle.setProperty('box-sizing', 'border-box', 'important');
		bodyStyle.setProperty('left', `${-pageScrollState.x}px`, 'important');
		bodyStyle.setProperty('overflow', 'hidden', 'important');
		bodyStyle.setProperty('position', 'fixed', 'important');
		bodyStyle.setProperty('top', `${-pageScrollState.y}px`, 'important');
		bodyStyle.setProperty('width', '100%', 'important');

		const scrollbarGap = root.clientWidth - unlockedRootWidth;
		if (0 < scrollbarGap) {
			bodyStyle.setProperty(
				'padding-right',
				`calc(${bodyPaddingRight} + ${scrollbarGap}px)`,
				'important'
			);
		}
	}

	pageScrollLockCount += 1;

	return () => {
		if (released) return;
		released = true;
		pageScrollLockCount -= 1;

		if (pageScrollLockCount !== 0 || pageScrollState === null) return;

		const { x, y, styles, scrollBehavior } = pageScrollState;
		pageScrollState = null;

		for (const style of styles) restoreStyleProperty(style);

		// Keep restoration instantaneous even though the site normally uses
		// `scroll-behavior: smooth` on the root element.
		document.documentElement.style.setProperty('scroll-behavior', 'auto', 'important');
		window.scrollTo(x, y);
		restoreStyleProperty(scrollBehavior);
	};
}
