import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Phone, Mail, Facebook, Twitter, Linkedin, Instagram, 
  CheckCircle2, Clock, Calendar, ArrowRight, User, 
  Star, MessageSquare, Briefcase
} from 'lucide-react';
import { fetchDoctorById } from '../../data/doctorsData';
import type { Doctor } from '../../data/doctorsData';
import Breadcrumb from '../About/Breadcrumb';

const DoctorDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAmharic = t('nav.home') === 'መነሻ';

  useEffect(() => {
    const loadDoctor = async () => {
      if (id) {
        setIsLoading(true);
        const data = await fetchDoctorById(id);
        setDoctor(data);
        setIsLoading(false);
      }
    };
    loadDoctor();
  }, [id]);

  if (isLoading) {
    return <div className="pt-[200px] pb-[100px] text-center">Loading...</div>;
  }

  if (!doctor) {
    return (
      <div className="pt-[200px] pb-[100px] text-center">
        <h2 className="text-2xl font-bold">Doctor not found</h2>
        <Link to="/doctors" className="text-primary hover:underline mt-4 inline-block">Back to Doctors</Link>
      </div>
    );
  }

  const doctorName = isAmharic ? doctor.nameAm : doctor.name;
  const doctorRole = t(doctor.roleKey);
  const bio = isAmharic ? doctor.biographyAm : doctor.biography;
  const education = isAmharic ? doctor.educationAm : doctor.education;
  const experience = isAmharic ? doctor.experienceAm : doctor.experience;
  const skills = isAmharic ? doctor.skillsAm : doctor.skills;

  const infoItems = [
    { label: 'Specialty', value: doctor.specialty, icon: <ArrowRight className="w-4 h-4 text-primary" /> },
    { label: 'Expertise', values: skills, icon: <ArrowRight className="w-4 h-4 text-primary" /> },
    { label: 'Education', values: education, icon: <ArrowRight className="w-4 h-4 text-primary" /> },
    { label: 'Experience', values: experience, icon: <ArrowRight className="w-4 h-4 text-primary" /> },
    { label: 'Address', value: doctor.location, icon: <ArrowRight className="w-4 h-4 text-primary" /> },
    { label: 'Phone', value: doctor.phone, icon: <ArrowRight className="w-4 h-4 text-primary" /> },
    { label: 'Email', value: doctor.email, icon: <ArrowRight className="w-4 h-4 text-primary" /> },
    { label: 'Website', value: 'www.yanethospital.com', icon: <ArrowRight className="w-4 h-4 text-primary" /> },
  ];

  return (
    <div className="bg-[#f8fafd] selection:bg-primary/20 overflow-hidden">
      <Breadcrumb title={doctorName} />

      <section className="py-20 relative">
        {/* Animated Background Enhancements */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-30"
        >
          <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]" />
        </motion.div>

        {/* Dynamic Watermarks */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden select-none z-0 opacity-[0.02]">
           <span className="absolute top-20 left-10 text-[10vw] font-black uppercase -rotate-12">Yanet</span>
           <span className="absolute bottom-20 right-10 text-[10vw] font-black uppercase rotate-12">Care</span>
           <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black uppercase">Specialist</span>
        </div>

        <div className="container-custom !max-w-[1200px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Sidebar Column */}
            <div className="lg:col-span-4 space-y-8">
              {/* Image Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-2 shadow-xl relative group"
              >
                {/* Floating Medical Icons */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg z-20"
                >
                  <CheckCircle2 size={24} />
                </motion.div>

                <div className="relative aspect-[4/5] overflow-hidden border-2 border-primary/20">
                  <img src={doctor.image} alt={doctorName} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                {/* Social Bar */}
                <div className="flex items-center justify-center gap-4 py-4 border-t border-gray-50">
                  {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                    <motion.a 
                      key={i} 
                      whileHover={{ scale: 1.2, color: '#00b8b8' }}
                      href="#" 
                      className="text-gray-400 transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Availability Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-8 shadow-lg relative overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-8">
                  <Clock className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold text-secondary uppercase tracking-tight">Availability</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { day: 'Monday - Friday', time: '9:00 - 20:00' },
                    { day: 'Saturday', time: '10:00 - 16:00' },
                    { day: 'Sunday', dayAm: 'እሁድ', time: '9:30 - 18:00' },
                    { day: 'Friday', time: 'Closed', isClosed: true },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between text-sm pb-3 border-b border-gray-50 last:border-0">
                      <span className="text-gray-500 font-medium">{item.day}</span>
                      <span className={item.isClosed ? 'text-red-500 font-bold' : 'text-secondary font-bold'}>{item.time}</span>
                    </div>
                  ))}
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-8 bg-primary text-white py-4 font-bold text-sm uppercase tracking-wider shadow-lg shadow-primary/20"
                >
                  Request An Appointment
                </motion.button>
              </motion.div>

              {/* Testimonials Sidebar */}
              <div className="space-y-6">
                {[
                  { name: 'Steven Jony', role: 'Dr. of Medicine', text: 'Working with this team has been a game changer for our business. Their professionalism, attention to detail, and commitment to delivering results exceeded all expectations.', image: 'https://i.pravatar.cc/150?u=1' },
                  { name: 'Omit Jacson', role: 'Dr. of Surgery', text: 'The service we received was outstanding from start to finish. Every step was handled with care, and the team went above and beyond to ensure everything was perfect.', image: 'https://i.pravatar.cc/150?u=2' }
                ].map((test, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white p-8 shadow-md border-l-4 border-primary"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden mb-4 border-2 border-primary/20">
                      <img src={test.image} alt={test.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed italic mb-4">"{test.text}"</p>
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-primary text-primary" />)}
                    </div>
                    <h4 className="font-bold text-secondary text-sm">{test.name}</h4>
                    <p className="text-primary text-[10px] font-bold uppercase">{test.role}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Main Content Column */}
            <div className="lg:col-span-8 space-y-10">
              {/* Doctor Bio Header */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-10 shadow-lg relative overflow-hidden"
              >
                {/* ECG Heartbeat Line */}
                <div className="absolute top-0 right-0 w-full h-20 opacity-[0.05] pointer-events-none">
                  <svg viewBox="0 0 1000 100" className="w-full h-full text-primary fill-none stroke-current stroke-2">
                    <path d="M0,50 L200,50 L220,20 L240,80 L260,50 L400,50 L420,10 L440,90 L460,50 L1000,50" className="animate-dash" />
                  </svg>
                </div>

                <h1 className="text-[42px] font-bold text-secondary mb-2 tracking-tight">{doctorName}</h1>
                <p className="text-primary font-bold text-sm uppercase tracking-[1px] mb-6">{doctorRole}</p>
                <div className="prose prose-sm max-w-none text-gray-500 leading-relaxed mb-10">
                  {bio}
                </div>

                {/* Attribute Rows */}
                <div className="space-y-6">
                  {infoItems.map((item, i) => (
                    <div key={i} className="grid grid-cols-1 md:grid-cols-12 items-start py-4 border-b border-gray-100 last:border-0 group">
                      <div className="md:col-span-3">
                        <span className="text-secondary font-bold text-sm">{item.label}</span>
                      </div>
                      <div className="md:col-span-9">
                        <div className="flex flex-col gap-2">
                          {Array.isArray(item.values) ? item.values.map((v, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-gray-500 text-sm group-hover:text-primary transition-colors">
                              {item.icon}
                              <span>{v}</span>
                            </div>
                          )) : (
                            <div className="flex items-center gap-3 text-gray-500 text-sm group-hover:text-primary transition-colors">
                              {item.icon}
                              <span>{item.value}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Large Appointment Form */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-12 shadow-xl text-center"
              >
                <span className="text-primary font-bold text-xs uppercase tracking-[3px] mb-4 block">Make An Appointment</span>
                <h2 className="text-[36px] font-bold text-secondary mb-12">We Are Here For You</h2>
                
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  {[
                    { label: 'Your Name', placeholder: 'Enter Your Name', icon: <User className="w-4 h-4" /> },
                    { label: 'Your Email', placeholder: 'Enter Your Email', icon: <Mail className="w-4 h-4" /> },
                    { label: 'Your Phone', placeholder: 'Enter Your Phone', icon: <Phone className="w-4 h-4" /> },
                    { label: 'Select Service', placeholder: 'Select Service', icon: <Briefcase className="w-4 h-4" />, type: 'select' },
                    { label: 'Appointment Date', placeholder: '05/16/2026', icon: <Calendar className="w-4 h-4" />, type: 'date' },
                    { label: 'Time', placeholder: 'Select Time', icon: <Clock className="w-4 h-4" />, type: 'select' },
                  ].map((field, i) => (
                    <div key={i} className="space-y-2">
                      <label className="text-secondary font-bold text-[13px]">{field.label}</label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary group-focus-within:scale-110 transition-transform">
                          {field.icon}
                        </div>
                        {field.type === 'select' ? (
                          <select className="w-full bg-[#f8fafd] border border-gray-100 py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary transition-colors appearance-none">
                            <option>{field.placeholder}</option>
                          </select>
                        ) : (
                          <input type={field.type || 'text'} placeholder={field.placeholder} className="w-full bg-[#f8fafd] border border-gray-100 py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary transition-colors" />
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-secondary font-bold text-[13px]">Message</label>
                    <div className="relative">
                      <div className="absolute left-4 top-5 text-primary">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <textarea placeholder="Your Message" rows={6} className="w-full bg-[#f8fafd] border border-gray-100 py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary transition-colors resize-none" />
                    </div>
                  </div>
                  <div className="md:col-span-2 pt-6">
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary w-fit mx-auto flex items-center gap-3 !px-12 !py-4 shadow-xl shadow-primary/20"
                    >
                      Send Request
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      <section className="pb-32 pt-10 relative">
        <div className="container-custom !max-w-[1200px]">
           <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-16 text-center shadow-lg relative overflow-hidden"
           >
              <div className="relative z-10">
                <h2 className="text-[32px] font-bold text-secondary mb-4">Looking for a different specialist?</h2>
                <p className="text-gray-500 mb-10 max-w-[700px] mx-auto text-sm leading-relaxed">
                  Our hospital hosts a diverse team of world-class doctors across various departments. Explore our full medical team to find the expert that best fits your needs.
                </p>
                <Link to="/doctors" className="btn-primary inline-flex items-center gap-3 !px-10 !py-4 shadow-xl">
                  Browse All Specialists
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
           </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DoctorDetailPage;
