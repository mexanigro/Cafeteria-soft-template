import { useEffect, useRef, useState } from 'react';
import CoffeeWaves from './CoffeeWaves';
import { templateConfig } from '@/src/config/template';

type SteamParticlesProps = {
  count?: number;
};

function SteamParticles({ count = 5 }: SteamParticlesProps) {
  const config = [
    { left: '20%', delay: '0s', size: 60 },
    { left: '40%', delay: '1.5s', size: 80 },
    { left: '60%', delay: '3s', size: 60 },
    { left: '30%', delay: '4.5s', size: 50 },
    { left: '70%', delay: '2s', size: 70 },
  ];

  return (
    <>
      {config.slice(0, count).map((p, i) => (
        <div
          key={i}
          className="absolute bottom-0 rounded-full animate-steam pointer-events-none"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: p.delay,
            background: 'radial-gradient(circle, rgba(245,230,211,0.4) 0%, transparent 70%)',
          }}
        />
      ))}
    </>
  );
}

export default function HeroSection() {
  const hero = templateConfig.hero;
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const steamRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!contentRef.current || !steamRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      contentRef.current.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
      steamRef.current.style.transform = `translateX(calc(-50% + ${x}px))`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      setScrollProgress(progress);
      if (contentRef.current) {
        contentRef.current.style.opacity = String(1 - progress);
        contentRef.current.style.transform = `translateY(${-progress * 50}px)`;
      }
      if (steamRef.current) steamRef.current.style.opacity = String(1 - progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden font-serif"
      style={{ background: hero.palette.background }}
    >
      <style>{`
        @keyframes steam {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          15% { opacity: 0.6; }
          50% { transform: translateY(-150px) translateX(20px) scale(1.5); opacity: 0.3; }
          100% { transform: translateY(-350px) translateX(-30px) scale(2); opacity: 0; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes letterReveal {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollPulse {
          0%, 100% { transform: scaleY(1); opacity: 0.6; }
          50% { transform: scaleY(0.5); opacity: 1; }
        }
        .animate-steam { animation: steam 6s infinite ease-out; }
        .animate-fadeInUp { animation: fadeInUp 1s ease forwards; }
        .animate-letterReveal { animation: letterReveal 0.8s ease forwards; }
        .animate-scrollPulse { animation: scrollPulse 2s infinite; }
      `}</style>

      <CoffeeWaves scrollProgress={scrollProgress} />

      <div
        ref={steamRef}
        className="absolute bottom-[20%] left-1/2 -translate-x-1/2 z-[2] pointer-events-none transition-opacity duration-300 w-[200px] h-[300px] md:w-[300px] md:h-[400px]"
      >
        <SteamParticles count={5} />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 text-center transition-opacity duration-300 will-change-transform px-4"
        style={{ color: hero.palette.textMain }}
      >
        <p
          className="text-xs md:text-sm tracking-[6px] uppercase mb-8 animate-fadeInUp"
          style={{ color: hero.palette.textAccent, animationDelay: '0.5s', opacity: 0 }}
        >
          {hero.badge}
        </p>

        <h1 className="text-[clamp(3rem,8vw,7rem)] leading-none mb-6 font-light">
          {hero.title.split('').map((char, i) => (
            <span
              key={i}
              className="inline-block animate-letterReveal"
              style={{
                animationDelay: `${0.8 + i * 0.1}s`,
                textShadow: '0 4px 30px rgba(212,165,116,0.3)',
                opacity: 0,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        <p
          className="text-base md:text-xl max-w-[500px] mx-auto mb-10 leading-relaxed animate-fadeInUp px-4"
          style={{ color: hero.palette.textAccent, animationDelay: '2s', opacity: 0 }}
        >
          {hero.description}
        </p>

        <a
          href={hero.ctaHref}
          className="relative inline-block px-8 md:px-10 py-3 md:py-4 border text-xs md:text-sm tracking-[3px] uppercase overflow-hidden transition-colors duration-400 z-[1] animate-fadeInUp group"
          style={{
            borderColor: hero.palette.textAccent,
            color: hero.palette.textMain,
            animationDelay: '2.3s',
            opacity: 0,
          }}
        >
          <span
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full transition-all duration-600 group-hover:w-[300px] group-hover:h-[300px] -z-[1]"
            style={{ background: hero.palette.textAccent }}
          />
          <span
            className="relative z-10 transition-colors duration-400"
            style={{ color: hero.palette.textMain }}
          >
            {hero.ctaLabel}
          </span>
        </a>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-fadeInUp"
        style={{ animationDelay: '3s', opacity: 0 }}
      >
        <div
          className="w-px h-[60px] bg-gradient-to-b to-transparent animate-scrollPulse"
          style={{ backgroundImage: `linear-gradient(to bottom, ${hero.palette.textAccent}, transparent)` }}
        />
      </div>
    </section>
  );
}
