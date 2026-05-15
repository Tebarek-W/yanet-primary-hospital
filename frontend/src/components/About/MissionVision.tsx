import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, Stethoscope, HeartPulse, Activity } from 'lucide-react';

const MissionVision = () => {
  const items = [
    {
      title: "Our Mission",
      desc: "To deliver high-quality, accessible, and patient-centered healthcare services that ensure the well-being of our community.",
      icon: <Stethoscope className="w-8 h-8" />,
      color: "bg-primary",
      accent: "text-primary"
    },
    {
      title: "Our Vision",
      desc: "To be the leading healthcare provider recognized for medical excellence, innovation, and compassionate patient-focused care.",
      icon: <Activity className="w-8 h-8" />,
      color: "bg-secondary",
      accent: "text-secondary"
    },
    {
      title: "Core Values",
      desc: "Integrity, Excellence, Compassion, and Innovation guide every action we take for our patients and their families.",
      icon: <ShieldCheck className="w-8 h-8" />,
      color: "bg-teal-600",
      accent: "text-teal-600"
    }
  ];

  return (
    <section className="section-padding bg-[#f4f8fb] relative overflow-hidden">
      {/* Background Animated Shapes */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute -bottom-20 -right-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="container-custom relative z-10">
        <div className="section-title !mb-[40px] relative">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[80px] font-black text-primary/[0.05] select-none pointer-events-none z-0">
            GOALS
          </span>
          <span className="relative z-10 text-primary font-bold uppercase tracking-wider text-[11px] !bg-transparent !p-0">Our Philosophy</span>
          <h2 className="relative z-10 text-[28px] font-bold text-secondary mt-1">Mission, Vision & Values</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -10 }}
              className="bg-white p-6 rounded-[12px] shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 group border border-gray-50 flex flex-col items-center text-center h-full"
            >
              <div className={`w-[55px] h-[55px] ${item.color} rounded-2xl flex items-center justify-center text-white mb-5 group-hover:rotate-[360deg] transition-all duration-1000 shadow-lg`}>
                {item.icon}
              </div>
              <h3 className={`text-[18px] font-bold mb-2 ${item.accent}`}>{item.title}</h3>
              <p className="text-[#5d666e] text-[13.5px] leading-relaxed">
                {item.desc}
              </p>
              
              {/* Decorative Pulse Line */}
              <div className="mt-auto pt-5 w-full flex justify-center opacity-30 group-hover:opacity-100 transition-opacity">
                <HeartPulse className={`w-6 h-6 ${item.accent} animate-pulse`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
