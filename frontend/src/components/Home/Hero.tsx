import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative h-[800px] lg:h-[950px] flex items-center overflow-hidden">
      {/* Background with subtle zoom animation */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "linear" }}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-secondary/30"></div>
      </motion.div>

      <div className="container-custom relative z-10 pt-[150px] lg:pt-[200px]">
        <div className="max-w-[850px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-primary px-[20px] py-[6px] rounded-full text-white text-[14px] font-bold mb-[25px] inline-block uppercase tracking-[1px]">
              We Provide Total Health Care
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white mb-[30px] leading-[1.1] font-bold"
          >
            Your Health Is Our Priority, We Care For You
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-[18px] md:text-[20px] mb-[45px] text-white/90 leading-[1.8]"
          >
            Providing high-quality medical services with modern technology and expert doctors. Our mission is to provide the best healthcare services to our patients.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-[20px]"
          >
            <button className="btn-primary">
              Our Services
            </button>
            <button className="btn-secondary">
              Book Appointment
            </button>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Wave at bottom */}
      <div className="absolute bottom-0 left-0 w-full leading-none z-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[100px] fill-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.23,115.34,136.58,117.21,215.19,102.6Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
