
export type Category = 'Men' | 'Women' | 'Accessories' | 'Limited';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  featured?: boolean;
  bestSeller?: boolean;
  slug?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export interface CartItem extends Product {
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  customerName: string;
  email: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  slug?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface NavItem {
  id: string;
  label: string;
  page: string;
}

export interface SiteSettings {
  brandName: string;
  logoImage: string;
  useImageLogo: boolean;
  primaryColor: string;
  accentColor: string;
  fontFamily: 'Inter' | 'Oswald' | 'Serif';
  seoTitle: string;
  seoDescription: string;
  // Section Visibility
  showHero: boolean;
  showCategories: boolean;
  showBestsellers: boolean;
  showAbout: boolean;
  showReviews: boolean;
  showBookingCTA: boolean;
  // Content Customization
  heroHeading: string;
  heroSubheading: string;
  heroBackgroundImage: string;
  aboutHeading: string;
  aboutContent: string;
  // Links
  navItems: NavItem[];
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}
