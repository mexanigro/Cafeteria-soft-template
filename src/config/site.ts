import type { BaseInfrastructure, SiteConfig } from '@/src/types';
import { aromaVivoPreset } from '@/src/config/presets/aromaVivo';
import { tattooPreset } from '@/src/config/presets/tattoo';

/** Single switch: change this to swap the entire business content preset. */
export type NicheId = 'aromaVivo' | 'tattoo';

export const ACTIVE_NICHE: NicheId = 'aromaVivo';

const PRESETS = {
  aromaVivo: aromaVivoPreset,
  tattoo: tattooPreset,
} as const;

// ─── Infrastructure (product) — not duplicated per preset ───────────────────

export const BASE_CONFIG: BaseInfrastructure = {
  features: {
    showSplash: true,
    pauseGrainDuringSplash: true,
    showCancellationPolicy: false,
    showGeminiChat: true,
  },
  payment: {
    enabled: false,
  },
  notifications: {
    enabled: false,
  },
  adminEmail: '',
};

// ─── Final Config Export ──────────────────────────────────────────────────────
// Spread order: preset first (content), then base (infrastructure).
// Base fields intentionally overwrite any same-named preset fields so that
// infrastructure settings are always authoritative.
export const siteConfig: SiteConfig = {
  ...PRESETS[ACTIVE_NICHE],
  ...BASE_CONFIG,
};
