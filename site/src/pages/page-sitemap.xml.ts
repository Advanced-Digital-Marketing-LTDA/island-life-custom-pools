import type { APIRoute } from 'astro';
import { pageSitemap } from '../lib/sitemap';

export const GET: APIRoute = ({ site }) => pageSitemap(site);
