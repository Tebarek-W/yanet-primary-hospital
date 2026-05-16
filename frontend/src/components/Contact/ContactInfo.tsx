import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ContactInfo = () => {
  const { t } = useTranslation();

  const infoItems = [
    {
      icon: <Phone className="w-5 h-5" />,
      title: t('footer.phone'),
      details: ["+251 11 123 4567", "+251 91 123 4567"],
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: t('footer.email'),
      details: ["info@yanethospital.com", "support@yanethospital.com"],
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: t('footer.location'),
      details: [t('nav.home') === 'መነሻ' ? "ቦሌ መንገድ፣ አዲስ አበባ" : "Bole Road, Addis Ababa", t('nav.home') === 'መነሻ' ? "ኢትዮጵያ፣ የፖ.ሳ.ቁ. 1234" : "Ethiopia, PO Box 1234"],
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: t('common.opening_hours'),
      details: [t('nav.home') === 'መነሻ' ? "ሰኞ - እሁድ: 24 ሰዓት" : "Mon - Sun: 24 Hours", t('nav.home') === 'መነሻ' ? "ድንገተኛ አደጋ: ሁልጊዜ ክፍት" : "Emergency: Always Open"],
      color: "text-amber-500",
      bgColor: "bg-amber-50"
    }
  ];

  return (
    <div className="space-y-12">
      <div className="max-w-[450px]">
        <h2 className="text-[36px] font-bold text-secondary mb-6 leading-tight">{t('nav.home') === 'መነሻ' ? 'ከእኛ ባለሙያዎች ጋር' : 'Get in Touch'} <br /><span className="text-primary italic">{t('nav.home') === 'መነሻ' ? 'ይገናኙ' : 'With Our Experts'}</span></h2>
        <p className="text-body text-[16px] leading-relaxed">{t('nav.home') === 'መነሻ' ? 'ለማንኛውም የህክምና ጥያቄዎች እርስዎን ለመርዳት እዚህ ነን። በማንኛውም የእነዚህ ቻናሎች ያግኙን።' : 'We are here to help you with any medical inquiries. Reach out to us through any of these channels.'}</p>
      </div>

      <div className="space-y-8">
        {infoItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-6 group"
          >
            <div className={`w-12 h-12 ${item.bgColor} ${item.color} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
              {item.icon}
            </div>
            <div>
              <h4 className="text-[14px] font-bold text-primary uppercase tracking-[2px] mb-2">{item.title}</h4>
              <div className="space-y-1">
                {item.details.map((detail, i) => (
                  <p key={i} className="text-secondary font-bold text-[18px] md:text-[20px]">{detail}</p>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Social Media Links */}
      <div className="pt-10 border-t border-gray-100 max-w-[400px]">
        <h4 className="text-secondary font-bold text-[16px] mb-6 tracking-wide">{t('nav.home') === 'መነሻ' ? 'አዳዲስ መረጃዎችን ይከታተሉ' : 'Follow Our Updates'}</h4>
        <div className="flex gap-4">
          {['Facebook', 'Twitter', 'Linkedin', 'Instagram'].map((social) => (
            <a key={social} href="#" className="text-secondary/40 hover:text-primary font-bold text-[14px] uppercase tracking-wider transition-colors">{social}</a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;

