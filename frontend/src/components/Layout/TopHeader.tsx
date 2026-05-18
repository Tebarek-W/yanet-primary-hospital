import { Mail, Phone, Clock, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TopHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white py-[8px] hidden md:block border-b border-gray-100">
      <div className="container-custom">
        <div className="flex justify-between items-center">
          {/* Contact Info */}
          <div className="flex items-center gap-[25px]">
            <div className="flex items-center gap-[8px] text-[#5d666e] text-[10px] font-medium">
              <Clock className="w-[13px] h-[13px] text-primary" />
              <span>{t('nav.home') === 'መነሻ' ? 'ሰኞ-አርብ 9am-5pm' : 'Mon-Fri 9am-5pm'}</span>
            </div>
            <div className="flex items-center gap-[8px] text-body text-[10px]">
              <Mail className="w-[12px] h-[12px] text-primary" />
              <span>info@yanetprimaryhospital.com</span>
            </div>
            <a 
              href={`tel:${t('common.emergency_call').replace(/\s+/g, '')}`} 
              className="flex items-center gap-[8px] text-red-600 hover:text-red-750 transition-colors text-[10px] font-extrabold group/header-phone animate-pulse-soft"
            >
              <Phone className="w-[12px] h-[12px] text-red-500 fill-red-500 group-hover/header-phone:animate-bounce-soft" />
              <span>{t('common.emergency')}: <span className="underline">{t('common.emergency_call')}</span></span>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-[10px]">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-[24px] h-[24px] bg-primary rounded-full flex items-center justify-center text-white hover:bg-secondary transition-all duration-300 shadow-sm"
              >
                <Icon className="w-[11px] h-[11px]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;

