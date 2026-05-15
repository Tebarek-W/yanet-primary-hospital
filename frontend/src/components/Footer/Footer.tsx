import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-20 pb-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* About Column */}
          <div>
            <div className="flex flex-col leading-none mb-8">
              <span className="text-[26px] font-bold text-white tracking-tight">
                Yanet<span className="text-primary">Primary</span>
              </span>
              <span className="text-[12px] font-bold uppercase tracking-[4px] text-primary mt-[2px]">
                Hospital
              </span>
            </div>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Providing exceptional medical services with a focus on patient care and modern technology. Your health is our mission.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors"><Facebook size={18} /></a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors"><Twitter size={18} /></a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors"><Linkedin size={18} /></a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors"><Instagram size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl mb-8 border-b-2 border-primary w-fit pb-2">Quick Links</h3>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Our Services', 'Meet Doctors', 'Appointment', 'Latest Blog'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors flex items-center">
                    <ArrowRight size={14} className="mr-2" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-2xl mb-8 border-b-2 border-primary w-fit pb-2">Opening Hours</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Mon - Tue:</span>
                <span>9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Wed - Thu:</span>
                <span>8:00 AM - 5:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Friday:</span>
                <span>9:00 AM - 4:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Sun - Sat:</span>
                <span className="text-primary">Closed</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-2xl mb-8 border-b-2 border-primary w-fit pb-2">Newsletter</h3>
            <p className="text-gray-400 mb-6">
              Subscribe to our newsletter to get latest updates and news.
            </p>
            <form className="space-y-4">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-primary"
              />
              <button className="btn-primary w-full py-3">
                Subscribe Now
              </button>
            </form>
          </div>
        </div>

        {/* Contact Info Bottom */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-y border-white/10 mb-10">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Location:</p>
              <p className="font-bold text-white">123 Medical St, New York</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0">
              <Phone size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Call Us:</p>
              <p className="font-bold text-white">+1 (123) 456-7890</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0">
              <Mail size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Email Us:</p>
              <p className="font-bold text-white">info@yanetprimaryhospital.com</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm">
          <p>© 2026 Yanet Primary Hospital. All Rights Reserved. Designed by Antigravity.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
