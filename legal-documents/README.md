# Legal documents (reference)

Human-readable index for policies rendered in-app from **`src/config/legalContent.ts`**. Placeholders such as `[NOMBRE_EMPRESA]` are replaced using **`siteConfig`** (`legal`, `brand`, `location`).

## Routes

| Policy | Paths |
| --- | --- |
| Privacy | `/privacy`, `/privacidad` |
| Terms | `/terms`, `/terminos` |
| Cancellation | `/cancellation`, `/cancelacion` |
| Cookies | `/cookies`, `/cookie-policy`, `/politica-cookies` |

Configure **`legal`** (legal name, address, email, cancellation notice) in each preset under **`src/config/presets/`**.

Have policies reviewed by qualified counsel for your jurisdiction before production use.
