import rawSettings from '../../content/settings.json';
import rawBlog from '../../content/blog.json';
import { homePrefix } from './nav';
import { blockNames, defaultAnchors, type Block } from './blocks';
import { redirects } from './redirects.mjs';
import { withAssetUrls } from './assets';

// Tina leaves out a field or list an editor empties, so fill in what the templates loop over: an empty list must never
// stop the build.
export const settings = withAssetUrls({
  ...rawSettings,
  nav: rawSettings.nav ?? [],
  social: rawSettings.social ?? [],
  ogImage: rawSettings.ogImage || '/images/og-share.jpg',
  footer: { ...rawSettings.footer, credit: rawSettings.footer?.credit ?? '', creditHref: rawSettings.footer?.creditHref ?? '', nav: rawSettings.footer?.nav ?? [], areas: rawSettings.footer?.areas ?? [], hours: rawSettings.footer?.hours ?? [] },
  quote: { ...rawSettings.quote, interests: rawSettings.quote?.interests ?? [], errorText: rawSettings.quote?.errorText ?? '' },
});
export const blog = { ...rawBlog, author: rawBlog.author ?? ({} as Partial<typeof rawBlog.author>) };

// Every page is a document in content/pages: its file name is its URL ("home" is the front page) and its
// blocks are the sections, in order. Anything an editor could get wrong fails the build with a clear message
// instead of publishing a broken page.
export interface Page { slug: string; seoTitle: string; seoDescription: string; blocks: Block[] }
const reserved = new Set(['404', 'api', 'healthz', 'build.json', ...Object.keys(redirects).map((path) => path.slice(1))]);
const pageFiles = import.meta.glob<{ seoTitle?: string; seoDescription?: string; blocks?: Block[] }>('../../content/pages/*.json', { eager: true, import: 'default' });
const loaded: Page[] = Object.entries(pageFiles).map(([file, doc]) => {
  const name = file.split('/').pop()!.replace(/\.json$/, '');
  const where = `content/pages/${name}.json`;
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) throw new Error(`${where}: page file names use lowercase letters, numbers and single dashes.`);
  if (reserved.has(name)) throw new Error(`${where}: "${name}" is reserved for the site (an API route, an old URL redirect or the 404 page).`);
  const blocks = doc.blocks ?? [];
  const anchors = new Set<string>(['top']);
  blocks.forEach((block, index) => {
    if (!blockNames.includes(block._template)) throw new Error(`${where}: section ${index + 1} has an unknown type "${block._template}".`);
    const anchor = block.hidden ? '' : block.anchor || defaultAnchors[block._template];
    if (!anchor) return;
    if (anchors.has(anchor)) throw new Error(`${where}: the link name "${anchor}" is used by more than one section (section ${index + 1}). Link names must be unique on a page.`);
    anchors.add(anchor);
  });
  return { slug: name === 'home' ? '' : name, seoTitle: doc.seoTitle ?? '', seoDescription: doc.seoDescription ?? '', blocks: withAssetUrls(blocks) };
});
// Tina lets an editor delete any page, so make sure the front page cannot quietly disappear from a published build.
if (!loaded.some((page) => page.slug === '')) {
  throw new Error('content/pages/home.json is missing: the page named "home" is the front page, and the site cannot be built without it. Restore it (in Tina, or from Git history) and build again.');
}
export const pages: Page[] = loaded;

export interface BlogSection { id: string; title: string; paragraphs: { text: string }[]; bullets?: string[] | null }
export interface Post {
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  seoTitle: string;
  seoDescription: string;
  sections: BlogSection[];
}

// One JSON file per post in content/posts; the file name is the URL slug. Newest first.
const files = import.meta.glob<Omit<Post, 'slug'>>('../../content/posts/*.json', { eager: true, import: 'default' });
export const posts: Post[] = withAssetUrls(Object.entries(files)
  .map(([path, post]) => ({
    ...post,
    date: post.date ?? '',
    slug: path.split('/').pop()!.replace(/\.json$/, ''),
    sections: (post.sections ?? []).map((section) => ({ ...section, paragraphs: section.paragraphs ?? [] })),
  }))
  .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug)));

// "#section" links point at the home page, so other pages need the "/" in front; "/page" links stay as written.
export const linkTo = (url: URL, target: string) => (target.startsWith('#') ? `${homePrefix(url)}${target}` : target);

export const interests: string[] = settings.quote.interests;

export const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
