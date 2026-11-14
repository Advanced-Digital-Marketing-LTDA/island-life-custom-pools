import type { APIRoute } from 'astro';
import { postSitemap } from '../lib/sitemap';

export const GET: APIRoute = ({ site }) => postSitemap(site);
