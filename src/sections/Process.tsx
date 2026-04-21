import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Seleccion',
    desc: 'Elegimos granos de las mejores fincas de Colombia, Etiopia y Brasil. Solo el top 1% pasa nuestro filtro de calidad.',
  },
  {
    number: '02',
    title: 'Tueste Artesanal',
    desc: 'Cada lote se tuesta a mano en nuestra tostadora Probat, monitoreando temperatura y tiempo al segundo.',
  },
  {
    number: '03',
    title: 'Reposo Controlado',
    desc: 'Los granos descansan 48 horas en bodega climatizada para que los aceites se estabilicen y los sabores se concentren.',
  },
  {
    number: '04',
    title: 'Extraccion Perfecta',
    desc: 'Nuestros baristas calibran cada variable — temperatura, molienda, presion — para extraer lo mejor de cada origen.',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal
      gsap.fromTo(
        imageRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content reveal
      gsap.fromTo(
        contentRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Steps stagger
      if (contentRef.current) {
        const items = contentRef.current.querySelectorAll('.step-item');
        gsap.fromTo(
          items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
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
      id="process"
      ref={sectionRef}
      className="relative bg-mocha py-32 md:py-44 px-6 md:px-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image side */}
        <div ref={imageRef} className="relative opacity-0">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
            <img
              src="/images/process-roast.jpg"
              alt="Proceso de tostado de cafe"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-mocha/60 via-transparent to-transparent" />
            
            {/* Floating badge */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-mocha/80 backdrop-blur-sm rounded-xl px-5 py-4 border border-latte/10">
                <p className="text-latte font-serif text-lg">Tueste en pequenos lotes</p>
                <p className="text-latte/50 text-sm mt-1">Control artesanal de cada etapa</p>
              </div>
            </div>
          </div>

          {/* Decorative corner */}
          <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-caramel/20 rounded-tl-3xl pointer-events-none" />
        </div>

        {/* Content side */}
        <div ref={contentRef} className="opacity-0">
          <p className="text-xs tracking-[6px] uppercase text-caramel mb-6">
            De la Finca a tu Taza
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-latte leading-[1.1] mb-6">
            Un proceso
            <br />
            <span className="italic text-caramel">consciente</span>
          </h2>
          <p className="text-latte/60 text-lg leading-relaxed mb-12 max-w-md">
            No es solo cafe. Es una cadena de decisiones deliberadas que 
            respetan el grano, al agricultor, y a quien lo bebe.
          </p>

          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.number} className="step-item flex gap-5 group opacity-0">
                <span className="text-caramel/30 font-serif text-3xl group-hover:text-caramel/60 transition-colors duration-300 flex-shrink-0 w-12">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-serif text-xl text-latte mb-2 group-hover:text-caramel transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-latte/50 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
