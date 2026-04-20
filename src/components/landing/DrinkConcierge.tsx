import { useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { site } from '@/src/config/site';
import { fetchDrinkRecommendation, hasGeminiApiKey } from '@/src/services/ai';

export function DrinkConcierge() {
  const [input, setInput] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const copy = site.drinkConcierge;
  const { ai } = site;

  const handleAsk = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setRecommendation('');

    if (!hasGeminiApiKey()) {
      setRecommendation(ai.conciergeFallback);
      setIsLoading(false);
      return;
    }

    const text = await fetchDrinkRecommendation(
      input.trim(),
      ai.buildConciergePrompt,
      { onError: ai.conciergeFallback, onEmpty: ai.conciergeEmptyFallback },
    );
    setRecommendation(text);
    setIsLoading(false);
  };

  return (
    <div className="bg-primary/30 border border-primary rounded-[2rem] p-6 lg:p-8 mb-16 flex flex-col md:flex-row items-center gap-6 shadow-sm">
      <div className="bg-blush w-16 h-16 rounded-full flex items-center justify-center text-espresso shrink-0">
        <Sparkles className="w-8 h-8" />
      </div>
      <div className="flex-1 w-full">
        <h3 className="text-2xl font-serif mb-2">{copy.title}</h3>
        <p className="text-espresso/70 mb-4 text-lg">{copy.description}</p>
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={copy.inputPlaceholder}
            className="flex-1 px-6 py-4 rounded-full border border-espresso/10 bg-white focus:outline-none focus:ring-2 focus:ring-primary text-espresso text-lg transition-shadow"
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
          />
          <button
            type="button"
            onClick={handleAsk}
            disabled={isLoading || !input.trim()}
            className="bg-espresso text-white px-8 py-3 rounded-full font-medium hover:bg-espresso/90 transition-all shadow-sm disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center min-w-[120px] hover:shadow-md text-lg"
          >
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : copy.askLabel}
          </button>
        </div>
        <AnimatePresence>
          {recommendation && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-6 bg-white p-5 lg:p-6 rounded-2xl border border-espresso/5 text-espresso/90 leading-relaxed font-medium italic relative shadow-sm text-lg"
            >
              &quot; {recommendation} &quot;
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
