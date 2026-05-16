import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const DoctorCard = ({ doctor }: { doctor: any }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="bg-[#eef9fb] rounded-[5px] p-6 text-center relative group h-full"
    >
      {/* Droplet Background Shape */}
      <div className="relative mx-auto mb-6 w-[180px] h-[180px]">
        <div 
          className="absolute inset-0 bg-primary transition-transform duration-500 group-hover:rotate-12"
          style={{ borderRadius: '50% 50% 0 50%' }}
        ></div>
        <div className="absolute inset-2 overflow-hidden" style={{ borderRadius: '50% 50% 0 50%' }}>
          <img 
            src={doctor.image} 
            alt={doctor.name} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="relative z-10">
        <h3 className="text-[18px] font-bold text-secondary mb-1">
          {doctor.name}
        </h3>
        <p className="text-primary font-bold text-[13px] mb-3 uppercase">{doctor.role}</p>
        <p className="text-[#5d666e] text-[13.5px] leading-relaxed mb-5 px-2">
          {doctor.desc}
        </p>

        {/* Social Icons */}
        <div className="flex justify-center gap-2">
          {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white hover:bg-secondary transition-colors"
            >
              <Icon className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const DoctorTeam = () => {
  const { t } = useTranslation();
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isAmharic = t('nav.home') === 'መነሻ';

  const doctors = [
    {
      name: isAmharic ? "ዶ/ር ጀምስ ዋትሰን" : "Dr. Jemse Watson",
      role: t('doctor_team.roles.necrologist'),
      desc: isAmharic ? "በነርቭ ሕመም እና በአንጎል ሁኔታዎች ላይ ያተኩራል።" : "Specializes in neurological disorders and brain conditions.",
      image: "/doctors/doctor1.png",
    },
    {
      name: isAmharic ? "ዶ/ር ኒልስ ቦር" : "Dr. Neels Bore",
      role: t('doctor_team.roles.surgery'),
      desc: isAmharic ? "በተለያዩ የቀዶ ጥገና ሂደቶች እና ቴክኒኮች ከፍተኛ ችሎታ ያለው።" : "Highly skilled in various surgical procedures and techniques.",
      image: "/doctors/doctor2.png",
    },
    {
      name: isAmharic ? "ዶ/ር ኪልቫ አሊስ" : "Dr. Kilva Alis",
      role: t('doctor_team.roles.cardiologist'),
      desc: isAmharic ? "በልብ ሁኔታዎች እና በልብና የደም ሥር (cardiovascular) ሕክምናዎች ላይ ባለሙያ።" : "Expert in heart conditions and cardiovascular treatments.",
      image: "/doctors/doctor3.png",
    },
    {
      name: isAmharic ? "ዶ/ር አስቴር ማሞ" : "Dr. Aster Mamo",
      role: t('doctor_team.roles.pediatrician'),
      desc: isAmharic ? "ለህፃናት የተሻለ የጤና እንክብካቤ ለመስጠት የተሰጠ።" : "Dedicated to providing the best healthcare for children.",
      image: "/doctors/doctor4.png",
    }
  ];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % doctors.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, doctors.length]);

  const visibleDoctors = [
    doctors[startIndex],
    doctors[(startIndex + 1) % doctors.length],
    doctors[(startIndex + 2) % doctors.length],
  ];

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="section-title !mb-[50px] relative">
          {/* Watermark Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[100px] font-black text-primary/[0.04] select-none pointer-events-none z-0 whitespace-nowrap uppercase">
            {isAmharic ? 'ያኔት ባለሙያዎች' : 'YANET EXPERTS'}
          </div>
          <span className="relative z-10 text-primary font-bold uppercase tracking-wider text-[11px] !bg-transparent !p-0">{t('doctor_team.badge')}</span>
          <h2 className="relative z-10 text-[32px] font-bold text-secondary mt-2">{t('doctor_team.title')}</h2>
          <p className="relative z-10 text-[#5d666e] mt-3 max-w-[600px] mx-auto text-[14px]">
            {t('doctor_team.desc')}
          </p>
        </div>

        <div 
          className="relative px-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Carousel Arrows */}
          <button 
            onClick={() => setStartIndex((prev) => (prev - 1 + doctors.length) % doctors.length)}
            className="absolute -left-2 top-1/2 -translate-y-1/2 text-primary hover:text-secondary transition-colors z-20 bg-white/80 rounded-full shadow-sm p-1"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button 
            onClick={() => setStartIndex((prev) => (prev + 1) % doctors.length)}
            className="absolute -right-2 top-1/2 -translate-y-1/2 text-primary hover:text-secondary transition-colors z-20 bg-white/80 rounded-full shadow-sm p-1"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div className="grid md:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {visibleDoctors.map((doctor) => (
                <DoctorCard key={`${doctor.name}-${startIndex}`} doctor={doctor} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorTeam;

