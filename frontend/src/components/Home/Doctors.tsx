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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: doctor.delay }}
              className="group bg-[#eef9fb] rounded-[5px] p-8 text-center relative transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] h-full"
            >
              {/* Droplet Photo Style */}
              <div className="relative mx-auto mb-8 w-[200px] h-[200px]">
                <div 
                  className="absolute inset-0 bg-primary transition-transform duration-500 group-hover:rotate-12"
                  style={{ borderRadius: '50% 50% 0 50%' }}
                ></div>
                <div className="absolute inset-2 overflow-hidden" style={{ borderRadius: '50% 50% 0 50%' }}>
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-secondary text-[22px] font-bold mb-2 group-hover:text-primary transition-colors">
                  {doctor.name}
                </h3>
                <p className="text-primary font-bold tracking-[1px] uppercase text-[12px] mb-6">
                  {doctor.role}
                </p>

                {/* Social Icons Style from About Page */}
                <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white hover:bg-secondary transition-all shadow-lg shadow-primary/20"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Doctors;

