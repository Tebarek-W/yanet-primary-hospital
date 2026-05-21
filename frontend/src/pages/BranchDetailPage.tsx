import { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  MapPin, Phone, Mail, Clock, ArrowLeft, Calendar, 
  AlertTriangle, Stethoscope, HeartPulse, Baby, 
  Activity, Brain, Eye, FlaskConical, Pill, ShieldCheck,
  UserCheck, ArrowRight, Star, Heart
} from 'lucide-react';
import { branchesData } from '../data/branchesData';
import { doctorsData } from '../data/doctorsData';
import { servicesData } from '../data/servicesData';
import { api } from '../utils/api';
import CTABanner from '../components/About/CTABanner';

// Resolve service icons dynamically
const getServiceIcon = (iconName: string, colorHex: string) => {
  const iconProps = { className: "w-6 h-6 shrink-0 transition-colors duration-300", style: { color: colorHex } };
  switch (iconName) {
    case 'Stethoscope': return <Stethoscope {...iconProps} />;
    case 'HeartPulse': return <HeartPulse {...iconProps} />;
    case 'Baby': return <Baby {...iconProps} />;
    case 'Activity': return <Activity {...iconProps} />;
    case 'Brain': return <Brain {...iconProps} />;
    case 'Eye': return <Eye {...iconProps} />;
    case 'FlaskConical': return <FlaskConical {...iconProps} />;
    case 'Pill': return <Pill {...iconProps} />;
    case 'ShieldCheck': return <ShieldCheck {...iconProps} />;
    default: return <Stethoscope {...iconProps} />;
  }
};

