import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
  const quickLinks = ["About Us", "Our Services", "Our Doctors", "Latest News", "Contact Us", "Appointment"];
  const departmentLinks = ["Cardiology", "Neurology", "General Surgery", "Pediatrics", "Laboratory", "Diagnostic"];

  return (
    <footer className="bg-secondary pt-[100px] pb-[30px] relative overflow-hidden">
      {/* Decorative background shape */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 -z-0"></div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[40px] mb-[80px]">
          {/* About Column */}
          <div>
            <div className="flex items-center gap-[10px] mb-[30px]">
              <div className="w-[40px] h-[40px] bg-primary rounded-full flex items-center justify-center text-white">
                <span className="text-[20px] font-bold">Y</span>
              </div>
              <span className="text-[24px] font-bold text-white tracking-tight">Yanet<span className="text-primary">Hospital</span></span>
            </div>
            <p className="text-white/70 mb-[30px] leading-[1.8]">
              Providing world-class medical services with modern technology and expert healthcare professionals. Your health is our priority.
            </p>
            <div className="flex gap-[15px]">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, idx) => (
                <a key={idx} href="#" className="w-[40px] h-[40px] rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300">
                  <Icon className="w-[18px] h-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-[22px] mb-[35px] relative pb-[15px] after:absolute after:bottom-0 after:left-0 after:w-[50px] after:h-[2px] after:bg-primary">Quick Links</h3>
            <ul className="space-y-[15px]">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/70 hover:text-primary transition-all flex items-center gap-[10px] group">
                    <ArrowRight className="w-[14px] h-[14px] opacity-0 -ml-[20px] group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h3 className="text-white text-[22px] mb-[35px] relative pb-[15px] after:absolute after:bottom-0 after:left-0 after:w-[50px] after:h-[2px] after:bg-primary">Departments</h3>
            <ul className="space-y-[15px]">
              {departmentLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/70 hover:text-primary transition-all flex items-center gap-[10px] group">
                    <ArrowRight className="w-[14px] h-[14px] opacity-0 -ml-[20px] group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-[22px] mb-[35px] relative pb-[15px] after:absolute after:bottom-0 after:left-0 after:w-[50px] after:h-[2px] after:bg-primary">Contact Us</h3>
            <div className="space-y-[25px]">
              <div className="flex gap-[15px] items-start">
                <div className="w-[45px] h-[45px] rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Phone className="w-[20px] h-[20px]" />
                </div>
                <div>
                  <h4 className="text-white text-[16px] mb-[5px]">Phone Number</h4>
                  <p className="text-white/70">+251 11 123 4567</p>
                </div>
              </div>

              <div className="flex gap-[15px] items-start">
                <div className="w-[45px] h-[45px] rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-[20px] h-[20px]" />
                </div>
                <div>
                  <h4 className="text-white text-[16px] mb-[5px]">Email Address</h4>
                  <p className="text-white/70">info@yanethospital.com</p>
                </div>
              </div>

              <div className="flex gap-[15px] items-start">
                <div className="w-[45px] h-[45px] rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-[20px] h-[20px]" />
                </div>
                <div>
                  <h4 className="text-white text-[16px] mb-[5px]">Location</h4>
                  <p className="text-white/70">Addis Ababa, Ethiopia</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-[30px] border-t border-white/10 text-center">
          <p className="text-white/50 text-[14px]">
            &copy; {new Date().getFullYear()} Yanet Hospital. All Rights Reserved. Designed by Corf Team.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
