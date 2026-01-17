import React, { useState, useMemo } from 'react';
import { ShoppingBag, Heart, ChevronLeft, ChevronRight, Share2, Info, ChevronDown, Check, Sparkles, X } from 'lucide-react';
import { useStore } from '../store/StoreContext';
import { Product } from '../types';

const ProductDetail: React.FC<{ product: Product, onNavigate: (page: string, data?: any) => void }> = ({ product, onNavigate }) => {
  const { products, addToCart, toggleWishlist, wishlist, setActiveStylistProduct } = useStore();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [currentImg, setCurrentImg] = useState(0);
  const [added, setAdded] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);

  const complementaryProducts = useMemo(() => {
    return products
      .filter(p => p.id !== product.id && (p.category === product.category || p.category === 'Accessories'))
      .slice(0, 3);
  }, [products, product]);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleStyleWithAI = () => {
    setActiveStylistProduct(product);
    // AI Stylist component handles its own visibility via StoreContext if we update it, 
    // but for now we'll rely on the user manually opening it or we can add a way to trigger it.
    // Let's assume the AI Stylist component listens for changes to activeStylistProduct.
  };

  return (
    <div className="animate-in fade-in duration-500 py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-8 md:mb-12">
          <button onClick={() => onNavigate('shop')} className="hover:text-black transition-colors">Shop</button>
          <span>/</span>
          <span className="text-gray-500">{product.category}</span>
          <span>/</span>
          <span className="text-black">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-32">
          {/* Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto max-h-[600px] scrollbar-hide">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentImg(idx)}
                  className={`relative min-w-[80px] w-20 h-24 border-2 transition-all ${currentImg === idx ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            
            {/* Main Image */}
            <div className="relative flex-grow h-[500px] md:h-[700px] bg-zinc-50 overflow-hidden">
              <img 
                src={product.images[currentImg]} 
                alt={product.name} 
                className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
                <button 
                  onClick={() => setCurrentImg(prev => (prev === 0 ? product.images.length - 1 : prev - 1))}
                  className="p-2 bg-white/80 backdrop-blur shadow-md rounded-full pointer-events-auto hover:bg-black hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setCurrentImg(prev => (prev === product.images.length - 1 ? 0 : prev + 1))}
                  className="p-2 bg-white/80 backdrop-blur shadow-md rounded-full pointer-events-auto hover:bg-black hover:text-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="mb-10">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-4xl md:text-6xl font-black font-oswald uppercase tracking-tight leading-none">{product.name}</h1>
                <button 
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-full shadow-md transition-all ${wishlist.includes(product.id) ? 'bg-red-500 text-white' : 'bg-white text-black hover:bg-zinc-100'}`}
                >
                  <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
              <p className="text-3xl font-black font-oswald text-prism mb-6 tracking-tight">${product.price}</p>
              <div className="h-[1px] w-full bg-zinc-100 mb-8"></div>
              
              <div className="space-y-6 mb-8">
                <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                  {product.description}
                </p>
                
                {product.specs && (
                  <div className="border border-zinc-100 rounded-lg overflow-hidden">
                    <button 
                      onClick={() => setShowSpecs(!showSpecs)}
                      className="w-full flex justify-between items-center p-4 text-[10px] font-black uppercase tracking-widest bg-zinc-50"
                    >
                      Technical Specifications <ChevronDown className={`w-3 h-3 transition-transform ${showSpecs ? 'rotate-180' : ''}`} />
                    </button>
                    {showSpecs && (
                      <div className="p-4 space-y-2 bg-white border-t border-zinc-100">
                        {product.specs.map((spec, i) => (
                          <div key={i} className="flex justify-between text-xs py-1">
                            <span className="text-zinc-400 font-medium uppercase tracking-tighter">{spec.label}</span>
                            <span className="text-zinc-900 font-bold">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex flex-col space-y-3">
                <div className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest text-emerald-600">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span>High Demand: {product.stock} Units Remaining</span>
                </div>
              </div>
            </div>

            {/* Selection */}
            <div className="space-y-10 mb-12">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-black uppercase tracking-widest">Select Size</h3>
                  <button className="text-[10px] font-bold uppercase tracking-widest text-gray-400 border-b border-gray-400 flex items-center">
                    <Info className="w-3 h-3 mr-1" /> Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[60px] px-4 py-3 text-xs font-bold uppercase tracking-widest border transition-all ${
                        selectedSize === size ? 'bg-black text-white border-black shadow-xl' : 'bg-white text-gray-500 border-gray-200 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-black uppercase tracking-widest mb-4">Color Spectrum: <span className="text-gray-400">{selectedColor}</span></h3>
                <div className="flex gap-4">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 rounded-full border-2 p-1 transition-all ${
                        selectedColor === color ? 'border-black scale-110 shadow-lg' : 'border-transparent'
                      }`}
                    >
                      <div className={`w-full h-full rounded-full shadow-inner ${color === 'Midnight Black' || color === 'Onyx' || color === 'Stealth Black' ? 'bg-zinc-900' : color === 'Slate Grey' ? 'bg-zinc-500' : color === 'Prism White' ? 'bg-zinc-50' : 'bg-zinc-100'}`}></div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col space-y-4">
              <button 
                onClick={handleAddToCart}
                disabled={added}
                className={`w-full py-6 text-sm font-black uppercase tracking-widest flex items-center justify-center transition-all duration-500 group relative overflow-hidden ${
                  added ? 'bg-emerald-500 text-white' : 'bg-black text-white hover:shadow-[0_0_30px_rgba(121,40,202,0.3)]'
                }`}
              >
                <div className="absolute inset-0 bg-prism opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0"></div>
                <span className="relative z-10 flex items-center">
                  {added ? 'Added to Bag' : <><ShoppingBag className="w-4 h-4 mr-3" /> Secure this Piece</>}
                </span>
              </button>

              <button 
                onClick={handleStyleWithAI}
                className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] border-2 border-zinc-900 flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-all group"
              >
                <Sparkles className="w-4 h-4 mr-3 group-hover:animate-pulse text-prism" /> Style with PRISM Visionary
              </button>

              <div className="grid grid-cols-2 gap-4">
                 <button className="py-4 text-xs font-black uppercase tracking-widest border border-gray-200 hover:border-black transition-all flex items-center justify-center">
                   <Share2 className="w-4 h-4 mr-2" /> Share
                 </button>
                 <button className="py-4 text-xs font-black uppercase tracking-widest border border-gray-200 hover:border-black transition-all flex items-center justify-center">
                   <Info className="w-4 h-4 mr-2" /> Care
                 </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex items-center justify-between p-6 bg-zinc-50 border border-zinc-100 rounded-xl">
               <div className="text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-900">Secure Checkout</p>
                  <p className="text-[8px] font-bold text-zinc-400 mt-1">256-BIT SSL</p>
               </div>
               <div className="h-8 w-[1px] bg-zinc-200"></div>
               <div className="text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-900">Global Express</p>
                  <p className="text-[8px] font-bold text-zinc-400 mt-1">FAST DHL</p>
               </div>
               <div className="h-8 w-[1px] bg-zinc-200"></div>
               <div className="text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-900">14-Day Returns</p>
                  <p className="text-[8px] font-bold text-zinc-400 mt-1">EASY REFUND</p>
               </div>
            </div>
          </div>
        </div>

        {/* Complete the Silhouette */}
        <section className="pt-24 border-t border-zinc-100">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-prism mb-4">The Vision</h2>
              <h3 className="text-4xl font-black font-oswald uppercase tracking-tight">Complete the Look</h3>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {complementaryProducts.map(p => (
              <div 
                key={p.id} 
                className="group cursor-pointer bg-zinc-50 p-4 border border-zinc-100 hover:shadow-2xl transition-all"
                onClick={() => onNavigate('product', p)}
              >
                <div className="relative h-96 overflow-hidden mb-4">
                  <img src={p.images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={p.name} />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-tight">{p.name}</h4>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{p.category}</p>
                  </div>
                  <span className="text-prism font-black font-oswald text-lg">${p.price}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;