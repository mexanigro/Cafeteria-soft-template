import { siteConfig } from '@/src/config/site';

export default function Team() {
  const { team } = siteConfig;

  return (
    <section
      id="team"
      data-defer-render="true"
      className="relative bg-mocha py-32 md:py-44 px-6 md:px-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto mb-16 md:mb-24">
        <p className="text-xs tracking-[6px] uppercase text-caramel mb-6">{team.sectionLabel}</p>
        <h2 className="font-serif text-4xl md:text-6xl text-latte leading-[1.1]">
          {team.headlineLine1}
          <br />
          <span className="italic text-caramel">{team.headlineLine2Italic}</span>
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {team.members.map((member) => (
          <div key={member.name} className="team-card group text-center">
            <div
              className="relative w-40 h-40 mx-auto rounded-full mb-8 flex items-center justify-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundColor: member.color }}
            >
              <span className="font-serif text-3xl text-latte/80 italic">{member.initials}</span>
              <div className="absolute inset-0 rounded-full border border-caramel/20 group-hover:border-caramel/50 transition-colors duration-500" />
              <div className="absolute -inset-2 rounded-full border border-caramel/10 group-hover:border-caramel/30 transition-colors duration-500" />
            </div>

            <h3 className="font-serif text-2xl text-latte mb-2 group-hover:text-caramel transition-colors duration-300">
              {member.name}
            </h3>
            <p className="text-caramel text-xs tracking-[3px] uppercase mb-4">{member.role}</p>
            <p className="text-latte/50 text-sm leading-relaxed max-w-xs mx-auto">{member.bio}</p>
          </div>
        ))}
      </div>

      <div className="absolute -bottom-20 -left-20 text-[15rem] font-serif text-latte/[0.015] leading-none pointer-events-none select-none">
        {team.decorativeWord}
      </div>
    </section>
  );
}
