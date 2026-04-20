import { useEffect, useState } from 'react';
import { ArrowLeft, Facebook, Instagram, Search, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { site } from '@/src/config/site';

type FullMenuPageProps = {
  isOpen: boolean;
  onClose: () => void;
};

const socialIcon = {
  instagram: Instagram,
  facebook: Facebook,
} as const;

export function FullMenuPage({ isOpen, onClose }: FullMenuPageProps) {
  const [zoomedImage, setZoomedImage] = useState<{ src: string; alt: string } | null>(null);
  const { fullMenuData, fullMenu, footer } = site;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="full-menu-scroll-container"
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[250] bg-background overflow-y-auto scroll-smooth"
          >
            <div className="sticky top-0 bg-background/90 backdrop-blur-md z-20 border-b border-espresso/10 shadow-sm flex flex-col">
              <div className="py-4 px-6 md:px-12 flex justify-between items-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex items-center gap-2 text-espresso font-medium hover:bg-espresso/10 py-2 px-4 rounded-full transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" /> {fullMenu.backLabel}
                </button>
                <div className="text-xl font-serif font-semibold tracking-tight hidden sm:block">
                  {fullMenu.pageTitle}
                </div>
              </div>

              <div className="flex overflow-x-auto no-scrollbar py-3 px-6 justify-start sm:justify-center gap-3 border-t border-espresso/5 bg-white/40">
                {fullMenuData.map((section, idx) => (
                  <button
                    key={section.category}
                    type="button"
                    onClick={() => {
                      const el = document.getElementById(`category-${idx}`);
                      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="whitespace-nowrap px-6 py-2 rounded-full border border-espresso/10 bg-background text-espresso font-medium hover:bg-primary hover:border-primary transition-all duration-300 shadow-sm text-sm"
                  >
                    {section.category}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-w-5xl mx-auto py-12 px-6 md:px-12">
              <div className="text-center mb-16">
                <h2 className="text-5xl lg:text-7xl font-serif text-espresso mb-6 tracking-tight">
                  {fullMenu.collectionTitle}
                </h2>
                <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-6" />
                <p className="text-xl text-espresso/70 max-w-2xl mx-auto">{fullMenu.collectionIntro}</p>
              </div>

              <div className="space-y-24">
                {fullMenuData.map((section, sIdx) => (
                  <div key={section.category} id={`category-${sIdx}`} className="scroll-mt-[160px]">
                    <div className="flex items-center gap-6 mb-12">
                      <h3 className="text-4xl font-serif text-espresso">{section.category}</h3>
                      <div className="h-px bg-espresso/10 flex-1" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                      {section.items.map((item) => (
                        <div
                          key={item.name}
                          className="flex gap-5 group rounded-[1.5rem] p-4 bg-white shadow-sm border border-espresso/5 hover:shadow-md transition-all duration-300"
                        >
                          <button
                            type="button"
                            className="relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden cursor-pointer shadow-sm border-[4px] border-white text-left"
                            onClick={() => setZoomedImage({ src: item.img, alt: item.name })}
                          >
                            <img
                              src={item.img}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                              <Search className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </button>

                          <div className="flex-1 flex flex-col justify-center">
                            <div className="flex justify-between items-start mb-2 gap-4">
                              <h4 className="text-xl font-medium text-espresso leading-tight">{item.name}</h4>
                              <span className="text-lg font-serif italic text-espresso/80 shrink-0">
                                ${item.price}
                              </span>
                            </div>
                            <p className="text-espresso/60 text-sm leading-relaxed pr-2">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <footer className="bg-blush/30 border-t border-espresso/10 pt-24 pb-12 px-6 md:px-12 mt-12 w-full">
              <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                  <div className="col-span-1 md:col-span-2">
                    <h2 className="text-5xl font-serif mb-8 text-espresso">{fullMenu.footerVisitTitle}</h2>
                    <p className="text-xl text-espresso/70 max-w-sm leading-relaxed mb-8">
                      {fullMenu.footerVisitBlurb}
                    </p>
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
                    <h4 className="font-bold uppercase tracking-widest text-espresso text-[11px] mb-6 opacity-40">
                      {footer.hoursHeading}
                    </h4>
                    <ul className="space-y-4 text-lg text-espresso">
                      {footer.hours.map((row) => (
                        <li key={row.label} className="flex justify-between items-center">
                          <span className="font-medium">{row.label}</span>{' '}
                          <span className="opacity-80">{row.hours}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="col-span-1 md:col-span-2">
                    <h4 className="font-bold uppercase tracking-widest text-espresso text-[11px] mb-6 opacity-40">
                      {footer.locationHeading}
                    </h4>
                    <div className="flex flex-col sm:flex-row gap-6">
                      <p className="text-lg leading-relaxed opacity-80 text-espresso shrink-0">
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
                    onClick={() => {
                      const el = document.getElementById('full-menu-scroll-container');
                      el?.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-2xl font-serif tracking-tight text-espresso hover:opacity-70 transition-opacity"
                  >
                    {fullMenu.scrollToTopBrand}
                  </button>
                  <div className="text-espresso/40 text-sm font-medium">
                    © {new Date().getFullYear()} {fullMenu.copyrightSuffix}
                  </div>
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImage(null)}
            className="fixed inset-0 z-[300] bg-black/40 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-background rounded-[2rem] shadow-2xl overflow-hidden cursor-default flex flex-col"
            >
              <div className="flex justify-between items-center p-6 border-b border-espresso/10">
                <motion.h3
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.1 } }}
                  className="text-2xl font-serif text-espresso"
                >
                  {zoomedImage.alt}
                </motion.h3>
                <button
                  type="button"
                  onClick={() => setZoomedImage(null)}
                  className="bg-espresso/5 hover:bg-espresso/10 text-espresso p-2 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="relative w-full bg-white/50 p-6 md:p-10 flex items-center justify-center">
                <img
                  src={zoomedImage.src.replace('w=300', 'w=1200')}
                  alt={zoomedImage.alt}
                  className="rounded-[1.5rem] object-contain max-h-[65vh] w-auto shadow-md border-[6px] border-white"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
