import { motion } from 'framer-motion';
import { Play, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const VirtualTourSection = ({ cmsData }: { cmsData?: Record<string, any> | null }) => {
  const { t } = useTranslation();
  const isAmharic = t('nav.home') === 'መነሻ';

  const tourImage = cmsData?.vt_widget_image || 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=1200&q=80';
  const tourTitle = cmsData?.vt_widget_title || (isAmharic ? 'ያኔት ሆስፒታልን ቪርቹዋሊ ያስሱ' : 'Explore Yanet Virtually');
  const tourDesc  = cmsData?.vt_widget_desc  || (isAmharic
    ? 'ወደ ሆስፒታሉ ሳይሄዱ ዘመናዊ ክፍሎቻችንን፣ ሐኪሞቻችንን እና አካባቢያችንን በ360° ጉብኝት ያስሱ።'
    : 'Take an immersive 360° walk through our modern wards, operating theatres, labs, and patient lounges — before your first visit.');

  return (
    <section className="relative py-20 bg-secondary overflow-hidden">
      {/* Dot mesh */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#00B8B8 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />
      {/* Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* LEFT: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-2 text-primary font-black text-[11px] uppercase tracking-[0.3em] mb-5">
              <Compass className="w-4 h-4" />
              {isAmharic ? '360° ቨርቹዋል ጉብኝት' : '360° Virtual Tour'}
            </span>

            <h2 className="text-white text-[34px] md:text-[44px] font-bold leading-tight mb-5">
              {isAmharic ? (
                <>{tourTitle.split(' ').slice(0, -1).join(' ')} <span className="text-primary">{tourTitle.split(' ').slice(-1)}</span></>
              ) : (
                <>Explore Yanet <span className="text-primary">Virtually</span></>
              )}
            </h2>

            <p className="text-white/55 text-[15px] leading-relaxed mb-8 max-w-[480px] mx-auto lg:mx-0">
              {tourDesc}
            </p>

            <Link
              to="/virtual-tour"
              className="inline-flex items-center gap-3 bg-primary hover:bg-white hover:text-secondary text-white font-bold text-[13px] px-7 py-3.5 rounded-full transition-all duration-400 shadow-lg shadow-primary/20"
            >
              <Play size={16} fill="currentColor" />
              {isAmharic ? 'ጉብኝቱን ጀምሩ' : 'Start Tour'}
            </Link>
          </motion.div>

          {/* RIGHT: Preview card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex-1 w-full"
          >
            <Link to="/virtual-tour" className="group block relative rounded-[20px] overflow-hidden aspect-[4/3] shadow-2xl shadow-black/40">
              <img
                src={tourImage}
                alt="Yanet Hospital Virtual Tour"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Centre play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary transition-all duration-400 shadow-xl">
                  <Play size={24} fill="white" className="text-white ml-1" />
                </div>
              </div>

              {/* Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-white text-[10px] font-bold uppercase tracking-widest">
                  {isAmharic ? 'ቀጥታ 360°' : 'Live 360°'}
                </span>
              </div>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default VirtualTourSection;
