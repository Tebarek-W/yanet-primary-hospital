import { motion } from 'framer-motion';
import { Calendar, Phone, MapPin } from 'lucide-react';

const Appointment = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/4 -z-10"></div>
      
      <div className="container-custom">
        <div className="bg-secondary rounded-[20px] overflow-hidden shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left side: Form */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-[40px] md:p-[60px]"
            >
              <h2 className="text-white mb-[20px]">Book An Appointment</h2>
              <p className="text-white/70 mb-[40px]">
                Fill out the form below to book an appointment with our specialist doctors.
              </p>
              
              <form className="space-y-[20px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="w-full bg-white/10 border border-white/20 rounded-[5px] px-[20px] py-[15px] text-white placeholder:text-white/50 focus:outline-none focus:border-primary transition-colors"
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full bg-white/10 border border-white/20 rounded-[5px] px-[20px] py-[15px] text-white placeholder:text-white/50 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                  <input 
                    type="text" 
                    placeholder="Phone Number" 
                    className="w-full bg-white/10 border border-white/20 rounded-[5px] px-[20px] py-[15px] text-white placeholder:text-white/50 focus:outline-none focus:border-primary transition-colors"
                  />
                  <select className="w-full bg-white/10 border border-white/20 rounded-[5px] px-[20px] py-[15px] text-white/50 focus:outline-none focus:border-primary transition-colors cursor-pointer">
                    <option value="">Select Service</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="diagnostic">Diagnostic</option>
                  </select>
                </div>
                <textarea 
                  placeholder="Message (Optional)" 
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-[5px] px-[20px] py-[15px] text-white placeholder:text-white/50 focus:outline-none focus:border-primary transition-colors"
                ></textarea>
                <button className="btn-primary w-full md:w-auto">
                  Submit Now
                </button>
              </form>
            </motion.div>

            {/* Right side: Contact Info with image background */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative p-[40px] md:p-[60px] flex flex-col justify-center"
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2070&auto=format&fit=crop" 
                  alt="Contact" 
                  className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-secondary/80"></div>
              </div>
              
              <div className="relative z-10 space-y-[30px]">
                <div className="flex gap-[20px] items-start">
                  <div className="w-[60px] h-[60px] rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                    <Phone className="w-[24px] h-[24px]" />
                  </div>
                  <div>
                    <h4 className="text-white mb-[5px]">Emergency Call</h4>
                    <p className="text-primary text-[22px] font-bold">+251 11 123 4567</p>
                  </div>
                </div>

                <div className="flex gap-[20px] items-start">
                  <div className="w-[60px] h-[60px] rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                    <Calendar className="w-[24px] h-[24px]" />
                  </div>
                  <div>
                    <h4 className="text-white mb-[5px]">Working Hours</h4>
                    <p className="text-white/70">Mon - Sun: 24 Hours Open</p>
                  </div>
                </div>

                <div className="flex gap-[20px] items-start">
                  <div className="w-[60px] h-[60px] rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                    <MapPin className="w-[24px] h-[24px]" />
                  </div>
                  <div>
                    <h4 className="text-white mb-[5px]">Location</h4>
                    <p className="text-white/70">Addis Ababa, Ethiopia, Around Bole</p>
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
