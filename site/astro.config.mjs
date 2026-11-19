import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import { redirects } from './src/lib/redirects.mjs';

try {
  process.loadEnvFile();
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

const site = new URL(process.env.SITE_URL || 'http://localhost:4321');

export default defineConfig({
  site: site.href,
  // Behind Coolify's proxy Astro only sees the internal host. Trusting X-Forwarded-Host for our own
  // domain keeps the form-post origin check from rejecting real visitors.
  security: {
    allowedDomains: [{ protocol: site.protocol.slice(0, -1), hostname: site.hostname, port: site.port || undefined }],
  },
  output: 'static',
  // The old blog addresses now live under /blog/.
  redirects,
  adapter: node({ mode: 'standalone' }),
  build: { inlineStylesheets: 'always' },
  // Hero pictures are downloaded from the CDN and written next to the page at build time (see src/lib/lcpImage.ts).
  image: { domains: ['ilcpmedia.b-cdn.net'] },
  devToolbar: { enabled: false },
});