const BranchDetailPage = ({ onAppointmentClick }: { onAppointmentClick?: () => void }) => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const isAmharic = currentLang.startsWith('am');

  const [branch, setBranch] = useState<any>(null);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    setIsPageLoading(true);
    if (!slug) return;
    api.branches.getBySlug(slug)
      .then(data => {
        if (data && data.slug) {
          setBranch(data);
        } else {
          const staticBranch = branchesData.find(b => b.slug === slug);
          setBranch(staticBranch || null);
        }
      })
      .catch(err => {
        console.warn("Using fallback static branch detail:", err);
        const staticBranch = branchesData.find(b => b.slug === slug);
        setBranch(staticBranch || null);
      })
      .finally(() => {
        setIsPageLoading(false);
      });
  }, [slug]);

  // Resolve services & doctors
  const branchServices = useMemo(() => {
    if (!branch || !branch.serviceSlugs) return [];
    return servicesData.filter(s => branch.serviceSlugs.includes(s.slug));
  }, [branch]);

  const branchDoctors = useMemo(() => {
    if (!branch || !branch.doctorIds) return [];
    return doctorsData.filter(d => branch.doctorIds.includes(d.id));
  }, [branch]);

  if (isPageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-36 pb-20">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl max-w-[500px]">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-semibold">{isAmharic ? 'በመጫን ላይ...' : 'Loading branch details...'}</p>
        </div>
      </div>
    );
  }

  // Fallback / redirect if branch not found
  if (!branch) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-36 pb-20">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl max-w-[500px]">
          <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-[22px] font-bold text-secondary mb-3">
            {isAmharic ? 'ቅርንጫፉ አልተገኘም' : 'Branch Not Found'}
          </h2>
          <p className="text-[#5d666e] mb-6 text-[15px]">
            {isAmharic 
              ? 'የጠየቁት ቅርንጫፍ የለም ወይም ተሰርዟል። እባክዎ ሁሉንም ቅርንጫፎች ይመልከቱ።' 
              : 'The branch slug you requested does not exist in our directory. Please browse our active branches.'}
          </p>
          <Link to="/branches" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span>{isAmharic ? 'ወደ ሁሉም ቅርንጫፎች ተመለስ' : 'Back to All Branches'}</span>
          </Link>
        </div>
      </div>
    );
  }

  // Analytics logging
  const trackDirectionsClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click_branch_map', {
        event_category: 'Engagement',
        event_label: branch.name,
        branch_slug: branch.slug
      });
    }
    console.log(`[Google Analytics Event Tracked] Directions click for branch: ${branch.name}`);
  };

  // Theme helper shortcuts
  const theme = branch.theme;
  const accent = theme.accentHex;

  return (
    <div className="bg-white relative overflow-hidden">
      
      {/* 1. BESPOKE HERO SECTION: Customized for each specific branch */}
      <div className="relative pt-[180px] pb-[120px] md:pt-[220px] md:pb-[160px] overflow-hidden bg-secondary">
        {/* Dynamic Zooming Parallax Cover Image backdrop */}
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src={branch.image} 
            alt={branch.name} 
            className="w-full h-full object-cover opacity-25"
          />
          {/* Theme-specific gradient class overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradientClass}`}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/70 to-transparent"></div>
        </div>

        {/* Floating Custom SVG Background Elements tailored with Branch Accent */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
          <motion.div
            animate={{ y: [0, -35, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-1/4"
            style={{ color: accent }}
          >
            <Heart size={140} />
          </motion.div>
          <motion.div
            animate={{ y: [0, 35, 0], rotate: [0, -15, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 left-1/3 text-white"
          >
            <Star size={110} />
          </motion.div>
        </div>

        {/* Content Container */}
        <div className="container-custom relative z-10">
          <div className="max-w-[850px]">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              
              {/* Dynamic Badge */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-[3px] h-[18px] rounded-full" style={{ backgroundColor: accent }}></div>
                <span className="text-white text-[12px] font-extrabold uppercase tracking-[3px] px-3 py-1 bg-white/10 backdrop-blur-md rounded-md">
                  {isAmharic ? branch.cityAm : branch.city}
                </span>
                
                {/* HQ Indicator badge */}
                {branch.slug === 'hawassa' && (
                  <span className="bg-amber-500 text-secondary text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1 shadow-md">
                    <Star className="w-3 h-3 fill-secondary" />
                    <span>HQ</span>
                  </span>
                )}
              </div>

              {/* Title & Brand Name */}
              <h1 className="text-white text-[42px] sm:text-[50px] md:text-[64px] font-black mb-6 leading-tight tracking-tight">
                {isAmharic ? branch.nameAm : branch.name}
              </h1>

              {/* Bespoke Tagline / Motto block */}
              <p className="text-white/80 text-[18px] md:text-[22px] mb-10 leading-relaxed font-medium max-w-[700px] border-l-4 pl-4" style={{ borderColor: accent }}>
                {isAmharic ? theme.taglineAm : theme.tagline}
              </p>

              {/* Breadcrumbs Navigation */}
              <div className="flex flex-wrap items-center gap-4 text-white/70 font-semibold text-[14px]">
                <Link to="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
                <div className="w-[18px] h-[18px] rounded-sm flex items-center justify-center bg-white/10">
                  <ArrowRight className="w-3 h-3 text-white" />
                </div>
                <Link to="/branches" className="hover:text-white transition-colors">{isAmharic ? 'ቅርንጫፎች' : 'Branches'}</Link>
                <div className="w-[18px] h-[18px] rounded-sm flex items-center justify-center bg-white/10">
                  <ArrowRight className="w-3 h-3 text-white" />
                </div>
                <span style={{ color: accent }} className="font-extrabold">{isAmharic ? branch.nameAm : branch.name}</span>
              </div>

            </motion.div>
          </div>
        </div>

        {/* Bottom Decorative Wave */}
        <div className="absolute bottom-0 left-0 w-full leading-none z-10">
          <svg className="relative block w-full h-[60px] fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>

      {/* 2. BODY CONTENT SECTION: Tailored styles based on accent colors */}
      <section className="py-20 relative bg-slate-50/30">
        <div className="container-custom">
          
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* LEFT COLUMN: Info details styled individually */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Branch Feature Spotlight Block: Uniquely Styled Card */}
              <div className={`p-8 rounded-3xl border ${theme.specialCardBg} relative overflow-hidden shadow-sm`}>
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none opacity-30" style={{ backgroundColor: accent }}></div>
                <span className="text-[11px] font-black uppercase tracking-widest block mb-2" style={{ color: accent }}>
                  {isAmharic ? 'የቅርንጫፉ ዓላማ' : 'Branch Highlight'}
                </span>
                <h3 className="text-[22px] font-black text-secondary mb-4">
                  {isAmharic ? 'የላቀ የህክምና አገልግሎት ለአካባቢዎ' : 'Dedicated Healthcare in Your Neighborhood'}
                </h3>
                <p className="text-[#5d666e] text-[15px] leading-relaxed mb-6">
                  {isAmharic 
                    ? `ያኔት ፕራይመሪ ሆስፒታል ${branch.nameAm} ምርጥ እና ዘመናዊ የህክምና መሣሪያዎችን በመጠቀም ለአከባቢው ነዋሪዎች ፈጣን እና አስተማማኝ ምርመራዎችን ያደርጋል። በከፍተኛ የህክምና ባለሙያዎች የታገዘው ቡድናችን ሁሌም ለእርስዎ ዝግጁ ነው።`
                    : `Yanet Primary Hospital at our ${branch.name} offers highly dedicated, client-focused primary and specialized medical solutions. Spanning an integrated diagnostic department, skilled nurses, and modern facilities, we ensure your medical recovery is smooth and effective.`}
                </p>
                
                {/* Feature highlight items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(isAmharic ? branch.featuredServicesAm : branch.featuredServices).map((feat: string) => (
                    <div key={feat} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${accent}15` }}>
                        <span className="text-[12px] font-bold" style={{ color: accent }}>✓</span>
                      </div>
                      <span className="text-[14px] font-bold text-secondary">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fulfills C5: Services Grid styled with custom accent */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-[3px] h-[20px] rounded-full" style={{ backgroundColor: accent }}></div>
                  <h2 className="text-[24px] font-extrabold text-secondary">
                    {isAmharic ? 'በዚህ ቅርንጫፍ የሚሰጡ አገልግሎቶች' : 'Services Available at this Branch'}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {branchServices.map((service) => (
                    <Link
                      key={service.slug}
                      to={`/services/${service.slug}`}
                      className="p-6 bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl hover:border-gray-200 transition-all duration-300 hover:-translate-y-1 group flex items-start gap-4"
                    >
                      <div className="w-[50px] h-[50px] rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-all duration-300"
                           style={{ backgroundColor: `${accent}08` }}>
                        {getServiceIcon(service.iconName, accent)}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-[16px] text-secondary group-hover:text-primary transition-colors mb-2"
                            style={{ '--hover-color': accent } as any}>
                          {isAmharic ? service.titleAm : service.title}
                        </h3>
                        <p className="text-gray-500 text-[13px] line-clamp-2 leading-relaxed">
                          {isAmharic ? service.descAm : service.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Fulfills C6: Doctor Profiles styled with custom accent */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-[3px] h-[20px] rounded-full" style={{ backgroundColor: accent }}></div>
                  <h2 className="text-[24px] font-extrabold text-secondary">
                    {isAmharic ? 'የቅርንጫፉ ሐኪሞች' : 'Our Medical Team at this Branch'}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {branchDoctors.map((doctor) => (
                    <Link
                      key={doctor.id}
                      to={`/doctors/${doctor.id}`}
                      className="p-5 bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex gap-4 items-center group"
                    >
                      {/* Photo */}
                      <div className="w-[90px] h-[90px] rounded-xl overflow-hidden shrink-0 border-2 border-transparent group-hover:border-gray-100 transition-colors">
                        <img 
                          src={doctor.image} 
                          alt={doctor.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      {/* Meta info matching colors */}
                      <div className="flex-grow min-w-0">
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1.5 inline-block"
                              style={{ backgroundColor: `${accent}12`, color: accent }}>
                          {isAmharic ? t(doctor.roleKey).replace(/.*\./g, '') : doctor.specialty}
                        </span>
                        <h3 className="font-extrabold text-[16px] text-secondary group-hover:text-primary transition-colors truncate mb-1">
                          {isAmharic ? doctor.nameAm : doctor.name}
                        </h3>
                        <p className="text-gray-500 text-[12.5px] truncate">
                          {isAmharic ? doctor.descAm : doctor.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Sidebar styled with matching colors */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Contact coordinates section */}
              <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xl space-y-6 relative overflow-hidden">
                {/* Tiny glowing tag top accent */}
                <div className="absolute top-0 left-0 w-full h-[4px]" style={{ backgroundColor: accent }}></div>

                <h3 className="text-[20px] font-extrabold text-secondary pb-4 border-b border-gray-100 flex items-center gap-2">
                  <MapPin className="w-5 h-5" style={{ color: accent }} />
                  <span>{isAmharic ? 'የቅርንጫፍ አድራሻ' : 'Contact & Location'}</span>
                </h3>

                {/* Coordinate Fields */}
                <div className="space-y-4 text-[14px]">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 shrink-0 mt-0.5" style={{ color: accent }} />
                    <div>
                      <span className="font-bold text-secondary block mb-0.5">{isAmharic ? 'አድራሻ' : 'Physical Address'}</span>
                      <span className="text-[#5d666e]">{isAmharic ? branch.addressAm : branch.address}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 shrink-0 mt-0.5" style={{ color: accent }} />
                    <div>
                      <span className="font-bold text-secondary block mb-0.5">{isAmharic ? 'ስልክ ቁጥር' : 'Phone'}</span>
                      <a href={`tel:${branch.phone.replace(/\s+/g, '')}`} className="text-[#5d666e] hover:text-primary transition-colors font-semibold">{branch.phone}</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 shrink-0 mt-0.5" style={{ color: accent }} />
                    <div>
                      <span className="font-bold text-secondary block mb-0.5">{isAmharic ? 'ኢሜይል' : 'Email Address'}</span>
                      <a href={`mailto:${branch.email}`} className="text-[#5d666e] hover:text-primary transition-colors font-medium break-all">{branch.email}</a>
                    </div>
                  </div>
                </div>

                {/* C3 Google Maps Iframe */}
                <div className="rounded-2xl overflow-hidden border border-gray-100 h-[240px] shadow-inner relative z-10">
                  <iframe 
                    title={branch.name}
                    src={branch.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>

                {/* C3 Trigger Button: Google Analytics event tracker */}
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.city + ' ' + branch.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackDirectionsClick}
                  className="w-full py-3.5 text-white font-extrabold text-[13px] rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg"
                  style={{ backgroundColor: accent, boxShadow: `0 4px 14px ${accent}25` }}
                >
                  <MapPin className="w-4 h-4 fill-white" />
                  <span>{isAmharic ? 'አቅጣጫ በጎግል ካርታ አሳይ' : 'Get Directions on Google Maps'}</span>
                </a>
              </div>

              {/* Fulfills C7: Hours of operation styled with accent accents */}
              <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xl space-y-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[4px]" style={{ backgroundColor: accent }}></div>

                <h3 className="text-[20px] font-extrabold text-secondary pb-4 border-b border-gray-100 flex items-center gap-2">
                  <Clock className="w-5 h-5" style={{ color: accent }} />
                  <span>{isAmharic ? 'የስራ ሰዓታት' : 'Hours of Operation'}</span>
                </h3>

                <div className="space-y-4">
                  {/* Weekdays */}
                  <div className="flex justify-between items-center py-2.5 border-b border-gray-50">
                    <span className="font-bold text-secondary text-[14px]">{isAmharic ? 'ሰኞ - አርብ' : 'Weekdays (Mon-Fri)'}</span>
                    <span className="font-bold text-[13.5px] px-3 py-1 rounded-lg"
                          style={{ backgroundColor: `${accent}08`, color: accent }}>
                      {isAmharic ? branch.workingHours.weekdaysAm : branch.workingHours.weekdays}
                    </span>
                  </div>

                  {/* Saturdays */}
                  <div className="flex justify-between items-center py-2.5 border-b border-gray-50">
                    <span className="font-bold text-secondary text-[14px]">{isAmharic ? 'ቅዳሜ' : 'Saturdays'}</span>
                    <span className="text-[#5d666e] font-semibold text-[13.5px] bg-gray-50 px-3 py-1 rounded-lg">
                      {isAmharic ? branch.workingHours.saturdaysAm : branch.workingHours.saturdays}
                    </span>
                  </div>

                  {/* Sundays */}
                  <div className="flex justify-between items-center py-2.5 border-b border-gray-50">
                    <span className="font-bold text-secondary text-[14px]">{isAmharic ? 'እሁድ' : 'Sundays'}</span>
                    <span className={`font-semibold text-[13.5px] px-3 py-1 rounded-lg ${
                      branch.workingHours.sundays === 'Closed' ? 'text-red-500 bg-red-50' : 'text-[#5d666e] bg-gray-50'
                    }`} style={branch.workingHours.sundays !== 'Closed' ? { backgroundColor: `${accent}08`, color: accent } : {}}>
                      {isAmharic ? branch.workingHours.sundaysAm : branch.workingHours.sundays}
                    </span>
                  </div>

                  {/* Custom holiday details */}
                  <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4 space-y-2 mt-4">
                    <div className="flex items-center gap-2 text-amber-800 font-extrabold text-[12px] uppercase tracking-wider">
                      <Calendar className="w-4 h-4 text-amber-700" />
                      <span>{isAmharic ? 'የበዓላት የስራ ሰዓት' : 'Holiday Schedules'}</span>
                    </div>
                    <p className="text-[13px] text-amber-900 leading-relaxed font-medium">
                      {isAmharic 
                        ? `በበዓላት ቀናት ቅርንጫፋችን: ${branch.workingHours.holidaysAm}`
                        : `On national holidays, this branch is: ${branch.workingHours.holidays}`}
                    </p>
                    <span className="text-[11px] text-amber-700/80 italic block">
                      {isAmharic 
                        ? '*የአምቡላንስ እና የድንገተኛ ክፍል አገልግሎቶች ሁልጊዜም በ24 ሰዓት ክፍት ናቸው።'
                        : '*24/7 emergency dispatch and ambulance support remain active during all holidays.'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Dynamic primary appointment booking trigger */}
              <button 
                onClick={onAppointmentClick}
                className="w-full py-4 text-white font-extrabold text-[15px] rounded-2xl flex items-center justify-center gap-2.5 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                style={{ 
                  backgroundColor: accent, 
                  boxShadow: `0 6px 20px ${accent}25` 
                }}
              >
                <UserCheck className="w-5 h-5" />
                <span>{isAmharic ? 'በዚህ ቅርንጫፍ ቀጠሮ ያስይዙ' : 'Book Appointment at this Branch'}</span>
              </button>

            </div>

          </div>

        </div>
      </section>

      <CTABanner />
    </div>
  );
};

export default BranchDetailPage;
