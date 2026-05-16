import { motion } from 'framer-motion';
import { ArrowRight, Stethoscope, HeartPulse, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ServicesHero = () => {
  const { t } = useTranslation();
  const isAmharic = t('nav.home') === 'መነሻ';

  return (
    <div className="relative pt-[220px] pb-[140px] overflow-hidden bg-secondary">
      {/* Background with Animation */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 1.5 }}
          src="https://images.unsplash.com/photo-1504813184591-01592fd039d5?q=80&w=2071&auto=format&fit=crop" 
          alt="Services Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-transparent"></div>
      </div>

      {/* Floating Medical Icons Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 15, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/4 right-1/4 text-primary"
        >
          <Stethoscope size={100} />
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, 30, 0],
            rotate: [0, -15, 0],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 left-1/3 text-white"
        >
          <HeartPulse size={80} />
        </motion.div>
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-1/3 left-1/4 text-primary"
        >
          <Activity size={60} />
        </motion.div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-[750px]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-[3px] h-[16px] bg-primary"></div>
              <span className="text-white text-[13px] font-extrabold uppercase tracking-[3px]">
                {isAmharic ? "ልዩ አገልግሎቶች" : "Specialized Services"}
              </span>
            </div>

            <h1 className="text-white text-[45px] md:text-[60px] font-bold mb-6 leading-tight">
              {isAmharic ? "የላቁ የህክምና " : "Advanced Medical "}
              <span className="text-primary italic">{isAmharic ? "አገልግሎቶች" : "Healthcare"}</span>
            </h1>

            <p className="text-white/70 text-[18px] mb-10 leading-relaxed max-w-[600px]">
              {isAmharic 
                ? "በዘመናዊ ቴክኖሎጂ እና በባለሙያ ስፔሻሊስቶች የታገዘ የተሟላ የህክምና አገልግሎት እንሰጣለን።" 
                : "We provide comprehensive medical services powered by modern technology and led by our expert team of specialists."}
            </p>

            <div className="flex items-center gap-4 text-white font-medium">
              <Link to="/" className="hover:text-primary transition-colors">{t('nav.home')}</Link>
              <div className="w-[18px] h-[18px] bg-primary rounded-sm flex items-center justify-center">
                <ArrowRight className="w-3 h-3 text-white" />
              </div>
              <span className="text-primary">{t('nav.services')}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 w-full leading-none z-10">
        <svg className="relative block w-full h-[60px] fill-white" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default ServicesHero;
