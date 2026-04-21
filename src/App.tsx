import { Suspense, lazy, useCallback, useState } from 'react';
import { siteConfig } from '@/src/config/site';
import { SeoHead } from '@/src/components/SeoHead';
import Navbar from '@/src/sections/Navbar';
import Hero from '@/src/sections/Hero';
import SplashScreen from '@/src/sections/SplashScreen';
const Philosophy = lazy(() => import('@/src/sections/Philosophy'));
const MenuSection = lazy(() => import('@/src/sections/Menu'));
const Process = lazy(() => import('@/src/sections/Process'));
const Ambience = lazy(() => import('@/src/sections/Ambience'));
const Testimonials = lazy(() => import('@/src/sections/Testimonials'));
const Team = lazy(() => import('@/src/sections/Team'));
const Location = lazy(() => import('@/src/sections/Location'));
const Footer = lazy(() => import('@/src/sections/Footer'));

export default function App() {
  const [splashDismissed, setSplashDismissed] = useState(
    !siteConfig.features.showSplash
  );

  const handleSplashComplete = useCallback(() => {
    setSplashDismissed(true);
  }, []);

  const splashVisible =
    siteConfig.features.showSplash && !splashDismissed;
  const pauseGrain =
    splashVisible && siteConfig.features.pauseGrainDuringSplash;

  return (
    <>
      <SeoHead />
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
            <Footer />
          </Suspense>
        </main>
      </div>
    </>
  );
}
