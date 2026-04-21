# Cafeteria soft template (Vite + React)

## Configuration

Business content is driven by **`src/config/site.ts`** and the active preset in **`src/config/presets/`**.

- Change **`ACTIVE_NICHE`** in `src/config/site.ts` to switch client or vertical (e.g. `aromaVivo`, `tattoo`).
- Final config is **`siteConfig`**: preset content first, then **`BASE_CONFIG`** (features, payment, notifications, admin email). Infrastructure always wins on duplicate keys.
- Add a new client: copy an existing preset file in `src/config/presets/`, fill every field (TypeScript enforces the contract via `src/types.ts`), register it in the `PRESETS` map, and set `ACTIVE_NICHE`.
- Legal policies: **`src/config/legalContent.ts`** (privacy, terms, cancellation, cookies) with placeholders filled from **`legal`** + **`brand`** + **`location`** in each preset. Routes: `/privacy`, `/terms`, `/cancellation`, `/cookies` (plus Spanish aliases). See **`legal-documents/README.md`**.
- Optional **Firebase** (Analytics): **`src/lib/firebase.ts`** and **`docs/firebase-setup.md`**. Copy **`.env.example`** to `.env` with your web app keys.

After load, **`SeoHead`** updates `document.title` and meta tags from the active preset’s `seo` block and syncs the hero image preload when enabled.

Deploy with SPA fallback so legal URLs resolve to `index.html`.

## Run locally

**Prerequisites:** Node.js

1. `npm install`
2. `npm run dev`

Build: `npm run build`
