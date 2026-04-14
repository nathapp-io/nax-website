import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.nathapp.io',
  vite: {
    plugins: [tailwindcss()],
  },
});
