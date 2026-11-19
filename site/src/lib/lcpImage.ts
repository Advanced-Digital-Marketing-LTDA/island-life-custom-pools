import { getImage } from 'astro:assets';
import { assetBase, responsive } from './assets';

// The picture that paints the page's first screen is the Largest Contentful Paint. From the CDN it needs its own connection first,
// so at build time it is downloaded, resized and written next to the page (/_astro/...), which the browser already has open.
export async function lcpImage(src: string, sizes = '100vw') {
  if (!src.startsWith(assetBase + '/images/')) return { src };
  try {
    const img = await getImage({ src, inferSize: true, widths: [480, 720, 960, 1280], format: 'webp', quality: 70 });
    return { src: img.src, srcset: img.srcSet.attribute, sizes };
  } catch (error) {
    // A CDN hiccup must not fail the deploy: fall back to the CDN address.
    console.warn(`lcpImage: could not self-host ${src}:`, error);
    return responsive(src, sizes);
  }
}
