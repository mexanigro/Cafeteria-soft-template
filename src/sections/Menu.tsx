import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type MenuCategory = 'todos' | 'calientes' | 'frios' | 'postres';

interface MenuItem {
  id: number;
  name: string;
  subtitle: string;
  category: Exclude<MenuCategory, 'todos'>;
  description: string;
  image: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Espresso Clasico',
    subtitle: 'El alma pura',
    category: 'calientes',
    description: 'Intenso, cremoso y con cuerpo. Doble extraccion que revela todo el caracter del grano.',
    image: '/images/menu/espresso.jpg',
  },
  {
    id: 2,
    name: 'Cappuccino Soft',
    subtitle: 'Nube de espuma',
    category: 'calientes',
    description: 'Espuma sedosa sobre espresso doble, con microburbujas que derriten en el paladar.',
    image: '/images/menu/cappuccino.jpg',
  },
  {
    id: 3,
    name: 'Flat White',
    subtitle: 'Seda liquida',
    category: 'calientes',
    description: 'Microespuma perfecta sobre doble ristretto. La bebida favorita de los puristas.',
    image: '/images/menu/flatwhite.jpg',
  },
  {
    id: 4,
    name: 'Cold Brew',
    subtitle: 'Paciencia helada',
    category: 'frios',
    description: 'Doce horas de extraccion fria. Suave, dulce y refrescante como ninguno.',
    image: '/images/menu/coldbrew.jpg',
  },
  {
    id: 5,
    name: 'Iced Latte',
    subtitle: 'Hielo y pasion',
    category: 'frios',
    description: 'Leche cremosa y espresso balanceado sobre hielo. La refrescancia perfecta.',
    image: '/images/menu/icedlatte.jpg',
  },
  {
    id: 6,
    name: 'Frappe Moka',
    subtitle: 'Dulce indulgencia',
    category: 'frios',
    description: 'Batido de cafe, chocolate y crema montada. Un postre en forma de bebida.',
    image: '/images/menu/frappemoka.jpg',
  },
  {
    id: 7,
    name: 'Tiramisu Casero',
    subtitle: 'Capas de felicidad',
    category: 'postres',
    description: 'Capas de cafe, mascarpone y cacao. Receta de la nona, perfeccionada.',
    image: '/images/menu/tiramisu.jpg',
  },
  {
    id: 8,
    name: 'Cheesecake de Caramelo',
    subtitle: 'Dulce equilibrio',
    category: 'postres',
    description: 'Base de galleta, queso y salsa de caramelo salado. Una experiencia completa.',
    image: '/images/menu/cheesecake.jpg',
  },
];

const categories: { key: MenuCategory; label: string }[] = [
  { key: 'todos', label: 'Todo' },
  { key: 'calientes', label: 'Calientes' },
  { key: 'frios', label: 'Frios' },
  { key: 'postres', label: 'Postres' },
];

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('todos');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredItems =
    activeCategory === 'todos'
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate grid on filter change
  useEffect(() => {
    if (!gridRef.current) return;
    const items = gridRef.current.querySelectorAll('.menu-card');
    gsap.fromTo(
      items,
      { y: 30, opacity: 0, scale: 0.97 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
      }
    );
  }, [activeCategory]);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative bg-cream py-32 md:py-44 px-6 md:px-10"
    >
      {/* Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto mb-16 opacity-0">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <p className="text-xs tracking-[6px] uppercase text-stone mb-6">
              Nuestra Carta
            </p>
            <h2 className="font-serif text-4xl md:text-6xl text-espresso leading-[1.1]">
              Firmas de
              <br />
              <span className="italic text-caramel">autor</span>
            </h2>
          </div>

          {/* Filter tabs */}
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

      {/* Menu Grid */}
      <div
        ref={gridRef}
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="menu-card group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-2xl bg-mocha mb-5">
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-mocha/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] tracking-[3px] uppercase text-latte/80 bg-mocha/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Text content */}
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
          <p className="text-lg font-serif italic">No hay items en esta categoria.</p>
        </div>
      )}

      {/* Decorative background text */}
      <div className="absolute -bottom-16 -right-8 text-[18rem] font-serif text-espresso/[0.015] leading-none pointer-events-none select-none">
        menu
      </div>
    </section>
  );
}
