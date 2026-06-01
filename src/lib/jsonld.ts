// JSON-LD builders for SEO/AEO structured data.
import { site } from '../data/site';

export function organization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.domain,
    logo: `${site.domain}/og-default.svg`,
    description:
      'Mile High AI Labs builds, runs, and manages AI systems for small and medium businesses — with a Human-in-the-Loop review on every output.',
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: site.address.country,
    },
    sameAs: [site.socials.linkedin, site.socials.facebook, site.socials.youtube],
  };
}

export function faqPage(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}

export function service(opts: { name: string; description: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    serviceType: opts.name,
    description: opts.description,
    url: new URL(opts.path, site.domain).href.replace(/\/$/, ''),
    provider: { '@type': 'Organization', name: site.name, url: site.domain },
    areaServed: 'US',
  };
}

export function breadcrumb(crumbs: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: new URL(c.path, site.domain).href.replace(/\/$/, ''),
    })),
  };
}
