import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Menu, ChevronDown, LogOut, Shield, Sun, Moon } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface StaffHeaderProps {
  activeTab: string;
  setMobileMenuOpen: (open: boolean) => void;
  notifications: Notification[];
  notificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
  markAllNotificationsRead: () => void;
  profileDropdownOpen: boolean;
  setProfileDropdownOpen: (open: boolean) => void;
  doctorName: string;
  doctorEmail: string;
  doctorAvatar: string;
  logout: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const StaffHeader: React.FC<StaffHeaderProps> = ({
  activeTab,
  setMobileMenuOpen,
  notifications,
  notificationsOpen,
  setNotificationsOpen,
  markAllNotificationsRead,
  profileDropdownOpen,
  setProfileDropdownOpen,
  doctorName,
  doctorEmail,
  doctorAvatar,
  logout,
  darkMode,
  setDarkMode
}) => {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'overview': return 'Workspace Overview';
      case 'blogs': return 'Manage Health Blogs';
      case 'messages': return 'Secure Messages';
      default: return 'Staff Dashboard';
    }
  };

  return (
    <header className={`h-16 shrink-0 flex items-center justify-between px-4 sm:px-8 border-b sticky top-0 z-20 ${
      darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
    }`}>
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle */}
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className={`p-1.5 rounded-lg md:hidden transition-colors ${
            darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
          }`}
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className={`text-sm sm:text-base font-bold font-poppins tracking-tight ${
          darkMode ? 'text-white' : 'text-slate-900'
        }`}>
          {getTabTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-3.5 relative">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-lg border transition-all ${
            darkMode 
              ? 'border-slate-800 hover:bg-slate-800 text-amber-400' 
              : 'border-slate-200 hover:bg-slate-50 text-slate-500'
          }`}
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications Center */}
        <div className="relative">
          <button 
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setProfileDropdownOpen(false);
            }}
            className={`p-2 rounded-lg border transition-all ${
              notificationsOpen 
                ? 'bg-primary/10 border-primary text-primary shadow-sm' 
                : darkMode 
                ? 'border-slate-800 hover:bg-slate-800 text-slate-400' 
                : 'border-slate-200 hover:bg-slate-50 text-slate-500'
            }`}
          >
            <span className="relative block">
              <Bell className="w-4 h-4" />
              {notifications.some(n => !n.read) && (
                <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border border-white" />
              )}
            </span>
          </button>

          <AnimatePresence>
            {notificationsOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                className={`absolute right-0 mt-2.5 w-72 rounded-xl shadow-xl border py-3 z-40 overflow-hidden ${
                  darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className="px-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span className={`text-[11.5px] font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Notifications</span>
                  <button 
                    onClick={markAllNotificationsRead}
                    className="text-[9.5px] font-semibold text-primary hover:underline"
                  >
                    Mark all read
                  </button>
                </div>
                
                <div className="max-h-60 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-800">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-slate-400 text-[11px] font-semibold">
                      No new notifications
                    </div>
                  ) : (
                    notifications.map((notify) => (
                      <div 
                        key={notify.id} 
                        className={`p-3 text-left transition-colors ${
                          !notify.read 
                            ? darkMode 
                              ? 'bg-slate-950/40 border-l-2 border-primary' 
                              : 'bg-primary/5 border-l-2 border-primary' 
                            : darkMode 
                            ? 'hover:bg-slate-800' 
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <h4 className={`text-[10.5px] font-bold leading-tight ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                            {notify.title}
                          </h4>
                          <span className="text-[8.5px] text-slate-400 shrink-0">{notify.time}</span>
                        </div>
                        <p className="text-[10.5px] text-slate-500 mt-1 leading-normal">
                          {notify.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => {
              setProfileDropdownOpen(!profileDropdownOpen);
              setNotificationsOpen(false);
            }}
            className={`flex items-center gap-2 p-1 rounded-xl border border-transparent transition-all text-left ${
              darkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-50'
            }`}
          >
            <img
              src={doctorAvatar}
              alt={doctorName}
              className="w-8 h-8 rounded-lg object-cover border border-primary/20 shrink-0"
            />
            <span className={`hidden sm:inline text-xs font-semibold pr-0.5 ${
              darkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              {doctorName.split(' ').slice(0, 2).join(' ')}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
          </button>

          <AnimatePresence>
            {profileDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                className={`absolute right-0 mt-2.5 w-52 rounded-xl shadow-xl border py-1.5 z-40 ${
                  darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 text-left">
                  <span className={`block text-xs font-bold truncate ${darkMode ? 'text-white' : 'text-slate-800'}`}>{doctorName}</span>
                  <span className="block text-[10px] text-slate-400 truncate mt-0.5">{doctorEmail}</span>
                </div>
                
                <div className="p-1 border-t border-slate-100 dark:border-slate-800 mt-1">
                  <button
                    onClick={logout}
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-xs text-red-650 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors text-left font-semibold"
                  >
                    <LogOut className="w-3.5 h-3.5 text-red-500" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
