import { useRef, useState, type MouseEvent } from 'react';
import { templateConfig, type TemplateMenuCategory, type TemplateMenuItem } from '@/src/config/template';

type MenuCardProps = {
  item: TemplateMenuItem;
};

function MenuCard({ item }: MenuCardProps) {
  const menu = templateConfig.menu;
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 12;
    const rotateY = (centerX - x) / 12;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
  };

  return (
    <div
      className="transition-all duration-500 ease-out"
      style={{
        opacity: 1,
        transform: 'translateY(0) scale(1)',
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-2xl p-6 md:p-8 cursor-pointer transition-transform duration-200 ease-out will-change-transform group overflow-hidden h-full"
        style={{ transformStyle: 'preserve-3d', background: menu.colors.cardBg, border: `1px solid ${menu.colors.cardBorder}` }}
      >
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: `0 0 40px ${item.color}20, inset 0 0 60px ${item.color}10` }}
        />

        <div
          className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10 blur-2xl transition-transform duration-500 group-hover:scale-150"
          style={{ background: item.color }}
        />

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <span
              className="text-[10px] tracking-[3px] uppercase px-3 py-1 rounded-full"
              style={{ color: menu.colors.cardSubtext, border: `1px solid ${menu.colors.cardBorder}` }}
            >
              {item.category}
            </span>
            <span className="text-xl font-light" style={{ color: menu.colors.cardAccent }}>{item.price}</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-light mb-3 leading-tight" style={{ color: menu.colors.cardText }}>
            {item.name}
          </h3>

          <p className="text-sm md:text-base leading-relaxed" style={{ color: menu.colors.cardSubtext }}>
            {item.description}
          </p>

          <div
            className="mt-6 flex items-center gap-2 text-xs tracking-[2px] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0"
            style={{ color: menu.colors.cardAccent }}
          >
            <span>{menu.addToOrderLabel}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MenuSection() {
  const menu = templateConfig.menu;
  const [activeCategory, setActiveCategory] = useState<TemplateMenuCategory>('todos');
  const [isAnimating, setIsAnimating] = useState(false);

  const filteredItems =
    activeCategory === 'todos'
      ? menu.items
      : menu.items.filter((item) => item.category === activeCategory);

  const handleCategoryChange = (cat: TemplateMenuCategory) => {
    if (cat === activeCategory) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveCategory(cat);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <section
      id={menu.sectionId}
      className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden"
      style={{ background: menu.colors.background }}
    >
      <style>{`
        @keyframes fadeInUpMenu {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .menu-item-enter {
          animation: fadeInUpMenu 0.5s ease forwards;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[6px] uppercase mb-4" style={{ color: menu.colors.textMuted }}>
            {menu.eyebrow}
          </p>
          <h2 className="text-4xl md:text-6xl font-light mb-6" style={{ color: menu.colors.heading }}>
            {menu.titlePrefix} <span className="italic" style={{ color: menu.colors.textMuted }}>{menu.titleAccent}</span>
          </h2>
          <p className="max-w-xl mx-auto text-base md:text-lg" style={{ color: menu.colors.textMuted }}>
            {menu.description}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {menu.categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => handleCategoryChange(cat.key)}
              className={`
                relative px-6 py-3 rounded-full text-xs tracking-[3px] uppercase transition-all duration-300 overflow-hidden
                ${activeCategory === cat.key
                  ? 'bg-[#2C1810] text-[#F5E6D3]'
                  : 'bg-transparent border hover:opacity-80'
                }
              `}
              style={
                activeCategory === cat.key
                  ? { background: menu.colors.heading, color: menu.colors.background }
                  : { color: menu.colors.heading, borderColor: `${menu.colors.heading}33` }
              }
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div
          className={`
            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-300
            ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
          `}
        >
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="menu-item-enter"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <MenuCard item={item} />
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20" style={{ color: menu.colors.textMuted }}>
            <p className="text-lg">{menu.emptyState}</p>
          </div>
        )}
      </div>
    </section>
  );
}
