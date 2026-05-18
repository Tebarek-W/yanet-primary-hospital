import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Brain, Baby, Sun, Leaf } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const campaigns = [
  {
    icon: <Heart className="w-6 h-6" />,
    color: 'bg-rose-50 text-rose-500 border-rose-100',
    titleEn: 'World Heart Day', titleAm: 'የዓለም የልብ ቀን',
    descEn: 'Join our annual heart health screening drive — free ECG and blood pressure checks for all visitors.',
    descAm: 'ዓመታዊ የልብ ጤና ምርመራ ዘመቻችን ይቀላቀሉ — ለሁሉም ጎብኚዎች ነጻ ECG እና የደም ግፊት ምርመራ።',
    dateEn: 'September 29, 2026', dateAm: 'መስከረም 29, 2026',
  },
  {
    icon: <Brain className="w-6 h-6" />,
    color: 'bg-purple-50 text-purple-500 border-purple-100',
    titleEn: 'Mental Health Awareness Month', titleAm: 'የአዕምሮ ጤና ግንዛቤ ወር',
    descEn: 'Free mental health consultations and community support sessions every Saturday during October.',
    descAm: 'ነጻ የአዕምሮ ጤና ምክክሮች እና የማህበረሰብ ድጋፍ ክፍለ ጊዜዎች በጥቅምት ወር ሁሉ ቅዳሜ ቅዳሜ።',
    dateEn: 'October 2026', dateAm: 'ጥቅምት 2026',
  },
  {
    icon: <Baby className="w-6 h-6" />,
    color: 'bg-sky-50 text-sky-500 border-sky-100',
    titleEn: 'Child Immunization Drive', titleAm: 'የህፃናት ክትባት ዘመቻ',
    descEn: 'Bring your children under 5 for free vaccinations. No appointment needed — walk in any weekday.',
    descAm: 'ከ5 ዓመት በታች ያሉ ልጆቻችሁን ይዛቹ ኑ። ቀጠሮ አያስፈልግም — በሳምንቱ ቀናት ሁሉ ይምጡ።',
    dateEn: 'Ongoing 2026', dateAm: 'ቀጣይ 2026',
  },
  {
    icon: <Sun className="w-6 h-6" />,
    color: 'bg-amber-50 text-amber-500 border-amber-100',
    titleEn: 'Diabetes Prevention Campaign', titleAm: 'የስኳር በሽታ መከላከያ ዘመቻ',
    descEn: 'Free blood glucose screening and lifestyle counseling for adults at risk of Type 2 diabetes.',
    descAm: 'ነጻ የደም ስኳር ምርምር እና ለዓይነት 2 የስኳር ህመም አደጋ ለተጋለጡ አዋቂዎች የአኗኗር ዘይቤ ምክክር።',
    dateEn: 'November 14, 2026', dateAm: 'ህዳር 14, 2026',
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    color: 'bg-green-50 text-green-600 border-green-100',
    titleEn: 'Clean & Healthy Community', titleAm: 'ንጹህ እና ጤናማ ማህበረሰብ',
    descEn: 'Environmental health workshops and sanitation education for schools and local communities.',
    descAm: 'ለትምህርት ቤቶች እና ለአካባቢ ማህበረሰቦች የአካባቢ ጤና አውደ ጥናቶች እና የንጽህና ትምህርት።',
    dateEn: 'Monthly', dateAm: 'ወርሃዊ',
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    color: 'bg-teal-50 text-teal-600 border-teal-100',
    titleEn: 'Cancer Awareness & Early Detection', titleAm: 'የካንሰር ግንዛቤ እና ቀደምት ምርምር',
    descEn: 'Educational sessions on early cancer signs with free cervical and breast cancer screenings for women.',
    descAm: 'ስለ ቀደምት የካንሰር ምልክቶች ትምህርት ክፍለ ጊዜዎች ከነጻ የሴቶች ካንሰር ምርምር ጋር።',
    dateEn: 'October & February', dateAm: 'ጥቅምት እና የካቲት',
  },
];

const AwarenessCampaigns = () => {
  const { t } = useTranslation();
  const isAmharic = t('nav.home') === 'መነሻ';

  return (
    <section className="py-[80px] bg-white">
      <div className="container-custom">
        <div className="section-title text-center !mb-12">
          <span className="text-primary font-bold uppercase tracking-wider text-[11px]">
            {isAmharic ? 'ግንዛቤ ዘመቻዎች' : 'AWARENESS CAMPAIGNS'}
          </span>
          <h2 className="text-secondary text-[30px] font-bold mt-2">
            {isAmharic ? 'የጤና ግንዛቤ ዘመቻዎቻችን' : 'Our Health Awareness Campaigns'}
          </h2>
          <p className="text-[14px] text-[#5d666e] max-w-[600px] mx-auto mt-3">
            {isAmharic
              ? 'ያኔት ሆስፒታል ጤናን ከህክምና ቤት ባሻገር ወደ ማህበረሰቡ ለማድረስ ዓላማ ያለው ሃገር አቀፍ ዘመቻዎችን ያካሂዳል።'
              : 'Yanet Hospital runs purposeful national campaigns to bring health education and preventive care beyond the clinic walls.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[28px]">
          {campaigns.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white border border-gray-100 rounded-[14px] p-6 hover:shadow-[0_15px_40px_rgba(0,0,0,0.05)] hover:border-primary/15 transition-all duration-400 group"
            >
              <div className={`w-12 h-12 rounded-[10px] border flex items-center justify-center mb-5 ${c.color} group-hover:scale-110 transition-transform duration-300`}>
                {c.icon}
              </div>
              <span className="inline-block text-[10px] font-bold text-primary bg-primary/5 border border-primary/10 rounded-full px-2.5 py-0.5 uppercase tracking-wider mb-3">
                {isAmharic ? c.dateAm : c.dateEn}
              </span>
              <h3 className="text-[16px] font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
                {isAmharic ? c.titleAm : c.titleEn}
              </h3>
              <p className="text-[13px] text-[#5d666e] leading-relaxed">
                {isAmharic ? c.descAm : c.descEn}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwarenessCampaigns;
