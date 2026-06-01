---
name: Boutique Authority
colors:
  surface: '#e7fff3'
  surface-dim: '#c6e0d4'
  surface-bright: '#e7fff3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#e0faed'
  surface-container: '#daf4e7'
  surface-container-high: '#d4eee2'
  surface-container-highest: '#cfe8dc'
  on-surface: '#091f18'
  on-surface-variant: '#44474c'
  inverse-surface: '#1f352d'
  inverse-on-surface: '#ddf7ea'
  outline: '#74777c'
  outline-variant: '#c4c6cc'
  surface-tint: '#516071'
  primary: '#061625'
  on-primary: '#ffffff'
  primary-container: '#1c2b3a'
  on-primary-container: '#8392a5'
  inverse-primary: '#b8c8dc'
  secondary: '#5f5e5b'
  on-secondary: '#ffffff'
  secondary-container: '#e5e2dd'
  on-secondary-container: '#656461'
  tertiary: '#260e00'
  on-tertiary: '#ffffff'
  tertiary-container: '#451f00'
  on-tertiary-container: '#be835a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d4e4f8'
  primary-fixed-dim: '#b8c8dc'
  on-primary-fixed: '#0d1d2b'
  on-primary-fixed-variant: '#394858'
  secondary-fixed: '#e5e2dd'
  secondary-fixed-dim: '#c9c6c2'
  on-secondary-fixed: '#1c1c19'
  on-secondary-fixed-variant: '#474743'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#fbb88b'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#693c19'
  background: '#e7fff3'
  on-background: '#091f18'
  surface-variant: '#cfe8dc'
  midnight-navy: '#1C2B3A'
  warm-white: '#F5F2ED'
  terracotta: '#E8A87C'
  deep-forest: '#1A3028'
  amber-gold: '#C9A84C'
  pure-white: '#FFFFFF'
typography:
  display-lg:
    fontFamily: Instrument Serif
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Instrument Serif
    fontSize: 42px
    fontWeight: '800'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Instrument Serif
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Instrument Serif
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  section-gap: 120px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The design system is built on a "Boutique Firm" aesthetic, intentionally distancing itself from the clinical, trend-chasing appearance of typical AI startups. It balances **High Authority** with **Human Approachability**, positioning the product as an established, serious partner for SMBs and enterprise-scale needs.

The chosen style is **Corporate / Modern** with a **Tactile** twist. It utilizes heavy whitespace and high-contrast color blocking to establish a sense of order and reliability. Unlike the "floating orbs" and neon gradients common in the sector, this system relies on crisp typography, real-world UI mockups, and a warm, grounded palette to evoke trust. The "Human-in-the-Loop" (HITL) differentiator is reinforced through specific visual signatures that emphasize human oversight within automated processes.

## Colors

This design system uses a sophisticated, high-contrast palette to signal professional maturity. 

- **Primary (Midnight Navy):** Used for headlines, heavy backgrounds, and navigation to establish authority and depth.
- **Surface (Warm White):** The primary background color. It is essential to use this over pure white to maintain an approachable, "boutique" feel.
- **CTA/Accent (Terracotta):** Reserved for primary actions and the "Review/HITL" step in process visuals. This is the brand’s visual signature.
- **Deep Forest:** Used for secondary accents and grounding elements, particularly in data-rich or technical contexts.
- **Amber Gold:** Used sparingly for highlights, trust signals, and specific achievement markers.

**Color Mode:** The default mode is `light`. Use Midnight Navy as a full-width background for high-impact sections (like the HITL explanation) to break the scroll rhythm.

## Typography

The typography system relies on a **Serif + Sans-Serif pairing** to differentiate from the tech-heavy sans-serif competition.

**Instrument Serif** is the primary display face. Use the **Italic variant** strategically for emotionally resonant phrases in hero sections or testimonials to add a human, editorial touch.

**Inter** provides a functional, modern balance for all body text, UI labels, and data. It ensures high legibility and a professional, systematic feel. 

Maintain generous line heights for body text to support the "warm" and accessible brand personality.

## Layout & Spacing

The layout follows a **12-column fluid grid** for desktop, transitioning to 4 columns for mobile. 

- **Whitespace:** Use generous vertical spacing (`section-gap`) to create a premium, unhurried feel.
- **Grid Models:** Cards and service pillars should span 4 columns on desktop (3-up layout) or 6 columns (2-up layout) for more complex feature descriptions.
- **HITL Callouts:** Sections highlighting the 6-step process or HITL model should use increased internal padding to draw focus.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Low-contrast Outlines**. 

Avoid heavy, dark shadows. Instead, use a "subtle lift" for interactive cards:
- **Default State:** A 1px border using a slightly darker version of the surface color or a very faint outline.
- **Hover State:** A soft ambient shadow (`0px 4px 20px rgba(28, 43, 58, 0.05)`) that mimics a physical object lifting slightly off the warm white surface.

For Midnight Navy sections, depth is created through "Ghost" layers—using slightly lighter or darker navy shades to define card areas without relying on drop shadows.

## Shapes

The design system uses a **Rounded (8px)** corner radius for all primary UI elements, including buttons, input fields, and cards.

- **Cards:** Use `rounded-lg` (16px) to create a distinct container feel that looks modern but grounded.
- **Badges/Chips:** Use pill shapes for status indicators or product badges (e.g., PropAI, PropLeads) to contrast against the more structured rectangular cards.
- **Buttons:** Standard buttons follow the 8px radius. Do not use fully rounded pill buttons for primary CTAs to maintain the "authoritative" brand tone.

## Components

### Buttons
- **Primary:** Terracotta background, Midnight Navy or White text. Use for high-conversion actions.
- **Secondary:** Midnight Navy border/text on Warm White background.
- **Dark Mode Variant:** Warm White text and border on Midnight Navy background.

### HITL Trust Badge
A distinctive visual mark featuring a human silhouette or checkmark icon in Terracotta. This must be applied to all service cards and next to key outcome statements to reinforce human oversight.

### Service & Product Cards
White (`#FFFFFF`) backgrounds placed on the Warm White (`#F5F2ED`) surface. This subtle contrast provides a clean, "layered" look. Use 16px corner radii and the "subtle lift" hover state.

### Process Visuals
The "6-Step Process" should be a horizontal or vertical timeline. The "Review/HITL" step must always be highlighted in Terracotta to visually anchor the brand's unique value proposition.

### Input Fields
8px rounded corners with a subtle 1px border. Focus states should use a Midnight Navy border with a soft glow.

### Sticky Navigation
Transparent background on Hero sections, transitioning to a solid Midnight Navy background with a backdrop blur on scroll.