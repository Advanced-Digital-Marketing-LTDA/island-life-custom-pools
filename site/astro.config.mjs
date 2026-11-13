import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

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
  // Old page URLs that now live on another page or on the home page.
  redirects: {
    '/custom-pools': '/pools',
    '/about-us': '/#about',
    '/custom-patios': '/patios',
    '/contact': '/#quote',
  },
  adapter: node({ mode: 'standalone' }),
  build: { inlineStylesheets: 'always' },
  devToolbar: { enabled: false },
});
