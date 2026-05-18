import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HeartPulse, Activity, Stethoscope, Brain, Baby, Eye, 
  FlaskConical, Pill, ShieldCheck, ArrowRight, CheckCircle, 
  Sparkles, Users, Sliders, Calendar, Phone, User, Check,
  X, ChevronRight, HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ServicesHero from '../components/Services/ServicesHero';
import { servicesData } from '../data/servicesData';
import { doctorsData } from '../data/doctorsData';
import { branchesData } from '../data/branchesData';

// Dynamic Icon Mapper
const getIcon = (name: string, className = "w-7 h-7") => {
  switch (name) {
    case 'HeartPulse': return <HeartPulse className={className} />;
    case 'Activity': return <Activity className={className} />;
    case 'Stethoscope': return <Stethoscope className={className} />;
    case 'Brain': return <Brain className={className} />;
    case 'Baby': return <Baby className={className} />;
    case 'Eye': return <Eye className={className} />;
    case 'FlaskConical': return <FlaskConical className={className} />;
    case 'Pills':
    case 'Pill': return <Pill className={className} />;
    case 'ShieldCheck': return <ShieldCheck className={className} />;
    default: return <Stethoscope className={className} />;
  }
};

const ServicesPage = ({ onAppointmentClick }: { onAppointmentClick: () => void }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const isAmharic = currentLang.startsWith('am');

  const [activeTab, setActiveTab] = useState<'department' | 'service'>('department');
  
  // Dynamic Catalogue state (Selected department for real-time preview)
  const filteredServices = useMemo(() => {
    return servicesData.filter(s => s.category === activeTab);
  }, [activeTab]);

  const [selectedSlug, setSelectedSlug] = useState<string>(() => {
    const initial = servicesData.find(s => s.category === 'department');
    return initial ? initial.slug : 'cardiology';
  });

  // Keep selected slug in sync when switching categories
  const handleTabChange = (tab: 'department' | 'service') => {
    setActiveTab(tab);
    const initial = servicesData.find(s => s.category === tab);
    if (initial) {
      setSelectedSlug(initial.slug);
    }
  };

  // Find currently active preview service
  const activeService = useMemo(() => {
    return servicesData.find(s => s.slug === selectedSlug) || filteredServices[0] || servicesData[0];
  }, [selectedSlug, filteredServices]);

  // Fulfills D-02: Resolve doctors practicing in this department specialty
  const activeDoctors = useMemo(() => {
    const related = doctorsData.filter(doc => doc.specialty === activeService.specialty);
    return related.length > 0 ? related : doctorsData.slice(0, 2);
  }, [activeService]);

  // Fulfills D-04: Conversational Triage Form States
  const [triageStep, setTriageStep] = useState<number>(0); // 0: Closed, 1: Branch, 2: Doctor, 3: Contact, 4: Success
  const [triageData, setTriageData] = useState({
    branch: '',
    doctorName: '',
    patientName: '',
    patientPhone: '',
    patientDate: ''
  });
  const [isTriageSubmitting, setIsTriageSubmitting] = useState(false);

  // Dynamic branch list filter based on active service
  const activeBranchesForService = useMemo(() => {
    return branchesData.filter(b => b.serviceSlugs.includes(activeService.slug));
  }, [activeService]);

  // Dynamic doctor recommendation list for triage
  const activeDoctorsForTriage = useMemo(() => {
    return doctorsData.filter(d => activeDoctors.some(ad => ad.id === d.id));
  }, [activeDoctors]);

  // Start step triage flow
  const startTriage = () => {
    setTriageStep(1);
    setTriageData({
      branch: activeBranchesForService[0]?.name || 'Hawassa Branch (HQ)',
      doctorName: activeDoctors[0]?.name || 'Dr. Dawit',
      patientName: '',
      patientPhone: '',
      patientDate: new Date().toISOString().split('T')[0]
    });
  };

  // Submit triage lead conversion
  const handleTriageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!triageData.patientName || !triageData.patientPhone || !triageData.patientDate) return;

    setIsTriageSubmitting(true);
    setTimeout(() => {
      setIsTriageSubmitting(false);
      setTriageStep(4); // Success slot
    }, 1200);
  };

  return (
    <div className="bg-white">
      <ServicesHero />

      {/* Main Interactive Catalog & Triage Section */}
      <section className="pt-20 pb-24 bg-[#f8fafc] relative overflow-hidden">
        {/* Subtle glowing mesh backdrop */}
        <div className="absolute top-[10%] right-0 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[10%] left-0 w-[450px] h-[450px] bg-secondary/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="container-custom relative z-10">
          
          {/* Section Header */}
          <div className="max-w-[750px] mx-auto text-center mb-12">
            <span className="text-primary font-bold uppercase tracking-[3px] text-[11px] mb-3 block">
              {isAmharic ? 'የእኛ የሕክምና ፖርትፎሊዮ' : 'OUR MEDICAL CATALOGUE'}
            </span>
            <h2 className="text-secondary text-[34px] md:text-[44px] font-black leading-tight mb-4">
              {isAmharic ? 'የላቀ የህክምና Discovery ማዕከል' : 'Explore Clinical Excellence'}
            </h2>
            <p className="text-[15px] text-[#5d666e] leading-relaxed">
              {isAmharic 
                ? 'ያኔት ሆስፒታል ዘመናዊ መሣሪያዎችን እና ስፔሻሊስት ዶክተሮችን በማቀናጀት ጥራት ያለው የጤና እንክብካቤን ይሰጣል። ከታች ያሉትን ክፍሎች በመንካት ዝርዝር መረጃዎችን ይመልከቱ።'
                : 'Navigate through our specialized medical departments and support services. Tap any clinical field to dynamically preview technologies, practicing specialists, and secure consultations.'
              }
            </p>
          </div>

          {/* Dynamic Tab Capsule Slider */}
          <div className="flex bg-white p-1.5 rounded-full border border-gray-100 max-w-[500px] mx-auto mb-16 shadow-md relative z-20">
            <button
              onClick={() => handleTabChange('department')}
              className={`relative z-10 px-6 sm:px-8 py-3.5 rounded-full font-bold text-[13px] sm:text-[14px] transition-all flex-1 text-center select-none outline-none ${
                activeTab === 'department' ? 'text-white' : 'text-secondary hover:text-primary'
              }`}
            >
              {activeTab === 'department' && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-primary rounded-full -z-10 shadow-lg shadow-primary/20"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              {isAmharic ? 'የሕክምና ክፍሎች' : 'Medical Departments'}
            </button>

            <button
              onClick={() => handleTabChange('service')}
              className={`relative z-10 px-6 sm:px-8 py-3.5 rounded-full font-bold text-[13px] sm:text-[14px] transition-all flex-1 text-center select-none outline-none ${
                activeTab === 'service' ? 'text-white' : 'text-secondary hover:text-primary'
              }`}
            >
              {activeTab === 'service' && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-primary rounded-full -z-10 shadow-lg shadow-primary/20"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              {isAmharic ? 'ደጋፊ አገልግሎቶች' : 'Support Services'}
            </button>
          </div>

          {/* SPLIT LAYOUT: Grid Directory (8 cols) vs dynamic Spotlight (4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* LEFT COLUMN: Dynamic Catalog Grid Directory */}
            <div className="lg:col-span-8">
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {filteredServices.map((service, index) => {
                    const isSelected = service.slug === selectedSlug;
                    const numStr = (index + 1).toString().padStart(2, '0');
                    
                    return (
                      <motion.div
                        key={service.slug}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        onClick={() => setSelectedSlug(service.slug)}
                        className={`group relative rounded-2xl p-6 text-left border transition-all duration-300 overflow-hidden flex flex-col justify-between h-[230px] cursor-pointer ${
                          isSelected 
                            ? 'bg-white border-primary shadow-[0_15px_40px_rgba(0,184,184,0.08)] ring-1 ring-primary' 
                            : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-lg'
                        }`}
                      >
                        {/* Number water-mark */}
                        <span className={`absolute top-4 right-6 text-[55px] font-black leading-none select-none pointer-events-none transition-colors duration-300 ${
                          isSelected ? 'text-primary/10' : 'text-[#f1f5f9] group-hover:text-primary/5'
                        }`}>
                          {numStr}
                        </span>

                        <div className="relative z-10">
                          {/* Dynamic Icon */}
                          <div className={`w-[50px] h-[50px] rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                            isSelected ? 'bg-primary text-white' : 'bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white'
                          }`}>
                            {getIcon(service.iconName, "w-6 h-6")}
                          </div>

                          {/* Service Title */}
                          <h3 className={`text-[17px] font-black mb-2 transition-colors duration-300 ${
                            isSelected ? 'text-primary' : 'text-secondary group-hover:text-primary'
                          }`}>
                            {isAmharic ? service.titleAm : service.title}
                          </h3>

                          {/* Short desc */}
                          <p className="text-[#5d666e] text-[13px] leading-relaxed line-clamp-2">
                            {isAmharic ? service.descAm : service.desc}
                          </p>
                        </div>

                        {/* Expand Details Trigger */}
                        <div className="relative z-10 pt-4 flex justify-between items-center border-t border-gray-50 mt-4">
                          <span className={`text-[11px] font-bold uppercase tracking-wider ${isSelected ? 'text-primary' : 'text-gray-400'}`}>
                            {isSelected ? (isAmharic ? 'አሁን ተመርጧል' : 'active preview') : (isAmharic ? 'ተጨማሪ መረጃ' : 'tap to spotlight')}
                          </span>
                          <div className="flex items-center gap-1 text-[12px] font-bold text-secondary group-hover:text-primary transition-colors">
                            <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 mr-1">{isAmharic ? 'ሙሉ ዝርዝር' : 'Full Page'}</span>
                            <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isSelected ? 'text-primary' : 'text-gray-400'}`} />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: Highly Immersive Live Spotlight Panel & Triage Form */}
            <div className="lg:col-span-4 lg:sticky lg:top-[110px] space-y-6">
              
              <AnimatePresence mode="wait">
                
                {/* Standard Spotlight Preview Panel */}
                {triageStep === 0 && (
                  <motion.div
                    key="spotlight-panel"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 relative overflow-hidden flex flex-col justify-between"
                  >
                    {/* Top colored signature accent */}
                    <div className="absolute top-0 left-0 w-full h-[5px] bg-primary animate-pulse" />

                    <div>
                      {/* Department Title */}
                      <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-gray-100">
                        <div className="p-3 bg-primary/5 text-primary rounded-xl shrink-0">
                          {getIcon(activeService.iconName, "w-6 h-6")}
                        </div>
                        <div>
                          <span className="text-[10px] font-extrabold text-primary uppercase tracking-widest block mb-0.5">
                            {isAmharic ? 'የስፖትላይት ገጽ' : 'Clinical Spotlight'}
                          </span>
                          <h3 className="text-[19px] font-extrabold text-secondary leading-snug">
                            {isAmharic ? activeService.titleAm : activeService.title}
                          </h3>
                        </div>
                      </div>

                      {/* Spotlight description */}
                      <p className="text-[#5d666e] text-[13.5px] leading-relaxed mb-6">
                        {isAmharic ? activeService.fullDescAm : activeService.fullDesc}
                      </p>

                      {/* D-02: Treatments Checklist Grid */}
                      <div className="mb-6">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-3">
                          {isAmharic ? 'የሚሰጡ ሕክምናዎች' : 'Core Focus & Treatments'}
                        </span>
                        <div className="space-y-2">
                          {(isAmharic ? activeService.treatmentsAm : activeService.treatments).slice(0, 3).map((treatment) => (
                            <div key={treatment} className="flex items-center gap-2 text-secondary text-[13px] font-bold">
                              <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                              <span className="truncate">{treatment}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* D-02: Clinical Technologies Grid */}
                      <div className="mb-6">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-3">
                          {isAmharic ? 'የክሊኒካል መሣሪያዎች' : 'Featured Diagnostics Tech'}
                        </span>
                        <div className="bg-gray-50 border border-gray-100 rounded-xl p-3.5 space-y-2">
                          {(isAmharic ? activeService.equipmentAm : activeService.equipment).slice(0, 2).map((tech, idx) => (
                            <div key={tech} className="flex items-start gap-2.5 text-[12.5px] text-[#5d666e]">
                              <Activity className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              <span className="font-semibold leading-snug">{tech}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* D-02: Related Active Specialists */}
                      <div className="mb-6">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-3">
                          {isAmharic ? 'ዶክተሮች' : 'Practicing Consultants'}
                        </span>
                        <div className="flex -space-x-3 overflow-hidden items-center">
                          {activeDoctors.map((doc) => (
                            <Link 
                              key={doc.id}
                              to={`/doctors/${doc.id}`}
                              title={doc.name}
                              className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-100 shrink-0 shadow-md inline-block hover:scale-105 transition-transform"
                            >
                              <img src={doc.image} alt={doc.name} className="w-full h-full object-cover object-top" />
                            </Link>
                          ))}
                          <span className="text-[12px] text-gray-500 font-bold pl-4">
                            {activeDoctors.length} {isAmharic ? 'ስፔሻሊስቶች' : 'Senior Specialists'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* D-04: Bottom Lead Conversion Trigger */}
                    <div className="space-y-3 pt-4 border-t border-gray-100">
                      <button 
                        onClick={startTriage}
                        className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-extrabold text-[13px] rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-primary/20"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>{isAmharic ? 'የቀጠሮ ጥያቄ አስገባ' : 'Secure Department Consultation'}</span>
                      </button>
                      
                      <Link 
                        to={`/services/${activeService.slug}`}
                        className="w-full py-3 bg-secondary hover:bg-secondary-dark text-white font-bold text-[13px] rounded-xl flex items-center justify-center gap-1.5 transition-all duration-300"
                      >
                        <span>{isAmharic ? 'ሙሉ የክፍል መገለጫ' : 'Browse Full Details'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                )}

                {/* Triage Step 1: Branch Selection */}
                {triageStep === 1 && (
                  <motion.div
                    key="triage-step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 relative"
                  >
                    <button 
                      onClick={() => setTriageStep(0)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-secondary transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    
                    <span className="text-primary font-bold text-[10px] uppercase tracking-wider block mb-1">
                      {isAmharic ? 'ደረጃ ፩ ከ ፫' : 'Step 1 of 3'}
                    </span>
                    <h3 className="text-[18px] font-black text-secondary mb-3">
                      {isAmharic ? 'የሚቀርብዎትን ቅርንጫፍ ይምረጡ' : 'Select Treatment Branch'}
                    </h3>
                    <p className="text-[13px] text-gray-500 mb-5 leading-relaxed">
                      {isAmharic 
                        ? 'ይህ የህክምና ዘርፍ በሚከተሉት ቅርንጫፎቻችን ውስጥ ይገኛል። የሚመችዎትን ይምረጡ።'
                        : `The ${activeService.title} department is supported at these Yanet branch medical facilities.`
                      }
                    </p>

                    <div className="space-y-2 mb-6 max-h-[220px] overflow-y-auto pr-1">
                      {activeBranchesForService.map((branch) => (
                        <button
                          key={branch.slug}
                          type="button"
                          onClick={() => setTriageData({ ...triageData, branch: branch.name })}
                          className={`w-full p-3 text-left rounded-xl border text-[13px] font-bold transition-all flex items-center justify-between ${
                            triageData.branch === branch.name
                              ? 'bg-primary/5 border-primary text-primary'
                              : 'bg-gray-50 border-transparent text-[#5d666e] hover:bg-gray-100'
                          }`}
                        >
                          <span>{isAmharic ? branch.nameAm : branch.name}</span>
                          {triageData.branch === branch.name && <Check className="w-4.5 h-4.5 text-primary shrink-0" />}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setTriageStep(2)}
                      className="w-full py-3 bg-secondary text-white font-extrabold text-[13px] rounded-xl flex items-center justify-center gap-1.5 hover:bg-primary transition-all shadow-md"
                    >
                      <span>{isAmharic ? 'ቀጥል' : 'Next Step'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

                {/* Triage Step 2: Doctor Selection */}
                {triageStep === 2 && (
                  <motion.div
                    key="triage-step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 relative"
                  >
                    <button 
                      onClick={() => setTriageStep(1)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-secondary transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    
                    <span className="text-primary font-bold text-[10px] uppercase tracking-wider block mb-1">
                      {isAmharic ? 'ደረጃ ፪ ከ ፫' : 'Step 2 of 3'}
                    </span>
                    <h3 className="text-[18px] font-black text-secondary mb-3">
                      {isAmharic ? 'ሐኪምዎን ይምረጡ' : 'Select Specialist Consultant'}
                    </h3>
                    <p className="text-[13px] text-gray-500 mb-5 leading-relaxed">
                      {isAmharic 
                        ? 'በዚህ የህክምና ክፍል ውስጥ ካሉ ታዋቂ ስፔሻሊስቶች ጋር ቀጠሮዎን ማረጋገጥ ይችላሉ።'
                        : 'Pick which senior clinical physician you would like to consult for your medical triage.'
                      }
                    </p>

                    <div className="space-y-3.5 mb-6 max-h-[220px] overflow-y-auto pr-1">
                      {activeDoctorsForTriage.map((doctor) => (
                        <button
                          key={doctor.id}
                          type="button"
                          onClick={() => setTriageData({ ...triageData, doctorName: doctor.name })}
                          className={`w-full p-3 rounded-xl border text-[13px] transition-all flex items-center gap-3.5 text-left ${
                            triageData.doctorName === doctor.name
                              ? 'bg-primary/5 border-primary text-primary'
                              : 'bg-gray-50 border-transparent text-[#5d666e] hover:bg-gray-100'
                          }`}
                        >
                          <img src={doctor.image} alt={doctor.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                          <div className="flex-grow min-w-0">
                            <span className="font-extrabold block text-secondary truncate">{isAmharic ? doctor.nameAm : doctor.name}</span>
                            <span className="text-[11px] text-gray-400 block truncate">{doctor.specialty}</span>
                          </div>
                          {triageData.doctorName === doctor.name && <Check className="w-4.5 h-4.5 text-primary shrink-0" />}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setTriageStep(3)}
                      className="w-full py-3 bg-secondary text-white font-extrabold text-[13px] rounded-xl flex items-center justify-center gap-1.5 hover:bg-primary transition-all shadow-md"
                    >
                      <span>{isAmharic ? 'ቀጥል' : 'Next Step'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

                {/* Triage Step 3: Contact details & Submission Form */}
                {triageStep === 3 && (
                  <motion.div
                    key="triage-step-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 relative"
                  >
                    <button 
                      onClick={() => setTriageStep(2)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-secondary transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    
                    <span className="text-primary font-bold text-[10px] uppercase tracking-wider block mb-1">
                      {isAmharic ? 'ደረጃ ፫ ከ ፫' : 'Step 3 of 3'}
                    </span>
                    <h3 className="text-[18px] font-black text-secondary mb-3">
                      {isAmharic ? 'የቀጠሮ መረጃዎችን ያስገቡ' : 'Patient Information'}
                    </h3>
                    <p className="text-[13px] text-gray-500 mb-5 leading-relaxed">
                      {isAmharic 
                        ? 'ቀጠሮዎን ለማረጋገጥ እባክዎ ስምዎን እና ስልክ ቁጥርዎን ያስገቡ። በ2 ሰዓት ውስጥ እንደውልልዎታለን።'
                        : 'Secure your medical consultation. Enter your coordinates below to finalize.'
                      }
                    </p>

                    <form onSubmit={handleTriageSubmit} className="space-y-4">
                      
                      {/* Name */}
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder={isAmharic ? 'ሙሉ ስም' : 'Your Full Name'}
                          value={triageData.patientName}
                          onChange={(e) => setTriageData({ ...triageData, patientName: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-10 pr-4 text-[13px] focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-medium text-secondary"
                        />
                        <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      </div>

                      {/* Phone */}
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          placeholder={isAmharic ? 'የስልክ ቁጥር' : 'Phone Number'}
                          value={triageData.patientPhone}
                          onChange={(e) => setTriageData({ ...triageData, patientPhone: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-10 pr-4 text-[13px] focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-medium text-secondary"
                        />
                        <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      </div>

                      {/* Preferred Date */}
                      <div className="relative">
                        <input
                          type="date"
                          required
                          value={triageData.patientDate}
                          onChange={(e) => setTriageData({ ...triageData, patientDate: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-10 pr-4 text-[13px] focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-medium text-secondary"
                        />
                        <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      </div>

                      {/* Summary Review details */}
                      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3 text-[11.5px] text-gray-500 space-y-1 mt-2">
                        <span className="block font-bold text-secondary uppercase text-[10px] tracking-wider mb-1">{isAmharic ? 'የቀጠሮ ማጠቃለያ' : 'Booking Summary'}</span>
                        <div className="flex justify-between">
                          <span>{isAmharic ? 'የሕክምና ዘርፍ:' : 'Clinical:'}</span>
                          <span className="font-extrabold text-secondary">{isAmharic ? activeService.titleAm : activeService.title}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{isAmharic ? 'ቅርንጫፍ:' : 'Branch:'}</span>
                          <span className="font-extrabold text-secondary truncate max-w-[170px]">{triageData.branch}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{isAmharic ? 'ሐኪም:' : 'Physician:'}</span>
                          <span className="font-extrabold text-secondary">{triageData.doctorName}</span>
                        </div>
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isTriageSubmitting}
                        className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-extrabold text-[13px] rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-primary/20"
                      >
                        {isTriageSubmitting ? (
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <span>{isAmharic ? 'ቀጠሮዬን አረጋግጥ' : 'Confirm Consultation Request'}</span>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* Triage Success state */}
                {triageStep === 4 && (
                  <motion.div
                    key="triage-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 text-center py-10 relative"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5 text-primary">
                      <CheckCircle className="w-10 h-10 animate-bounce" />
                    </div>
                    <h4 className="text-secondary font-black text-[18px] mb-2">
                      {isAmharic ? 'በስኬት ተልኳል!' : 'Triage Ingestion Complete!'}
                    </h4>
                    <p className="text-[#5d666e] text-[13px] leading-relaxed mb-6">
                      {isAmharic 
                        ? `የቀጠሮ ጥያቄዎ ለ${triageData.doctorName} በ${triageData.branch} ቅርንጫፍ ተመዝግቧል። በቀጠሮ ቀኑ ${triageData.patientDate} የሆስፒታላችን መስተንግዶ በስልክ ይደውልልዎታል።`
                        : `Your clinical lead is secured with ${triageData.doctorName} at ${triageData.branch}. We will dial you shortly to authorize your check-in slot on ${triageData.patientDate}.`
                      }
                    </p>
                    <button
                      onClick={() => setTriageStep(0)}
                      className="px-6 py-2.5 bg-secondary text-white text-[12px] font-bold rounded-full hover:bg-primary transition-all shadow-sm"
                    >
                      {isAmharic ? 'ወደ ስፖትላይት ተመለስ' : 'Return to Catalog'}
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* Strategic Call Out Banner */}
      <section className="py-[80px] bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#00B8B8 1px, transparent 1px)', backgroundSize: '25px 25px' }}></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3"></div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-[700px] mx-auto"
          >
            <span className="text-primary font-bold uppercase tracking-[3px] text-[12px] mb-4 block">
              {isAmharic ? 'የቀጠሮ አገልግሎት' : 'APPOINTMENT BOOKING'}
            </span>
            <h2 className="text-white text-[28px] md:text-[38px] leading-tight mb-6 font-bold">
              {isAmharic ? 'ለመጀመር ዝግጁ ነዎት? ቀጠሮዎን ዛሬውኑ ያስይዙ' : 'Ready to Consult Our Health Specialists?'}
            </h2>
            <p className="text-white/60 text-[15px] mb-8 leading-relaxed">
              {isAmharic 
                ? 'የቀጠሮ ማስያዣ ፎርማችንን በመሙላት ወይም በቀጥታ ስልክ በመደወል ከሆስፒታላችን ስፔሻሊስት ዶክተሮች ጋር ቀጠሮዎን ወዲያውኑ ማረጋገጥ ይችላሉ።'
                : 'Schedule a comprehensive consultation with our specialized medical team. Book your slot online or call our 24/7 hotline support.'
              }
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button 
                onClick={onAppointmentClick}
                className="btn-primary shadow-xl shadow-primary/20"
              >
                {t('hero.cta_appointment')}
              </button>
              <Link to="/contact" className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-[8px] font-semibold transition-all border border-white/10 backdrop-blur-md text-[15px]">
                {isAmharic ? 'ያግኙን' : 'Contact Us'}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
