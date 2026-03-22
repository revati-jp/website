import type { RequestHandler } from './$types';
import { fetchArticles } from '$lib/scripts/fetchers';
import { SITE_URL, PAGE_FULL_TITLE_PART, COPYRIGHT, SOCIALS } from '$lib/scripts/variables';
import { v5 as uuidV5 } from 'uuid';

export const prerender = true;

export const GET: RequestHandler = async ({ setHeaders }) => {
	setHeaders({
		'Cache-Control': 'max-age=0, s-maxage=86400',
		'Content-Type': 'application/atom+xml; charset=utf-8'
	});
	return new Response(await body());
};

async function body() {
	const FEED_UUID = 'a990d2e7-f31f-4cfd-a7f6-381ba39ba3f8';

	let prevDate: {
		date: Date;
		index: number;
	};
	const articles = (await fetchArticles())
		.reverse()
		.map((article) => {
			const slug = article.slug!;

			let date = slug.date;
			const isFirstArticleOfTheDay =
				// current article IS FIRST OF ALL
				prevDate === undefined ||
				// OR previous article date AND current article date ARE NOT EQUAL
				// ＊ Hour, Minute, Second, Millisecond are guaranteed to be 0
				!(
					prevDate.date.getFullYear() === date.getFullYear() &&
					prevDate.date.getMonth() === date.getMonth() &&
					prevDate.date.getDate() === date.getDate()
				);
			if (isFirstArticleOfTheDay) {
				prevDate = { date, index: 0 };
			} else {
				prevDate.index++;
				prevDate.date.setSeconds(prevDate.index);
				date = prevDate.date;
			}
			const slugStr = slug.string;
			return `<entry>
        <id>urn:uuid:${uuidV5(slugStr, FEED_UUID)}</id>
        <title>${article.title}</title>
        <updated>${date.toISOString()}</updated>
        <link rel="alternate" href="${SITE_URL}/news/articles/${slugStr}" />
    </entry>`;
		})
		.join('\n    ');

	return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="ja">
    <id>urn:uuid:${FEED_UUID}</id>
    <title>${PAGE_FULL_TITLE_PART}News</title>
    <updated>${new Date().toISOString()}</updated>
    <author>
        <name>REVATI</name>
        <email>${SOCIALS.email}</email>
        <uri>${SITE_URL}</uri>
    </author>
    <link rel="self" href="${SITE_URL}/feed" />
    <link rel="alternate" href="${SITE_URL}" />
    <icon>${SITE_URL}/favicon.ico</icon>
    <rights>${COPYRIGHT}</rights>
    ${articles}
</feed>
`;
}
