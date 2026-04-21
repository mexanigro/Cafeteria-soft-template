const atmosphereNotes = [
  'Warm wood',
  'Golden light',
  'Inviting aromas',
  'Soft music',
  'Good conversations',
  'Comfortable silence',
];

export default function Ambience() {
  return (
    <section
      id="ambience"
      data-defer-render="true"
      className="relative bg-cream py-32 md:py-44 px-6 md:px-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto mb-16 md:mb-24">
        <p className="text-xs tracking-[6px] uppercase text-stone mb-6">
          The Space
        </p>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2 className="font-serif text-4xl md:text-6xl text-espresso leading-[1.1]">
            A refuge for
            <br />
            <span className="italic text-caramel">your senses</span>
          </h2>
          <p className="text-stone max-w-md text-lg leading-relaxed">
            Designed so every visit feels like a pause. Natural light, warm textures,
            and corners that invite you to stay.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20 md:mb-28">
        <div className="gallery-item col-span-2 row-span-2">
          <div className="relative h-full min-h-[300px] md:min-h-[500px] rounded-2xl overflow-hidden bg-matcha group">
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-espresso/40 font-serif text-2xl italic">
              Main hall
            </div>
            <div className="absolute inset-0 bg-caramel/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        </div>

        <div className="gallery-item">
          <div className="relative h-40 md:h-60 rounded-2xl overflow-hidden bg-blush group">
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/10 to-transparent" />
            <div className="absolute bottom-4 left-4 text-espresso/40 font-serif text-lg italic">
              Bar
            </div>
            <div className="absolute inset-0 bg-caramel/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        </div>

        <div className="gallery-item">
          <div className="relative h-40 md:h-60 rounded-2xl overflow-hidden bg-stone/20 group">
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/10 to-transparent" />
            <div className="absolute bottom-4 left-4 text-espresso/40 font-serif text-lg italic">
              Details
            </div>
            <div className="absolute inset-0 bg-caramel/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        </div>

        <div className="gallery-item col-span-2">
          <div className="relative h-40 md:h-52 rounded-2xl overflow-hidden bg-caramel/20 group">
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/10 to-transparent" />
            <div className="absolute bottom-4 left-4 text-espresso/40 font-serif text-lg italic">
              Reading corner
            </div>
            <div className="absolute inset-0 bg-caramel/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="border-t border-espresso/10 pt-12">
          <p className="text-xs tracking-[6px] uppercase text-stone mb-8">
            What you will feel
          </p>
          <div className="flex flex-wrap gap-3">
            {atmosphereNotes.map((note) => (
              <span
                key={note}
                className="atmosphere-note px-5 py-2.5 rounded-full border border-espresso/10 text-espresso text-sm tracking-wide hover:bg-espresso hover:text-cream transition-all duration-500 cursor-default"
              >
                {note}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
