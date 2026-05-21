import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Building2, Stethoscope, Activity, HeartHandshake, Laptop, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TimelineProps {
  cmsData?: Record<string, any> | null;
}

interface MilestoneEntry {
  year: string;
  event: string;
}

const Timeline = ({ cmsData }: TimelineProps) => {
  const { t } = useTranslation();
  const isAmharic = t('nav.home') === 'መነሻ';

  const iconMap: Record<string, { icon: any; color: string; bgLight: string }> = {
    '2020': { icon: <Building2 className="w-8 h-8" />, color: 'text-primary', bgLight: 'bg-primary/10' },
    '2021': { icon: <Stethoscope className="w-8 h-8" />, color: 'text-secondary', bgLight: 'bg-secondary/10' },
    '2022': { icon: <Activity className="w-8 h-8" />, color: 'text-teal-600', bgLight: 'bg-teal-50' },
    '2023': { icon: <HeartHandshake className="w-8 h-8" />, color: 'text-rose-500', bgLight: 'bg-rose-50' },
    '2024': { icon: <Laptop className="w-8 h-8" />, color: 'text-indigo-600', bgLight: 'bg-indigo-50' },
    '2025': { icon: <Award className="w-8 h-8" />, color: 'text-amber-500', bgLight: 'bg-amber-50' },
  };
  const fallbackIconStyle = { icon: <Award className="w-8 h-8" />, color: 'text-primary', bgLight: 'bg-primary/10' };

  // Parse dynamic milestones from CMS or fall back to static year list
  const [milestones, setMilestones] = useState<MilestoneEntry[]>([]);

  useEffect(() => {
    if (cmsData?.timeline_json) {
      try {
        const parsed: MilestoneEntry[] = JSON.parse(cmsData.timeline_json);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMilestones(parsed);
          return;
        }
      } catch {
        // fall through to static
      }
    }
    // Static fallback years
    setMilestones([
      { year: '2020', event: t(`about_timeline.years.2020.title`) },
      { year: '2021', event: t(`about_timeline.years.2021.title`) },
      { year: '2022', event: t(`about_timeline.years.2022.title`) },
      { year: '2023', event: t(`about_timeline.years.2023.title`) },
      { year: '2024', event: t(`about_timeline.years.2024.title`) },
      { year: '2025', event: t(`about_timeline.years.2025.title`) },
    ]);
  }, [cmsData, t]);

  const [selectedYear, setSelectedYear] = useState('2020');

  // Sync selectedYear when milestones change
  useEffect(() => {
    if (milestones.length > 0 && !milestones.find(m => m.year === selectedYear)) {
      setSelectedYear(milestones[0].year);
    }
  }, [milestones, selectedYear]);

  const activeMilestone = milestones.find(m => m.year === selectedYear);
  const activeStyle = iconMap[selectedYear] || fallbackIconStyle;

  return (
    <section className="section-padding bg-[#f9fdfe] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="section-title !mb-[50px] text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[100px] font-black text-primary/[0.04] select-none pointer-events-none z-0 whitespace-nowrap uppercase">
            {isAmharic ? 'ጉዟችን' : 'OUR HISTORY'}
          </div>
          <span className="relative z-10 text-primary font-bold uppercase tracking-wider text-[11px] !bg-transparent !p-0">
            {cmsData?.timeline_title ? cmsData.timeline_title : t('about_timeline.badge')}
          </span>
          <h2 className="relative z-10 text-[32px] font-bold text-secondary mt-2">
            {t('about_timeline.title')}
          </h2>
          <p className="relative z-10 text-[#5d666e] mt-3 max-w-[650px] mx-auto text-[14px]">
            {t('about_timeline.desc')}
          </p>
        </div>

        {/* Timeline Interaction Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mt-12">
          {/* Left: Interactive Navigation Track */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col justify-between items-center relative py-4 overflow-x-auto lg:overflow-x-visible no-scrollbar gap-4 w-full">
            {/* Connecting line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 lg:top-0 lg:bottom-0 lg:left-1/2 lg:w-0.5 lg:h-full lg:-translate-x-1/2 z-0 hidden sm:block" />

            {milestones.map((milestone) => {
              const isActive = selectedYear === milestone.year;
              return (
                <button
                  key={milestone.year}
                  onClick={() => setSelectedYear(milestone.year)}
                  className="relative z-10 flex flex-col lg:flex-row items-center gap-2 lg:gap-4 group focus:outline-none shrink-0"
                >
                  <motion.div
                    animate={{
                      scale: isActive ? 1.25 : 1,
                      backgroundColor: isActive ? 'var(--color-primary, #00B8B8)' : '#FFFFFF',
                      borderColor: isActive ? 'var(--color-primary, #00B8B8)' : '#E5E7EB',
                    }}
                    className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-bold text-[14px] shadow-sm transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-secondary hover:border-primary/50'
                    }`}
                  >
                    {milestone.year.slice(-2)}
                  </motion.div>
                  <span
                    className={`text-[15px] font-bold transition-all duration-300 hidden lg:inline-block ${
                      isActive ? 'text-primary scale-105' : 'text-[#8c949c] group-hover:text-secondary'
                    }`}
                  >
                    {milestone.year}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Milestone Card Display */}
          <div className="lg:col-span-8 w-full min-h-[300px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedYear}
                initial={{ opacity: 0, x: 20, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.98 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="bg-white p-8 sm:p-10 rounded-[12px] border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.03)] w-full relative overflow-hidden group hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500"
              >
                {/* Year Watermark */}
                <div className="absolute -top-10 -right-6 text-[120px] font-black text-[#f4f7f6] select-none pointer-events-none group-hover:text-[#ebf0ee] transition-colors duration-500">
                  {selectedYear}
                </div>

                <div className="flex flex-col sm:flex-row gap-6 items-start relative z-10">
                  <div className={`p-4 rounded-2xl ${activeStyle.bgLight} ${activeStyle.color} flex items-center justify-center shrink-0`}>
                    {activeStyle.icon}
                  </div>
                  <div>
                    <span className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-[11px] mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      {selectedYear} {isAmharic ? 'እ.ኤ.አ' : 'Milestone'}
                    </span>
                    <h3 className="text-[22px] font-bold text-secondary mb-3 leading-tight">
                      {activeMilestone?.event || t(`about_timeline.years.${selectedYear}.title`)}
                    </h3>
                    <p className="text-[#5d666e] text-[14.5px] leading-relaxed max-w-[550px]">
                      {t(`about_timeline.years.${selectedYear}.desc`)}
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gray-100 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-primary"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;

