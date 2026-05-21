import { motion } from 'framer-motion';
import { CreditCard, Landmark, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Partnerships = ({ cmsData }: { cmsData?: Record<string, any> | null }) => {
  const { t } = useTranslation();
  const isAmharic = t('nav.home') === 'መነሻ';

  // Parse partner lists from CMS or fall back to static defaults
  const parseList = (raw: string | undefined, staticFallback: string[]): string[] => {
    if (raw) return raw.split(',').map(s => s.trim()).filter(Boolean);
    return staticFallback;
  };

  const insurersList  = parseList(cmsData?.partner_insurers,  ['Nyala Insurance', 'Medhin Insurance', 'United Insurance', 'Awash Insurance']);
  const hospitalsList = parseList(cmsData?.partner_hospitals, ['Black Lion Hospital', 'Hawassa University Hospital']);
  const ngosList      = parseList(cmsData?.partner_ngos,      ['Ethiopian Red Cross', 'USAID Ethiopia']);

  const partnerGroups = [
    {
      key: 'insurers',
      icon: <CreditCard className="w-6 h-6" />,
      color: 'text-primary', bg: 'bg-primary/5',
      partners: insurersList,
      isRaw: true
    },
    {
      key: 'hospitals',
      icon: <Landmark className="w-6 h-6" />,
      color: 'text-secondary', bg: 'bg-secondary/5',
      partners: hospitalsList,
      isRaw: true
    },
    {
      key: 'ngos',
      icon: <ShieldCheck className="w-6 h-6" />,
      color: 'text-teal-600', bg: 'bg-teal-50',
      partners: ngosList,
      isRaw: true
    }
  ];

  return (
    <section className="section-padding bg-[#ffffff] relative overflow-hidden">
      {/* Decorative side accent lines */}
      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary via-secondary to-primary/20 opacity-30" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="section-title !mb-[50px] text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[100px] font-black text-primary/[0.04] select-none pointer-events-none z-0 whitespace-nowrap uppercase">
            {isAmharic ? 'አጋሮች' : 'COLLABORATIONS'}
          </div>
          <span className="relative z-10 text-primary font-bold uppercase tracking-wider text-[11px] !bg-transparent !p-0">
            {cmsData?.partner_badge || t('about_partnerships.badge')}
          </span>
          <h2 className="relative z-10 text-[32px] font-bold text-secondary mt-2">
            {cmsData?.partner_title || t('about_partnerships.title')}
          </h2>
          <p className="relative z-10 text-[#5d666e] mt-3 max-w-[650px] mx-auto text-[14px]">
            {cmsData?.partner_desc || t('about_partnerships.desc')}
          </p>
        </div>

        {/* Categories Divisions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {partnerGroups.map((group, groupIdx) => (
            <motion.div
              key={group.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIdx * 0.15, duration: 0.5 }}
              className="bg-white border border-gray-100 rounded-[12px] p-6 shadow-[0_10px_35px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_45px_rgba(0,0,0,0.05)] transition-all duration-500 flex flex-col"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 pb-4 border-b border-gray-100 mb-5">
                <div className={`p-2.5 rounded-xl ${group.bg} ${group.color}`}>
                  {group.icon}
                </div>
                <h3 className="text-[18px] font-bold text-secondary">
                  {t(`about_partnerships.categories.${group.key}`)}
                </h3>
              </div>

              {/* Partners list inside the category */}
              <div className="flex flex-col gap-3 flex-grow">
                {group.partners.map((partner, pIdx) => (
                  <motion.div
                    key={pIdx}
                    whileHover={{ x: 5 }}
                    className="p-3 bg-gray-50/50 hover:bg-[#eef9fb]/50 rounded-[8px] border border-gray-50 flex items-center gap-3 transition-all duration-300"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-[#0e121d] font-bold text-[14px]">{partner}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partnerships;
