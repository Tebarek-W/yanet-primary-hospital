import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const TopHeader = () => {
  return (
    <div className="bg-white py-[12px] hidden md:block border-b border-gray-100 shadow-sm">
      <div className="container-custom">
        <div className="flex justify-between items-center">
          {/* Contact Info */}
          <div className="flex items-center gap-[30px]">
            <div className="flex items-center gap-[8px] text-body text-[14px]">
              <Phone className="w-[16px] h-[16px] text-primary" />
              <span>+251 11 123 4567</span>
            </div>
            <div className="flex items-center gap-[8px] text-body text-[14px]">
              <Mail className="w-[16px] h-[16px] text-primary" />
              <span>info@yanethospital.com</span>
            </div>
            <div className="flex items-center gap-[8px] text-body text-[14px]">
              <MapPin className="w-[16px] h-[16px] text-primary" />
              <span>Addis Ababa, Ethiopia</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-[20px]">
            <a href="#" className="text-secondary hover:text-primary transition-colors">
              <Facebook className="w-[16px] h-[16px]" />
            </a>
            <a href="#" className="text-secondary hover:text-primary transition-colors">
              <Twitter className="w-[16px] h-[16px]" />
            </a>
            <a href="#" className="text-secondary hover:text-primary transition-colors">
              <Linkedin className="w-[16px] h-[16px]" />
            </a>
            <a href="#" className="text-secondary hover:text-primary transition-colors">
              <Instagram className="w-[16px] h-[16px]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
