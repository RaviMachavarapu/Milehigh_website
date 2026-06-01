// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.milehighlabs.ai',
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      // PropSpectrum pages are static files in public/, so they aren't auto-discovered.
      customPages: [
        'https://www.milehighlabs.ai/propspectrum',
        'https://www.milehighlabs.ai/propspectrum/propai',
        'https://www.milehighlabs.ai/propspectrum/propleads',
        'https://www.milehighlabs.ai/propspectrum/propoptics',
        'https://www.milehighlabs.ai/propspectrum/propoptics/portfolio',
        'https://www.milehighlabs.ai/propspectrum/propoptics/design-studio',
        'https://www.milehighlabs.ai/propspectrum/propreach',
      ],
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
