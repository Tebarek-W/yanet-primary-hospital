import React from 'react';
import { motion } from 'framer-motion';
import { User, ShieldAlert, Monitor, Bell } from 'lucide-react';

interface PortalSettingsProps {
  phoneInput: string;
  setPhoneInput: (v: string) => void;
  heightInput: string;
  setHeightInput: (v: string) => void;
  weightInput: string;
  setWeightInput: (v: string) => void;
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  smsAlerts: boolean;
  setSmsAlerts: (v: boolean) => void;
  emailAlerts: boolean;
  setEmailAlerts: (v: boolean) => void;
  handleSaveSettings: () => void;
}

export const PortalSettings: React.FC<PortalSettingsProps> = ({
  phoneInput,
  setPhoneInput,
  heightInput,
  setHeightInput,
  weightInput,
  setWeightInput,
  darkMode,
  setDarkMode,
  smsAlerts,
  setSmsAlerts,
  emailAlerts,
  setEmailAlerts,
  handleSaveSettings
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`max-w-xl border rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.25)] text-left font-roboto mx-auto transition-all duration-300 ${
        darkMode 
          ? 'bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800' 
          : 'bg-gradient-to-br from-white to-slate-50/50 border-slate-200'
      }`}
    >
      <div className="flex items-center gap-3 mb-5 border-b pb-4 dark:border-slate-800 border-slate-100">
        <div className={`p-2 rounded-xl shrink-0 ${
          darkMode ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-primary/10 text-primary border border-primary/20'
        }`}>
          <Monitor className="w-5 h-5" />
        </div>
        <div>
          <h3 className={`text-[10px] font-bold uppercase tracking-wider font-poppins ${
            darkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Portal & Profile Preferences
          </h3>
          <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5">
            Configure contact parameters, physiological metrics, security protocols, and system display dark mode.
          </p>
        </div>
      </div>
      
      <div className="space-y-6">
        
        {/* Section: Profile Info */}
        <div>
          <h4 className={`text-xs font-bold font-poppins mb-3.5 border-b pb-1.5 flex items-center gap-1.5 ${
            darkMode ? 'text-white border-slate-800' : 'text-slate-800 border-slate-100'
          }`}>
            <User className="w-4 h-4 text-primary shrink-0" />
            Patient Medical Details
          </h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[9.5px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Registered Contact Phone
              </label>
              <input 
                type="text"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                className={`w-full px-3 py-2.5 border rounded-xl outline-none transition-all duration-300 font-medium text-xs ${
                  darkMode 
                    ? 'bg-slate-950 border-slate-800 text-white focus:border-primary focus:ring-2 focus:ring-primary/20' 
                    : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 shadow-sm'
                }`}
              />
            </div>
            
            <div>
              <label className="block text-[9.5px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Gender & Blood Group
              </label>
              <input 
                type="text"
                disabled
                value="Male (O+)"
                className={`w-full px-3 py-2.5 border rounded-xl outline-none font-medium text-xs cursor-not-allowed ${
                  darkMode 
                    ? 'bg-slate-900 border-slate-800 text-slate-500' 
                    : 'bg-slate-100 border-slate-200 text-slate-400'
                }`}
              />
            </div>
            
            <div>
              <label className="block text-[9.5px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Physiological Height (cm)
              </label>
              <input 
                type="number"
                value={heightInput}
                onChange={(e) => setHeightInput(e.target.value)}
                className={`w-full px-3 py-2.5 border rounded-xl outline-none transition-all duration-300 font-medium text-xs ${
                  darkMode 
                    ? 'bg-slate-950 border-slate-800 text-white focus:border-primary focus:ring-2 focus:ring-primary/20' 
                    : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 shadow-sm'
                }`}
              />
            </div>
            
            <div>
              <label className="block text-[9.5px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Physiological Weight (kg)
              </label>
              <input 
                type="number"
                value={weightInput}
                onChange={(e) => setWeightInput(e.target.value)}
                className={`w-full px-3 py-2.5 border rounded-xl outline-none transition-all duration-300 font-medium text-xs ${
                  darkMode 
                    ? 'bg-slate-950 border-slate-800 text-white focus:border-primary focus:ring-2 focus:ring-primary/20' 
                    : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 shadow-sm'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Section: Interface Options */}
        <div>
          <h4 className={`text-xs font-bold font-poppins mb-3.5 border-b pb-1.5 ${
            darkMode ? 'text-white border-slate-800' : 'text-slate-800 border-slate-100'
          }`}>
            Portal System Interface
          </h4>
          
          <div className={`flex items-center justify-between p-4 border rounded-xl transition-all duration-300 ${
            darkMode ? 'bg-slate-950/20 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="text-left pr-2">
              <h5 className={`text-xs font-bold font-poppins ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                Dark High-Contrast Mode
              </h5>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed font-normal">
                Toggle comfortable reading aesthetics for low light environments.
              </p>
            </div>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`w-10 h-5.5 rounded-full transition-all relative shrink-0 ${
                darkMode ? 'bg-primary shadow-[0_0_8px_rgba(0,184,184,0.4)]' : 'bg-slate-300 dark:bg-slate-850'
              }`}
            >
              <span className={`absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white shadow-sm transition-all ${
                darkMode ? 'left-5' : 'left-0.5'
              }`} />
            </button>
          </div>
        </div>

        {/* Section: Notifications preferences */}
        <div>
          <h4 className={`text-xs font-bold font-poppins mb-3.5 border-b pb-1.5 flex items-center gap-1.5 ${
            darkMode ? 'text-white border-slate-800' : 'text-slate-800 border-slate-100'
          }`}>
            <Bell className="w-4 h-4 text-primary shrink-0" />
            Notification Channels
          </h4>
          
          <div className="space-y-2.5">
            <div className={`flex items-center justify-between p-4.5 border rounded-xl transition-all duration-300 ${
              darkMode ? 'bg-slate-950/20 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className={`text-xs font-bold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                SMS Appointment Reminders
              </span>
              <button 
                onClick={() => setSmsAlerts(!smsAlerts)}
                className={`w-9 h-5 rounded-full transition-all relative shrink-0 ${
                  smsAlerts ? 'bg-primary shadow-[0_0_8px_rgba(0,184,184,0.4)]' : 'bg-slate-300 dark:bg-slate-850'
                }`}
              >
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${
                  smsAlerts ? 'left-4.5' : 'left-0.5'
                }`} />
              </button>
            </div>

            <div className={`flex items-center justify-between p-4.5 border rounded-xl transition-all duration-300 ${
              darkMode ? 'bg-slate-950/20 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className={`text-xs font-bold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Email Lab & Record Updates
              </span>
              <button 
                onClick={() => setEmailAlerts(!emailAlerts)}
                className={`w-9 h-5 rounded-full transition-all relative shrink-0 ${
                  emailAlerts ? 'bg-primary shadow-[0_0_8px_rgba(0,184,184,0.4)]' : 'bg-slate-300 dark:bg-slate-850'
                }`}
              >
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${
                  emailAlerts ? 'left-4.5' : 'left-0.5'
                }`} />
              </button>
            </div>
          </div>
        </div>

        <button 
          onClick={handleSaveSettings}
          className="w-full py-3 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl transition-all duration-300 shadow-[0_4px_15_rgba(0,184,184,0.15)] hover:shadow-[0_4px_22_rgba(0,184,184,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-xs text-center font-poppins mt-3 uppercase tracking-wider"
        >
          Save Portal Preferences
        </button>

      </div>
    </motion.div>
  );
};
