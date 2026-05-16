import { motion } from 'framer-motion';
import { HeartPulse, Activity, Stethoscope, Brain, Baby, Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ServicesHero from '../components/Services/ServicesHero';

interface ServicesPageProps {
  onAppointmentClick: () => void;
}

const ServicesPage = ({ onAppointmentClick }: ServicesPageProps) => {
  const { t } = useTranslation();

  const services = [
    {
      icon: <HeartPulse className="w-7 h-7" />,
      title: t('services_page.items.cardiology.title'),
      desc: t('services_page.items.cardiology.desc'),
      num: "01",
      delay: 0.1
    },
    {
      icon: <Activity className="w-7 h-7" />,
      title: t('services_page.items.diagnostic.title'),
      desc: t('services_page.items.diagnostic.desc'),
      num: "02",
      delay: 0.15
    },
    {
      icon: <Stethoscope className="w-7 h-7" />,
      title: t('services_page.items.surgery.title'),
      desc: t('services_page.items.surgery.desc'),
      num: "03",
      delay: 0.2
    },
    {
      icon: <Brain className="w-7 h-7" />,
      title: t('services_page.items.neurology.title'),
      desc: t('services_page.items.neurology.desc'),
      num: "04",
      delay: 0.25
    },
    {
      icon: <Baby className="w-7 h-7" />,
      title: t('services_page.items.pediatrics.title'),
      desc: t('services_page.items.pediatrics.desc'),
      num: "05",
      delay: 0.3
    },
    {
      icon: <Eye className="w-7 h-7" />,
      title: t('services_page.items.ophthalmology.title'),
      desc: t('services_page.items.ophthalmology.desc'),
      num: "06",
      delay: 0.35
    }
  ];

  return (
    <>
      <ServicesHero />

      {/* Services Grid Section */}
      <section className="pt-[80px] pb-[80px] bg-white relative overflow-hidden">
        <div className="container-custom relative z-10">
          {/* Section Header */}
          <div className="section-title">
            <span>{t('services_page.badge')}</span>
            <h2 className="text-secondary">{t('services_page.main_title')}</h2>
            <p className="text-[15px] text-body">
              {t('services_page.desc')}
            </p>
          </div>

          {/* Services Grid — Corf Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: service.delay }}
                className="group relative bg-[#F8FAFB] rounded-[12px] p-[35px] text-center border border-transparent hover:border-primary/15 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:bg-white overflow-hidden"
              >
                {/* Background Number */}
                <span className="absolute top-[15px] right-[20px] text-[60px] font-extrabold text-gray-100 leading-none select-none pointer-events-none group-hover:text-primary/[0.07] transition-colors duration-500">
                  {service.num}
                </span>

                {/* Bottom accent bar — appears on hover */}
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-[65px] h-[65px] bg-white rounded-full flex items-center justify-center text-primary mx-auto mb-[22px] shadow-[0_4px_15px_rgba(0,184,184,0.12)] group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:shadow-[0_8px_25px_rgba(0,184,184,0.3)]">
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-secondary text-[18px] font-bold mb-[10px] group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-body text-[13px] leading-[1.75] mb-[18px]">
                    {service.desc}
                  </p>

                  {/* Read More Link */}
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-secondary/70 group-hover:text-primary transition-all duration-300"
                  >
                    {t('common.read_more')}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
            <span className="text-primary font-bold uppercase tracking-[3px] text-[12px] mb-4 block">{t('services_page.cta.badge')}</span>
            <h2 className="text-white text-[28px] md:text-[38px] leading-tight mb-6">
              {t('services_page.cta.title')}
            </h2>
            <p className="text-white/50 text-[15px] mb-8 leading-relaxed">
              {t('services_page.cta.desc')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button 
                onClick={onAppointmentClick}
                className="btn-primary shadow-xl shadow-primary/20"
              >
                {t('hero.cta_appointment')}
              </button>
              <Link to="/contact" className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-[8px] font-semibold transition-all border border-white/10 backdrop-blur-md text-[15px]">
                {t('nav.contact')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;

