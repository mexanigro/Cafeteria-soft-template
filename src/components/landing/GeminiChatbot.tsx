import { useEffect, useRef, useState } from 'react';
import { Loader2, MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { site } from '@/src/config/site';
import { createGeminiChat, hasGeminiApiKey } from '@/src/services/ai';
import type { GeminiChatHandle } from '@/src/services/ai';

type ChatMessage = { role: 'user' | 'model'; text: string };

export function GeminiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: site.chatbot.initialMessage },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<GeminiChatHandle | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { chatbot, ai } = site;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    if (!hasGeminiApiKey()) {
      setMessages((prev) => [...prev, { role: 'model', text: chatbot.offlineMessage }]);
      setIsLoading(false);
      return;
    }

    try {
      if (!chatRef.current) {
        const chat = createGeminiChat(ai.chatSystemInstruction);
        if (!chat) {
          setMessages((prev) => [...prev, { role: 'model', text: chatbot.offlineMessage }]);
          setIsLoading(false);
          return;
        }
        chatRef.current = chat;
      }

      const text = await chatRef.current.sendMessage(userMsg);
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: text || ai.chatGenericReply },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: 'model', text: chatbot.errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-80 sm:w-96 bg-background border border-espresso/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col h-[500px]"
          >
            <div className="bg-primary p-5 flex justify-between items-center text-espresso">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-full shadow-sm">
                  <Sparkles className="w-5 h-5 text-espresso" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-lg leading-tight">{chatbot.title}</h3>
                  <p className="text-[11px] uppercase tracking-wider opacity-60 font-medium">
                    {chatbot.poweredBy}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="hover:opacity-70 bg-white/50 p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 scroll-smooth bg-white flex flex-col gap-4">
              {messages.map((msg, i) => (
                <div key={`${msg.role}-${i}`} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] p-4 text-sm leading-relaxed shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-espresso text-white rounded-3xl rounded-tr-sm'
                        : 'bg-blush text-espresso rounded-3xl rounded-tl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-primary/50 text-espresso p-4 rounded-3xl rounded-tl-sm text-sm flex gap-2 items-center">
                    <Loader2 className="w-4 h-4 animate-spin" /> {chatbot.typingLabel}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-espresso/5">
              <div className="flex bg-background p-2 rounded-full border border-espresso/10 shadow-sm focus-within:ring-2 focus-within:ring-primary transition-all">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={chatbot.inputPlaceholder}
                  className="flex-1 bg-transparent px-4 py-2 outline-none text-espresso text-sm"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="bg-espresso text-white p-2 rounded-full disabled:opacity-50 hover:bg-espresso/80 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-espresso text-white w-14 h-14 rounded-full shadow-xl hover:scale-110 transition-transform duration-300 relative group flex items-center justify-center float-right"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {!isOpen && (
          <span className="absolute top-0 -right-1 bg-blush text-espresso w-5 h-5 text-[10px] flex items-center justify-center rounded-full font-bold border-2 border-white shadow-sm">
            {chatbot.badgeCount}
          </span>
        )}
      </button>
    </div>
  );
}
