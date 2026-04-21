import type { MouseEvent } from 'react';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/src/config/site';

export default function Navbar({
  legalMode = false,
  onGoHome,
}: {
  legalMode?: boolean;
  /** When set (e.g. legal page), logo and nav leave policy routes and restore the single-page shell */
  onGoHome?: () => void;
} = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { links } = siteConfig.navbar;
  const brand = siteConfig.brand.displayName;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleAnchor = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    if (legalMode && onGoHome) {
      onGoHome();
      window.requestAnimationFrame(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogo = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMenuOpen(false);
    if (legalMode && onGoHome) {
      onGoHome();
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          legalMode || scrolled
            ? 'bg-cream/90 backdrop-blur-xl shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
          <a
            href="/"
            onClick={handleLogo}
            className={`font-serif text-xl tracking-tight transition-colors duration-300 ${
              legalMode || scrolled ? 'text-espresso' : 'text-latte'
            }`}
          >
            {brand}
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchor(e, link.href)}
                className={`text-xs tracking-[2px] uppercase transition-colors duration-300 hover:text-caramel ${
                  legalMode || scrolled ? 'text-espresso/70' : 'text-latte/70'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden relative w-6 h-5 flex flex-col justify-between transition-colors ${
              legalMode || scrolled ? 'text-espresso' : 'text-latte'
            }`}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-px w-full transition-all duration-300 ${
                legalMode || scrolled ? 'bg-espresso' : 'bg-latte'
              } ${menuOpen ? 'rotate-45 translate-y-[9px]' : ''}`}
            />
            <span
              className={`block h-px w-full transition-all duration-300 ${
                legalMode || scrolled ? 'bg-espresso' : 'bg-latte'
              } ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-px w-full transition-all duration-300 ${
                legalMode || scrolled ? 'bg-espresso' : 'bg-latte'
              } ${menuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`}
            />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-mocha/98 backdrop-blur-xl flex flex-col items-center justify-center gap-6">
          {links.map((link) => (
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
