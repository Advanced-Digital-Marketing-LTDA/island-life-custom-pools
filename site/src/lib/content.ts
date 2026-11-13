// All page copy lives in content/*.json (edited with TinaCMS) and is read here at build time.
import settings from '../../content/settings.json';
import home from '../../content/home.json';
import pools from '../../content/pools.json';
import blog from '../../content/blog.json';
import gallery from '../../content/gallery.json';
import { homePrefix } from './nav';

export { settings, home, pools, blog, gallery };

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
export const posts: Post[] = Object.entries(files)
  .map(([path, post]) => ({ ...post, slug: path.split('/').pop()!.replace(/\.json$/, '') }))
  .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));

// "#section" links point at the home page, so other pages need the "/" in front; "/page" links stay as written.
export const linkTo = (url: URL, target: string) => (target.startsWith('#') ? `${homePrefix(url)}${target}` : target);

export const interests: string[] = settings.quote.interests;

export const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
