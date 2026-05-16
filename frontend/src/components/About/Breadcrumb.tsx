import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
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
        <img 
          src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2000" 
          alt="Medical Background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/90 via-secondary/80 to-secondary/90"></div>
      </div>

      {/* ECG / Heartbeat Line Animation */}
      <div className="absolute bottom-[20%] left-0 w-full h-[150px] opacity-20 z-10">
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
        <div className="flex flex-col items-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-[50px] md:text-[65px] font-bold mb-[15px] tracking-tight"
          >
            {title}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 text-white font-medium text-[18px]"
          >
            <Link to="/" className="hover:text-primary transition-colors">{t('nav.home')}</Link>
            <div className="w-[18px] h-[18px] bg-primary rounded-sm flex items-center justify-center">
              <ArrowRight className="w-3 h-3 text-white" />
            </div>
            <span className="text-primary">{title}</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;

