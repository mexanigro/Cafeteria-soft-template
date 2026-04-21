const pillars = [
  {
    number: '01',
    title: 'Origin',
    desc: 'We source beans from sustainable farms at ideal altitudes and climates to build distinct flavor profiles.',
  },
  {
    number: '02',
    title: 'Roasting',
    desc: 'Each batch is hand-roasted in small lots, preserving the character of every origin without shortcuts.',
  },
  {
    number: '03',
    title: 'Extraction',
    desc: 'Our baristas balance sweetness, acidity, and body to capture the best expression of each bean.',
  },
];

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      data-defer-render="true"
      className="relative bg-cream py-32 md:py-44 px-6 md:px-10 overflow-hidden"
    >
      <div
        className="absolute left-1/2 top-0 w-px h-24 bg-caramel/30 origin-top"
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24 md:mb-32">
          <div>
            <p className="text-xs tracking-[6px] uppercase text-stone mb-6">
              Our Essence
            </p>
            <h2
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-espresso leading-[1.1]"
            >
              More than a cup,
              <br />
              <span className="italic text-caramel">a ritual</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-lg md:text-xl text-stone leading-relaxed max-w-lg">
              We believe coffee is a ritual that deserves time, attention, and respect.
              From bean to cup, every step is a conscious decision toward excellence.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {pillars.map((pillar) => (
            <div key={pillar.number} className="group">
              <span className="text-caramel/40 font-serif text-5xl md:text-6xl mb-6 block transition-colors duration-500 group-hover:text-caramel/70">
                {pillar.number}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-espresso mb-4">
                {pillar.title}
              </h3>
              <div className="w-8 h-px bg-caramel/30 mb-4 transition-all duration-500 group-hover:w-16 group-hover:bg-caramel" />
              <p className="text-stone leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute -bottom-20 -right-10 text-[20rem] font-serif text-espresso/[0.02] leading-none pointer-events-none select-none">
        coffee
      </div>
    </section>
  );
}
