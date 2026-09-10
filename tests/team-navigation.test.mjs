// Run with the repository's Node version: node --test tests/team-navigation.test.mjs
import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
	MEMBER_LISTS,
	TEAM_SECTIONS,
	LEGACY_DIVISION_IDS
} from '../src/lib/scripts/data/MEMBERS.ts';
import {
	getTeamSections,
	resolveDivision,
	divisionHref
} from '../src/lib/scripts/teamNavigation.ts';

const sections = getTeamSections(TEAM_SECTIONS, MEMBER_LISTS);
const resolve = (value) => resolveDivision(value, sections, LEGACY_DIVISION_IDS);

test('published data has unique IDs and valid section and legacy references', () => {
	assert.equal(new Set(TEAM_SECTIONS.map((s) => s.id)).size, TEAM_SECTIONS.length);
	assert.equal(new Set(MEMBER_LISTS.map((d) => d.id)).size, MEMBER_LISTS.length);
	for (const division of MEMBER_LISTS) {
		assert.match(division.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
		assert.ok(
			TEAM_SECTIONS.some((s) => s.id === division.sectionId),
			division.id
		);
		assert.equal(resolve(division.id), division);
	}
	for (const id of Object.values(LEGACY_DIVISION_IDS)) {
		assert.ok(
			MEMBER_LISTS.some((d) => d.id === id),
			id
		);
	}
	assert.equal(sections.flatMap((s) => s.divisions).length, MEMBER_LISTS.length);
});

test('historical URLs, including the curly apostrophe and split R6 roster, resolve explicitly', () => {
	const cases = [
		['Overwatch', 'overwatch'],
		['Overwatch Women’s Div', 'overwatch-womens'],
		['Overwatch Academy A', 'overwatch-academy-a'],
		['Overwatch Academy B', 'overwatch-academy-b'],
		['Rainbow Six Siege', 'r6-astra'],
		['Content Creator', 'content-creator']
	];
	for (const [name, id] of cases) {
		for (const encoded of [
			encodeURIComponent(name),
			new URLSearchParams({ div: name }).toString().slice(4)
		]) {
			assert.equal(resolve(new URLSearchParams(`div=${encoded}`).get('div')), resolve(id));
		}
	}
});

test('unknown, empty, removed and inherited-property names safely select the first division', () => {
	for (const value of [null, '', 'removed-id', '__proto__', 'constructor', 'toString']) {
		assert.equal(resolve(value), sections[0].divisions[0]);
	}
});

const fixtureSection = (id) => ({ id, label: `Section ${id}` });
const fixtureDivision = (id, sectionId) => ({
	id,
	sectionId,
	divisionName: 'Same display name',
	members: []
});

test('section order and within-section member-list order are independent of display names', () => {
	const result = getTeamSections(
		[fixtureSection('b'), fixtureSection('a'), fixtureSection('empty')],
		[
			fixtureDivision('a-first', 'a'),
			fixtureDivision('b-only', 'b'),
			fixtureDivision('a-last', 'a')
		]
	);
	assert.deepEqual(
		result.map((s) => [s.id, s.divisions.map((d) => d.id)]),
		[
			['b', ['b-only']],
			['a', ['a-first', 'a-last']]
		]
	);
	assert.equal(resolveDivision(null, result, {})?.id, 'b-only');
	assert.equal(resolveDivision('a-last', result, {})?.sectionId, 'a');
});

test('adding standalone/grouped divisions and deleting first sections requires only data edits', () => {
	const defs = [fixtureSection('a'), fixtureSection('b')];
	const data = [fixtureDivision('one', 'a'), fixtureDivision('two', 'b')];
	assert.equal(getTeamSections(defs, data)[0].divisions.length, 1);
	data.push(fixtureDivision('three', 'a'));
	assert.equal(getTeamSections(defs, data)[0].divisions.length, 2);
	data.splice(2, 1);
	assert.equal(getTeamSections(defs, data)[0].divisions.length, 1);
	defs.push(fixtureSection('new'));
	data.push(fixtureDivision('new-one', 'new'), fixtureDivision('new-two', 'new'));
	assert.equal(getTeamSections(defs, data)[2].divisions.length, 2);
	const remaining = getTeamSections(
		defs.slice(1),
		data.filter((d) => d.sectionId !== 'a')
	);
	assert.equal(resolveDivision('one', remaining, {})?.id, 'two');
	assert.equal(resolveDivision(null, getTeamSections([], []), {}), undefined);
	assert.equal(
		resolveDivision('old', getTeamSections([fixtureSection('empty')], []), {}),
		undefined
	);
});

test('stable IDs survive renaming and take precedence over historical aliases', () => {
	const divisions = [fixtureDivision('first', 'a'), fixtureDivision('second', 'a')];
	divisions[1].divisionName = 'Renamed entirely';
	divisions[1].navLabel = 'Short name';
	const result = getTeamSections([fixtureSection('a')], divisions);
	assert.equal(resolveDivision('second', result, { second: 'first' }), divisions[1]);
	assert.equal(
		resolveDivision('Historical name', result, { 'Historical name': 'second' }),
		divisions[1]
	);
});

test('URL generation preserves unrelated repeated parameters and safely encodes values', () => {
	const original = new URL(
		'https://revati.jp/?utm_source=a%26b&tag=one&tag=two&div=old&div=older#news'
	);
	const before = original.href;
	const href = divisionHref(original, 'future & + / 部門');
	const result = new URL(href, original);
	assert.equal(original.href, before);
	assert.equal(result.pathname, original.pathname);
	assert.equal(result.hash, '#teams');
	assert.equal(result.searchParams.get('div'), 'future & + / 部門');
	assert.equal(result.searchParams.getAll('div').length, 1);
	assert.equal(result.searchParams.get('utm_source'), 'a&b');
	assert.deepEqual(result.searchParams.getAll('tag'), ['one', 'two']);
});
