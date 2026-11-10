import { fetchThumbnailImgFmt } from '#lib/scripts/fetchers.ts';

export const prerender = true;

export const GET = async () => Response.json(await fetchThumbnailImgFmt());
