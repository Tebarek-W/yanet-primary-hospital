import React from 'react';
import { motion } from 'framer-motion';
import { Pill, Check, Clock, User2 } from 'lucide-react';

interface Prescription {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  doctor: string;
  refills: number;
  takenToday: boolean;
}

interface PortalPrescriptionsProps {
  prescriptions: Prescription[];
  toggleMedication: (id: string) => void;
  darkMode: boolean;
}

export const PortalPrescriptions: React.FC<PortalPrescriptionsProps> = ({
  prescriptions,
  toggleMedication,
  darkMode
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`border rounded-2xl p-6 transition-all duration-300 text-left font-roboto ${
        darkMode 
          ? 'bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800 shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:border-slate-800' 
          : 'bg-gradient-to-br from-white to-slate-50/50 border-slate-200 shadow-[0_6px_25_rgba(0,0,0,0.015)]'
      }`}
    >
      <div className="flex items-center gap-3 mb-3.5">
        <div className={`p-2 rounded-xl shrink-0 ${
          darkMode ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-primary/10 text-primary border border-primary/20'
        }`}>
          <Pill className="w-5 h-5" />
        </div>
        <div>
          <h3 className={`text-[10px] font-bold uppercase tracking-wider font-poppins ${
            darkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Prescriptions & Medications Tracker
          </h3>
          <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5">
            Monitor active clinical pharmaceutical treatments, log daily doses, and track physician refill authorizations.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {prescriptions.map((pres) => (
          <div 
            key={pres.id} 
            className={`border rounded-xl p-5 transition-all duration-300 flex flex-col justify-between ${
              pres.takenToday 
                ? darkMode
                  ? 'bg-emerald-950/10 border-emerald-900/30 opacity-75 shadow-inner scale-[0.99] border-l-[4px] border-l-emerald-500'
                  : 'bg-emerald-50/20 border-emerald-200/40 opacity-80 shadow-inner scale-[0.99] border-l-[4px] border-l-emerald-500'
                : darkMode 
                ? 'bg-gradient-to-br from-slate-900/60 to-slate-950/80 border-slate-800 shadow-[0_8px_25px_rgba(0,0,0,0.1)] hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(0,184,184,0.06)] border-l-[4px] border-l-primary' 
                : 'bg-gradient-to-br from-white to-slate-50/80 border-slate-200 shadow-[0_6px_20px_rgba(0,0,0,0.01)] hover:border-primary/20 hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(0,184,184,0.03)] border-l-[4px] border-l-primary'
            }`}
          >
            <div>
              <div className="flex justify-between items-start gap-2.5">
                <div className="overflow-hidden text-left">
                  <h4 className={`text-sm font-bold font-poppins truncate ${
                    pres.takenToday ? 'line-through text-slate-400 dark:text-slate-500' : darkMode ? 'text-white' : 'text-slate-800'
                  }`}>
                    {pres.name}
                  </h4>
                  <p className={`text-[10px] font-semibold mt-0.5 ${pres.takenToday ? 'text-slate-400' : 'text-primary'}`}>
                    Clinical Prescription
                  </p>
                </div>
                
                <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider border shrink-0 ${
                  pres.refills > 0 
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100/50 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/10' 
                    : 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700/50'
                }`}>
                  {pres.refills > 0 ? `${pres.refills} refills left` : 'No refills'}
                </span>
              </div>
              
              <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs font-semibold text-slate-500">
                <p className="flex justify-between">
                  <span className="text-slate-400">Dosage:</span>
                  <span className={darkMode ? 'text-slate-300 font-bold' : 'text-slate-800 font-bold'}>{pres.dosage}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-slate-400">Frequency:</span>
                  <span className={darkMode ? 'text-slate-300 font-bold' : 'text-slate-800 font-bold'}>{pres.frequency}</span>
                </p>
                <p className="text-[9.5px] text-slate-400 font-medium pt-2 border-t border-dashed border-slate-200 dark:border-slate-800 flex justify-between items-center">
                  <span className="flex items-center gap-1"><User2 className="w-3.5 h-3.5" /> Clinician:</span>
                  <span className="font-bold text-slate-500 dark:text-slate-300">{pres.doctor}</span>
                </p>
              </div>
            </div>

            <button 
              onClick={() => toggleMedication(pres.id)}
              className={`w-full mt-5 py-2.5 rounded-lg border font-bold text-xs transition-all duration-300 flex items-center justify-center gap-1.5 ${
                pres.takenToday 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 dark:bg-emerald-950/20 shadow-inner cursor-pointer hover:bg-emerald-500/20' 
                  : darkMode
                  ? 'bg-primary hover:bg-primary/90 text-white border-primary/20 shadow-[0_4px_15px_rgba(0,184,184,0.15)] hover:shadow-[0_4px_20px_rgba(0,184,184,0.35)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]'
                  : 'bg-primary hover:bg-primary/95 text-white border-primary/20 shadow-[0_4px_12px_rgba(0,184,184,0.15)] hover:shadow-[0_4px_18px_rgba(0,184,184,0.25)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]'
              }`}
            >
              <Check className={`w-4 h-4 shrink-0 transition-transform duration-300 ${pres.takenToday ? 'scale-110 text-emerald-500' : ''}`} />
              <span>{pres.takenToday ? 'Dose Logged Today' : 'Mark Dose Taken'}</span>
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
