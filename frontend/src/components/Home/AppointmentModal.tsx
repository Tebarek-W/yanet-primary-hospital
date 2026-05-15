import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Phone, Mail, User, MessageSquare, ChevronDown } from 'lucide-react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppointmentModal = ({ isOpen, onClose }: AppointmentModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-secondary/80 backdrop-blur-md z-[200] cursor-pointer"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-[201] p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-secondary w-full max-w-[600px] rounded-[35px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)] border border-white/10 pointer-events-auto relative"
            >
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 bg-white/5 hover:bg-primary text-white rounded-full flex items-center justify-center transition-all duration-300 z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-[2px] w-10 bg-primary"></div>
                  <span className="text-primary font-bold uppercase tracking-[3px] text-[12px]">Online Booking</span>
                </div>
                
                <h2 className="text-white text-[32px] md:text-[42px] leading-tight mb-4">Book Your <span className="text-primary italic">Appointment</span></h2>
                <p className="text-white/60 mb-10 text-[16px] md:text-[18px]">
                  Fill out the form below and our medical team will contact you shortly to confirm your schedule.
                </p>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors">
                        <User className="w-5 h-5" />
                      </div>
                      <input 
                        type="text" 
                        placeholder="Full Name" 
                        className="w-full bg-white/5 border border-white/10 rounded-[15px] pl-14 pr-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:bg-white/10 transition-all"
                      />
                    </div>
                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors">
                        <Mail className="w-5 h-5" />
                      </div>
                      <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="w-full bg-white/5 border border-white/10 rounded-[15px] pl-14 pr-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:bg-white/10 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors">
                        <Phone className="w-5 h-5" />
                      </div>
                      <input 
                        type="text" 
                        placeholder="Phone Number" 
                        className="w-full bg-white/5 border border-white/10 rounded-[15px] pl-14 pr-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:bg-white/10 transition-all"
                      />
                    </div>
                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <select className="w-full bg-white/5 border border-white/10 rounded-[15px] pl-14 pr-6 py-4 text-white/50 focus:outline-none focus:border-primary focus:bg-white/10 transition-all cursor-pointer appearance-none">
                        <option value="" className="bg-secondary text-white">Select Service</option>
                        <option value="cardiology" className="bg-secondary text-white">Cardiology</option>
                        <option value="neurology" className="bg-secondary text-white">Neurology</option>
                        <option value="pediatrics" className="bg-secondary text-white">Pediatrics</option>
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute left-5 top-6 text-white/30 group-focus-within:text-primary transition-colors">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <textarea 
                      placeholder="Tell us about your concern..." 
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-[15px] pl-14 pr-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:bg-white/10 transition-all"
                    ></textarea>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary w-full shadow-xl shadow-primary/20 !py-5 rounded-[15px]"
                  >
                    Confirm Booking
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AppointmentModal;
