import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Heart, Stethoscope, Activity, Plus, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import VideoModal from './VideoModal';

const SolarSystem = () => {
  return (
    <>
      {/* Primary System */}
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[950px] pointer-events-none z-0 will-change-transform">
        {/* Vibrant Multi-tone Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[80px] animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-pink-500/10 rounded-full blur-[60px]"></div>
        
        {/* Orbit 1 - Heart (Pink/Red) */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ translateZ: 0 }}
          className="absolute inset-[0%] border border-pink-500/30 rounded-full border-dashed will-change-transform"
        >
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ translateZ: 0 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-pink-500 to-red-600 rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(236,72,153,0.7)] border border-white/30 will-change-transform"
          >
            <Heart className="w-4 h-4 fill-white" />
          </motion.div>
        </motion.div>

        {/* Orbit 2 - Stethoscope (Teal/Cyan) */}
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          style={{ translateZ: 0 }}
          className="absolute inset-[20%] border border-cyan-400/30 rounded-full will-change-transform"
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            style={{ translateZ: 0 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-10 h-10 bg-gradient-to-br from-primary to-cyan-400 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(0,184,184,0.7)] border border-white/30 will-change-transform"
          >
            <Stethoscope className="w-5 h-5" />
          </motion.div>
        </motion.div>

        {/* Orbit 3 - Activity (Amber/Orange) */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ translateZ: 0 }}
          className="absolute inset-[38%] border border-amber-400/30 rounded-full border-dashed will-change-transform"
        >
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ translateZ: 0 }}
            className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(251,191,36,0.6)] border border-white/30 will-change-transform"
          >
            <Activity className="w-3.5 h-3.5" />
          </motion.div>
        </motion.div>

        {/* Orbit 4 - Plus (Indigo/Purple) */}
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          style={{ translateZ: 0 }}
          className="absolute inset-[52%] border border-indigo-400/20 rounded-full will-change-transform"
        >
          <div className="absolute top-[20%] left-0 -translate-x-1/2 w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_8px_rgba(0,184,184,0.8)]"></div>
          <div className="absolute bottom-[20%] right-0 translate-x-1/2 w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            style={{ translateZ: 0 }}
            className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-[0_0_12px_rgba(99,102,241,0.7)] border border-white/20 will-change-transform"
          >
            <Plus className="w-3 h-3" />
          </motion.div>
        </motion.div>
      </div>

      {/* Secondary System (Enhanced Color) */}
      <div className="absolute top-[75%] left-[25%] -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] pointer-events-none z-[-1] opacity-40 scale-75 blur-[40px] will-change-transform">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-secondary/40 rounded-full blur-[80px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-pink-500/20 rounded-full blur-[60px] animate-pulse"></div>
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          style={{ translateZ: 0 }}
          className="absolute inset-[0%] border border-pink-400/20 rounded-full border-dashed will-change-transform"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-gradient-to-br from-pink-400 to-rose-600 rounded-full shadow-[0_0_12px_rgba(236,72,153,0.8)]"></div>
        </motion.div>
      </div>

      {/* Tertiary System (Enhanced Color) */}
      <div className="absolute top-[20%] left-[85%] -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] pointer-events-none z-[-1] opacity-30 scale-50 blur-[30px] will-change-transform">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 rounded-full blur-[70px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-amber-400/10 rounded-full blur-[50px] animate-pulse"></div>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          style={{ translateZ: 0 }}
          className="absolute inset-[0%] border border-cyan-400/20 rounded-full border-dashed will-change-transform"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.8)]"></div>
        </motion.div>
      </div>
    </>
  );
};

interface HeroProps {
  onAppointmentClick: () => void;
  cmsData?: Record<string, any> | null;
}

