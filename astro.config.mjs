import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'hybrid',
  adapter: vercel(),
  site: 'https://www.nathapp.io',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
