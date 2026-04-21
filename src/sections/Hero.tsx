export default function Hero() {
  const scrollToMenu = () => {
    const el = document.querySelector('#menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative h-[250vh] sm:h-[240vh] md:h-[210vh] lg:h-[170vh] xl:h-[130vh] w-full"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <img
          src="/images/hero-bg.jpg"
          alt="Coffee cup on a wooden table"
          className="absolute inset-0 h-full w-full object-cover"
          width={1520}
          height={1017}
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 z-[1] bg-mocha/55" />

        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="text-center max-w-5xl mx-auto">
            <p className="text-xs md:text-sm tracking-[8px] uppercase text-caramel mb-8">
              Since 2024 - Artisan Roasting
            </p>

            <h1 className="font-serif text-latte mb-8 leading-[0.9]">
              <span className="block text-[clamp(4rem,15vw,12rem)]">Aroma</span>
              <span className="block text-[clamp(4rem,15vw,12rem)] italic text-caramel">Vivo</span>
            </h1>

            <div className="w-16 h-px bg-caramel/50 mx-auto mb-8" />

            <p className="text-base md:text-xl text-latte/70 max-w-lg mx-auto leading-relaxed mb-10">
              Every cup tells a story. Let the coffee speak before your first sip.
            </p>

            <button
              onClick={scrollToMenu}
              className="group relative inline-flex items-center gap-3 text-xs tracking-[4px] uppercase text-latte/80 hover:text-caramel transition-colors duration-500"
            >
              <span>Explore our menu</span>
              <svg
                className="w-4 h-4 transition-transform duration-500 group-hover:translate-y-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-latte/10 z-10" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-latte/10 z-10" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-latte/10 z-10" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-latte/10 z-10" />

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-cream to-transparent z-10" />
    </section>
  );
}
