import { ChevronUp } from 'lucide-react';

/** Arrow control only (positioning lives in `FloatingDock`). */
export function ScrollToTopButton() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="group relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-caramel/35 bg-cream/90 text-espresso shadow-[0_8px_30px_-8px_rgba(44,24,16,0.35)] backdrop-blur-md transition-all duration-300 hover:border-caramel/70 hover:bg-cream hover:text-caramel hover:shadow-[0_12px_36px_-10px_rgba(74,59,50,0.45)] active:scale-95"
    >
      <ChevronUp
        strokeWidth={2.25}
        className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-0.5"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-espresso/[0.06]"
        aria-hidden
      />
    </button>
  );
}
