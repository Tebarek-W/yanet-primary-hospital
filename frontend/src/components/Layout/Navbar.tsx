import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, ChevronDown, User, Languages, Phone, Compass } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { branchesData } from '../../data/branchesData';

// Flag SVGs for language switcher
const EthiopianFlag = () => (
  <svg viewBox="0 0 30 20" className="w-[18px] h-[12px] rounded-[2px] shadow-sm shrink-0">
    <rect width="30" height="6.67" fill="#078930" />
    <rect y="6.67" width="30" height="6.67" fill="#fcdd09" />
    <rect y="13.33" width="30" height="6.67" fill="#da121a" />
    <circle cx="15" cy="10" r="3.5" fill="#0f47af" />
    <polygon points="15,7.3 15.9,9.8 18.5,9.8 16.4,11.4 17.2,13.9 15,12.3 12.8,13.9 13.6,11.4 11.5,9.8 14.1,9.8" fill="#fcdd09" />
  </svg>
);

const UKFlag = () => (
  <svg viewBox="0 0 30 20" className="w-[18px] h-[12px] rounded-[2px] shadow-sm shrink-0 bg-[#00247d]">
    <line x1="0" y1="0" x2="30" y2="20" stroke="#fff" strokeWidth="3" />
    <line x1="30" y1="0" x2="0" y2="20" stroke="#fff" strokeWidth="3" />
    <line x1="0" y1="0" x2="30" y2="20" stroke="#cf142b" strokeWidth="2" />
    <line x1="30" y1="0" x2="0" y2="20" stroke="#cf142b" strokeWidth="2" />
    <rect x="12" y="0" width="6" height="20" fill="#fff" />
    <rect x="0" y="7" width="30" height="6" fill="#fff" />
    <rect x="13.5" y="0" width="3" height="20" fill="#cf142b" />
    <rect x="0" y="8.5" width="30" height="3" fill="#cf142b" />
  </svg>
);

// i18n integration
interface NavbarProps {
  onAppointmentClick: () => void;
}

