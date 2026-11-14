import { pages, posts } from './content';

const xml = (body: string) => new Response(`<?xml version="1.0" encoding="UTF-8"?>\n${body}\n`, { headers: { 'Content-Type': 'application/xml' } });
const origin = (site: URL | undefined) => site!.href.replace(/\/$/, '');

// The same addresses the old site's sitemap used, so a search engine that knows them keeps working:
// /sitemap_index.xml (also /sitemap.xml) lists /page-sitemap.xml and /post-sitemap.xml.
export const sitemapIndex = (site: URL | undefined) => xml(`<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${['page', 'post'].map((kind) => `  <sitemap><loc>${origin(site)}/${kind}-sitemap.xml</loc></sitemap>`).join('\n')}\n</sitemapindex>`);

const urlset = (urls: { loc: string; lastmod?: string }[]) => xml(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(({ loc, lastmod }) => `  <url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`).join('\n')}\n</urlset>`);

// Pages marked "noindex" (the thank-you page) stay out of the sitemap.
export const pageSitemap = (site: URL | undefined) => urlset(pages.filter((page) => !page.noindex).map((page) => ({ loc: page.slug ? `${origin(site)}/${page.slug}/` : `${origin(site)}/` })));
export const postSitemap = (site: URL | undefined) => urlset(posts.map((post) => ({ loc: `${origin(site)}/blog/${post.slug}/`, lastmod: post.date })));
