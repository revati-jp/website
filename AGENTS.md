# AGENTS.md Instructions

This project is the official website of REVATI.
REVATI (revati.jp) is a multi-gaming and esports organization based in Japan.

This website supports Japanese, English, and Korean languages.
Localization is managed via `ja.json`, `en.json`, and `ko.json` files located in the `src/lib/scripts/i18n/locales/` directory.

## Technical Stack

- Frontend: Svelte 4, SvelteKit 2, SCSS
- Language: TypeScript 5 (strict mode)

## Commands

- Clean install: `npm ci`
- Install deps: `npm install`
- Start dev server: `npm run dev`
	- `npm run licenses` to update licenses data
- Build: `npm run build`
- Check & format & lint: `npm run check && npm run fmt && npm run lnt`

## Code Style

- Use TypeScript strict mode.
- Use SCSS instead of Vanilla CSS.
