import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 150);
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
        : 'relative bg-transparent py-[25px] border-b border-white/10'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-[10px]">
            <div className="w-[45px] h-[45px] bg-primary rounded-full flex items-center justify-center text-white">
              <span className="text-[24px] font-bold">Y</span>
            </div>
            <span className={`text-[24px] font-bold tracking-tight ${isSticky ? 'text-secondary' : 'text-white'}`}>
              Yanet<span className="text-primary">Hospital</span>
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-[35px]">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`font-semibold text-[15px] transition-colors relative group flex items-center gap-[4px] ${
                  isSticky ? 'text-secondary hover:text-primary' : 'text-white hover:text-primary'
                }`}
              >
                {link.name}
                {link.hasDropdown && <ChevronDown className="w-[16px] h-[16px]" />}
                <span className="absolute bottom-[-5px] left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Search & Actions */}
          <div className="hidden lg:flex items-center gap-[25px]">
            <button className={`transition-colors ${isSticky ? 'text-secondary hover:text-primary' : 'text-white hover:text-primary'}`}>
              <Search className="w-[22px] h-[22px]" />
            </button>
            <button className="btn-primary !py-[12px] !px-[25px] !text-[15px]">
              Appointment
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`lg:hidden p-[10px] ${isSticky ? 'text-secondary' : 'text-white'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-[30px] h-[30px]" /> : <Menu className="w-[30px] h-[30px]" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="container-custom py-[20px] flex flex-col gap-[15px]">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-secondary font-semibold text-[18px] py-[10px] border-b border-gray-50 hover:text-primary flex justify-between items-center"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown className="w-[18px] h-[18px]" />}
                </a>
              ))}
              <button className="btn-primary mt-[10px]">
                Appointment
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
