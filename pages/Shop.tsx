
import React, { useState, useMemo } from 'react';
import { Filter, ChevronDown, Heart, Search } from 'lucide-react';
import { useStore } from '../store/StoreContext';
import { Category, Product } from '../types';

const Shop: React.FC<{ onNavigate: (page: string, data?: any) => void, initialFilter?: string }> = ({ onNavigate, initialFilter }) => {
  const { products, wishlist, toggleWishlist } = useStore();
  const [activeCategory, setActiveCategory] = useState<string>(initialFilter || 'All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    let result = activeCategory === 'All' 
      ? products 
      : products.filter(p => p.category === activeCategory);
    
    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (sortBy === 'price-low') return [...result].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') return [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [products, activeCategory, sortBy, searchQuery]);

  return (
    <div className="pb-24 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="bg-zinc-50 border-b py-20">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-6xl font-black font-oswald uppercase tracking-tighter mb-4">THE COLLECTIONS</h1>
          <p className="text-gray-500 max-w-lg mx-auto uppercase text-xs font-bold tracking-widest">
            Explore the intersection of luxury and utility. Precision-engineered for the modern urban landscape.
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="sticky top-[72px] z-40 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row md:items-center justify-between py-4 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-6 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {['All', 'Men', 'Women', 'Accessories', 'Limited'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeCategory === cat ? 'text-black border-b-2 border-black pb-1' : 'text-gray-400 hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-100 border-none rounded-full py-2 pl-10 pr-4 text-xs focus:ring-1 focus:ring-black outline-none w-40 md:w-60"
              />
            </div>
            <select 
              className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest cursor-pointer outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-4 md:px-8 py-12">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="group cursor-pointer"
                onClick={() => onNavigate('product', product)}
              >
                <div className="relative h-[450px] bg-zinc-100 overflow-hidden mb-4">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {product.stock < 10 && (
                    <span className="absolute top-4 left-4 bg-red-500 text-white text-[8px] font-black uppercase px-2 py-1 tracking-tighter">
                      Only {product.stock} Left
                    </span>
                  )}
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                    className={`absolute top-4 right-4 p-2.5 rounded-full shadow-md transition-all ${
                      wishlist.includes(product.id) ? 'bg-red-500 text-white' : 'bg-white text-black hover:bg-black hover:text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                  </button>
                  <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button className="w-full bg-white/90 backdrop-blur-md text-black py-3 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-lg">
                      View Details
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm uppercase mb-1 tracking-tight">{product.name}</h3>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{product.category}</p>
                  </div>
                  <span className="font-black font-oswald text-lg text-prism">${product.price}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-40 text-center">
            <p className="text-gray-400 uppercase text-xs font-bold tracking-widest">No products found matching your criteria.</p>
            <button 
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="mt-6 text-black border-b border-black pb-1 font-bold uppercase text-[10px] tracking-widest"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
