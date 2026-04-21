import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Valentina R.',
    text: 'El mejor espresso que probe en Buenos Aires. Se nota que eligen los granos con cuidado y saben exactamente como extraerlos.',
    rating: 5,
    date: 'Hace 2 semanas',
  },
  {
    name: 'Martin L.',
    text: 'Vengo todas las mananas antes del trabajo. El Flat White es mi religion. El ambiente te hace querer quedarte toda la tarde.',
    rating: 5,
    date: 'Hace 1 mes',
  },
  {
    name: 'Camila S.',
    text: 'Mi novio me trajo por el Cold Brew y ahora somos clientes fijos. El tiramisu es otro nivel, casero de verdad.',
    rating: 5,
    date: 'Hace 3 semanas',
  },
  {
    name: 'Andres P.',
    text: 'Trabajo remoto y este es mi lugar. WiFi rapido, enchufes, cafe de primera y un silencio comodo que no se consigue en otro lado.',
    rating: 5,
    date: 'Hace 2 meses',
  },
  {
    name: 'Sofia M.',
    text: 'Descubri Aroma Vivo por Google Maps y las fotos no mienten. La calidad del cafe y la atencion superan todo.',
    rating: 5,
    date: 'Hace 1 semana',
  },
  {
    name: 'Diego H.',
    text: 'Baristas que saben de verdad. Me explicaron el origen de cada grano y me recomendaron segun mi gusto. Experiencia top.',
    rating: 5,
    date: 'Hace 1 mes',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.testimonial-card');
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative bg-cream py-32 md:py-44 px-6 md:px-10 overflow-hidden"
    >
      {/* Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto mb-16 md:mb-24 opacity-0">
        <p className="text-xs tracking-[6px] uppercase text-stone mb-6">
          Opiniones
        </p>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2 className="font-serif text-4xl md:text-6xl text-espresso leading-[1.1]">
            Lo que dice
            <br />
            <span className="italic text-caramel">la gente</span>
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-caramel text-caramel" />
              ))}
            </div>
            <span className="text-stone text-sm">4.9 en Google Maps</span>
          </div>
        </div>
      </div>

      {/* Testimonials Grid — masonry-like */}
      <div
        ref={cardsRef}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {testimonials.map((t, i) => (
          <div
            key={i}
            className={`testimonial-card group p-6 md:p-8 rounded-2xl border border-espresso/5 bg-white/50 backdrop-blur-sm hover:border-caramel/20 hover:bg-white/80 transition-all duration-500 opacity-0 ${
              i === 0 || i === 3 ? 'lg:mt-8' : ''
            }`}
          >
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(t.rating)].map((_, si) => (
                <Star key={si} className="w-3.5 h-3.5 fill-caramel text-caramel" />
              ))}
            </div>

            {/* Quote */}
            <p className="text-espresso leading-relaxed mb-6 text-balance">
              &ldquo;{t.text}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center justify-between">
              <span className="font-serif text-espresso">{t.name}</span>
              <span className="text-stone text-xs">{t.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
