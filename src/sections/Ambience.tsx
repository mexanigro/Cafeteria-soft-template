import { siteConfig } from '@/src/config/site';

export default function Ambience() {
  const { ambience } = siteConfig;

  return (
    <section
      id="ambience"
      data-defer-render="true"
      className="relative bg-cream py-32 md:py-44 px-6 md:px-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto mb-16 md:mb-24 lg:mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-x-16 lg:gap-y-8 items-start">
          <header className="lg:col-span-5">
            <p className="text-xs tracking-[6px] uppercase text-stone mb-6">{ambience.sectionLabel}</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-espresso leading-[1.1]">
              {ambience.headlineLine1}
              <br />
              <span className="italic text-caramel">{ambience.headlineLine2Italic}</span>
            </h2>
          </header>

          <div className="lg:col-span-7 space-y-5 md:space-y-6">
            <p className="text-lg md:text-xl text-stone leading-relaxed font-normal">{ambience.intro}</p>
            {ambience.bodyParagraphs.map((paragraph, i) => (
              <p key={i} className="text-base md:text-lg text-stone/85 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-14 md:mt-16 h-px bg-gradient-to-r from-transparent via-espresso/15 to-transparent" aria-hidden />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {ambience.gallery.map((cell, i) => (
          <div key={i} className={`gallery-item ${cell.gridClass}`}>
            <div
              className={`relative rounded-2xl overflow-hidden ${cell.bgClass} group ${cell.minHeightClass ?? ''}`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/20 to-transparent" />
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-espresso/40 font-serif text-lg italic md:text-2xl">
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
