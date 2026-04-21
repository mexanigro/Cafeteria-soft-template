export type TemplateMenuCategory = 'todos' | 'calientes' | 'frios' | 'postres';

export type TemplateMenuItem = {
  id: number;
  name: string;
  category: Exclude<TemplateMenuCategory, 'todos'>;
  price: string;
  description: string;
  color: string;
};

export type TemplateCategoryFilter = {
  key: TemplateMenuCategory;
  label: string;
};

export const templateConfig = {
  hero: {
    badge: 'Desde 2024 · Tostado Artesanal',
    title: 'Aroma Vivo',
    description: 'Cada taza cuenta una historia. Deja que el cafe te hable antes del primer sorbo.',
    ctaLabel: 'Descubri el Menu',
    ctaHref: '#menu',
    palette: {
      background: '#1a0f0a',
      textMain: '#F5E6D3',
      textAccent: '#D4A574',
      ctaHoverText: '#2C1810',
    },
  },
  menu: {
    sectionId: 'menu',
    eyebrow: 'Nuestra Carta',
    titlePrefix: 'Sabores que',
    titleAccent: 'perduran',
    description: 'Cada bebida es una ceremonia. Cada postre, un cierre perfecto.',
    addToOrderLabel: 'Agregar al pedido',
    emptyState: 'No hay items en esta categoria.',
    colors: {
      background: '#F5E6D3',
      heading: '#2C1810',
      textMuted: '#6F4E37',
      cardBg: '#2C1810',
      cardBorder: '#3E2723',
      cardText: '#F5E6D3',
      cardAccent: '#D4A574',
      cardSubtext: '#8D6E63',
    },
    categories: [
      { key: 'todos', label: 'Todo' },
      { key: 'calientes', label: 'Calientes' },
      { key: 'frios', label: 'Frios' },
      { key: 'postres', label: 'Postres' },
    ] satisfies TemplateCategoryFilter[],
    items: [
      {
        id: 1,
        name: 'Espresso Clasico',
        category: 'calientes',
        price: '$3.50',
        description: 'Intenso, cremoso y con cuerpo. El alma del cafe.',
        color: '#3E2723',
      },
      {
        id: 2,
        name: 'Cappuccino Soft',
        category: 'calientes',
        price: '$4.20',
        description: 'Espuma de nube sobre espresso doble.',
        color: '#6F4E37',
      },
      {
        id: 3,
        name: 'Cold Brew',
        category: 'frios',
        price: '$4.50',
        description: '12 horas de extraccion fria. Suave y dulce.',
        color: '#4E342E',
      },
      {
        id: 4,
        name: 'Flat White',
        category: 'calientes',
        price: '$4.00',
        description: 'Microespuma sedosa sobre doble ristretto.',
        color: '#5D4037',
      },
      {
        id: 5,
        name: 'Iced Latte',
        category: 'frios',
        price: '$4.80',
        description: 'Hielo, leche cremosa y espresso balanceado.',
        color: '#8D6E63',
      },
      {
        id: 6,
        name: 'Tiramisu Casero',
        category: 'postres',
        price: '$5.50',
        description: 'Capas de cafe, mascarpone y cacao.',
        color: '#3E2723',
      },
      {
        id: 7,
        name: 'Cheesecake de Caramelo',
        category: 'postres',
        price: '$5.00',
        description: 'Base de galleta, queso y salsa de caramelo salado.',
        color: '#6F4E37',
      },
      {
        id: 8,
        name: 'Frappe Moka',
        category: 'frios',
        price: '$5.20',
        description: 'Batido de cafe, chocolate y crema montada.',
        color: '#4E342E',
      },
    ] satisfies TemplateMenuItem[],
  },
} as const;
