
import React, { useState } from 'react';
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight, CheckCircle2, CreditCard } from 'lucide-react';
import { useStore } from '../store/StoreContext';

const Cart: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { cart, removeFromCart, updateCartQuantity, clearCart, addOrder } = useStore();
  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmation'>('cart');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    card: ''
  });

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 300 ? 0 : 25;
  const total = subtotal + shipping;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderId = `ORD-${Math.floor(Math.random() * 9000) + 1000}`;
    const orderDetails = {
      orderId,
      customer: formData,
      items: cart.map(item => ({
        name: item.name,
        size: item.selectedSize,
        color: item.selectedColor,
        qty: item.quantity,
        price: item.price
      })),
      subtotal,
      shipping,
      total,
      _subject: `New Order Received - ${orderId}`
    };

    try {
      await fetch('https://formspree.io/f/mojjvrgb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderDetails)
      });

      const newOrder = {
        id: orderId,
        date: new Date().toISOString(),
        items: [...cart],
        total: total,
        status: 'Pending' as const,
        customerName: formData.name,
        email: formData.email
      };
      
      addOrder(newOrder);
      setStep('confirmation');
      clearCart();
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an issue processing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 'confirmation') {
    return (
      <div className="container mx-auto px-4 py-32 text-center animate-in zoom-in-95 duration-500">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full mb-8">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h1 className="text-5xl font-black font-oswald uppercase tracking-tight mb-4">THANK YOU</h1>
        <p className="text-gray-500 text-lg mb-12 max-w-md mx-auto">Your order has been placed successfully. You will receive a confirmation email shortly.</p>
        <button 
          onClick={() => onNavigate('home')}
          className="bg-black text-white px-10 py-5 text-sm font-black uppercase tracking-widest hover:bg-zinc-800 transition-all"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-24">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Main Section */}
        <div className="flex-grow">
          {step === 'cart' ? (
            <>
              <div className="flex justify-between items-end mb-12">
                <h1 className="text-5xl font-black font-oswald uppercase tracking-tight">SHOPPING BAG</h1>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">({cart.length} items)</p>
              </div>

              {cart.length > 0 ? (
                <div className="space-y-10">
                  {cart.map((item) => {
                    const uniqueId = `${item.id}-${item.selectedSize}-${item.selectedColor}`;
                    return (
                      <div key={uniqueId} className="flex gap-6 pb-10 border-b border-gray-100 group">
                        <div className="w-24 h-32 bg-zinc-50 overflow-hidden cursor-pointer" onClick={() => onNavigate('product')}>
                          <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <div className="flex-grow flex flex-col justify-between">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-bold uppercase text-sm tracking-tight mb-1">{item.name}</h3>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">
                                {item.category} • {item.selectedSize} • {item.selectedColor}
                              </p>
                            </div>
                            <span className="font-black font-oswald text-lg">${item.price * item.quantity}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center border border-gray-200">
                              <button 
                                onClick={() => updateCartQuantity(uniqueId, item.quantity - 1)}
                                className="p-2 hover:bg-gray-50 transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-10 text-center text-xs font-bold">{item.quantity}</span>
                              <button 
                                onClick={() => updateCartQuantity(uniqueId, item.quantity + 1)}
                                className="p-2 hover:bg-gray-50 transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <button 
                              onClick={() => removeFromCart(uniqueId)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-20 text-center bg-zinc-50 border border-dashed border-gray-200">
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-8">Your bag is currently empty.</p>
                  <button 
                    onClick={() => onNavigate('shop')}
                    className="bg-black text-white px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-zinc-800"
                  >
                    Start Shopping
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="animate-in slide-in-from-left duration-500">
              <button 
                onClick={() => setStep('cart')}
                className="flex items-center text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black mb-8 transition-colors"
              >
                <ArrowLeft className="w-3 h-3 mr-2" /> Back to Bag
              </button>
              <h1 className="text-5xl font-black font-oswald uppercase tracking-tight mb-12">CHECKOUT</h1>
              
              <form id="checkout-form" onSubmit={handleCheckout} className="space-y-8 max-w-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Full Name</label>
                    <input 
                      required
                      type="text" 
                      className="w-full border-b border-gray-300 py-3 focus:border-black outline-none transition-colors text-sm"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email Address</label>
                    <input 
                      required
                      type="email" 
                      className="w-full border-b border-gray-300 py-3 focus:border-black outline-none transition-colors text-sm"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Shipping Address</label>
                  <input 
                    required
                    type="text" 
                    className="w-full border-b border-gray-300 py-3 focus:border-black outline-none transition-colors text-sm"
                    placeholder="123 Prism Street"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">City</label>
                    <input 
                      required
                      type="text" 
                      className="w-full border-b border-gray-300 py-3 focus:border-black outline-none transition-colors text-sm"
                      placeholder="London"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Card Info (Demo)</label>
                    <div className="relative">
                      <CreditCard className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        required
                        type="text" 
                        className="w-full border-b border-gray-300 py-3 pl-8 focus:border-black outline-none transition-colors text-sm"
                        placeholder="XXXX XXXX XXXX XXXX"
                        value={formData.card}
                        onChange={(e) => setFormData({...formData, card: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Sidebar / Summary */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="bg-zinc-50 p-8 sticky top-32 border border-zinc-100">
            <h3 className="text-xs font-black uppercase tracking-widest mb-8">Order Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-medium">Subtotal</span>
                <span className="font-bold">${subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-medium">Shipping</span>
                <span className="font-bold">{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-medium">Estimated Tax</span>
                <span className="font-bold">Included</span>
              </div>
              <div className="h-[1px] bg-gray-200 my-4"></div>
              <div className="flex justify-between items-end">
                <span className="text-xs font-black uppercase tracking-widest">Total</span>
                <span className="text-2xl font-black font-oswald text-prism">${total}</span>
              </div>
            </div>

            {step === 'cart' ? (
              <button 
                onClick={() => setStep('checkout')}
                disabled={cart.length === 0}
                className="w-full bg-black text-white py-5 text-sm font-black uppercase tracking-widest flex items-center justify-center hover:bg-zinc-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Checkout <ArrowRight className="ml-3 w-4 h-4" />
              </button>
            ) : (
              <button 
                form="checkout-form"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-prism text-white py-5 text-sm font-black uppercase tracking-widest flex items-center justify-center hover:opacity-90 transition-all shadow-xl shadow-prism/20 disabled:opacity-50"
              >
                {isSubmitting ? 'Processing...' : 'Place Order'} <CheckCircle2 className="ml-3 w-4 h-4" />
              </button>
            )}

            <div className="mt-8 space-y-4">
              <div className="flex items-center space-x-3 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">🔒</div>
                <span>Secure SSL Payment</span>
              </div>
              <div className="flex items-center space-x-3 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">↩</div>
                <span>14-Day Free Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
