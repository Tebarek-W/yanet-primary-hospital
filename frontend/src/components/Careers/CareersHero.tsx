import React from 'react';
import { motion } from 'framer-motion';
import { Search, Briefcase, Award, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CareersHeroProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  totalJobs: number;
}

const CareersHero: React.FC<CareersHeroProps> = ({ searchQuery, setSearchQuery, totalJobs }) => {
  const { t } = useTranslation();

  return (
    <div className="relative bg-secondary pt-[160px] pb-[100px] overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2" />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6"
          >
            <Briefcase size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">
              {t('careers.badge', 'Join Our Medical Family')}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight"
          >
            {t('careers.title', 'Shape the Future of')} <span className="text-primary">{t('careers.title_highlight', 'Healthcare in Ethiopia')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {t('careers.subtitle', 'We are looking for passionate doctors, compassionate nurses, skilled technologists, and brilliant minds dedicated to delivering exceptional medical care.')}
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white p-3 rounded-2xl shadow-2xl max-w-xl mx-auto flex items-center gap-3 relative"
          >
            <div className="pl-3 text-gray-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('careers.search_placeholder', 'Search by job title, keyword, or specialty...')}
              className="w-full bg-transparent border-none py-2.5 pr-4 text-gray-800 placeholder:text-gray-400 text-sm font-medium focus:outline-none focus:ring-0"
            />
            <div className="hidden sm:flex items-center px-4 py-2 bg-gray-100 rounded-xl text-gray-600 text-xs font-bold shrink-0">
              {totalJobs} {t('careers.active_positions', 'Active Positions')}
            </div>
          </motion.div>

          {/* Stats Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 pt-12 border-t border-white/10 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                <Users size={24} />
              </div>
              <div className="text-left">
                <h4 className="text-white font-black text-xl">250+</h4>
                <p className="text-white/60 text-xs">{t('careers.stat_staff', 'Expert Medical Staff')}</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                <Award size={24} />
              </div>
              <div className="text-left">
                <h4 className="text-white font-black text-xl">24/7</h4>
                <p className="text-white/60 text-xs">{t('careers.stat_care', 'Advanced Patient Care')}</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                <Briefcase size={24} />
              </div>
              <div className="text-left">
                <h4 className="text-white font-black text-xl">{totalJobs}</h4>
                <p className="text-white/60 text-xs">{t('careers.stat_openings', 'Open Opportunities')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersHero;
