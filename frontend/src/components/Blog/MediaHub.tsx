import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Radio, Headphones, Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type MediaTab = 'video' | 'audio' | 'radio' | 'events';

const videos = [
  { titleEn: 'Hospital Tour & Facilities Overview', titleAm: 'ሆስፒታሉን ጉብኝት', thumb: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80', dur: '8:24' },
  { titleEn: 'Understanding Your Cardiology Results', titleAm: 'የልብ ምርምር ውጤቶች', thumb: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80', dur: '12:05' },
  { titleEn: 'Post-Surgery Recovery Tips', titleAm: 'ከቀዶ ጥገና በኋላ ምክሮች', thumb: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&q=80', dur: '6:40' },
];

const audios = [
  { titleEn: 'Managing Hypertension at Home (Podcast)', titleAm: 'ደም ግፊትን ቤት ውስጥ (ፖድካስት)', durEn: '18 min', durAm: '18 ደቂቃ' },
  { titleEn: 'Nutrition for Diabetics — Expert Interview', titleAm: 'ለስኳር ታካሚዎች አመጋገብ', durEn: '22 min', durAm: '22 ደቂቃ' },
  { titleEn: "Children's Health Q&A with Dr. Tebarek", titleAm: 'ከዶ/ር ተባረክ ጋር ጥያቄ እና መልስ', durEn: '15 min', durAm: '15 ደቂቃ' },
];

const events = [
  { titleEn: 'Free Diabetes Screening Day', titleAm: 'ነጻ የስኳር ምርምር ቀን', dateEn: 'June 14, 2026', dateAm: 'ሰኔ 14, 2026', timeEn: '9:00 AM – 1:00 PM', timeAm: '9:00 – 1:00', locEn: 'Yanet Hospital, Main Hall', locAm: 'ያኔት ሆስፒታል' },
  { titleEn: 'Maternal Health Workshop', titleAm: 'የእናቶች ጤና አውደ ጥናት', dateEn: 'June 21, 2026', dateAm: 'ሰኔ 21, 2026', timeEn: '10:00 AM – 12:00 PM', timeAm: '10:00 – 12:00', locEn: 'Conference Room B', locAm: 'ስብሰባ ክፍል B' },
  { titleEn: 'Pediatric Immunization Camp', titleAm: 'የህፃናት ክትባት ካምፕ', dateEn: 'July 5, 2026', dateAm: 'ሐምሌ 5, 2026', timeEn: 'All Day', timeAm: 'ሙሉ ቀን', locEn: 'Pediatrics Wing', locAm: 'የህፃናት ህክምና ክፍል' },
  { titleEn: 'Blood Pressure Awareness Walk', titleAm: 'የደም ግፊት ግንዛቤ', dateEn: 'July 17, 2026', dateAm: 'ሐምሌ 17, 2026', timeEn: '7:00 – 9:00 AM', timeAm: '7:00 – 9:00 ጠዋት', locEn: 'Hospital Grounds', locAm: 'ሆስፒታሉ ግቢ' },
];

const MediaHub = () => {
  const { t } = useTranslation();
  const isAmharic = t('nav.home') === 'መነሻ';
  const [activeTab, setActiveTab] = useState<MediaTab>('video');

  const tabs: { key: MediaTab; labelEn: string; labelAm: string; icon: React.ReactNode }[] = [
    { key: 'video', labelEn: 'Videos', labelAm: 'ቪዲዮዎች', icon: <Play className="w-4 h-4" /> },
    { key: 'audio', labelEn: 'Podcasts', labelAm: 'ፖድካስቶች', icon: <Headphones className="w-4 h-4" /> },
    { key: 'radio', labelEn: 'Radio', labelAm: 'ሬዲዮ', icon: <Radio className="w-4 h-4" /> },
    { key: 'events', labelEn: 'Events & Workshops', labelAm: 'ዝግጅቶች', icon: <Calendar className="w-4 h-4" /> },
  ];

  return (
    <section className="py-[80px] bg-[#f9fdfe]">
      <div className="container-custom">
        <div className="section-title text-center !mb-10">
          <span className="text-primary font-bold uppercase tracking-wider text-[11px]">{isAmharic ? 'ሚዲያ ማዕከል' : 'MEDIA HUB'}</span>
          <h2 className="text-secondary text-[30px] font-bold mt-2">{isAmharic ? 'ቪዲዮ፣ ኦዲዮ፣ ሬዲዮ እና ዝግጅቶች' : 'Video, Audio, Radio & Events'}</h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-bold border transition-all duration-300 ${activeTab === tab.key ? 'bg-secondary text-white border-secondary shadow-md' : 'bg-white text-[#5d666e] border-gray-100 hover:border-primary/30 hover:text-primary'}`}>
              {tab.icon}{isAmharic ? tab.labelAm : tab.labelEn}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'video' && (
            <motion.div key="video" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-[26px]">
              {videos.map((v, i) => (
                <div key={i} className="group bg-white rounded-[14px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
                  <div className="relative h-[180px] overflow-hidden">
                    <img src={v.thumb} alt={isAmharic ? v.titleAm : v.titleEn} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                      </div>
                    </div>
                    <span className="absolute bottom-3 right-3 bg-black/60 text-white text-[11px] font-bold px-2 py-0.5 rounded">{v.dur}</span>
                  </div>
                  <div className="p-5">
                    <h4 className="text-[14px] font-bold text-secondary group-hover:text-primary transition-colors leading-snug">{isAmharic ? v.titleAm : v.titleEn}</h4>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'audio' && (
            <motion.div key="audio" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-4 max-w-[680px] mx-auto">
              {audios.map((a, i) => (
                <div key={i} className="flex items-center gap-5 bg-white border border-gray-100 rounded-[12px] p-5 shadow-sm hover:shadow-md hover:border-primary/15 transition-all group">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[14px] font-bold text-secondary group-hover:text-primary transition-colors">{isAmharic ? a.titleAm : a.titleEn}</h4>
                    <div className="flex items-center gap-1.5 mt-1 text-[12px] text-[#8c949c]">
                      <Clock className="w-3 h-3" /><span>{isAmharic ? a.durAm : a.durEn}</span>
                    </div>
                  </div>
                  <button className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center hover:bg-secondary transition-colors shadow-sm">
                    <Play className="w-3.5 h-3.5 ml-0.5" fill="white" />
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'radio' && (
            <motion.div key="radio" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-[560px] mx-auto bg-secondary rounded-[20px] p-10 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#00B8B8 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <Radio className="w-9 h-9 text-primary" />
                </div>
                <span className="text-primary text-[11px] font-black uppercase tracking-widest block mb-3">{isAmharic ? 'ቀጥታ ስርጭት' : 'Live Broadcast'}</span>
                <h3 className="text-[22px] font-bold mb-3">{isAmharic ? 'ያኔት FM ጤና ሬዲዮ' : 'Yanet FM Health Radio'}</h3>
                <p className="text-white/60 text-[13px] mb-8 leading-relaxed">
                  {isAmharic ? 'ዶክተሮቻችን ቀጥታ ጤና ምክሮችን ያቀርባሉ። ዕለት ዕለት ጠዋት 8:00 – 10:00 ሰዓት።' : 'Our doctors broadcast expert health advice live. Tune in daily 8:00 – 10:00 AM.'}
                </p>
                <button className="bg-primary hover:bg-white hover:text-secondary text-white font-bold px-8 py-3.5 rounded-full transition-all flex items-center gap-2 mx-auto shadow-lg shadow-primary/20">
                  <Play className="w-4 h-4" fill="currentColor" />
                  {isAmharic ? 'አሁን አዳምጥ' : 'Listen Now'}
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'events' && (
            <motion.div key="events" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
              {events.map((ev, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-[14px] p-6 hover:shadow-md hover:border-primary/15 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 shrink-0 rounded-[10px] bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[15px] font-bold text-secondary group-hover:text-primary transition-colors mb-2">{isAmharic ? ev.titleAm : ev.titleEn}</h4>
                      <div className="flex flex-col gap-1.5 text-[12px] text-[#8c949c]">
                        <div className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-primary" /><span>{isAmharic ? ev.dateAm : ev.dateEn}</span></div>
                        <div className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-primary" /><span>{isAmharic ? ev.timeAm : ev.timeEn}</span></div>
                        <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-primary" /><span>{isAmharic ? ev.locAm : ev.locEn}</span></div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MediaHub;
