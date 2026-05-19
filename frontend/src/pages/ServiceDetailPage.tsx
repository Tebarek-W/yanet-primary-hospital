import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Calendar,
  HeartPulse,
  Activity,
  Stethoscope,
  Brain,
  Baby,
  Eye,
  FlaskConical,
  Pill,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  User,
  Phone,
  ChevronRight,
  PhoneCall,
  Sparkles
} from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { doctorsData } from '../data/doctorsData';
import Breadcrumb from '../components/About/Breadcrumb';

interface ServiceDetailPageProps {
  onAppointmentClick: () => void;
}

const getIcon = (name: string) => {
  switch (name) {
    case 'HeartPulse': return <HeartPulse className="w-12 h-12" />;
    case 'Activity': return <Activity className="w-12 h-12" />;
    case 'Stethoscope': return <Stethoscope className="w-12 h-12" />;
    case 'Brain': return <Brain className="w-12 h-12" />;
    case 'Baby': return <Baby className="w-12 h-12" />;
    case 'Eye': return <Eye className="w-12 h-12" />;
    case 'FlaskConical': return <FlaskConical className="w-12 h-12" />;
    case 'Pills':
    case 'Pill': return <Pill className="w-12 h-12" />;
    case 'ShieldCheck': return <ShieldCheck className="w-12 h-12" />;
    default: return <Stethoscope className="w-12 h-12" />;
  }
};

