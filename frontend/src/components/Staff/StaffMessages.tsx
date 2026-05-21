import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Search, Shield, User, Clock, Phone, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  sender: 'patient' | 'doctor';
  text: string;
  time: string;
}

interface ChatChannel {
  id: string;
  patientName: string;
  age: number;
  avatar: string;
  symptoms: string;
  lastActive: string;
  unread: boolean;
  history: Message[];
}

interface StaffMessagesProps {
  channels: ChatChannel[];
  onSendMessage: (channelId: string, text: string) => void;
  darkMode: boolean;
}

export const StaffMessages: React.FC<StaffMessagesProps> = ({
  channels,
  onSendMessage,
  darkMode
}) => {
  const [activeChannelId, setActiveChannelId] = useState(channels[0]?.id || '');
  const [chatInput, setChatInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeChannel = channels.find(c => c.id === activeChannelId);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeChannel?.history, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !activeChannelId) return;

    onSendMessage(activeChannelId, chatInput.trim());
    setChatInput('');
  };

  const filteredChannels = channels.filter(chan =>
    chan.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chan.symptoms.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`rounded-2xl border flex overflow-hidden h-[calc(100vh-210px)] min-h-[500px] text-left ${
      darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
    }`}>
      
      {/* Chats Sidebar */}
      <div className={`w-80 shrink-0 border-r flex flex-col justify-between hidden md:flex ${
        darkMode ? 'border-slate-850' : 'border-slate-200'
      }`}>
        <div>
          {/* Sidebar Search */}
          <div className="p-4 border-b border-slate-850">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search messages..."
                className={`w-full border rounded-xl pl-9 pr-4 py-2.5 text-[11px] font-semibold focus:outline-none focus:border-primary ${
                  darkMode ? 'bg-slate-950/40 border-slate-800 text-white placeholder-slate-550' : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400'
                }`}
              />
            </div>
          </div>

          {/* Active channels list */}
          <div className="overflow-y-auto divide-y divide-slate-850 max-h-[calc(100vh-320px)]">
            {filteredChannels.length === 0 ? (
              <div className="p-5 text-center text-slate-500 text-[11px] font-semibold">
                No active clinical messages
              </div>
            ) : (
              filteredChannels.map((channel) => {
                const isActive = channel.id === activeChannelId;
                const lastMsg = channel.history[channel.history.length - 1];

                return (
                  <button
                    key={channel.id}
                    onClick={() => setActiveChannelId(channel.id)}
                    className={`w-full p-4 flex items-start gap-3 transition-colors text-left relative ${
                      isActive 
                        ? darkMode ? 'bg-slate-950/50' : 'bg-slate-50'
                        : darkMode ? 'hover:bg-slate-950/20' : 'hover:bg-slate-50/50'
                    }`}
                  >
                    {/* Left Active indicator */}
                    {channel.unread && (
                      <span className="absolute top-1/2 left-1.5 transform -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
                    )}

                    <img
                      src={channel.avatar}
                      alt={channel.patientName}
                      className="w-10 h-10 rounded-full object-cover border border-slate-800/50 shrink-0"
                    />

                    <div className="flex-grow overflow-hidden">
                      <div className="flex justify-between items-start gap-1">
                        <h4 className={`text-xs font-bold truncate ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                          {channel.patientName}
                        </h4>
                        <span className="text-[8px] text-slate-500 font-semibold shrink-0">{channel.lastActive}</span>
                      </div>
                      <p className="text-[10px] text-primary font-semibold truncate mt-0.5">{channel.symptoms}</p>
                      <p className={`text-[10.5px] mt-1.5 truncate leading-relaxed ${
                        channel.unread ? 'font-bold text-white' : 'text-slate-505 font-medium'
                      }`}>
                        {lastMsg ? lastMsg.text : 'No history'}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Security verification notice */}
        <div className={`p-4 border-t flex items-start gap-2.5 ${darkMode ? 'border-slate-850 bg-slate-950/30' : 'border-slate-200 bg-slate-50'}`}>
          <Shield className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
          <p className="text-[9px] text-slate-500 leading-relaxed font-semibold">
            Point-to-point encryption verified. Telehealth logs are archived under HIPAA healthcare parameters.
          </p>
        </div>
      </div>

      {/* Message Chat Room Pane */}
      {activeChannel ? (
        <div className={`flex-1 flex flex-col justify-between h-full ${darkMode ? 'bg-slate-950/10' : 'bg-slate-50/50'}`}>
          
          {/* Chat room Header */}
          <div className={`p-4 border-b flex justify-between items-center shrink-0 ${
            darkMode ? 'bg-slate-900 border-slate-850' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center gap-3">
              <img
                src={activeChannel.avatar}
                alt={activeChannel.patientName}
                className="w-10 h-10 rounded-full object-cover border border-slate-800/80"
              />
              <div>
                <h4 className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {activeChannel.patientName}
                </h4>
                <p className="text-[9.5px] text-slate-450 font-semibold mt-0.5">
                  Age: {activeChannel.age} | Diagnosis: <span className="text-primary font-bold">"{activeChannel.symptoms}"</span>
                </p>
              </div>
            </div>

            {/* Quick Actions (Call/Profile) */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:flex items-center gap-1.5 text-[9px] font-bold text-teal-400 bg-teal-400/10 border border-teal-400/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse" />
                <span>Patient Online</span>
              </span>
              <button className={`p-2 rounded-lg border hidden sm:block ${
                darkMode ? 'border-slate-800 hover:bg-slate-800 text-slate-400' : 'border-slate-200 hover:bg-slate-50 text-slate-550'
              }`}>
                <Phone className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat scroll pane */}
          <div 
            ref={scrollRef}
            className="flex-1 p-5 overflow-y-auto space-y-4 max-h-[calc(100vh-380px)]"
          >
            {activeChannel.history.map((msg) => {
              const isDoctor = msg.sender === 'doctor';
              return (
                <div 
                  key={msg.id}
                  className={`flex ${isDoctor ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] p-3.5 rounded-2xl flex flex-col text-left relative ${
                    isDoctor
                      ? 'bg-primary text-white rounded-tr-none'
                      : darkMode
                      ? 'bg-slate-900 text-slate-100 border border-slate-800 rounded-tl-none'
                      : 'bg-white text-slate-850 border border-slate-200 rounded-tl-none'
                  }`}>
                    <p className="text-xs font-semibold leading-relaxed leading-normal">{msg.text}</p>
                    <span className={`text-[8.5px] font-semibold mt-1.5 self-end ${
                      isDoctor ? 'text-white/60' : 'text-slate-500'
                    }`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Simulated Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className={`p-3.5 rounded-2xl border flex items-center gap-1 rounded-tl-none ${
                  darkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
                }`}>
                  <span className="text-[10px] font-semibold">Patient is typing</span>
                  <span className="flex gap-1 items-center justify-center">
                    <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-75" />
                    <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-150" />
                    <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-300" />
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Form input bar */}
          <form 
            onSubmit={handleSend}
            className={`p-4 border-t flex gap-3.5 items-center shrink-0 ${
              darkMode ? 'bg-slate-900 border-slate-850' : 'bg-white border-slate-200'
            }`}
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type secure medical advice or instructions..."
              className={`flex-grow border rounded-xl px-4 py-3.5 text-xs font-semibold focus:outline-none focus:border-primary ${
                darkMode ? 'bg-slate-950/60 border-slate-800 text-white placeholder-slate-550' : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400'
              }`}
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary-hover text-white p-3.5 rounded-xl transition-all shadow-md shrink-0 flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      ) : (
        <div className={`flex-1 flex flex-col items-center justify-center p-10 text-center ${darkMode ? '' : 'bg-slate-50/50'}`}>
          <AlertCircle className="w-12 h-12 text-slate-500 mb-3" />
          <h4 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>No Message Channel Selected</h4>
          <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Select a patient card to begin secure messaging.</p>
        </div>
      )}

    </div>
  );
};
