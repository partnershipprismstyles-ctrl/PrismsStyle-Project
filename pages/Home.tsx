
import React from 'react';
import { ArrowRight, Star, ShoppingBag, Heart, Calendar } from 'lucide-react';
import { useStore } from '../store/StoreContext';

const Home: React.FC<{ onNavigate: (page: string, data?: any) => void }> = ({ onNavigate }) => {
  const { products, toggleWishlist, wishlist, settings } = useStore();
  const featured = products.filter(p => p.featured);
  const bestSellers = products.filter(p => p.bestSeller);

  // 5 Premium High-Fashion Men's Looks - Updated with highly reliable high-res URLs
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
        <section className="relative h-[90vh] w-full bg-black overflow-hidden">
          <div className="absolute inset-0 opacity-70">
            <img 
              src={settings.heroBackgroundImage} 
              alt="Hero Fashion" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent"></div>
          
          <div className="relative h-full container mx-auto px-4 md:px-8 flex flex-col justify-center items-start text-white">
            <div className="overflow-hidden mb-4">
              <p className="text-prism font-black tracking-[0.4em] uppercase text-xs animate-in slide-in-from-bottom duration-1000">
                Seasonal Drop 2026
              </p>
            </div>
            <h1 className="text-5xl md:text-9xl font-black font-oswald uppercase tracking-tighter leading-[0.85] mb-10 max-w-3xl animate-in slide-in-from-bottom duration-1000 delay-150">
               {settings.heroHeading}
            </h1>
            <p className="text-zinc-300 max-w-md text-base md:text-lg mb-12 font-medium leading-relaxed animate-in slide-in-from-bottom duration-1000 delay-300">
              {settings.heroSubheading}
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 animate-in slide-in-from-bottom duration-1000 delay-500">
              <button 
                onClick={() => onNavigate('shop')}
                className="bg-white text-black px-12 py-6 text-xs font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300 flex items-center shadow-2xl"
              >
                Enter Shop <ArrowRight className="ml-4 w-4 h-4" />
              </button>
              <button 
                onClick={() => onNavigate('portfolio')}
                className="border border-white/20 backdrop-blur-xl bg-white/5 px-12 py-6 text-xs font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all duration-300"
              >
                Editorial
              </button>
            </div>
          </div>

          <div className="absolute bottom-0 w-full bg-prism py-3 overflow-hidden whitespace-nowrap z-10">
            <div className="inline-block animate-marquee uppercase text-[10px] font-black tracking-[0.4em] text-white px-4">
              • LIMITED EDITION DROP • WORLDWIDE SHIPPING • SHOP NOW • JOIN THE CIRCLE • LIMITED EDITION DROP • WORLDWIDE SHIPPING • SHOP NOW •
            </div>
            <style>{`
              @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
              .animate-marquee { animation: marquee 25s linear infinite; display: inline-block; width: 200%; }
            `}</style>
          </div>
        </section>
      )}

      {/* Men's Style Spotlight - Optimized for 5 Outfits */}
      <section className="py-32 bg-white overflow-hidden border-b">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <h2 className="text-prism font-black uppercase tracking-[0.5em] text-[10px] mb-4">Men's Style Spotlight</h2>
              <h3 className="text-6xl font-black font-oswald uppercase tracking-tighter mb-8 leading-none">PRISM <br />MASCULINE.</h3>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-[0.2em] max-w-lg leading-relaxed">
                Five signature directions for the modern wardrobe. Architectural silhouettes met with high-performance textiles.
              </p>
            </div>
            <button 
              onClick={() => onNavigate('shop', { category: 'Men' })}
              className="group flex items-center text-[11px] font-black uppercase tracking-[0.3em] mt-8 md:mt-0 border-b-2 border-black pb-2 hover:text-prism hover:border-prism transition-all"
            >
              Shop All Men's <ArrowRight className="ml-4 w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          {/* 5-Outfit Editorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 h-auto md:h-[1000px]">
            {/* Outfit 1: Tall Vertical */}
            <div className="md:col-span-2 lg:col-span-1 h-[500px] md:h-full group relative overflow-hidden bg-zinc-100">
              <img src={menStyleGallery[0].img} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" alt={menStyleGallery[0].label} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500"></div>
              <div className="absolute bottom-8 left-8 text-white opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2">01</p>
                <p className="text-lg font-black font-oswald uppercase tracking-tight">{menStyleGallery[0].label}</p>
              </div>
            </div>

            {/* Outfit 2: Upper Box */}
            <div className="md:col-span-2 lg:col-span-2 h-[450px] group relative overflow-hidden bg-zinc-200">
              <img src={menStyleGallery[1].img} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" alt={menStyleGallery[1].label} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500"></div>
              <div className="absolute bottom-8 left-8 text-white opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2">02</p>
                <p className="text-lg font-black font-oswald uppercase tracking-tight">{menStyleGallery[1].label}</p>
              </div>
            </div>

            {/* Outfit 3: Central Masterpiece (Large) */}
            <div className="md:col-span-4 lg:col-span-3 lg:row-span-2 h-[600px] md:h-full group relative overflow-hidden shadow-2xl">
              <img src={menStyleGallery[2].img} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" alt={menStyleGallery[2].label} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-12 left-12 text-white">
                <p className="text-prism font-black uppercase tracking-[0.5em] text-[10px] mb-4">Seasonal Look 03</p>
                <h4 className="text-6xl font-black font-oswald uppercase tracking-tight mb-8 leading-none">{menStyleGallery[2].label}</h4>
                <button 
                  onClick={() => onNavigate('shop', { category: 'Men' })}
                  className="bg-white text-black px-12 py-5 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all shadow-2xl"
                >
                  Acquire Look
                </button>
              </div>
            </div>

            {/* Outfit 4: Lower Small */}
            <div className="md:col-span-2 lg:col-span-1 h-[450px] md:h-auto group relative overflow-hidden bg-zinc-100">
              <img src={menStyleGallery[3].img} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" alt={menStyleGallery[3].label} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500"></div>
              <div className="absolute bottom-8 left-8 text-white opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2">04</p>
                <p className="text-lg font-black font-oswald uppercase tracking-tight">{menStyleGallery[3].label}</p>
              </div>
            </div>

            {/* Outfit 5: Lower Right */}
            <div className="md:col-span-2 lg:col-span-2 h-[450px] md:h-auto group relative overflow-hidden bg-zinc-200">
              <img src={menStyleGallery[4].img} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" alt={menStyleGallery[4].label} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500"></div>
              <div className="absolute bottom-8 left-8 text-white opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2">05</p>
                <p className="text-lg font-black font-oswald uppercase tracking-tight">{menStyleGallery[4].label}</p>
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
            <button 
              onClick={() => onNavigate('shop')}
              className="text-[10px] font-black uppercase tracking-[0.2em] border-b-2 border-black pb-2 hover:text-prism hover:border-prism transition-all mt-8 md:mt-0"
            >
              Explore Full Drop
            </button>
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

      {/* Booking CTA Section */}
      {settings.showBookingCTA && (
        <section className="bg-black text-white py-32 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-2/5 h-full opacity-40 grayscale blur-md pointer-events-none">
            <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" />
          </div>
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-2xl">
              <h2 className="text-prism font-black uppercase tracking-[0.5em] text-[10px] mb-8">Personalized Luxury</h2>
              <h3 className="text-5xl md:text-8xl font-black font-oswald uppercase tracking-tighter leading-none mb-10">
                VIP STYLING <br />CONCIERGE.
              </h3>
              <p className="text-zinc-400 text-lg mb-14 leading-relaxed font-medium">
                Experience the future of fashion in person. Our private showroom sessions offer one-on-one styling, custom tailoring, and exclusive previews of upcoming drops.
              </p>
              <button 
                onClick={() => onNavigate('booking')}
                className="bg-white text-black px-14 py-7 text-xs font-black uppercase tracking-[0.2em] hover:bg-prism hover:text-white transition-all flex items-center group shadow-2xl"
              >
                Request Session <Calendar className="ml-6 w-5 h-5 group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Bestsellers Section */}
      {settings.showBestsellers && (
        <section className="bg-zinc-50 py-32 overflow-hidden border-b">
          <div className="container mx-auto px-4 md:px-8 mb-20">
            <h2 className="text-[10px] font-black tracking-[0.4em] text-zinc-400 uppercase mb-4">Trending Now</h2>
            <h3 className="text-5xl font-black font-oswald uppercase tracking-tight">Heavy Rotation</h3>
          </div>
          
          <div className="flex space-x-10 px-4 md:px-8 overflow-x-auto pb-16 scrollbar-hide">
            {bestSellers.map((product) => (
              <div key={product.id} className="min-w-[320px] md:min-w-[450px] group bg-white p-6 shadow-sm hover:shadow-2xl transition-all border border-zinc-100">
                <div className="relative h-[550px] overflow-hidden mb-8">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                    className={`absolute top-6 right-6 p-4 rounded-full shadow-2xl transition-all ${wishlist.includes(product.id) ? 'bg-red-500 text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}
                  >
                    <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                  </button>
                  <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-all duration-500">
                    <button 
                      onClick={() => onNavigate('product', product)}
                      className="w-full bg-black text-white py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-prism transition-all shadow-2xl"
                    >
                      Instant Buy
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-black text-sm uppercase tracking-tight mb-2">{product.name}</h4>
                    <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest">{product.category}</p>
                  </div>
                  <span className="font-black font-oswald text-2xl text-prism">${product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* About Section */}
      {settings.showAbout && (
        <section className="py-40 container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-prism opacity-10 rounded-full blur-3xl -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800" 
                alt="Brand Vision" 
                className="w-full grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl"
              />
              <div className="absolute -bottom-8 -right-8 bg-black text-white p-12 shadow-2xl">
                <p className="text-5xl md:text-7xl font-black font-oswald tracking-tighter">EST. 2026</p>
              </div>
            </div>
            <div className="max-w-xl">
              <h2 className="text-[10px] font-black tracking-[0.5em] text-prism uppercase mb-8">Our Philosophy</h2>
              <h3 className="text-5xl md:text-7xl font-black font-oswald uppercase tracking-tighter leading-[0.9] mb-12">
                {settings.aboutHeading}
              </h3>
              <p className="text-zinc-600 text-lg leading-relaxed mb-12 font-medium">
                {settings.aboutContent}
              </p>
              <div className="flex items-center space-x-6">
                <div className="w-16 h-[2px] bg-black"></div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-black">Architectural Precision • Crafted Worldwide</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Reviews Section */}
      {settings.showReviews && (
        <section className="bg-black text-white py-32">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-24">
              <h2 className="text-prism font-black uppercase tracking-[0.5em] text-[10px] mb-6">Prism Society</h2>
              <h3 className="text-5xl font-black font-oswald uppercase tracking-tight mb-6">Verified Aesthetics</h3>
              <div className="flex justify-center space-x-1 text-prism">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { name: "Jordan M.", text: "The architectural lines on the technical jacket are insane. Finally, streetwear with a soul." },
                { name: "Sarah K.", text: "Ordering was seamless. The iridescent materials react perfectly in low light. Obsessed." },
                { name: "Marcus L.", text: "Heavyweight fabrics that actually hold their structure. Prism is in a league of its own." }
              ].map((review, idx) => (
                <div key={idx} className="bg-zinc-900/50 p-10 border border-zinc-800 hover:border-prism/50 transition-all duration-500 backdrop-blur-sm shadow-xl">
                  <p className="text-zinc-400 italic mb-8 leading-relaxed font-medium">"{review.text}"</p>
                  <p className="font-black uppercase tracking-[0.3em] text-[10px] text-prism">{review.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
