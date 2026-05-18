import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, HeartPulse, Briefcase, GraduationCap, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { internshipPrograms } from '../../data/careersData';

const InternshipSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isAmharic = i18n.language.startsWith('am');

  const getIcon = (name: string) => {
    switch (name) {
      case 'Stethoscope': return <Stethoscope className="w-8 h-8 text-primary" />;
      case 'HeartPulse': return <HeartPulse className="w-8 h-8 text-primary" />;
      case 'Briefcase': return <Briefcase className="w-8 h-8 text-primary" />;
      default: return <GraduationCap className="w-8 h-8 text-primary" />;
    }
  };

  return (
    <div className="py-[100px] bg-white relative overflow-hidden border-b border-gray-100">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary text-xs font-bold uppercase tracking-[3px] mb-2 block">
            {t('careers.future_leaders', 'Future Healthcare Leaders')}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-secondary mb-4 tracking-tight">
            {t('careers.intern_title', 'Internships & Residency Programs')}
          </h2>
          <p className="text-gray-600 font-medium text-lg leading-relaxed max-w-2xl mx-auto">
            {t('careers.intern_desc', 'Yanet Primary Hospital is committed to academic excellence. We provide rigorous clinical rotations, mentorship, and practical training for the next generation of healthcare professionals.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {internshipPrograms.map((prog, idx) => {
            const title = isAmharic ? prog.titleAm : prog.title;
            const desc = isAmharic ? prog.descAm : prog.desc;
            const duration = isAmharic ? prog.durationAm : prog.duration;

            return (
              <motion.div
                key={prog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-gray-50/80 rounded-3xl p-8 border border-gray-100 hover:border-primary/30 hover:bg-white hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {getIcon(prog.icon)}
                  </div>
                  
                  <span className="inline-block px-3 py-1 bg-white text-gray-700 font-bold text-xs rounded-full shadow-sm mb-4 border border-gray-100">
                    {duration}
                  </span>

                  <h3 className="text-xl font-black text-secondary mb-3 group-hover:text-primary transition-colors">
                    {title}
                  </h3>

                  <p className="text-gray-600 text-sm font-medium leading-relaxed mb-6">
                    {desc}
                  </p>
                </div>

                <a
                  href="mailto:academic@yanetprimaryhospital.com"
                  className="inline-flex items-center gap-2 font-bold text-sm text-primary hover:text-primary-hover group/link"
                >
                  <span>{t('careers.inquire_prog', 'Inquire About Program')}</span>
                  <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InternshipSection;
