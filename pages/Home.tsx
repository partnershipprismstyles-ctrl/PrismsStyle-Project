import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, ShoppingBag, Heart, Calendar, Timer } from 'lucide-react';
import { useStore } from '../store/StoreContext';

const Home: React.FC<{ onNavigate: (page: string, data?: any) => void }> = ({ onNavigate }) => {
  const { products, toggleWishlist, wishlist, settings } = useStore();
  const featured = products.filter(p => p.featured);
  const bestSellers = products.filter(p => p.bestSeller);

  // Countdown timer logic for conversion
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 59, s: 45 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const menStyleGallery = [
    { id: 1, img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=800', label: 'Structured Minimalism' },
    { id: 2, img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800', label: 'Urban Utility' },
    { id: 3, img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=1200', label: 'Prism Avant-Garde' },
    { id: 4, img: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=800', label: 'Cyber-Knit Essentials' },
    { id: 5, img: 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&q=80&w=800', label: 'Architectural Suiting' },
  ];

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      {settings.showHero && (
        <section className="relative h-screen w-full bg-black overflow-hidden -mt-[88px] z-0">
          <div className="absolute inset-0 z-[-1]">
            <img 
              src={settings.heroBackgroundImage || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1920"} 
              alt="Hero Editorial" 
              className="w-full h-full object-cover brightness-105 contrast-105 transition-opacity duration-1000"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent z-[1]"></div>
          
          <div className="relative h-full container mx-auto px-4 md:px-8 flex flex-col justify-center items-start text-white pt-20 z-[2]">
            <div className="flex items-center space-x-3 mb-6 animate-in slide-in-from-left duration-700">
              <span className="w-12 h-[2px] bg-prism"></span>
              <p className="text-prism font-black tracking-[0.4em] uppercase text-[10px]">
                Editorial Phase 02 / Limited Edition
              </p>
            </div>
            
            <h1 className="text-6xl md:text-[9rem] font-black font-oswald uppercase tracking-tighter leading-[0.8] mb-12 max-w-5xl animate-in slide-in-from-bottom duration-1000 delay-150">
               {settings.heroHeading}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end w-full">
              <div>
                <p className="text-zinc-300 max-w-sm text-base md:text-lg mb-12 font-medium leading-relaxed animate-in slide-in-from-bottom duration-1000 delay-300">
                  {settings.heroSubheading}
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 animate-in slide-in-from-bottom duration-1000 delay-500">
                  <button 
                    onClick={() => onNavigate('shop')}
                    className="bg-white text-black px-12 py-6 text-xs font-black uppercase tracking-[0.2em] hover:bg-prism hover:text-white transition-all duration-500 flex items-center shadow-2xl group"
                  >
                    Enter Shop <ArrowRight className="ml-4 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </button>
                  <button 
                    onClick={() => onNavigate('portfolio')}
                    className="border border-white/20 backdrop-blur-xl bg-white/5 px-12 py-6 text-xs font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all duration-300"
                  >
                    Explore Archives
                  </button>
                </div>
              </div>

              {/* Conversion Booster: Countdown */}
              <div className="hidden md:flex flex-col items-end animate-in fade-in duration-1000 delay-700">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400 mb-4 flex items-center">
                  <Timer className="w-3 h-3 mr-2 text-prism animate-pulse" /> Reserve Slot: Batch 02
                </p>
                <div className="flex space-x-4 text-5xl font-black font-oswald">
                  <div className="text-right">
                    <span>{timeLeft.h.toString().padStart(2, '0')}</span>
                    <p className="text-[8px] uppercase tracking-widest text-zinc-500 mt-1">Hours</p>
                  </div>
                  <span className="text-prism">:</span>
                  <div className="text-right">
                    <span>{timeLeft.m.toString().padStart(2, '0')}</span>
                    <p className="text-[8px] uppercase tracking-widest text-zinc-500 mt-1">Minutes</p>
                  </div>
                  <span className="text-prism">:</span>
                  <div className="text-right">
                    <span>{timeLeft.s.toString().padStart(2, '0')}</span>
                    <p className="text-[8px] uppercase tracking-widest text-zinc-500 mt-1">Seconds</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 w-full bg-prism py-3 overflow-hidden whitespace-nowrap z-10 border-t border-white/10">
            <div className="inline-block animate-marquee uppercase text-[10px] font-black tracking-[0.4em] text-white px-4">
              • ARCHITECTURAL INTEGRITY • LIMITED PHASE 02 • SECURE YOUR SILHOUETTE • WORLDWIDE EXPRESS • ARCHITECTURAL INTEGRITY • LIMITED PHASE 02 • SECURE YOUR SILHOUETTE •
            </div>
          </div>
        </section>
      )}

      {/* Men's Style Spotlight */}
      <section className="py-32 bg-white overflow-hidden border-b">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <h2 className="text-prism font-black uppercase tracking-[0.5em] text-[10px] mb-4">Men's Style Spotlight</h2>
              <h3 className="text-6xl font-black font-oswald uppercase tracking-tighter mb-8 leading-none">PRISM <br />MASCULINE.</h3>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-[0.2em] max-w-lg leading-relaxed">
                Explore directional looks curated for the structural wardrobe. Phase 02 materials focus on high-density wool and basalt fibers.
              </p>
            </div>
            <button 
              onClick={() => onNavigate('shop', { category: 'Men' })}
              className="group flex items-center text-[11px] font-black uppercase tracking-[0.3em] mt-8 md:mt-0 border-b-2 border-black pb-2 hover:text-prism hover:border-prism transition-all"
            >
              Shop All Men's <ArrowRight className="ml-4 w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 h-auto md:h-[1000px]">
            <div className="md:col-span-2 lg:col-span-1 h-[500px] md:h-full group relative overflow-hidden bg-zinc-100">
              <img src={menStyleGallery[0].img} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" alt={menStyleGallery[0].label} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500"></div>
              <div className="absolute bottom-8 left-8 text-white opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2">01</p>
                <p className="text-lg font-black font-oswald uppercase tracking-tight">{menStyleGallery[0].label}</p>
              </div>
            </div>

            <div className="md:col-span-2 lg:col-span-2 h-[450px] group relative overflow-hidden bg-zinc-200">
              <img src={menStyleGallery[1].img} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" alt={menStyleGallery[1].label} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500"></div>
              <div className="absolute bottom-8 left-8 text-white opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2">02</p>
                <p className="text-lg font-black font-oswald uppercase tracking-tight">{menStyleGallery[1].label}</p>
              </div>
            </div>

            <div className="md:col-span-4 lg:col-span-3 lg:row-span-2 h-[600px] md:h-full group relative overflow-hidden shadow-2xl">
              <img src={menStyleGallery[2].img} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" alt={menStyleGallery[2].label} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-12 left-12 text-white">
                <p className="text-prism font-black uppercase tracking-[0.5em] text-[10px] mb-4">Seasonal Look 03</p>
                <h4 className="text-6xl font-black font-oswald uppercase tracking-tight mb-8 leading-none">{menStyleGallery[2].label}</h4>
                <button 
                  onClick={() => onNavigate('shop', { category: 'Men' })}
                  className="bg-white text-black px-12 py-5 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-prism hover:text-white transition-all shadow-2xl"
                >
                  Acquire Look
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Essentials Grid */}
      {settings.showCategories && (
        <section className="py-32 container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div>
              <h2 className="text-[10px] font-black tracking-[0.4em] text-zinc-400 uppercase mb-4">Identity Layers</h2>
              <h3 className="text-5xl font-black font-oswald uppercase tracking-tight">The Essentials</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { name: 'Men', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=800' },
              { name: 'Women', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800' },
              { name: 'Accessories', img: 'https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?auto=format&fit=crop&q=80&w=800' },
            ].map((cat) => (
              <div 
                key={cat.name} 
                className="group relative h-[650px] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all"
                onClick={() => onNavigate('shop', { category: cat.name })}
              >
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-all duration-500"></div>
                <div className="absolute bottom-12 left-12 text-white">
                  <h4 className="text-4xl font-black font-oswald uppercase tracking-tight mb-3">{cat.name}</h4>
                  <div className="w-10 h-1 bg-white mb-6 group-hover:w-24 transition-all duration-500"></div>
                  <p className="text-[10px] font-black tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">View Collection &rarr;</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;