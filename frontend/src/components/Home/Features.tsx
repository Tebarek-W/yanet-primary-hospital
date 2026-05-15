import { motion } from 'framer-motion';
import { Clock, UserCheck, ShieldCheck } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Clock className="w-10 h-10 text-primary" />,
      title: "Opening Hours",
      desc: "We are available 24/7 to provide medical services to our patients.",
      btnText: "Learn More",
      delay: 0.1
    },
    {
      icon: <UserCheck className="w-10 h-10 text-primary" />,
      title: "Expert Doctors",
      desc: "Our doctors are highly qualified and experienced in their fields.",
      btnText: "View Doctors",
      delay: 0.3
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-primary" />,
      title: "Certified Clinic",
      desc: "We are a certified medical clinic providing safe and effective treatments.",
      btnText: "Our Story",
      delay: 0.5
    }
  ];

  return (
    <section className="features-overlap">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: item.delay }}
              className="feature-card-premium group"
            >
              <div className="mb-[25px] inline-block p-[15px] rounded-[10px] bg-primary/10 transition-colors duration-500 group-hover:bg-primary">
                <div className="transition-colors duration-500 group-hover:text-white">
                  {item.icon}
                </div>
              </div>
              <h3 className="mb-[15px] group-hover:text-primary transition-colors duration-500">
                {item.title}
              </h3>
              <p className="mb-[25px] text-body leading-[1.8]">
                {item.desc}
              </p>
              <button className="text-primary font-bold uppercase tracking-[1px] text-[14px] flex items-center gap-[10px] group-hover:gap-[15px] transition-all duration-300">
                {item.btnText}
                <span>→</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
