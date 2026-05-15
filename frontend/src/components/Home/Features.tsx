import { motion } from 'framer-motion';
import { Clock, UserCheck, ShieldCheck } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Opening Hours",
      desc: "Available 24/7 for all medical services.",
      delay: 0.1
    },
    {
      icon: <UserCheck className="w-8 h-8 text-primary" />,
      title: "Expert Doctors",
      desc: "Highly qualified and experienced staff.",
      delay: 0.3
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: "Certified Clinic",
      desc: "Safe and effective certified treatments.",
      delay: 0.5
    }
  ];

  return (
    <section className="relative z-20 mt-[-150px]">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[25px]">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: item.delay }}
              className="bg-[#E0F7F7]/90 backdrop-blur-md p-[30px] rounded-[15px] shadow-[0_10px_30px_rgba(0,184,184,0.1)] border border-primary/10 flex items-center gap-[20px] hover:bg-primary/10 transition-all duration-300 group"
            >
              <div className="bg-white p-[12px] rounded-full shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div>
                <h4 className="text-[18px] font-bold text-secondary mb-[4px]">
                  {item.title}
                </h4>
                <p className="text-body text-[14px]">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
