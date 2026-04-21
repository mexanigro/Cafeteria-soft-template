import { MapPin, Clock, Phone } from 'lucide-react';
import { siteConfig } from '@/src/config/site';

export default function Location() {
  const { location } = siteConfig;

  return (
    <section
      id="location"
      data-defer-render="true"
      className="relative bg-mocha py-32 md:py-44 px-6 md:px-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div>
          <p className="text-xs tracking-[6px] uppercase text-caramel mb-8">{location.sectionLabel}</p>

          <h2 className="font-serif text-4xl md:text-5xl text-latte leading-[1.1] mb-8">
            {location.headlineLine1}
            <br />
            <span className="italic text-caramel">{location.headlineLine2Italic}</span>
          </h2>

          <p className="text-latte/60 text-lg leading-relaxed mb-12 max-w-md">{location.intro}</p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-latte/5 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-caramel" />
              </div>
              <div>
                <p className="text-latte font-medium mb-1">{location.addressLabel}</p>
                <p className="text-latte/50 text-sm leading-relaxed">
                  {location.addressLines.flatMap((line, i) =>
                    i === 0 ? [line] : [<br key={`br-${i}`} />, line]
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-latte/5 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-caramel" />
              </div>
              <div>
                <p className="text-latte font-medium mb-3">{location.hoursLabel}</p>
                <div className="space-y-2">
                  {location.hours.map((h) => (
                    <div key={h.day} className="hour-row flex justify-between text-sm">
                      <span className="text-latte/50">{h.day}</span>
                      <span className="text-latte/70 tabular-nums">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-latte/5 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-caramel" />
              </div>
              <div>
                <p className="text-latte font-medium mb-1">{location.contactLabel}</p>
                <p className="text-latte/50 text-sm">{location.phone}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden bg-espresso/30 border border-latte/5">
            <div className="absolute inset-0">
              <div className="absolute inset-0 opacity-10">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={`h-${i}`}
                    className="absolute left-0 right-0 h-px bg-latte"
                    style={{ top: `${(i + 1) * 12}%` }}
                  />
                ))}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={`v-${i}`}
                    className="absolute top-0 bottom-0 w-px bg-latte"
                    style={{ left: `${(i + 1) * 12}%` }}
                  />
                ))}
              </div>

              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <line x1="0" y1="45%" x2="100%" y2="45%" stroke="currentColor" strokeWidth="1" className="text-latte/15" />
                <line x1="0" y1="70%" x2="100%" y2="70%" stroke="currentColor" strokeWidth="1" className="text-latte/15" />
                <line x1="35%" y1="0" x2="35%" y2="100%" stroke="currentColor" strokeWidth="1" className="text-latte/15" />
                <line x1="65%" y1="0" x2="65%" y2="100%" stroke="currentColor" strokeWidth="1" className="text-latte/15" />
              </svg>

              <div className="absolute top-[42%] left-[60%] -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-caramel/20 flex items-center justify-center animate-pulse">
                    <div className="w-6 h-6 rounded-full bg-caramel flex items-center justify-center">
                      <MapPin className="w-3 h-3 text-mocha" />
                    </div>
                  </div>
                  <div
                    className="absolute inset-0 rounded-full bg-caramel/10 animate-ping"
                    style={{ animationDuration: '2s' }}
                  />
                </div>
              </div>

              <span className="absolute top-[46%] left-[2%] text-[10px] text-latte/20 tracking-wider uppercase">
                {location.mapStreetLabels.top}
              </span>
              <span className="absolute top-[72%] left-[2%] text-[10px] text-latte/20 tracking-wider uppercase">
                {location.mapStreetLabels.mid}
              </span>
              <span className="absolute top-[2%] left-[36%] text-[10px] text-latte/20 tracking-wider uppercase rotate-90 origin-left">
                {location.mapStreetLabels.vertical}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-mocha/90 backdrop-blur-sm rounded-xl px-5 py-4 border border-latte/10">
                <p className="text-latte font-medium text-sm">{location.mapCardTitle}</p>
                <p className="text-latte/50 text-xs mt-1">{location.mapCardSubtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
