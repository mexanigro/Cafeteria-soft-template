import type { ReactNode } from 'react';
import { Coffee, Leaf, Wind } from 'lucide-react';
import { site, type FeatureIcon } from '@/src/config/site';

const iconMap: Record<FeatureIcon, ReactNode> = {
  coffee: <Coffee className="w-8 h-8" />,
  leaf: <Leaf className="w-8 h-8" />,
  wind: <Wind className="w-8 h-8" />,
};

export function TheVibe() {
  const { theVibe } = site;

  return (
    <section id="vibe" className="py-24 px-6 md:px-12 bg-primary/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif mb-4">{theVibe.sectionTitle}</h2>
          <div className="w-12 h-1 bg-espresso mx-auto opacity-20" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {theVibe.features.map((feature, idx) => (
            <div
              key={feature.title}
              className={`p-8 lg:p-10 rounded-[2rem] text-center hover:-translate-y-1 transition-transform duration-300 flex flex-col items-center ${
                idx === 0
                  ? 'bg-primary/50 border border-primary/50'
                  : idx === 1
                    ? 'bg-blush/80 border border-blush'
                    : 'bg-espresso/5 border border-espresso/10'
              }`}
            >
              <div className="bg-white/40 shadow-sm border border-white/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-espresso">
                {iconMap[feature.icon]}
              </div>
              <h3 className="text-2xl font-serif mb-4">{feature.title}</h3>
              <p className="text-espresso/70 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
