import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, ChevronDown, User } from 'lucide-react';

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Pages', href: '#', hasDropdown: true },
    { name: 'Services', href: '#' },
    { name: 'Doctors', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Contact', href: '#' },
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
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-[12px] group cursor-pointer"
          >
            <div className="w-[48px] h-[48px] bg-primary rounded-[12px] flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform duration-500">
              <span className="text-[26px] font-bold">Y</span>
            </div>
            <span className={`text-[26px] font-bold tracking-tighter ${isSticky ? 'text-secondary' : 'text-white'}`}>
              Yanet<span className="text-primary group-hover:text-secondary transition-colors">Hospital</span>
            </span>
          </motion.div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-[40px]">
            {navLinks.map((link, i) => (
              <motion.a 
                key={link.name} 
                href={link.href} 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`font-semibold text-[15px] transition-all duration-300 relative group flex items-center gap-[6px] ${
                  isSticky ? 'text-secondary hover:text-primary' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.name}
                {link.hasDropdown && <ChevronDown className="w-[14px] h-[14px] group-hover:rotate-180 transition-transform duration-500" />}
                <span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
          </div>

          {/* Search & Actions */}
          <div className="hidden lg:flex items-center gap-[25px]">
            <motion.button 
              whileHover={{ scale: 1.2, rotate: 15 }}
              className={`transition-colors ${isSticky ? 'text-secondary hover:text-primary' : 'text-white/80 hover:text-white'}`}
            >
              <Search className="w-[22px] h-[22px]" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center gap-2 !py-[12px] !px-[28px] !text-[15px]"
            >
              <User className="w-4 h-4" />
              Appointment
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`lg:hidden p-[10px] rounded-full hover:bg-white/10 transition-colors ${isSticky ? 'text-secondary' : 'text-white'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-[32px] h-[32px]" /> : <Menu className="w-[32px] h-[32px]" />}
          </button>
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
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-secondary font-semibold text-[18px] py-[12px] px-[20px] rounded-[10px] hover:bg-primary/5 hover:text-primary transition-all flex justify-between items-center"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown className="w-[20px] h-[20px]" />}
                </a>
              ))}
              <div className="mt-[15px] px-[20px]">
                <button className="btn-primary w-full shadow-xl">
                  Appointment
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
