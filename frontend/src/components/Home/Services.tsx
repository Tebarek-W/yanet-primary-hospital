import { motion } from 'framer-motion';
import { HeartPulse, Activity, Stethoscope, Microscope, Brain, Baby, Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      icon: <HeartPulse className="w-14 h-14" />,
      title: "Cardiology",
      desc: "Comprehensive heart care with modern diagnostic tools and experienced cardiologists.",
      delay: 0.1
    },
    {
      icon: <Activity className="w-14 h-14" />,
      title: "Diagnostic",
      desc: "Advanced diagnostic services including X-ray, MRI, and full laboratory testing.",
      delay: 0.2
    },
    {
      icon: <Stethoscope className="w-14 h-14" />,
      title: "General Surgery",
      desc: "Expert surgical procedures with minimal invasive techniques and care.",
      delay: 0.3
    },
    {
      icon: <Microscope className="w-14 h-14" />,
      title: "Laboratory",
      desc: "State-of-the-art laboratory services for accurate and timely results.",
      delay: 0.4
    },
    {
      icon: <Brain className="w-14 h-14" />,
      title: "Neurology",
      desc: "Specialized care for neurological conditions with a multidisciplinary approach.",
      delay: 0.5
    },
    {
      icon: <Baby className="w-14 h-14" />,
      title: "Pediatrics",
      desc: "Dedicated care for children from birth through adolescence in a friendly environment.",
      delay: 0.6
    }
  ];

  return (
    <section id="services" className="pb-[60px] pt-[60px] bg-[#F9FBFC] relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#00B8B8 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="container-custom relative z-10">
        <div className="section-title">
          <span>Our Specialized Services</span>
          <h2 className="text-secondary">Premium Healthcare Services</h2>
          <p className="text-[16px]">
            We provide a wide range of specialized medical services using the latest technology and expert knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[35px]">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: service.delay }}
              className="group bg-white p-[50px] rounded-[25px] border border-gray-100 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:border-primary/20 relative overflow-hidden"
            >
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-[80px] h-[80px] bg-primary/5 rounded-bl-[100px] transition-all duration-500 group-hover:w-full group-hover:h-full group-hover:rounded-none group-hover:bg-primary group-hover:opacity-[0.02]"></div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-[35px] text-primary bg-primary/5 w-[100px] h-[100px] rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-[360deg] shadow-inner">
                  {service.icon}
                </div>
                <h3 className="mb-[20px] text-secondary group-hover:text-primary transition-colors duration-500 text-[26px]">
                  {service.title}
                </h3>
                <p className="text-body leading-[1.8] mb-[30px] text-[16px]">
                  {service.desc}
                </p>
                
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  className="w-[50px] h-[50px] bg-secondary text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 shadow-xl"
                >
                  <Plus className="w-6 h-6" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
