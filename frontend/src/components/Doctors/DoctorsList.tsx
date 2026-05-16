import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import DoctorCard from './DoctorCard';
import { doctorsData } from '../../data/doctorsData';

const ITEMS_PER_PAGE = 8;

const DoctorsList = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const isAmharic = t('nav.home') === 'መነሻ';

  const specialties = [
    { id: 'All', label: t('doctors_page.all') },
    { id: 'Cardiology', label: t('services_page.items.cardiology.title') },
    { id: 'Neurology', label: t('services_page.items.neurology.title') },
    { id: 'Surgery', label: t('services_page.items.surgery.title') },
    { id: 'Pediatrics', label: t('services_page.items.pediatrics.title') },
    { id: 'Ophthalmology', label: t('services_page.items.ophthalmology.title') },
  ];

  // Enhanced search and filter logic
  const filteredDoctors = useMemo(() => {
    return doctorsData.filter(doctor => {
      const matchesFilter = filter === 'All' || doctor.specialty === filter;
      const doctorName = isAmharic ? doctor.nameAm : doctor.name;
      const doctorRole = t(doctor.roleKey);
      
      const matchesSearch = 
        doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctorRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
        
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery, isAmharic, t]);

  // Pagination logic
  const totalPages = Math.ceil(filteredDoctors.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedDoctors = filteredDoctors.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <section className="section-padding bg-light-bg/30">
      <div className="container-custom">
        {/* Filter Bar & Search */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12 bg-white p-6 rounded-[20px] shadow-sm border border-gray-100">
          <div className="flex flex-wrap justify-center lg:justify-start gap-3">
            {specialties.map((spec) => (
              <button
                key={spec.id}
                onClick={() => {
                  setFilter(spec.id);
                  setCurrentPage(1);
                }}
                className={`px-6 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 ${
                  filter === spec.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/30 -translate-y-1'
                    : 'bg-gray-50 text-secondary hover:bg-primary/5 border border-gray-100'
                }`}
              >
                {spec.label}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-[350px]">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={isAmharic ? "ዶክተር ወይም የሕክምና ዘርፍ ይፈልጉ..." : "Search doctor or specialty..."}
              className="w-full bg-gray-50 border border-gray-100 rounded-full px-6 py-3 pl-12 text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-[11px] font-bold text-gray-400 hover:text-primary"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-8 flex items-center justify-between">
          <p className="text-[#5d666e] font-medium">
            {isAmharic ? "ተገኝተዋል" : "Found"} <span className="text-primary font-bold">{filteredDoctors.length}</span> {isAmharic ? "ዶክተሮች" : "doctors"}
          </p>
        </div>

        {/* Doctors Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 min-h-[600px]"
        >
          <AnimatePresence mode="popLayout">
            {paginatedDoctors.map((doctor) => (
              <DoctorCard 
                key={doctor.id} 
                doctor={{
                  ...doctor,
                  name: isAmharic ? doctor.nameAm : doctor.name,
                  role: t(doctor.roleKey),
                  desc: isAmharic ? doctor.descAm : doctor.desc
                }} 
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredDoctors.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-primary" />
            </div>
            <p className="text-secondary text-xl font-bold mb-2">
              {isAmharic ? "ምንም ውጤት አልተገኘም" : "No Results Found"}
            </p>
            <p className="text-[#5d666e]">{t('doctors_page.no_results')}</p>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center items-center gap-3">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                currentPage === 1 
                  ? 'border-gray-100 text-gray-300 cursor-not-allowed' 
                  : 'border-gray-200 text-secondary hover:bg-primary hover:text-white hover:border-primary'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`w-12 h-12 rounded-full font-bold text-[14px] transition-all ${
                  currentPage === i + 1
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-white border border-gray-200 text-secondary hover:border-primary hover:text-primary'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                currentPage === totalPages 
                  ? 'border-gray-100 text-gray-300 cursor-not-allowed' 
                  : 'border-gray-200 text-secondary hover:bg-primary hover:text-white hover:border-primary'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorsList;
