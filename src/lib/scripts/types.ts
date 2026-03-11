import { ArticleId } from '$lib/scripts/ArticleId';

/** The `slug` field will be provided if the instance was provided by the API. */
export interface ArticleMetadata {
	redirect?: string;
	published: boolean;
	indexed: boolean;
	title: string;
	slug?: ArticleId;
}

export interface ArticleThumbnailImgFmts {
	[slug: string]: string;
}

export interface GearsAndSettings {
	avatar: string;
	dpi: number;
	sens: number | { role: string; value: number }[];
	mouse: string;
	mousepad: string;
	keyboard: string;
	crosshairSettings: {
		type: string | null;
		showsAccuracy: boolean | null;
		color: string;
		thickness: number | null;
		rotation: number | null;
		crosshairLength: number | null;
		centerGap: number | null;
		opacity: number | null;
		outline: {
			color: string;
			opacity: number;
			thickness: number;
			shift: number;
		};
		dot: {
			type: string;
			size: number;
			opacity: number;
		};
		scaleWithResolution: boolean;
	}[];
}

export interface Member {
	memberName: string;
	icon: string | null;
	role: string | null;
	country: 'jp' | 'us' | 'kr' | null;
	birthday: { year: number | null; month: number; day: number } | null;
	age: number | null;
	twitter: string | null;
	youtube: string | null;
	twitch: string | null;
	homepage: string | null;
	gearsAndSettings?: GearsAndSettings;
}

export interface LicenseInfo {
	licenses: string | null;
	licenseText: string | null;
	[key: string]: unknown;
}
