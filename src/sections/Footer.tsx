import { Instagram, Facebook } from 'lucide-react';
import type { MouseEvent } from 'react';

const navLinks = [
  { label: 'Essence', href: '#philosophy' },
  { label: 'Menu', href: '#menu' },
  { label: 'Ambience', href: '#ambience' },
  { label: 'Visit Us', href: '#location' },
];

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
];

export default function Footer() {
  const handleAnchor = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-mocha border-t border-latte/5 py-16 md:py-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
          {/* Brand */}
          <div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-serif text-2xl text-latte mb-4 block"
            >
              Aroma Vivo
            </a>
            <p className="text-latte/40 text-sm leading-relaxed max-w-xs">
              Specialty coffee roasted in small batches. Every cup is a ceremony
              of flavor and craft.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs tracking-[4px] uppercase text-latte/30 mb-6">
              Navigation
            </p>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleAnchor(e, link.href)}
                  className="text-latte/60 text-sm hover:text-caramel transition-colors duration-300 w-fit"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs tracking-[4px] uppercase text-latte/30 mb-6">
              Follow Us
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  onClick={(e) => e.preventDefault()}
                  className="w-10 h-10 rounded-full border border-latte/10 flex items-center justify-center text-latte/40 hover:text-caramel hover:border-caramel/30 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="text-latte/30 text-xs mt-6">
              @aromavivocafe
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-latte/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-latte/20 text-xs">
            &copy; {new Date().getFullYear()} Aroma Vivo. All rights reserved.
          </p>
          <p className="text-latte/20 text-xs">
            Crafted with care in Buenos Aires
          </p>
        </div>
      </div>
    </footer>
  );
}
