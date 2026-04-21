import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    number: '01',
    title: 'Origen',
    desc: 'Seleccionamos granos de fincas sostenibles en latitudes perfectas, donde la altitud y el clima se conjugan para crear perfiles unicos.',
  },
  {
    number: '02',
    title: 'Tueste',
    desc: 'Cada lote se tuesta a mano en pequenos batches, respetando el caracter propio de cada origen sin prisa ni atajos.',
  },
  {
    number: '03',
    title: 'Extraccion',
    desc: 'Nuestros baristas dominan el arte y la ciencia de la extraccion, buscando el equilibrio exacto entre dulzura, acidez y cuerpo.',
  },
];

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section entrance line
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Headline reveal
      gsap.fromTo(
        headlineRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Body text
      gsap.fromTo(
        bodyRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bodyRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Pillars staggered
      if (pillarsRef.current) {
        const items = pillarsRef.current.querySelectorAll('.pillar');
        gsap.fromTo(
          items,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: pillarsRef.current,
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
      id="philosophy"
      ref={sectionRef}
      className="relative bg-cream py-32 md:py-44 px-6 md:px-10 overflow-hidden"
    >
      {/* Vertical decorative line */}
      <div
        ref={lineRef}
        className="absolute left-1/2 top-0 w-px h-24 bg-caramel/30 origin-top"
        style={{ transform: 'scaleY(0)' }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24 md:mb-32">
          <div>
            <p className="text-xs tracking-[6px] uppercase text-stone mb-6">
              Nuestra Esencia
            </p>
            <h2
              ref={headlineRef}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-espresso leading-[1.1] opacity-0"
            >
              Mas que una taza,
              <br />
              <span className="italic text-caramel">una ceremonia</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p
              ref={bodyRef}
              className="text-lg md:text-xl text-stone leading-relaxed max-w-lg opacity-0"
            >
              Creemos que el cafe es un ritual que merece tiempo, atencion y 
              respeto. Desde el grano hasta tu mesa, cada paso es una decision 
              consciente en busca de la excelencia.
            </p>
          </div>
        </div>

        {/* Pillars */}
        <div
          ref={pillarsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
        >
          {pillars.map((pillar) => (
            <div key={pillar.number} className="pillar group opacity-0">
              <span className="text-caramel/40 font-serif text-5xl md:text-6xl mb-6 block transition-colors duration-500 group-hover:text-caramel/70">
                {pillar.number}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-espresso mb-4">
                {pillar.title}
              </h3>
              <div className="w-8 h-px bg-caramel/30 mb-4 transition-all duration-500 group-hover:w-16 group-hover:bg-caramel" />
              <p className="text-stone leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Background decorative text */}
      <div className="absolute -bottom-20 -right-10 text-[20rem] font-serif text-espresso/[0.02] leading-none pointer-events-none select-none">
        cafe
      </div>
    </section>
  );
}
