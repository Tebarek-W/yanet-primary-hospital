import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Instagram, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Doctors = () => {
  const { t } = useTranslation();
  const isAmharic = t('nav.home') === 'መነሻ';

  const doctors = [
    {
      name: isAmharic ? "ዶ/ር ጀምስ አንደርሰን" : "Dr. James Anderson",
      role: t('doctor_team.roles.cardiologist'),
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
      delay: 0.1
    },
    {
      name: isAmharic ? "ዶ/ር ሳራ ቴይለር" : "Dr. Sarah Taylor",
      role: t('doctor_team.roles.necrologist'),
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1974&auto=format&fit=crop",
      delay: 0.2
    },
    {
      name: isAmharic ? "ዶ/ር ሮበርት ስሚዝ" : "Dr. Robert Smith",
      role: t('doctor_team.roles.surgery'),
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop",
      delay: 0.3
    },
    {
      name: isAmharic ? "ዶ/ር ኤሚሊ ዋይት" : "Dr. Emily White",
      role: t('doctor_team.roles.pediatrician'),
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2000&auto=format&fit=crop",
      delay: 0.4
    }
  ];

  return (
    <section id="doctors" className="pt-[60px] pb-[60px] overflow-hidden">
      <div className="container-custom">
        <div className="section-title">
          <span>{t('home_doctors.badge')}</span>
          <h2 className="text-secondary">{t('home_doctors.title')}</h2>
          <p className="text-[18px]">
            {t('home_doctors.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[35px]">
          {doctors.map((doctor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: doctor.delay }}
              className="group cursor-pointer"
            >
              <div className="relative rounded-[25px] overflow-hidden mb-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-full h-[400px] object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Floating Social Bar */}
                <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-xl border border-white/20 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-10 group-hover:translate-y-0 flex gap-2">
                  {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                    <motion.a 
                      key={i}
                      whileHover={{ scale: 1.2, backgroundColor: '#00B8B8' }}
                      href="#" 
                      className="w-[40px] h-[40px] bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                    </motion.a>
                  ))}
                </div>

                {/* Floating Add Button */}
                <div className="absolute top-[20px] right-[20px] w-[50px] h-[50px] bg-primary rounded-full flex items-center justify-center text-white shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100">
                  <Plus className="w-6 h-6" />
                </div>
              </div>
              
              <div className="text-center group-hover:translate-y-[-5px] transition-transform duration-500">
                <h3 className="text-secondary text-[24px] mb-[8px] group-hover:text-primary transition-colors">
                  {doctor.name}
                </h3>
                <span className="text-primary font-bold tracking-[2px] uppercase text-[12px] bg-primary/5 px-4 py-1 rounded-full">
                  {doctor.role}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Doctors;

