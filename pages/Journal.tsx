import React from 'react';
import { ArrowRight, Bookmark } from 'lucide-react';
import { useStore } from '../store/StoreContext';

const Journal: React.FC = () => {
  const { blogPosts } = useStore();

  return (
    <div className="animate-in fade-in duration-700">
      {/* Editorial Header */}
      <section className="bg-black text-white py-32 border-b border-zinc-900">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <p className="text-prism font-black uppercase tracking-[0.5em] text-[10px] mb-8">The Periodic Editorial</p>
          <h1 className="text-6xl md:text-[10rem] font-black font-oswald uppercase tracking-tighter leading-none">JOURNAL</h1>
          <div className="max-w-2xl mx-auto mt-12">
            <p className="text-zinc-500 text-lg font-medium leading-relaxed">
              Deep dives into textile technology, architectural fashion, and the future of urban lifestyle. Exploring the friction between utility and beauty.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {blogPosts.length > 0 && (
        <section className="py-24 border-b">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-[16/9] lg:aspect-square overflow-hidden bg-zinc-100">
                <img 
                  src={blogPosts[0].image} 
                  alt={blogPosts[0].title} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[2000ms]"
                />
                <div className="absolute top-8 left-8 bg-white text-black px-4 py-2 text-[10px] font-black uppercase tracking-widest">
                  Featured Insight
                </div>
              </div>
              <div className="space-y-8">
                <p className="text-prism font-black uppercase tracking-[0.3em] text-[10px]">{blogPosts[0].category} • {blogPosts[0].date}</p>
                <h2 className="text-5xl md:text-7xl font-black font-oswald uppercase tracking-tight leading-[0.9]">
                  {blogPosts[0].title}
                </h2>
                <h3 className="text-2xl font-bold text-zinc-400 uppercase tracking-tight">{blogPosts[0].subtitle}</h3>
                <p className="text-zinc-600 text-lg leading-relaxed max-w-xl">
                  {blogPosts[0].excerpt}
                </p>
                <button className="flex items-center text-sm font-black uppercase tracking-widest border-b-2 border-black pb-2 hover:text-prism hover:border-prism transition-all">
                  Read Full Editorial <ArrowRight className="ml-4 w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Journal Grid */}
      <section className="py-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {blogPosts.slice(1).map((post) => (
              <div key={post.id} className="group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden mb-8 bg-zinc-100">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  />
                  <button className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  <p className="text-zinc-400 font-black uppercase tracking-[0.3em] text-[10px]">{post.category}</p>
                  <h3 className="text-3xl font-black font-oswald uppercase tracking-tight group-hover:text-prism transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-zinc-500 text-sm line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-widest text-zinc-400 pt-4">
                    <span>{post.author}</span>
                    <span className="w-1 h-1 bg-zinc-300 rounded-full"></span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / Subscription */}
      <section className="bg-zinc-50 py-32 border-t">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <h2 className="text-4xl font-black font-oswald uppercase tracking-tight mb-8">STAY IN THE SPECTRUM</h2>
          <p className="text-zinc-500 text-lg mb-12">
            Our journal is published bi-weekly. Subscribe to receive our technical whitepapers and exclusive lookbooks before the general drop.
          </p>
          <form className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-8 py-5 bg-white border border-zinc-200 outline-none focus:border-black transition-all text-sm font-medium"
            />
            <button className="bg-black text-white px-12 py-5 text-xs font-black uppercase tracking-widest hover:bg-prism transition-all">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Journal;