import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface PageBannerProps {
  title: string;
  breadcrumbs: { label: string; path?: string }[];
  image?: string;
}

const PageBanner = ({ title, breadcrumbs, image }: PageBannerProps) => {
  const defaultImage = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000";

  return (
    <section className="relative pt-[220px] pb-[140px] bg-secondary overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          src={image || defaultImage} 
          alt={title} 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-secondary/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-secondary/40"></div>
      </div>

      {/* ECG / Heartbeat Line Animation */}
      <div className="absolute bottom-[15%] left-0 w-full h-[150px] opacity-10 z-10">
        <svg width="100%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none" className="text-primary">
          <motion.path
            d="M0 50 L100 50 L110 30 L120 70 L130 50 L200 50 L210 20 L220 80 L230 50 L300 50 L310 40 L320 60 L330 50 L400 50 L410 10 L420 90 L430 50 L500 50 L510 35 L520 65 L530 50 L600 50 L610 25 L620 75 L630 50 L700 50 L710 45 L720 55 L730 50 L800 50 L810 5 L820 95 L830 50 L1000 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>
      
      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 z-10"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 z-10"></div>

      <div className="container-custom relative z-20">
        <div className="flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-[45px] md:text-[55px] lg:text-[65px] font-bold mb-6 tracking-tight"
          >
            {title}
          </motion.h1>

          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center gap-3 text-[18px] font-medium"
          >
            <Link to="/" className="flex items-center gap-2 text-white/70 hover:text-primary transition-all group">
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Home</span>
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <span key={index} className="flex items-center gap-3">
                <div className="w-[18px] h-[18px] bg-primary/20 rounded-sm flex items-center justify-center">
                  <ChevronRight className="w-3 h-3 text-primary" />
                </div>
                {crumb.path ? (
                  <Link to={crumb.path} className="text-white/70 hover:text-primary transition-all">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-primary font-bold">{crumb.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        </div>
      </div>
    </section>
  );
};

export default PageBanner;
