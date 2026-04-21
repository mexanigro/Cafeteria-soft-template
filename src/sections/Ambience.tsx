import { siteConfig } from '@/src/config/site';

export default function Ambience() {
  const { ambience } = siteConfig;

  return (
    <section
      id="ambience"
      data-defer-render="true"
      className="relative bg-cream py-32 md:py-44 px-6 md:px-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto mb-16 md:mb-20 lg:mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-x-16 lg:gap-y-8 items-start">
          <header className="lg:col-span-5">
            <p className="text-xs tracking-[6px] uppercase text-stone mb-6">{ambience.sectionLabel}</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-espresso leading-[1.1]">
              {ambience.headlineLine1}
              <br />
              <span className="italic text-caramel">{ambience.headlineLine2Italic}</span>
            </h2>
          </header>

          <div className="lg:col-span-7">
            <p className="text-lg md:text-xl text-stone leading-relaxed font-normal">{ambience.intro}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-16 md:space-y-24 lg:space-y-28 mb-16 md:mb-20 lg:mb-24">
        {ambience.sectors.map((sector, i) => {
          const imageOnLeft = i % 2 === 0;
          return (
            <article
              key={sector.label}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center"
              aria-labelledby={`ambience-sector-${i}`}
            >
              <div
                className={`relative overflow-hidden rounded-2xl shadow-sm aspect-[4/3] lg:aspect-[5/4] ${
                  imageOnLeft ? 'order-1 lg:order-1' : 'order-2 lg:order-2'
                }`}
              >
                <img
                  src={sector.imageSrc}
                  alt={sector.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-espresso/25 via-transparent to-caramel/10" />
              </div>
              <div
                className={`space-y-4 md:space-y-5 ${
                  imageOnLeft ? 'order-2 lg:order-2' : 'order-1 lg:order-1'
                }`}
              >
                <p
                  id={`ambience-sector-${i}`}
                  className="text-xs tracking-[4px] uppercase text-stone/90"
                >
                  {sector.label}
                </p>
                <p className="text-base md:text-lg text-stone/85 leading-relaxed">{sector.body}</p>
              </div>
            </article>
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto mb-14 md:mb-16 h-px bg-gradient-to-r from-transparent via-espresso/15 to-transparent" aria-hidden />

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {ambience.gallery.map((cell, i) => (
          <div key={i} className={`gallery-item ${cell.gridClass}`}>
            <div
              className={`relative rounded-2xl overflow-hidden group ${cell.minHeightClass ?? ''} ${
                cell.imageSrc ? 'bg-espresso/5' : cell.bgClass
              }`}
            >
              {cell.imageSrc ? (
                <>
                  <img
                    src={cell.imageSrc}
                    alt={cell.imageAlt ?? ''}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/45 via-espresso/5 to-transparent" />
                </>
              ) : (
                <div className={`absolute inset-0 ${cell.bgClass}`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/20 to-transparent" />
                </div>
              )}
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-cream/95 font-serif text-lg italic md:text-2xl drop-shadow-sm">
                {cell.label}
              </div>
              <div className="absolute inset-0 bg-caramel/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
