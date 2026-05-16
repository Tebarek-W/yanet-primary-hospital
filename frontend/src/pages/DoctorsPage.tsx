import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Breadcrumb from '../components/About/Breadcrumb';
import DoctorsList from '../components/Doctors/DoctorsList';
import CTABanner from '../components/About/CTABanner';

const DoctorsPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white relative overflow-hidden">
      <Breadcrumb title={t('doctors_page.title')} />
      
      {/* Intro Section */}
      <section className="pt-24 pb-16 relative">
        {/* Subtle Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none overflow-hidden select-none z-0 flex items-center justify-center">
          <span className="text-[12vw] font-black text-primary/[0.03] whitespace-nowrap uppercase tracking-tighter">
            YANET DOCTORS
          </span>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-tr from-secondary/5 to-transparent pointer-events-none"></div>

        <div className="container-custom relative z-10">
          <div className="max-w-[800px] mx-auto text-center">
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-bold tracking-[3px] uppercase text-[12px] mb-6 block"
            >
              {t('home_doctors.badge')}
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[36px] md:text-[48px] font-bold text-secondary mb-8 leading-tight"
            >
              {t('home_doctors.title')}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[#5d666e] text-[17px] md:text-[19px] leading-relaxed max-w-[700px] mx-auto"
            >
              {t('home_doctors.desc')}
            </motion.p>
          </div>
        </div>
      </section>

      <div className="relative z-10 bg-white">
        <DoctorsList />
      </div>
      
      <CTABanner />
    </div>
  );
};

export default DoctorsPage;
