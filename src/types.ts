/** Navigation link used in navbar / footer */
export interface SiteNavLink {
  label: string;
  href: string;
}

/** Brand identity shown in splash, navbar, footer */
export interface BrandConfig {
  displayName: string;
  splashTitleLine1: string;
  splashTitleLine2: string;
  footerTagline: string;
}

/** SEO & document metadata (driven by preset; can be hydrated client-side) */
export interface SeoConfig {
  htmlLang: string;
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogLocale: string;
  themeColor: string;
  author: string;
}

/** Opening splash timing and copy */
export interface SplashConfig {
  subtitle: string;
  exitAfterMs: number;
  completeAfterMs: number;
}

/** Hero section copy */
export interface HeroConfig {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  ctaLabel: string;
  /** CSS selector for scroll target, e.g. #menu */
  menuAnchor: string;
}

export interface PillarItem {
  number: string;
  title: string;
  description: string;
}

export interface PhilosophyConfig {
  backgroundColor: string;
  sectionLabel: string;
  headlineLine1: string;
  headlineLine2Italic: string;
  intro: string;
  pillars: PillarItem[];
  decorativeWord: string;
}

export interface MenuCategory {
  key: string;
  label: string;
}

export interface MenuItemConfig {
  id: number;
  name: string;
  subtitle: string;
  category: string;
  description: string;
  image: string;
}

export interface MenuConfig {
  backgroundColor: string;
  sectionLabel: string;
  headlineLine1: string;
  headlineLine2Italic: string;
  emptyCategoryMessage: string;
  decorativeWord: string;
  categories: MenuCategory[];
  items: MenuItemConfig[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ProcessConfig {
  imageSrc: string;
  imageAlt: string;
  floatCardTitle: string;
  floatCardSubtitle: string;
  sectionLabel: string;
  headlineLine1: string;
  headlineLine2Italic: string;
  intro: string;
  steps: ProcessStep[];
}

export interface AmbienceGalleryCell {
  gridClass: string;
  minHeightClass?: string;
  /** Fallback tint when imageSrc is omitted */
  bgClass: string;
  label: string;
  imageSrc?: string;
  imageAlt?: string;
}

/** One narrative block with its own photo (pairs alternate image/text in the UI) */
export interface AmbienceSector {
  /** Short anchor label (e.g. “Main hall”, “Coffee bar”) */
  label: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
}

export interface AmbienceConfig {
  sectionLabel: string;
  headlineLine1: string;
  headlineLine2Italic: string;
  /** Lead line under the headline */
  intro: string;
  /** Space narrative in alternating image + text rows */
  sectors: AmbienceSector[];
  gallery: AmbienceGalleryCell[];
}

export interface TestimonialItem {
  name: string;
  text: string;
  rating: number;
  date: string;
}

export interface TestimonialsConfig {
  sectionLabel: string;
  headlineLine1: string;
  headlineLine2Italic: string;
  ratingSummary: string;
  items: TestimonialItem[];
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
  color: string;
}

export interface TeamConfig {
  sectionLabel: string;
  headlineLine1: string;
  headlineLine2Italic: string;
  members: TeamMember[];
  decorativeWord: string;
}

export interface HoursEntry {
  day: string;
  time: string;
}

export interface LocationMapLabels {
  top: string;
  mid: string;
  vertical: string;
}

export interface LocationConfig {
  sectionLabel: string;
  headlineLine1: string;
  headlineLine2Italic: string;
  intro: string;
  addressLabel: string;
  addressLines: string[];
  hoursLabel: string;
  hours: HoursEntry[];
  contactLabel: string;
  phone: string;
  mapCardTitle: string;
  mapCardSubtitle: string;
  mapStreetLabels: LocationMapLabels;
}

export type SocialPlatform = 'instagram' | 'facebook';

export interface SocialLinkConfig {
  platform: SocialPlatform;
  href: string;
  label: string;
}

export interface FooterConfig {
  navTitle: string;
  followTitle: string;
  navLinks: SiteNavLink[];
  socialLinks: SocialLinkConfig[];
  socialHandle: string;
  copyrightSuffix: string;
  craftedLine: string;
}

export interface AssetsConfig {
  heroBackground: string;
  preloadHeroImage: boolean;
}

/** Data controller / legal footer interpolations for policies */
export interface LegalBusinessConfig {
  /** Registered entity or legal name */
  legalName: string;
  /** Single-line mailing address */
  registeredAddress: string;
  contactEmail: string;
  /** Notice period text, e.g. "24 hours before your reservation" */
  cancellationNotice: string;
}

/**
 * Everything that changes per client / vertical.
 * Must be complete for TypeScript to catch missing fields when adding a preset.
 */
export interface NichePreset {
  id: string;
  brand: BrandConfig;
  legal: LegalBusinessConfig;
  seo: SeoConfig;
  splash: SplashConfig;
  hero: HeroConfig;
  navbar: { links: SiteNavLink[] };
  philosophy: PhilosophyConfig;
  menu: MenuConfig;
  process: ProcessConfig;
  ambience: AmbienceConfig;
  testimonials: TestimonialsConfig;
  team: TeamConfig;
  location: LocationConfig;
  footer: FooterConfig;
  assets: AssetsConfig;
}

export interface FeatureFlags {
  showSplash: boolean;
  pauseGrainDuringSplash: boolean;
  /** Footer + route for cancellation policy (e.g. private bookings). Off for typical café walk-ins. */
  showCancellationPolicy: boolean;
  /** Gemini-powered visitor chat (requires `VITE_GEMINI_API_KEY`). */
  showGeminiChat: boolean;
}

export interface PaymentConfig {
  enabled: boolean;
}

export interface NotificationsConfig {
  enabled: boolean;
}

/** Infrastructure / product — single source, merged after preset */
export interface BaseInfrastructure {
  features: FeatureFlags;
  payment: PaymentConfig;
  notifications: NotificationsConfig;
  adminEmail: string;
}

export type SiteConfig = NichePreset & BaseInfrastructure;
