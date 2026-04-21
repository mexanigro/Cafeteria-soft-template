# Cafeteria soft template (Vite + React)

## Configuration

Business content is driven by **`src/config/site.ts`** and the active preset in **`src/config/presets/`**.

- Change **`ACTIVE_NICHE`** in `src/config/site.ts` to switch client or vertical (e.g. `aromaVivo`, `tattoo`).
- Final config is **`siteConfig`**: preset content first, then **`BASE_CONFIG`** (features, payment, notifications, admin email). Infrastructure always wins on duplicate keys.
- Add a new client: copy an existing preset file in `src/config/presets/`, fill every field (TypeScript enforces the contract via `src/types.ts`), register it in the `PRESETS` map, and set `ACTIVE_NICHE`.
- Optional legal copy: **`src/config/legalContent.ts`** with placeholders like `[BRAND_NAME]` and `interpolateLegalPlaceholders`.

After load, **`SeoHead`** updates `document.title` and meta tags from the active preset’s `seo` block and syncs the hero image preload when enabled.

## Run locally

**Prerequisites:** Node.js

1. `npm install`
2. `npm run dev`

Build: `npm run build`
