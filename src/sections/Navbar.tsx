import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

const navLinks = [
  { label: 'Esencia', href: '#philosophy' },
  { label: 'Carta', href: '#menu' },
  { label: 'Proceso', href: '#process' },
  { label: 'Ambiente', href: '#ambience' },
  { label: 'Equipo', href: '#team' },
  { label: 'Visitanos', href: '#location' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power3.out' }
      );
    }
  }, []);

  useEffect(() => {
    if (mobileMenuRef.current && menuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
      gsap.fromTo(
        mobileMenuRef.current.querySelectorAll('a'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out', delay: 0.1 }
      );
    }
  }, [menuOpen]);

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-cream/90 backdrop-blur-xl shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
          {/* Brand */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`font-serif text-xl tracking-tight transition-colors duration-300 ${
              scrolled ? 'text-espresso' : 'text-latte'
            }`}
          >
            Aroma Vivo
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchor(e, link.href)}
                className={`text-xs tracking-[2px] uppercase transition-colors duration-300 hover:text-caramel ${
                  scrolled ? 'text-espresso/70' : 'text-latte/70'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden relative w-6 h-5 flex flex-col justify-between transition-colors ${
              scrolled ? 'text-espresso' : 'text-latte'
            }`}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-px w-full transition-all duration-300 ${
                scrolled ? 'bg-espresso' : 'bg-latte'
              } ${menuOpen ? 'rotate-45 translate-y-[9px]' : ''}`}
            />
            <span
              className={`block h-px w-full transition-all duration-300 ${
                scrolled ? 'bg-espresso' : 'bg-latte'
              } ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-px w-full transition-all duration-300 ${
                scrolled ? 'bg-espresso' : 'bg-latte'
              } ${menuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 bg-mocha/98 backdrop-blur-xl flex flex-col items-center justify-center gap-6"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleAnchor(e, link.href)}
              className="font-serif text-2xl text-latte hover:text-caramel transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
