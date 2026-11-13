// Images and videos live on the CDN (Bunny, folder "public"), not in Git. Content stores a path such as
// "/images/hero-video-poster.webp"; at build time every "/images/..." and "/videos/..." path becomes its CDN address.
// To add a photo or video, upload it to the CDN's public/images or public/videos folder and use that path in Tina.
export const assetBase = 'https://ilcpmedia.b-cdn.net/public';

const onCdn = /^\/(images|videos)\/\S+$/;

export function withAssetUrls<T>(value: T): T {
  if (typeof value === 'string') return (onCdn.test(value) ? assetBase + value : value) as T;
  if (Array.isArray(value)) return value.map(withAssetUrls) as T;
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, withAssetUrls(item)])) as T;
  return value;
}
