import { useEffect, useState } from 'react';
import { siteConfig } from '@/src/config/site';
import { FloatingChat } from '@/src/components/FloatingChat';
import { ScrollToTopButton } from '@/src/components/ScrollToTop';

const SCROLL_SHOW_AFTER_PX = 380;

const DOCK_EASE = 'cubic-bezier(0.33, 1, 0.53, 1)';
const DOCK_MS = 520;

function usePrefersReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduce;
}

/**
 * Chat FAB above, scroll arrow below — same stack always when chat is on so the arrow row can
 * animate open/closed (CSS grid `0fr` → `1fr`) instead of teleporting layout.
 */
export function FloatingDock() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const dockMs = reduceMotion ? 0 : DOCK_MS;

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > SCROLL_SHOW_AFTER_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const showChat = siteConfig.features.showGeminiChat;

  if (!showChat && !showScrollTop) return null;

  // Solo flecha (Gemini desactivado): una sola columna, sin grid de dos filas.
  if (!showChat && showScrollTop) {
    return (
      <div className="pointer-events-none fixed bottom-6 right-6 z-[70] md:bottom-8 md:right-8">
        <div className="pointer-events-auto">
          <ScrollToTopButton />
        </div>
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[70] md:bottom-8 md:right-8">
      <div
        className="pointer-events-auto grid w-max justify-items-end overflow-visible"
        style={{
          gridTemplateRows: showScrollTop ? 'auto minmax(0,1fr)' : 'auto minmax(0,0fr)',
          rowGap: showScrollTop ? '0.75rem' : '0px',
          transition: `grid-template-rows ${dockMs}ms ${DOCK_EASE}, row-gap ${dockMs}ms ${DOCK_EASE}`,
        }}
      >
        <div
          className="min-h-0 self-end"
          style={{
            transition: `transform ${dockMs}ms ${DOCK_EASE}`,
          }}
        >
          <FloatingChat />
        </div>
        <div className="min-h-0 min-w-0 overflow-hidden">
          <div
            style={{
              opacity: showScrollTop ? 1 : 0,
              transform: showScrollTop ? 'translateY(0)' : 'translateY(8px)',
              pointerEvents: showScrollTop ? 'auto' : 'none',
              transition: `opacity ${dockMs}ms ${DOCK_EASE}, transform ${dockMs}ms ${DOCK_EASE}`,
            }}
          >
            <ScrollToTopButton />
          </div>
        </div>
      </div>
    </div>
  );
}