const Navbar = ({ onAppointmentClick }: NavbarProps) => {
  const { t, i18n } = useTranslation();
  const isAmharic = (i18n.language || 'en').startsWith('am');
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const currentLang = i18n.language || 'en';
    const newLang = currentLang.startsWith('am') ? 'en' : 'am';
    i18n.changeLanguage(newLang);
    document.documentElement.lang = newLang;
  };

  interface NavLink {
    name: string;
    href: string;
    hasDropdown?: boolean;
    dropdownItems?: { name: string; href: string }[];
  }

  const navLinks: NavLink[] = [
    { name: t('nav.home'), href: '/' },
    { 
      name: isAmharic ? 'ስለ ሆስፒታሉ' : 'About Us', 
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { name: t('nav.about'), href: '/about' },
        { name: t('nav.doctors'), href: '/doctors' },
        { name: t('nav.careers', 'Careers'), href: '/careers' }
      ]
    },
    { name: t('nav.services'), href: '/services' },
    { 
      name: t('nav.branches'), 
      href: '#', 
      hasDropdown: true,
      dropdownItems: [
        ...branchesData.map((b) => ({
          name: i18n.language.startsWith('am') ? b.nameAm : b.name,
          href: `/branches/${b.slug}`
        })),
        {
          name: i18n.language.startsWith('am') ? 'ሁሉም ቅርንጫፎች ይመልከቱ' : 'View All Branches',
          href: '/branches'
        }
      ]
    },
    { 
      name: isAmharic ? 'ሚዲያ እና መረጃ' : 'Media & News', 
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { name: t('nav.blog'), href: '/blog' },
        { name: isAmharic ? 'ቨርቹዋል ጉብኝት' : '360° Virtual Tour', href: '/virtual-tour' }
      ]
    },
    { name: t('nav.contact'), href: '/contact' },
  ];

  return (
    <nav className={`w-full transition-all duration-500 z-[100] ${
      isSticky 
        ? 'sticky-header' 
        : 'bg-transparent py-[25px] border-b border-white/5'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="-ml-2 lg:-ml-6 xl:-ml-8 transition-all">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-[8px] group cursor-pointer"
            >
              <div className="w-[32px] h-[32px] bg-primary rounded-[8px] flex items-center justify-center text-white shadow-md group-hover:rotate-12 transition-transform duration-500">
                <span className="text-[18px] font-bold">Y</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className={`text-[18px] md:text-[20px] font-extrabold tracking-tighter ${isSticky ? 'text-secondary' : 'text-white'}`}>
                  Yanet<span className="text-primary group-hover:text-secondary transition-colors">Primary</span>
                </span>
                <span className="text-[8px] font-bold uppercase tracking-[3px] text-primary mt-[1px]">
                  Hospital
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-[30px]">
            {navLinks.map((link, i) => {
              const hasDropdown = link.hasDropdown && link.dropdownItems && link.dropdownItems.length > 0;
              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative py-2"
                  onMouseEnter={() => hasDropdown && setActiveDropdown(link.name)}
                  onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
                >
                  {hasDropdown ? (
                    <div className="flex items-center gap-[4px] cursor-pointer">
                      <span 
                        className={`font-bold text-[12px] transition-all duration-300 relative group flex items-center gap-[4px] ${
                          activeDropdown === link.name ? 'text-primary' :
                          isSticky ? 'text-secondary hover:text-primary' : 'text-white/90 hover:text-white'
                        }`}
                      >
                        {link.name}
                        <ChevronDown className={`w-[14px] h-[14px] transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180 text-primary' : ''}`} />
                        <span className={`absolute bottom-[-6px] left-0 h-[2px] bg-primary transition-all duration-300 ${
                          activeDropdown === link.name ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}></span>
                      </span>
                    </div>
                  ) : (
                    <Link 
                      to={link.href} 
                      className={`font-bold text-[12px] transition-all duration-300 relative group flex items-center gap-[6px] ${
                        location.pathname === link.href ? 'text-primary' :
                        isSticky ? 'text-secondary hover:text-primary' : 'text-white/90 hover:text-white'
                      }`}
                    >
                      {link.name}
                      <span className={`absolute bottom-[-6px] left-0 h-[2px] bg-primary transition-all duration-300 ${
                        location.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}></span>
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {hasDropdown && link.dropdownItems && (
                    <AnimatePresence>
                      {activeDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 15, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-[12px] w-[260px] bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-[110] overflow-hidden"
                        >
                          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary to-primary-light"></div>
                          {link.dropdownItems.map((item) => (
                            <Link
                              key={item.name}
                              to={item.href}
                              className="block px-5 py-3 text-[12px] font-bold text-secondary hover:text-primary hover:bg-primary/5 transition-all duration-200 border-l-2 border-transparent hover:border-primary"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-[20px]">
            {/* Language Switcher */}
            <button 
              onClick={toggleLanguage}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 transition-all hover:bg-primary hover:border-primary group ${isSticky ? 'text-secondary border-gray-200' : 'text-white'}`}
            >
              {(i18n.language || 'en').startsWith('am') ? <UKFlag /> : <EthiopianFlag />}
              <span className="text-[12px] font-bold uppercase tracking-wider">{(i18n.language || 'en').startsWith('am') ? 'EN' : 'AM'}</span>
            </button>

            {/* Virtual Tour Link */}
            <Link
              to="/virtual-tour"
              className={`flex items-center gap-1.5 font-bold text-[12px] px-4 py-2 rounded-full border transition-all duration-300 ${
                isSticky
                  ? 'border-primary/30 text-primary hover:bg-primary hover:text-white'
                  : 'border-white/20 text-white/90 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              {isAmharic ? 'ቨርቹዋል ጉብኝት' : '360° Tour'}
            </Link>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAppointmentClick}
              className="btn-primary flex items-center gap-2 !py-[8px] !px-[22px] !text-[12px]"
            >
              <User className="w-4 h-4" />
              {t('nav.appointment')}
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 lg:hidden">
             {/* Mobile Language Switcher */}
             <button 
              onClick={toggleLanguage}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 ${isSticky ? 'text-secondary border-gray-200' : 'text-white'}`}
            >
              {(i18n.language || 'en').startsWith('am') ? <UKFlag /> : <EthiopianFlag />}
              <span className="text-[12px] font-black uppercase tracking-wider">{(i18n.language || 'en').startsWith('am') ? 'EN' : 'AM'}</span>
            </button>

            <button 
              className={`p-[10px] rounded-full hover:bg-white/10 transition-colors ${isSticky ? 'text-secondary' : 'text-white'}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-[28px] h-[28px]" /> : <Menu className="w-[28px] h-[28px]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="lg:hidden absolute top-[100%] left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-2xl overflow-hidden"
          >
            <div className="container-custom py-[30px] flex flex-col gap-[10px]">
              {navLinks.map((link) => {
                const hasDropdown = link.hasDropdown && link.dropdownItems && link.dropdownItems.length > 0;
                return (
                  <div key={link.name} className="w-full">
                    {hasDropdown ? (
                      <div className="w-full">
                        <button
                          onClick={() => setActiveMobileDropdown(activeMobileDropdown === link.name ? null : link.name)}
                          className={`font-semibold text-[18px] py-[12px] px-[20px] rounded-[10px] hover:bg-primary/5 hover:text-primary transition-all flex justify-between items-center w-full text-left ${
                            activeMobileDropdown === link.name ? 'text-primary bg-primary/5' : 'text-secondary'
                          }`}
                        >
                          <span>{link.name}</span>
                          <ChevronDown className={`w-[20px] h-[20px] transition-transform duration-300 ${activeMobileDropdown === link.name ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <AnimatePresence>
                          {activeMobileDropdown === link.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="overflow-hidden bg-gray-50/50 rounded-[10px] mt-1 ml-4"
                            >
                              {link.dropdownItems?.map((item) => (
                                <Link 
                                  key={item.name} 
                                  to={item.href} 
                                  className="font-medium text-[15px] py-[10px] px-[20px] block hover:text-primary transition-colors text-secondary/85"
                                  onClick={() => {
                                    setIsOpen(false);
                                    setActiveMobileDropdown(null);
                                  }}
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link 
                        to={link.href} 
                        className={`font-semibold text-[18px] py-[12px] px-[20px] rounded-[10px] hover:bg-primary/5 hover:text-primary transition-all flex justify-between items-center ${
                          location.pathname === link.href ? 'text-primary bg-primary/5' : 'text-secondary'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                );
              })}
              <div className="mt-[15px] px-[20px]">
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    onAppointmentClick();
                  }}
                  className="btn-primary w-full shadow-xl"
                >
                  {t('nav.appointment')}
                </button>
              </div>
              <div className="mt-[10px] px-[20px]">
                <a 
                  href={`tel:${t('common.emergency_call').replace(/\s+/g, '')}`} 
                  className="w-full py-[12px] bg-red-600 hover:bg-red-750 text-white font-bold rounded-[10px] flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 transition-all text-center"
                  onClick={() => setIsOpen(false)}
                >
                  <Phone className="w-4 h-4 fill-white" />
                  <span>{t('common.emergency')}: {t('common.emergency_call')}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

