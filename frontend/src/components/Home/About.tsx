import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const About = () => {
  const points = [
    "Qualified Doctors",
    "Emergency Care",
    "Modern Technology",
    "24/7 Service",
    "Experienced Staff",
    "Blood Bank"
  ];

  return (
    <section className="pb-[60px] pt-[30px] lg:pt-[50px] overflow-hidden bg-white relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10"></div>
      
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[80px] items-center">
          {/* Left: Enhanced Images */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative lg:pr-10 lg:pb-10"
          >
            {/* Main Image */}
            <div className="relative z-10 rounded-[30px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] group">
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop" 
                alt="About Medical" 
                className="w-full h-auto transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Secondary Overlapping Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-12 -left-10 w-2/3 rounded-[25px] overflow-hidden border-[10px] border-white shadow-2xl z-20 hidden md:block group"
            >
              <img 
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop" 
                alt="Modern Equipment" 
                className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>

            {/* Experience Badge */}
            <motion.div 
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="absolute -bottom-5 -right-5 md:right-0 z-30 bg-primary p-8 md:p-10 rounded-[30px] text-white text-center shadow-[0_20px_50px_rgba(0,184,184,0.4)] cursor-pointer"
            >
              <h2 className="text-white text-[45px] md:text-[55px] font-black leading-none tracking-tighter">25+</h2>
              <div className="w-12 h-1.5 bg-white/30 mx-auto my-3 rounded-full"></div>
              <span className="text-[12px] md:text-[14px] uppercase font-bold tracking-[3px] block">Years of<br/>Experience</span>
            </motion.div>

            {/* Floating Decorative Orbs */}
            <div className="absolute -top-[40px] -left-[40px] w-[150px] h-[150px] bg-primary/10 rounded-full -z-10 animate-pulse-soft"></div>
            <div className="absolute top-[20%] -right-[20px] w-12 h-12 bg-secondary/10 rounded-full -z-10 animate-float"></div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-title text-left mx-0 mb-8">
              <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[13px] font-bold uppercase tracking-wider mb-4 inline-block">
                Since 1999
              </span>
              <h2 className="text-secondary text-[28px] md:text-[40px] leading-[1.2] mb-6">We Are Here To Care For <span className="text-primary italic">Your Health</span></h2>
              <p className="text-body text-[15px] md:text-[16px] leading-relaxed opacity-90">
                Yanet Primary Hospital has been a leader in high-quality medical services for over 25 years. We combine expert medical professionals with cutting-edge technology to ensure your family receives the best possible care, 24/7.
              </p>
            </div>

            {/* Interactive Points Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {points.map((point, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10, backgroundColor: "rgba(0, 184, 184, 0.05)" }}
                  className="flex items-center gap-4 bg-gray-50/50 p-4 rounded-2xl transition-all duration-300 group cursor-pointer border border-transparent hover:border-primary/20"
                >
                  <div className="w-9 h-9 bg-white shadow-sm rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="text-secondary font-bold text-[15px]">{point}</span>
                </motion.div>
              ))}
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary group flex items-center gap-3 px-10 py-5 rounded-2xl shadow-xl shadow-primary/20"
            >
              Learn More About Us
              <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <Check className="w-4 h-4" />
              </div>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
