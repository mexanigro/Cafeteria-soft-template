import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: 'Lucas Fernandez',
    role: 'Head Barista & Fundador',
    bio: 'Ex campeon nacional de latte art. 10 anos dedicados al cafe de especialidad.',
    initials: 'LF',
    color: '#4a3b32',
  },
  {
    name: 'Martina Lopez',
    role: 'Barista Senior',
    bio: 'Especialista en extracciones y cold brew. Su paladar detecta notas que otros no.',
    initials: 'ML',
    color: '#6F4E37',
  },
  {
    name: 'Santiago Ruiz',
    role: 'Tostador',
    bio: 'Artesano del fuego lento. Controla cada perfil de tueste como si fuera una obra.',
    initials: 'SR',
    color: '#5D4037',
  },
];

export default function Team() {
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
        const cards = cardsRef.current.querySelectorAll('.team-card');
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
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
      id="team"
      ref={sectionRef}
      className="relative bg-mocha py-32 md:py-44 px-6 md:px-10 overflow-hidden"
    >
      {/* Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto mb-16 md:mb-24 opacity-0">
        <p className="text-xs tracking-[6px] uppercase text-caramel mb-6">
          Quienes Somos
        </p>
        <h2 className="font-serif text-4xl md:text-6xl text-latte leading-[1.1]">
          Manos que
          <br />
          <span className="italic text-caramel">crean magia</span>
        </h2>
      </div>

      {/* Team Grid */}
      <div
        ref={cardsRef}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {team.map((member) => (
          <div
            key={member.name}
            className="team-card group text-center opacity-0"
          >
            {/* Avatar placeholder with color */}
            <div
              className="relative w-40 h-40 mx-auto rounded-full mb-8 flex items-center justify-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundColor: member.color }}
            >
              <span className="font-serif text-3xl text-latte/80 italic">
                {member.initials}
              </span>
              {/* Ring */}
              <div className="absolute inset-0 rounded-full border border-caramel/20 group-hover:border-caramel/50 transition-colors duration-500" />
              <div className="absolute -inset-2 rounded-full border border-caramel/10 group-hover:border-caramel/30 transition-colors duration-500" />
            </div>

            <h3 className="font-serif text-2xl text-latte mb-2 group-hover:text-caramel transition-colors duration-300">
              {member.name}
            </h3>
            <p className="text-caramel text-xs tracking-[3px] uppercase mb-4">
              {member.role}
            </p>
            <p className="text-latte/50 text-sm leading-relaxed max-w-xs mx-auto">
              {member.bio}
            </p>
          </div>
        ))}
      </div>

      {/* Decorative */}
      <div className="absolute -bottom-20 -left-20 text-[15rem] font-serif text-latte/[0.015] leading-none pointer-events-none select-none">
        team
      </div>
    </section>
  );
}
