import React, { useState, useEffect, useRef } from 'react';
import { Coffee, Leaf, Wind, Instagram, Facebook, ArrowRight, Menu as MenuIcon, X, Sparkles, Loader2, MessageCircle, Send, ArrowUp, ShoppingBag, ArrowLeft, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';

// --- Assets & Constants ---
const COLORS = {
  cream: '#FDFBF7',
  matcha: '#E8ECD7',
  blush: '#FDEBED',
  espresso: '#4A3B32',
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1510970174660-c1950427163f?auto=format&fit=crop&q=80&w=800",
  matcha: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&q=80&w=800",
  pastry: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800",
  interior: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
  latte: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?auto=format&fit=crop&q=80&w=800",
  vibes: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800"
};

const FULL_MENU_DATA = [
  {
    category: "Espresso Bar",
    items: [
      { name: "Oat Milk Latte", desc: "Our signature smooth espresso with organic steamed oat milk.", price: "5.50", img: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?auto=format&fit=crop&q=80&w=300" },
      { name: "Vanilla Bean Flat White", desc: "Double ristretto over silky micro-foam with real Madagascar vanilla.", price: "5.75", img: "https://images.unsplash.com/photo-1589396575653-c09c794f6f25?auto=format&fit=crop&q=80&w=300" },
      { name: "Cortado", desc: "Equal parts espresso and steamed milk for a robust, balanced cup.", price: "4.25", img: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&q=80&w=300" },
      { name: "Honey Lavender Latte", desc: "Warm floral notes sweetened with locally sourced wildflower honey.", price: "6.25", img: "https://images.unsplash.com/photo-1558220822-48a0429f62c0?auto=format&fit=crop&q=80&w=300" },
      { name: "Seasonal Cold Brew", desc: "Slow-steeped 18 hours for a remarkably smooth, low-acid finish.", price: "5.00", img: "https://images.unsplash.com/photo-1499961024600-ad094db6050f?auto=format&fit=crop&q=80&w=300" },
    ]
  },
  {
    category: "Matcha & Tea",
    items: [
      { name: "Ceremonial Matcha Latte", desc: "First-harvest shade-grown matcha from Uji, Japan whisked to perfection.", price: "6.50", img: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&q=80&w=300" },
      { name: "Iced Strawberry Matcha", desc: "Vibrant matcha layered over house-made strawberry puree and oat milk.", price: "7.25", img: "https://images.unsplash.com/photo-1536622204907-285b7b9cb03f?auto=format&fit=crop&q=80&w=300" },
      { name: "Rose Petal Herbal Tea", desc: "A delicate, caffeine-free infusion of organic rose petals and chamomile.", price: "4.50", img: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?auto=format&fit=crop&q=80&w=300" },
      { name: "Hojicha Roasted Latte", desc: "Deep, naturally sweet flavors from roasted green tea leaves.", price: "6.00", img: "https://images.unsplash.com/photo-1606791405788-b22e11e86a07?auto=format&fit=crop&q=80&w=300" },
      { name: "Earl Grey Fog", desc: "Classic bergamot black tea smoothed out with steamed milk and vanilla.", price: "5.50", img: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=300" },
    ]
  },
  {
    category: "Artisan Pastries",
    items: [
      { name: "Matcha Croissant", desc: "Flaky, buttery layers filled with a rich white-chocolate matcha cream.", price: "4.75", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=300" },
      { name: "Raspberry Pistachio Tart", desc: "Almond frangipane, fresh berries, and crushed pistachios.", price: "6.50", img: "https://images.unsplash.com/photo-1501438234857-418a09cf3dc2?auto=format&fit=crop&q=80&w=300" },
      { name: "Cardamom Bun", desc: "A soft, fragrant Swedish-style knot glazed with pearl sugar.", price: "4.50", img: "https://images.unsplash.com/photo-1621236378699-8597faa6a01e?auto=format&fit=crop&q=80&w=300" },
      { name: "Vegan Lemon Loaf", desc: "Moist, zesty, and topped with a thickly-poured icing glaze.", price: "3.75", img: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&q=80&w=300" },
    ]
  },
  {
    category: "Signature Toasts",
    items: [
      { name: "Avocado & Microgreens", desc: "Smashed avocado, radish, toasted seeds, and micro-cilantro on thick-cut sourdough.", price: "9.50", img: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&q=80&w=300" },
      { name: "Ricotta & Fig", desc: "Whipped lemon ricotta, sliced seasonal figs, and a drizzle of local hot honey.", price: "10.00", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=300" },
      { name: "Smoked Salmon & Dill", desc: "Cold-smoked salmon, herb cream cheese, pickled onions, and fresh dill.", price: "12.50", img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=300" }
    ]
  },
  {
    category: "Cold Pressed Wellness",
    items: [
      { name: "The Morning Glow", desc: "Carrot, orange, ginger, and a hint of turmeric.", price: "8.00", img: "https://images.unsplash.com/photo-1600271886742-f049cd451b62?auto=format&fit=crop&q=80&w=300" },
      { name: "Green Reset", desc: "Cucumber, celery, green apple, spinach, and lemon.", price: "8.50", img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=300" }
    ]
  }
];

const FullMenuPage = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [zoomedImage, setZoomedImage] = useState<{src: string, alt: string} | null>(null);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

  return (
    <>
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          id="full-menu-scroll-container"
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[250] bg-[#FDFBF7] overflow-y-auto scroll-smooth"
        >
          {/* Header & Mini Menu */ }
          <div className="sticky top-0 bg-[#FDFBF7]/90 backdrop-blur-md z-20 border-b border-[#4A3B32]/10 shadow-sm flex flex-col">
            <div className="py-4 px-6 md:px-12 flex justify-between items-center">
              <button 
                onClick={onClose}
                className="flex items-center gap-2 text-[#4A3B32] font-medium hover:bg-[#4A3B32]/10 py-2 px-4 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" /> Back to Home
              </button>
              <div className="text-xl font-serif font-semibold tracking-tight hidden sm:block">Oat & Bean Complete Menu</div>
            </div>
            
            {/* Mini Category Navigation */}
            <div className="flex overflow-x-auto no-scrollbar py-3 px-6 justify-start sm:justify-center gap-3 border-t border-[#4A3B32]/5 bg-white/40">
              {FULL_MENU_DATA.map((section, idx) => (
                <button 
                  key={idx}
                  onClick={() => {
                    const el = document.getElementById(`category-${idx}`);
                    if (el) {
                      // Uses scrollIntoView. The scroll-mt-[140px] utility class handles the sticky offset.
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="whitespace-nowrap px-6 py-2 rounded-full border border-[#4A3B32]/10 bg-[#FDFBF7] text-[#4A3B32] font-medium hover:bg-[#E8ECD7] hover:border-[#E8ECD7] transition-all duration-300 shadow-sm text-sm"
                >
                  {section.category}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-5xl mx-auto py-12 px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="text-5xl lg:text-7xl font-serif text-[#4A3B32] mb-6 tracking-tight">The Collection</h2>
              <div className="w-16 h-1 bg-[#E8ECD7] mx-auto rounded-full mb-6" />
              <p className="text-xl text-[#4A3B32]/70 max-w-2xl mx-auto">
                Explore our full, meticulously crafted selection of specialty beverages and artisan pastries. Every item holds a story.
              </p>
            </div>

            <div className="space-y-24">
              {FULL_MENU_DATA.map((section, sIdx) => (
                <div key={sIdx} id={`category-${sIdx}`} className="scroll-mt-[160px]">
                  <div className="flex items-center gap-6 mb-12">
                    <h3 className="text-4xl font-serif text-[#4A3B32]">{section.category}</h3>
                    <div className="h-px bg-[#4A3B32]/10 flex-1" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    {section.items.map((item, i) => (
                      <div key={i} className="flex gap-5 group rounded-[1.5rem] p-4 bg-white shadow-sm border border-[#4A3B32]/5 hover:shadow-md transition-all duration-300">
                        {/* Enlargeable Image Thumbnail */}
                        <div 
                          className="relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden cursor-pointer shadow-sm border-[4px] border-white"
                          onClick={() => setZoomedImage({ src: item.img, alt: item.name })}
                        >
                          <img 
                            src={item.img} 
                            alt={item.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <Search className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                        
                        <div className="flex-1 flex flex-col justify-center">
                          <div className="flex justify-between items-start mb-2 gap-4">
                            <h4 className="text-xl font-medium text-[#4A3B32] leading-tight">{item.name}</h4>
                            <span className="text-lg font-serif italic text-[#4A3B32]/80 shrink-0">${item.price}</span>
                          </div>
                          <p className="text-[#4A3B32]/60 text-sm leading-relaxed pr-2">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <footer className="bg-[#FDEBED]/30 border-t border-[#4A3B32]/10 pt-24 pb-12 px-6 md:px-12 mt-12 w-full">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                <div className="col-span-1 md:col-span-2">
                  <h2 className="text-5xl font-serif mb-8 text-[#4A3B32]">Visit Oat & Bean</h2>
                  <p className="text-xl text-[#4A3B32]/70 max-w-sm leading-relaxed mb-8">
                    We're located in the heart of the design district. Come in for the coffee, stay for the calm.
                  </p>
                  <div className="flex gap-4">
                    <a href="#" className="w-12 h-12 bg-[#4A3B32] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      <Instagram size={20} />
                    </a>
                    <a href="#" className="w-12 h-12 bg-[#4A3B32] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      <Facebook size={20} />
                    </a>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold uppercase tracking-widest text-[#4A3B32] text-[11px] mb-6 opacity-40">Hours</h4>
                  <ul className="space-y-4 text-lg text-[#4A3B32]">
                    <li className="flex justify-between items-center"><span className="font-medium">Mon - Fri</span> <span className="opacity-80">7am - 6pm</span></li>
                    <li className="flex justify-between items-center"><span className="font-medium">Sat - Sun</span> <span className="opacity-80">8am - 5pm</span></li>
                  </ul>
                </div>

                <div className="col-span-1 md:col-span-2">
                  <h4 className="font-bold uppercase tracking-widest text-[#4A3B32] text-[11px] mb-6 opacity-40">Location</h4>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <p className="text-lg leading-relaxed opacity-80 text-[#4A3B32] shrink-0">
                      124 Aesthetic Ave.<br />
                      Soft Palette District<br />
                      Portland, OR 97201
                    </p>
                    <div className="w-full h-32 rounded-2xl overflow-hidden shadow-sm border-[4px] border-white/50 relative">
                      <div className="absolute inset-0 bg-[#4A3B32]/5 pointer-events-none z-10 rounded-2xl"></div>
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.5397444264627!2d-122.68413128444086!3d45.52345107910167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54950a03bb38e1df%3A0xc6c764fa58f8b340!2sPearl%20District%2C%20Portland%2C%20OR!5e0!3m2!1sen!2sus!4v1683134375051!5m2!1sen!2sus" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0, filter: 'grayscale(0.4) opacity(0.9) contrast(0.9)' }} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-12 border-t border-[#4A3B32]/10 flex flex-col md:flex-row justify-between items-center gap-6">
                <button 
                  onClick={() => {
                    const el = document.getElementById("full-menu-scroll-container");
                    if (el) el.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-2xl font-serif tracking-tight text-[#4A3B32] hover:opacity-70 transition-opacity"
                >
                  Oat & Bean
                </button>
                <div className="text-[#4A3B32]/40 text-sm font-medium">
                  © {new Date().getFullYear()} Oat & Bean Specialty Coffee. Handcrafted by Design.
                </div>
              </div>
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Image Zoom Modal enclosed within the page to ensure z-indices don't fight */}
    <AnimatePresence>
      {zoomedImage && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setZoomedImage(null)}
          className="fixed inset-0 z-[300] bg-black/40 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 cursor-zoom-out"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-[#FDFBF7] rounded-[2rem] shadow-2xl overflow-hidden cursor-default flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-[#4A3B32]/10">
              <motion.h3 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.1 } }}
                className="text-2xl font-serif text-[#4A3B32]"
              >
                {zoomedImage.alt}
              </motion.h3>
              <button 
                onClick={() => setZoomedImage(null)}
                className="bg-[#4A3B32]/5 hover:bg-[#4A3B32]/10 text-[#4A3B32] p-2 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Image Container */}
            <div className="relative w-full bg-white/50 p-6 md:p-10 flex items-center justify-center">
              <img 
                src={zoomedImage.src.replace('w=300', 'w=1200')} 
                alt={zoomedImage.alt} 
                className="rounded-[1.5rem] object-contain max-h-[65vh] w-auto shadow-md border-[6px] border-white"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </>
  );
};

const DrinkConcierge = () => {
  const [input, setInput] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setRecommendation("");
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `You are a friendly barista at 'Oat & Bean', a specialty coffee shop with a soft pastel aesthetic. 
Our menu:
- Espresso Bar: Oat Milk Latte, Vanilla Bean Flat White, Cortado, Honey Lavender Latte, Seasonal Cold Brew.
- Matcha & Tea: Ceremonial Matcha Latte, Iced Strawberry Matcha, Rose Petal Herbal Tea, Hojicha Roasted Latte, Earl Grey Fog.

Customer says: "${input}"
Respond with a very brief (1-2 sentences), friendly suggestion recommending exactly ONE specific drink from our menu that best fits their mood. Keep the tone warm, organic, and calm. Do not output markdown, just plain text.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setRecommendation(response.text || "Hmm, I'd definitely recommend our Classic Oat Milk Latte today.");
    } catch (error) {
      console.error(error);
      setRecommendation("I'd recommend our Vanilla Bean Flat White to soothe the soul.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#E8ECD7]/30 border border-[#E8ECD7] rounded-[2rem] p-6 lg:p-8 mb-16 flex flex-col md:flex-row items-center gap-6 shadow-sm">
      <div className="bg-[#FDEBED] w-16 h-16 rounded-full flex items-center justify-center text-[#4A3B32] shrink-0">
        <Sparkles className="w-8 h-8" />
      </div>
      <div className="flex-1 w-full">
        <h3 className="text-2xl font-serif mb-2">The AI Concierge</h3>
        <p className="text-[#4A3B32]/70 mb-4 text-lg">Not sure what to get? Tell me how you're feeling.</p>
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 'I need something cozy and sweet'" 
            className="flex-1 px-6 py-4 rounded-full border border-[#4A3B32]/10 bg-white focus:outline-none focus:ring-2 focus:ring-[#E8ECD7] text-[#4A3B32] text-lg transition-shadow"
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
          />
          <button 
            onClick={handleAsk}
            disabled={isLoading || !input.trim()}
            className="bg-[#4A3B32] text-white px-8 py-3 rounded-full font-medium hover:bg-[#4A3B32]/90 transition-all shadow-sm disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center min-w-[120px] hover:shadow-md text-lg"
          >
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Ask'}
          </button>
        </div>
        <AnimatePresence>
          {recommendation && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-6 bg-white p-5 lg:p-6 rounded-2xl border border-[#4A3B32]/5 text-[#4A3B32]/90 leading-relaxed font-medium italic relative shadow-sm text-lg"
            >
               " {recommendation} "
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const OrderModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
      onClose();
    }, 3000);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#4A3B32]/20 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-[#FDFBF7] w-full max-w-md rounded-[2rem] p-8 shadow-2xl border border-[#4A3B32]/10 z-10"
          >
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#E8ECD7] rounded-full blur-2xl opacity-50 pointer-events-none" />
            <button onClick={onClose} className="absolute top-6 right-6 text-[#4A3B32]/50 hover:text-[#4A3B32] transition-colors bg-white/50 p-2 rounded-full">
              <X className="w-5 h-5" />
            </button>
            <div className="bg-[#FDEBED] w-12 h-12 rounded-full flex items-center justify-center text-[#4A3B32] mb-6">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-serif text-[#4A3B32] mb-2 tracking-tight">Order Ahead</h3>
            
            {!submitted ? (
              <>
                <p className="text-[#4A3B32]/70 mb-6 text-lg leading-relaxed">
                  Our quick-order system is currently brewing! Enter your email to be the first to know when it launches.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com" 
                    className="w-full px-5 py-4 rounded-full border border-[#4A3B32]/10 bg-white focus:outline-none focus:ring-2 focus:ring-[#E8ECD7] text-[#4A3B32] transition-all"
                  />
                  <button 
                    type="submit"
                    className="w-full bg-[#4A3B32] text-white px-6 py-4 rounded-full font-medium hover:bg-[#4A3B32]/90 transition-colors shadow-sm text-lg"
                  >
                    Notify Me
                  </button>
                </form>
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="py-8 text-center text-[#4A3B32] relative z-10"
              >
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-[#E8ECD7]" />
                <p className="text-2xl font-serif mb-2">You're on the list!</p>
                <p className="text-[#4A3B32]/70">We'll let you know soon.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

const GeminiChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: "Hi! I'm your Oat & Bean virtual barista. Any questions about our coffee or pastries?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);
    
    try {
      if (!chatRef.current) {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        chatRef.current = ai.chats.create({
          model: "gemini-3-flash-preview",
          config: {
            systemInstruction: "You are the AI assistant for Oat & Bean, a soft pastel aesthetic specialty coffee shop. Keep responses short, warm, and helpful. Plain text only, no markdown."
          }
        });
      }
      
      const response = await chatRef.current.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { role: 'model', text: response.text || "Good question! But I need a little more detail." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Oops, my coffee machine is acting up. Could you try again?" }]);
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
            className="absolute bottom-20 right-0 w-80 sm:w-96 bg-[#FDFBF7] border border-[#4A3B32]/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col h-[500px]"
          >
            <div className="bg-[#E8ECD7] p-5 flex justify-between items-center text-[#4A3B32]">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-full shadow-sm">
                  <Sparkles className="w-5 h-5 text-[#4A3B32]" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-lg leading-tight">Oat & Bean Chat</h3>
                  <p className="text-[11px] uppercase tracking-wider opacity-60 font-medium">Powered by Gemini</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:opacity-70 bg-white/50 p-2 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 scroll-smooth bg-white flex flex-col gap-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-[#4A3B32] text-white rounded-3xl rounded-tr-sm' 
                      : 'bg-[#FDEBED] text-[#4A3B32] rounded-3xl rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#E8ECD7]/50 text-[#4A3B32] p-4 rounded-3xl rounded-tl-sm text-sm flex gap-2 items-center">
                    <Loader2 className="w-4 h-4 animate-spin" /> Typing...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-[#4A3B32]/5">
              <div className="flex bg-[#FDFBF7] p-2 rounded-full border border-[#4A3B32]/10 shadow-sm focus-within:ring-2 focus-within:ring-[#E8ECD7] transition-all">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a barista..."
                  className="flex-1 bg-transparent px-4 py-2 outline-none text-[#4A3B32] text-sm"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="bg-[#4A3B32] text-white p-2 rounded-full disabled:opacity-50 hover:bg-[#4A3B32]/80 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#4A3B32] text-white w-14 h-14 rounded-full shadow-xl hover:scale-110 transition-transform duration-300 relative group flex items-center justify-center float-right"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {!isOpen && (
          <span className="absolute top-0 -right-1 bg-[#FDEBED] text-[#4A3B32] w-5 h-5 text-[10px] flex items-center justify-center rounded-full font-bold border-2 border-white shadow-sm">1</span>
        )}
      </button>
    </div>
  );
};

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

  const NavLink = ({ href, onClick, children }: { href?: string, onClick?: () => void, children: React.ReactNode }) => {
    if (onClick) {
      return (
        <button onClick={onClick} className="text-[#4A3B32] font-medium hover:opacity-60 transition-opacity duration-300">
          {children}
        </button>
      )
    }
    return (
      <a href={href!} className="text-[#4A3B32] font-medium hover:opacity-60 transition-opacity duration-300">
        {children}
      </a>
    )
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#4A3B32] selection:bg-[#E8ECD7] font-sans">
      {/* --- Google Fonts Import --- */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Inter:wght@400;500&display=swap');
        .font-serif { font-family: 'Fraunces', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      {/* --- Navbar --- */}
      <nav className={`fixed w-full z-50 transition-all duration-500 px-6 py-4 ${isScrolled ? 'bg-[#FDFBF7]/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-2xl font-serif font-semibold tracking-tight hover:opacity-70 transition-opacity"
          >
            Oat & Bean
          </button>
          
          <div className="hidden md:flex space-x-12">
            <NavLink onClick={() => setIsFullMenuOpen(true)}>Menu</NavLink>
            <NavLink href="#vibe">Vibe</NavLink>
            <NavLink href="#visit">Visit</NavLink>
          </div>

          <div className="hidden md:block">
            <button onClick={() => setIsOrderModalOpen(true)} className="bg-[#4A3B32] text-white px-8 py-3 rounded-full font-medium hover:scale-105 transition-transform duration-300 shadow-lg shadow-black/5">
              Order Ahead
            </button>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-[#FDEBED] p-10 lg:p-14 rounded-[2rem] relative overflow-hidden flex flex-col justify-center h-full"
          >
            <div className="relative z-10">
              <div className="inline-block bg-[#E8ECD7] px-4 py-1 rounded-full text-sm font-medium mb-6">
                Est. 2024 • Organic & Ethically Sourced
              </div>
              <h1 className="text-6xl lg:text-8xl font-serif leading-[1.1] mb-8">
                Sip, Savor, <br />
                <span className="italic text-[#4A3B32]/60">Stay.</span>
              </h1>
              <p className="text-xl text-[#4A3B32]/80 max-w-md mb-10 leading-relaxed">
                Handcrafted coffee and organic ceremonial matcha served in a space designed for slow mornings and creative flow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button 
                  onClick={() => setIsFullMenuOpen(true)}
                  className="inline-flex items-center justify-center gap-2 bg-[#4A3B32] text-white px-12 py-5 rounded-[2rem] text-lg font-medium hover:bg-[#E8ECD7] hover:text-[#4A3B32] hover:scale-105 hover:shadow-xl transition-all duration-300 group"
                >
                  View Menu <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <a 
                  href="#vibe" 
                  className="inline-flex items-center justify-center bg-transparent border-[2.5px] border-[#4A3B32]/30 text-[#4A3B32] px-12 py-5 rounded-[2rem] text-lg font-medium hover:border-[#4A3B32] hover:bg-[#4A3B32]/5 hover:scale-105 transition-all duration-300 shadow-sm"
                >
                  Our Story
                </a>
              </div>
            </div>
            {/* Decorative circle */}
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#E8ECD7] rounded-full opacity-50 pointer-events-none" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[500px] lg:h-[700px] rounded-[2rem] overflow-hidden shadow-sm border-[8px] border-white bg-white"
          >
            <img src={IMAGES.hero} alt="Coffee aesthetic" className="w-full h-full object-cover rounded-[1rem]" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/5 rounded-[1rem]" />
          </motion.div>
        </div>
      </section>

      {/* --- The Vibe (Features) --- */}
      <section id="vibe" className="py-24 px-6 md:px-12 bg-[#E8ECD7]/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">Why Oat & Bean?</h2>
            <div className="w-12 h-1 bg-[#4A3B32] mx-auto opacity-20" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Coffee className="w-8 h-8" />, title: "Specialty Roasts", desc: "Small-batch beans roasted locally and brewed with scientific precision." },
              { icon: <Leaf className="w-8 h-8" />, title: "Artisan Pastries", desc: "Seasonal treats baked fresh daily with organic, locally-sourced ingredients." },
              { icon: <Wind className="w-8 h-8" />, title: "Cozy Atmosphere", desc: "Thoughtfully designed seating with soft lighting and acoustic soundscapes." }
            ].map((feature, idx) => (
              <div key={idx} className={`p-8 lg:p-10 rounded-[2rem] text-center hover:-translate-y-1 transition-transform duration-300 flex flex-col items-center ${
                idx === 0 ? 'bg-[#E8ECD7]/50 border border-[#E8ECD7]/50' : 
                idx === 1 ? 'bg-[#FDEBED]/80 border border-[#FDEBED]' : 
                'bg-[#4A3B32]/5 border border-[#4A3B32]/10'
              }`}>
                <div className="bg-white/40 shadow-sm border border-white/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-[#4A3B32]">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-serif mb-4">{feature.title}</h3>
                <p className="text-[#4A3B32]/70 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- The Menu Section --- */}
      <section id="menu" className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-5xl font-serif mb-4">Our Seasonal Menu</h2>
              <p className="text-[#4A3B32]/70 text-lg">Carefully curated drinks for the mindful drinker.</p>
            </div>
            <button 
              onClick={() => setIsFullMenuOpen(true)}
              className="text-[#4A3B32] text-lg font-medium border-b-2 border-[#4A3B32] pb-1 flex items-center gap-2 group hover:opacity-70 transition-opacity"
            >
              Full Menu <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <DrinkConcierge />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Category 1 */}
            <div className="bg-white rounded-[2rem] shadow-sm p-8 lg:p-12 border border-[#4A3B32]/5 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-10 border-b border-[#4A3B32]/10 pb-6">
                <span className="text-sm font-bold tracking-widest uppercase opacity-40">01</span>
                <h3 className="text-3xl font-serif">Espresso Bar</h3>
              </div>
              <div className="space-y-8 flex-1">
                {[
                  { name: "Oat Milk Latte", price: "5.50" },
                  { name: "Vanilla Bean Flat White", price: "5.75" },
                  { name: "Cortado", price: "4.25" },
                  { name: "Honey Lavender Latte", price: "6.25" },
                  { name: "Seasonal Cold Brew", price: "5.00" }
                ].map((item, i) => (
                  <div key={i} className="group cursor-default py-1 px-2 rounded-lg -mx-2 hover:bg-[#E8ECD7]/10 transition-colors duration-300">
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-lg font-medium group-hover:text-[#4A3B32]/60 group-hover:-translate-y-1 transition-all duration-300">{item.name}</span>
                      <div className="flex-1 border-b-[2.5px] border-dotted border-[#4A3B32]/20 group-hover:border-[#E8ECD7] group-hover:-translate-y-2 transition-all duration-300 mx-4 mb-1.5" />
                      <span className="text-lg font-serif italic group-hover:text-[#4A3B32]/60 group-hover:-translate-y-1 transition-all duration-300">{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 overflow-hidden rounded-[2rem] h-64 shadow-sm border-[6px] border-white bg-[#FDFBF7]">
                <img src={IMAGES.latte} alt="Latte art" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 rounded-xl" referrerPolicy="no-referrer" />
              </div>
            </div>

            {/* Category 2 */}
            <div className="bg-white rounded-[2rem] shadow-sm p-8 lg:p-12 border border-[#4A3B32]/5 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-10 border-b border-[#4A3B32]/10 pb-6">
                <span className="text-sm font-bold tracking-widest uppercase opacity-40">02</span>
                <h3 className="text-3xl font-serif">Matcha & Tea</h3>
              </div>
              <div className="space-y-8 flex-1">
                {[
                  { name: "Ceremonial Matcha Latte", price: "6.50" },
                  { name: "Iced Strawberry Matcha", price: "7.25" },
                  { name: "Rose Petal Herbal Tea", price: "4.50" },
                  { name: "Hojicha Roasted Latte", price: "6.00" },
                  { name: "Earl Grey Fog", price: "5.50" }
                ].map((item, i) => (
                  <div key={i} className="group cursor-default py-1 px-2 rounded-lg -mx-2 hover:bg-[#FDEBED]/30 transition-colors duration-300">
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-lg font-medium group-hover:text-[#4A3B32]/60 group-hover:-translate-y-1 transition-all duration-300">{item.name}</span>
                      <div className="flex-1 border-b-[2.5px] border-dotted border-[#4A3B32]/20 group-hover:border-[#FDEBED] group-hover:border-[#4A3B32]/30 group-hover:-translate-y-2 transition-all duration-300 mx-4 mb-1.5" />
                      <span className="text-lg font-serif italic group-hover:text-[#4A3B32]/60 group-hover:-translate-y-1 transition-all duration-300">{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 overflow-hidden rounded-[2rem] h-64 bg-[#FDEBED] shadow-sm border-[6px] border-white">
                <img src={IMAGES.matcha} alt="Matcha" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 rounded-xl" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Instagram / Gallery Grid --- */}
      <section className="py-24 bg-[#FDEBED]/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-3">Moments Captured</h2>
            <p className="text-[#4A3B32]/60 text-lg">Follow our journey @oatandbean</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="space-y-4 md:space-y-6 flex flex-col">
              <div className="overflow-hidden rounded-[2rem] shadow-sm border-[6px] border-white bg-white">
                <img src={IMAGES.pastry} className="w-full h-64 md:h-80 object-cover hover:opacity-90 transition-opacity rounded-2xl" alt="Pastry" referrerPolicy="no-referrer" />
              </div>
              <div className="bg-[#E8ECD7] rounded-[2rem] h-32 md:h-40 p-6 flex flex-col items-center justify-center text-center italic text-lg shadow-sm flex-1">
                "The softest start to your day."
              </div>
            </div>
            <div className="pt-8 md:pt-16 space-y-4 md:space-y-6">
              <div className="overflow-hidden rounded-[2rem] shadow-sm border-[6px] border-white bg-white">
                <img src={IMAGES.interior} className="w-full h-80 md:h-[450px] object-cover hover:opacity-90 transition-opacity rounded-2xl" alt="Interior" referrerPolicy="no-referrer" />
              </div>
            </div>
            <div className="space-y-4 md:space-y-6">
              <div className="overflow-hidden rounded-[2rem] shadow-sm border-[6px] border-white bg-white">
                <img src={IMAGES.vibes} className="w-full h-48 md:h-64 object-cover hover:opacity-90 transition-opacity rounded-2xl" alt="Vibes" referrerPolicy="no-referrer" />
              </div>
              <div className="overflow-hidden rounded-[2rem] shadow-sm border-[6px] border-white bg-white">
                <img src={IMAGES.hero} className="w-full h-64 md:h-80 object-cover hover:opacity-90 transition-opacity rounded-2xl" alt="Coffee" referrerPolicy="no-referrer" />
              </div>
            </div>
            <div className="pt-12 md:pt-24 space-y-4 md:space-y-6">
              <div className="overflow-hidden rounded-[2rem] shadow-sm border-[6px] border-white bg-white">
                <img src={IMAGES.matcha} className="w-full h-72 md:h-96 object-cover hover:opacity-90 transition-opacity rounded-2xl" alt="Matcha bowl" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer id="visit" className="bg-[#FDFBF7] border-t border-[#4A3B32]/10 pt-24 pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-5xl font-serif mb-8">Visit Oat & Bean</h2>
              <p className="text-xl text-[#4A3B32]/70 max-w-sm leading-relaxed mb-8">
                We're located in the heart of the design district. Come in for the coffee, stay for the calm.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-[#4A3B32] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-12 h-12 bg-[#4A3B32] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <Facebook size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-widest text-[11px] mb-6 opacity-40">Hours</h4>
              <ul className="space-y-4 text-lg">
                <li className="flex justify-between items-center"><span className="font-medium">Mon - Fri</span> <span className="opacity-80">7am - 6pm</span></li>
                <li className="flex justify-between items-center"><span className="font-medium">Sat - Sun</span> <span className="opacity-80">8am - 5pm</span></li>
              </ul>
            </div>

            <div className="col-span-1 md:col-span-2">
              <h4 className="font-bold uppercase tracking-widest text-[11px] mb-6 opacity-40">Location</h4>
              <div className="flex flex-col sm:flex-row gap-6">
                <p className="text-lg leading-relaxed opacity-80 shrink-0">
                  124 Aesthetic Ave.<br />
                  Soft Palette District<br />
                  Portland, OR 97201
                </p>
                <div className="w-full h-32 rounded-2xl overflow-hidden shadow-sm border-[4px] border-white/50 relative">
                  <div className="absolute inset-0 bg-[#4A3B32]/5 pointer-events-none z-10 rounded-2xl"></div>
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.5397444264627!2d-122.68413128444086!3d45.52345107910167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54950a03bb38e1df%3A0xc6c764fa58f8b340!2sPearl%20District%2C%20Portland%2C%20OR!5e0!3m2!1sen!2sus!4v1683134375051!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, filter: 'grayscale(0.4) opacity(0.9) contrast(0.9)' }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-[#4A3B32]/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-2xl font-serif tracking-tight hover:opacity-70 transition-opacity"
            >
              Oat & Bean
            </button>
            <div className="text-[#4A3B32]/40 text-sm font-medium">
              © {new Date().getFullYear()} Oat & Bean Specialty Coffee. Handcrafted by Design.
            </div>
          </div>
        </div>
      </footer>

      {/* --- Mobile Menu Overlay --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-[#FDFBF7] flex flex-col p-6"
          >
            <div className="flex justify-end pt-4 pb-12">
              <button onClick={() => setMobileMenuOpen(false)} className="bg-[#4A3B32]/10 p-3 rounded-full hover:bg-[#4A3B32]/20 transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col items-center gap-8 pt-10">
              <button onClick={() => { setIsFullMenuOpen(true); setMobileMenuOpen(false); }} className="text-5xl font-serif hover:opacity-60 transition-opacity">Menu</button>
              <a href="#vibe" onClick={() => setMobileMenuOpen(false)} className="text-5xl font-serif hover:opacity-60 transition-opacity">Vibe</a>
              <a href="#visit" onClick={() => setMobileMenuOpen(false)} className="text-5xl font-serif hover:opacity-60 transition-opacity">Visit</a>
              <div className="pt-8">
                <button onClick={() => { setIsOrderModalOpen(true); setMobileMenuOpen(false); }} className="bg-[#4A3B32] text-white px-12 py-5 rounded-full text-xl font-medium shadow-lg hover:scale-105 transition-transform w-full">
                  Order Ahead
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Scroll to Top Button --- */}
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 right-6 z-[90] bg-[#FDFBF7] text-[#4A3B32] w-14 h-14 rounded-full shadow-lg border border-[#4A3B32]/10 hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
          >
            <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      <GeminiChatbot />
      <OrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />
      <FullMenuPage isOpen={isFullMenuOpen} onClose={() => setIsFullMenuOpen(false)} />
    </div>
  );
}
