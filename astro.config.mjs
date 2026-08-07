// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://nanocotillon.com.ar',
  vite: {
    plugins: [tailwindcss()]
  },
  output: 'static',
  integrations: [sitemap()],
  //adapter: cloudflare()
});