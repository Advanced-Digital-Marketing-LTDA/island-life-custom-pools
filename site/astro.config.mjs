import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

try {
  process.loadEnvFile();
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

export default defineConfig({
  site: process.env.SITE_URL || 'http://localhost:4321',
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  build: { inlineStylesheets: 'always' },
  devToolbar: { enabled: false },
});
