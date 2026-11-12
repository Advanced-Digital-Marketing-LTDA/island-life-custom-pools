const modules = import.meta.glob('../../content/blog/*.md', { eager: true }) as Record<string, any>;

export interface Post {
  slug: string;
  title: string;
  date: Date;
  excerpt: string;
  image: string;
  imageAlt: string;
  minutes: number;
  Content: any;
}

export const posts: Post[] = Object.entries(modules)
  .map(([path, m]) => {
    const fm = m.frontmatter;
    const words = String(m.rawContent?.() ?? '').split(/\s+/).length;
    return {
      slug: path.split('/').pop()!.replace(/\.md$/, ''),
      title: fm.title,
      date: new Date(fm.date),
      excerpt: fm.excerpt,
      image: fm.image,
      imageAlt: fm.imageAlt ?? '',
      minutes: Math.max(1, Math.round(words / 220)),
      Content: m.Content,
    };
  })
  .sort((a, b) => b.date.getTime() - a.date.getTime());

export const fmtDate = (d: Date) => d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
