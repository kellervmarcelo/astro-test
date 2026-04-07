import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://kellervmarcelo.github.io',
  base: '/astro-test',
  integrations: [vue()],
  vite: {
    plugins: [tailwindcss()],
  },
});
