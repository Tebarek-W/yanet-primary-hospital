import { motion } from 'framer-motion';
import { ShieldCheck, Award, CheckCircle2, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Certifications = () => {
  const { t } = useTranslation();
  const isAmharic = t('nav.home') === 'መነሻ';

  const certs = [
    {
      key: 'fmhaca',
      icon: <ShieldCheck className="w-8 h-8" />,
      color: 'text-primary',
      bg: 'bg-primary/5',
      border: 'hover:border-primary/30'
    },
    {
      key: 'iso',
      icon: <Award className="w-8 h-8" />,
      color: 'text-secondary',
      bg: 'bg-secondary/5',
      border: 'hover:border-secondary/30'
    },
    {
      key: 'nqs',
      icon: <CheckCircle2 className="w-8 h-8" />,
      color: 'text-teal-600',
      bg: 'bg-teal-50',
      border: 'hover:border-teal-500/30'
    },
    {
      key: 'ema',
      icon: <Heart className="w-8 h-8" />,
      color: 'text-rose-500',
      bg: 'bg-rose-50',
      border: 'hover:border-rose-500/30'
    }
  ];

  return (
    <section className="section-padding bg-[#f4f8fb] relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="section-title !mb-[50px] text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[100px] font-black text-primary/[0.04] select-none pointer-events-none z-0 whitespace-nowrap uppercase">
            {isAmharic ? 'ዕውቅናዎች' : 'CREDENTIALS'}
          </div>
          <span className="relative z-10 text-primary font-bold uppercase tracking-wider text-[11px] !bg-transparent !p-0">
            {t('about_certifications.badge')}
          </span>
          <h2 className="relative z-10 text-[32px] font-bold text-secondary mt-2">
            {t('about_certifications.title')}
          </h2>
          <p className="relative z-10 text-[#5d666e] mt-3 max-w-[650px] mx-auto text-[14px]">
            {t('about_certifications.desc')}
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.key}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{ y: -5 }}
              className={`bg-white rounded-[10px] p-6 border border-gray-100/80 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.05)] transition-all duration-500 flex flex-col items-center text-center group ${cert.border}`}
            >
              {/* Icon Bubble */}
              <div className={`w-16 h-16 rounded-2xl ${cert.bg} ${cert.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500`}>
                {cert.icon}
              </div>

              {/* Title & Desc */}
              <h3 className="text-[17px] font-bold text-secondary mb-2 group-hover:text-primary transition-colors duration-300">
                {t(`about_certifications.items.${cert.key}.title`)}
              </h3>
              <p className="text-[#5d666e] text-[13.5px] leading-relaxed">
                {t(`about_certifications.items.${cert.key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
