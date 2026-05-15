import { Mail, Phone, Clock, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const TopHeader = () => {
  return (
    <div className="bg-white py-[12px] hidden md:block border-b border-gray-100">
      <div className="container-custom">
        <div className="flex justify-between items-center">
          {/* Contact Info */}
          <div className="flex items-center gap-[25px]">
            <div className="flex items-center gap-[8px] text-[#5d666e] text-[14px] font-medium">
              <Clock className="w-[18px] h-[18px] text-primary" />
              <span>Mon-Fri 9am-5pm</span>
            </div>
            <div className="flex items-center gap-[8px] text-[#5d666e] text-[14px] font-medium">
              <Phone className="w-[18px] h-[18px] text-primary" />
              <span>Call Us: +251-11-123-4567</span>
            </div>
            <div className="flex items-center gap-[8px] text-[#5d666e] text-[14px] font-medium">
              <Mail className="w-[18px] h-[18px] text-primary" />
              <span>Email: info@yanethospital.com</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-[10px]">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-[32px] h-[32px] bg-primary rounded-full flex items-center justify-center text-white hover:bg-secondary transition-all duration-300 shadow-sm"
              >
                <Icon className="w-[14px] h-[14px]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
