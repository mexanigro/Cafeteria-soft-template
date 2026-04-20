import { Facebook, Instagram } from 'lucide-react';
import { site } from '@/src/config/site';

const socialIcon = {
  instagram: Instagram,
  facebook: Facebook,
} as const;

type FooterProps = {
  onScrollTop: () => void;
};

export function Footer({ onScrollTop }: FooterProps) {
  const { footer, brand } = site;

  return (
    <footer id="visit" className="bg-background border-t border-espresso/10 pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-5xl font-serif mb-8">{footer.visitTitle}</h2>
            <p className="text-xl text-espresso/70 max-w-sm leading-relaxed mb-8">{footer.blurb}</p>
            <div className="flex gap-4">
              {footer.social.map((s) => {
                const Icon = socialIcon[s.network];
                return (
                  <a
                    key={s.network}
                    href={s.href}
                    aria-label={s.label}
                    className="w-12 h-12 bg-espresso text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-[11px] mb-6 opacity-40">
              {footer.hoursHeading}
            </h4>
            <ul className="space-y-4 text-lg">
              {footer.hours.map((row) => (
                <li key={row.label} className="flex justify-between items-center">
                  <span className="font-medium">{row.label}</span>{' '}
                  <span className="opacity-80">{row.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="font-bold uppercase tracking-widest text-[11px] mb-6 opacity-40">
              {footer.locationHeading}
            </h4>
            <div className="flex flex-col sm:flex-row gap-6">
              <p className="text-lg leading-relaxed opacity-80 shrink-0">
                {footer.addressLines.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
              <div className="w-full h-32 rounded-2xl overflow-hidden shadow-sm border-[4px] border-white/50 relative">
                <div className="absolute inset-0 bg-espresso/5 pointer-events-none z-10 rounded-2xl" />
                <iframe
                  title="Map"
                  src={footer.mapEmbedSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(0.4) opacity(0.9) contrast(0.9)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-espresso/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <button
            type="button"
            onClick={onScrollTop}
            className="text-2xl font-serif tracking-tight hover:opacity-70 transition-opacity"
          >
            {brand.name}
          </button>
          <div className="text-espresso/40 text-sm font-medium">
            © {new Date().getFullYear()} {site.fullMenu.copyrightSuffix}
          </div>
        </div>
      </div>
    </footer>
  );
}
