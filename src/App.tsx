import { useEffect, useState } from 'react';
import { site } from '@/src/config/site';
import { Footer } from '@/src/components/landing/Footer';
import { FullMenuPage } from '@/src/components/landing/FullMenuPage';
import { Gallery } from '@/src/components/landing/Gallery';
import { GeminiChatbot } from '@/src/components/landing/GeminiChatbot';
import { Hero } from '@/src/components/landing/Hero';
import { Menu } from '@/src/components/landing/Menu';
import { MobileMenu } from '@/src/components/landing/MobileMenu';
import { Navbar } from '@/src/components/landing/Navbar';
import { OrderModal } from '@/src/components/landing/OrderModal';
import { ScrollToTop } from '@/src/components/landing/ScrollToTop';
import { TheVibe } from '@/src/components/landing/TheVibe';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openFullMenu = () => setIsFullMenuOpen(true);
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-background text-espresso selection:bg-primary font-sans">
      <Navbar
        brandName={site.brand.name}
        isScrolled={isScrolled}
        nav={site.nav}
        vibeHref="#vibe"
        visitHref="#visit"
        onOpenFullMenu={openFullMenu}
        onOpenOrder={() => setIsOrderModalOpen(true)}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen((v) => !v)}
      />

      <Hero onOpenFullMenu={openFullMenu} />
      <TheVibe />
      <Menu onOpenFullMenu={openFullMenu} />
      <Gallery />
      <Footer onScrollTop={scrollTop} />

      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenFullMenu={openFullMenu}
        onOpenOrder={() => setIsOrderModalOpen(true)}
      />

      <ScrollToTop visible={isScrolled} />

      <GeminiChatbot />
      <OrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />
      <FullMenuPage isOpen={isFullMenuOpen} onClose={() => setIsFullMenuOpen(false)} />
    </div>
  );
}
