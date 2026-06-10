// Central site data: company facts, nav, services, products.
// Sourced from CLAUDE.md / brand white paper. Single source for components.

export const site = {
  name: 'Mile High AI Labs',
  domain: 'https://www.milehighlabs.ai',
  tagline: 'Helpful AI that real people build, run, and double-check, made for small and medium businesses.',
  booking: 'https://cal.com/milehighailabs/15min',
  email: 'sales@milehighlabs.ai',
  // Internal contact page (replaces mailto: links across the site).
  contact: '/contact',
  // Inbox that /contact form submissions are delivered to. The form posts to
  // FormSubmit.co (free, no backend, no API key) at this exact address, so messages
  // land in sales@milehighlabs.ai. NOTE: FormSubmit requires a ONE-TIME activation —
  // the first submission emails a confirmation link to this inbox; click it once and
  // every later submission is delivered automatically.
  contactInbox: 'sales@milehighlabs.ai',
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
  // PropSpectrum is a separate real-estate suite. Currently a placeholder:
  // points to the internal "Coming Soon" page at /propspectrum until the real
  // pages are re-enabled (see propspectrum-prebuilt/ + CLAUDE.md).
  propspectrum: '/propspectrum',
};

export const navLinks = [
  { label: 'Lead Gen & CRM', href: '/services/lead-gen-crm' },
  { label: 'Marketing & Growth', href: '/services/marketing-growth' },
  { label: 'AI Solutions & Workflows', href: '/services/ai-workflows' },
  { label: 'PropSpectrum', href: '/propspectrum' },
];

export const services = [
  {
    slug: 'lead-gen-crm',
    label: 'Lead Gen & CRM',
    href: '/services/lead-gen-crm',
    image: '/images/content/leadgen-crm.jpg',
    photo: '/images/content/team.jpg',
    tagline: 'Never lose a good lead again.',
    blurb:
      'AI lead generation and CRM automation that captures every enquiry, scores the leads worth your time, and follows up automatically, so good customers never slip through the cracks.',
    features: [
      'Lead capture & qualification',
      'CRM setup & automation',
      'Automated follow-up & check-ins',
    ],
  },
  {
    slug: 'marketing-growth',
    label: 'Marketing & Growth',
    href: '/services/marketing-growth',
    image: '/images/content/marketing-content.jpg',
    photo: '/images/content/marketing-content.jpg',
    tagline: 'Marketing that sounds just like you.',
    blurb:
      'Done-for-you marketing: we write, review, and publish on-brand content across the channels your customers actually use, like a full marketing team without the extra payroll.',
    features: [
      'Social media content & scheduling',
      'Email marketing & newsletters',
      'SEO blog & website copy',
    ],
  },
  {
    slug: 'ai-workflows',
    label: 'AI Solutions & Workflows',
    href: '/services/ai-workflows',
    image: '/images/content/ai-workflows-team.jpg',
    photo: '/images/content/ai-workflows-team.jpg',
    tagline: 'The help that never sleeps.',
    blurb:
      'Custom AI workflow automation that takes repetitive daily work off your plate, from enquiries and follow-ups to scheduling and data entry, with a real person checking the work before it reaches your customers.',
    features: [
      'Appointment scheduling & reminders',
      'Customer support & FAQ replies',
      'Back-office task automation',
    ],
  },
];

// PropSpectrum products. Sub-page hrefs are intentionally omitted while
// PropSpectrum is a placeholder; the homepage renders these as a non-clickable
// "coming soon" teaser. Restore the `href`s when re-enabling (see CLAUDE.md).
export const propProducts = [
  { name: 'PropAI', oneLine: 'Never drop a lead.', color: 'forest' },
  { name: 'PropLeads', oneLine: 'Always know who to call.', color: 'amber' },
  { name: 'PropOptics', oneLine: 'Make the listing captivating.', color: 'terracotta' },
  { name: 'PropReach', oneLine: 'Written in your voice. Posted automatically.', color: 'amber' },
];

// Six-step canonical process (client-facing: "How We Work With You")
export const lifecycle = [
  { step: 'Diagnose', desc: 'We look at how you work today and find exactly where things slow you down.' },
  { step: 'Select', desc: 'We pick the right AI tools to fix that exact problem, nothing you do not need.' },
  { step: 'Configure', desc: 'We build and connect everything. All you do is hand over access.' },
  { step: 'Review', desc: 'A real person checks the work before it ever reaches your business.', hitl: true },
  { step: 'Deploy', desc: 'We go live and keep a close eye on things right from the start.' },
  { step: 'Maintain', desc: 'We keep looking after it, with monthly check-ins and steady improvements.' },
];
