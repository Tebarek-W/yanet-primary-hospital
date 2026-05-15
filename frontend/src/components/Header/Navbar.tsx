import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Doctors', href: '#doctors' },
    { name: 'Appointment', href: '#appointment' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`w-full z-50 transition-all duration-300 ${isSticky ? 'fixed top-0 left-0 bg-white shadow-lg py-3' : 'bg-white py-5'}`}>
      <div className="container-custom flex justify-between items-center">
        <div className="flex flex-col leading-none">
          <span className="text-[22px] md:text-[28px] font-bold text-secondary tracking-tight">
            Yanet<span className="text-primary">Primary</span>
          </span>
          <span className="text-[10px] md:text-[12px] font-bold uppercase tracking-[4px] text-primary mt-[2px]">
            Hospital
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-secondary font-medium hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button className="btn-primary">
            Get a Quote
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-secondary">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 py-4 absolute w-full left-0 shadow-xl">
          <div className="container-custom flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-secondary font-medium hover:text-primary transition-colors py-2"
              >
                {link.name}
              </a>
            ))}
            <button className="btn-primary w-full">
              Get a Quote
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
