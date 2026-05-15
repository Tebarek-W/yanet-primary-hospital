import { motion } from 'framer-motion';
import { HeartPulse, Activity, Stethoscope, Microscope, Brain, Baby } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <HeartPulse className="w-12 h-12" />,
      title: "Cardiology",
      desc: "Comprehensive heart care with modern diagnostic tools and experienced cardiologists.",
      delay: 0.1
    },
    {
      icon: <Activity className="w-12 h-12" />,
      title: "Diagnostic",
      desc: "Advanced diagnostic services including X-ray, MRI, and full laboratory testing.",
      delay: 0.2
    },
    {
      icon: <Stethoscope className="w-12 h-12" />,
      title: "General Surgery",
      desc: "Expert surgical procedures with minimal invasive techniques and care.",
      delay: 0.3
    },
    {
      icon: <Microscope className="w-12 h-12" />,
      title: "Laboratory",
      desc: "State-of-the-art laboratory services for accurate and timely results.",
      delay: 0.4
    },
    {
      icon: <Brain className="w-12 h-12" />,
      title: "Neurology",
      desc: "Specialized care for neurological conditions with a multidisciplinary approach.",
      delay: 0.5
    },
    {
      icon: <Baby className="w-12 h-12" />,
      title: "Pediatrics",
      desc: "Dedicated care for children from birth through adolescence in a friendly environment.",
      delay: 0.6
    }
  ];

  return (
    <section className="section-padding bg-light-bg">
      <div className="container-custom">
        <div className="section-title">
          <span>Our Best Services</span>
          <h2 className="text-secondary">We Provide Best Healthcare Services</h2>
          <p>
            Our medical services are designed to meet all your healthcare needs with professionalism and care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: service.delay }}
              className="service-card-premium group"
            >
              <div className="mb-[30px] flex justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                {service.icon}
              </div>
              <h3 className="mb-[20px] text-secondary group-hover:text-primary transition-colors duration-500">
                {service.title}
              </h3>
              <p className="text-body leading-[1.8] mb-[25px]">
                {service.desc}
              </p>
              <button className="text-primary font-bold uppercase text-[14px] flex items-center gap-[8px] mx-auto opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                Read More <span>+</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
