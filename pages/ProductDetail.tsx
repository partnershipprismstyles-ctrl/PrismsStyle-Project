
import React, { useState } from 'react';
import { ShoppingBag, Heart, ChevronLeft, ChevronRight, Share2, Info } from 'lucide-react';
import { useStore } from '../store/StoreContext';
import { Product } from '../types';

const ProductDetail: React.FC<{ product: Product, onNavigate: (page: string) => void }> = ({ product, onNavigate }) => {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [currentImg, setCurrentImg] = useState(0);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
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
                <h1 className="text-4xl md:text-5xl font-black font-oswald uppercase tracking-tight leading-none">{product.name}</h1>
                <button 
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-full shadow-md transition-all ${wishlist.includes(product.id) ? 'bg-red-500 text-white' : 'bg-white text-black hover:bg-zinc-100'}`}
                >
                  <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
              <p className="text-3xl font-black font-oswald text-prism mb-6">${product.price}</p>
              <div className="h-[1px] w-full bg-zinc-100 mb-8"></div>
              <p className="text-gray-500 leading-relaxed text-sm md:text-base mb-8">
                {product.description}
              </p>
              <div className="flex items-center space-x-4 text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span>In Stock ({product.stock} units available)</span>
              </div>
            </div>

            {/* Selection */}
            <div className="space-y-10 mb-12">
              {/* Sizes */}
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
                      className={`min-w-[50px] px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-all ${
                        selectedSize === size ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-200 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest mb-4">Color: <span className="text-gray-400">{selectedColor}</span></h3>
                <div className="flex gap-4">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 p-1 transition-all ${
                        selectedColor === color ? 'border-black' : 'border-transparent'
                      }`}
                    >
                      <div className={`w-full h-full rounded-full shadow-inner ${color === 'Midnight Black' || color === 'Onyx' || color === 'Stealth Black' ? 'bg-zinc-900' : color === 'Slate Grey' ? 'bg-zinc-500' : 'bg-zinc-100'}`}></div>
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
                className={`w-full py-5 text-sm font-black uppercase tracking-widest flex items-center justify-center transition-all duration-300 ${
                  added ? 'bg-emerald-500 text-white' : 'bg-black text-white hover:bg-zinc-800'
                }`}
              >
                {added ? 'Added to Bag' : <><ShoppingBag className="w-4 h-4 mr-3" /> Add to Bag</>}
              </button>
              <button className="w-full py-4 text-xs font-black uppercase tracking-widest border border-gray-200 hover:border-black transition-all flex items-center justify-center">
                <Share2 className="w-4 h-4 mr-2" /> Share this Item
              </button>
            </div>

            {/* Tabs / Shipping Info */}
            <div className="mt-12 space-y-4 pt-8 border-t border-gray-100">
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none py-2">
                  <span className="text-[10px] font-black uppercase tracking-widest">Care Instructions</span>
                  <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                  Machine wash cold with like colors. Tumble dry low. Do not bleach. Cool iron if necessary. Avoid dry cleaning.
                </p>
              </details>
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none py-2">
                  <span className="text-[10px] font-black uppercase tracking-widest">Shipping & Returns</span>
                  <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="text-xs text-gray-500 mt-4 space-y-2 leading-relaxed">
                  <p>• Standard Shipping: 3-5 Business Days</p>
                  <p>• Express Shipping: 1-2 Business Days</p>
                  <p>• Returns: 14 days from delivery date in original condition.</p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChevronDown: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);

export default ProductDetail;
