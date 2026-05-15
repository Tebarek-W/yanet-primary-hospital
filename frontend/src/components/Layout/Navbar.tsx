import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, Plus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', hasDropdown: true },
    { name: 'About', href: '/about' },
    { name: 'Pages', href: '#', hasDropdown: true },
    { name: 'Services', href: '#', hasDropdown: true },
    { name: 'Doctors', href: '#', hasDropdown: true },
    { name: 'Blog', href: '#', hasDropdown: true },
    { name: 'Contact', href: '#' },
  ];

  const isHome = location.pathname === '/';

  return (
    <nav className={`w-full transition-all duration-500 z-[100] ${isSticky
        ? 'sticky-header'
        : `bg-transparent py-[20px] ${isHome ? 'border-b border-white/5' : ''}`
      }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-[10px] group cursor-pointer"
            >
              <div className="w-[42px] h-[42px] bg-primary rounded-full flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform duration-500">
                <span className="text-[22px] font-bold">Y</span>
              </div>
              <span className={`text-[28px] font-extrabold tracking-tight ${isSticky ? 'text-[#0e121d]' : 'text-white'}`}>
                Yanet<span className="text-primary group-hover:text-secondary transition-colors">Hospital</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-[35px]">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={link.href}
                  className={`font-bold text-[15px] transition-all duration-300 flex items-center gap-[2px] ${location.pathname === link.href
                      ? 'text-primary'
                      : isSticky ? 'text-[#0e121d] hover:text-primary' : 'text-white hover:text-primary'
                    }`}
                >
                  {link.name}
                  {link.hasDropdown && <Plus className="w-[12px] h-[12px] stroke-[3px]" />}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Search & Actions */}
          <div className="hidden lg:flex items-center gap-[20px]">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className={`transition-colors ${isSticky ? 'text-[#0e121d] hover:text-primary' : 'text-white hover:text-primary'}`}
            >
              <Search className="w-[20px] h-[20px]" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-[25px] py-[12px] rounded-[5px] font-bold text-[15px] hover:bg-secondary transition-all shadow-md"
            >
              Get A Quote
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`lg:hidden p-[10px] transition-colors ${isSticky ? 'text-secondary' : 'text-white'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-[28px] h-[28px]" /> : <Menu className="w-[28px] h-[28px]" />}
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
            className="lg:hidden absolute top-[100%] left-0 w-full bg-white shadow-2xl overflow-hidden"
          >
            <div className="container-custom py-[20px] flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`font-bold text-[16px] py-[12px] border-b border-gray-50 flex justify-between items-center ${location.pathname === link.href ? 'text-primary' : 'text-[#0e121d]'
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                  {link.hasDropdown && <Plus className="w-[14px] h-[14px]" />}
                </Link>
              ))}
              <div className="mt-[20px]">
                <button className="bg-primary text-white w-full py-[15px] rounded-[5px] font-bold">
                  Get A Quote
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
