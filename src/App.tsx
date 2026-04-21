import { useState, useCallback } from 'react';
import { useSmoothScroll } from '@/src/hooks/useSmoothScroll';
import SplashScreen from '@/src/sections/SplashScreen';
import Navbar from '@/src/sections/Navbar';
import Hero from '@/src/sections/Hero';
import Philosophy from '@/src/sections/Philosophy';
import MenuSection from '@/src/sections/Menu';
import Process from '@/src/sections/Process';
import Ambience from '@/src/sections/Ambience';
import Testimonials from '@/src/sections/Testimonials';
import Team from '@/src/sections/Team';
import Location from '@/src/sections/Location';
import Footer from '@/src/sections/Footer';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  useSmoothScroll();

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      <div className="grain-overlay">
        <Navbar />
        <main>
          <Hero />
          <Philosophy />
          <MenuSection />
          <Process />
          <Ambience />
          <Testimonials />
          <Team />
          <Location />
        </main>
        <Footer />
      </div>
    </>
  );
}
