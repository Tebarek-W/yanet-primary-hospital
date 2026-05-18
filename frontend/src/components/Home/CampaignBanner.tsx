import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, HeartPulse, Sparkles, ChevronLeft, ChevronRight, ArrowRight, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CampaignBannerProps {
  onAppointmentClick: () => void;
}

const CampaignBanner = ({ onAppointmentClick }: CampaignBannerProps) => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const campaigns = [
    {
      badge: t('campaign.flu_badge'),
      title: t('campaign.flu_title'),
      desc: t('campaign.flu_desc'),
      cta: t('campaign.flu_cta'),
      icon: <ShieldCheck className="w-16 h-16 text-sky-400" />,
      bgClass: 'from-sky-950/90 via-slate-900/95 to-sky-950/90 border-sky-500/20',
      glowColor: 'rgba(56,189,248,0.15)',
      badgeClass: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
      ctaClass: 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/20 shadow-lg',
      graphic: (
        <div className="relative w-44 h-44 flex items-center justify-center">
          <div className="absolute inset-0 bg-sky-500/10 rounded-full animate-ping opacity-30"></div>
          <div className="absolute w-36 h-36 border-2 border-dashed border-sky-500/20 rounded-full animate-spin-slow"></div>
          <div className="w-24 h-24 bg-sky-500/10 rounded-full flex items-center justify-center backdrop-blur-md border border-sky-500/30">
            <ShieldCheck className="w-12 h-12 text-sky-400" />
          </div>
        </div>
      )
    },
    {
      badge: t('campaign.wellness_badge'),
      title: t('campaign.wellness_title'),
      desc: t('campaign.wellness_desc'),
      cta: t('campaign.wellness_cta'),
      icon: <HeartPulse className="w-16 h-16 text-emerald-400" />,
      bgClass: 'from-emerald-950/90 via-slate-900/95 to-emerald-950/90 border-emerald-500/20',
      glowColor: 'rgba(52,211,153,0.15)',
      badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      ctaClass: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20 shadow-lg',
      graphic: (
        <div className="relative w-44 h-44 flex items-center justify-center">
          <div className="absolute inset-0 bg-emerald-500/10 rounded-full animate-ping opacity-30"></div>
          <div className="absolute w-36 h-36 border border-emerald-500/30 rounded-[35%] animate-spin-slow"></div>
          <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center backdrop-blur-md border border-emerald-500/30">
            <HeartPulse className="w-12 h-12 text-emerald-400" />
          </div>
        </div>
      )
    },
    {
      badge: t('campaign.maternal_badge'),
      title: t('campaign.maternal_title'),
      desc: t('campaign.maternal_desc'),
      cta: t('campaign.maternal_cta'),
      icon: <Heart className="w-16 h-16 text-rose-400" />,
      bgClass: 'from-rose-950/90 via-slate-900/95 to-rose-950/90 border-rose-500/20',
      glowColor: 'rgba(251,113,133,0.15)',
      badgeClass: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      ctaClass: 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20 shadow-lg',
      graphic: (
        <div className="relative w-44 h-44 flex items-center justify-center">
          <div className="absolute inset-0 bg-rose-500/10 rounded-full animate-ping opacity-30"></div>
          <div className="absolute w-36 h-36 border-2 border-dashed border-rose-500/20 rounded-full animate-spin-slow"></div>
          <div className="w-24 h-24 bg-rose-500/10 rounded-full flex items-center justify-center backdrop-blur-md border border-rose-500/30">
            <Heart className="w-12 h-12 text-rose-400 fill-rose-400/20" />
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % campaigns.length);
    }, 8500); // switch slide every 8.5 seconds
    return () => clearInterval(interval);
  }, [isPaused, campaigns.length]);

  const handlePrev = () => {
    setCurrentSlide(prev => (prev - 1 + campaigns.length) % campaigns.length);
  };

  const handleNext = () => {
    setCurrentSlide(prev => (prev + 1) % campaigns.length);
  };

  return (
    <section className="py-[60px] bg-white relative overflow-hidden">
      <div className="container-custom">
        <div 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className={`relative rounded-[30px] border p-8 md:p-14 bg-gradient-to-r ${campaigns[currentSlide].bgClass} transition-all duration-700 shadow-2xl overflow-hidden`}
        >
          {/* Ambient Glowing Background Core */}
          <div 
            style={{ backgroundColor: campaigns[currentSlide].glowColor }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] transition-all duration-700 pointer-events-none"
          ></div>

          {/* Abstract Grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(255,255,255,0.01)_1.5px,transparent_1.5px)] bg-[size:30px_30px] opacity-20 pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative z-10">
            
            {/* Left Column: Sliding Text Details */}
            <div className="lg:col-span-8 text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className={`flex items-center gap-2 px-4 py-1.5 border rounded-full w-fit mb-6 text-[11px] font-extrabold uppercase tracking-[2px] backdrop-blur-sm ${campaigns[currentSlide].badgeClass}`}>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{campaigns[currentSlide].badge}</span>
                  </div>

                  <h2 className="text-white text-[28px] md:text-[42px] font-black leading-tight mb-4 tracking-tight">
                    {campaigns[currentSlide].title}
                  </h2>

                  <p className="text-white/60 text-[15px] md:text-[16px] leading-relaxed mb-8 max-w-[650px]">
                    {campaigns[currentSlide].desc}
                  </p>

                  <button
                    onClick={onAppointmentClick}
                    className={`flex items-center gap-2 px-7 py-3.5 rounded-full font-extrabold text-[14px] uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 ${campaigns[currentSlide].ctaClass}`}
                  >
                    <span>{campaigns[currentSlide].cta}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Visual Campaign Graphics */}
            <div className="lg:col-span-4 flex justify-center items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 15 }}
                  transition={{ duration: 0.5 }}
                >
                  {campaigns[currentSlide].graphic}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Left/Right Slider Controls */}
          <div className="absolute bottom-6 right-8 flex items-center gap-3 z-20">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-all active:scale-90"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-all active:scale-90"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots Pagination */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 lg:left-14 lg:translate-x-0 flex gap-2 z-20">
            {campaigns.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === i ? 'w-8 bg-white' : 'w-2.5 bg-white/30 hover:bg-white/50'
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampaignBanner;
