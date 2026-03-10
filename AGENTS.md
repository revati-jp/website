# AGENTS.md Instructions

This project is the official website of REVATI.
REVATI (revati.jp) is a multi-gaming and esports organization based in Japan.

This website supports Japanese, English, and Korean languages.
Localization is managed via `ja.json`, `en.json`, and `ko.json` files located in the `src/lib/scripts/i18n/locales/` directory.

## Technical Stack

- Frontend: Svelte 4, SvelteKit 2, SCSS
- Language: TypeScript 5 (strict mode)

## Commands

- Clean install: `pnpm install --frozen-lockfile`
- Install deps: `pnpm install`
- Start dev server: `pnpm run dev`
	- `pnpm run licenses` to update licenses data
- Build: `pnpm run build`
- Check & format & lint: `pnpm run check && pnpm run format && pnpm run lint`

## Code Style

- Use TypeScript strict mode.
- Use SCSS instead of Vanilla CSS.

## Other Instructions

- When using the `z-index` property, ensure you update the Z-Index list in `docs/SPECIFICATION.md`.
- When adding new CSS variables (not Sass variables), ensure you update the CSS Variable list in `docs/SPECIFICATION.md`. 

## Other Docs

- `docs/SPECIFICATION.md`:
	- Z-Index list
	- CSS Variable list (not Sass variables)
	- Font list
	- API Endpoint list
