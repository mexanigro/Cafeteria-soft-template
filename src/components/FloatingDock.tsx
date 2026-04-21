import { useEffect, useState } from 'react';
import { siteConfig } from '@/src/config/site';
import { FloatingChat } from '@/src/components/FloatingChat';
import { ScrollToTopButton } from '@/src/components/ScrollToTop';

const SCROLL_SHOW_AFTER_PX = 380;

/**
 * Stacks Gemini chat (top) and scroll-to-top arrow (bottom) on the bottom-right.
 * When the arrow is hidden, only the chat FAB remains—sitting lower to fill that space.
 */
export function FloatingDock() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > SCROLL_SHOW_AFTER_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const showChat = siteConfig.features.showGeminiChat;

  if (!showChat && !showScrollTop) return null;

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[70] flex flex-col gap-3 items-end md:bottom-8 md:right-8">
      <div className="pointer-events-auto flex flex-col gap-3 items-end">
        {showChat ? <FloatingChat /> : null}
        {showScrollTop ? <ScrollToTopButton /> : null}
      </div>
    </div>
  );
}
