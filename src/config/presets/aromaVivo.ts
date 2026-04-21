import type { NichePreset } from '@/src/types';

export const aromaVivoPreset: NichePreset = {
  id: 'aromaVivo',

  brand: {
    displayName: 'Aroma Vivo',
    splashTitleLine1: 'Aroma',
    splashTitleLine2: 'Vivo',
    footerTagline:
      'Specialty coffee roasted in small batches. Every cup is a ceremony of flavor and craft.',
  },

  seo: {
    htmlLang: 'en',
    title: 'Aroma Vivo — Specialty Coffee',
    description:
      'Aroma Vivo — Small-batch specialty coffee. Every cup is a ceremony of flavor and craft.',
    ogTitle: 'Aroma Vivo — Specialty Coffee',
    ogDescription: 'Every cup tells a story. Let coffee speak before your first sip.',
    ogLocale: 'en_US',
    themeColor: '#2C1810',
    author: 'Aroma Vivo',
  },

  splash: {
    subtitle: 'Specialty Coffee',
    exitAfterMs: 1500,
    completeAfterMs: 2100,
  },

  hero: {
    eyebrow: 'Since 2024 - Artisan Roasting',
    titleLine1: 'Aroma',
    titleLine2: 'Vivo',
    subtitle: 'Every cup tells a story. Let the coffee speak before your first sip.',
    ctaLabel: 'Explore our menu',
    menuAnchor: '#menu',
  },

  navbar: {
    links: [
      { label: 'Essence', href: '#philosophy' },
      { label: 'Menu', href: '#menu' },
      { label: 'Process', href: '#process' },
      { label: 'Ambience', href: '#ambience' },
      { label: 'Team', href: '#team' },
      { label: 'Visit Us', href: '#location' },
    ],
  },

  philosophy: {
    backgroundColor: 'rgba(253, 251, 247, 0.88)',
    sectionLabel: 'Our Essence',
    headlineLine1: 'More than a cup,',
    headlineLine2Italic: 'a ritual',
    intro:
      'We believe coffee is a ritual that deserves time, attention, and respect. From bean to cup, every step is a conscious decision toward excellence.',
    pillars: [
      {
        number: '01',
        title: 'Origin',
        description:
          'We source beans from sustainable farms at ideal altitudes and climates to build distinct flavor profiles.',
      },
      {
        number: '02',
        title: 'Roasting',
        description:
          'Each batch is hand-roasted in small lots, preserving the character of every origin without shortcuts.',
      },
      {
        number: '03',
        title: 'Extraction',
        description:
          'Our baristas balance sweetness, acidity, and body to capture the best expression of each bean.',
      },
    ],
    decorativeWord: 'coffee',
  },

  menu: {
    backgroundColor: 'rgba(253, 251, 247, 0.93)',
    sectionLabel: 'Our Menu',
    headlineLine1: 'Signature',
    headlineLine2Italic: 'creations',
    emptyCategoryMessage: 'No items available in this category.',
    decorativeWord: 'menu',
    categories: [
      { key: 'all', label: 'All' },
      { key: 'hot', label: 'Hot' },
      { key: 'cold', label: 'Cold' },
      { key: 'desserts', label: 'Desserts' },
    ],
    items: [
      {
        id: 1,
        name: 'Classic Espresso',
        subtitle: 'The pure soul',
        category: 'hot',
        description:
          'Intense, creamy, and full-bodied. A double shot that reveals the full character of the bean.',
        image: '/images/menu/espresso.jpg',
      },
      {
        id: 2,
        name: 'Soft Cappuccino',
        subtitle: 'Foam cloud',
        category: 'hot',
        description:
          'Silky foam over double espresso, with microbubbles that melt on the palate.',
        image: '/images/menu/cappuccino.jpg',
      },
      {
        id: 3,
        name: 'Flat White',
        subtitle: 'Liquid silk',
        category: 'hot',
        description:
          'Perfect microfoam over double ristretto. A favorite among coffee purists.',
        image: '/images/menu/flatwhite.jpg',
      },
      {
        id: 4,
        name: 'Cold Brew',
        subtitle: 'Iced patience',
        category: 'cold',
        description:
          'Twelve-hour cold extraction. Smooth, sweet, and refreshingly clean.',
        image: '/images/menu/coldbrew.jpg',
      },
      {
        id: 5,
        name: 'Iced Latte',
        subtitle: 'Ice and passion',
        category: 'cold',
        description:
          'Creamy milk and balanced espresso over ice. Perfectly refreshing.',
        image: '/images/menu/icedlatte.jpg',
      },
      {
        id: 6,
        name: 'Frappe Moka',
        subtitle: 'Sweet indulgence',
        category: 'cold',
        description:
          'Coffee, chocolate, and whipped cream blended into a dessert-style drink.',
        image: '/images/menu/frappemoka.jpg',
      },
      {
        id: 7,
        name: 'Homemade Tiramisu',
        subtitle: 'Layers of joy',
        category: 'desserts',
        description:
          'Layers of coffee, mascarpone, and cocoa. A perfected family recipe.',
        image: '/images/menu/tiramisu.jpg',
      },
      {
        id: 8,
        name: 'Caramel Cheesecake',
        subtitle: 'Sweet balance',
        category: 'desserts',
        description:
          'Biscuit base, cream cheese, and salted caramel sauce for a complete dessert experience.',
        image: '/images/menu/cheesecake.jpg',
      },
    ],
  },

  process: {
    imageSrc: '/images/process-roast.jpg',
    imageAlt: 'Coffee roasting process',
    floatCardTitle: 'Small-Batch Roasting',
    floatCardSubtitle: 'Craft control at every step',
    sectionLabel: 'From Farm to Cup',
    headlineLine1: 'A mindful',
    headlineLine2Italic: 'process',
    intro:
      'This is more than coffee. It is a chain of deliberate decisions that respect the bean, the farmer, and the person drinking it.',
    steps: [
      {
        number: '01',
        title: 'Selection',
        description:
          'We choose beans from top farms in Colombia, Ethiopia, and Brazil. Only the top 1% pass our quality filter.',
      },
      {
        number: '02',
        title: 'Artisan Roasting',
        description:
          'Every batch is hand-roasted while temperature and time are monitored with precision.',
      },
      {
        number: '03',
        title: 'Controlled Rest',
        description:
          'Beans rest for 48 hours in a climate-controlled room so oils stabilize and flavors concentrate.',
      },
      {
        number: '04',
        title: 'Perfect Extraction',
        description:
          'Our baristas calibrate temperature, grind, and pressure to extract the best from each origin.',
      },
    ],
  },

  ambience: {
    sectionLabel: 'The Space',
    headlineLine1: 'A refuge for',
    headlineLine2Italic: 'your senses',
    intro:
      'Designed so every visit feels like a pause. Natural light, warm textures, and corners that invite you to stay.',
    atmosphereLabel: 'What you will feel',
    notes: [
      'Warm wood',
      'Golden light',
      'Inviting aromas',
      'Soft music',
      'Good conversations',
      'Comfortable silence',
    ],
    gallery: [
      {
        gridClass: 'col-span-2 row-span-2',
        minHeightClass: 'h-full min-h-[300px] md:min-h-[500px]',
        bgClass: 'bg-matcha',
        label: 'Main hall',
      },
      {
        gridClass: '',
        minHeightClass: 'h-40 md:h-60',
        bgClass: 'bg-blush',
        label: 'Bar',
      },
      {
        gridClass: '',
        minHeightClass: 'h-40 md:h-60',
        bgClass: 'bg-stone/20',
        label: 'Details',
      },
      {
        gridClass: 'col-span-2',
        minHeightClass: 'h-40 md:h-52',
        bgClass: 'bg-caramel/20',
        label: 'Reading corner',
      },
    ],
  },

  testimonials: {
    sectionLabel: 'Testimonials',
    headlineLine1: 'What people',
    headlineLine2Italic: 'are saying',
    ratingSummary: '4.9 on Google Maps',
    items: [
      {
        name: 'Valentina R.',
        text: 'The best espresso I have tried in Buenos Aires. You can tell they choose beans carefully and extract them perfectly.',
        rating: 5,
        date: '2 weeks ago',
      },
      {
        name: 'Martin L.',
        text: 'I come every morning before work. The Flat White is my religion. The atmosphere makes you want to stay all afternoon.',
        rating: 5,
        date: '1 month ago',
      },
      {
        name: 'Camila S.',
        text: 'My partner brought me for the Cold Brew and now we are regulars. The tiramisu is next-level and truly homemade.',
        rating: 5,
        date: '3 weeks ago',
      },
      {
        name: 'Andres P.',
        text: 'I work remotely and this is my place. Fast Wi-Fi, power outlets, excellent coffee, and a calm vibe you rarely find.',
        rating: 5,
        date: '2 months ago',
      },
      {
        name: 'Sofia M.',
        text: 'I discovered Aroma Vivo on Google Maps and the photos do not lie. Coffee quality and service exceed expectations.',
        rating: 5,
        date: '1 week ago',
      },
      {
        name: 'Diego H.',
        text: 'Baristas who truly know their craft. They explained each bean origin and recommended drinks based on my taste.',
        rating: 5,
        date: '1 month ago',
      },
    ],
  },

  team: {
    sectionLabel: 'Who We Are',
    headlineLine1: 'Hands that',
    headlineLine2Italic: 'craft magic',
    decorativeWord: 'team',
    members: [
      {
        name: 'Lucas Fernandez',
        role: 'Head Barista & Founder',
        bio: 'Former national latte art champion with 10 years in specialty coffee.',
        initials: 'LF',
        color: '#4a3b32',
      },
      {
        name: 'Martina Lopez',
        role: 'Senior Barista',
        bio: 'Extraction and cold brew specialist with a highly trained palate.',
        initials: 'ML',
        color: '#6F4E37',
      },
      {
        name: 'Santiago Ruiz',
        role: 'Roaster',
        bio: 'A slow-fire craftsman who treats each roast profile like a piece of art.',
        initials: 'SR',
        color: '#5D4037',
      },
    ],
  },

  location: {
    sectionLabel: 'Visit Us',
    headlineLine1: 'We are ready',
    headlineLine2Italic: 'with your cup',
    intro:
      'Come and meet us. Whether you need a quick espresso or a quiet reading afternoon, we have the right spot for you.',
    addressLabel: 'Address',
    addressLines: ['Av. del Libertador 2840,', 'Palermo, Buenos Aires'],
    hoursLabel: 'Opening Hours',
    hours: [
      { day: 'Monday - Friday', time: '07:00 - 20:00' },
      { day: 'Saturday', time: '08:00 - 21:00' },
      { day: 'Sunday', time: '09:00 - 18:00' },
    ],
    contactLabel: 'Contact',
    phone: '+54 11 4567-8901',
    mapCardTitle: 'Aroma Vivo',
    mapCardSubtitle: 'Palermo, Buenos Aires',
    mapStreetLabels: {
      top: 'Av. Libertador',
      mid: 'Av. Cnel. Diaz',
      vertical: 'C. Olleros',
    },
  },

  footer: {
    navTitle: 'Navigation',
    followTitle: 'Follow Us',
    navLinks: [
      { label: 'Essence', href: '#philosophy' },
      { label: 'Menu', href: '#menu' },
      { label: 'Ambience', href: '#ambience' },
      { label: 'Visit Us', href: '#location' },
    ],
    socialLinks: [
      { platform: 'instagram', href: '#', label: 'Instagram' },
      { platform: 'facebook', href: '#', label: 'Facebook' },
    ],
    socialHandle: '@aromavivocafe',
    copyrightSuffix: 'All rights reserved.',
    craftedLine: 'Crafted with care in Buenos Aires',
  },

  assets: {
    heroBackground: '/images/hero-bg.jpg',
    preloadHeroImage: true,
  },
};
