import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, MapPin, Phone, Mail, Clock, ArrowRight, SlidersHorizontal } from 'lucide-react';
import Breadcrumb from '../components/About/Breadcrumb';
import CTABanner from '../components/About/CTABanner';
import { branchesData } from '../data/branchesData';
import { doctorsData } from '../data/doctorsData';
import { servicesData } from '../data/servicesData';

const BranchesPage = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const isAmharic = currentLang.startsWith('am');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedService, setSelectedService] = useState('All');

  // Extract all unique cities for filtering
  const cities = useMemo(() => {
    const uniqueCities = new Set(branchesData.map(b => b.city));
    return ['All', ...Array.from(uniqueCities)];
  }, []);

  // Filter branches based on search and selected options
  const filteredBranches = useMemo(() => {
    return branchesData.filter((branch) => {
      // 1. City Filter
      if (selectedCity !== 'All' && branch.city !== selectedCity) {
        return false;
      }

      // 2. Service Filter
      if (selectedService !== 'All' && !branch.serviceSlugs.includes(selectedService)) {
        return false;
      }

      // 3. Search Query Filter (Branch name, address, services, or practicing doctor name)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        
        // Search branch name and city
        const nameMatch = branch.name.toLowerCase().includes(query) || 
                          branch.nameAm.toLowerCase().includes(query) ||
                          branch.city.toLowerCase().includes(query) ||
                          branch.cityAm.toLowerCase().includes(query);
                          
        // Search address
        const addressMatch = branch.address.toLowerCase().includes(query) ||
                             branch.addressAm.toLowerCase().includes(query);

        // Search services available
        const servicesMatch = branch.serviceSlugs.some((slug) => {
          const service = servicesData.find(s => s.slug === slug);
          if (!service) return false;
          return service.title.toLowerCase().includes(query) || 
                 service.titleAm.toLowerCase().includes(query);
        });

        // Search practicing doctors
        const doctorsMatch = branch.doctorIds.some((docId) => {
          const doctor = doctorsData.find(d => d.id === docId);
          if (!doctor) return false;
          return doctor.name.toLowerCase().includes(query) || 
                 doctor.nameAm.toLowerCase().includes(query) ||
                 doctor.specialty.toLowerCase().includes(query);
        });

        return nameMatch || addressMatch || servicesMatch || doctorsMatch;
      }

      return true;
    });
  }, [searchQuery, selectedCity, selectedService]);

  return (
    <div className="bg-white relative overflow-hidden">
      <Breadcrumb title={isAmharic ? 'ቅርንጫፎቻችን' : 'Our Branches'} />

      {/* Main Content Section */}
      <section className="py-20 relative min-h-[500px]">
        {/* Subtle decorative background watermarks */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-tr from-secondary/5 to-transparent pointer-events-none z-0"></div>

        <div className="container-custom relative z-10">
          
          {/* Section intro header */}
          <div className="max-w-[700px] mx-auto text-center mb-16">
            <span className="text-primary font-bold tracking-[3px] uppercase text-[12px] mb-4 block">
              {isAmharic ? 'ያኔት ፕራይመሪ ሆስፒታል' : 'Yanet Primary Hospital'}
            </span>
            <h2 className="text-[34px] md:text-[44px] font-bold text-secondary mb-6 leading-tight">
              {isAmharic ? 'የቅርንጫፎቻችን ማውጫ' : 'Find a Yanet Branch Near You'}
            </h2>
            <p className="text-[#5d666e] text-[16px] md:text-[18px]">
              {isAmharic 
                ? 'ምርጥ የህክምና አገልግሎቶቻችንን በመላ ሀገሪቱ ባሉ ቅርንጫፎቻችን ያግኙ። ፈጣን እና ቀልጣፋ ህክምና ለመስጠት ሁሌም ዝግጁ ነን።' 
                : 'Access our high-quality medical services across any of our regional hospital branches, fully equipped with senior medical experts and advanced diagnosis facilities.'}
            </p>
          </div>

          {/* Search and Filters Panel */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 mb-16 max-w-[1100px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              
              {/* Search Bar Input */}
              <div className="lg:col-span-5 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text"
                  placeholder={isAmharic ? 'ቅርንጫፍ፣ ከተማ፣ ዶክተር ወይም ሕክምና ይፈልጉ...' : 'Search by branch, city, doctor or service...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 text-[14px] font-medium text-secondary"
                />
              </div>

              {/* City Filter */}
              <div className="lg:col-span-3 relative">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 text-[14px] font-bold text-secondary appearance-none cursor-pointer"
                >
                  <option value="All">{isAmharic ? 'ሁሉም ከተሞች' : 'All Cities'}</option>
                  {cities.filter(c => c !== 'All').map((city) => {
                    const branch = branchesData.find(b => b.city === city);
                    const cityNameAm = branch ? branch.cityAm : city;
                    return (
                      <option key={city} value={city}>
                        {isAmharic ? cityNameAm : city}
                      </option>
                    );
                  })}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
              </div>

              {/* Service Filter */}
              <div className="lg:col-span-4 relative">
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 text-[14px] font-bold text-secondary appearance-none cursor-pointer"
                >
                  <option value="All">{isAmharic ? 'ሁሉም የህክምና ዘርፎች' : 'All Departments / Services'}</option>
                  {servicesData.map((service) => (
                    <option key={service.slug} value={service.slug}>
                      {isAmharic ? service.titleAm : service.title}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
              </div>

            </div>
          </div>

          {/* Results Grid */}
          <div className="max-w-[1200px] mx-auto">
            <AnimatePresence mode="popLayout">
              {filteredBranches.length > 0 ? (
                <motion.div 
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredBranches.map((branch, index) => (
                    <motion.div
                      layout
                      key={branch.slug}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden flex flex-col justify-between"
                    >
                      {/* Branch Card Top - Cover Image */}
                      <div className="relative h-[220px] overflow-hidden">
                        <img 
                          src={branch.image} 
                          alt={branch.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        {/* Gradient tint */}
                        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent"></div>
                        
                        {/* City Badge Overlay */}
                        <div className="absolute top-4 left-4 bg-primary text-white font-extrabold text-[11px] tracking-wider uppercase px-3 py-1.5 rounded-full shadow-md z-10">
                          {isAmharic ? branch.cityAm : branch.city}
                        </div>
                      </div>

                      {/* Branch Card Content */}
                      <div className="p-6 flex-grow flex flex-col justify-between">
                        <div>
                          <h3 className="text-[20px] font-extrabold text-secondary mb-3 group-hover:text-primary transition-colors">
                            {isAmharic ? branch.nameAm : branch.name}
                          </h3>
                          
                          {/* Localized Address */}
                          <div className="flex items-start gap-2.5 mb-4 text-[#5d666e] text-[13.5px] leading-relaxed">
                            <MapPin className="w-[18px] h-[18px] text-primary shrink-0 mt-0.5" />
                            <span>{isAmharic ? branch.addressAm : branch.address}</span>
                          </div>

                          {/* Quick Info Grid */}
                          <div className="border-t border-b border-gray-100 py-3.5 my-4 flex flex-col gap-2.5">
                            <div className="flex items-center gap-2.5 text-[#5d666e] text-[13px]">
                              <Phone className="w-4 h-4 text-primary shrink-0" />
                              <a href={`tel:${branch.phone.replace(/\s+/g, '')}`} className="hover:text-primary transition-colors font-semibold">{branch.phone}</a>
                            </div>
                            <div className="flex items-center gap-2.5 text-[#5d666e] text-[13px]">
                              <Mail className="w-4 h-4 text-primary shrink-0" />
                              <a href={`mailto:${branch.email}`} className="hover:text-primary transition-colors font-medium break-all">{branch.email}</a>
                            </div>
                            <div className="flex items-center gap-2.5 text-[#5d666e] text-[13px]">
                              <Clock className="w-4 h-4 text-primary shrink-0" />
                              <span className="font-semibold">{isAmharic ? branch.workingHours.weekdaysAm : branch.workingHours.weekdays}</span>
                            </div>
                          </div>

                          {/* Services Highlight Tags */}
                          <div className="mt-4 mb-6">
                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                              {isAmharic ? 'ዋና ዋና አገልግሎቶች' : 'Featured Services'}
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {(isAmharic ? branch.featuredServicesAm : branch.featuredServices).slice(0, 3).map((feat) => (
                                <span key={feat} className="text-[11px] font-bold bg-primary/5 text-primary px-2.5 py-1 rounded-md">
                                  {feat}
                                </span>
                              ))}
                              {branch.serviceSlugs.length > 3 && (
                                <span className="text-[10px] font-black text-gray-500 px-2 py-1 bg-gray-50 rounded-md">
                                  +{branch.serviceSlugs.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Detail Link Trigger */}
                        <Link 
                          to={`/branches/${branch.slug}`}
                          className="w-full py-3 bg-secondary group-hover:bg-primary text-white font-bold text-[13px] rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-secondary/15 hover:shadow-primary/20"
                        >
                          <span>{isAmharic ? 'የቅርንጫፍ ዝርዝር ይመልከቱ' : 'Explore Branch Details'}</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                /* No Results State */
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 bg-gray-50 rounded-3xl p-8 border border-gray-100 max-w-[600px] mx-auto"
                >
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-[18px] font-bold text-secondary mb-2">
                    {isAmharic ? 'ምንም ቅርንጫፍ አልተገኘም' : 'No Branches Match Your Criteria'}
                  </h3>
                  <p className="text-gray-500 text-[14px]">
                    {isAmharic 
                      ? 'እባክዎ ፍለጋዎን ይቀይሩ ወይም ያስገቡትን ቃል በድጋሚ ያረጋግጡ።' 
                      : 'Try broadening your search keywords or resetting the city and medical department filters.'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      <CTABanner />
    </div>
  );
};

export default BranchesPage;
