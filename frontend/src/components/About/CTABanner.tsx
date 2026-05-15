import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const CTABanner = () => {
  return (
    <section className="relative py-[120px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1576091160550-2173bdb999ef?auto=format&fit=crop&q=80&w=2000" 
          alt="Medical Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-secondary/90"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-[800px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-[100px] h-[100px] bg-primary rounded-full flex items-center justify-center text-white mx-auto mb-10 shadow-[0_0_50px_rgba(0,184,184,0.5)]"
          >
            <Calendar className="w-12 h-12" />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white text-[40px] md:text-[50px] font-bold mb-6 leading-tight"
          >
            Join Our Next <span className="text-primary">Free Medical Camp</span> For The Needy
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-[18px] mb-10 leading-relaxed"
          >
            We regularly organize free medical camps to provide healthcare services to underserved communities. Your health is our priority.
          </motion.p>

          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-white px-12 py-5 rounded-full font-bold text-[18px] shadow-xl hover:bg-white hover:text-primary transition-all duration-300"
          >
            Book An Appointment
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
