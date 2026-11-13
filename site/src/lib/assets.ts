// Images and videos that have been uploaded to the CDN (Bunny, folder "public"). Content keeps the local path
// ("/images/hero-video-poster.webp") so Tina and local development work unchanged; at build time any path listed here becomes
// its CDN address. A file an editor adds in Tina stays on the site itself until its name is added to this list
// (after uploading it to the CDN's public/images or public/videos folder).
export const assetBase = 'https://ilcpmedia.b-cdn.net/public';

const uploaded = new Set([
  ...[
    'island-life-hero-mobile.mp4', 'island-life-hero-mobile.webm', 'island-life-hero.mp4', 'island-life-hero.webm',
  ].map((name) => `/videos/${name}`),
  ...[
    'aerial-backyard-plan.webp', 'cedar-cabana-kitchen.webp', 'covered-patio-fireplace.webp', 'covered-patio-lakeside.webp',
    'fireplace-kitchen-stone.webp', 'freeform-pool-bubblers.webp', 'freeform-pool-cabana.webp', 'freeform-pool-grotto.webp',
    'gallery-aerial-freeform.webp', 'gallery-black-tile-fire-pit.webp', 'gallery-blue-pool-cabana.webp', 'gallery-cedar-bar.webp',
    'gallery-covered-patio-view.webp', 'gallery-estate-dusk.webp', 'gallery-geometric-golden.webp', 'gallery-green-light-terrace.webp',
    'gallery-grotto-spa.webp', 'gallery-house-pool-loungers.webp', 'gallery-lawn-cabana-pool.webp', 'gallery-patio-dining.webp',
    'gallery-purple-water-blade.webp', 'gallery-rock-slide-glow.webp', 'gallery-rock-waterfall.webp', 'gallery-scuppers.webp',
    'gallery-spa-fire-dusk.webp', 'gallery-sunset-reflections.webp', 'gallery-sunset-spa.webp', 'gallery-water-wall.webp', 'hero-video-poster.webp',
    'island-life-logo.png', 'island-life-logo.svg', 'loungers-umbrellas-dusk.webp', 'og-share.jpg', 'outdoor-kitchen-cabana.webp', 'patio-cover-spa.webp',
    'pavilion-at-night.webp', 'pavilion-dusk.webp', 'pool-cabana-sunset.webp', 'pool-spa-cabana-dusk.webp', 'travertine-pool-loungers.webp',
  ].map((name) => `/images/${name}`),
]);

// Every string in the content that is exactly an uploaded file's path is swapped for its CDN address.
export function withAssetUrls<T>(value: T): T {
  if (typeof value === 'string') return (uploaded.has(value) ? assetBase + value : value) as T;
  if (Array.isArray(value)) return value.map(withAssetUrls) as T;
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, withAssetUrls(item)])) as T;
  return value;
}
