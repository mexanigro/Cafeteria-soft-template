import { useEffect, useState } from 'react';
import { site } from '@/src/config/site';
import { Footer } from '@/src/components/landing/Footer';
import { Gallery } from '@/src/components/landing/Gallery';
import HeroSection from '@/src/components/landing/HeroSection';
import { MobileMenu } from '@/src/components/landing/MobileMenu';
import MenuSection from '@/src/components/landing/Menu';
import { Navbar } from '@/src/components/landing/Navbar';
import { ScrollToTop } from '@/src/components/landing/ScrollToTop';
import { TheVibe } from '@/src/components/landing/TheVibe';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="overflow-x-hidden min-h-screen bg-background text-espresso selection:bg-primary font-sans">
      <Navbar
        brandName={site.brand.name}
        isScrolled={isScrolled}
        nav={site.nav}
        vibeHref="#vibe"
        visitHref="#visit"
        onOpenFullMenu={() => scrollTo('#menu')}
        onOpenOrder={() => scrollTo('#visit')}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen((v) => !v)}
      />
      <HeroSection />
      <TheVibe />
      <MenuSection />
      <Gallery />
      <Footer onScrollTop={scrollTop} />

      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenFullMenu={() => scrollTo('#menu')}
        onOpenOrder={() => scrollTo('#visit')}
      />

      <ScrollToTop visible={isScrolled} />
    </main>
  );
}
