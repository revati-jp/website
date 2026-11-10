import adapter from '@sveltejs/adapter-cloudflare';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import license from 'rollup-plugin-license';
import preprocess from 'svelte-preprocess';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import mdsvexConf from './mdsvex.config.js';

const ALLOWED_LICENSES = ['MIT', 'BSD-3-Clause', '0BSD'];

const CLOUDFLARE_ROUTES_EXCLUDE = [
	// ▼ Build Artifacts ▼
	'<build>',

	// ▼ Static Assets ▼
	// "<files>",
	'/favicon.ico',
	'/images/*',
	'/scripts/*',

	// ▼ Pre-rendered Pages ▼
	// "<prerendered>",
	'/privacy',
	'/licenses',
	'/api/articles/thumbnail-imgs',
	'/sitemap.xml',
	'/robots.txt',
	'/feed'
];

export default defineConfig({
	plugins: [
		sveltekit({
			adapter: adapter({ routes: { exclude: CLOUDFLARE_ROUTES_EXCLUDE } }),
			preprocess: [mdsvex(mdsvexConf), vitePreprocess(), preprocess({ sourceMap: true })],
			extensions: ['.svelte', ...mdsvexConf.extensions]
		}),
		license({
			thirdParty: {
				allow: {
					test: ({ license }) => {
						if (license === undefined || license === null) return false;
						return ALLOWED_LICENSES.some(
							(allowed) => license === allowed || license === `(${allowed})`
						);
					},
					failOnUnlicensed: true,
					failOnViolation: true
				}
			}
		})
	],
	// Sass cannot resolve `#lib` (`#` is parsed as a URL fragment),
	// so stylesheets are loaded relative to `src/lib` (e.g. `@use 'stylesheets/variables/color' as *;`).
	css: {
		preprocessorOptions: {
			scss: { loadPaths: [fileURLToPath(new URL('./src/lib', import.meta.url))] }
		}
	},
	server: { fs: { allow: ['articles'] } }
});
