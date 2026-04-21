import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const atmosphereNotes = [
  'Madera calida',
  'Luz dorada',
  'Aromas que abrazan',
  'Musica suave',
  'Conversaciones',
  'Silencio comodo',
];

export default function Ambience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
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

      // Gallery images — parallax reveal
      if (galleryRef.current) {
        const images = galleryRef.current.querySelectorAll('.gallery-item');
        images.forEach((img, i) => {
          gsap.fromTo(
            img,
            { y: 60 + i * 20, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: img,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
            }
          );

          // Parallax
          gsap.to(img, {
            y: -40,
            scrollTrigger: {
              trigger: img,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          });
        });
      }

      // Text block
      gsap.fromTo(
        textRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Atmosphere notes stagger
      if (textRef.current) {
        const notes = textRef.current.querySelectorAll('.atmosphere-note');
        gsap.fromTo(
          notes,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: textRef.current,
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
      id="ambience"
      ref={sectionRef}
      className="relative bg-cream py-32 md:py-44 px-6 md:px-10 overflow-hidden"
    >
      {/* Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto mb-16 md:mb-24 opacity-0">
        <p className="text-xs tracking-[6px] uppercase text-stone mb-6">
          El Espacio
        </p>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2 className="font-serif text-4xl md:text-6xl text-espresso leading-[1.1]">
            Un refugio para
            <br />
            <span className="italic text-caramel">los sentidos</span>
          </h2>
          <p className="text-stone max-w-md text-lg leading-relaxed">
            Disenado para que cada visita se sienta como un retiro. Maderas 
            nobles, luz natural, y rincones que invitan a quedarse.
          </p>
        </div>
      </div>

      {/* Gallery Grid — asymmetric */}
      <div
        ref={galleryRef}
        className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20 md:mb-28"
      >
        {/* Large left */}
        <div className="gallery-item col-span-2 row-span-2 opacity-0">
          <div className="relative h-full min-h-[300px] md:min-h-[500px] rounded-2xl overflow-hidden bg-matcha group">
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-espresso/40 font-serif text-2xl italic">
              Sala principal
            </div>
            <div className="absolute inset-0 bg-caramel/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        </div>

        {/* Top right */}
        <div className="gallery-item opacity-0">
          <div className="relative h-40 md:h-60 rounded-2xl overflow-hidden bg-blush group">
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/10 to-transparent" />
            <div className="absolute bottom-4 left-4 text-espresso/40 font-serif text-lg italic">
              Barra
            </div>
            <div className="absolute inset-0 bg-caramel/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        </div>

        {/* Top right second */}
        <div className="gallery-item opacity-0">
          <div className="relative h-40 md:h-60 rounded-2xl overflow-hidden bg-stone/20 group">
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/10 to-transparent" />
            <div className="absolute bottom-4 left-4 text-espresso/40 font-serif text-lg italic">
              Detalles
            </div>
            <div className="absolute inset-0 bg-caramel/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        </div>

        {/* Bottom row */}
        <div className="gallery-item col-span-2 opacity-0">
          <div className="relative h-40 md:h-52 rounded-2xl overflow-hidden bg-caramel/20 group">
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/10 to-transparent" />
            <div className="absolute bottom-4 left-4 text-espresso/40 font-serif text-lg italic">
              Rincon de lectura
            </div>
            <div className="absolute inset-0 bg-caramel/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        </div>
      </div>

      {/* Atmosphere notes */}
      <div ref={textRef} className="max-w-7xl mx-auto opacity-0">
        <div className="border-t border-espresso/10 pt-12">
          <p className="text-xs tracking-[6px] uppercase text-stone mb-8">
            Lo que vas a sentir
          </p>
          <div className="flex flex-wrap gap-3">
            {atmosphereNotes.map((note) => (
              <span
                key={note}
                className="atmosphere-note px-5 py-2.5 rounded-full border border-espresso/10 text-espresso text-sm tracking-wide hover:bg-espresso hover:text-cream transition-all duration-500 cursor-default opacity-0"
              >
                {note}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