const Hero = ({ onAppointmentClick, cmsData }: HeroProps) => {
  const { t } = useTranslation();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative h-[700px] lg:h-[800px] flex items-start pt-[100px] lg:pt-[120px] overflow-hidden bg-secondary">
      {/* Dynamic Background with improved overlay */}
      <motion.div 
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url("${cmsData?.hero_bg_image || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop'}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent"></div>
      </motion.div>

      {/* Optimized Floating Orbs */}
      <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] animate-pulse-soft"></div>
      <div className="absolute bottom-[20%] right-[30%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] animate-pulse-soft"></div>

      <div className="container-custom relative z-10 pt-0 mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-[60px]">
          {/* Left Side: Content */}
          <div className="max-w-[700px]">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              className="flex items-center gap-4 mb-[20px]"
            >
              <div className="w-[3px] h-[20px] bg-primary"></div>
              <span className="text-white text-[13px] font-extrabold uppercase tracking-[3px]">
                <span className="bg-primary text-secondary px-1.5 py-0.5 rounded mr-2 text-[11px]">24/7</span>
                {t('hero.badge')}
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, type: "spring", bounce: 0.4 }}
              className="text-white mb-[20px] leading-[1.1] font-extrabold tracking-tighter !text-[30px] md:!text-[42px] lg:!text-[52px]"
            >
              {cmsData?.hero_title ? (
                cmsData.hero_title
              ) : (
                <>
                  {t('hero.title_part1')} <span className="gradient-text">{t('hero.title_span')}</span> <br /> {t('hero.title_part2')}
                </>
              )}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-[14px] md:text-[16px] mb-[35px] text-white/80 leading-[1.6] font-light max-w-[550px]"
            >
              {cmsData?.hero_subtitle || t('hero.desc')}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap items-center gap-[25px]"
            >
              <button 
                onClick={onAppointmentClick}
                className="btn-primary flex items-center gap-3 group shadow-xl shadow-primary/20"
              >
                {cmsData?.hero_cta_text || t('hero.cta_appointment')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
              
              <div 
                className="flex items-center gap-4 group cursor-pointer"
                onClick={() => setIsVideoOpen(true)}
              >
                <div className="w-[60px] h-[60px] bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/20 group-hover:bg-primary transition-all duration-500">
                  <Play className="w-6 h-6 text-white fill-white" />
                </div>
                <span className="text-white font-bold tracking-wider group-hover:text-primary transition-colors">{t('hero.cta_video')}</span>
              </div>

              {/* Glowing Emergency Call Pill */}
              <a 
                href={`tel:${t('common.emergency_call').replace(/\s+/g, '')}`}
                className="flex items-center gap-3 bg-red-500/15 border border-red-500/40 rounded-full px-5 py-2.5 hover:bg-red-600 hover:border-red-600 hover:scale-105 transition-all duration-300 backdrop-blur-md group/phone shadow-lg shadow-red-500/10 animate-pulse-soft"
              >
                <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white shrink-0 group-hover/phone:bg-white group-hover/phone:text-red-600 transition-colors shadow-md">
                  <Phone className="w-4 h-4 fill-white group-hover/phone:fill-red-600" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-red-300 group-hover/phone:text-red-100 font-extrabold text-[10px] uppercase tracking-wider leading-none mb-1">{t('common.emergency')}</span>
                  <span className="text-white font-black text-[15px] leading-none">{t('common.emergency_call')}</span>
                </div>
              </a>
            </motion.div>
          </div>

          {/* Right Side: Doctor Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.5, type: "spring" }}
            className="hidden lg:block relative mt-[60px]"
          >
            <SolarSystem />
            <div className="relative z-10 flex justify-end">
              <img 
                src="/doctor_new.png" 
                alt="Ethiopian Doctor" 
                className="w-auto h-auto max-h-none scale-[1.3] origin-bottom object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] animate-float relative z-10 brightness-[1.1] contrast-[1.05]"
              />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Modern Wave Separator */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[80px] fill-white">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113,2,1200,34.72V0Z" opacity=".5"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".25"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>

      <VideoModal 
        isOpen={isVideoOpen} 
        onClose={() => setIsVideoOpen(false)} 
        videoUrl="https://www.youtube.com/embed/vJ8WzMfqSXc" 
      />
    </section>
  );
};


export default Hero;
