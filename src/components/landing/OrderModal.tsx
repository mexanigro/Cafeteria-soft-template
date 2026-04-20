import { useState, type FormEvent } from 'react';
import { ShoppingBag, Sparkles, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { site } from '@/src/config/site';

type OrderModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const copy = site.orderModal;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-espresso/20 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-background w-full max-w-md rounded-[2rem] p-8 shadow-2xl border border-espresso/10 z-10"
          >
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary rounded-full blur-2xl opacity-50 pointer-events-none" />
            <button
              type="button"
              onClick={onClose}
              className="absolute top-6 right-6 text-espresso/50 hover:text-espresso transition-colors bg-white/50 p-2 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="bg-blush w-12 h-12 rounded-full flex items-center justify-center text-espresso mb-6">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-serif text-espresso mb-2 tracking-tight">{copy.title}</h3>

            {!submitted ? (
              <>
                <p className="text-espresso/70 mb-6 text-lg leading-relaxed">{copy.body}</p>
                <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={copy.emailPlaceholder}
                    className="w-full px-5 py-4 rounded-full border border-espresso/10 bg-white focus:outline-none focus:ring-2 focus:ring-primary text-espresso transition-all"
                  />
                  <button
                    type="submit"
                    className="w-full bg-espresso text-white px-6 py-4 rounded-full font-medium hover:bg-espresso/90 transition-colors shadow-sm text-lg"
                  >
                    {copy.submitLabel}
                  </button>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-8 text-center text-espresso relative z-10"
              >
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary" />
                <p className="text-2xl font-serif mb-2">{copy.successTitle}</p>
                <p className="text-espresso/70">{copy.successBody}</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
