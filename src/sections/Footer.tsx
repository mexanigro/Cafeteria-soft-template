import { Instagram, Facebook } from 'lucide-react';
import type { MouseEvent } from 'react';
import { siteConfig } from '@/src/config/site';
import type { SocialPlatform } from '@/src/types';

const SOCIAL_ICONS: Record<SocialPlatform, typeof Instagram> = {
  instagram: Instagram,
  facebook: Facebook,
};

export default function Footer() {
  const { footer, brand } = siteConfig;

  const handleAnchor = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-mocha border-t border-latte/5 py-16 md:py-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
          <div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-serif text-2xl text-latte mb-4 block"
            >
              {brand.displayName}
            </a>
            <p className="text-latte/40 text-sm leading-relaxed max-w-xs">{brand.footerTagline}</p>
          </div>

          <div>
            <p className="text-xs tracking-[4px] uppercase text-latte/30 mb-6">{footer.navTitle}</p>
            <div className="flex flex-col gap-3">
              {footer.navLinks.map((link) => (
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

          <div>
            <p className="text-xs tracking-[4px] uppercase text-latte/30 mb-6">{footer.followTitle}</p>
            <div className="flex gap-4">
              {footer.socialLinks.map((social) => {
                const Icon = SOCIAL_ICONS[social.platform];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    onClick={(e) => e.preventDefault()}
                    className="w-10 h-10 rounded-full border border-latte/10 flex items-center justify-center text-latte/40 hover:text-caramel hover:border-caramel/30 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
            <p className="text-latte/30 text-xs mt-6">{footer.socialHandle}</p>
          </div>
        </div>

        <div className="pt-8 border-t border-latte/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-latte/20 text-xs">
            &copy; {new Date().getFullYear()} {brand.displayName}. {footer.copyrightSuffix}
          </p>
          <p className="text-latte/20 text-xs">{footer.craftedLine}</p>
        </div>
      </div>
    </footer>
  );
}
