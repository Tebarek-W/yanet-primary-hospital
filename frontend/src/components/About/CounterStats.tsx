import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, Award, HeartPulse } from 'lucide-react';

const NetworkAnimation = ({ position }: { position: 'left' | 'right' }) => (
  <motion.div 
    animate={{ 
      y: [0, -20, 0],
      rotate: position === 'left' ? [0, 5, 0] : [0, -5, 0]
    }}
    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    className={`absolute top-0 ${position === 'left' ? 'left-0' : 'right-0'} w-[300px] h-full opacity-20 pointer-events-none z-0`}
  >
    <svg viewBox="0 0 200 400" className="w-full h-full">
      <defs>
        <radialGradient id="dotGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00B8B8" stopOpacity="1" />
          <stop offset="100%" stopColor="#00B8B8" stopOpacity="0" />
        </radialGradient>
      </defs>
      {[...Array(20)].map((_, i) => (
        <React.Fragment key={i}>
          <circle 
            cx={Math.random() * 200} 
            cy={Math.random() * 400} 
            r="2" 
            fill="url(#dotGrad)" 
          />
          <line 
            x1={Math.random() * 200} 
            y1={Math.random() * 400} 
            x2={Math.random() * 200} 
            y2={Math.random() * 400} 
            stroke="#00B8B8" 
            strokeWidth="0.5" 
            strokeDasharray="4 4"
          />
        </React.Fragment>
      ))}
    </svg>
  </motion.div>
);

const CounterItem = ({ icon, target, label, delay }: { icon: any, target: number, label: string, delay: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHasStarted(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [hasStarted, target]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-white p-8 rounded-[10px] shadow-[0_15px_40px_rgba(0,0,0,0.05)] text-center relative z-10 group hover:-translate-y-2 transition-all duration-500"
    >
      <div className="w-[60px] h-[60px] bg-primary/5 rounded-full flex items-center justify-center text-primary mx-auto mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
        {icon}
      </div>
      <div className="text-[36px] font-bold text-secondary mb-1">{count}{target > 50 ? '+' : ''}</div>
      <div className="text-primary font-bold text-[14px] uppercase tracking-wide">{label}</div>
    </motion.div>
  );
};

const CounterStats = () => {
  return (
    <section className="relative section-padding bg-[#f9fdfe] overflow-hidden">
      {/* Network Backgrounds */}
      <NetworkAnimation position="left" />
      <NetworkAnimation position="right" />

      <div className="container-custom relative z-10">
        {/* Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] font-black text-primary/[0.04] select-none pointer-events-none z-0 whitespace-nowrap">
          YANET STATS
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CounterItem 
            icon={<Users className="w-7 h-7" />} 
            target={540} 
            label="Expert Doctors" 
            delay={0.1} 
          />
          <CounterItem 
            icon={<UserCheck className="w-7 h-7" />} 
            target={990} 
            label="Successful Story" 
            delay={0.2} 
          />
          <CounterItem 
            icon={<Award className="w-7 h-7" />} 
            target={3500} 
            label="Global Presence" 
            delay={0.3} 
          />
          <CounterItem 
            icon={<HeartPulse className="w-7 h-7" />} 
            target={54} 
            label="Experiences" 
            delay={0.4} 
          />
        </div>
      </div>
    </section>
  );
};

export default CounterStats;
