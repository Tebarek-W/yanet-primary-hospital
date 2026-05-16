import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const MedicalCamp = () => {
  const { t } = useTranslation();
  const isAmharic = t('nav.home') === 'መነሻ';

  const objectives = [
    isAmharic ? "ለቀዶ ጥገና ተገቢ የሆኑ ጉዳዮችን በነፃ መመዝገብ" : "Free Registration of Deserving Cases for Surgeries",
    isAmharic ? "ነፃ የሄፓታይተስ ቢ እና ሲ ምርመራ" : "Free Hepatitis B & C Screening Test",
    isAmharic ? "ነፃ ምክክር እና መድኃኒት" : "Free Consultation & Medicine",
    isAmharic ? "ነፃ የደም ግፊት ምርመራ" : "Free Blood Pressure Test",
    isAmharic ? "ነፃ የዲያቢቲክስ (ስኳር) ምርመራ" : "Free Diabetes Test",
    isAmharic ? "የወሊድ አገልግሎት" : "Childbirth",
  ];

  return (
    <section className="section-padding bg-[#f4f8fb] relative overflow-hidden">
      {/* Decorative Background Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 z-0"></div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-[40px] items-center">
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 relative">
              <span className="absolute -top-6 -left-4 text-[60px] font-black text-primary/[0.05] select-none pointer-events-none z-0 whitespace-nowrap uppercase">
                {isAmharic ? 'የህክምና' : 'MEDICAL'}
              </span>
              <span className="relative z-10 text-primary font-bold uppercase tracking-wider text-[11px]">{t('nav.about')}</span>
              <h2 className="relative z-10 text-[28px] font-bold text-secondary mt-1 leading-tight">
                {t('about_extra.camp.title')}
              </h2>
            </div>
            
            <p className="text-[#5d666e] text-[14px] mb-6 leading-relaxed max-w-[500px]">
              {t('about_extra.camp.desc')}
            </p>

            <ul className="grid sm:grid-cols-2 gap-y-3 gap-x-4">
              {objectives.map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-[18px] h-[18px] rounded-sm border-2 border-primary/30 flex items-center justify-center group-hover:bg-primary transition-all flex-shrink-0">
                    <Check className="w-[12px] h-[12px] text-primary group-hover:text-white" strokeWidth={4} />
                  </div>
                  <span className="text-secondary font-bold text-[13.5px] leading-none">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right Side: Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-[10px] overflow-hidden shadow-xl border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000" 
                alt="Ethiopian Healthcare Team" 
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MedicalCamp;

