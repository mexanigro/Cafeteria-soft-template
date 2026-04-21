import { Star } from 'lucide-react';
import { siteConfig } from '@/src/config/site';

export default function Testimonials() {
  const { testimonials } = siteConfig;

  return (
    <section
      id="testimonials"
      data-defer-render="true"
      className="relative bg-cream py-32 md:py-44 px-6 md:px-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto mb-16 md:mb-24">
        <p className="text-xs tracking-[6px] uppercase text-stone mb-6">{testimonials.sectionLabel}</p>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2 className="font-serif text-4xl md:text-6xl text-espresso leading-[1.1]">
            {testimonials.headlineLine1}
            <br />
            <span className="italic text-caramel">{testimonials.headlineLine2Italic}</span>
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-caramel text-caramel" />
              ))}
            </div>
            <span className="text-stone text-sm">{testimonials.ratingSummary}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.items.map((t, i) => (
          <div
            key={`${t.name}-${i}`}
            className={`testimonial-card group p-6 md:p-8 rounded-2xl border border-espresso/5 bg-white/50 backdrop-blur-sm hover:border-caramel/20 hover:bg-white/80 transition-all duration-500 ${
              i === 0 || i === 3 ? 'lg:mt-8' : ''
            }`}
          >
            <div className="flex gap-1 mb-4">
              {[...Array(t.rating)].map((_, si) => (
                <Star key={si} className="w-3.5 h-3.5 fill-caramel text-caramel" />
              ))}
            </div>

            <p className="text-espresso leading-relaxed mb-6 text-balance">&ldquo;{t.text}&rdquo;</p>

            <div className="flex items-center justify-between">
              <span className="font-serif text-espresso">{t.name}</span>
              <span className="text-stone text-xs">{t.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
