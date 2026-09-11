import type { Division, TeamSection } from '$lib/scripts/types';

/** Both levels follow their source arrays; empty sections have no navigation entry. */
export function getTeamSections(sections: readonly TeamSection[], divisions: readonly Division[]) {
	return sections
		.map((section) => ({
			...section,
			divisions: divisions.filter((division) => division.sectionId === section.id)
		}))
		.filter((section) => 0 < section.divisions.length);
}

export function resolveDivision(
	value: string | null,
	sections: ReturnType<typeof getTeamSections>,
	legacyIds: Readonly<Record<string, string>>
): Division | undefined {
	const divisions = sections.flatMap((section) => section.divisions);
	const direct = divisions.find((division) => division.id === value);
	if (direct !== undefined) return direct;
	const legacyId = value !== null && Object.hasOwn(legacyIds, value) ? legacyIds[value] : undefined;
	return divisions.find((division) => division.id === legacyId) ?? divisions[0];
}

/** Preserve unrelated query parameters and do not mutate SvelteKit's page URL. */
export function divisionHref(currentUrl: URL, divisionId: string): string {
	const url = new URL(currentUrl);
	url.searchParams.set('div', divisionId);
	url.hash = 'teams';
	return url.pathname + url.search + url.hash;
}
