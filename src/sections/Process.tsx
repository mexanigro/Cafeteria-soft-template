import { siteConfig } from '@/src/config/site';

export default function Process() {
  const { process } = siteConfig;

  return (
    <section
      id="process"
      data-defer-render="true"
      className="relative bg-mocha py-32 md:py-44 px-6 md:px-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
            <img
              src={process.imageSrc}
              alt={process.imageAlt}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-mocha/60 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-mocha/80 backdrop-blur-sm rounded-xl px-5 py-4 border border-latte/10">
                <p className="text-latte font-serif text-lg">{process.floatCardTitle}</p>
                <p className="text-latte/50 text-sm mt-1">{process.floatCardSubtitle}</p>
              </div>
            </div>
          </div>

          <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-caramel/20 rounded-tl-3xl pointer-events-none" />
        </div>

        <div>
          <p className="text-xs tracking-[6px] uppercase text-caramel mb-6">{process.sectionLabel}</p>
          <h2 className="font-serif text-4xl md:text-5xl text-latte leading-[1.1] mb-6">
            {process.headlineLine1}
            <br />
            <span className="italic text-caramel">{process.headlineLine2Italic}</span>
          </h2>
          <p className="text-latte/60 text-lg leading-relaxed mb-12 max-w-md">{process.intro}</p>

          <div className="space-y-8">
            {process.steps.map((step) => (
              <div key={step.number} className="step-item flex gap-5 group">
                <span className="text-caramel/30 font-serif text-3xl group-hover:text-caramel/60 transition-colors duration-300 flex-shrink-0 w-12">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-serif text-xl text-latte mb-2 group-hover:text-caramel transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-latte/50 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
