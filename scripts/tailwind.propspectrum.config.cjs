/* Standalone Tailwind v3 config for the PropSpectrum static pages.
   The pages were authored against this token set (Tailwind Play CDN, v3).
   Merged union of every page's inline `tailwind.config`, with the font
   families remapped to MHAL's single professional family (Manrope).
   Build:
     npx tailwindcss@3 -c scripts/tailwind.propspectrum.config.cjs \
       -i scripts/propspectrum.input.css \
       -o public/images/propspectrum/propspectrum.css --minify */
const SERIF = ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'];
const SANS = ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'];

module.exports = {
  content: ['./public/propspectrum/**/*.html'],
  theme: {
    extend: {
      colors: {
        // homepage palette
        midnight: '#1C2B3A',
        terracotta: '#E8A87C',
        'steel-blue': '#6B8FA8',
        // shared / product palette
        'warm-white': '#F5F2ED',
        'midnight-navy': '#1C2B3A',
        'terracotta-accent': '#E8A87C',
        'deep-forest': '#1A3028',
        'amber-gold': '#C9A84C',
        secondary: '#5f5e5b',
        // Material-style tokens used by the product pages
        'tertiary-container': '#451f00',
        'surface-variant': '#d8e3fa',
        'on-tertiary-fixed-variant': '#693c19',
        'on-tertiary': '#ffffff',
        'on-tertiary-container': '#be835a',
        'inverse-surface': '#263142',
        'inverse-on-surface': '#ebf1ff',
        'on-secondary': '#ffffff',
        'inverse-primary': '#b8c8dc',
        'surface-container-high': '#dee8ff',
        outline: '#74777c',
        'secondary-fixed': '#e5e2dd',
        'on-tertiary-fixed': '#301400',
        'on-background': '#111c2c',
        'on-surface-variant': '#44474c',
        'secondary-container': '#e5e2dd',
        'surface-bright': '#f9f9ff',
        'surface-container-lowest': '#ffffff',
        'on-primary': '#ffffff',
        'on-error': '#ffffff',
        'surface-tint': '#516071',
        'surface-container': '#e7eeff',
        primary: '#061625',
        'on-surface': '#111c2c',
        'primary-container': '#1c2b3a',
        'surface-container-low': '#f0f3ff',
        'secondary-fixed-dim': '#c9c6c2',
        'tertiary-fixed-dim': '#fbb88b',
        'primary-fixed-dim': '#b8c8dc',
        'tertiary-fixed': '#ffdcc6',
        error: '#ba1a1a',
        'on-secondary-fixed-variant': '#474743',
        'on-primary-fixed-variant': '#394858',
        tertiary: '#260e00',
        background: '#f9f9ff',
        'on-error-container': '#93000a',
        'primary-fixed': '#d4e4f8',
        'surface-container-highest': '#d8e3fa',
        'on-secondary-fixed': '#1c1c19',
        'surface-dim': '#cfdaf1',
        surface: '#f9f9ff',
        'on-primary-fixed': '#0d1d2b',
        'on-primary-container': '#8392a5',
        'on-secondary-container': '#656461',
        'outline-variant': '#c4c6cc',
        'error-container': '#ffdad6',
      },
      spacing: {
        unit: '8px',
        gutter: '24px',
        'margin-mobile': '16px',
        'section-gap': '120px',
        'container-max': '1280px',
        'margin-desktop': '48px',
      },
      maxWidth: {
        'container-max': '1280px',
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg: '0.25rem',
        xl: '0.5rem',
        full: '0.75rem',
      },
      fontFamily: {
        serif: SERIF,
        sans: SANS,
        'headline-xl': SERIF,
        'headline-lg': SERIF,
        'headline-lg-mobile': SERIF,
        'headline-md': SERIF,
        'headline-sm': SERIF,
        'body-lg': SANS,
        'body-md': SANS,
        'body-sm': SANS,
        'label-md': SANS,
      },
      fontSize: {
        'headline-xl': ['64px', { lineHeight: '72px', letterSpacing: '-0.02em', fontWeight: '800' }],
        'headline-lg': ['48px', { lineHeight: '56px', letterSpacing: '-0.01em', fontWeight: '700' }],
        'headline-lg-mobile': ['36px', { lineHeight: '44px', fontWeight: '700' }],
        'headline-md': ['32px', { lineHeight: '40px', fontWeight: '700' }],
        'headline-sm': ['24px', { lineHeight: '32px', fontWeight: '700' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'label-md': ['12px', { lineHeight: '16px', letterSpacing: '0.05em', fontWeight: '600' }],
      },
    },
  },
};
