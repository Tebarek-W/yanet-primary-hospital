import { motion } from 'framer-motion';
import { Mail, Linkedin, Twitter } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LeadershipTeam = () => {
  const { t } = useTranslation();
  const isAmharic = t('nav.home') === 'መነሻ';

  const leaders = [
    {
      key: 'ceo',
      image: '/doctor_new.png',
      socials: { linkedin: '#', twitter: '#', mail: 'tebarek@yanethospital.com' }
    },
    {
      key: 'md',
      image: '/doctors/doctor1.png',
      socials: { linkedin: '#', twitter: '#', mail: 'birhanu@yanethospital.com' }
    },
    {
      key: 'cno',
      image: '/doctors/doctor4.png',
      socials: { linkedin: '#', twitter: '#', mail: 'tigist@yanethospital.com' }
    },
    {
      key: 'coo',
      image: '/doctors/doctor3.png',
      socials: { linkedin: '#', twitter: '#', mail: 'samuel@yanethospital.com' }
    }
  ];

  return (
    <section className="section-padding bg-[#ffffff] relative overflow-hidden">
      {/* Decorative floating grids */}
      <div className="absolute top-10 left-10 w-24 h-24 border border-primary/10 rounded-full blur-xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-32 h-32 border border-secondary/10 rounded-full blur-2xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Section Title */}
        <div className="section-title !mb-[60px] text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[100px] font-black text-primary/[0.04] select-none pointer-events-none z-0 whitespace-nowrap uppercase">
            {isAmharic ? 'አመራር' : 'LEADERSHIP'}
          </div>
          <span className="relative z-10 text-primary font-bold uppercase tracking-wider text-[11px] !bg-transparent !p-0">
            {t('about_leadership.badge')}
          </span>
          <h2 className="relative z-10 text-[32px] font-bold text-secondary mt-2">
            {t('about_leadership.title')}
          </h2>
          <p className="relative z-10 text-[#5d666e] mt-3 max-w-[650px] mx-auto text-[14px]">
            {t('about_leadership.desc')}
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {leaders.map((leader, i) => {
            const memberTranslation = t(`about_leadership.members.${leader.key}`, { returnObjects: true }) as any;
            return (
              <motion.div
                key={leader.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-[12px] border border-gray-100 shadow-[0_10px_35px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-6 transition-all duration-500 flex flex-col h-full text-center group"
              >
                {/* Photo container */}
                <div className="relative mx-auto mb-6 w-[160px] h-[160px] rounded-full p-1.5 bg-gradient-to-tr from-primary/30 to-secondary/30 group-hover:from-primary group-hover:to-secondary transition-all duration-500">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gray-50 border-2 border-white">
                    <img
                      src={leader.image}
                      alt={memberTranslation.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Identity & Role */}
                <div className="mb-4">
                  <h3 className="text-[18px] font-bold text-secondary group-hover:text-primary transition-colors duration-300">
                    {memberTranslation.name}
                  </h3>
                  <span className="inline-block px-3 py-1 mt-1 text-[11px] font-bold text-primary bg-primary/5 rounded-full uppercase tracking-wider">
                    {memberTranslation.role}
                  </span>
                </div>

                {/* Biography */}
                <p className="text-[#5d666e] text-[13px] leading-relaxed mb-6 px-1 flex-grow">
                  {memberTranslation.bio}
                </p>

                {/* Social Actions */}
                <div className="flex justify-center gap-3 pt-4 border-t border-gray-50 mt-auto">
                  <a
                    href={leader.socials.linkedin}
                    className="w-8 h-8 rounded-full bg-gray-50 text-[#8c949c] hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={leader.socials.twitter}
                    className="w-8 h-8 rounded-full bg-gray-50 text-[#8c949c] hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${leader.socials.mail}`}
                    className="w-8 h-8 rounded-full bg-gray-50 text-[#8c949c] hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LeadershipTeam;
