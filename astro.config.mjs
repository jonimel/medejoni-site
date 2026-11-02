// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Change `site` to the real domain once it is bought.
export default defineConfig({
  site: 'https://medejoni.com',
  integrations: [sitemap()],
});
