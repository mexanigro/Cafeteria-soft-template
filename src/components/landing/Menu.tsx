import { ArrowRight } from 'lucide-react';
import { site, getEspressoPreviewItems, getMatchaPreviewItems } from '@/src/config/site';
import { DrinkConcierge } from './DrinkConcierge';

type MenuProps = {
  onOpenFullMenu: () => void;
};

export function Menu({ onOpenFullMenu }: MenuProps) {
  const { menuSection, images } = site;
  const espressoItems = getEspressoPreviewItems();
  const matchaItems = getMatchaPreviewItems();

  return (
    <section id={menuSection.id} className="py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-5xl font-serif mb-4">{menuSection.title}</h2>
            <p className="text-espresso/70 text-lg">{menuSection.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onOpenFullMenu}
            className="text-espresso text-lg font-medium border-b-2 border-espresso pb-1 flex items-center gap-2 group hover:opacity-70 transition-opacity"
          >
            {menuSection.fullMenuCta}{' '}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <DrinkConcierge />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="bg-white rounded-[2rem] shadow-sm p-8 lg:p-12 border border-espresso/5 flex flex-col h-full">
            <div className="flex items-center gap-4 mb-10 border-b border-espresso/10 pb-6">
              <span className="text-sm font-bold tracking-widest uppercase opacity-40">
                {menuSection.categoryLabels[0]}
              </span>
              <h3 className="text-3xl font-serif">{menuSection.categoryTitles[0]}</h3>
            </div>
            <div className="space-y-8 flex-1">
              {espressoItems.map((item) => (
                <div
                  key={item.name}
                  className="group cursor-default py-1 px-2 rounded-lg -mx-2 hover:bg-primary/10 transition-colors duration-300"
                >
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-lg font-medium group-hover:text-espresso/60 group-hover:-translate-y-1 transition-all duration-300">
                      {item.name}
                    </span>
                    <div className="flex-1 border-b-[2.5px] border-dotted border-espresso/20 group-hover:border-primary group-hover:-translate-y-2 transition-all duration-300 mx-4 mb-1.5" />
                    <span className="text-lg font-serif italic group-hover:text-espresso/60 group-hover:-translate-y-1 transition-all duration-300">
                      {item.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 overflow-hidden rounded-[2rem] h-64 shadow-sm border-[6px] border-white bg-background">
              <img
                src={images.latte}
                alt="Latte art"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="bg-white rounded-[2rem] shadow-sm p-8 lg:p-12 border border-espresso/5 flex flex-col h-full">
            <div className="flex items-center gap-4 mb-10 border-b border-espresso/10 pb-6">
              <span className="text-sm font-bold tracking-widest uppercase opacity-40">
                {menuSection.categoryLabels[1]}
              </span>
              <h3 className="text-3xl font-serif">{menuSection.categoryTitles[1]}</h3>
            </div>
            <div className="space-y-8 flex-1">
              {matchaItems.map((item) => (
                <div
                  key={item.name}
                  className="group cursor-default py-1 px-2 rounded-lg -mx-2 hover:bg-blush/30 transition-colors duration-300"
                >
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-lg font-medium group-hover:text-espresso/60 group-hover:-translate-y-1 transition-all duration-300">
                      {item.name}
                    </span>
                    <div className="flex-1 border-b-[2.5px] border-dotted border-espresso/20 group-hover:border-blush group-hover:border-espresso/30 group-hover:-translate-y-2 transition-all duration-300 mx-4 mb-1.5" />
                    <span className="text-lg font-serif italic group-hover:text-espresso/60 group-hover:-translate-y-1 transition-all duration-300">
                      {item.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 overflow-hidden rounded-[2rem] h-64 bg-blush shadow-sm border-[6px] border-white">
              <img
                src={images.matcha}
                alt="Matcha"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
