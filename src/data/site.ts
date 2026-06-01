// Central site data — company facts, nav, services, products.
// Sourced from CLAUDE.md / brand white paper. Single source for components.

export const site = {
  name: 'Mile High AI Labs',
  domain: 'https://www.milehighlabs.ai',
  tagline: 'AI systems built, run, and reviewed by humans — for small and medium businesses.',
  booking: 'https://cal.com/milehighailabs/15min',
  email: 'sales@milehighlabs.ai',
  address: {
    street: '6909 S Holly Cir STE 350',
    city: 'Centennial',
    state: 'CO',
    zip: '80112',
    country: 'US',
  },
  socials: {
    linkedin: 'https://www.linkedin.com/company/107492824/',
    facebook: 'https://www.facebook.com/profile.php?id=61576855723694',
    youtube: 'https://www.youtube.com/channel/UCchCR-W_gPW3vt1QtQR8oRw',
    instagram: 'https://www.instagram.com/',
  },
  // PropSpectrum is a separate real-estate app the MHAL site links out to.
  // NOTE: domain still to be confirmed (propspectrum.ai vs realpropspectrum.com).
  propspectrum: 'https://propspectrum.ai',
};

export const navLinks = [
  { label: 'Lead Gen & CRM', href: '/services/lead-gen-crm' },
  { label: 'Marketing & Growth', href: '/services/marketing-growth' },
  { label: 'AI Workflows', href: '/services/ai-workflows' },
  { label: 'PropSpectrum', href: '/propspectrum' },
];

export const services = [
  {
    slug: 'lead-gen-crm',
    label: 'Lead Gen & CRM',
    href: '/services/lead-gen-crm',
    blurb:
      'Capture every enquiry, score it, and nurture it automatically — a pipeline that works your leads instead of just storing them.',
  },
  {
    slug: 'marketing-growth',
    label: 'Marketing & Growth',
    href: '/services/marketing-growth',
    blurb:
      'A managed content engine that writes, reviews, and publishes across your channels — a marketing department without the headcount.',
  },
  {
    slug: 'ai-workflows',
    label: 'AI Workflows',
    href: '/services/ai-workflows',
    blurb:
      'Always-on automation for enquiries, follow-up, scheduling, and operations — with a human reviewing every output before it goes live.',
  },
];

export const propProducts = [
  { name: 'PropAI', oneLine: 'Never drop a lead.', color: 'forest', href: '/propspectrum/propai' },
  { name: 'PropLeads', oneLine: 'Always know who to call.', color: 'amber', href: '/propspectrum/propleads' },
  { name: 'PropOptics', oneLine: 'Make the listing irresistible.', color: 'terracotta', href: '/propspectrum/propoptics' },
  { name: 'PropReach', oneLine: 'Written in your voice. Posted automatically.', color: 'amber', href: '/propspectrum/propreach' },
];

// Six-step canonical process (client-facing: "Our Deployment Lifecycle")
export const lifecycle = [
  { step: 'Diagnose', desc: 'We map your current workflow and find the exact operational gap.' },
  { step: 'Select', desc: 'We choose the AI tools and integrations that solve that specific gap.' },
  { step: 'Configure', desc: 'We build and connect everything. You hand over access — nothing else.' },
  { step: 'Review', desc: 'A human checks every output before it touches your business.', hitl: true },
  { step: 'Deploy', desc: 'We go live and watch the first 48 hours closely.' },
  { step: 'Maintain', desc: 'Ongoing managed service — monthly reviews, tuning, iteration.' },
];