const ServiceDetailPage = ({ onAppointmentClick }: ServiceDetailPageProps) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isAmharic = t('nav.home') === 'መነሻ';

  // Find current service details
  const service = servicesData.find(s => s.slug === slug);

  // Lead Conversion Form States
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', date: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Redirect if service not found
  useEffect(() => {
    if (!service) {
      navigate('/services');
    }
  }, [service, navigate]);

  if (!service) return null;

  // Query matching doctors based on specialty
  const relatedDoctors = doctorsData.filter(doc => doc.specialty === service.specialty);
  // Fallback to general doctors if no specific specialty match (e.g. Pharmacy, Ambulance, Lab)
  const displayDoctors = relatedDoctors.length > 0 ? relatedDoctors : doctorsData.slice(0, 3);

  // Handle sidebar form submission (Lead Capture)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date) return;

    setIsSubmitting(true);
    // Simulate API lead ingestion
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', date: '', message: '' });
    }, 1500);
  };

  return (
    <div className="bg-white">
      {/* Breadcrumb Title */}
      <Breadcrumb title={isAmharic ? service.titleAm : service.title} />

      {/* Main Container */}
      <section className="section-padding bg-[#fcfdfe] relative overflow-hidden">
        {/* Aesthetic background design */}
        <div className="absolute top-[20%] right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-12 gap-[40px] items-start">
            
            {/* LEFT COLUMN: Main High-Fidelity Information (Col-span 8) */}
            <div className="lg:col-span-8">
              
              {/* Department/Service Summary Hero */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 sm:p-10 rounded-[16px] border border-gray-100 shadow-[0_10px_35px_rgba(0,0,0,0.02)] mb-10"
              >
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="p-5 rounded-2xl bg-[#eef9fb] text-primary flex items-center justify-center shrink-0 shadow-sm">
                    {getIcon(service.iconName)}
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 mb-3 text-[10px] font-bold text-primary bg-primary/5 rounded-full uppercase tracking-wider">
                      {service.category === 'department' 
                        ? (isAmharic ? 'ሕክምና ክፍል' : 'Medical Department') 
                        : (isAmharic ? 'የሆስፒታል አገልግሎት' : 'Support Service')
                      }
                    </span>
                    <h2 className="text-[28px] font-bold text-secondary mb-4 leading-tight">
                      {isAmharic ? service.titleAm : service.title}
                    </h2>
                    <p className="text-[#5d666e] text-[15px] leading-relaxed">
                      {isAmharic ? service.fullDescAm : service.fullDesc}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Grid: Available Treatments & Clinical Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 sm:p-10 rounded-[16px] border border-gray-100 shadow-[0_10px_35px_rgba(0,0,0,0.02)] mb-10"
              >
                <h3 className="text-[22px] font-bold text-secondary mb-6 pb-3 border-b border-gray-50 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  {isAmharic ? 'የሚሰጡ የሕክምና አገልግሎቶች' : 'Available Treatments & Services'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(isAmharic ? service.treatmentsAm : service.treatments).map((treatment, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50/50 hover:bg-[#eef9fb]/30 rounded-[8px] border border-gray-50 transition-all duration-300">
                      <CheckCircle className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                      <span className="text-[#0e121d] text-[13.5px] font-bold leading-normal">{treatment}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Grid: Advanced Equipment & Medical Technology */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 sm:p-10 rounded-[16px] border border-gray-100 shadow-[0_10px_35px_rgba(0,0,0,0.02)] mb-10"
              >
                <h3 className="text-[22px] font-bold text-secondary mb-6 pb-3 border-b border-gray-50 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  {isAmharic ? 'ዘመናዊ መሣሪያዎች እና ቴክኖሎጂዎች' : 'Equipment & Technology'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {(isAmharic ? service.equipmentAm : service.equipment).map((equip, index) => (
                    <div key={index} className="p-5 bg-white border border-gray-100 rounded-[10px] shadow-[0_4px_15px_rgba(0,0,0,0.01)] hover:border-primary/10 transition-all duration-300">
                      <span className="text-primary/70 font-bold text-[11px] uppercase tracking-wider block mb-1">
                        {isAmharic ? 'የሕክምና መሣሪያ' : 'clinical technology'} {(index + 1).toString().padStart(2, '0')}
                      </span>
                      <p className="text-secondary font-bold text-[14px] leading-snug">{equip}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Segment: Related Specialist Doctors */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 sm:p-10 rounded-[16px] border border-gray-100 shadow-[0_10px_35px_rgba(0,0,0,0.02)]"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-3 border-b border-gray-50">
                  <h3 className="text-[22px] font-bold text-secondary flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    {isAmharic ? 'የክፍሉ ስፔሻሊስት ዶክተሮች' : 'Our Related Specialists'}
                  </h3>
                  <Link
                    to="/doctors"
                    className="inline-flex items-center gap-1 text-[13px] font-bold text-primary hover:text-secondary transition-colors duration-300"
                  >
                    {isAmharic ? 'ሁሉንም ዶክተሮች ይመልከቱ' : 'Meet All Doctors'}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {displayDoctors.map((doc) => (
                    <div key={doc.id} className="bg-[#fcfefe] border border-gray-100 rounded-[12px] p-5 text-center flex flex-col items-center hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] hover:border-primary/10 transition-all duration-500 group">
                      
                      {/* Photo */}
                      <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 border border-gray-100 mb-4 group-hover:scale-105 transition-transform duration-500">
                        <img src={doc.image} alt={isAmharic ? doc.nameAm : doc.name} className="w-full h-full object-cover object-top" />
                      </div>

                      {/* Name & Title */}
                      <h4 className="text-secondary font-bold text-[15px] group-hover:text-primary transition-colors duration-300 mb-1">
                        {isAmharic ? doc.nameAm : doc.name}
                      </h4>
                      <span className="text-[11px] text-[#8c949c] font-bold uppercase tracking-wider block mb-3">
                        {isAmharic ? doc.specialty : doc.specialty}
                      </span>

                      {/* Action Triggers */}
                      <div className="flex gap-2 w-full mt-auto pt-4 border-t border-gray-50/50">
                        <Link
                          to={`/doctors/${doc.id}`}
                          className="px-3 py-2 text-[11px] font-bold text-secondary bg-gray-50 rounded-[6px] hover:bg-secondary hover:text-white transition-all flex-1"
                        >
                          {isAmharic ? 'መገለጫ' : 'Profile'}
                        </Link>
                        <button
                          onClick={onAppointmentClick}
                          className="px-3 py-2 text-[11px] font-bold text-white bg-primary rounded-[6px] hover:bg-secondary transition-all flex-1 shadow-sm"
                        >
                          {isAmharic ? 'ቀጠሮ' : 'Book'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: Interactive Sidebar & Lead Captures (Col-span 4) */}
            <div className="lg:col-span-4 lg:sticky lg:top-[100px] flex flex-col gap-8">
              
              {/* SIDEBAR BLOCK 1: Lead Conversion Booking Form */}
              <div className="bg-white rounded-[16px] border border-gray-100 shadow-[0_10px_35px_rgba(0,0,0,0.02)] p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[4px] bg-primary" />
                
                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.div
                      key="form-container"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col"
                    >
                      <h3 className="text-[18px] font-bold text-secondary mb-2">
                        {isAmharic ? 'ፈጣን ቀጠሮ መያዣ' : 'Quick Booking Lead'}
                      </h3>
                      <p className="text-[#8c949c] text-[12px] mb-5 leading-normal">
                        {isAmharic ? 'ከዚህ በታች ያለውን ፎርም በመሙላት ከክፍሉ ዶክተሮች ጋር ቀጠሮ ይያዙ። ፈጣን መልስ እንሰጣለን።' : 'Fill out this form to request a consultation. Our clinical staff will confirm your slot within 2 hours.'}
                      </p>

                      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {/* Name Input */}
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder={isAmharic ? 'ሙሉ ስም' : 'Your Full Name'}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-100 rounded-[8px] py-3 pl-10 pr-4 text-[13px] focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-medium text-secondary"
                          />
                          <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        </div>

                        {/* Phone Input */}
                        <div className="relative">
                          <input
                            type="tel"
                            required
                            placeholder={isAmharic ? 'ስልክ ቁጥር' : 'Phone Number'}
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-100 rounded-[8px] py-3 pl-10 pr-4 text-[13px] focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-medium text-secondary"
                          />
                          <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        </div>

                        {/* Preferred Date */}
                        <div className="relative">
                          <input
                            type="date"
                            required
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-100 rounded-[8px] py-3 pl-10 pr-4 text-[13px] focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-medium text-secondary"
                          />
                          <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        </div>

                        {/* Message/Symptoms */}
                        <div className="relative">
                          <textarea
                            rows={2}
                            placeholder={isAmharic ? 'ምልክቶች ወይም አጭር ማብራሪያ' : 'Symptoms or details...'}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-100 rounded-[8px] py-3 px-4 text-[13px] focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-medium text-secondary resize-none"
                          />
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full btn-primary !py-3 !text-[13px] font-bold shadow-md shadow-primary/10 mt-2 flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            isAmharic ? 'ቀጠሮዎን ያስይዙ' : 'Submit Consultation Request'
                          )}
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success-container"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                        <CheckCircle className="w-10 h-10 animate-bounce" />
                      </div>
                      <h4 className="text-secondary font-bold text-[18px] mb-2">
                        {isAmharic ? 'ተሳክቷል!' : 'Consultation Submitted'}
                      </h4>
                      <p className="text-[#5d666e] text-[13px] leading-relaxed mb-6">
                        {isAmharic 
                          ? 'የቀጠሮ ጥያቄዎ በስኬት ደርሶናል። የሆስፒታላችን ቀጠሮ ማስተባበሪያ ቡድን ከ2 ሰዓት ባልሞላ ጊዜ ውስጥ ይደውልልዎታል።'
                          : 'Your request has been logged successfully! Our appointment desks will call you shortly to confirm your clinical schedule.'
                        }
                      </p>
                      <button
                        onClick={() => setIsSuccess(false)}
                        className="px-6 py-2.5 bg-secondary text-white text-[12px] font-bold rounded-full hover:bg-primary transition-colors"
                      >
                        {isAmharic ? 'ተመለስ' : 'Go Back'}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* SIDEBAR BLOCK 2: Quick Lateral Services Navigator */}
              <div className="bg-white rounded-[16px] border border-gray-100 shadow-[0_10px_35px_rgba(0,0,0,0.02)] p-6">
                <h3 className="text-[17px] font-bold text-secondary mb-4 pb-2 border-b border-gray-50">
                  {isAmharic ? 'ሌሎች የሕክምና ክፍሎች' : 'All Departments & Services'}
                </h3>
                <div className="flex flex-col gap-2">
                  {servicesData.map((s) => {
                    const isCurrent = s.slug === slug;
                    return (
                      <Link
                        key={s.slug}
                        to={`/services/${s.slug}`}
                        className={`flex items-center justify-between p-3 rounded-[8px] text-[13px] font-bold border transition-all duration-300 ${
                          isCurrent
                            ? 'bg-[#eef9fb] border-primary/20 text-primary'
                            : 'bg-white border-transparent text-[#5d666e] hover:bg-gray-50 hover:text-secondary'
                        }`}
                      >
                        <span>{isAmharic ? s.titleAm : s.title}</span>
                        <ChevronRight className={`w-4 h-4 transition-transform ${isCurrent ? 'translate-x-1 text-primary' : 'text-gray-300'}`} />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* SIDEBAR BLOCK 3: 24/7 Emergency Support Banner */}
              <div className="bg-secondary rounded-[16px] p-6 text-white relative overflow-hidden shadow-xl shadow-secondary/15">
                {/* Background mesh */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-xl pointer-events-none" />
                
                <div className="relative z-10 flex flex-col">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4 text-primary">
                    <PhoneCall className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="text-[18px] font-bold mb-2">
                    {isAmharic ? 'የ24 ሰዓት የድንገተኛ ስልክ' : '24/7 Emergency Help'}
                  </h4>
                  <p className="text-white/60 text-[12.5px] leading-relaxed mb-6">
                    {isAmharic 
                      ? 'ማንኛውም የድንገተኛ የጤና ሁኔታ ካጋጠመዎት ወዲያውኑ የሆስፒታላችንን የድንገተኛ ህክምና ስልክ ቁጥር ይደውሉ።'
                      : 'Reach out immediately to our clinical response desks in case of severe medical or trauma crises.'
                    }
                  </p>
                  <a
                    href="tel:+251911223344"
                    className="w-full bg-primary hover:bg-white hover:text-secondary text-white py-3 rounded-[8px] font-bold text-[13px] flex items-center justify-center gap-2 transition-all shadow-md shadow-primary/20"
                  >
                    <Phone className="w-4 h-4" />
                    +251 911 22 33 44
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;
