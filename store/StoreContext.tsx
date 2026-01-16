
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
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Oversized Prism Tee',
      price: 85,
      category: 'Men',
      description: 'Ultra-heavyweight 300GSM cotton tee with a signature prism gradient back print. Engineered for a structural oversized drape.',
      images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800'],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Midnight Black', 'Slate Grey'],
      stock: 50,
      featured: true,
      bestSeller: true,
      slug: 'oversized-prism-tee'
    },
    {
      id: '2',
      name: 'Cyber-Knit Hoody',
      price: 195,
      category: 'Women',
      description: 'Technical double-knit hoodie featuring high-visibility prism accents and integrated thumb loops.',
      images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800'],
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Prism White', 'Onyx'],
      stock: 25,
      featured: true,
      slug: 'cyber-knit-hoody'
    },
    {
      id: '3',
      name: 'Technical Shell Parka',
      price: 450,
      category: 'Men',
      description: 'Water-resistant 3-layer GORE-TEX alternative shell. Features 8-pocket modular storage and taped internal seams.',
      images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800'],
      sizes: ['M', 'L', 'XL'],
      colors: ['Stealth Black', 'Olive Drab'],
      stock: 12,
      featured: true,
      slug: 'technical-shell-parka'
    },
    {
      id: '4',
      name: 'Pleated Industrial Trousers',
      price: 210,
      category: 'Men',
      description: 'High-waisted architectural trousers with permanent pleating and reinforced nylon knee panels.',
      images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800'],
      sizes: ['30', '32', '34', '36'],
      colors: ['Midnight Black', 'Slate'],
      stock: 30,
      bestSeller: true,
      slug: 'pleated-industrial-trousers'
    },
    {
      id: '5',
      name: 'Asymmetric Knit Vest',
      price: 135,
      category: 'Women',
      description: 'Deconstructed knitwear crafted from ultra-soft Merino wool. Features raw edges and asymmetric layering potential.',
      images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800'],
      sizes: ['S', 'M', 'L'],
      colors: ['Onyx', 'Bone'],
      stock: 18,
      slug: 'asymmetric-knit-vest'
    },
    {
      id: '6',
      name: 'Prism Stealth Watch v2',
      price: 295,
      category: 'Accessories',
      description: 'Sandblasted steel case with a matte sapphire face. Minimalist aesthetic with a high-torque Japanese movement.',
      images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800'],
      sizes: ['One Size'],
      colors: ['Matte Black'],
      stock: 8,
      featured: true,
      slug: 'prism-stealth-watch'
    },
    {
      id: '7',
      name: 'Industrial Utility Belt',
      price: 65,
      category: 'Accessories',
      description: 'Quick-release Cobra-style buckle with high-tensile nylon webbing. Laser-etched logo detailing.',
      images: ['https://images.unsplash.com/photo-1624222247344-550fbadfd08d?auto=format&fit=crop&q=80&w=800'],
      sizes: ['One Size'],
      colors: ['Black', 'Safety Orange'],
      stock: 45,
      bestSeller: true,
      slug: 'industrial-utility-belt'
    },
    {
      id: '8',
      name: 'Spectrum 01 Sneakers',
      price: 320,
      category: 'Limited',
      description: 'Hybrid performance-fashion footwear. Features iridescent 3M panels and a custom-molded EVA midsole.',
      images: ['https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800'],
      sizes: ['8', '9', '10', '11', '12'],
      colors: ['Iridescent/Black'],
      stock: 5,
      featured: true,
      slug: 'limited-spectrum-sneakers'
    },
    {
      id: '9',
      name: 'Structural Maxi Coat',
      price: 580,
      category: 'Women',
      description: 'Floor-length heavy wool coat with aggressive shoulder structure and concealed magnetic closures.',
      images: ['https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=800'],
      sizes: ['XS', 'S', 'M'],
      colors: ['Charcoal', 'Midnight'],
      stock: 7,
      featured: true,
      slug: 'structural-maxi-coat'
    },
    {
      id: '10',
      name: 'Reflective Crossbody',
      price: 110,
      category: 'Accessories',
      description: 'A compact tactical bag built from 1000D Cordura with fully reflective paneling for night-cycle utility.',
      images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800'],
      sizes: ['One Size'],
      colors: ['Reflective Silver', 'Tactical Black'],
      stock: 22,
      slug: 'reflective-crossbody-bag'
    },
    {
      id: '11',
      name: 'Monolith Cargo Pant',
      price: 240,
      category: 'Men',
      description: 'Triple-stitched 12-pocket cargo pants. Features adjustable hem drawstrings and water-repellent coating.',
      images: ['https://images.unsplash.com/photo-1594932224828-b4b059b6f684?auto=format&fit=crop&q=80&w=800'],
      sizes: ['30', '32', '34', '36'],
      colors: ['Graphite', 'Desert'],
      stock: 15,
      slug: 'monolith-cargo-pant'
    },
    {
      id: '12',
      name: 'Obsidian Trench',
      price: 620,
      category: 'Women',
      description: 'The ultimate city coat. Constructed from a high-density poly-silk blend that holds a dramatic silhouette.',
      images: ['https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&q=80&w=800'],
      sizes: ['S', 'M', 'L'],
      colors: ['Obsidian Black'],
      stock: 10,
      featured: true,
      slug: 'obsidian-trench'
    },
    {
      id: '13',
      name: 'Logo Beanie',
      price: 45,
      category: 'Accessories',
      description: 'Recycled acrylic knit beanie. Thick gauge for maximum shape retention. Embroidered 3D prism logo.',
      images: ['https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=800'],
      sizes: ['One Size'],
      colors: ['Black', 'Grey', 'Electric Blue'],
      stock: 100,
      slug: 'prism-logo-beanie'
    },
    {
      id: '14',
      name: 'Cyber Utility Vest',
      price: 280,
      category: 'Men',
      description: 'Tactical layering piece with a built-in hydration compartment and MOLLE-compatible attachment points.',
      images: ['https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&q=80&w=800'],
      sizes: ['M', 'L'],
      colors: ['Stealth Black'],
      stock: 6,
      slug: 'cyber-utility-vest'
    },
    {
      id: '15',
      name: 'Acid-Wash Prism Denim',
      price: 310,
      category: 'Women',
      description: 'Custom-distressed 14oz Japanese denim with a subtle iridescent prism-dye finish on the seams.',
      images: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800'],
      sizes: ['24', '26', '28'],
      colors: ['Prism Acid'],
      stock: 14,
      slug: 'prism-denim'
    }
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: 'b1',
      title: 'The Evolution of Streetwear in 2026',
      excerpt: 'Exploring how luxury brands are embracing industrial aesthetics and high-performance textiles.',
      content: 'Streetwear has transcended its origins to become the core language of luxury...',
      author: 'Prism Editorial',
      date: '2026-05-20',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200',
      slug: 'evolution-of-streetwear-2026'
    }
  ]);

  const [settings, setSettings] = useState<SiteSettings>({
    brandName: 'PRISM STYLES INC.',
    logoImage: '', 
    useImageLogo: false,
    primaryColor: '#000000',
    accentColor: '#7928ca',
    fontFamily: 'Inter',
    seoTitle: 'PRISM STYLES INC. | Premium Streetwear & Ready-to-Wear',
    seoDescription: 'Shop high-end architectural fashion and urban streetwear from PRISM STYLES INC. Worldwide express shipping.',
    showHero: true,
    showCategories: true,
    showBestsellers: true,
    showAbout: true,
    showReviews: true,
    showBookingCTA: true,
    heroHeading: 'BEYOND THE SPECTRUM.',
    heroSubheading: 'Architectural aesthetics meets urban utility. Discover the latest limited-edition drop featuring technical knitwear and industrial silhouettes.',
    // Set Vera Jikmans aesthetic shot (Dutch high-fashion model vibe)
    heroBackgroundImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=1920',
    aboutHeading: 'REDEFINING THE MODERN SILHOUETTE.',
    aboutContent: 'PRISM STYLES INC. was born from a desire to bridge the gap between high-fashion structural integrity and the raw energy of urban streetwear. Every piece is an exercise in technical precision.',
    navItems: [
      { id: '1', label: 'Home', page: 'home' },
      { id: '2', label: 'Shop', page: 'shop' },
      { id: '3', label: 'Portfolio', page: 'portfolio' },
      { id: '4', label: 'Bookings', page: 'booking' }
    ],
    socialLinks: {
      facebook: 'https://facebook.com/prismstyles',
      instagram: 'https://instagram.com/prismstyles',
      twitter: 'https://twitter.com/prismstyles'
    }
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
      blogPosts, setBlogPosts, settings, updateSettings
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
