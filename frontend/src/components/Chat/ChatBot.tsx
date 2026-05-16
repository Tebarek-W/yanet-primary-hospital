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
      <div className="relative">
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
