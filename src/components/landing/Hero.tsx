import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { site } from '@/src/config/site';

type HeroProps = {
  onOpenFullMenu: () => void;
};

export function Hero({ onOpenFullMenu }: HeroProps) {
  const { hero, brand, images } = site;

  return (
    <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-blush p-10 lg:p-14 rounded-[2rem] relative overflow-hidden flex flex-col justify-center h-full"
        >
          <div className="relative z-10">
            <div className="inline-block bg-primary px-4 py-1 rounded-full text-sm font-medium mb-6">
              {brand.taglineEst}
            </div>
            <h1 className="text-6xl lg:text-8xl font-serif leading-[1.1] mb-8">
              {hero.headlineLine1} <br />
              <span className="italic text-espresso/60">{hero.headlineLine2Italic}</span>
            </h1>
            <p className="text-xl text-espresso/80 max-w-md mb-10 leading-relaxed">{hero.subhead}</p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                type="button"
                onClick={onOpenFullMenu}
                className="inline-flex items-center justify-center gap-2 bg-espresso text-white px-12 py-5 rounded-[2rem] text-lg font-medium hover:bg-primary hover:text-espresso hover:scale-105 hover:shadow-xl transition-all duration-300 group"
              >
                {hero.primaryCta}{' '}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <a
                href={hero.vibeAnchor}
                className="inline-flex items-center justify-center bg-transparent border-[2.5px] border-espresso/30 text-espresso px-12 py-5 rounded-[2rem] text-lg font-medium hover:border-espresso hover:bg-espresso/5 hover:scale-105 transition-all duration-300 shadow-sm"
              >
                {hero.secondaryCta}
              </a>
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-primary rounded-full opacity-50 pointer-events-none" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-[500px] lg:h-[700px] rounded-[2rem] overflow-hidden shadow-sm border-[8px] border-white bg-white"
        >
          <img
            src={images.hero}
            alt="Coffee aesthetic"
            className="w-full h-full object-cover rounded-[1rem]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/5 rounded-[1rem]" />
        </motion.div>
      </div>
    </section>
  );
}
