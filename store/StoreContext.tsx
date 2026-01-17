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
      description: 'The definitive silhouette for the modern wanderer. Ultra-heavyweight 350GSM organic cotton engineered for a permanent structural drape. Features our signature prism-spectrum back gradient.',
      images: [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=1200'
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Midnight Black', 'Slate Grey'],
      stock: 42,
      featured: true,
      bestSeller: true,
      slug: 'oversized-prism-tee',
      specs: [
        { label: 'Fabric', value: '100% Organic GOTS Cotton' },
        { label: 'Weight', value: '350 GSM Heavyweight' },
        { label: 'Origin', value: 'Milled in Portugal' }
      ]
    },
    {
      id: '2',
      name: 'Cyber-Knit Hoody',
      price: 210,
      category: 'Women',
      description: 'A technical marvel in double-knit 3D spacer mesh. Integrated high-visibility 3M accents and ergonomic thumb loops for high-intensity urban commuting. Thermal regulation guaranteed.',
      images: [
        'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200'
      ],
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Prism White', 'Onyx'],
      stock: 18,
      featured: true,
      slug: 'cyber-knit-hoody',
      specs: [
        { label: 'Material', value: 'Recycled Tech-Nylon Blend' },
        { label: 'Hardware', value: 'Matte Silicon Aglets' },
        { label: 'Protection', value: 'Wind-Resistant Weave' }
      ]
    },
    {
      id: '3',
      name: 'Technical Shell Parka',
      price: 520,
      category: 'Men',
      description: 'Absolute protection. 3-layer GORE-TEX alternative with 8-pocket modular storage. Every internal seam is laser-taped to ensure a 100% waterproof seal in extreme urban climates.',
      images: [
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1548883354-94bcfe321cbb?auto=format&fit=crop&q=80&w=1200'
      ],
      sizes: ['M', 'L', 'XL'],
      colors: ['Stealth Black', 'Concrete Grey'],
      stock: 9,
      featured: true,
      bestSeller: true,
      slug: 'technical-shell-parka',
      specs: [
        { label: 'Shell', value: 'Triple-Layer Membrane' },
        { label: 'Rating', value: '25,000mm Waterproof' },
        { label: 'Zippers', value: 'YKK Aquaguard®' }
      ]
    },
    {
      id: '4',
      name: 'Titanium Cargo Trousers',
      price: 340,
      category: 'Men',
      description: 'The backbone of the PRISM uniform. Crafted from titanium-infused ripstop nylon. 10 modular compartments with magnetic Fidlock closure for rapid access.',
      images: [
        'https://images.unsplash.com/photo-1624371414361-e6e8ea02c1e0?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=1200'
      ],
      sizes: ['30', '32', '34', '36'],
      colors: ['Onyx Black', 'Industrial Olive'],
      stock: 22,
      slug: 'titanium-cargo-trousers',
      specs: [
        { label: 'Material', value: 'Titanium-Nylon Ripstop' },
        { label: 'Buckles', value: 'Magnetic Fidlock®' },
        { label: 'Coating', value: 'Durable Water Repellent' }
      ]
    },
    {
      id: '5',
      name: 'Aero-Mesh Tech Vest',
      price: 180,
      category: 'Men',
      description: 'Modular layering for the technical minimalist. Laser-cut MOLLE webbing integrated into 3D aero-mesh for superior weight distribution and breathability.',
      images: [
        'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=1200'
      ],
      sizes: ['S', 'M', 'L'],
      colors: ['Midnight Black'],
      stock: 14,
      slug: 'aero-mesh-tech-vest',
      specs: [
        { label: 'Body', value: 'High-Tenacity Mesh' },
        { label: 'Attachment', value: 'Laser-Cut Hypalon' },
        { label: 'Weight', value: 'Ultralight 180g' }
      ]
    },
    {
      id: '6',
      name: 'Architectural Sling Bag',
      price: 195,
      category: 'Accessories',
      description: 'Precision storage. Sculpted from a single block of technical felt. Features internal RFID-blocking compartments and a seatbelt-grade quick-release strap.',
      images: [
        'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=1200'
      ],
      sizes: ['One Size'],
      colors: ['Stealth Black', 'Slate Grey'],
      stock: 45,
      bestSeller: true,
      slug: 'architectural-sling-bag',
      specs: [
        { label: 'Capacity', value: '6.5 Liters' },
        { label: 'Lining', value: 'Emergency Orange Satin' },
        { label: 'Hardware', value: 'Aviation Grade Aluminum' }
      ]
    },
    {
      id: '7',
      name: 'Carbon Fiber Frame Shades',
      price: 280,
      category: 'Accessories',
      description: 'Total clarity. 100% genuine multi-layer carbon fiber frames paired with polarized iridescent prism-lens technology. Engineered for high-glare urban environments.',
      images: [
        'https://images.unsplash.com/photo-1511499767350-a15943ee7297?auto=format&fit=crop&q=80&w=1200'
      ],
      sizes: ['One Size'],
      colors: ['Carbon Black'],
      stock: 15,
      slug: 'carbon-fiber-shades',
      specs: [
        { label: 'Frame', value: '3K Twill Carbon Fiber' },
        { label: 'Lens', value: 'Category 3 Polarized' },
        { label: 'Weight', value: '18 Grams' }
      ]
    },
    {
      id: '8',
      name: 'Spectrum 01 Sneakers',
      price: 360,
      category: 'Limited',
      description: 'Brutalist performance. Custom EVA midsole for infinite energy return. Features structural 3M iridescent paneling that shifts under night light.',
      images: [
        'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1200'
      ],
      sizes: ['8', '9', '10', '11', '12'],
      colors: ['Iridescent/Black'],
      stock: 3,
      featured: true,
      slug: 'limited-spectrum-sneakers',
      specs: [
        { label: 'Sole', value: 'Vibram® MegaGrip' },
        { label: 'Upper', value: 'Laser-Cut TPU Mesh' },
        { label: 'Heel', value: 'Dynamic Stabilizer' }
      ]
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
      excerpt: 'Exploring how luxury brands are embracing industrial aesthetics and high-performance textiles to redefine everyday uniforms.',
      content: 'Streetwear has transcended its origins to become the core language of luxury. In 2026, the focus has shifted from logos to architectural integrity. Our latest research into basalt fibers and recycled carbon composites is paving the way for garments that act as defensive shells for the urban wanderer.',
      author: 'Aria V.',
      date: '2026-05-20',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200',
      slug: 'evolution-of-streetwear-2026',
      category: 'EDITORIAL'
    },
    {
      id: 'b2',
      title: 'Modular Utility: A Deep Dive',
      subtitle: 'Technical Design',
      excerpt: 'How modular storage systems are changing the way we interact with our garments and the city.',
      content: 'The "Technical Shell Parka" isn\'t just a coat; it\'s a portable environment. With 8 modular pockets, it allows for a weight-distributed carry that traditional bags cannot match. Every seam is a testament to functional engineering.',
      author: 'Marcus L.',
      date: '2026-06-02',
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200',
      slug: 'modular-utility-deep-dive',
      category: 'TECHNICAL'
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
    seoDescription: 'Shop architectural fashion and high-performance urban streetwear from PRISM STYLES. Engineered in London, worn worldwide.',
    showHero: true,
    showCategories: true,
    showBestsellers: true,
    showAbout: true,
    showReviews: true,
    showBookingCTA: true,
    heroHeading: 'BEYOND THE SPECTRUM.',
    heroSubheading: 'Architectural aesthetics meets urban utility. Discover Phase 01: Limited drop featuring technical knits and industrial silhouettes.',
    heroBackgroundImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1920',
    aboutHeading: 'REDEFINING THE MODERN SILHOUETTE.',
    aboutContent: 'PRISM STYLES was born from a desire to bridge the gap between high-fashion structural integrity and the raw energy of urban streetwear. Every piece is an exercise in technical precision.',
    navItems: [
      { id: '1', label: 'Home', page: 'home' },
      { id: '2', label: 'Shop', page: 'shop' },
      { id: '3', label: 'Journal', page: 'journal' },
      { id: '4', label: 'Portfolio', page: 'portfolio' },
      { id: '5', label: 'VIP Concierge', page: 'booking' }
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