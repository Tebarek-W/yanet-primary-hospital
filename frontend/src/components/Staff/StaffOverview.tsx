import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, FileText, UserCheck, Plus } from 'lucide-react';

interface StaffOverviewProps {
  doctorName: string;
  messagesCount: number;
  blogsCount: number;
  setActiveTab: (tab: any) => void;
  darkMode: boolean;
}

export const StaffOverview: React.FC<StaffOverviewProps> = ({
  doctorName,
  messagesCount,
  blogsCount,
  setActiveTab,
  darkMode
}) => {
  const getGreeting = () => {
    const hrs = new Date().getHours();
    if (hrs < 12) return 'Good morning';
    if (hrs < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const stats = [
    {
      title: 'Active Messages',
      value: messagesCount > 0 ? messagesCount.toString() : '0',
      sub: 'Real-time patient chat',
      icon: MessageSquare,
      color: 'from-teal-500 to-emerald-500',
      action: () => setActiveTab('messages')
    },
    {
      title: 'Published Blogs',
      value: blogsCount.toString(),
      sub: 'Articles published by you',
      icon: FileText,
      color: 'from-primary to-indigo-500',
      action: () => setActiveTab('blogs')
    }
  ];

  return (
    <div className="flex flex-col gap-5 flex-1">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 lg:p-7 rounded-3xl relative overflow-hidden text-left shadow-sm ${
          darkMode 
            ? 'bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800' 
            : 'bg-gradient-to-r from-primary/10 via-primary/5 to-primary/20 border border-primary/10'
        }`}
      >
        <div className="relative z-10 max-w-xl">
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary font-poppins">Clinical Command Center</span>
          <h2 className={`text-xl md:text-2xl font-bold font-poppins mt-1.5 ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            {getGreeting()}, {doctorName}!
          </h2>
          <p className={`text-xs md:text-sm mt-2 leading-relaxed ${
            darkMode ? 'text-slate-400' : 'text-slate-650'
          }`}>
            Welcome to your clean clinical workspace. You can author articles to educate our patient community or answer secure patient messages in real-time.
          </p>
        </div>
        <div className="absolute top-1/2 right-10 transform -translate-y-1/2 opacity-5 md:opacity-10 pointer-events-none select-none">
          <UserCheck className="w-40 h-40 text-primary" />
        </div>
      </motion.div>

      {/* Stats Cards - Sleek 2 column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.button
              key={stat.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={stat.action}
              className={`p-6 rounded-2xl border text-left flex items-start justify-between transition-all hover:shadow-md ${
                darkMode 
                  ? 'bg-slate-900 border-slate-800 hover:border-slate-700' 
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <span className="text-[10px] font-bold text-slate-405 uppercase tracking-wider">{stat.title}</span>
                <h3 className={`text-3xl font-bold font-poppins mt-2.5 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {stat.value}
                </h3>
                <p className="text-[10.5px] text-slate-500 mt-1 font-semibold">{stat.sub}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${stat.color} flex items-center justify-center text-white shrink-0 shadow-md`}>
                <Icon className="w-6 h-6" />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Action cards & widgets grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Workspace Operations Quick Actions */}
        <div className={`p-6 rounded-2xl border text-left lg:col-span-2 ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <h3 className={`text-xs font-bold font-poppins uppercase tracking-wider mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Workspace Operations
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              onClick={() => setActiveTab('blogs')}
              className="flex flex-col justify-between p-5 rounded-xl bg-primary hover:bg-primary-hover text-white text-left transition-all shadow-md group h-36"
            >
              <FileText className="w-8 h-8 group-hover:scale-110 transition-transform" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">Health Articles</span>
                <h4 className="text-sm font-bold mt-1 font-poppins">Write New Blog</h4>
              </div>
            </button>
            <button 
              onClick={() => setActiveTab('messages')}
              className={`flex flex-col justify-between p-5 rounded-xl border text-left transition-all group h-36 ${
                darkMode ? 'bg-slate-950/40 border-slate-800 hover:border-slate-750 text-white' : 'bg-slate-50 border-slate-200 hover:border-slate-305 text-slate-800'
              }`}
            >
              <MessageSquare className="w-8 h-8 text-slate-400 group-hover:scale-110 transition-transform" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Inbox Channels</span>
                <h4 className={`text-sm font-bold mt-1 font-poppins ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Patient Messages
                </h4>
              </div>
            </button>
          </div>
        </div>

        {/* Tip of the Day - Clean Widget */}
        <div className={`p-6 rounded-2xl border text-left flex flex-col justify-between relative overflow-hidden ${
          darkMode ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-slate-800' : 'bg-gradient-to-b from-white to-slate-50 border-slate-200'
        }`}>
          <div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-teal-400 font-poppins">Clinical Tip</span>
            <p className={`text-xs mt-3 leading-relaxed italic ${darkMode ? 'text-slate-400' : 'text-slate-650'}`}>
              "When authoring medical blogs, use simple vocabulary. Breaking down diagnostic pathways into layperson terminology increases patient health literacy indices by 40%."
            </p>
          </div>
          <div className="mt-4 flex justify-end border-t border-slate-800/40 pt-3 shrink-0">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Dr. Tebarek L. (Chief Cardiologist)</span>
          </div>
        </div>

      </div>
    </div>
  );
};
