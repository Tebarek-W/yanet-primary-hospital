import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface AboutUsProps {
  cmsData?: Record<string, any> | null;
}

const AboutUs = ({ cmsData }: AboutUsProps) => {
  const { t } = useTranslation();

  const features = [
    t('about.about_page_us.f1'),
    t('about.about_page_us.f2'),
    t('about.about_page_us.f3'),
    t('about.about_page_us.f4'),
    t('about.about_page_us.f5'),
  ];

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-[60px] items-center">
          {/* Left Side: Image with Decorations */}
          <div className="relative">
            {/* Decorative Lines (Left) */}
            <div className="absolute -left-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 opacity-40 z-0">
              <motion.div
                animate={{ x: [-10, 0, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-[80px] h-[6px] bg-primary transform -rotate-45 rounded-full"
              ></motion.div>
              <motion.div
                animate={{ x: [-15, 5, -15] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                className="w-[120px] h-[6px] bg-primary transform -rotate-45 rounded-full"
              ></motion.div>
              <motion.div
                animate={{ x: [-10, 0, -10] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="w-[100px] h-[6px] bg-primary transform -rotate-45 rounded-full"
              ></motion.div>
            </div>

            {/* Decorative Circle (Top Right) */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -top-12 -right-12 w-[180px] h-[180px] border-[25px] border-primary/20 rounded-full z-0"
            ></motion.div>

            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative z-10 rounded-[10px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)] bg-primary/5 p-4"
            >
              <img
                src={cmsData?.overview_image || "/doctors/receptionist.png"}
                alt="Ethiopian Medical Professional"
                className="w-full h-auto rounded-[5px]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/doctors/receptionist.png";
                }}
              />
            </motion.div>
          </div>

          {/* Right Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-6 relative">
              <span className="absolute -top-6 -left-4 text-[60px] font-black text-primary/[0.05] select-none pointer-events-none z-0 uppercase">
                {t('nav.about')}
              </span>
              <span className="relative z-10 text-primary font-bold uppercase tracking-wider text-[11px]">{t('nav.about')}</span>
              <h2 className="relative z-10 text-[28px] font-bold text-secondary mt-1 leading-tight">
                {cmsData?.overview_title || t('about.about_page_us.title')}
              </h2>
            </div>

            <p className="text-[#5d666e] text-[17px] mb-8 leading-relaxed max-w-[550px]">
              {cmsData?.overview_content || t('about.about_page_us.desc')}
            </p>

            <ul className="space-y-4">
              {features.map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-[22px] h-[22px] rounded-sm border-2 border-primary/30 flex items-center justify-center group-hover:bg-primary transition-all">
                    <Check className="w-[14px] h-[14px] text-primary group-hover:text-white" strokeWidth={4} />
                  </div>
                  <span className="text-[#0e121d] font-bold text-[15px]">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

