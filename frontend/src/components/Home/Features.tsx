import { motion } from 'framer-motion';
import { Calendar, UserCheck, PhoneCall, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface FeaturesProps {
  onAppointmentClick: () => void;
  cmsData?: Record<string, any> | null;
}

const Features = ({ onAppointmentClick, cmsData }: FeaturesProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isAmharic = i18n.language?.startsWith('am');

  const showCmsBookingTitle = cmsData?.qa_booking_title && cmsData.qa_booking_title !== "Book Appointment";
  const showCmsBookingDesc = cmsData?.qa_booking_desc && cmsData.qa_booking_desc !== "Easily schedule your visit online.";
  const showCmsHoursTitle = cmsData?.qa_hours_title && cmsData.qa_hours_title !== "Opening Hours";
  const showCmsHoursDesc = cmsData?.qa_hours_desc && cmsData.qa_hours_desc !== "Open 24 hours every day, including holidays.";
  const showCmsEmergencyTitle = cmsData?.qa_emergency_title && cmsData.qa_emergency_title !== "Emergency Cases";
  const showCmsEmergencyDesc = cmsData?.qa_emergency_desc && cmsData.qa_emergency_desc !== "We are available 24/7 for emergency medical services.";
  const showCmsEmergencyPhone = cmsData?.qa_emergency_phone && cmsData.qa_emergency_phone !== "8181";

  const ctas = [
    {
      icon: <Calendar className="w-8 h-8 text-primary" />,
      title: showCmsBookingTitle ? cmsData.qa_booking_title : (isAmharic ? 'ቀጠሮ ያስይዙ' : 'Book Appointment'),
      desc: showCmsBookingDesc ? cmsData.qa_booking_desc : (isAmharic 
        ? 'ከአጠቃላይ እና ስፔሻሊስት ዶክተሮቻችን ጋር ቀጠሮዎን በመስመር ላይ በቀላሉ ያስይዙ።' 
        : 'Schedule an online consultation or in-person visit with our medical team.'),
      btnText: isAmharic ? 'ቀጠሮ ይያዙ' : 'Book Now',
      action: onAppointmentClick,
      colorClass: 'bg-[#E0F7F7]/90 border-primary/10 hover:bg-primary/15',
      textColorClass: 'text-secondary',
      descColorClass: 'text-body',
      iconContainerClass: 'bg-white',
      btnClass: 'text-primary font-bold inline-flex items-center gap-1.5 text-[13px]',
      delay: 0.1
    },
    {
      icon: <UserCheck className="w-8 h-8 text-primary" />,
      title: showCmsHoursTitle ? cmsData.qa_hours_title : (isAmharic ? 'ዶክተር ያግኙ' : 'Find a Doctor'),
      desc: showCmsHoursDesc ? cmsData.qa_hours_desc : (isAmharic 
        ? 'የእኛን የልዩ ባለሙያ ዶክተሮች ዝርዝር ይመልከቱ እና ለእርስዎ የሚስማማውን ባለሙያ ይምረጡ።' 
        : 'Meet our highly qualified team of specialized doctors and choose the right expert.'),
      btnText: isAmharic ? 'ዶክተሮችን ይመልከቱ' : 'Meet Specialists',
      action: () => navigate('/doctors'),
      colorClass: 'bg-[#E0F7F7]/90 border-primary/10 hover:bg-primary/15',
      textColorClass: 'text-secondary',
      descColorClass: 'text-body',
      iconContainerClass: 'bg-white',
      btnClass: 'text-primary font-bold inline-flex items-center gap-1.5 text-[13px]',
      delay: 0.3
    },
    {
      icon: <PhoneCall className="w-8 h-8 text-red-500 animate-pulse-soft" />,
      title: showCmsEmergencyTitle ? cmsData.qa_emergency_title : (isAmharic ? 'ድንገተኛ አገልግሎቶች' : 'Emergency Services'),
      desc: showCmsEmergencyDesc ? cmsData.qa_emergency_desc : (isAmharic 
        ? 'በ24/7 የድንገተኛ አደጋ እና የመጀመሪያ ደረጃ የህክምና እርዳታ ቡድን በፍጥነት ይድረሱ።' 
        : '24/7 immediate trauma care and critical response hotline. Reach our unit instantly.'),
      btnText: showCmsEmergencyPhone ? cmsData.qa_emergency_phone : t('common.emergency_call'),
      action: () => window.open(`tel:${(showCmsEmergencyPhone ? cmsData.qa_emergency_phone : t('common.emergency_call')).replace(/\s+/g, '')}`),
      colorClass: 'bg-red-50/90 border-red-200/50 hover:bg-red-100/70',
      textColorClass: 'text-red-950',
      descColorClass: 'text-red-900/70',
      iconContainerClass: 'bg-white border border-red-100 shadow-sm',
      btnClass: 'text-red-600 font-black inline-flex items-center gap-1.5 text-[13px] animate-pulse-soft',
      delay: 0.5
    }
  ];

  return (
    <section className="relative z-20 mt-[-150px]">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[25px]">
          {ctas.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: item.delay }}
              onClick={item.action}
              className={`backdrop-blur-md p-[30px] rounded-[15px] border flex items-center gap-[20px] transition-all duration-300 cursor-pointer group ${item.colorClass}`}
            >
              <div className={`p-[12px] rounded-full shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300 ${item.iconContainerClass}`}>
                {item.icon}
              </div>
              <div className="flex-grow">
                <h4 className={`text-[18px] font-bold mb-[4px] transition-colors duration-300 ${item.textColorClass}`}>
                  {item.title}
                </h4>
                <p className={`text-[14px] leading-relaxed mb-[6px] transition-colors duration-300 ${item.descColorClass}`}>
                  {item.desc}
                </p>
                <div className="overflow-hidden">
                  <span className={`transition-all duration-300 ${item.btnClass}`}>
                    {item.btnText}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
