import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const TopHeader = () => {
  return (
    <div className="bg-secondary text-white py-2 hidden lg:block">
      <div className="container-custom flex justify-between items-center text-sm">
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <MapPin size={16} className="text-primary mr-2" />
            <span>123 Medical St, New York, NY 10001</span>
          </div>
          <div className="flex items-center">
            <Phone size={16} className="text-primary mr-2" />
            <span>+1 (123) 456-7890</span>
          </div>
          <div className="flex items-center">
            <Mail size={16} className="text-primary mr-2" />
            <span>info@yanet-hospital.com</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="hover:text-primary transition-colors"><Facebook size={16} /></a>
          <a href="#" className="hover:text-primary transition-colors"><Twitter size={16} /></a>
          <a href="#" className="hover:text-primary transition-colors"><Linkedin size={16} /></a>
          <a href="#" className="hover:text-primary transition-colors"><Instagram size={16} /></a>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
