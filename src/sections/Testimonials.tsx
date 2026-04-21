import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Valentina R.',
    text: 'The best espresso I have tried in Buenos Aires. You can tell they choose beans carefully and extract them perfectly.',
    rating: 5,
    date: '2 weeks ago',
  },
  {
    name: 'Martin L.',
    text: 'I come every morning before work. The Flat White is my religion. The atmosphere makes you want to stay all afternoon.',
    rating: 5,
    date: '1 month ago',
  },
  {
    name: 'Camila S.',
    text: 'My partner brought me for the Cold Brew and now we are regulars. The tiramisu is next-level and truly homemade.',
    rating: 5,
    date: '3 weeks ago',
  },
  {
    name: 'Andres P.',
    text: 'I work remotely and this is my place. Fast Wi-Fi, power outlets, excellent coffee, and a calm vibe you rarely find.',
    rating: 5,
    date: '2 months ago',
  },
  {
    name: 'Sofia M.',
    text: 'I discovered Aroma Vivo on Google Maps and the photos do not lie. Coffee quality and service exceed expectations.',
    rating: 5,
    date: '1 week ago',
  },
  {
    name: 'Diego H.',
    text: 'Baristas who truly know their craft. They explained each bean origin and recommended drinks based on my taste.',
    rating: 5,
    date: '1 month ago',
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      data-defer-render="true"
      className="relative bg-cream py-32 md:py-44 px-6 md:px-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto mb-16 md:mb-24">
        <p className="text-xs tracking-[6px] uppercase text-stone mb-6">
          Testimonials
        </p>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2 className="font-serif text-4xl md:text-6xl text-espresso leading-[1.1]">
            What people
            <br />
            <span className="italic text-caramel">are saying</span>
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-caramel text-caramel" />
              ))}
            </div>
            <span className="text-stone text-sm">4.9 on Google Maps</span>
          </div>
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {testimonials.map((t, i) => (
          <div
            key={i}
            className={`testimonial-card group p-6 md:p-8 rounded-2xl border border-espresso/5 bg-white/50 backdrop-blur-sm hover:border-caramel/20 hover:bg-white/80 transition-all duration-500 ${
              i === 0 || i === 3 ? 'lg:mt-8' : ''
            }`}
          >
            <div className="flex gap-1 mb-4">
              {[...Array(t.rating)].map((_, si) => (
                <Star key={si} className="w-3.5 h-3.5 fill-caramel text-caramel" />
              ))}
            </div>

            <p className="text-espresso leading-relaxed mb-6 text-balance">
              &ldquo;{t.text}&rdquo;
            </p>

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
