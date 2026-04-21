# Cafeteria soft template (Vite + React)

## Configuration

Business content is driven by **`src/config/site.ts`** and the active preset in **`src/config/presets/`**.

- Change **`ACTIVE_NICHE`** in `src/config/site.ts` to switch client or vertical (e.g. `aromaVivo`, `tattoo`).
- Final config is **`siteConfig`**: preset content first, then **`BASE_CONFIG`** (features, payment, notifications, admin email). Infrastructure always wins on duplicate keys.
- Add a new client: copy an existing preset file in `src/config/presets/`, fill every field (TypeScript enforces the contract via `src/types.ts`), register it in the `PRESETS` map, and set `ACTIVE_NICHE`.
- Legal policies: **`src/config/legalContent.ts`** (privacy, terms, cancellation, cookies) with placeholders filled from **`legal`** + **`brand`** + **`location`** in each preset. Routes: `/privacy`, `/terms`, `/cookies` (and `/cancellation` when enabled). See **`legal-documents/README.md`**. Set **`features.showCancellationPolicy`** in **`BASE_CONFIG`** to `true` to show the cancellation link in the footer and allow `/cancellation` (default `false` for walk-in cafés).
- Optional **Firebase** (Analytics): **`src/lib/firebase.ts`** and **`docs/firebase-setup.md`**. Copy **`.env.example`** to `.env` with your web app keys.
- **Gemini chat** (floating assistant): set **`VITE_GEMINI_API_KEY`** (see **`.env.example`**). Answers use **`siteConfig`** only (hours, menu, team, location). Toggle **`features.showGeminiChat`** in **`BASE_CONFIG`**. For production, restrict the API key by HTTP referrer in Google AI Studio.

After load, **`SeoHead`** updates `document.title` and meta tags from the active preset’s `seo` block and syncs the hero image preload when enabled.

Deploy with SPA fallback so legal URLs resolve to `index.html`.

## Run locally

**Prerequisites:** Node.js

1. `npm install`
2. `npm run dev`

Build: `npm run build`
