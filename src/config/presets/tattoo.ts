import type { NichePreset } from '@/src/types';

/**
 * Example vertical: customize all fields for a tattoo studio client.
 * Replace images under /public when you have real assets.
 */
export const tattooPreset: NichePreset = {
  id: 'tattoo',

  brand: {
    displayName: 'Ink Atelier',
    splashTitleLine1: 'Ink',
    splashTitleLine2: 'Atelier',
    footerTagline:
      'Custom tattoos and fine line work. Book a consultation and wear your story with pride.',
  },

  seo: {
    htmlLang: 'en',
    title: 'Ink Atelier — Custom Tattoos',
    description: 'Ink Atelier — Custom tattoo studio. Book your session and explore our artists.',
    ogTitle: 'Ink Atelier — Custom Tattoos',
    ogDescription: 'Bold lines, healed work, and a calm studio experience.',
    ogLocale: 'en_US',
    themeColor: '#1a1a1a',
    author: 'Ink Atelier',
  },

  splash: {
    subtitle: 'Custom Tattoos',
    exitAfterMs: 1500,
    completeAfterMs: 2100,
  },

  hero: {
    eyebrow: 'Est. 2020 — Private Studio',
    titleLine1: 'Ink',
    titleLine2: 'Atelier',
    subtitle: 'Precision work, sterile environment, and art that ages with you.',
    ctaLabel: 'View availability',
    menuAnchor: '#menu',
  },

  navbar: {
    links: [
      { label: 'Essence', href: '#philosophy' },
      { label: 'Work', href: '#menu' },
      { label: 'Process', href: '#process' },
      { label: 'Studio', href: '#ambience' },
      { label: 'Artists', href: '#team' },
      { label: 'Book', href: '#location' },
    ],
  },

  philosophy: {
    backgroundColor: 'rgba(253, 251, 247, 0.88)',
    sectionLabel: 'Our Approach',
    headlineLine1: 'Skin is',
    headlineLine2Italic: 'forever',
    intro:
      'We design with longevity in mind—composition, contrast, and aftercare guidance so your tattoo heals true.',
    pillars: [
      {
        number: '01',
        title: 'Design',
        description:
          'Consultations that translate your idea into a balanced piece for your body.',
      },
      {
        number: '02',
        title: 'Hygiene',
        description:
          'Medical-grade sterilization and single-use supplies for every session.',
      },
      {
        number: '03',
        title: 'Healing',
        description:
          'Clear aftercare and follow-up so line work and saturation stay crisp.',
      },
    ],
    decorativeWord: 'ink',
  },

  menu: {
    backgroundColor: 'rgba(253, 251, 247, 0.93)',
    sectionLabel: 'Flash & Styles',
    headlineLine1: 'Bookable',
    headlineLine2Italic: 'formats',
    emptyCategoryMessage: 'No items in this filter.',
    decorativeWord: 'work',
    categories: [
      { key: 'all', label: 'All' },
      { key: 'flash', label: 'Flash' },
      { key: 'custom', label: 'Custom' },
      { key: 'touchup', label: 'Touch-up' },
    ],
    items: [
      {
        id: 1,
        name: 'Fine Line Session',
        subtitle: 'Single needle',
        category: 'custom',
        description: 'Delicate linework for botanicals, script, and micro-details.',
        image: '/images/menu/espresso.jpg',
      },
      {
        id: 2,
        name: 'Blackwork Flash',
        subtitle: 'Bold shapes',
        category: 'flash',
        description: 'Curated flash sheets refreshed monthly.',
        image: '/images/menu/cappuccino.jpg',
      },
      {
        id: 3,
        name: 'Consultation',
        subtitle: 'Design review',
        category: 'custom',
        description: 'Bring references; we refine placement and scale together.',
        image: '/images/menu/flatwhite.jpg',
      },
    ],
  },

  process: {
    imageSrc: '/images/process-roast.jpg',
    imageAlt: 'Tattoo studio workspace',
    floatCardTitle: 'Sterile Setup',
    floatCardSubtitle: 'Every station, every time',
    sectionLabel: 'Session Flow',
    headlineLine1: 'From sketch',
    headlineLine2Italic: 'to skin',
    intro:
      'A predictable journey: consult, stencil, tattoo, heal—with clear timelines at each step.',
    steps: [
      {
        number: '01',
        title: 'Consult',
        description: 'Reference gathering, sizing, and placement on body.',
      },
      {
        number: '02',
        title: 'Stencil',
        description: 'Temporary placement until you approve the composition.',
      },
      {
        number: '03',
        title: 'Session',
        description: 'Focused tattooing with breaks as needed.',
      },
      {
        number: '04',
        title: 'Aftercare',
        description: 'Instructions and optional check-in for touch-ups.',
      },
    ],
  },

  ambience: {
    sectionLabel: 'The Studio',
    headlineLine1: 'Calm',
    headlineLine2Italic: 'by design',
    intro:
      'Sessions can run for hours—we built the studio so your body and mind stay at ease while the work unfolds.',
    sectors: [
      {
        label: 'Glass booths',
        body:
          'Glass-front booths keep each appointment private without feeling closed off. Adjustable lighting lets artists see skin accurately while you relax in ergonomic seating that supports long sits.',
        imageSrc: '/images/ambience/tattoo-sector-reception.jpg',
        imageAlt: 'Minimal reception and waiting area with calm lighting',
      },
      {
        label: 'Sterile workflow',
        body:
          'Ventilation routes away from work surfaces; sterilization zones stay separate from lounge and reception. Between passes you will find water, tea, and genuine quiet—not a hectic waiting room.',
        imageSrc: '/images/ambience/tattoo-sector-station.jpg',
        imageAlt: 'Clean tattoo workstation with organized tools',
      },
      {
        label: 'Gallery wall',
        body:
          'The reception area doubles as a gallery wall for healed work and flash—so while you browse, you get a realistic sense of line weight and how pieces age.',
        imageSrc: '/images/ambience/tattoo-sector-gallery.jpg',
        imageAlt: 'Flash designs and reference art on display',
      },
    ],
    gallery: [
      {
        gridClass: 'col-span-2 row-span-2',
        minHeightClass: 'h-full min-h-[300px] md:min-h-[500px]',
        bgClass: 'bg-matcha',
        label: 'Waiting area',
        imageSrc: '/images/ambience/tattoo-sector-reception.jpg',
        imageAlt: 'Studio lounge and welcome area',
      },
      {
        gridClass: '',
        minHeightClass: 'h-40 md:h-60',
        bgClass: 'bg-blush',
        label: 'Station',
        imageSrc: '/images/ambience/tattoo-sector-station.jpg',
        imageAlt: 'Tattoo station setup',
      },
      {
        gridClass: '',
        minHeightClass: 'h-40 md:h-60',
        bgClass: 'bg-stone/20',
        label: 'Flash wall',
        imageSrc: '/images/ambience/tattoo-sector-gallery.jpg',
        imageAlt: 'Flash art on the wall',
      },
      {
        gridClass: 'col-span-2',
        minHeightClass: 'h-40 md:h-52',
        bgClass: 'bg-caramel/20',
        label: 'Private room',
        imageSrc: '/images/ambience/tattoo-gallery-private.jpg',
        imageAlt: 'Private appointment space',
      },
    ],
  },

  testimonials: {
    sectionLabel: 'Reviews',
    headlineLine1: 'Collectors',
    headlineLine2Italic: 'say',
    ratingSummary: '5.0 average',
    items: [
      {
        name: 'Alex K.',
        text: 'Crisp lines and the calmest session I have had.',
        rating: 5,
        date: 'Last week',
      },
      {
        name: 'Jordan P.',
        text: 'They reworked my old piece into something cohesive.',
        rating: 5,
        date: '2 weeks ago',
      },
    ],
  },

  team: {
    sectionLabel: 'Artists',
    headlineLine1: 'People behind',
    headlineLine2Italic: 'the needle',
    decorativeWord: 'crew',
    members: [
      {
        name: 'Riley Chen',
        role: 'Lead Artist',
        bio: 'Specializes in botanical fine line and cover-ups.',
        initials: 'RC',
        color: '#2C1810',
      },
      {
        name: 'Sam Ortiz',
        role: 'Blackwork',
        bio: 'Bold geometry and large-scale composition.',
        initials: 'SO',
        color: '#4a3b32',
      },
    ],
  },

  location: {
    sectionLabel: 'Book',
    headlineLine1: 'Visit or',
    headlineLine2Italic: 'message',
    intro: 'Walk-ins when marked “open flash”; custom work by appointment.',
    addressLabel: 'Studio',
    addressLines: ['123 Creative Lane', 'Art District'],
    hoursLabel: 'Hours',
    hours: [
      { day: 'Tue — Sat', time: '11:00 — 19:00' },
      { day: 'Sun — Mon', time: 'Closed' },
    ],
    contactLabel: 'DM / Phone',
    phone: '+1 (555) 010-2030',
    mapCardTitle: 'Ink Atelier',
    mapCardSubtitle: 'Art District',
    mapStreetLabels: {
      top: 'Creative Ln',
      mid: 'Gallery Ave',
      vertical: 'Studio Row',
    },
  },

  footer: {
    navTitle: 'Navigate',
    followTitle: 'Social',
    navLinks: [
      { label: 'Approach', href: '#philosophy' },
      { label: 'Work', href: '#menu' },
      { label: 'Studio', href: '#ambience' },
      { label: 'Book', href: '#location' },
    ],
    socialLinks: [
      { platform: 'instagram', href: '#', label: 'Instagram' },
      { platform: 'facebook', href: '#', label: 'Facebook' },
    ],
    socialHandle: '@inkatelier',
    copyrightSuffix: 'All rights reserved.',
    craftedLine: 'Made with care in the studio',
  },

  assets: {
    heroBackground: '/images/hero-bg.jpg',
    preloadHeroImage: true,
  },
};
