import { motion } from 'framer-motion';
import { UserPlus, Cpu, Sparkles, Bell } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const announcements = [
  {
    type: 'doctor',
    icon: <UserPlus className="w-5 h-5" />,
    colorClass: 'bg-teal-50 text-teal-600 border-teal-100',
    badgeEn: 'New Doctor', badgeAm: 'አዲስ ዶክተር',
    titleEn: 'Dr. Meron Alemu Joins Our Neurology Team',
    titleAm: 'ዶ/ር ሜሮን አለሙ የነርቭ ህክምና ቡድናችንን ተቀላቀሉ',
    descEn: 'Yanet Hospital welcomes Dr. Meron Alemu, a board-certified neurologist with 10+ years of specialist experience from AAU Medical School.',
    descAm: 'ያኔት ሆስፒታል ዶ/ር ሜሮን አለሙን ይቀበላሉ — ከAAAU የህክምና ትምህርት ቤት ከ10 ዓመት በላይ ልምድ ያላቸው ሰርተፊኬድ ነርቭ ዶክተር።',
    dateEn: 'June 1, 2026', dateAm: 'ሰኔ 1, 2026',
  },
  {
    type: 'equipment',
    icon: <Cpu className="w-5 h-5" />,
    colorClass: 'bg-blue-50 text-blue-600 border-blue-100',
    badgeEn: 'New Equipment', badgeAm: 'አዲስ መሳሪያ',
    titleEn: 'New GE Voluson E10 4D Ultrasound Now Operational',
    titleAm: 'አዲሱ GE ቮሉሰን E10 4D አልትራሳውንድ አሁን ስራ ጀምሯል',
    descEn: 'Our Imaging Department has upgraded to the latest GE Voluson E10 system, enabling high-definition obstetric and abdominal 4D scans.',
    descAm: 'የምስል ምርምር ክፍላችን ወደ አዲሱ GE ቮሉሰን E10 ስርዓት አሻሽሏል — ከፍተኛ ጥራት ያለው 4D ስካን ያቀርባል።',
    dateEn: 'May 20, 2026', dateAm: 'ግንቦት 20, 2026',
  },
  {
    type: 'service',
    icon: <Sparkles className="w-5 h-5" />,
    colorClass: 'bg-purple-50 text-purple-600 border-purple-100',
    badgeEn: 'New Service', badgeAm: 'አዲስ አገልግሎት',
    titleEn: 'Telemedicine Consultations Now Available',
    titleAm: 'የቴሌሜዲሲን ምክክሮች አሁን ዝግጁ ናቸው',
    descEn: 'Patients can now book secure video consultations with our specialists from anywhere in Ethiopia — no travel required.',
    descAm: 'ታካሚዎች አሁን ከኢትዮጵያ ውስጥ ካሉበት ቦታ ሁሉ ከስፔሻሊስቶቻችን ጋር ደህንነቱ የተጠበቀ ቪዲዮ ምክክር መያዝ ይችላሉ።',
    dateEn: 'May 10, 2026', dateAm: 'ግንቦት 10, 2026',
  },
  {
    type: 'doctor',
    icon: <UserPlus className="w-5 h-5" />,
    colorClass: 'bg-teal-50 text-teal-600 border-teal-100',
    badgeEn: 'New Doctor', badgeAm: 'አዲስ ዶክተር',
    titleEn: 'Dr. Yonas Kebede Appointed Pediatrics Chief',
    titleAm: 'ዶ/ር ዮናስ ከበደ የህፃናት ህክምና ክፍል ኃላፊ ተሾሙ',
    descEn: 'Dr. Yonas Kebede has been appointed Chief of Pediatrics. He brings 12 years of experience in neonatal and pediatric emergency care.',
    descAm: 'ዶ/ር ዮናስ ከበደ የህፃናት ህክምና ኃላፊ ሆነው ተሾሙ። 12 ዓመታት ልምድ ያሏቸው ሲሆን ሕፃናት ድንገተኛ አደጋ ህክምናን ያካሂዳሉ።',
    dateEn: 'April 28, 2026', dateAm: 'ሚያዝያ 28, 2026',
  },
  {
    type: 'equipment',
    icon: <Cpu className="w-5 h-5" />,
    colorClass: 'bg-blue-50 text-blue-600 border-blue-100',
    badgeEn: 'New Equipment', badgeAm: 'አዲስ መሳሪያ',
    titleEn: 'Siemens Digital X-Ray System Upgraded',
    titleAm: 'የሲሜንስ ዲጂታል ኤክስሬይ ስርዓት ተሻሽሏል',
    descEn: 'Our radiology department now operates the new Siemens Multix Impact with ultra-low radiation dose and instant digital imaging.',
    descAm: 'የሬዲዮሎጂ ክፍላችን አዲሱን ሲሜንስ ሙልቲክስ ኢምፓክት — ዝቅተኛ ጨረር እና ፈጣን ዲጂታል ምስሎች ጨምሮ — ያስሄዳል።',
    dateEn: 'April 15, 2026', dateAm: 'ሚያዝያ 15, 2026',
  },
  {
    type: 'service',
    icon: <Sparkles className="w-5 h-5" />,
    colorClass: 'bg-purple-50 text-purple-600 border-purple-100',
    badgeEn: 'New Service', badgeAm: 'አዲስ አገልግሎት',
    titleEn: 'Corporate Health Package Launched',
    titleAm: 'ለድርጅቶች የጤና ፓኬጅ ጀምሯል',
    descEn: 'Companies can now enroll their employees in our comprehensive annual health screening packages at discounted group rates.',
    descAm: 'ድርጅቶች አሁን ሰራተኞቻቸውን ዓመታዊ ሙሉ ጤና ምርምር ፓኬጃችን ውስጥ በቡድን ዋጋ ሊመዘግቧቸው ይችላሉ።',
    dateEn: 'March 30, 2026', dateAm: 'መጋቢት 30, 2026',
  },
];

