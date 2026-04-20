/** Site-wide copy, menu data, media URLs, and AI prompt templates. */

export type MenuItem = {
  name: string;
  desc: string;
  price: string;
  img: string;
};

export type MenuCategory = {
  category: string;
  items: MenuItem[];
};

export type FeatureIcon = 'coffee' | 'leaf' | 'wind';

export type Feature = {
  icon: FeatureIcon;
  title: string;
  desc: string;
};

export type SocialLink = {
  label: string;
  href: string;
  network: 'instagram' | 'facebook';
};

export type HourRow = {
  label: string;
  hours: string;
};

export const site = {
  brand: {
    name: 'Oat & Bean',
    taglineEst: 'Est. 2024 • Organic & Ethically Sourced',
  },
  nav: {
    menu: 'Menu',
    vibe: 'Vibe',
    visit: 'Visit',
    orderAhead: 'Order Ahead',
  },
  hero: {
    headlineLine1: 'Sip, Savor,',
    headlineLine2Italic: 'Stay.',
    subhead:
      'Handcrafted coffee and organic ceremonial matcha served in a space designed for slow mornings and creative flow.',
    primaryCta: 'View Menu',
    secondaryCta: 'Our Story',
    vibeAnchor: '#vibe',
  },
  theVibe: {
    sectionTitle: 'Why Oat & Bean?',
    features: [
      {
        icon: 'coffee' as const,
        title: 'Specialty Roasts',
        desc: 'Small-batch beans roasted locally and brewed with scientific precision.',
      },
      {
        icon: 'leaf' as const,
        title: 'Artisan Pastries',
        desc: 'Seasonal treats baked fresh daily with organic, locally-sourced ingredients.',
      },
      {
        icon: 'wind' as const,
        title: 'Cozy Atmosphere',
        desc: 'Thoughtfully designed seating with soft lighting and acoustic soundscapes.',
      },
    ] satisfies Feature[],
  },
  menuSection: {
    id: 'menu',
    title: 'Our Seasonal Menu',
    subtitle: 'Carefully curated drinks for the mindful drinker.',
    fullMenuCta: 'Full Menu',
    categoryLabels: ['01', '02'] as const,
    categoryTitles: ['Espresso Bar', 'Matcha & Tea'] as const,
  },
  drinkConcierge: {
    title: 'The AI Concierge',
    description: "Not sure what to get? Tell me how you're feeling.",
    inputPlaceholder: "e.g. 'I need something cozy and sweet'",
    askLabel: 'Ask',
  },
  gallery: {
    title: 'Moments Captured',
    subtitle: 'Follow our journey @oatandbean',
    quote: 'The softest start to your day.',
  },
  fullMenu: {
    pageTitle: 'Oat & Bean Complete Menu',
    backLabel: 'Back to Home',
    collectionTitle: 'The Collection',
    collectionIntro:
      'Explore our full, meticulously crafted selection of specialty beverages and artisan pastries. Every item holds a story.',
    footerVisitTitle: 'Visit Oat & Bean',
    footerVisitBlurb:
      "We're located in the heart of the design district. Come in for the coffee, stay for the calm.",
    copyrightSuffix: 'Oat & Bean Specialty Coffee. Handcrafted by Design.',
    scrollToTopBrand: 'Oat & Bean',
  },
  footer: {
    visitTitle: 'Visit Oat & Bean',
    blurb:
      "We're located in the heart of the design district. Come in for the coffee, stay for the calm.",
    hoursHeading: 'Hours',
    locationHeading: 'Location',
    addressLines: ['124 Aesthetic Ave.', 'Soft Palette District', 'Portland, OR 97201'],
    mapEmbedSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.5397444264627!2d-122.68413128444086!3d45.52345107910167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54950a03bb38e1df%3A0xc6c764fa58f8b340!2sPearl%20District%2C%20Portland%2C%20OR!5e0!3m2!1sen!2sus!4v1683134375051!5m2!1sen!2sus',
    hours: [
      { label: 'Mon - Fri', hours: '7am - 6pm' },
      { label: 'Sat - Sun', hours: '8am - 5pm' },
    ] satisfies HourRow[],
    social: [
      { label: 'Instagram', href: '#', network: 'instagram' },
      { label: 'Facebook', href: '#', network: 'facebook' },
    ] satisfies SocialLink[],
  },
  orderModal: {
    title: 'Order Ahead',
    body: 'Our quick-order system is currently brewing! Enter your email to be the first to know when it launches.',
    emailPlaceholder: 'your@email.com',
    submitLabel: 'Notify Me',
    successTitle: "You're on the list!",
    successBody: "We'll let you know soon.",
  },
  chatbot: {
    title: 'Oat & Bean Chat',
    poweredBy: 'Powered by Gemini',
    initialMessage:
      "Hi! I'm your Oat & Bean virtual barista. Any questions about our coffee or pastries?",
    inputPlaceholder: 'Ask a barista...',
    typingLabel: 'Typing...',
    badgeCount: '1',
    errorMessage: "Oops, my coffee machine is acting up. Could you try again?",
    offlineMessage:
      'Chat is offline until a Gemini API key is configured. Visit us in person—we would love to help!',
  },
  ai: {
    conciergeFallback:
      "I'd recommend our Vanilla Bean Flat White to soothe the soul.",
    conciergeEmptyFallback:
      "Hmm, I'd definitely recommend our Classic Oat Milk Latte today.",
    buildConciergePrompt: (userInput: string) =>
      `You are a friendly barista at 'Oat & Bean', a specialty coffee shop with a soft pastel aesthetic. 
Our menu:
- Espresso Bar: Oat Milk Latte, Vanilla Bean Flat White, Cortado, Honey Lavender Latte, Seasonal Cold Brew.
- Matcha & Tea: Ceremonial Matcha Latte, Iced Strawberry Matcha, Rose Petal Herbal Tea, Hojicha Roasted Latte, Earl Grey Fog.

Customer says: "${userInput}"
Respond with a very brief (1-2 sentences), friendly suggestion recommending exactly ONE specific drink from our menu that best fits their mood. Keep the tone warm, organic, and calm. Do not output markdown, just plain text.`,
    chatSystemInstruction:
      'You are the AI assistant for Oat & Bean, a soft pastel aesthetic specialty coffee shop. Keep responses short, warm, and helpful. Plain text only, no markdown.',
    chatGenericReply: 'Good question! But I need a little more detail.',
  },
  images: {
    hero: 'https://images.unsplash.com/photo-1510970174660-c1950427163f?auto=format&fit=crop&q=80&w=800',
    matcha: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&q=80&w=800',
    pastry: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800',
    interior: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800',
    latte: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?auto=format&fit=crop&q=80&w=800',
    vibes: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800',
  },
  fullMenuData: [
    {
      category: 'Espresso Bar',
      items: [
        {
          name: 'Oat Milk Latte',
          desc: 'Our signature smooth espresso with organic steamed oat milk.',
          price: '5.50',
          img: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?auto=format&fit=crop&q=80&w=300',
        },
        {
          name: 'Vanilla Bean Flat White',
          desc: 'Double ristretto over silky micro-foam with real Madagascar vanilla.',
          price: '5.75',
          img: 'https://images.unsplash.com/photo-1589396575653-c09c794f6f25?auto=format&fit=crop&q=80&w=300',
        },
        {
          name: 'Cortado',
          desc: 'Equal parts espresso and steamed milk for a robust, balanced cup.',
          price: '4.25',
          img: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&q=80&w=300',
        },
        {
          name: 'Honey Lavender Latte',
          desc: 'Warm floral notes sweetened with locally sourced wildflower honey.',
          price: '6.25',
          img: 'https://images.unsplash.com/photo-1558220822-48a0429f62c0?auto=format&fit=crop&q=80&w=300',
        },
        {
          name: 'Seasonal Cold Brew',
          desc: 'Slow-steeped 18 hours for a remarkably smooth, low-acid finish.',
          price: '5.00',
          img: 'https://images.unsplash.com/photo-1499961024600-ad094db6050f?auto=format&fit=crop&q=80&w=300',
        },
      ],
    },
    {
      category: 'Matcha & Tea',
      items: [
        {
          name: 'Ceremonial Matcha Latte',
          desc: 'First-harvest shade-grown matcha from Uji, Japan whisked to perfection.',
          price: '6.50',
          img: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&q=80&w=300',
        },
        {
          name: 'Iced Strawberry Matcha',
          desc: 'Vibrant matcha layered over house-made strawberry puree and oat milk.',
          price: '7.25',
          img: 'https://images.unsplash.com/photo-1536622204907-285b7b9cb03f?auto=format&fit=crop&q=80&w=300',
        },
        {
          name: 'Rose Petal Herbal Tea',
          desc: 'A delicate, caffeine-free infusion of organic rose petals and chamomile.',
          price: '4.50',
          img: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?auto=format&fit=crop&q=80&w=300',
        },
        {
          name: 'Hojicha Roasted Latte',
          desc: 'Deep, naturally sweet flavors from roasted green tea leaves.',
          price: '6.00',
          img: 'https://images.unsplash.com/photo-1606791405788-b22e11e86a07?auto=format&fit=crop&q=80&w=300',
        },
        {
          name: 'Earl Grey Fog',
          desc: 'Classic bergamot black tea smoothed out with steamed milk and vanilla.',
          price: '5.50',
          img: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=300',
        },
      ],
    },
    {
      category: 'Artisan Pastries',
      items: [
        {
          name: 'Matcha Croissant',
          desc: 'Flaky, buttery layers filled with a rich white-chocolate matcha cream.',
          price: '4.75',
          img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=300',
        },
        {
          name: 'Raspberry Pistachio Tart',
          desc: 'Almond frangipane, fresh berries, and crushed pistachios.',
          price: '6.50',
          img: 'https://images.unsplash.com/photo-1501438234857-418a09cf3dc2?auto=format&fit=crop&q=80&w=300',
        },
        {
          name: 'Cardamom Bun',
          desc: 'A soft, fragrant Swedish-style knot glazed with pearl sugar.',
          price: '4.50',
          img: 'https://images.unsplash.com/photo-1621236378699-8597faa6a01e?auto=format&fit=crop&q=80&w=300',
        },
        {
          name: 'Vegan Lemon Loaf',
          desc: 'Moist, zesty, and topped with a thickly-poured icing glaze.',
          price: '3.75',
          img: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&q=80&w=300',
        },
      ],
    },
    {
      category: 'Signature Toasts',
      items: [
        {
          name: 'Avocado & Microgreens',
          desc: 'Smashed avocado, radish, toasted seeds, and micro-cilantro on thick-cut sourdough.',
          price: '9.50',
          img: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&q=80&w=300',
        },
        {
          name: 'Ricotta & Fig',
          desc: 'Whipped lemon ricotta, sliced seasonal figs, and a drizzle of local hot honey.',
          price: '10.00',
          img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=300',
        },
        {
          name: 'Smoked Salmon & Dill',
          desc: 'Cold-smoked salmon, herb cream cheese, pickled onions, and fresh dill.',
          price: '12.50',
          img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=300',
        },
      ],
    },
    {
      category: 'Cold Pressed Wellness',
      items: [
        {
          name: 'The Morning Glow',
          desc: 'Carrot, orange, ginger, and a hint of turmeric.',
          price: '8.00',
          img: 'https://images.unsplash.com/photo-1600271886742-f049cd451b62?auto=format&fit=crop&q=80&w=300',
        },
        {
          name: 'Green Reset',
          desc: 'Cucumber, celery, green apple, spinach, and lemon.',
          price: '8.50',
          img: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=300',
        },
      ],
    },
  ] satisfies MenuCategory[],
} as const;

export function getEspressoPreviewItems() {
  const cat = site.fullMenuData[0];
  return cat.items.map((i) => ({ name: i.name, price: i.price }));
}

export function getMatchaPreviewItems() {
  const cat = site.fullMenuData[1];
  return cat.items.map((i) => ({ name: i.name, price: i.price }));
}
