import { useEffect, useId, useRef, useState } from 'react';
import { MessageCircle, Send, X, Loader2 } from 'lucide-react';
import { siteConfig } from '@/src/config/site';
import { buildGeminiSiteContext } from '@/src/lib/buildGeminiSiteContext';
import { startGeminiSiteChat } from '@/src/services/geminiChat';

type ChatMsg = { role: 'user' | 'model'; text: string };

export function FloatingChat() {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sessionRef = useRef<ReturnType<typeof startGeminiSiteChat>>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const apiKeyConfigured = Boolean(import.meta.env.VITE_GEMINI_API_KEY?.trim());

  useEffect(() => {
    sessionRef.current = null;
    setMessages([]);
    setError(null);
  }, [siteConfig.id]);

  useEffect(() => {
    if (!apiKeyConfigured || sessionRef.current) return;
    sessionRef.current = startGeminiSiteChat(buildGeminiSiteContext(siteConfig));
  }, [apiKeyConfigured, siteConfig.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  async function sendMessage() {
    const text = input.trim();
    if (!text || busy) return;
    setError(null);
    setInput('');

    const session = sessionRef.current;
    if (!session) {
      setError('Chat is not ready. Check your API key.');
      return;
    }

    setBusy(true);
    setMessages((m) => [...m, { role: 'user', text }, { role: 'model', text: '' }]);

    try {
      const streamResult = await session.sendMessageStream(text);
      let acc = '';
      for await (const chunk of streamResult.stream) {
        let delta = '';
        try {
          delta = chunk.text();
        } catch {
          continue;
        }
        acc += delta;
        const snapshot = acc;
        setMessages((m) => {
          const copy = [...m];
          const last = copy.length - 1;
          if (copy[last]?.role === 'model') copy[last] = { role: 'model', text: snapshot };
          return copy;
        });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Could not get a reply.';
      setError(msg);
      setMessages((m) => {
        const copy = [...m];
        const last = copy.length - 1;
        if (copy[last]?.role === 'model' && !copy[last].text) copy.pop();
        return copy;
      });
    } finally {
      setBusy(false);
    }
  }

  if (!siteConfig.features.showGeminiChat) return null;

  return (
    <div className="relative flex flex-col items-end">
      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="Assistant chat"
          className="absolute bottom-full right-0 z-[80] mb-3 flex w-[min(100vw-3rem,22rem)] max-h-[min(70vh,520px)] flex-col overflow-hidden rounded-2xl border border-espresso/10 bg-cream shadow-2xl"
        >
          <div className="border-b border-espresso/10 bg-mocha px-4 py-3">
            <p className="font-serif text-lg text-latte">{siteConfig.brand.displayName}</p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-latte/50">Ask us anything</p>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm text-espresso">
            {!apiKeyConfigured && (
              <p className="rounded-xl bg-matcha/50 p-3 text-stone">
                Add <code className="text-xs">VITE_GEMINI_API_KEY</code> to your <code className="text-xs">.env</code> and
                restart the dev server. Restrict the key by HTTP referrer in Google AI Studio for production.
              </p>
            )}
            {apiKeyConfigured && messages.length === 0 && (
              <p className="text-stone/90 leading-relaxed">
                Hi! I can summarize what we offer, hours, and how to find us—based on this site&apos;s info. What would
                you like to know?
              </p>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[95%] rounded-2xl px-3 py-2 leading-relaxed ${
                  msg.role === 'user'
                    ? 'ml-auto bg-espresso text-cream'
                    : 'mr-auto bg-matcha/40 text-espresso'
                }`}
              >
                {msg.text || (busy && i === messages.length - 1 && msg.role === 'model' ? '…' : msg.text)}
              </div>
            ))}
            {error && <p className="text-sm text-red-700/90">{error}</p>}
            <div ref={bottomRef} />
          </div>

          <form
            className="border-t border-espresso/10 p-3"
            onSubmit={(e) => {
              e.preventDefault();
              void sendMessage();
            }}
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={apiKeyConfigured ? 'Hours, menu, location…' : 'Configure API key first'}
                disabled={!apiKeyConfigured || busy}
                className="min-w-0 flex-1 rounded-xl border border-espresso/15 bg-white/80 px-3 py-2.5 text-sm text-espresso outline-none placeholder:text-stone/50 focus:border-caramel focus:ring-1 focus:ring-caramel/30"
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={!apiKeyConfigured || busy || !input.trim()}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-caramel text-mocha transition-colors hover:bg-espresso hover:text-cream disabled:opacity-40"
                aria-label="Send"
              >
                {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="relative z-[75] flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-espresso text-cream shadow-lg transition-transform hover:scale-105 hover:bg-mocha active:scale-95"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Close assistant' : 'Open assistant'}
      >
        {open ? <X className="h-6 w-6" aria-hidden /> : <MessageCircle className="h-6 w-6" aria-hidden />}
      </button>
    </div>
  );
}
