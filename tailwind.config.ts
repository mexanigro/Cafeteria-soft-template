import type { Config } from 'tailwindcss';

/**
 * Semantic palette mirrors `src/index.css` (`:root` + `@theme`).
 * Utilities: bg-background, bg-primary, bg-blush, text-espresso, font-sans, font-serif.
 */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#fdfbf7',
        primary: '#e8ecd7',
        blush: '#fdebed',
        espresso: '#4a3b32',
      },
      fontFamily: {
        sans: ['Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'ui-serif', 'Georgia', 'Times New Roman', 'serif'],
      },
    },
  },
} satisfies Config;
