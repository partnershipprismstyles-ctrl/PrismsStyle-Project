
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, User, Menu, X, Heart, Settings, Calendar } from 'lucide-react';
import { useStore } from '../store/StoreContext';

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  setActivePage: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activePage, setActivePage }) => {
  const { cart, wishlist, settings } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      await fetch('https://formspree.io/f/mojjvrgb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          _subject: `Newsletter Signup - ${settings.brandName}`,
          message: 'User signed up for the newsletter.'
        })
      });
      alert('Thank you for joining our community!');
      setEmail('');
    } catch (error) {
      console.error('Error submitting newsletter:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderLogo = () => {
    if (settings.useImageLogo && settings.logoImage) {
      return (
        <div className="flex items-center h-full">
          <img 
            src={settings.logoImage} 
            alt={settings.brandName} 
            className="h-10 md:h-14 w-auto object-contain transition-all"
          />
        </div>
      );
    }
    const brandParts = settings.brandName.split(' ');
    return (
      <h1 className="text-2xl md:text-3xl font-black font-oswald tracking-tighter text-black flex items-center">
        {brandParts[0]} {brandParts[1] && <span className="text-prism ml-1">{brandParts[1]}</span>}
      </h1>
    );
  };

  return (
    <div className={`min-h-screen flex flex-col bg-white font-${settings.fontFamily.toLowerCase()}`}>
      {/* Promotion Bar */}
      <div className="bg-black text-white text-[10px] py-1.5 px-4 text-center uppercase tracking-widest font-black">
        Free worldwide express shipping on orders over $300
      </div>

      {/* Header */}
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
          isScrolled ? 'bg-white/90 backdrop-blur-md py-2 shadow-sm' : 'bg-white py-4'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <button 
            className="md:hidden p-2 -ml-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Nav Links - Dynamic from Settings */}
          <nav className="hidden md:flex items-center space-x-8 text-[11px] font-black uppercase tracking-widest">
            {settings.navItems.map(item => (
              <button 
                key={item.id}
                onClick={() => setActivePage(item.page)}
                className={`hover:text-prism transition-colors ${activePage === item.page ? 'text-black border-b border-black pb-1' : 'text-gray-400'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Logo */}
          <div 
            className="cursor-pointer"
            onClick={() => setActivePage('home')}
          >
            {renderLogo()}
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <button className="hidden sm:block p-1 hover:text-prism"><Search className="w-5 h-5" /></button>
            <button 
              onClick={() => setActivePage('wishlist')}
              className="relative p-1 hover:text-prism"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => setActivePage('cart')}
              className="relative p-1 hover:text-prism"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartTotalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartTotalItems}
                </span>
              )}
            </button>
            <button 
              onClick={() => setActivePage('admin')}
              className="p-1 hover:text-prism group"
              title="Admin Panel"
            >
              <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-[280px] h-full p-8 flex flex-col animate-in slide-in-from-left duration-300">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-xl font-black font-oswald tracking-tighter uppercase">{settings.brandName.split(' ')[0]}</h2>
              <button onClick={() => setIsMobileMenuOpen(false)}><X className="w-6 h-6" /></button>
            </div>
            <nav className="flex flex-col space-y-8 text-xl font-black uppercase tracking-widest">
              {settings.navItems.map(item => (
                <button key={item.id} onClick={() => { setActivePage(item.page); setIsMobileMenuOpen(false); }}>{item.label}</button>
              ))}
              <button onClick={() => { setActivePage('blog'); setIsMobileMenuOpen(false); }}>Insights</button>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            {/* Branding */}
            <div className="md:col-span-1">
              <div className="flex flex-col items-start">
                {renderLogo()}
                <p className="text-zinc-500 text-sm leading-relaxed mb-8 mt-6">
                  {settings.seoDescription}
                </p>
              </div>
              <div className="flex space-x-4">
                {Object.entries(settings.socialLinks).map(([name, url]) => (
                  <a key={name} href={url} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-black cursor-pointer transition-all text-[10px] font-black uppercase tracking-tighter">
                    {name.substring(0, 2)}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] mb-8 text-zinc-500">Shop Prism</h3>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-zinc-300">
                <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setActivePage('shop')}>All Collections</li>
                <li className="hover:text-white cursor-pointer transition-colors">Limited Drops</li>
                <li className="hover:text-white cursor-pointer transition-colors">Bestsellers</li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] mb-8 text-zinc-500">Service</h3>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-zinc-300">
                <li className="hover:text-white cursor-pointer transition-colors">Shipping & Returns</li>
                <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setActivePage('booking')}>VIP Concierge</li>
                <li className="hover:text-white cursor-pointer transition-colors">FAQs</li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] mb-8 text-zinc-500">The Prism List</h3>
              <p className="text-sm text-zinc-400 mb-6 font-medium">Be the first to know about upcoming architectural drops.</p>
              <form className="relative" onSubmit={handleNewsletterSubmit}>
                <input 
                  type="email" 
                  required
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-900 border-b border-zinc-800 py-3 px-0 focus:border-white outline-none transition-colors text-sm font-bold"
                />
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase hover:text-prism disabled:opacity-50 tracking-widest"
                >
                  {isSubmitting ? '...' : 'Join'}
                </button>
              </form>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-zinc-900 text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-black">
            <p>&copy; 2026 {settings.brandName}. All rights reserved.</p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <span className="cursor-pointer hover:text-white transition-colors">Privacy</span>
              <span className="cursor-pointer hover:text-white transition-colors">Terms</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
