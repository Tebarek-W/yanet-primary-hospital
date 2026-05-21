import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { User, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import DoctorCard from '../Doctors/DoctorCard';
import { doctorsData } from '../../data/doctorsData';
import type { Doctor } from '../../data/doctorsData';
import { api } from '../../utils/api';
import drKirubelImage from '../../assets/Dr._Kirubel_Abraham.jpg';

const Doctors = () => {
  const { t } = useTranslation();
  const isAmharic = t('nav.home') === 'መነሻ';

  const [homeDoctors, setHomeDoctors] = useState<Doctor[]>(doctorsData.slice(0, 4));

  // Fetch live doctors from API; slice first 4 for home page
  useEffect(() => {
    api.doctors.getAll()
      .then((data: Doctor[]) => {
        if (Array.isArray(data) && data.length > 0) setHomeDoctors(data.slice(0, 4));
      })
      .catch(() => { /* keep static fallback */ });
  }, []);

  return (
    <section id="doctors" className="section-padding bg-light-bg/20 overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-[600px]">
            <span className="text-primary font-bold tracking-[2px] uppercase text-[12px] mb-4 block">
              {t('home_doctors.badge')}
            </span>
            <h2 className="text-[32px] md:text-[42px] font-bold text-secondary leading-tight mb-4">
              {t('home_doctors.title')}
            </h2>
            <p className="text-[#5d666e] text-[16px]">
              {t('home_doctors.desc')}
            </p>
          </div>
          
          <Link 
            to="/doctors" 
            className="group flex items-center gap-3 bg-white border border-gray-100 px-8 py-4 rounded-full text-secondary font-bold text-[14px] hover:bg-primary hover:text-white transition-all shadow-sm mb-2"
          >
            <User className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
            {isAmharic ? "ሁሉንም ዶክተሮች ይመልከቱ" : "VIEW ALL DOCTORS"}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {homeDoctors.map((doctor) => (
            <DoctorCard 
              key={doctor.id} 
              doctor={{
                ...doctor,
                image: drKirubelImage,
                name: isAmharic ? doctor.nameAm : doctor.name,
                role: t(doctor.roleKey),
                desc: isAmharic ? doctor.descAm : doctor.desc
              }} 
            />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 text-center md:hidden">
          <Link 
            to="/doctors" 
            className="inline-flex items-center gap-3 bg-primary text-white px-10 py-4 rounded-full font-bold text-[14px] shadow-xl shadow-primary/30"
          >
            {isAmharic ? "ሁሉንም ዶክተሮች ይመልከቱ" : "VIEW ALL DOCTORS"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Doctors;
