import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { site } from '@/src/config/site';

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  onOpenFullMenu: () => void;
  onOpenOrder: () => void;
};

export function MobileMenu({ open, onClose, onOpenFullMenu, onOpenOrder }: MobileMenuProps) {
  const { nav } = site;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-background flex flex-col p-6"
        >
          <div className="flex justify-end pt-4 pb-12">
            <button
              type="button"
              onClick={onClose}
              className="bg-espresso/10 p-3 rounded-full hover:bg-espresso/20 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col items-center gap-8 pt-10">
            <button
              type="button"
              onClick={() => {
                onOpenFullMenu();
                onClose();
              }}
              className="text-5xl font-serif hover:opacity-60 transition-opacity"
            >
              {nav.menu}
            </button>
            <a
              href="#vibe"
              onClick={onClose}
              className="text-5xl font-serif hover:opacity-60 transition-opacity"
            >
              {nav.vibe}
            </a>
            <a
              href="#visit"
              onClick={onClose}
              className="text-5xl font-serif hover:opacity-60 transition-opacity"
            >
              {nav.visit}
            </a>
            <div className="pt-8">
              <button
                type="button"
                onClick={() => {
                  onOpenOrder();
                  onClose();
                }}
                className="bg-espresso text-white px-12 py-5 rounded-full text-xl font-medium shadow-lg hover:scale-105 transition-transform w-full"
              >
                {nav.orderAhead}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
