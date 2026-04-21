import { useEffect } from 'react';
import { siteConfig } from '@/src/config/site';

/** Updates document title and meta tags from `siteConfig` after mount. */
export function SeoHead() {
  useEffect(() => {
    const { seo, assets } = siteConfig;
    document.documentElement.lang = seo.htmlLang;
    document.title = seo.title;

    const upsertMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    upsertMeta('name', 'description', seo.description);
    upsertMeta('name', 'theme-color', seo.themeColor);
    upsertMeta('name', 'author', seo.author);
    upsertMeta('property', 'og:title', seo.ogTitle);
    upsertMeta('property', 'og:description', seo.ogDescription);
    upsertMeta('property', 'og:locale', seo.ogLocale);

    if (assets.preloadHeroImage) {
      let preload = document.querySelector('link[rel="preload"][as="image"]');
      if (!preload) {
        preload = document.createElement('link');
        preload.setAttribute('rel', 'preload');
        preload.setAttribute('as', 'image');
        document.head.appendChild(preload);
      }
      preload.setAttribute('href', assets.heroBackground);
      preload.setAttribute('fetchpriority', 'high');
    }
  }, []);

  return null;
}
