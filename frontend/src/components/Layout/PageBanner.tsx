import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface PageBannerProps {
  title: string;
  breadcrumbs: { label: string; path?: string }[];
}

const PageBanner = ({ title, breadcrumbs }: PageBannerProps) => {
  return (
    <section className="relative pt-[220px] pb-[120px] bg-secondary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#00B8B8 1px, transparent 1px)', backgroundSize: '25px 25px' }}></div>
      
      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3"></div>

      {/* Decorative Lines */}
      <div className="absolute top-[60%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      <div className="absolute top-[40%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/3 to-transparent"></div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white text-[32px] md:text-[42px] lg:text-[50px] font-bold mb-6"
          >
            {title}
          </motion.h1>

          <motion.nav
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-[14px]"
          >
            <Link to="/" className="flex items-center gap-1.5 text-white/60 hover:text-primary transition-colors">
              <Home className="w-4 h-4" />
              Home
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <span key={index} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-white/30" />
                {crumb.path ? (
                  <Link to={crumb.path} className="text-white/60 hover:text-primary transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-primary font-semibold">{crumb.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        </motion.div>
      </div>
    </section>
  );
};

export default PageBanner;
