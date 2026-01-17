import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, BlogPost, SiteSettings, Category, NavItem } from '../types';

interface StoreContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  blogPosts: BlogPost[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  settings: SiteSettings;
  updateSettings: (newSettings: SiteSettings) => void;
  activeStylistProduct: Product | null;
  setActiveStylistProduct: (product: Product | null) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeStylistProduct, setActiveStylistProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Oversized Prism Tee',
      price: 95,
      category: 'Men',
      description: 'Ultra-heavyweight 350GSM organic cotton engineered for a permanent structural drape.',
      images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1200'],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Midnight Black', 'Slate Grey'],
      stock: 42,
      featured: true,
      bestSeller: true,
      slug: 'oversized-prism-tee',
      specs: [{ label: 'Fabric', value: '100% Organic GOTS Cotton' }, { label: 'Weight', value: '350 GSM' }]
    },
    {
      id: '2',
      name: 'Cyber-Knit Hoody',
      price: 210,
      category: 'Women',
      description: 'A technical marvel in double-knit 3D spacer mesh. Integrated high-visibility 3M accents.',
      images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=1200'],
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Prism White', 'Onyx'],
      stock: 18,
      featured: true,
      slug: 'cyber-knit-hoody',
      specs: [{ label: 'Material', value: 'Recycled Tech-Nylon' }]
    },
    {
      id: '20',
      name: 'Titanium Shell Trench',
      price: 1200,
      category: 'Women',
      description: 'The definitive luxury outer layer. Constructed from laser-cut titanium-infused tech-silk. Waterproof, windproof, and undeniably elegant.',
      images: ['https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&q=80&w=1200'],
      sizes: ['S', 'M', 'L'],
      colors: ['Midnight Black', 'Platinum'],
      stock: 5,
      featured: true,
      slug: 'titanium-shell-trench',
      specs: [{ label: 'Fabric', value: 'Infused Tech-Silk' }, { label: 'Finish', value: 'Laser Bonded' }]
    },
    {
      id: '21',
      name: 'Liquid Satin Trousers',
      price: 450,
      category: 'Women',
      description: 'High-waisted technical satin with a liquid-like drape. Features internal compression panels for a sculpted silhouette.',
      images: ['https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200'],
      sizes: ['XS', 'S', 'M'],
      colors: ['Onyx', 'Bronze'],
      stock: 12,
      featured: true,
      slug: 'liquid-satin-trousers',
      specs: [{ label: 'Material', value: 'Italian Tech-Satin' }]
    },
    {
      id: '22',
      name: 'Architectural Bonded Blazer',
      price: 890,
      category: 'Men',
      description: 'Zero-stitch construction. High-frequency bonded seams create the ultimate minimalist aesthetic. Technical wool blend.',
      images: ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200'],
      sizes: ['M', 'L', 'XL'],
      colors: ['Charcoal', 'Stealth Black'],
      stock: 8,
      featured: true,
      slug: 'architectural-blazer',
      specs: [{ label: 'Fabric', value: 'Merino-Nylon Blend' }]
    },
    {
      id: '23',
      name: 'Basalt Fiber Knit',
      price: 380,
      category: 'Men',
      description: 'Heavyweight knit featuring fire-resistant basalt fiber particles. Exceptional heat regulation and structural durability.',
      images: ['https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?auto=format&fit=crop&q=80&w=1200'],
      sizes: ['S', 'M', 'L'],
      colors: ['Marrow', 'Ash'],
      stock: 15,
      slug: 'basalt-fiber-knit',
      specs: [{ label: 'Material', value: 'Basalt-Wool' }]
    },
    {
      id: '24',
      name: 'Iridescent Mesh Bodysuit',
      price: 195,
      category: 'Women',
      description: 'High-compression iridescent mesh that shifts color under movement. Designed for layering or high-impact editorial looks.',
      images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200'],
      sizes: ['XS', 'S', 'M'],
      colors: ['Prism Spectrum'],
      stock: 20,
      slug: 'iridescent-bodysuit',
      specs: [{ label: 'Fabric', value: 'Multichrome Mesh' }]
    },
    {
      id: '25',
      name: 'Monolith Cargo Pant',
      price: 520,
      category: 'Men',
      description: '14-pocket utility masterwork. Made from titanium-ripstop nylon with magnetic Fidlock closures throughout.',
      images: ['https://images.unsplash.com/photo-1624371414361-e6e8ea02c1e0?auto=format&fit=crop&q=80&w=1200'],
      sizes: ['30', '32', '34', '36'],
      colors: ['Onyx', 'Forest'],
      stock: 10,
      slug: 'monolith-cargo',
      specs: [{ label: 'Material', value: 'Titanium-Ripstop' }]
    },
    {
      id: '26',
      name: 'Prism Sculpt Gown',
      price: 2400,
      category: 'Limited',
      description: 'The flagship piece. 3D-printed structural bodice with hand-pleated liquid-silk skirt. Only 10 units produced worldwide.',
      images: ['https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1200'],
      sizes: ['S', 'M'],
      colors: ['Spectral White'],
      stock: 2,
      featured: true,
      slug: 'prism-sculpt-gown',
      specs: [{ label: 'Upper', value: '3D Printed TPU' }, { label: 'Lower', value: 'Heavyweight Silk' }]
    },
    {
      id: '27',
      name: 'Urban Shell Parka V2',
      price: 750,
      category: 'Men',
      description: '3-layer GORE-TEX equivalent. Fully taped seams, internal carry straps, and modular storage compartments.',
      images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=1200'],
      sizes: ['M', 'L', 'XL'],
      colors: ['Black', 'Cloud'],
      stock: 7,
      slug: 'urban-shell-parka',
      specs: [{ label: 'Membrane', value: '3L Waterproof' }]
    }
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: 'b1',
      title: 'The Evolution of Streetwear in 2026',
      subtitle: 'Future Materials',
      excerpt: 'Exploring how luxury brands are embracing industrial aesthetics.',
      content: 'Streetwear has transcended its origins...',
      author: 'Aria V.',
      date: '2026-05-20',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200',
      slug: 'evolution-of-streetwear-2026',
      category: 'EDITORIAL'
    }
  ]);

  const [settings, setSettings] = useState<SiteSettings>({
    brandName: 'PRISM STYLES',
    logoImage: '', 
    useImageLogo: false,
    primaryColor: '#000000',
    accentColor: '#7928ca',
    fontFamily: 'Inter',
    seoTitle: 'PRISM STYLES | Technical Streetwear & Structural Essentials',
    seoDescription: 'Shop architectural fashion and high-performance urban streetwear.',
    showHero: true,
    showCategories: true,
    showBestsellers: true,
    showAbout: true,
    showReviews: true,
    showBookingCTA: true,
    heroHeading: 'BEYOND THE SPECTRUM.',
    heroSubheading: 'Architectural aesthetics meets urban utility. Discover Phase 02: The Technical Minimalist Collection.',
    heroBackgroundImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1920',
    aboutHeading: 'REDEFINING THE MODERN SILHOUETTE.',
    aboutContent: 'PRISM STYLES was born from a desire to bridge the gap between high-fashion structural integrity and the raw energy of urban streetwear.',
    navItems: [
      { id: '1', label: 'Home', page: 'home' },
      { id: '2', label: 'Shop', page: 'shop' },
      { id: '3', label: 'Journal', page: 'journal' },
      { id: '4', label: 'Portfolio', page: 'portfolio' },
      { id: '5', label: 'VIP Concierge', page: 'booking' }
    ],
    socialLinks: { facebook: '#', instagram: '#', twitter: '#' }
  });

  const addToCart = (product: Product, size: string, color: string) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id && item.selectedSize === size && item.selectedColor === color);
      if (existingIndex > -1) {
        const newCart = [...prev];
        newCart[existingIndex].quantity += 1;
        return newCart;
      }
      return [...prev, { ...product, selectedSize: size, selectedColor: color, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => `${item.id}-${item.selectedSize}-${item.selectedColor}` !== itemId));
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    setCart(prev => prev.map(item => {
      const id = `${item.id}-${item.selectedSize}-${item.selectedColor}`;
      return id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item;
    }));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  const addOrder = (order: Order) => setOrders(prev => [order, ...prev]);
  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const updateSettings = (newSettings: SiteSettings) => setSettings(newSettings);

  return (
    <StoreContext.Provider value={{
      products, setProducts, cart, addToCart, removeFromCart, updateCartQuantity, clearCart,
      wishlist, toggleWishlist, orders, addOrder, updateOrderStatus,
      blogPosts, setBlogPosts, settings, updateSettings,
      activeStylistProduct, setActiveStylistProduct
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};