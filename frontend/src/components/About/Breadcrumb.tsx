import { motion } from 'framer-motion';
import { ArrowRight, Users, Award, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface BreadcrumbProps {
  title: string;
}

const Breadcrumb = ({ title }: BreadcrumbProps) => {
  const { t } = useTranslation();

  return (
    <div className="relative pt-[220px] pb-[140px] overflow-hidden bg-secondary">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2000" 
          alt="Medical Background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent"></div>
      </div>

      {/* Floating About Icons Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 10, 0],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/4 right-1/4 text-primary"
        >
          <Users size={120} />
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, 30, 0],
            rotate: [0, -10, 0],
            opacity: [0.03, 0.08, 0.03]
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 left-1/3 text-white"
        >
          <Award size={90} />
        </motion.div>
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.06, 0.03]
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-1/3 left-1/4 text-primary"
        >
          <Activity size={70} />
        </motion.div>
      </div>

      {/* ECG / Heartbeat Line Animation */}
      <div className="absolute bottom-[20%] left-0 w-full h-[150px] opacity-10 z-10">
        <svg width="100%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none" className="text-primary">
          <motion.path
            d="M0 50 L100 50 L110 30 L120 70 L130 50 L200 50 L210 20 L220 80 L230 50 L300 50 L310 40 L320 60 L330 50 L400 50 L410 10 L420 90 L430 50 L500 50 L510 35 L520 65 L530 50 L600 50 L610 25 L620 75 L630 50 L700 50 L710 45 L720 55 L730 50 L800 50 L810 5 L820 95 L830 50 L1000 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      <div className="container-custom relative z-20">
        <div className="max-w-[700px]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-[3px] h-[16px] bg-primary"></div>
              <span className="text-white text-[13px] font-extrabold uppercase tracking-[3px]">
                {title}
              </span>
            </div>

            <h1 className="text-white text-[45px] md:text-[60px] font-bold mb-6 leading-tight">
              {title === 'About Us' || title === 'ስለ እኛ' ? (
                <>
                  {title === 'ስለ እኛ' ? "ስለ ያኔት " : "About Yanet "}
                  <span className="text-primary italic">{title === 'ስለ እኛ' ? "ሆስፒታል" : "Hospital"}</span>
                </>
              ) : (
                title
              )}
            </h1>

            <p className="text-white/70 text-[18px] mb-10 leading-relaxed max-w-[600px]">
              {title === 'ስለ እኛ'
                ? "ጥራት ያለው፣ ታካሚን ማዕከል ያደረገ እንክብካቤ እና የላቀ የህክምና አገልግሎቶችን ለህብረተሰባችን ለመስጠት ቆርጠን ተነስተናል።"
                : "We are committed to providing high-quality, patient-centered care and advanced medical services to our community."}
            </p>

            <div className="flex items-center gap-4 text-white font-medium">
              <Link to="/" className="hover:text-primary transition-colors">{t('nav.home')}</Link>
              <div className="w-[18px] h-[18px] bg-primary rounded-sm flex items-center justify-center">
                <ArrowRight className="w-3 h-3 text-white" />
              </div>
              <span className="text-primary">{title}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Wave Transition */}
      <div className="absolute bottom-0 left-0 w-full leading-none z-10">
        <svg className="relative block w-full h-[60px] fill-white" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Breadcrumb;

