// The old WordPress blog posts lived at the root of the site. Posts now live under /blog/, so the old addresses go there.
// Shared by astro.config.mjs and the page loader, which refuses a page at any of these paths.
const oldPosts = [
  'maintaining-pool-water-chemistry',
  'the-step-by-step-process-of-building-an-in-ground-swimming-pool',
  'dive-in-prepared-5-essential-considerations-before-installing-a-pool',
  'making-a-splash-in-real-estate-how-a-pool-can-increase-your-property-value',
];
export const redirects = {
  ...Object.fromEntries(oldPosts.map((slug) => [`/${slug}`, `/blog/${slug}/`])),
  '/category/blog': '/blog/',
};
