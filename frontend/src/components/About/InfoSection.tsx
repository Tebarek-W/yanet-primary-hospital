import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const InfoSection = () => {
  const points = [
    "24/7 Emergency and Trauma Care",
    "Modern Diagnostic Laboratory Services",
    "State-of-the-art Operation Theaters",
    "Specialized In-patient and Out-patient Services",
    "Highly Qualified Medical Professionals",
    "Advanced Medical Imaging (X-Ray, Ultrasound)",
    "Comprehensive Maternity and Child Care",
  ];

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-[40px] items-center">
          {/* Left Side: Blob Image */}
          <div className="relative">
            {/* Dashed Border Decoration */}
            <div className="absolute -inset-10 z-0">
              <svg viewBox="0 0 500 500" className="w-full h-full opacity-10">
                <circle
                  cx="250" cy="250" r="200"
                  fill="none"
                  stroke="#00B8B8"
                  strokeWidth="2"
                  strokeDasharray="10,10"
                />
              </svg>
            </div>

            {/* Floating Decorative Elements */}
            <motion.div 
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -top-6 left-1/4 z-20 w-12 h-12 bg-primary/20 rounded-full blur-xl"
            />
            <motion.div 
              animate={{ x: [0, 15, 0], y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute top-1/2 -left-6 z-20 w-10 h-10 bg-secondary/10 rounded-full blur-lg"
            />

            {/* Main Image with Blob Mask */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10 w-full aspect-square overflow-hidden shadow-2xl"
              style={{
                borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
              }}
            >
              <img 
                src="/doctors/woman_mask.png" 
                alt="Yanet Healthcare Excellence" 
                className="w-full h-full object-cover transform scale-110"
              />
            </motion.div>
          </div>

          {/* Right Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-5 relative">
              <span className="absolute -top-6 -left-4 text-[60px] font-black text-primary/[0.05] select-none pointer-events-none z-0 whitespace-nowrap">
                EXCELLENCE
              </span>
              <span className="relative z-10 text-primary font-bold uppercase tracking-wider text-[11px]">Modern Excellence</span>
              <h2 className="relative z-10 text-[28px] font-bold text-secondary mt-1 leading-tight">Advanced Healthcare Solutions <br /> for Your Family</h2>
            </div>
            
            <p className="text-body text-[14px] mb-6 leading-relaxed max-w-[500px]">
              Yanet Primary Hospital is committed to providing world-class medical services with a focus on patient safety, advanced technology, and compassionate care.
              <br /><br />
              <span className="font-bold text-secondary italic">Dedicated to excellence in every heartbeat.</span>
            </p>

            <ul className="grid sm:grid-cols-1 gap-y-3">
              {points.map((point, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-5 h-5 rounded-sm border-2 border-primary/30 flex items-center justify-center group-hover:bg-primary transition-all">
                    <Check className="w-3.5 h-3.5 text-primary group-hover:text-white" strokeWidth={4} />
                  </div>
                  <span className="text-secondary font-bold text-[13.5px]">{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
