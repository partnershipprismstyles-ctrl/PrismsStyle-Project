import React, { useState } from 'react';
import { StoreProvider } from './store/StoreContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import Booking from './pages/Booking';
import Journal from './pages/Journal';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('home');
  const [pageData, setPageData] = useState<any>(null);

  const navigate = (page: string, data?: any) => {
    setActivePage(page);
    setPageData(data);
    window.scrollTo(0, 0);
  };

  const portfolioImages = [
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1529139572166-70845eb9f208?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=600"
  ];

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <Home onNavigate={navigate} />;
      case 'shop': return <Shop onNavigate={navigate} initialFilter={pageData?.category} />;
      case 'product': return <ProductDetail product={pageData} onNavigate={navigate} />;
      case 'cart': return <Cart onNavigate={navigate} />;
      case 'admin': return <Admin onExit={() => navigate('home')} />;
      case 'booking': return <Booking />;
      case 'journal': return <Journal />;
      case 'wishlist': return <Shop onNavigate={navigate} initialFilter="All" />;
      case 'portfolio': return (
        <div className="py-24 animate-in fade-in duration-700">
          <div className="container mx-auto px-4 text-center mb-16">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-prism mb-4">Editorial Collection</h2>
            <h1 className="text-6xl md:text-8xl font-black font-oswald uppercase tracking-tighter">PORTFOLIO 2026</h1>
          </div>
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
            {portfolioImages.map((img, i) => (
              <div key={i} className="group relative aspect-[3/4] overflow-hidden">
                <img 
                  src={img} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <p className="text-white text-[10px] font-black uppercase tracking-widest border border-white px-4 py-2">View Shoot</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      default: return <Home onNavigate={navigate} />;
    }
  };

  return (
    <StoreProvider>
      {activePage === 'admin' ? (
        <Admin onExit={() => navigate('home')} />
      ) : (
        <Layout activePage={activePage} setActivePage={navigate}>
          {renderPage()}
        </Layout>
      )}
    </StoreProvider>
  );
};

export default App;