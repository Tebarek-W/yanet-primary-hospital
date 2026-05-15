import { motion } from 'framer-motion';
import { Calendar, Phone, MapPin, CheckCircle2 } from 'lucide-react';

const Appointment = () => {
  return (
    <section className="section-padding relative overflow-hidden bg-secondary">
      {/* Background decoration with animated orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] animate-pulse-soft -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] animate-pulse-soft translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container-custom relative z-10">
        <div className="bg-white/5 backdrop-blur-2xl rounded-[35px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.3)] border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left side: Form */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="p-[50px] md:p-[80px]"
            >
              <div className="flex items-center gap-3 mb-[20px]">
                <div className="h-[2px] w-[40px] bg-primary"></div>
                <span className="text-primary font-bold uppercase tracking-[3px] text-[13px]">Online Booking</span>
              </div>
              <h2 className="text-white mb-[25px] text-[42px]">Book Your Appointment</h2>
              <p className="text-white/60 mb-[50px] text-[18px]">
                Connect with our expert medical team. We'll get back to you within 24 hours to confirm your schedule.
              </p>
              
              <form className="space-y-[30px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
                  <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      className="w-full bg-white/5 border border-white/10 rounded-[12px] px-[25px] py-[18px] text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:bg-white/10 transition-all"
                    />
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-500 group-focus-within:w-full"></div>
                  </div>
                  <div className="relative group">
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      className="w-full bg-white/5 border border-white/10 rounded-[12px] px-[25px] py-[18px] text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:bg-white/10 transition-all"
                    />
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-500 group-focus-within:w-full"></div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
                  <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="Phone Number" 
                      className="w-full bg-white/5 border border-white/10 rounded-[12px] px-[25px] py-[18px] text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:bg-white/10 transition-all"
                    />
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-500 group-focus-within:w-full"></div>
                  </div>
                  <div className="relative group">
                    <select className="w-full bg-white/5 border border-white/10 rounded-[12px] px-[25px] py-[18px] text-white/50 focus:outline-none focus:border-primary focus:bg-white/10 transition-all cursor-pointer appearance-none">
                      <option value="" className="bg-secondary text-white">Select Service</option>
                      <option value="cardiology" className="bg-secondary text-white">Cardiology</option>
                      <option value="neurology" className="bg-secondary text-white">Neurology</option>
                    </select>
                  </div>
                </div>
                <textarea 
                  placeholder="Tell us about your concern..." 
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-[12px] px-[25px] py-[18px] text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:bg-white/10 transition-all"
                ></textarea>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full shadow-[0_10px_30px_rgba(0,184,184,0.3)] !py-[20px]"
                >
                  Confirm Appointment
                </motion.button>
              </form>
            </motion.div>

            {/* Right side: Image & Contact */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative p-[50px] md:p-[80px] flex flex-col justify-center bg-primary/5"
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2070&auto=format&fit=crop" 
                  alt="Contact" 
                  className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-primary/20 to-transparent"></div>
              </div>
              
              <div className="relative z-10 space-y-[45px]">
                <h3 className="text-white text-[32px] mb-[10px]">Why Choose Us?</h3>
                <div className="space-y-4">
                  {["Expert Doctors", "Modern Facilities", "24/7 Care", "Quick Confirmation"].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-white/90">
                      <CheckCircle2 className="text-primary w-6 h-6" />
                      <span className="text-[18px] font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-[40px] border-t border-white/10">
                  <div className="flex gap-[25px] items-start mb-[30px]">
                    <div className="w-[65px] h-[65px] rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg">
                      <Phone className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="text-white/60 text-[14px] uppercase tracking-widest mb-1">Emergency Help</h4>
                      <p className="text-white text-[26px] font-bold">+251 11 123 4567</p>
                    </div>
                  </div>

                  <div className="flex gap-[25px] items-start">
                    <div className="w-[65px] h-[65px] rounded-2xl bg-white/10 backdrop-blur-lg flex items-center justify-center text-white border border-white/10">
                      <MapPin className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="text-white/60 text-[14px] uppercase tracking-widest mb-1">Our Location</h4>
                      <p className="text-white text-[20px] font-medium">Bole Road, Addis Ababa</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
