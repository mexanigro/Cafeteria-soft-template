import { siteConfig } from '@/src/config/site';

export default function Philosophy() {
  const { philosophy } = siteConfig;

  return (
    <section
      id="philosophy"
      data-defer-render="true"
      className="relative py-32 md:py-44 px-6 md:px-10 overflow-hidden"
      style={{ backgroundColor: philosophy.backgroundColor }}
    >
      <div className="absolute left-1/2 top-0 w-px h-24 bg-caramel/30 origin-top" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24 md:mb-32">
          <div>
            <p className="text-xs tracking-[6px] uppercase text-stone mb-6">
              {philosophy.sectionLabel}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-espresso leading-[1.1]">
              {philosophy.headlineLine1}
              <br />
              <span className="italic text-caramel">{philosophy.headlineLine2Italic}</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-lg md:text-xl text-stone leading-relaxed max-w-lg">{philosophy.intro}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {philosophy.pillars.map((pillar) => (
            <div key={pillar.number} className="group">
              <span className="text-caramel/40 font-serif text-5xl md:text-6xl mb-6 block transition-colors duration-500 group-hover:text-caramel/70">
                {pillar.number}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-espresso mb-4">{pillar.title}</h3>
              <div className="w-8 h-px bg-caramel/30 mb-4 transition-all duration-500 group-hover:w-16 group-hover:bg-caramel" />
              <p className="text-stone leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute -bottom-20 -right-10 text-[20rem] font-serif text-espresso/[0.02] leading-none pointer-events-none select-none">
        {philosophy.decorativeWord}
      </div>
    </section>
  );
}
