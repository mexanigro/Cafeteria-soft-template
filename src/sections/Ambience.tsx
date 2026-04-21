import { siteConfig } from '@/src/config/site';

export default function Ambience() {
  const { ambience } = siteConfig;

  return (
    <section
      id="ambience"
      data-defer-render="true"
      className="relative bg-cream py-32 md:py-44 px-6 md:px-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto mb-16 md:mb-24">
        <p className="text-xs tracking-[6px] uppercase text-stone mb-6">{ambience.sectionLabel}</p>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2 className="font-serif text-4xl md:text-6xl text-espresso leading-[1.1]">
            {ambience.headlineLine1}
            <br />
            <span className="italic text-caramel">{ambience.headlineLine2Italic}</span>
          </h2>
          <p className="text-stone max-w-md text-lg leading-relaxed">{ambience.intro}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20 md:mb-28">
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

      <div className="max-w-7xl mx-auto">
        <div className="border-t border-espresso/10 pt-12">
          <p className="text-xs tracking-[6px] uppercase text-stone mb-8">{ambience.atmosphereLabel}</p>
          <div className="flex flex-wrap gap-3">
            {ambience.notes.map((note) => (
              <span
                key={note}
                className="atmosphere-note px-5 py-2.5 rounded-full border border-espresso/10 text-espresso text-sm tracking-wide hover:bg-espresso hover:text-cream transition-all duration-500 cursor-default"
              >
                {note}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
