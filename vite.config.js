import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import license from 'rollup-plugin-license';

const ALLOWED_LICENSES = ['MIT', 'BSD-3-Clause', '0BSD'];

export default defineConfig({
	plugins: [
		sveltekit(),
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
	server: { fs: { allow: ['articles'] } }
});
