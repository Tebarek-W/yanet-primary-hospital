import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SYSTEM_PROMPT = `
You are Yanet AI, the official medical assistant for Yanet Primary Hospital. 
Your goal is to provide helpful, empathetic, and professional assistance to patients and visitors.

Hospital Overview:
- Name: Yanet Primary Hospital
- Experience: Over 6 years of excellence.
- Services: Emergency (24/7), Cardiology, General Surgery, Laboratory, Pediatrics, Neurology, Ophthalmology, Maternity, and more.
- Location: Heart of Addis Ababa, Ethiopia.
- Contact: +251 11 123 4567
- Mission: To provide high-quality, compassionate healthcare services to our community.
- Values: Professionalism, Innovation, Patient-centered approach.

Guidelines:
1. Be empathetic and professional.
2. If asked about medical advice, always add a disclaimer that you are an AI and they should consult with a doctor at Yanet Primary Hospital for professional diagnosis.
3. Help users with booking appointments (redirect them to the 'Book Appointment' button).
4. Provide information about our specialist doctors and services.
5. You are bilingual. Respond in the language the user speaks (English or Amharic).
6. Keep responses concise but informative.
7. Use Markdown for better formatting (bolding, lists, etc.).
`;

const ChatBot: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Gemini
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
  const model = useMemo(() => {
    if (!genAI) return null;
    return genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
    });
  }, [genAI]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: t('chatbot.welcome'),
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, i18n.language, t]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    const currentInput = input.trim();
    if (!currentInput || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: currentInput,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    if (!model) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: "AI service is currently unavailable. Please check back later or contact us directly.",
            timestamp: new Date(),
          },
        ]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    try {
      // Gemini history MUST start with a 'user' message. 
      // Our welcome message is 'assistant' (model), so we should skip it in the API history.
      const history = messages
        .filter((m, i) => !(i === 0 && m.role === 'assistant'))
        .map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        }));

      // Prepend system prompt to the first user message if history is empty
      const prompt = history.length === 0 ? `${SYSTEM_PROMPT}\n\n${currentInput}` : currentInput;

      const chat = model.startChat({ history });
      
      const result = await chat.sendMessage(prompt);
      const response = await result.response;
      const text = response.text();

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: text,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I apologize, I'm having trouble connecting right now. Please try again or call our support.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[1001] flex flex-col items-end">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[320px] sm:w-[350px] h-[420px] max-h-[calc(100vh-140px)] bg-white/90 backdrop-blur-2xl rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-white/40 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-white/30 relative overflow-hidden shadow-inner">
                  <img src="/doctors/receptionist.png" alt="Yanet Assistant" className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-blue-600"></div>
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-wide">{t('chatbot.title')}</h3>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <p className="text-[10px] text-blue-100 opacity-90 uppercase tracking-tighter">{t('chatbot.status')}</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-blue-200">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex flex-col max-w-[85%]",
                    msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div className="flex items-center gap-2 mb-1 px-1">
                    {msg.role === 'assistant' ? (
                      <div className="w-4 h-4 rounded-full overflow-hidden border border-blue-200">
                        <img src="/doctors/receptionist.png" alt="Bot" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <User size={12} className="text-gray-500" />
                    )}
                    <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                      {msg.role === 'assistant' ? 'Yanet AI' : 'You'}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "p-3 rounded-2xl text-sm shadow-sm",
                      msg.role === 'user'
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-blue-50 text-blue-900 rounded-tl-none border border-blue-100"
                    )}
                  >
                    <div className="prose prose-sm prose-blue max-w-none prose-p:leading-relaxed prose-p:my-1 text-inherit">
                      <ReactMarkdown>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                  <span className="text-[9px] text-gray-400 mt-1 px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="flex flex-col items-start max-w-[85%]">
                   <div className="flex items-center gap-2 mb-1 px-1">
                    <div className="w-4 h-4 rounded-full overflow-hidden border border-blue-200">
                      <img src="/doctors/receptionist.png" alt="Bot" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Yanet AI</span>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-2xl rounded-tl-none border border-blue-100 shadow-sm flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-blue-500" />
                    <span className="text-sm text-blue-600 font-medium animate-pulse">{t('chatbot.thinking')}</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-100 bg-gray-50/50">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t('chatbot.placeholder')}
                  className="w-full pl-4 pr-12 py-3 bg-white border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm shadow-inner"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-all shadow-md active:scale-95"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-[10px] text-center text-gray-400 mt-2 flex items-center justify-center gap-1">
                Powered by <Sparkles size={10} className="text-blue-400" /> Gemini AI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB with Pulse Animation */}
      <div className="relative group flex flex-col items-center">
        {/* Hover Menu Options */}
        {!isOpen && (
          <div className="absolute bottom-full pb-4 flex flex-col gap-3 items-center opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 translate-y-4 group-hover:translate-y-0 z-[1002]">
            
            {/* Close Widget Button */}
            <button 
              onClick={(e) => { e.stopPropagation(); setIsVisible(false); }}
              className="w-8 h-8 rounded-full bg-gray-500/80 text-white flex items-center justify-center shadow-lg hover:bg-red-500 hover:scale-110 transition-all backdrop-blur-sm"
              title="Hide Assistant"
            >
              <X size={16} />
            </button>

            {/* Telegram */}
            <a href="https://t.me/YanetHospital" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#0088cc] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all" title="Telegram">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.98 1.26-5.61 3.71-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.06-.49-.83-.27-1.49-.41-1.43-.88.03-.24.36-.49 1-.76 3.91-1.7 6.52-2.82 7.82-3.36 3.73-1.56 4.51-1.83 5.01-1.84.11 0 .36.03.49.14.11.09.14.22.15.34-.01.07-.01.17-.02.31z"/>
              </svg>
            </a>
            
            {/* WhatsApp */}
            <a href="https://wa.me/251111234567" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all" title="WhatsApp">
               <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M12.031 21.018c-1.536 0-3.04-.413-4.363-1.196l-.312-.185-3.24.85.865-3.161-.203-.323a9.176 9.176 0 01-1.405-4.887C3.373 6.942 7.55 2.765 12.727 2.765c2.518 0 4.884.981 6.662 2.76 1.779 1.778 2.76 4.143 2.76 6.661 0 5.176-4.177 9.352-9.354 9.352h-.764zm-5.068-3.336l2.16-.566.273.162a7.352 7.352 0 003.636.963h.765c4.17 0 7.556-3.385 7.556-7.556 0-2.018-.785-3.915-2.213-5.342a7.556 7.556 0 00-5.343-2.214c-4.171 0-7.557 3.386-7.557 7.557 0 1.25.313 2.463.905 3.535l.18.324-.576 2.102z"/>
                  <path d="M16.485 14.117c-.247-.123-1.464-.723-1.691-.806-.226-.082-.392-.123-.556.124-.165.247-.64 .806-.784.97-.144.165-.288.186-.535.062-1.077-.525-2.091-1.155-2.883-2.012-.6-.65-.968-1.39-1.22-2.18-.082-.247-.02-.37.104-.493.102-.102.247-.288.37-.453.123-.165.165-.288.247-.494.082-.206.041-.391-.02-.514-.062-.123-.556-1.341-.762-1.835-.202-.483-.408-.417-.556-.425-.144-.008-.309-.01-.473-.01-.165 0-.432.062-.659.309-.227.247-.865.845-.865 2.06 0 1.215.885 2.389 1.01 2.554.123.165 1.74 2.656 4.215 3.725 1.488.643 2.502.822 3.36 1.037.935.234 1.787.202 2.457.12.748-.09 1.464-.597 1.67-1.173.206-.576.206-1.07.144-1.173-.062-.103-.226-.165-.473-.288z"/>
               </svg>
            </a>
          </div>
        )}

        {!isOpen && (
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-full bg-primary/40 -z-10"
          />
        )}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 relative overflow-hidden group",
            isOpen ? "bg-red-500 rotate-90" : "bg-primary shadow-primary/40 ring-4 ring-white/20"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          {isOpen ? (
            <X className="text-white relative z-10" size={24} />
          ) : (
            <div className="relative w-full h-full flex items-center justify-center p-0.5">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/50">
                <img src="/doctors/receptionist.png" alt="Yanet AI" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125" />
              </div>
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors"></div>
              {/* Notification dot */}
              <div className="absolute top-1 right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full"></div>
            </div>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default ChatBot;
