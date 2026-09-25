/**
 * Central place for brand copy, links and performance switches.
 * Search for "REPLACE" to find the values you should update before publishing.
 */
export const site = {
  name: 'NEXA AI',
  tagline: 'Intelligence, built into your workflow.',
  concept: 'AIVA Portfolio Concept',

  aiva: {
    name: 'AIVA',
    descriptor: 'Digital products. AI. Web technology.',
    // REPLACE with your real links
    contactUrl: 'mailto:hello@your-domain.com',
    workUrl: '#',
    websiteUrl: '#',
  },

  nav: [
    { label: 'Product', href: '#product' },
    { label: 'Features', href: '#features' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'About', href: '#about' },
  ],

  /**
   * Performance switches.
   *  - liteBelow: viewport width (px) under which the lightweight experience is used
   *    (simplified 3D scene, fewer particles, no autoplaying video).
   *  - liteEnabled: set to false to always show the full 3D experience, even on phones.
   */
  performance: {
    liteEnabled: true,
    liteBelow: 768,
    particlesDesktop: 56,
    particlesLite: 22,
  },
};
