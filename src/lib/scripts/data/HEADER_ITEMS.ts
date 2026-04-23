// If updated the `HEADER_ITEMS` JS constant, also adjust and update following variables:
//
// - `$bp-hamburger-btn` Sass variable in `/src/lib/stylesheets/variables/_mixin.scss`
// A threshold value for the hamburger button not to appear in the header.
//
// - `BREAKPOINT_HB` JS constant in `/src/lib/scripts/variables.ts`
// A threshold value for the hamburger button to appear in the header.
//
// - `$bp-low-height` Sass variable in `/src/lib/stylesheets/variables/_mixin.scss`
// A threshold value for the drawer menu to switch to a low height style.
export const HEADER_ITEMS = [
	'about',
	'news',
	'teams',
	'event',
	'creative',
	// 'goods',
	'sponsors',
	'contact'
];
export const NON_SECTION_ITEMS = ['contact'];
