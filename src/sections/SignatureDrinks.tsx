import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const drinks = [
  {
    name: 'Espresso Clasico',
    subtitle: 'El alma pura',
    desc: 'Intenso, cremoso y con cuerpo. Doble extraccion que revela todo el caracter del grano.',
    color: '#3E2723',
  },
  {
    name: 'Cappuccino Soft',
    subtitle: 'Nube de espuma',
    desc: 'Espuma sedosa sobre espresso doble, con microburbujas que derriten en el paladar.',
    color: '#6F4E37',
  },
  {
    name: 'Flat White',
    subtitle: 'Seda liquida',
    desc: 'Microespuma perfecta sobre doble ristretto. La bebida favorita de los puristas.',
    color: '#5D4037',
  },
  {
    name: 'Cold Brew',
    subtitle: 'Paciencia helada',
    desc: 'Doce horas de extraccion fria. Suave, dulce y refrescante como ninguno.',
    color: '#4E342E',
  },
];

export default function SignatureDrinks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
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

      // Cards with parallax stagger
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        const direction = i % 2 === 0 ? -40 : 40;

        gsap.fromTo(
          card,
          { x: direction, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Subtle parallax on scroll
        gsap.to(card.querySelector('.card-image'), {
          y: -30,
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="signature"
      ref={sectionRef}
      className="relative bg-mocha py-32 md:py-44 px-6 md:px-10 overflow-hidden"
    >
      {/* Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto mb-20 md:mb-28 opacity-0">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-xs tracking-[6px] uppercase text-caramel mb-6">
              Nuestra Carta
            </p>
            <h2 className="font-serif text-4xl md:text-6xl text-latte leading-[1.1]">
              Firmas de
              <br />
              <span className="italic text-caramel">autor</span>
            </h2>
          </div>
          <p className="text-latte/60 max-w-sm text-lg leading-relaxed">
            Cuatro preparaciones que definen nuestra identidad. Cada una es una 
            carta de amor al cafe bien hecho.
          </p>
        </div>

        {/* Decorative line */}
        <div className="mt-12 h-px bg-latte/10 relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-1/3 bg-caramel/30" />
        </div>
      </div>

      {/* Drinks grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {drinks.map((drink, i) => (
          <div
            key={drink.name}
            ref={(el) => { cardsRef.current[i] = el; }}
            className="group relative opacity-0"
          >
            <div className="relative overflow-hidden rounded-2xl bg-espresso/30 border border-latte/5 transition-all duration-700 hover:border-latte/20">
              {/* Image placeholder with color */}
              <div
                className="card-image relative h-64 md:h-80 flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: drink.color }}
              >
                {/* Abstract pattern */}
                <div className="absolute inset-0 opacity-20">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern
                        id={`pattern-${i}`}
                        x="0"
                        y="0"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                      >
                        <circle cx="20" cy="20" r="1" fill="currentColor" className="text-latte" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#pattern-${i})`} />
                  </svg>
                </div>

                {/* Drink name overlay */}
                <div className="relative z-10 text-center px-6">
                  <span className="font-serif text-latte/90 text-3xl md:text-4xl italic">
                    {drink.name.split(' ')[0]}
                  </span>
                  <span className="block font-sans text-latte/50 text-sm tracking-[4px] uppercase mt-2">
                    {drink.name.split(' ').slice(1).join(' ')}
                  </span>
                </div>

                {/* Hover gradient */}
                <div className="absolute inset-0 bg-caramel/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-3">
                  <h3 className="font-serif text-xl md:text-2xl text-latte">
                    {drink.name}
                  </h3>
                  <span className="text-xs tracking-[3px] uppercase text-caramel/60 border border-caramel/20 px-3 py-1 rounded-full">
                    {drink.subtitle}
                  </span>
                </div>
                <p className="text-latte/50 leading-relaxed">
                  {drink.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Side decorative element */}
      <div className="absolute top-1/2 -right-32 -translate-y-1/2 text-[15rem] font-serif text-latte/[0.015] leading-none pointer-events-none select-none rotate-90">
        signature
      </div>
    </section>
  );
}
