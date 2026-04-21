import { useMemo, useState } from 'react';

type MenuCategory = 'all' | 'hot' | 'cold' | 'desserts';

interface MenuItem {
  id: number;
  name: string;
  subtitle: string;
  category: Exclude<MenuCategory, 'all'>;
  description: string;
  image: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Classic Espresso',
    subtitle: 'The pure soul',
    category: 'hot',
    description: 'Intense, creamy, and full-bodied. A double shot that reveals the full character of the bean.',
    image: '/images/menu/espresso.jpg',
  },
  {
    id: 2,
    name: 'Soft Cappuccino',
    subtitle: 'Foam cloud',
    category: 'hot',
    description: 'Silky foam over double espresso, with microbubbles that melt on the palate.',
    image: '/images/menu/cappuccino.jpg',
  },
  {
    id: 3,
    name: 'Flat White',
    subtitle: 'Liquid silk',
    category: 'hot',
    description: 'Perfect microfoam over double ristretto. A favorite among coffee purists.',
    image: '/images/menu/flatwhite.jpg',
  },
  {
    id: 4,
    name: 'Cold Brew',
    subtitle: 'Iced patience',
    category: 'cold',
    description: 'Twelve-hour cold extraction. Smooth, sweet, and refreshingly clean.',
    image: '/images/menu/coldbrew.jpg',
  },
  {
    id: 5,
    name: 'Iced Latte',
    subtitle: 'Ice and passion',
    category: 'cold',
    description: 'Creamy milk and balanced espresso over ice. Perfectly refreshing.',
    image: '/images/menu/icedlatte.jpg',
  },
  {
    id: 6,
    name: 'Frappe Moka',
    subtitle: 'Sweet indulgence',
    category: 'cold',
    description: 'Coffee, chocolate, and whipped cream blended into a dessert-style drink.',
    image: '/images/menu/frappemoka.jpg',
  },
  {
    id: 7,
    name: 'Homemade Tiramisu',
    subtitle: 'Layers of joy',
    category: 'desserts',
    description: 'Layers of coffee, mascarpone, and cocoa. A perfected family recipe.',
    image: '/images/menu/tiramisu.jpg',
  },
  {
    id: 8,
    name: 'Caramel Cheesecake',
    subtitle: 'Sweet balance',
    category: 'desserts',
    description: 'Biscuit base, cream cheese, and salted caramel sauce for a complete dessert experience.',
    image: '/images/menu/cheesecake.jpg',
  },
];

const categories: { key: MenuCategory; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'hot', label: 'Hot' },
  { key: 'cold', label: 'Cold' },
  { key: 'desserts', label: 'Desserts' },
];

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const filteredItems = useMemo(
    () =>
      activeCategory === 'all'
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  return (
    <section
      id="menu"
      data-defer-render="true"
      className="relative py-32 md:py-44 px-6 md:px-10"
      style={{ backgroundColor: 'rgba(253, 251, 247, 0.93)' }}
    >
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <p className="text-xs tracking-[6px] uppercase text-stone mb-6">
              Our Menu
            </p>
            <h2 className="font-serif text-4xl md:text-6xl text-espresso leading-[1.1]">
              Signature
              <br />
              <span className="italic text-caramel">creations</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`
                  relative px-6 py-3 rounded-full text-xs tracking-[3px] uppercase transition-all duration-500 overflow-hidden
                  ${activeCategory === cat.key
                    ? 'bg-espresso text-cream'
                    : 'bg-transparent text-espresso border border-espresso/20 hover:border-espresso/60'
                  }
                `}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 h-px bg-espresso/10 relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-1/4 bg-caramel/40" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="menu-card group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-2xl bg-mocha mb-5">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-mocha/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] tracking-[3px] uppercase text-latte/80 bg-mocha/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-serif text-xl text-espresso group-hover:text-caramel transition-colors duration-300">
                  {item.name}
                </h3>
              </div>
              <p className="text-xs tracking-[3px] uppercase text-caramel mb-3">
                {item.subtitle}
              </p>
              <p className="text-stone text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-20 text-stone">
          <p className="text-lg font-serif italic">No items available in this category.</p>
        </div>
      )}

      <div className="absolute -bottom-16 -right-8 text-[18rem] font-serif text-espresso/[0.015] leading-none pointer-events-none select-none">
        menu
      </div>
    </section>
  );
}
