import type { SiteConfig } from '@/src/types';

/** Serialized facts from `siteConfig` for Gemini system context (English prompt; model may reply in user language). */
export function buildGeminiSiteContext(site: SiteConfig): string {
  const lines: string[] = [];

  lines.push(`Business / brand: ${site.brand.displayName}`);
  lines.push(`Tagline: ${site.brand.footerTagline}`);
  if (site.seo?.description) lines.push(`About: ${site.seo.description}`);

  lines.push('');
  lines.push('Hero:');
  lines.push(`${site.hero.eyebrow}. ${site.hero.titleLine1} ${site.hero.titleLine2}. ${site.hero.subtitle}`);

  lines.push('');
  lines.push('Philosophy / essence:');
  lines.push(site.philosophy.intro);
  for (const p of site.philosophy.pillars) {
    lines.push(`- ${p.title}: ${p.description}`);
  }

  lines.push('');
  lines.push('Menu offerings (names and descriptions):');
  for (const item of site.menu.items) {
    lines.push(
      `- [${item.category}] ${item.name} (${item.subtitle}): ${item.description}`,
    );
  }

  lines.push('');
  lines.push('Process highlights:');
  lines.push(site.process.intro);
  for (const step of site.process.steps) {
    lines.push(`- ${step.title}: ${step.description}`);
  }

  lines.push('');
  lines.push('Ambience / space (summary):');
  lines.push(site.ambience.intro);
  for (const s of site.ambience.sectors) {
    lines.push(`- ${s.label}: ${s.body}`);
  }

  lines.push('');
  lines.push('Team:');
  for (const m of site.team.members) {
    lines.push(`- ${m.name}, ${m.role}: ${m.bio}`);
  }

  lines.push('');
  lines.push('Location & hours:');
  lines.push(`Address: ${site.location.addressLines.join(' ')}`);
  for (const h of site.location.hours) {
    lines.push(`- ${h.day}: ${h.time}`);
  }
  lines.push(`Phone: ${site.location.phone}`);
  lines.push(`Public email (if listed for contact): ${site.legal.contactEmail}`);
  lines.push(`Location intro: ${site.location.intro}`);

  lines.push('');
  lines.push('Navigation sections on the site (for pointing users): Essence/Philosophy, Menu, Process, Ambience, Team, Visit Us / Location.');

  return lines.join('\n');
}
