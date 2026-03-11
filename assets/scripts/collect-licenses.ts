import { writeFile } from 'node:fs/promises';

import { getDependencies, getLicenseText } from '@quantco/pnpm-licenses';

const ALLOWED_LICENSES = [
	'0BSD',
	'Apache-2.0',
	'Apache-2.0 AND LGPL-3.0-or-later',
	'Apache-2.0 AND MIT',
	'BSD',
	'BSD-2-Clause',
	'BSD-3-Clause',
	'BSD-4-Clause',
	'BlueOak-1.0.0',
	'CC0-1.0',
	'ISC',
	'LGPL-3.0-or-later',
	'MIT',
	'MIT OR Apache-2.0',
	'MIT OR CC0-1.0',
	'OFL-1.1',
	'Python-2.0'
];

interface GeneratedLicenseInfo {
	licenses: string | null;
	licenseText: string | null;
}

const dependencies = await getDependencies(
	{ prod: true },
	{
		stdin: false,
		stdout: false,
		inputFile: undefined,
		outputFile: ''
	}
);

const records = await Promise.all(
	dependencies.map(async (dependency) => {
		if (!isAllowedLicense(dependency.license)) {
			throw new Error(
				`Disallowed license found: "${dependency.license}" (${dependency.name}@${dependency.version})`
			);
		}

		let licenseText: string | null = null;

		try {
			const license = await getLicenseText(dependency);
			licenseText = license.licenseText;
		} catch (error) {
			if (!isMissingLicenseError(error)) {
				throw error;
			}
		}

		return {
			id: `${dependency.name}@${dependency.version}`,
			license: {
				licenses: dependency.license,
				licenseText
			} satisfies GeneratedLicenseInfo
		};
	})
);

records.sort((left, right) => {
	const nameOrder = left.id.localeCompare(right.id, 'en');
	return nameOrder;
});

const output = Object.fromEntries(records.map(({ id, license }) => [id, license]));

await writeFile('src/lib/licenses.json', JSON.stringify(output, null, 2) + '\n');

console.log('Successfully generated src/lib/licenses.json');

function isAllowedLicense(license: string): boolean {
	return ALLOWED_LICENSES.some((allowed) => license === allowed || license === `(${allowed})`);
}

function isMissingLicenseError(error: unknown): boolean {
	return (
		typeof error === 'object' &&
		error !== null &&
		'message' in error &&
		typeof error.message === 'string' &&
		error.message.startsWith('No license text found for dependency ')
	);
}
