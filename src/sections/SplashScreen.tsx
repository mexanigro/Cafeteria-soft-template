import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile
    setIsMobile(window.innerWidth < 768);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Exit animation
          gsap.to(containerRef.current, {
            y: '-100%',
            duration: 1,
            ease: 'power3.inOut',
            delay: 0.5,
            onComplete,
          });
        },
      });

      // Brand name — character by character reveal
      if (brandRef.current) {
        const words = brandRef.current.querySelectorAll('.word');
        words.forEach((word, wi) => {
          const chars = word.querySelectorAll('.char');
          tl.fromTo(
            chars,
            {
              y: '120%',
              rotate: 8,
              opacity: 0,
            },
            {
              y: '0%',
              rotate: 0,
              opacity: 1,
              duration: 1.2,
              stagger: 0.05,
              ease: 'power3.out',
            },
            wi * 0.15
          );
        });
      }

      // Decorative line
      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: 'power3.inOut' },
        0.6
      );

      // Line expands then contracts
      tl.to(lineRef.current, {
        scaleX: 0,
        transformOrigin: 'right',
        duration: 0.8,
        ease: 'power3.inOut',
      }, 2.2);

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  const brandWords = ['Aroma', 'Vivo'];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-mocha flex items-center justify-center"
    >
      {/* Subtle gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #D4A574 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      {/* Center content */}
      <div className="relative text-center">
        <div ref={brandRef} className="overflow-hidden">
          {brandWords.map((word, wi) => (
            <div key={word} className="word block overflow-hidden">
              <span
                className={`inline-block font-serif ${
                  isMobile ? 'text-6xl' : 'text-8xl md:text-9xl'
                } leading-[0.95] ${
                  wi === 1 ? 'italic text-caramel' : 'text-latte'
                }`}
              >
                {word.split('').map((char, ci) => (
                  <span
                    key={ci}
                    className="char inline-block opacity-0"
                    style={{
                      textShadow:
                        wi === 0
                          ? '0 4px 40px rgba(212,165,116,0.2)'
                          : 'none',
                    }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>

        {/* Decorative line */}
        <div
          ref={lineRef}
          className="mx-auto mt-8 h-px bg-caramel/40 origin-left"
          style={{ width: isMobile ? '120px' : '200px', transform: 'scaleX(0)' }}
        />

        {/* Tagline */}
        <p className="mt-6 text-xs tracking-[6px] uppercase text-latte/40">
          Specialty Coffee
        </p>
      </div>

      {/* Corner frames */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-latte/10" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-latte/10" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-latte/10" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-latte/10" />
    </div>
  );
}
