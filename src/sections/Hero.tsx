import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance (after splash)
      const tl = gsap.timeline({ delay: 0.3 });

      // Title character reveal
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll('.char');
        tl.fromTo(
          chars,
          { y: '100%', rotate: 5, opacity: 0 },
          {
            y: '0%',
            rotate: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.04,
            ease: 'power3.out',
          },
          0
        );
      }

      tl.fromTo(
        taglineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        0.5
      );

      tl.fromTo(
        decorRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: 'power3.inOut' },
        0.4
      );

      // SCROLL: Content fades and lifts while image stays fixed
      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '60% top',
          scrub: 1,
        },
        y: -80,
        opacity: 0,
        ease: 'none',
      });

      // Overlay darkens on scroll
      gsap.to(overlayRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        backgroundColor: 'rgba(26, 15, 10, 0.85)',
        ease: 'none',
      });

      // HIDE fixed background after hero scrolls out
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'bottom top',
        onEnter: () => {
          if (bgRef.current) bgRef.current.style.visibility = 'hidden';
          if (overlayRef.current) overlayRef.current.style.visibility = 'hidden';
        },
        onLeaveBack: () => {
          if (bgRef.current) bgRef.current.style.visibility = 'visible';
          if (overlayRef.current) overlayRef.current.style.visibility = 'visible';
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToMenu = () => {
    const el = document.querySelector('#menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* FIXED BACKGROUND IMAGE */}
      <div
        ref={bgRef}
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />

      {/* Dark overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[1]"
        style={{ backgroundColor: 'rgba(26, 15, 10, 0.55)' }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <p
          ref={taglineRef}
          className="text-xs md:text-sm tracking-[8px] uppercase text-caramel mb-8 opacity-0"
        >
          Desde 2024 · Tostado Artesanal
        </p>

        <h1
          ref={titleRef}
          className="font-serif text-latte mb-8 leading-[0.9] overflow-hidden"
        >
          <span className="block text-[clamp(4rem,15vw,12rem)]">
            {'Aroma'.split('').map((char, i) => (
              <span key={i} className="char inline-block opacity-0">
                {char}
              </span>
            ))}
          </span>
          <span className="block text-[clamp(4rem,15vw,12rem)] italic text-caramel">
            {'Vivo'.split('').map((char, i) => (
              <span key={i} className="char inline-block opacity-0">
                {char}
              </span>
            ))}
          </span>
        </h1>

        <div
          ref={decorRef}
          className="w-16 h-px bg-caramel/50 mx-auto mb-8 origin-left"
          style={{ transform: 'scaleX(0)' }}
        />

        <p className="text-base md:text-xl text-latte/70 max-w-lg mx-auto leading-relaxed mb-10">
          Cada taza cuenta una historia. Deja que el cafe te hable antes del primer sorbo.
        </p>

        <button
          onClick={scrollToMenu}
          className="group relative inline-flex items-center gap-3 text-xs tracking-[4px] uppercase text-latte/80 hover:text-caramel transition-colors duration-500"
        >
          <span>Descubri nuestra carta</span>
          <svg
            className="w-4 h-4 transition-transform duration-500 group-hover:translate-y-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      </div>

      {/* Corner frames */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-latte/10 z-10" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-latte/10 z-10" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-latte/10 z-10" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-latte/10 z-10" />

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-cream to-transparent z-10" />
    </section>
  );
}
