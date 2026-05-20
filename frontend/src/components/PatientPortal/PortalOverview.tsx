import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, Activity, TrendingUp, User, Calendar, 
  Clock, Pill, MessageSquare, ChevronRight, Check, X, Video
} from 'lucide-react';

interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface Prescription {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  refills: number;
  takenToday: boolean;
}

interface Doctor {
  name: string;
  specialty: string;
  avatar: string;
  chatHistory: { text: string }[];
}

interface PortalOverviewProps {
  userName: string;
  getGreeting: () => string;
  appointments: Appointment[];
  prescriptions: Prescription[];
  doctors: Doctor[];
  toggleMedication: (id: string) => void;
  handleCancelAppointment: (id: string) => void;
  setActiveTab: (tab: any) => void;
  setSelectedDoctorIndex: (idx: number) => void;
  darkMode: boolean;
}

export const PortalOverview: React.FC<PortalOverviewProps> = ({
  userName,
  getGreeting,
  appointments,
  prescriptions,
  doctors,
  toggleMedication,
  handleCancelAppointment,
  setActiveTab,
  setSelectedDoctorIndex,
  darkMode
}) => {
  
  const upcomingVisits = appointments.filter(a => a.status === 'upcoming');
  const dailyPrescriptions = prescriptions.slice(0, 3); // top 3 for overview preview

  const vitalStats = [
    { title: 'Heart Rate', value: '72 bpm', status: 'Normal', icon: Heart, desc: '60 - 100 normal' },
    { title: 'Blood Pressure', value: '120/80', status: 'Optimal', icon: Activity, desc: 'Less than 120/80' },
    { title: 'Fasting Glucose', value: '110 mg/dL', status: 'Elevated', icon: TrendingUp, desc: '70 - 99 mg/dL normal' },
    { title: 'Body BMI', value: '22.7 kg/m²', status: 'Normal', icon: User, desc: '18.5 - 24.9 optimal' },
  ];

  const getVitalStyle = (title: string) => {
    switch (title) {
      case 'Heart Rate':
        return {
          iconColor: 'text-emerald-500 dark:text-emerald-400',
          iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/10 dark:border-emerald-500/20',
          badge: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/20',
          indicatorGlow: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]',
          borderAccent: 'border-l-[4px] border-l-emerald-500'
        };
      case 'Blood Pressure':
        return {
          iconColor: 'text-primary dark:text-primary',
          iconBg: 'bg-primary/10 dark:bg-primary/20 border border-primary/10 dark:border-primary/20',
          badge: 'text-primary dark:text-primary bg-primary/10 dark:bg-primary/20 border-primary/20',
          indicatorGlow: 'bg-primary shadow-[0_0_8px_rgba(0,184,184,0.6)]',
          borderAccent: 'border-l-[4px] border-l-primary'
        };
      case 'Fasting Glucose':
        return {
          iconColor: 'text-amber-500 dark:text-amber-400',
          iconBg: 'bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/10 dark:border-amber-500/20',
          badge: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/20',
          indicatorGlow: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]',
          borderAccent: 'border-l-[4px] border-l-amber-500'
        };
      case 'Body BMI':
      default:
        return {
          iconColor: 'text-indigo-500 dark:text-indigo-400',
          iconBg: 'bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/10 dark:border-indigo-500/20',
          badge: 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 dark:bg-indigo-500/20 border-indigo-500/20',
          indicatorGlow: 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]',
          borderAccent: 'border-l-[4px] border-l-indigo-500'
        };
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 text-left font-roboto"
    >
      {/* Premium Corporate Welcome Banner */}
      <div className="p-6 sm:p-8 bg-secondary text-white rounded-2xl border border-slate-800 relative overflow-hidden shadow-md">
        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 w-full text-left flex flex-col md:flex-row justify-between md:items-center gap-5">
          <div className="max-w-2xl">
            <span className="text-[9px] font-bold bg-primary/20 border border-primary/30 px-2.5 py-1 rounded-md uppercase tracking-wider text-white">
              Overview Summary
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-poppins tracking-tight mt-3 text-white">
              {getGreeting()}, {userName.split(' ')[0]}
            </h2>
            <p className="text-slate-100 text-xs sm:text-sm mt-1.5 leading-relaxed font-normal">
              Welcome to your patient workspace. Here you can review vital measurements, manage daily drug logs, communicate directly with your clinical providers, and schedule upcoming hospital consultations.
            </p>
          </div>
          <button 
            onClick={() => alert("Connecting to Yanet Telehealth network... Initializing secure WebRTC video/audio channel... Please allow camera access.")}
            className="md:self-center px-4 py-2.5 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl transition-all duration-300 shadow-[0_4px_15px_rgba(0,184,184,0.3)] hover:shadow-[0_4px_22px_rgba(0,184,184,0.55)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-[10.5px] uppercase tracking-wider shrink-0 flex items-center justify-center gap-2"
          >
            <Video className="w-4 h-4" /> Start Telehealth
          </button>
        </div>
      </div>

      {/* Vital Metrics Grid */}
      <div>
        <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-poppins mb-3">
          Authorized Measurements
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {vitalStats.map((stat, idx) => {
            const Icon = stat.icon;
            const style = getVitalStyle(stat.title);
            return (
              <div 
                key={idx} 
                className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 ${style.borderAccent} ${
                  darkMode 
                    ? 'bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800 hover:border-slate-700/80 hover:shadow-[0_12px_35px_rgba(0,184,184,0.06)]' 
                    : 'bg-gradient-to-br from-white to-slate-50/50 border-slate-200 shadow-[0_6px_20px_rgba(0,0,0,0.015)] hover:border-slate-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)]'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider font-poppins">
                    {stat.title}
                  </span>
                  <div className={`p-1.5 rounded-lg ${style.iconBg} ${style.iconColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                
                <div className="mt-3.5">
                  <h4 className={`text-xl font-bold font-poppins tracking-tight ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    {stat.value}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border uppercase tracking-wider flex items-center gap-1.5 ${style.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${style.indicatorGlow}`} />
                      {stat.status}
                    </span>
                    <span className="text-[9px] text-slate-400 font-semibold truncate shrink-0">
                      • {stat.desc}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Checklist & Appointments Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Appointments List Card */}
        <div className={`lg:col-span-2 border rounded-2xl p-6 text-left flex flex-col justify-between transition-all duration-300 ${
          darkMode 
            ? 'bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.15)]' 
            : 'bg-gradient-to-br from-white to-slate-50/50 border-slate-200 shadow-[0_6px_25px_rgba(0,0,0,0.015)]'
        }`}>
          <div>
            <div className="flex justify-between items-center mb-4.5">
              <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-poppins">
                Upcoming Consultations
              </h3>
              <button 
                onClick={() => setActiveTab('appointments')}
                className="text-xs font-semibold text-primary hover:text-primary/90 hover:underline"
              >
                Manage visits
              </button>
            </div>

            <div className="space-y-3.5">
              {upcomingVisits.length > 0 ? (
                upcomingVisits.map(app => (
                  <div 
                    key={app.id} 
                    onClick={() => setActiveTab('appointments')}
                    className={`p-4 rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3.5 transition-all duration-200 cursor-pointer hover:scale-[1.01] hover:border-primary/20 ${
                      darkMode 
                        ? 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-900/20' 
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-9 h-9 bg-primary/10 border border-primary/20 text-primary rounded-lg flex items-center justify-center shrink-0">
                        <Calendar className="w-4.5 h-4.5" />
                      </div>
                      <div className="text-left">
                        <h4 className={`font-bold text-xs font-poppins ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                          {app.doctor}
                        </h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{app.specialty}</p>
                        <div className="flex items-center gap-1.5 mt-1 text-[10px] text-slate-400 font-semibold">
                          <Clock className="w-3.5 h-3.5" /> {app.date} at {app.time}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-primary/10 border border-primary/20 text-primary uppercase tracking-wider">
                        Confirmed
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancelAppointment(app.id);
                        }}
                        className={`p-1.5 border border-transparent rounded-lg transition-colors ${
                          darkMode ? 'hover:bg-slate-800 text-red-400' : 'hover:bg-red-50 text-red-500 hover:border-red-100'
                        }`}
                        title="Cancel Appointment"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className={`text-center py-7 border border-dashed rounded-xl ${
                  darkMode ? 'bg-slate-950/20 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <Calendar className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400">No appointments scheduled.</p>
                  <button 
                    onClick={() => setActiveTab('appointments')}
                    className="text-xs font-bold text-primary hover:underline mt-1 block w-full text-center"
                  >
                    Schedule clinic consultation
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Prescription Checklist Widget */}
        <div className={`border rounded-2xl p-6 text-left flex flex-col justify-between transition-all duration-300 ${
          darkMode 
            ? 'bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.15)]' 
            : 'bg-gradient-to-br from-white to-slate-50/50 border-slate-200 shadow-[0_6px_25px_rgba(0,0,0,0.015)]'
        }`}>
          <div>
            <div className="flex justify-between items-center mb-4.5">
              <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-poppins">
                Medication Tracker
              </h3>
              <button 
                onClick={() => setActiveTab('prescriptions')}
                className="text-xs font-semibold text-primary hover:text-primary/90 hover:underline"
              >
                Full list
              </button>
            </div>

            <div className="space-y-3">
              {dailyPrescriptions.map((pres) => (
                <div 
                  key={pres.id} 
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 hover:scale-[1.01] hover:border-primary/20 ${
                    darkMode 
                      ? 'bg-slate-950/30 border-slate-800/80 hover:bg-slate-900/20' 
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100/50'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden text-left">
                    <button 
                      onClick={() => toggleMedication(pres.id)}
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                        pres.takenToday 
                          ? 'bg-primary border-primary text-white shadow-sm' 
                          : darkMode 
                          ? 'border-slate-700 bg-slate-900 hover:border-primary' 
                          : 'border-slate-300 bg-white hover:border-primary'
                      }`}
                    >
                      {pres.takenToday && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>
                    <div className="overflow-hidden text-left">
                      <h4 className={`text-xs font-bold font-poppins truncate ${
                        pres.takenToday ? 'line-through text-slate-400 font-medium' : darkMode ? 'text-white' : 'text-slate-800'
                      }`}>
                        {pres.name}
                      </h4>
                      <p className="text-[9.5px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">{pres.dosage} • {pres.frequency}</p>
                    </div>
                  </div>
                  <span className={`text-[8.5px] font-bold px-1.5 py-0.5 rounded shrink-0 uppercase tracking-wider ${
                    pres.refills > 0 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                  }`}>
                    {pres.refills} refills
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Care Provider inbox previews */}
      <div className={`border rounded-2xl p-6 text-left transition-all duration-300 ${
        darkMode 
          ? 'bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.15)]' 
          : 'bg-gradient-to-br from-white to-slate-50/50 border-slate-200 shadow-[0_6px_25px_rgba(0,0,0,0.015)]'
      }`}>
        <div className="flex justify-between items-center mb-4.5">
          <div>
            <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-poppins">
              Care Provider Communication
            </h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Secure clinical messaging with consulting physicians.</p>
          </div>
          <button 
            onClick={() => setActiveTab('messages')}
            className="flex items-center gap-1 text-xs font-bold text-primary hover:text-primary/90 hover:underline"
          >
            Access inbox <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {doctors.map((doc, idx) => {
            const lastMsg = doc.chatHistory[doc.chatHistory.length - 1];
            return (
              <div 
                key={idx}
                onClick={() => {
                  setSelectedDoctorIndex(idx);
                  setActiveTab('messages');
                }}
                className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex gap-3.5 items-start hover:scale-[1.02] hover:-translate-y-0.5 ${
                  darkMode 
                    ? 'bg-slate-950/40 border-slate-800/80 hover:border-primary/40 hover:shadow-[0_8px_20px_rgba(0,184,184,0.04)]' 
                    : 'bg-slate-50 border-slate-200 hover:border-primary/30 hover:shadow-sm'
                }`}
              >
                <img 
                  src={doc.avatar} 
                  alt={doc.name} 
                  className="w-9 h-9 rounded-full object-cover shrink-0 border border-slate-200 dark:border-slate-800 shadow-sm" 
                />
                <div className="overflow-hidden flex-1 text-left">
                  <h4 className={`text-xs font-bold font-poppins truncate ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    {doc.name}
                  </h4>
                  <p className="text-[9px] text-primary font-semibold mt-0.5">{doc.specialty}</p>
                  <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-2 truncate font-normal italic">
                    "{lastMsg ? lastMsg.text : 'Secure channel ready'}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
