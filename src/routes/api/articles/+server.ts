import type { RequestHandler } from './$types';
import { fetchArticles } from '#lib/scripts/fetchers.ts';

export const GET: RequestHandler = async () => {
	return Response.json(await fetchArticles());
};
