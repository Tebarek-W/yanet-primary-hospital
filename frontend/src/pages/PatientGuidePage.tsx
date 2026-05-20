import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GuideSidebar } from '../components/PatientGuide/GuideSidebar';
import type { GuideSectionId } from '../components/PatientGuide/GuideSidebar';
import { 
  AppointmentGuidelines, 
  BarcodePosting,
  AdmissionDischarge, 
  InsuranceBilling, 
  VisitingHours, 
  PatientRights 
} from '../components/PatientGuide/StaticContentSections';
import { FAQSection } from '../components/PatientGuide/FAQSection';

const PatientGuidePage = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<GuideSectionId>('appointments');

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);

    // Support deep linking via hash e.g. /patient-guide#faq
    if (location.hash) {
      const hash = location.hash.replace('#', '') as GuideSectionId;
      const validSections = ['appointments', 'barcode', 'admission', 'insurance', 'visiting', 'rights', 'faq'];
      if (validSections.includes(hash)) {
        setActiveSection(hash);
      }
    }
  }, [location]);

  // Handle active section change and update URL hash without full reload
  const handleSectionChange = (section: GuideSectionId) => {
    setActiveSection(section);
    window.history.pushState(null, '', `#${section}`);
    // Smooth scroll to top of content area on mobile
    if (window.innerWidth < 1024) {
      document.getElementById('guide-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
       window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'appointments':
        return <AppointmentGuidelines />;
      case 'barcode':
        return <BarcodePosting />;
      case 'admission':
        return <AdmissionDischarge />;
      case 'insurance':
        return <InsuranceBilling />;
      case 'visiting':
        return <VisitingHours />;
      case 'rights':
        return <PatientRights />;
      case 'faq':
        return <FAQSection />;
      default:
        return <AppointmentGuidelines />;
    }
  };

  return (
    <div className="bg-gray-50/50 min-h-screen pb-[100px]">
      {/* Hero Section */}
      <section className="relative pt-[180px] pb-[100px] bg-secondary overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3"></div>
        
        <div className="container-custom relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[40px] md:text-[56px] font-bold text-white mb-[20px] tracking-tight"
          >
            Patient & Visitor <span className="text-primary">Guide</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/80 text-[18px] max-w-2xl mx-auto"
          >
            Everything you need to know about your visit, from preparation and admission to visiting hours and billing information.
          </motion.p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="container-custom mt-[-40px] relative z-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full lg:w-1/3 xl:w-1/4">
            <GuideSidebar 
              activeSection={activeSection} 
              setActiveSection={handleSectionChange} 
            />
          </div>

          {/* Content Area */}
          <div 
            id="guide-content"
            className="w-full lg:w-2/3 xl:w-3/4 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10 min-h-[600px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>
    </div>
  );
};

export default PatientGuidePage;
