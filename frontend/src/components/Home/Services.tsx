import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Activity, Stethoscope, Microscope, Brain, Baby, Eye, FlaskConical, Pill, ShieldCheck, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { servicesData } from '../../data/servicesData';
import type { ServiceDetails } from '../../data/servicesData';
import { api } from '../../utils/api';

const getIcon = (name: string) => {
  switch (name) {
    case 'HeartPulse': return <HeartPulse className="w-14 h-14" />;
    case 'Activity': return <Activity className="w-14 h-14" />;
    case 'Stethoscope': return <Stethoscope className="w-14 h-14" />;
    case 'Microscope': return <Microscope className="w-14 h-14" />;
    case 'Brain': return <Brain className="w-14 h-14" />;
    case 'Baby': return <Baby className="w-14 h-14" />;
    case 'Eye': return <Eye className="w-14 h-14" />;
    case 'FlaskConical': return <FlaskConical className="w-14 h-14" />;
    case 'Pills':
    case 'Pill': return <Pill className="w-14 h-14" />;
    case 'ShieldCheck': return <ShieldCheck className="w-14 h-14" />;
    default: return <Stethoscope className="w-14 h-14" />;
  }
};

const Services = () => {
  const { t } = useTranslation();
  const isAmharic = t('nav.home') === 'መነሻ';

  // Start with first 6 static services as fallback; replace with live data
  const [services, setServices] = useState<ServiceDetails[]>(servicesData.slice(0, 6));

  useEffect(() => {
    api.services.getAll()
      .then((data: ServiceDetails[]) => {
        if (Array.isArray(data) && data.length > 0) {
          // Show first 6 on the home page
          setServices(data.slice(0, 6));
        }
      })
      .catch(() => { /* keep static fallback */ });
  }, []);

  return (
    <section id="services" className="pb-[60px] pt-[60px] bg-[#F9FBFC] relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#00B8B8 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="container-custom relative z-10">
        <div className="section-title">
          <span>{t('home_services.badge')}</span>
          <h2 className="text-secondary">{t('home_services.title')}</h2>
          <p className="text-[16px]">
            {t('home_services.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[35px]">
          {services.map((service, index) => (
            <motion.div
              key={service.slug || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white p-[50px] rounded-[25px] border border-gray-100 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:border-primary/20 relative overflow-hidden"
            >
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-[80px] h-[80px] bg-primary/5 rounded-bl-[100px] transition-all duration-500 group-hover:w-full group-hover:h-full group-hover:rounded-none group-hover:bg-primary group-hover:opacity-[0.02]"></div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-[35px] text-primary bg-primary/5 w-[100px] h-[100px] rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-[360deg] shadow-inner">
                  {getIcon(service.iconName)}
                </div>
                <h3 className="mb-[20px] text-secondary group-hover:text-primary transition-colors duration-500 text-[26px]">
                  {isAmharic ? service.titleAm : service.title}
                </h3>
                <p className="text-body leading-[1.8] mb-[30px] text-[16px]">
                  {isAmharic ? service.descAm : service.desc}
                </p>
                
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  className="w-[50px] h-[50px] bg-secondary text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 shadow-xl"
                >
                  <Plus className="w-6 h-6" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
