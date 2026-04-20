import { site } from '@/src/config/site';

export function Gallery() {
  const { gallery, images } = site;

  return (
    <section className="py-24 bg-blush/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif mb-3">{gallery.title}</h2>
          <p className="text-espresso/60 text-lg">{gallery.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="space-y-4 md:space-y-6 flex flex-col">
            <div className="overflow-hidden rounded-[2rem] shadow-sm border-[6px] border-white bg-white">
              <img
                src={images.pastry}
                className="w-full h-64 md:h-80 object-cover hover:opacity-90 transition-opacity rounded-2xl"
                alt="Pastry"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="bg-primary rounded-[2rem] h-32 md:h-40 p-6 flex flex-col items-center justify-center text-center italic text-lg shadow-sm flex-1">
              &quot;{gallery.quote}&quot;
            </div>
          </div>
          <div className="pt-8 md:pt-16 space-y-4 md:space-y-6">
            <div className="overflow-hidden rounded-[2rem] shadow-sm border-[6px] border-white bg-white">
              <img
                src={images.interior}
                className="w-full h-80 md:h-[450px] object-cover hover:opacity-90 transition-opacity rounded-2xl"
                alt="Interior"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="space-y-4 md:space-y-6">
            <div className="overflow-hidden rounded-[2rem] shadow-sm border-[6px] border-white bg-white">
              <img
                src={images.vibes}
                className="w-full h-48 md:h-64 object-cover hover:opacity-90 transition-opacity rounded-2xl"
                alt="Vibes"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="overflow-hidden rounded-[2rem] shadow-sm border-[6px] border-white bg-white">
              <img
                src={images.hero}
                className="w-full h-64 md:h-80 object-cover hover:opacity-90 transition-opacity rounded-2xl"
                alt="Coffee"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="pt-12 md:pt-24 space-y-4 md:space-y-6">
            <div className="overflow-hidden rounded-[2rem] shadow-sm border-[6px] border-white bg-white">
              <img
                src={images.matcha}
                className="w-full h-72 md:h-96 object-cover hover:opacity-90 transition-opacity rounded-2xl"
                alt="Matcha bowl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
