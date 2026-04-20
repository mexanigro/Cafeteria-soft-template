import { ArrowUp } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

type ScrollToTopProps = {
  visible: boolean;
};

export function ScrollToTop({ visible }: ScrollToTopProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-6 z-[90] bg-background text-espresso w-14 h-14 rounded-full shadow-lg border border-espresso/10 hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
        >
          <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
