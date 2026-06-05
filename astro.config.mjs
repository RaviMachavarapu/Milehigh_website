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
      // PropSpectrum is currently a placeholder ("Coming Soon") — only the single
      // /propspectrum page is live. The sub-pages are preserved in
      // propspectrum-prebuilt/ and re-added here when re-enabled (see CLAUDE.md).
      customPages: ['https://www.milehighlabs.ai/propspectrum'],
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
