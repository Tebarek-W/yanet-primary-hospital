import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Users, UserCheck, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HomeStats = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  
  // Trigger count-up when 20% of the section enters the viewport
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const [patients, setPatients] = useState(0);
  const [doctors, setDoctors] = useState(0);
  const [branches, setBranches] = useState(0);
  const [hasUpdated, setHasUpdated] = useState(false);
  const [isCountingFinished, setIsCountingFinished] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1600; // Smooth 1.6 second count-up duration
    const targetPatients = 124582;
    const targetDoctors = 184;
    const targetBranches = 6;
    
    let animationFrameId: number;
    const startTime = performance.now();

    const animateStats = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Quadratic ease-out formula for buttery-smooth deceleration
      const easeProgress = progress * (2 - progress);

      setPatients(Math.floor(easeProgress * targetPatients));
      setDoctors(Math.floor(easeProgress * targetDoctors));
      setBranches(Math.round(easeProgress * targetBranches));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateStats);
      } else {
        setPatients(targetPatients);
        setDoctors(targetDoctors);
        setBranches(targetBranches);
        setIsCountingFinished(true);
      }
    };

    animationFrameId = requestAnimationFrame(animateStats);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView]);

  useEffect(() => {
    if (!isCountingFinished) return;

    // Periodic updates for patients served to simulate live updates (after counting finishes)
    const interval = setInterval(() => {
      setPatients(prev => {
        const increment = Math.floor(Math.random() * 2) + 1;
        setHasUpdated(true);
        setTimeout(() => setHasUpdated(false), 1000);
        return prev + increment;
      });
    }, 7000); // update every 7 seconds

    return () => clearInterval(interval);
  }, [isCountingFinished]);

  return (
    <section ref={sectionRef} className="relative py-[45px] bg-secondary overflow-hidden">
      {/* Premium Visual Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,184,184,0.08),transparent_40%)]"></div>
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 translate-y-1">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] fill-white">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
        </svg>
      </div>

      <div className="max-w-[950px] mx-auto px-6 relative z-10">
        {/* Live Indicator Pill */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full w-fit mx-auto mb-5 shadow-[0_0_12px_rgba(16,185,129,0.08)]"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-400 font-extrabold text-[10px] uppercase tracking-[1.5px]">{t('stats_live.live_indicator')}</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
          {/* Patients Served Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`bg-white/5 backdrop-blur-xl border p-[20px_25px] rounded-[16px] text-center flex flex-col items-center justify-center transition-all duration-500 shadow-xl relative overflow-hidden ${
              hasUpdated 
                ? 'border-emerald-500/30 bg-emerald-500/5 scale-[1.01]' 
                : 'border-white/10 hover:border-primary/20'
            }`}
          >
            <div className={`w-[44px] h-[44px] rounded-full flex items-center justify-center mb-3 transition-all duration-500 shrink-0 ${
              hasUpdated 
                ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                : 'bg-primary/10 text-primary'
            }`}>
              <Users className="w-5 h-5" />
            </div>
            
            <AnimatePresence mode="wait">
              <motion.span 
                key={patients}
                initial={{ opacity: 0.8, y: -3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0.8, y: 3 }}
                transition={{ duration: 0.2 }}
                className={`text-[28px] lg:text-[32px] font-black tracking-tight leading-none mb-1.5 transition-colors duration-500 block ${
                  hasUpdated ? 'text-emerald-400' : 'text-white'
                }`}
              >
                {patients.toLocaleString()}+
              </motion.span>
            </AnimatePresence>

            <span className="text-white/50 font-bold uppercase tracking-wider text-[11px]">{t('stats_live.patients_served')}</span>
            
            {/* Soft pulsing green ring under Patients Served when updating */}
            {hasUpdated && (
              <div className="absolute inset-0 border border-emerald-500/40 rounded-[16px] pointer-events-none animate-pulse-soft"></div>
            )}
          </motion.div>

          {/* Doctors Count Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-[20px_25px] rounded-[16px] text-center flex flex-col items-center justify-center hover:border-primary/20 transition-all duration-500 shadow-xl"
          >
            <div className="w-[44px] h-[44px] bg-primary/10 rounded-full flex items-center justify-center text-primary mb-3 shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <span className="text-white text-[28px] lg:text-[32px] font-black tracking-tight leading-none mb-1.5 block">
              {doctors.toLocaleString()}+
            </span>
            <span className="text-white/50 font-bold uppercase tracking-wider text-[11px]">{t('stats_live.doctors_staff')}</span>
          </motion.div>

          {/* Branches Count Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-[20px_25px] rounded-[16px] text-center flex flex-col items-center justify-center hover:border-primary/20 transition-all duration-500 shadow-xl"
          >
            <div className="w-[44px] h-[44px] bg-primary/10 rounded-full flex items-center justify-center text-primary mb-3 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-white text-[28px] lg:text-[32px] font-black tracking-tight leading-none mb-1.5 block">
              {branches}
            </span>
            <span className="text-white/50 font-bold uppercase tracking-wider text-[11px]">{t('stats_live.branches')}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeStats;
