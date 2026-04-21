import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { siteConfig } from '@/src/config/site';
import { SeoHead } from '@/src/components/SeoHead';
import { LegalPage } from '@/src/components/LegalPage';
import { FloatingDock } from '@/src/components/FloatingDock';
import Navbar from '@/src/sections/Navbar';
import Hero from '@/src/sections/Hero';
import SplashScreen from '@/src/sections/SplashScreen';
import {
  legalKindToPath,
  parseLegalFromPath,
  type LegalDocKind,
} from '@/src/config/legalContent';

import '@/src/lib/firebase';

const Philosophy = lazy(() => import('@/src/sections/Philosophy'));
const MenuSection = lazy(() => import('@/src/sections/Menu'));
const Process = lazy(() => import('@/src/sections/Process'));
const Ambience = lazy(() => import('@/src/sections/Ambience'));
const Testimonials = lazy(() => import('@/src/sections/Testimonials'));
const Team = lazy(() => import('@/src/sections/Team'));
const Location = lazy(() => import('@/src/sections/Location'));
const Footer = lazy(() => import('@/src/sections/Footer'));

function resolveLegalFromPath(pathname: string): LegalDocKind | null {
  const kind = parseLegalFromPath(pathname);
  if (kind === 'cancellation' && !siteConfig.features.showCancellationPolicy) return null;
  return kind;
}

function initialLegalKind(): LegalDocKind | null {
  if (typeof window === 'undefined') return null;
  return resolveLegalFromPath(window.location.pathname);
}

export default function App() {
  const initialLegal = initialLegalKind();
  const [legalKind, setLegalKind] = useState<LegalDocKind | null>(() => initialLegal);

  const [splashDismissed, setSplashDismissed] = useState(() => !!initialLegal || !siteConfig.features.showSplash);

  useEffect(() => {
    if (
      parseLegalFromPath(window.location.pathname) === 'cancellation' &&
      !siteConfig.features.showCancellationPolicy
    ) {
      window.history.replaceState({}, '', '/');
    }
  }, []);

  useEffect(() => {
    const onPop = () => setLegalKind(resolveLegalFromPath(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    if (!legalKind) {
      document.title = siteConfig.seo.title;
    }
  }, [legalKind]);

  const navigateLegal = useCallback((kind: LegalDocKind) => {
    if (kind === 'cancellation' && !siteConfig.features.showCancellationPolicy) return;
    window.history.pushState({}, '', legalKindToPath(kind));
    setLegalKind(kind);
    window.scrollTo(0, 0);
  }, []);

  const goHome = useCallback(() => {
    window.history.pushState({}, '', '/');
    setLegalKind(null);
    window.scrollTo(0, 0);
  }, []);

  const handleSplashComplete = useCallback(() => {
    setSplashDismissed(true);
  }, []);

  const splashVisible = siteConfig.features.showSplash && !splashDismissed;
  const pauseGrain = splashVisible && siteConfig.features.pauseGrainDuringSplash;

  return (
    <>
      <SeoHead />

      {legalKind ? (
        <div className="min-h-screen bg-cream grain-overlay">
          <Navbar legalMode onGoHome={goHome} />
          <main>
            <LegalPage kind={legalKind} onBack={goHome} />
          </main>
          <Suspense fallback={<div className="h-24" aria-hidden="true" />}>
            <Footer onLegalNavigate={navigateLegal} />
          </Suspense>
        </div>
      ) : (
        <>
          {splashVisible && <SplashScreen onComplete={handleSplashComplete} />}
          <div className={`grain-overlay ${pauseGrain ? 'grain-paused' : ''}`}>
            <Navbar />
            <main>
              <div className="relative">
                <div
                  className="sticky top-0 h-0 w-full pointer-events-none overflow-visible"
                  aria-hidden="true"
                >
                  <img
                    src={siteConfig.assets.heroBackground}
                    alt=""
                    className="absolute top-0 left-0 h-screen w-full object-cover"
                    fetchPriority="high"
                    decoding="async"
                  />
                </div>

                <Hero />
                <Suspense fallback={null}>
                  <Philosophy />
                  <MenuSection />
                </Suspense>
              </div>

              <Suspense fallback={<div className="h-24" aria-hidden="true" />}>
                <Process />
                <Ambience />
                <Testimonials />
                <Team />
                <Location />
                <Footer onLegalNavigate={navigateLegal} />
              </Suspense>
            </main>
          </div>
        </>
      )}

      <FloatingDock />
    </>
  );
}
