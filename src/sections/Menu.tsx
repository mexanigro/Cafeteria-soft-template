import { useMemo, useState } from 'react';
import { siteConfig } from '@/src/config/site';

export default function MenuSection() {
  const { menu } = siteConfig;
  const categories = menu.categories;
  type CatKey = (typeof categories)[number]['key'];

  const [activeCategory, setActiveCategory] = useState<CatKey>('all');

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return menu.items;
    return menu.items.filter((item) => item.category === activeCategory);
  }, [activeCategory, menu.items]);

  const categoryBadgeLabel = (categoryKey: string) =>
    categories.find((c) => c.key === categoryKey)?.label ?? categoryKey;

  return (
    <section
      id="menu"
      data-defer-render="true"
      className="relative py-32 md:py-44 px-6 md:px-10"
      style={{ backgroundColor: menu.backgroundColor }}
    >
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <p className="text-xs tracking-[6px] uppercase text-stone mb-6">{menu.sectionLabel}</p>
            <h2 className="font-serif text-4xl md:text-6xl text-espresso leading-[1.1]">
              {menu.headlineLine1}
              <br />
              <span className="italic text-caramel">{menu.headlineLine2Italic}</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
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
          <div key={item.id} className="menu-card group cursor-pointer">
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
                    {categoryBadgeLabel(item.category)}
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
              <p className="text-xs tracking-[3px] uppercase text-caramel mb-3">{item.subtitle}</p>
              <p className="text-stone text-sm leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-20 text-stone">
          <p className="text-lg font-serif italic">{menu.emptyCategoryMessage}</p>
        </div>
      )}

      <div className="absolute -bottom-16 -right-8 text-[18rem] font-serif text-espresso/[0.015] leading-none pointer-events-none select-none">
        {menu.decorativeWord}
      </div>
    </section>
  );
}
