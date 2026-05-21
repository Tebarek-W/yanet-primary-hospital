import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { hrContactData } from '../../data/careersData';

interface HRContactProps {
  cmsData?: Record<string, any> | null;
}

const HRContact: React.FC<HRContactProps> = ({ cmsData }) => {
  const { t, i18n } = useTranslation();
  const isAmharic = i18n.language.startsWith('am');

  // Use CMS data if available, fall back to static data
  const email = cmsData?.hr_email || hrContactData.email;
  const phone = cmsData?.hr_phone || hrContactData.phone;
  const address = isAmharic
    ? (cmsData?.hr_address_am || hrContactData.addressAm)
    : (cmsData?.hr_address || hrContactData.address);
  const workingHours = isAmharic
    ? (cmsData?.hr_hours_am || hrContactData.workingHoursAm)
    : (cmsData?.hr_hours || hrContactData.workingHours);

  return (
    <div className="py-[100px] bg-secondary relative overflow-hidden text-white">
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Info */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider border border-primary/30">
              <Users size={14} />
              {t('careers.hr_dept', 'Human Resources')}
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              {t('careers.connect_hr', 'Have Questions About')} <span className="text-primary">{t('careers.recruitment', 'Recruitment?')}</span>
            </h2>
            <p className="text-white/70 font-medium leading-relaxed text-lg">
              {t('careers.hr_desc', 'Our Talent Acquisition team is here to assist you throughout the hiring process. Feel free to reach out regarding application statuses, employee benefits, or general career inquiries.')}
            </p>
          </div>

          {/* Right Column: Contact Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.a
              href={`mailto:${email}`}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md flex items-start gap-4 hover:border-primary/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{t('careers.email_us', 'Email Direct')}</h4>
                <p className="text-sm font-black text-white">{email}</p>
                <span className="text-[10px] font-bold text-primary mt-2 inline-block">Response in 24h &rarr;</span>
              </div>
            </motion.a>

            <motion.a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md flex items-start gap-4 hover:border-primary/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{t('careers.call_hr', 'Call HR Office')}</h4>
                <p className="text-sm font-black text-white">{phone}</p>
                <span className="text-[10px] font-bold text-primary mt-2 inline-block">Direct Line &rarr;</span>
              </div>
            </motion.a>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md flex items-start gap-4 sm:col-span-2">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{t('careers.office_loc', 'HR Suite Location')}</h4>
                <p className="text-sm font-black text-white leading-relaxed mb-2">{address}</p>
                <div className="flex items-center gap-1.5 text-xs text-primary font-bold">
                  <Clock size={14} />
                  <span>{workingHours}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRContact;
