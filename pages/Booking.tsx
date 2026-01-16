
import React, { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

const Booking: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Personal Styling',
    date: '',
    time: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('https://formspree.io/f/mojjvrgb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          _subject: `New VIP Booking Request - ${formData.service} from ${formData.name}`
        })
      });
      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Booking submission error:', error);
      alert('Failed to send booking request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-32 text-center animate-in zoom-in-95 duration-500">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full mb-8">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h1 className="text-5xl font-black font-oswald uppercase tracking-tight mb-4">REQUEST RECEIVED</h1>
        <p className="text-gray-500 text-lg mb-12 max-w-md mx-auto">Our concierge team will review your session request and contact you within 24 hours to confirm your slot.</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-black text-white px-10 py-5 text-sm font-black uppercase tracking-widest hover:bg-zinc-800 transition-all"
        >
          Book Another Session
        </button>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700">
      {/* Page Header */}
      <section className="relative h-[50vh] bg-black flex items-center justify-center text-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1920" 
          className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale"
          alt="VIP Showroom"
        />
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-black font-oswald uppercase tracking-tighter text-white">VIP EXPERIENCE</h1>
          <p className="text-prism font-bold tracking-[0.3em] uppercase text-xs mt-4">Elevate your style with a personalized session</p>
        </div>
      </section>

      <section className="py-24 container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Info Side */}
          <div className="space-y-12">
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Concierge Services</h2>
              <h3 className="text-5xl font-black font-oswald uppercase tracking-tight leading-tight mb-8">
                EXCLUSIVE <br /> ACCESS.
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Experience PRISM STYLES beyond the screen. Our personal styling and showroom sessions are designed for those who value architectural precision and bespoke service.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { title: 'Personal Styling', desc: '1-on-1 session to curate your seasonal wardrobe with our lead stylists.' },
                { title: 'Showroom Preview', desc: 'Early access to unreleased drops and limited-edition archive pieces.' },
                { title: 'Custom Fitting', desc: 'Technical tailoring and custom measurements for our high-end outerwear.' }
              ].map((service, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center shrink-0 group-hover:bg-prism group-hover:text-white transition-all">
                    <span className="font-black text-xs">0{i+1}</span>
                  </div>
                  <div>
                    <h4 className="font-black uppercase text-sm tracking-tight mb-2">{service.title}</h4>
                    <p className="text-gray-500 text-sm">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-zinc-50 p-8 border border-zinc-100 italic text-gray-500 text-sm">
              "The personal styling session changed my approach to urban fashion. The structural advice was priceless."
              <p className="mt-4 font-black uppercase not-italic text-black text-[10px] tracking-widest">— David R., London</p>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white p-10 md:p-16 shadow-2xl border border-zinc-100">
            <h3 className="text-xs font-black uppercase tracking-widest mb-10 pb-4 border-b">Request Your Session</h3>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" />
                    <input 
                      required
                      type="text" 
                      className="w-full border-b border-zinc-200 py-3 pl-8 focus:border-black outline-none transition-all text-sm font-medium"
                      placeholder="Alexander West"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" />
                    <input 
                      required
                      type="email" 
                      className="w-full border-b border-zinc-200 py-3 pl-8 focus:border-black outline-none transition-all text-sm font-medium"
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" />
                    <input 
                      required
                      type="tel" 
                      className="w-full border-b border-zinc-200 py-3 pl-8 focus:border-black outline-none transition-all text-sm font-medium"
                      placeholder="+44 20 7123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Service Selection</label>
                  <select 
                    className="w-full border-b border-zinc-200 py-3 focus:border-black outline-none transition-all text-sm font-medium bg-transparent"
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                  >
                    <option>Personal Styling</option>
                    <option>Showroom Preview</option>
                    <option>Custom Fitting</option>
                    <option>Wholesale Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Preferred Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" />
                    <input 
                      required
                      type="date" 
                      className="w-full border-b border-zinc-200 py-3 pl-8 focus:border-black outline-none transition-all text-sm font-medium"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Preferred Time</label>
                  <div className="relative">
                    <Clock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" />
                    <input 
                      required
                      type="time" 
                      className="w-full border-b border-zinc-200 py-3 pl-8 focus:border-black outline-none transition-all text-sm font-medium"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Additional Notes</label>
                <div className="relative">
                  <MessageSquare className="absolute left-0 top-3 w-4 h-4 text-zinc-300" />
                  <textarea 
                    rows={4}
                    className="w-full border-b border-zinc-200 py-3 pl-8 focus:border-black outline-none transition-all text-sm font-medium resize-none"
                    placeholder="Specific styles you're interested in, size requirements, etc."
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-6 text-xs font-black uppercase tracking-[0.3em] flex items-center justify-center hover:bg-zinc-800 transition-all disabled:opacity-50 shadow-xl"
              >
                {isSubmitting ? 'Submitting Request...' : <><Send className="w-4 h-4 mr-3" /> Confirm Session Request</>}
              </button>
              <p className="text-center text-[8px] font-bold text-gray-400 uppercase tracking-widest">
                Our concierge will confirm your request via email or phone within 24 hours.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
