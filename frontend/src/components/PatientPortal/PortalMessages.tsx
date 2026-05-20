import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare, ShieldAlert, Video } from 'lucide-react';

interface Message {
  id: string;
  sender: 'patient' | 'doctor';
  text: string;
  time: string;
}

interface Doctor {
  name: string;
  specialty: string;
  avatar: string;
  chatHistory: Message[];
}

interface PortalMessagesProps {
  doctors: Doctor[];
  selectedDoctorIndex: number;
  setSelectedDoctorIndex: (idx: number) => void;
  chatInput: string;
  setChatInput: (input: string) => void;
  handleSendMessage: (e: React.FormEvent) => void;
  darkMode: boolean;
}

export const PortalMessages: React.FC<PortalMessagesProps> = ({
  doctors,
  selectedDoctorIndex,
  setSelectedDoctorIndex,
  chatInput,
  setChatInput,
  handleSendMessage,
  darkMode
}) => {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const currentDoc = doctors[selectedDoctorIndex] || doctors[0];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentDoc?.chatHistory]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`border rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.25)] flex flex-col md:flex-row h-[calc(100vh-190px)] min-h-[450px] overflow-hidden text-left font-roboto transition-all duration-300 ${
        darkMode 
          ? 'bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800' 
          : 'bg-gradient-to-br from-white to-slate-50/50 border-slate-200'
      }`}
    >
      {/* Left Pane: Clinical Provider Directory */}
      <div className={`w-full md:w-64 border-r flex flex-col shrink-0 ${
        darkMode ? 'border-slate-800' : 'border-slate-200'
      }`}>
        <div className={`p-4.5 border-b text-left flex items-center gap-2 ${
          darkMode ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-50/80 border-slate-200'
        }`}>
          <MessageSquare className="w-4 h-4 text-primary shrink-0" />
          <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-poppins">
            Clinical Care Team
          </h3>
        </div>
        
        <div className={`flex-grow overflow-y-auto divide-y ${
          darkMode ? 'divide-slate-800 bg-slate-950/10' : 'divide-slate-100 bg-white/40'
        }`}>
          {doctors.map((doc, idx) => {
            const lastMsg = doc.chatHistory[doc.chatHistory.length - 1];
            const isSelected = selectedDoctorIndex === idx;
            return (
              <div 
                key={idx} 
                onClick={() => setSelectedDoctorIndex(idx)}
                className={`p-4 transition-all cursor-pointer flex gap-3 items-center border-l-[4px] ${
                  isSelected 
                    ? darkMode
                      ? 'bg-primary/10 border-l-primary' 
                      : 'bg-primary/5 border-l-primary' 
                    : darkMode 
                    ? 'border-l-transparent hover:bg-slate-900/60' 
                    : 'border-l-transparent hover:bg-slate-50/60'
                }`}
              >
                <div className="relative shrink-0">
                  <img 
                    src={doc.avatar} 
                    alt={doc.name} 
                    className={`w-9 h-9 rounded-full object-cover border ${
                      darkMode ? 'border-slate-800' : 'border-slate-200'
                    } shadow-sm`} 
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 shadow-[0_0_4px_rgba(16,185,129,0.6)]" />
                </div>
                <div className="overflow-hidden flex-grow text-left">
                  <h4 className={`text-xs font-bold font-poppins truncate ${
                    isSelected ? 'text-primary' : darkMode ? 'text-white' : 'text-slate-800'
                  }`}>
                    {doc.name}
                  </h4>
                  <p className="text-[9px] text-slate-400 font-semibold mt-0.5">{doc.specialty}</p>
                  <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-1 truncate font-normal">
                    {lastMsg ? lastMsg.text : 'Direct secure channel'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Pane: Telehealth Secure Channel Chat */}
      <div className={`flex-grow flex flex-col overflow-hidden h-full ${
        darkMode ? 'bg-slate-950/20' : 'bg-slate-50/10'
      }`}>
        {/* Physician Header */}
        <div className={`p-4 border-b flex items-center justify-between gap-3 ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <img 
                src={currentDoc?.avatar} 
                alt={currentDoc?.name} 
                className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-800" 
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
            </div>
            <div className="text-left">
              <h4 className={`text-xs font-bold font-poppins ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                {currentDoc?.name}
              </h4>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_4px_rgba(16,185,129,0.6)]" />
                <span className="text-[9px] font-bold text-slate-400 tracking-wide uppercase font-poppins">
                  {currentDoc?.specialty} Specialist • Secure Direct Inbox
                </span>
              </div>
            </div>
          </div>

          <button 
            type="button"
            onClick={() => alert(`Initializing secure video consultation with ${currentDoc?.name}... Establishing Yanet WebRTC media bridge...`)}
            className="px-3 py-1.5 sm:px-3.5 sm:py-2 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl transition-all duration-300 shadow-[0_4px_12px_rgba(0,184,184,0.15)] hover:shadow-[0_4px_18px_rgba(0,184,184,0.35)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] text-[10px] uppercase tracking-wider shrink-0 flex items-center gap-1.5"
          >
            <Video className="w-4 h-4" /> Call Doctor
          </button>
        </div>

        {/* Messaging Logs */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          
          {/* Clinical Security Notice Banner */}
          <div className={`p-3.5 rounded-xl flex items-start gap-2.5 text-xs border ${
            darkMode 
              ? 'bg-amber-950/10 border-amber-900/20 text-slate-400' 
              : 'bg-amber-50/40 border-amber-100/50 text-slate-600'
          }`}>
            <ShieldAlert className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="text-[10px] leading-relaxed">
              This direct channel is for non-emergent medical inquiries. For urgent emergencies, please call 911 or proceed immediately to the nearest hospital Emergency Room.
            </p>
          </div>

          {currentDoc?.chatHistory.map((msg) => {
            const isPatient = msg.sender === 'patient';
            return (
              <div 
                key={msg.id} 
                className={`flex ${isPatient ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] rounded-2xl p-4 text-xs transition-all duration-200 ${
                  isPatient 
                    ? 'bg-gradient-to-r from-primary to-primary/95 text-white rounded-br-none shadow-[0_4px_15px_rgba(0,184,184,0.15)]' 
                    : darkMode 
                    ? 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-bl-none shadow-sm' 
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-[0_4px_15px_rgba(0,0,0,0.015)]'
                } text-left`}>
                  <p className="leading-relaxed font-medium">{msg.text}</p>
                  <span className={`block text-[8.5px] text-right mt-1.5 font-semibold ${
                    isPatient ? 'text-white/80' : 'text-slate-400'
                  }`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>

        {/* Message Input Footer Form */}
        <form 
          onSubmit={handleSendMessage} 
          className={`p-4 border-t flex gap-3 ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <input 
            type="text"
            required
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder={`Send secure medical message to ${currentDoc?.name}...`}
            className={`flex-grow px-4 py-2.5 border rounded-xl outline-none transition-all duration-300 font-medium text-xs ${
              darkMode 
                ? 'bg-slate-950 border-slate-800 text-white focus:border-primary focus:ring-2 focus:ring-primary/20' 
                : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 shadow-inner'
            }`}
          />
          <button 
            type="submit"
            className="p-3 bg-primary hover:bg-primary/95 text-white rounded-xl transition-all duration-300 shadow-[0_4px_12px_rgba(0,184,184,0.2)] hover:shadow-[0_4px_18px_rgba(0,184,184,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.96] shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </motion.div>
  );
};
