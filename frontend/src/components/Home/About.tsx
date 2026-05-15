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
    <section className="section-padding overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center">
          {/* Left: Images */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[10px] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop" 
                alt="About Medical" 
                className="w-full h-auto"
              />
            </div>
            {/* Experience Badge */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-[30px] -right-[30px] z-20 bg-primary p-[30px] rounded-[10px] text-white text-center shadow-2xl"
            >
              <h2 className="text-white text-[45px] leading-none mb-[5px]">25</h2>
              <span className="text-[14px] uppercase font-bold tracking-[1px]">Years Experience</span>
            </motion.div>
            {/* Decorative shape */}
            <div className="absolute -top-[40px] -left-[40px] w-[150px] h-[150px] bg-primary/10 rounded-full -z-10 animate-float"></div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-title text-left mx-0">
              <span>About Our Hospital</span>
              <h2 className="text-secondary">We Are Here To Care For Your Health</h2>
              <p>
                Our hospital has been providing high-quality medical services for over 25 years. We have a team of expert doctors and modern medical technology to provide the best healthcare services to our patients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[15px] gap-x-[20px] mb-[40px]">
              {points.map((point, index) => (
                <div key={index} className="flex items-center gap-[12px]">
                  <div className="w-[22px] h-[22px] bg-primary rounded-full flex items-center justify-center text-white">
                    <Check className="w-[14px] h-[14px]" />
                  </div>
                  <span className="text-secondary font-semibold text-[17px]">{point}</span>
                </div>
              ))}
            </div>

            <button className="btn-primary">
              Learn More About Us
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
