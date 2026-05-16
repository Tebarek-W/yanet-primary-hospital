import { motion } from 'framer-motion';
import { Phone, MapPin, CheckCircle2, Award, Clock, HeartPulse } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const WhyChooseUs = () => {
  const { t } = useTranslation();

  const stats = [
    { icon: <CheckCircle2 className="w-8 h-8" />, title: t('why_choose.stats.doctors'), desc: t('why_choose.stats.doctors_desc') },
    { icon: <Award className="w-8 h-8" />, title: t('why_choose.stats.award'), desc: t('why_choose.stats.award_desc') },
    { icon: <Clock className="w-8 h-8" />, title: t('why_choose.stats.service'), desc: t('why_choose.stats.service_desc') },
    { icon: <HeartPulse className="w-8 h-8" />, title: t('why_choose.stats.tech'), desc: t('why_choose.stats.tech_desc') },
  ];

  return (
    <section className="pb-[60px] pt-[60px] relative overflow-hidden bg-secondary">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-pulse-soft -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[80px] items-center">
          {/* Left Side: Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-10 bg-primary"></div>
              <span className="text-primary font-bold uppercase tracking-[3px] text-[13px]">{t('why_choose.badge')}</span>
            </div>
            <h2 className="text-white text-[30px] md:text-[42px] leading-tight mb-8">
              {t('why_choose.title_main')} <span className="text-primary italic">{t('why_choose.title_span')}</span> & {t('nav.blog').toLowerCase() === 'blog' ? 'Well-being' : 'ደህንነት'}
            </h2>
            <p className="text-white/60 text-[16px] mb-12 leading-relaxed">
              {t('why_choose.desc')}
            </p>

            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col gap-4">
                  <div className="text-primary">{stat.icon}</div>
                  <div>
                    <h4 className="text-white text-[18px] font-bold mb-1">{stat.title}</h4>
                    <p className="text-white/40 text-[14px]">{stat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Contact & Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-[40px] p-10 md:p-14 border border-white/10 shadow-2xl">
              <div className="space-y-10">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white/40 text-[11px] uppercase tracking-widest mb-0.5">{t('common.emergency')}</h4>
                    <p className="text-white text-[19px] font-black tracking-tight">+251 11 123 4567</p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/10 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white/40 text-[11px] uppercase tracking-widest mb-0.5">{t('common.location')}</h4>
                    <p className="text-white text-[16px] font-bold">Bole Road, Addis Ababa, Ethiopia</p>
                  </div>
                </div>

                <div className="pt-10 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-white font-bold text-[18px]">{t('common.opening_hours')}</p>
                    <p className="text-white/40">Mon - Sun: 24 Hours</p>
                  </div>
                  <div className="flex -space-x-4">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-12 h-12 rounded-full border-4 border-secondary bg-gray-300 overflow-hidden">
                        <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Specialist" />
                      </div>
                    ))}
                    <div className="w-12 h-12 rounded-full border-4 border-secondary bg-primary flex items-center justify-center text-white font-bold text-[12px]">
                      +15
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

