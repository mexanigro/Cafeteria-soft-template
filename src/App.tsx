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
          <Hero />
          <Suspense fallback={<div className="h-24" aria-hidden="true" />}>
            <Philosophy />
            <MenuSection />
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
