import { Suspense, lazy, useCallback, useState } from 'react';
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
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <div className={`grain-overlay ${showSplash ? 'grain-paused' : ''}`}>
        <Navbar />
        <main>
          {/*
           * This wrapper holds the shared sticky background image.
           * The image stays fixed at the top of the viewport while the user
           * scrolls through Hero, Philosophy, and Menu. Once past Menu, the
           * wrapper ends and the image is no longer visible.
           */}
          <div className="relative">
            {/* Sticky background — takes no height, image always at viewport top */}
            <div
              className="sticky top-0 h-0 w-full pointer-events-none overflow-visible"
              aria-hidden="true"
            >
              <img
                src="/images/hero-bg.jpg"
                alt=""
                className="absolute top-0 left-0 h-screen w-full object-cover"
                fetchPriority="high"
                decoding="async"
              />
            </div>

            {/* Sections scroll over the fixed background */}
            <Hero />
            <Suspense fallback={null}>
              <Philosophy />
              <MenuSection />
            </Suspense>
          </div>

          {/* Remaining sections have their own solid backgrounds */}
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
