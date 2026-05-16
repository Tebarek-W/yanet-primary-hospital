import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BlogHero = () => {
  const { t } = useTranslation();
  const isAmharic = t('nav.home') === 'መነሻ';

  return (
    <div className="relative pt-[220px] pb-[140px] overflow-hidden bg-secondary">
      {/* Background with Animation */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1.5 }}
          src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop" 
          alt="Blog Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-transparent"></div>
      </div>

      {/* Floating Icons Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-1/4 right-1/4 text-primary"
        >
          <BookOpen size={120} />
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -10, 0],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 7, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 left-1/3 text-white"
        >
          <Tag size={80} />
        </motion.div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-[700px]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-primary/20 text-primary px-4 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider border border-primary/30">
                {isAmharic ? "የጤና ዜና" : "Medical News"}
              </span>
              <div className="flex items-center gap-2 text-white/60 text-[12px]">
                <Clock size={14} />
                <span>{isAmharic ? "መደበኛ ዝመናዎች" : "Regular Updates"}</span>
              </div>
            </div>

            <h1 className="text-white text-[45px] md:text-[60px] font-bold mb-6 leading-tight">
              {isAmharic ? "የእኛ የቅርብ ጊዜ " : "Our Latest "}
              <span className="text-primary italic">{isAmharic ? "ብሎግ እና ዜና" : "Blog & News"}</span>
            </h1>

            <p className="text-white/70 text-[18px] mb-10 leading-relaxed">
              {isAmharic 
                ? "ስለ ጤና፣ ህክምና እና የሆስፒታላችን አዳዲስ መረጃዎች ከባለሙያዎቻችን ያንብቡ።" 
                : "Explore our collection of articles, health tips, and hospital updates written by our expert medical team."}
            </p>

            <div className="flex items-center gap-4 text-white font-medium">
              <Link to="/" className="hover:text-primary transition-colors">{t('nav.home')}</Link>
              <div className="w-[18px] h-[18px] bg-primary rounded-sm flex items-center justify-center">
                <ArrowRight className="w-3 h-3 text-white" />
              </div>
              <span className="text-primary">{t('nav.blog')}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 w-full leading-none z-10">
        <svg className="relative block w-full h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
        </svg>
      </div>
    </div>
  );
};

export default BlogHero;