const Announcements = () => {
  const { t } = useTranslation();
  const isAmharic = t('nav.home') === 'መነሻ';

  return (
    <section className="py-[80px] bg-white">
      <div className="container-custom">
        <div className="section-title text-center !mb-12">
          <span className="text-primary font-bold uppercase tracking-wider text-[11px]">
            {isAmharic ? 'ማስታወቂያዎች' : 'ANNOUNCEMENTS'}
          </span>
          <h2 className="text-secondary text-[30px] font-bold mt-2">
            {isAmharic ? 'አዲስ ዶክተሮች፣ መሳሪያዎች እና አገልግሎቶች' : 'New Doctors, Equipment & Services'}
          </h2>
          <p className="text-[14px] text-[#5d666e] max-w-[580px] mx-auto mt-3">
            {isAmharic
              ? 'ያኔት ሆስፒታል ጤናዎን ለማሻሻል ያለማቋረጥ ይስፋፋል — አዲስ ሐኪሞች፣ ዘመናዊ ቴክኖሎጂ እና አዳዲስ አገልግሎቶች።'
              : 'Yanet Hospital continuously grows to improve your care — with new specialists, modern technology, and expanded services.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[26px]">
          {announcements.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-white border border-gray-100 rounded-[14px] p-6 hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:border-primary/15 transition-all duration-400 group flex flex-col"
            >
              {/* Header row */}
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-[8px] border flex items-center justify-center ${a.colorClass} group-hover:scale-110 transition-transform duration-300`}>
                  {a.icon}
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${a.colorClass} uppercase tracking-wider`}>
                  {isAmharic ? a.badgeAm : a.badgeEn}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-[15px] font-bold text-secondary group-hover:text-primary transition-colors leading-snug mb-2">
                {isAmharic ? a.titleAm : a.titleEn}
              </h3>
              <p className="text-[13px] text-[#5d666e] leading-relaxed flex-grow mb-4">
                {isAmharic ? a.descAm : a.descEn}
              </p>

              {/* Footer date */}
              <div className="flex items-center gap-1.5 text-[11px] text-[#8c949c] border-t border-gray-50 pt-3 mt-auto">
                <Bell className="w-3 h-3 text-primary" />
                <span>{isAmharic ? a.dateAm : a.dateEn}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Announcements;
