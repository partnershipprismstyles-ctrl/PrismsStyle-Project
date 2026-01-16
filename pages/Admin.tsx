
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  FileText, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  TrendingUp, 
  DollarSign,
  Save,
  Eye,
  EyeOff,
  Type,
  Palette,
  Globe,
  Navigation as NavIcon,
  Image as ImageIcon,
  Check,
  Upload
} from 'lucide-react';
import { useStore } from '../store/StoreContext';
import { Product, Order, BlogPost, SiteSettings, NavItem } from '../types';

const Admin: React.FC = () => {
  const { products, setProducts, orders, updateOrderStatus, blogPosts, setBlogPosts, settings, updateSettings } = useStore();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inventory' | 'orders' | 'cms' | 'design' | 'seo'>('dashboard');

  const totalSales = orders.reduce((acc, curr) => acc + curr.total, 0);

  // Helper for Inventory
  const handleAddProduct = () => {
    const newProd: Product = {
      id: Date.now().toString(),
      name: 'New Product',
      price: 0,
      category: 'Men',
      description: 'Product description...',
      images: ['https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800'],
      sizes: ['S', 'M', 'L'],
      colors: ['Black'],
      stock: 0,
      slug: `new-product-${Date.now()}`
    };
    setProducts([newProd, ...products]);
  };

  const updateProduct = (id: string, field: keyof Product, val: any) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, [field]: val } : p));
  };

  // Helper for CMS
  const handleAddBlogPost = () => {
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: 'New Fashion Insight',
      excerpt: 'Short excerpt...',
      content: 'Write your story here...',
      author: 'Admin',
      date: new Date().toISOString().split('T')[0],
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200',
      slug: `new-insight-${Date.now()}`
    };
    setBlogPosts([newPost, ...blogPosts]);
  };

  const updateBlogPost = (id: string, field: keyof BlogPost, val: any) => {
    setBlogPosts(prev => prev.map(b => b.id === id ? { ...b, [field]: val } : b));
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex font-inter">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-8 flex flex-col shrink-0 sticky top-0 h-screen">
        <div className="mb-12">
          <h2 className="text-xl font-black font-oswald tracking-tighter">PRISM <span className="text-prism">SYSTEM</span></h2>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Management Engine v2.0</p>
        </div>
        <nav className="flex-grow space-y-2">
          {[
            { id: 'dashboard', label: 'Analytics', icon: LayoutDashboard },
            { id: 'inventory', label: 'Inventory', icon: Package },
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
            { id: 'cms', label: 'Editorial', icon: FileText },
            { id: 'design', label: 'Design & UI', icon: Palette },
            { id: 'seo', label: 'SEO & Meta', icon: Globe },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all ${
                activeTab === item.id ? 'bg-zinc-800 text-prism' : 'text-zinc-500 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-8 border-t border-zinc-800">
           <button onClick={() => window.location.href = '/'} className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
              <Eye className="w-4 h-4" />
              <span>View Site</span>
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-12 overflow-y-auto max-h-screen">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black font-oswald uppercase tracking-tight">{activeTab}</h1>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Refining your brand identity</p>
          </div>
          <button className="bg-black text-white px-8 py-3 rounded text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center shadow-lg">
             <Save className="w-4 h-4 mr-3" /> Save Changes
          </button>
        </header>

        {/* Analytics Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Sales', val: `$${totalSales.toLocaleString()}`, icon: DollarSign, color: 'bg-prism text-white' },
                { label: 'Pending Orders', val: orders.filter(o => o.status === 'Pending').length, icon: ShoppingBag, color: 'bg-white text-black' },
                { label: 'Live Products', val: products.length, icon: Package, color: 'bg-white text-black' },
                { label: 'Page Views', val: '12.8k', icon: TrendingUp, color: 'bg-white text-black' },
              ].map((stat, i) => (
                <div key={i} className={`p-8 rounded-2xl shadow-sm border border-zinc-200 ${stat.color}`}>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">{stat.label}</p>
                  <p className="text-4xl font-black font-oswald">{stat.val}</p>
                </div>
              ))}
            </div>
            {/* Recent Orders Placeholder */}
            <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm">
                <h3 className="text-sm font-black uppercase tracking-widest mb-8 border-b pb-4">Recent Transactions</h3>
                <div className="space-y-6">
                   {orders.length === 0 ? <p className="text-gray-400 text-xs uppercase font-bold tracking-widest">No transactions recorded yet.</p> : orders.slice(0, 5).map(o => (
                      <div key={o.id} className="flex justify-between items-center py-2 border-b border-zinc-50 last:border-0">
                         <span className="text-[11px] font-bold uppercase">{o.customerName}</span>
                         <span className="text-xs font-black">${o.total}</span>
                      </div>
                   ))}
                </div>
            </div>
          </div>
        )}

        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
             <div className="p-8 border-b border-zinc-100 flex justify-between items-center">
                <h3 className="text-[11px] font-black uppercase tracking-widest">Stock & Variants</h3>
                <button onClick={handleAddProduct} className="bg-black text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 flex items-center">
                   <Plus className="w-3 h-3 mr-2" /> Add Item
                </button>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-zinc-50 border-b border-zinc-100">
                    <tr className="text-left">
                      <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Media</th>
                      <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Product Name</th>
                      <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Price</th>
                      <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Stock</th>
                      <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-zinc-50 transition-colors">
                        <td className="px-8 py-4">
                           <img src={p.images[0]} className="w-10 h-12 object-cover rounded border" />
                        </td>
                        <td className="px-8 py-4">
                           <input 
                             className="text-[11px] font-bold uppercase bg-transparent w-full focus:bg-white p-1 rounded" 
                             value={p.name} 
                             onChange={(e) => updateProduct(p.id, 'name', e.target.value)}
                           />
                        </td>
                        <td className="px-8 py-4">
                           <input 
                             type="number"
                             className="text-[11px] font-black bg-transparent w-20 focus:bg-white p-1 rounded" 
                             value={p.price} 
                             onChange={(e) => updateProduct(p.id, 'price', Number(e.target.value))}
                           />
                        </td>
                        <td className="px-8 py-4">
                           <input 
                             type="number"
                             className="text-[11px] font-bold bg-transparent w-16 focus:bg-white p-1 rounded" 
                             value={p.stock} 
                             onChange={(e) => updateProduct(p.id, 'stock', Number(e.target.value))}
                           />
                        </td>
                        <td className="px-8 py-4">
                           <button onClick={() => setProducts(prev => prev.filter(item => item.id !== p.id))} className="text-zinc-400 hover:text-red-500 transition-colors">
                              <Trash2 className="w-4 h-4" />
                           </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        )}

        {/* Editorial Tab */}
        {activeTab === 'cms' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-[11px] font-black uppercase tracking-widest">Article Management</h3>
               <button onClick={handleAddBlogPost} className="bg-black text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 flex items-center">
                  <Plus className="w-3 h-3 mr-2" /> New Post
               </button>
            </div>
            {blogPosts.map(post => (
              <div key={post.id} className="bg-white p-8 rounded-2xl border border-zinc-200 flex flex-col md:flex-row gap-8 items-start shadow-sm">
                 <div className="w-40 h-28 bg-zinc-100 rounded-lg overflow-hidden shrink-0">
                    <img src={post.image} className="w-full h-full object-cover" />
                 </div>
                 <div className="flex-grow space-y-4 w-full">
                    <input 
                      className="text-2xl font-black font-oswald uppercase w-full bg-transparent border-b border-transparent focus:border-zinc-200"
                      value={post.title}
                      onChange={(e) => updateBlogPost(post.id, 'title', e.target.value)}
                    />
                    <textarea 
                      className="w-full text-xs text-gray-500 bg-transparent border-none focus:ring-0 h-16 resize-none"
                      value={post.excerpt}
                      onChange={(e) => updateBlogPost(post.id, 'excerpt', e.target.value)}
                    />
                    <div className="flex items-center space-x-4">
                       <input 
                         className="text-[10px] font-black uppercase text-zinc-400 bg-transparent border-none p-0"
                         value={post.slug}
                         placeholder="URL Slug"
                         onChange={(e) => updateBlogPost(post.id, 'slug', e.target.value)}
                       />
                       <button onClick={() => setBlogPosts(prev => prev.filter(b => b.id !== post.id))} className="text-zinc-400 hover:text-red-500 ml-auto">
                         <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        )}

        {/* Design Tab */}
        {activeTab === 'design' && (
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Branding Section */}
              <div className="bg-white p-10 rounded-2xl border border-zinc-200 shadow-sm space-y-10">
                 <div className="flex items-center space-x-3 mb-6">
                    <Palette className="w-5 h-5 text-prism" />
                    <h3 className="text-[11px] font-black uppercase tracking-widest">Global Branding</h3>
                 </div>
                 <div className="space-y-6">
                    <div>
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-2">Brand Name (Text Logo)</label>
                       <input 
                         className="w-full border-b border-zinc-200 py-3 text-sm font-bold uppercase focus:border-prism transition-colors outline-none" 
                         value={settings.brandName}
                         onChange={(e) => updateSettings({...settings, brandName: e.target.value})}
                       />
                    </div>
                    
                    <div className="pt-4 border-t border-zinc-50">
                       <div className="flex justify-between items-center mb-4">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">Use Image-based Logo</label>
                          <button 
                             onClick={() => updateSettings({...settings, useImageLogo: !settings.useImageLogo})}
                             className={`w-10 h-6 rounded-full transition-all relative ${settings.useImageLogo ? 'bg-black' : 'bg-zinc-300'}`}
                          >
                             <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.useImageLogo ? 'right-1' : 'left-1'}`}></div>
                          </button>
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-2">Logo URL</label>
                          <div className="flex items-center space-x-3">
                             <div className="w-10 h-10 rounded border bg-zinc-50 flex items-center justify-center overflow-hidden">
                                {settings.logoImage ? <img src={settings.logoImage} className="w-full h-full object-contain" /> : <ImageIcon className="w-4 h-4 text-zinc-300" />}
                             </div>
                             <input 
                                className="flex-grow border-b border-zinc-200 py-2 text-xs font-medium focus:border-prism outline-none" 
                                placeholder="https://..."
                                value={settings.logoImage} 
                                onChange={(e) => updateSettings({...settings, logoImage: e.target.value})} 
                             />
                          </div>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 pt-4">
                       <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-2">Accent Color</label>
                          <div className="flex items-center space-x-3">
                             <div className="w-8 h-8 rounded border" style={{backgroundColor: settings.accentColor}}></div>
                             <input className="text-[10px] font-black uppercase w-full bg-zinc-50 p-2 border" value={settings.accentColor} onChange={(e) => updateSettings({...settings, accentColor: e.target.value})} />
                          </div>
                       </div>
                       <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-2">Typography</label>
                          <select className="text-[10px] font-black uppercase w-full bg-zinc-50 p-2 border" value={settings.fontFamily} onChange={(e) => updateSettings({...settings, fontFamily: e.target.value as any})}>
                             <option value="Inter">Standard (Inter)</option>
                             <option value="Oswald">Bold (Oswald)</option>
                             <option value="Serif">Classic (Serif)</option>
                          </select>
                       </div>
                    </div>
                 </div>
                 
                 <div className="pt-10 border-t space-y-6">
                    <h3 className="text-[11px] font-black uppercase tracking-widest">Navigation Editor</h3>
                    <div className="space-y-3">
                       {settings.navItems.map(nav => (
                          <div key={nav.id} className="flex items-center space-x-3 bg-zinc-50 p-3 rounded-lg border">
                             <NavIcon className="w-3 h-3 text-zinc-400" />
                             <input className="text-[10px] font-bold uppercase bg-transparent outline-none flex-grow" value={nav.label} onChange={(e) => {
                                const newNavs = settings.navItems.map(ni => ni.id === nav.id ? {...ni, label: e.target.value} : ni);
                                updateSettings({...settings, navItems: newNavs});
                             }} />
                             <button className="text-zinc-400 hover:text-black"><Edit className="w-3 h-3" /></button>
                          </div>
                       ))}
                       <button className="w-full py-2 border-2 border-dashed border-zinc-200 rounded-lg text-[10px] font-black uppercase text-zinc-400 hover:bg-zinc-50 transition-colors">Add Menu Item</button>
                    </div>
                 </div>
              </div>

              {/* Homepage Sections */}
              <div className="bg-white p-10 rounded-2xl border border-zinc-200 shadow-sm space-y-10">
                 <div className="flex items-center space-x-3 mb-6">
                    <Type className="w-5 h-5 text-prism" />
                    <h3 className="text-[11px] font-black uppercase tracking-widest">Layout & Content</h3>
                 </div>
                 
                 <div className="space-y-6">
                    <div>
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-2">Hero Background Picture (URL)</label>
                       <div className="flex items-center space-x-3 mb-2">
                          <div className="w-16 h-10 rounded border bg-zinc-50 overflow-hidden shrink-0">
                             <img src={settings.heroBackgroundImage} className="w-full h-full object-cover" />
                          </div>
                          <input 
                             className="flex-grow border-b border-zinc-200 py-2 text-xs font-medium focus:border-prism outline-none" 
                             value={settings.heroBackgroundImage}
                             onChange={(e) => updateSettings({...settings, heroBackgroundImage: e.target.value})}
                          />
                       </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-50 space-y-4">
                       <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">Homepage Sections Visibility</p>
                       {[
                         { key: 'showHero', label: 'Main Hero Experience' },
                         { key: 'showCategories', label: 'Product Essentials Grid' },
                         { key: 'showBestsellers', label: 'Bestseller Carousel' },
                         { key: 'showAbout', label: 'Brand Story Section' },
                         { key: 'showReviews', label: 'Social Proof & Reviews' },
                         { key: 'showBookingCTA', label: 'VIP Concierge CTA' }
                       ].map(section => (
                         <div key={section.key} className="flex justify-between items-center bg-zinc-50 p-4 rounded-xl border">
                            <span className="text-[11px] font-bold uppercase tracking-tight">{section.label}</span>
                            <button 
                              onClick={() => updateSettings({...settings, [section.key]: !settings[section.key as keyof SiteSettings]})}
                              className={`w-10 h-6 rounded-full transition-all relative ${settings[section.key as keyof SiteSettings] ? 'bg-black' : 'bg-zinc-300'}`}
                            >
                               <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings[section.key as keyof SiteSettings] ? 'right-1' : 'left-1'}`}></div>
                            </button>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="pt-10 border-t space-y-6">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">Hero Title Customization</label>
                    <input 
                      className="w-full border-b border-zinc-200 py-3 text-2xl font-black font-oswald uppercase focus:border-prism outline-none"
                      value={settings.heroHeading}
                      onChange={(e) => updateSettings({...settings, heroHeading: e.target.value})}
                    />
                 </div>
              </div>
           </div>
        )}

        {/* SEO Tab */}
        {activeTab === 'seo' && (
           <div className="bg-white p-12 rounded-2xl border border-zinc-200 shadow-sm max-w-3xl">
              <div className="flex items-center space-x-3 mb-12 border-b pb-6">
                 <Globe className="w-6 h-6 text-prism" />
                 <h3 className="text-[11px] font-black uppercase tracking-widest">Site-Wide SEO Engine</h3>
              </div>
              <div className="space-y-10">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Meta Browser Title</label>
                    <input 
                      className="w-full border p-4 text-xs font-bold outline-none focus:ring-1 focus:ring-prism rounded-lg"
                      value={settings.seoTitle}
                      onChange={(e) => updateSettings({...settings, seoTitle: e.target.value})}
                    />
                    <p className="text-[9px] text-zinc-400 uppercase tracking-tighter">Recommended: Under 60 characters</p>
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Global Search Description</label>
                    <textarea 
                      className="w-full border p-4 text-xs font-medium outline-none focus:ring-1 focus:ring-prism rounded-lg h-32 resize-none"
                      value={settings.seoDescription}
                      onChange={(e) => updateSettings({...settings, seoDescription: e.target.value})}
                    />
                    <p className="text-[9px] text-zinc-400 uppercase tracking-tighter">Recommended: 150-160 characters for best results in Google.</p>
                 </div>
                 <div className="pt-8 border-t flex items-center justify-between">
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-widest mb-1">Search Preview</p>
                       <p className="text-blue-600 text-sm font-medium underline mb-1">{settings.seoTitle}</p>
                       <p className="text-zinc-500 text-xs line-clamp-2 max-w-md">{settings.seoDescription}</p>
                    </div>
                 </div>
              </div>
           </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
