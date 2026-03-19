import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';

export default [
	{
		ignores: [
			'.DS_Store',
			'node_modules',
			'build',
			'.svelte-kit',
			'package',
			'.env',
			'.env.*',
			'!.env.example',
			'/*.js',
			'/*.cjs',
			// Ignore files for PNPM, NPM and YARN
			'pnpm-lock.yaml',
			'package-lock.json',
			'yarn.lock'
		]
	},
	js.configs.recommended,
	...tseslint.configs['flat/recommended'],
	...svelte.configs['flat/recommended'],
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts,svelte}'],
		languageOptions: {
			ecmaVersion: 2020,
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.es2017,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.{ts,tsx,mts,cts}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: './tsconfig.json',
				tsconfigRootDir: import.meta.dirname
			}
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts'],
		languageOptions: {
			parserOptions: {
				extraFileExtensions: ['.svelte'],
				parser: tsParser,
				project: './tsconfig.json',
				tsconfigRootDir: import.meta.dirname
			}
		}
	},
	{
		rules: {
			eqeqeq: ['error', 'always']
		}
	},
	{
		files: ['**/*.{ts,tsx,mts,cts,svelte}'],
		rules: {
			'@typescript-eslint/strict-boolean-expressions': 'error'
		}
	},
	eslintConfigPrettier
];
