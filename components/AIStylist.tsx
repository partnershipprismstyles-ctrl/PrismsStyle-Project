
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Bot } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useStore } from '../store/StoreContext';

const AIStylist: React.FC = () => {
  const { products, settings } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', content: string }[]>([
    { role: 'bot', content: 'Welcome to the PRISM Circle. I am your personal AI Stylist. How can I help you refine your aesthetic today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      // Provide context about the brand and products
      const productContext = products.map(p => `${p.name} ($${p.price}) - ${p.category}: ${p.description}`).join('\n');
      
      const systemInstruction = `
        You are the "Prism AI Stylist" for the high-end fashion brand ${settings.brandName}.
        Your personality: Professional, avant-garde, helpful, and sophisticated.
        Your goal: Help customers find the perfect outfits and explain the architectural philosophy of the brand.
        
        Current Inventory:
        ${productContext}
        
        Guidelines:
        - Suggest specific products from the inventory above when relevant.
        - Talk about structural minimalism, urban utility, and the "Prism aesthetic".
        - Keep responses concise but stylish.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const botResponse = response.text || "I apologize, the connection to the Prism network is currently interrupted. Please try again in a moment.";
      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages(prev => [...prev, { role: 'bot', content: "Our AI systems are currently under maintenance. Please check back shortly for your personalized style consultation." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] font-inter">
      {/* Floating Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative w-16 h-16 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-500 overflow-hidden"
        >
          <div className="absolute inset-0 bg-prism opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <Sparkles className="relative z-10 w-6 h-6 animate-pulse" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[350px] md:w-[400px] h-[600px] bg-white border border-zinc-200 shadow-2xl rounded-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
          {/* Header */}
          <div className="bg-black p-6 text-white flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-prism flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest">AI Stylist</h3>
                <div className="flex items-center text-[8px] text-zinc-400 uppercase tracking-widest mt-0.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></span>
                  Active
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-prism transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-zinc-50/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                  ? 'bg-black text-white rounded-tr-none' 
                  : 'bg-white border border-zinc-100 text-zinc-700 shadow-sm rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-zinc-100 p-4 rounded-2xl rounded-tl-none flex space-x-1.5">
                  <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-6 border-t border-zinc-100 bg-white">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask for style advice..."
                className="w-full bg-zinc-100 border-none rounded-xl py-4 pl-4 pr-12 text-sm focus:ring-2 focus:ring-black transition-all outline-none"
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center hover:bg-prism transition-all disabled:opacity-30"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[9px] text-zinc-400 text-center mt-4 font-bold uppercase tracking-widest">
              Powered by Prism Intelligence Engine
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIStylist;
