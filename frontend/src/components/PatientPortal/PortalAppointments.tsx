import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, PlusCircle, CheckCircle2, Clock, X } from 'lucide-react';

interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface Doctor {
  name: string;
  specialty: string;
}

interface PortalAppointmentsProps {
  appointments: Appointment[];
  doctors: Doctor[];
  appointmentFilter: 'all' | 'upcoming' | 'completed';
  setAppointmentFilter: (filter: 'all' | 'upcoming' | 'completed') => void;
  handleCancelAppointment: (id: string) => void;
  handleBookAppointmentSubmit: (doctorName: string, date: string, time: string) => void;
  darkMode: boolean;
}

export const PortalAppointments: React.FC<PortalAppointmentsProps> = ({
  appointments,
  doctors,
  appointmentFilter,
  setAppointmentFilter,
  handleCancelAppointment,
  handleBookAppointmentSubmit,
  darkMode
}) => {
  const [bookingDoctor, setBookingDoctor] = useState(doctors[0]?.name || '');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('10:00 AM');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate) return;

    handleBookAppointmentSubmit(bookingDoctor, bookingDate, bookingTime);
    setShowSuccess(true);
    setBookingDate('');
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 4000);
  };

  const filteredAppointments = appointments.filter(a => {
    if (appointmentFilter === 'upcoming') return a.status === 'upcoming';
    if (appointmentFilter === 'completed') return a.status === 'completed' || a.status === 'cancelled';
    return true;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left font-roboto"
    >
      {/* Dynamic Booking Module */}
      <div className={`lg:col-span-1 border rounded-2xl p-6 transition-all duration-300 h-fit ${
        darkMode 
          ? 'bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.15)]' 
          : 'bg-gradient-to-br from-white to-slate-50/50 border-slate-200 shadow-[0_6px_25px_rgba(0,0,0,0.015)]'
      }`}>
        <h3 className={`text-[10px] font-bold uppercase tracking-wider font-poppins mb-4 ${
          darkMode ? 'text-slate-400' : 'text-slate-505'
        }`}>
          Request Appointment
        </h3>
        
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-3 rounded-lg text-[11px] font-semibold mb-4 flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>Consultation booked successfully.</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 font-semibold text-xs text-slate-500">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Select Consulting Physician
            </label>
            <select 
              value={bookingDoctor}
              onChange={(e) => setBookingDoctor(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg outline-none transition-colors font-medium text-xs ${
                darkMode 
                  ? 'bg-slate-950 border-slate-800 text-white focus:border-primary' 
                  : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary focus:bg-white'
              }`}
            >
              {doctors.map((d, i) => (
                <option key={i} value={d.name}>{d.name} ({d.specialty})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Preferred Date
            </label>
            <input 
              type="date"
              required
              min={new Date().toISOString().split('T')[0]}
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg outline-none transition-colors font-medium text-xs ${
                darkMode 
                  ? 'bg-slate-950 border-slate-800 text-white focus:border-primary' 
                  : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary focus:bg-white'
              }`}
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Preferred Time Slot
            </label>
            <select 
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg outline-none transition-colors font-medium text-xs ${
                darkMode 
                  ? 'bg-slate-950 border-slate-800 text-white focus:border-primary' 
                  : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary focus:bg-white'
              }`}
            >
              <option value="09:00 AM">09:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:30 AM">11:30 AM</option>
              <option value="02:30 PM">02:30 PM</option>
              <option value="04:00 PM">04:00 PM</option>
            </select>
          </div>

          <button 
            type="submit"
            className="w-full py-2.5 bg-primary hover:bg-primary/95 text-white font-bold rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5 text-xs mt-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Schedule Visit</span>
          </button>
        </form>
      </div>

      {/* Appointments Log list */}
      <div className={`lg:col-span-2 border rounded-2xl p-6 transition-all duration-300 ${
        darkMode 
          ? 'bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.15)]' 
          : 'bg-gradient-to-br from-white to-slate-50/50 border-slate-200 shadow-[0_6px_25px_rgba(0,0,0,0.015)]'
      }`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <h3 className={`text-[10px] font-bold uppercase tracking-wider font-poppins ${
            darkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Consultation Scheduling Log
          </h3>
          
          {/* Filters switcher */}
          <div className={`flex p-1 rounded-lg border text-xs font-semibold ${
            darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            {[
              { id: 'all', label: 'All' },
              { id: 'upcoming', label: 'Upcoming' },
              { id: 'completed', label: 'History' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setAppointmentFilter(f.id as any)}
                className={`px-3 py-1 rounded text-[10px] font-bold transition-all ${
                  appointmentFilter === f.id 
                    ? darkMode
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'bg-white text-primary shadow-sm border border-slate-100' 
                    : 'text-slate-500 hover:text-primary'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Appointment Cards stream */}
        <div className="space-y-3.5">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map(app => (
              <div 
                key={app.id} 
                className={`p-4.5 rounded-xl border flex flex-col sm:flex-row justify-between sm:items-center gap-3.5 transition-all duration-200 hover:scale-[1.01] hover:border-primary/20 ${
                  app.status === 'cancelled' 
                    ? 'opacity-55 dark:bg-slate-950/20' 
                    : darkMode 
                    ? 'bg-slate-950/30 border-slate-800/80 hover:bg-slate-900/20' 
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-lg shrink-0 ${
                    app.status === 'upcoming' 
                      ? 'bg-primary/10 text-primary border border-primary/20' 
                      : app.status === 'completed'
                      ? 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                      : 'bg-red-50 text-red-500 dark:bg-red-950/10'
                  }`}>
                    <Calendar className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-left">
                    <h4 className={`font-bold text-xs font-poppins ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                      {app.doctor}
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{app.specialty}</p>
                    <p className="text-[10px] text-slate-400 font-semibold mt-2.5 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {app.date} at {app.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {app.status === 'upcoming' ? (
                    <>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-primary/10 border border-primary/20 text-primary uppercase tracking-wider">
                        Confirmed
                      </span>
                      <button 
                        onClick={() => handleCancelAppointment(app.id)}
                        className={`text-[9.5px] font-bold px-2.5 py-1.5 rounded-lg border transition-colors ${
                          darkMode 
                            ? 'text-red-400 hover:bg-red-950/20 border-transparent' 
                            : 'text-red-500 hover:bg-red-50 border-transparent hover:border-red-100'
                        }`}
                      >
                        Cancel Appointment
                      </button>
                    </>
                  ) : app.status === 'completed' ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-500 uppercase tracking-wider">
                      Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-red-50 dark:bg-red-950/20 border border-red-100/20 text-red-500 uppercase tracking-wider">
                      Cancelled
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className={`text-center py-10 border border-dashed rounded-xl ${
              darkMode ? 'bg-slate-950/10 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <Calendar className="w-7 h-7 text-slate-400 dark:text-slate-600 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-500">No appointments logged under this category.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
