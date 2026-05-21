import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartPulse, Activity, Stethoscope, Brain, Baby, Eye, FlaskConical, Pill, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ServicesHero from '../components/Services/ServicesHero';
import { servicesData } from '../data/servicesData';
import type { ServiceDetails } from '../data/servicesData';
import { api } from '../utils/api';

interface ServicesPageProps {
  onAppointmentClick: () => void;
}

const getIcon = (name: string) => {
  switch (name) {
    case 'HeartPulse': return <HeartPulse className="w-7 h-7" />;
    case 'Activity': return <Activity className="w-7 h-7" />;
    case 'Stethoscope': return <Stethoscope className="w-7 h-7" />;
    case 'Brain': return <Brain className="w-7 h-7" />;
    case 'Baby': return <Baby className="w-7 h-7" />;
    case 'Eye': return <Eye className="w-7 h-7" />;
    case 'FlaskConical': return <FlaskConical className="w-7 h-7" />;
    case 'Pills':
    case 'Pill': return <Pill className="w-7 h-7" />;
    case 'ShieldCheck': return <ShieldCheck className="w-7 h-7" />;
    default: return <Stethoscope className="w-7 h-7" />;
  }
};

const ServicesPage = ({ onAppointmentClick }: ServicesPageProps) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'department' | 'service'>('department');
  const [services, setServices] = useState<ServiceDetails[]>([...servicesData]);
  const isAmharic = t('nav.home') === 'መነሻ';

  useEffect(() => {
    api.services.getAll()
      .then((data: ServiceDetails[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(data);
        }
      })
      .catch(() => { /* keep static fallback */ });
  }, []);

  const filteredServices = services.filter(s => s.category === activeTab);

  return (
    <>
      <ServicesHero />

      {/* Services Section */}
      <section className="pt-[80px] pb-[80px] bg-[#f9fdfe] relative overflow-hidden">
        {/* Decorative background grids */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container-custom relative z-10">
          {/* Section Header */}
          <div className="section-title text-center !mb-8">
            <span className="text-primary font-bold uppercase tracking-wider text-[11px]">
              {isAmharic ? 'የእኛ የሕክምና አገልግሎቶች' : 'OUR MEDICAL PORTFOLIO'}
            </span>
            <h2 className="text-secondary text-[32px] font-bold mt-2">
              {isAmharic ? 'የሆስፒታላችን የሕክምና ክፍሎች እና አገልግሎቶች' : 'Specialized Healthcare Excellence'}
            </h2>
            <p className="text-[14px] text-[#5d666e] max-w-[650px] mx-auto mt-3">
              {isAmharic 
                ? 'ያኔት ሆስፒታል ዘመናዊ የህክምና መሣሪያዎችን እና የዘርፉን ባለሙያ ዶክተሮች በማቀናጀት ሁለንተናዊ የጤና እንክብካቤን ያቀርባል።'
                : 'Experience complete multi-disciplinary care guided by clinical experts, advanced technology, and high-fidelity treatment protocols.'
              }
            </p>
          </div>

          {/* Tab Capsule Selector */}
          <div className="flex bg-white p-1.5 rounded-full border border-gray-100 max-w-[520px] mx-auto mb-16 shadow-sm relative z-20">
            <button
              onClick={() => setActiveTab('department')}
              className={`relative z-10 px-6 sm:px-8 py-3.5 rounded-full font-bold text-[13px] sm:text-[14px] transition-all flex-1 text-center select-none outline-none ${
                activeTab === 'department' ? 'text-white' : 'text-secondary hover:text-primary'
              }`}
            >
              {activeTab === 'department' && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-primary rounded-full -z-10 shadow-lg shadow-primary/25"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              {isAmharic ? 'የሕክምና ክፍሎች' : 'Medical Departments'}
            </button>

            <button
              onClick={() => setActiveTab('service')}
              className={`relative z-10 px-6 sm:px-8 py-3.5 rounded-full font-bold text-[13px] sm:text-[14px] transition-all flex-1 text-center select-none outline-none ${
                activeTab === 'service' ? 'text-white' : 'text-secondary hover:text-primary'
              }`}
            >
              {activeTab === 'service' && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-primary rounded-full -z-10 shadow-lg shadow-primary/25"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              {isAmharic ? 'ደጋፊ አገልግሎቶች' : 'Support Services'}
            </button>
          </div>

          {/* Services Dynamic Grid */}
          <div className="min-h-[500px]">
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]"
            >
              <AnimatePresence mode="popLayout">
                {filteredServices.map((service, index) => {
                  const numStr = (index + 1).toString().padStart(2, '0');
                  return (
                    <motion.div
                      key={service.slug}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.4 }}
                      className="group relative bg-white rounded-[12px] p-[35px] text-center border border-gray-100 hover:border-primary/20 transition-all duration-500 hover:shadow-[0_15px_45px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col h-full"
                    >
                      {/* Background Number */}
                      <span className="absolute top-[15px] right-[20px] text-[60px] font-extrabold text-[#f4f7f6] leading-none select-none pointer-events-none group-hover:text-primary/[0.06] transition-colors duration-500">
                        {numStr}
                      </span>

                      {/* Accent slide indicator */}
                      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                      <div className="relative z-10 flex flex-col h-full">
                        {/* Icon */}
                        <div className="w-[65px] h-[65px] bg-[#f5fafb] rounded-full flex items-center justify-center text-primary mx-auto mb-6 shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:shadow-[0_8px_25px_rgba(0,184,184,0.25)]">
                          {getIcon(service.iconName)}
                        </div>

                        {/* Category Badge */}
                        <span className="inline-block mx-auto px-2.5 py-0.5 mb-3 text-[10px] font-bold text-[#8c949c] bg-gray-50 border border-gray-100/50 rounded-full uppercase tracking-wider">
                          {service.category === 'department' 
                            ? (isAmharic ? 'ሕክምና ክፍል' : 'Medical Dept') 
                            : (isAmharic ? 'የሆስፒታል አገልግሎት' : 'Support Service')
                          }
                        </span>

                        {/* Title */}
                        <h3 className="text-secondary text-[18px] font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                          {isAmharic ? service.titleAm : service.title}
                        </h3>

                        {/* Description */}
                        <p className="text-[#5d666e] text-[13px] leading-[1.75] mb-6 flex-grow">
                          {isAmharic ? service.descAm : service.desc}
                        </p>

                        {/* Read More Link */}
                        <Link
                          to={`/services/${service.slug}`}
                          className="inline-flex items-center justify-center gap-1.5 text-[13px] font-bold text-secondary/70 group-hover:text-primary transition-all duration-300 mt-auto"
                        >
                          {t('common.read_more')}
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Corporate Lead CTA Banner */}
      <section className="py-[80px] bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#00B8B8 1px, transparent 1px)', backgroundSize: '25px 25px' }}></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3"></div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-[700px] mx-auto"
          >
            <span className="text-primary font-bold uppercase tracking-[3px] text-[12px] mb-4 block">
              {isAmharic ? 'የቀጠሮ አገልግሎት' : 'APPOINTMENT BOOKING'}
            </span>
            <h2 className="text-white text-[28px] md:text-[38px] leading-tight mb-6 font-bold">
              {isAmharic ? 'ለመጀመር ዝግጁ ነዎት? ቀጠሮዎን ዛሬውኑ ያስይዙ' : 'Ready to Consult Our Health Specialists?'}
            </h2>
            <p className="text-white/60 text-[15px] mb-8 leading-relaxed">
              {isAmharic 
                ? 'የቀጠሮ ማስያዣ ፎርማችንን በመሙላት ወይም በቀጥታ ስልክ በመደወል ከሆስፒታላችን ስፔሻሊስት ዶክተሮች ጋር ቀጠሮዎን ወዲያውኑ ማረጋገጥ ይችላሉ።'
                : 'Schedule a comprehensive consultation with our specialized medical team. Book your slot online or call our 24/7 hotline support.'
              }
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button 
                onClick={onAppointmentClick}
                className="btn-primary shadow-xl shadow-primary/20"
              >
                {t('hero.cta_appointment')}
              </button>
              <Link to="/contact" className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-[8px] font-semibold transition-all border border-white/10 backdrop-blur-md text-[15px]">
                {isAmharic ? 'ያግኙን' : 'Contact Us'}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
