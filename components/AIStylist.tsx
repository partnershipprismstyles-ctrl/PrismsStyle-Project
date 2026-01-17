
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Bot, Image as ImageIcon, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useStore } from '../store/StoreContext';

const AIStylist: React.FC = () => {
  const { products, settings, activeStylistProduct, setActiveStylistProduct } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', content: string, image?: string }[]>([
    { role: 'bot', content: 'Welcome to the PRISM Circle. I am your Visionary Stylist. I specialize in architectural silhouettes and high-performance aesthetics. How shall we redefine your uniform today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, isGeneratingImage]);

  useEffect(() => {
    if (activeStylistProduct) {
      setIsOpen(true);
      const initialMessage = `I want to build a directional look around the ${activeStylistProduct.name}. Can you suggest a high-fashion architectural outfit?`;
      handleSendMessage(null, initialMessage);
      setActiveStylistProduct(null);
    }
  }, [activeStylistProduct]);

  const handleSendMessage = async (e: React.FormEvent | null, forcedInput?: string) => {
    if (e) e.preventDefault();
    const userMessage = forcedInput || input;
    if (!userMessage.trim() || isLoading) return;

    if (!forcedInput) setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const productContext = products.map(p => `${p.name} ($${p.price}) - ${p.category}: ${p.description}`).join('\n');
      
      const systemInstruction = `
        You are "PRISM Visionary", a world-class Senior Fashion Brand Strategist for ${settings.brandName}.
        Voice: Sophisticated, architectural, avant-garde. You focus on silhouettes, fabric weights (GSM), and modular utility.
        Goal: Provide expert advice using only the current collection. 
        
        CRITICAL: Whenever you suggest an outfit or a visual concept, you MUST end your message with exactly one instance of "[GENERATE_IMAGE: <detailed_description>]".
        The prompt should be a high-fashion, cinematic editorial photography prompt. 
        Example: "A model in a brutalist concrete setting wearing a technical shell parka and oversized charcoal knitwear, sharp focus, volumetric lighting, 8k resolution."
        
        Current Inventory:
        ${productContext}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction,
          temperature: 0.8,
        }
      });

      let botResponse = response.text || "Our visionary link is temporarily disconnected.";
      let imageToGeneratePrompt = "";

      const imageMatch = botResponse.match(/\[GENERATE_IMAGE: (.*?)\]/);
      if (imageMatch) {
        imageToGeneratePrompt = imageMatch[1];
        botResponse = botResponse.replace(imageMatch[0], "").trim();
      }

      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
      setIsLoading(false);

      if (imageToGeneratePrompt) {
        await generateStyleImage(imageToGeneratePrompt);
      }

    } catch (error) {
      console.error("AI Stylist Error:", error);
      setMessages(prev => [...prev, { role: 'bot', content: "Visionary systems are cycling. Please re-engage in a moment." }]);
      setIsLoading(false);
    }
  };

  const generateStyleImage = async (prompt: string) => {
    setIsGeneratingImage(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: `High-fashion luxury lookbook photography. Minimalist architectural setting. ${prompt}. Cinematic lighting, neutral color palette, ultra-high resolution.` }]
        },
        config: {
          imageConfig: {
            aspectRatio: "3:4"
          }
        }
      });

      let imageUrl = "";
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }

      if (imageUrl) {
        setMessages(prev => [...prev, { 
          role: 'bot', 
          content: "Visualizing the concept lookbook:", 
          image: imageUrl 
        }]);
      }
    } catch (error) {
      console.error("Lookbook Generation Error:", error);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] font-inter">
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative w-16 h-16 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-500 overflow-hidden"
        >
          <div className="absolute inset-0 bg-prism opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <Sparkles className="relative z-10 w-6 h-6 animate-pulse" />
        </button>
      )}

      {isOpen && (
        <div className="w-[350px] md:w-[450px] h-[650px] bg-white border border-zinc-200 shadow-2xl rounded-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
          <div className="bg-black p-6 text-white flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-prism flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest">PRISM Visionary</h3>
                <div className="flex items-center text-[8px] text-zinc-400 uppercase tracking-widest mt-0.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></span>
                  Active Strategy
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-prism transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-zinc-50/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                    ? 'bg-black text-white rounded-tr-none shadow-md' 
                    : 'bg-white border border-zinc-100 text-zinc-700 shadow-sm rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                  {msg.image && (
                    <div className="mt-3 w-full rounded-xl overflow-hidden shadow-xl border border-white animate-in zoom-in-95 duration-700">
                      <img src={msg.image} alt="AI Generated Look" className="w-full h-auto" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {(isLoading || isGeneratingImage) && (
              <div className="flex justify-start items-center space-x-3">
                <div className="bg-white border border-zinc-100 p-4 rounded-2xl rounded-tl-none flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-zinc-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    {isGeneratingImage ? "Visualizing Silhouettes..." : "Architecting..."}
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={(e) => handleSendMessage(e)} className="p-6 border-t border-zinc-100 bg-white">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Style an architectural look for Berlin winter..."
                className="w-full bg-zinc-100 border-none rounded-xl py-4 pl-4 pr-12 text-sm focus:ring-2 focus:ring-black transition-all outline-none"
              />
              <button 
                type="submit"
                disabled={isLoading || isGeneratingImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center hover:bg-prism transition-all disabled:opacity-30"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIStylist;
