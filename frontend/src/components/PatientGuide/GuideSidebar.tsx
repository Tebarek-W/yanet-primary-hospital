import { Calendar, CreditCard, Clock, Shield, CheckCircle, HelpCircle, ScanLine, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export type GuideSectionId = 'appointments' | 'barcode' | 'admission' | 'insurance' | 'visiting' | 'rights' | 'faq';

interface GuideSidebarProps {
  activeSection: GuideSectionId;
  setActiveSection: (section: GuideSectionId) => void;
}

export const GuideSidebar = ({ activeSection, setActiveSection }: GuideSidebarProps) => {
  const sections = [
    { id: 'appointments' as GuideSectionId, label: 'Appointments', icon: Calendar },
    { id: 'barcode' as GuideSectionId, label: 'Barcode Posting', icon: ScanLine },
    { id: 'admission' as GuideSectionId, label: 'Admission & Discharge', icon: CheckCircle },
    { id: 'insurance' as GuideSectionId, label: 'Insurance & Billing', icon: CreditCard },
    { id: 'visiting' as GuideSectionId, label: 'Visiting Hours', icon: Clock },
    { id: 'rights' as GuideSectionId, label: 'Patient Rights', icon: Shield },
    { id: 'faq' as GuideSectionId, label: 'FAQs', icon: HelpCircle },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/40 border border-gray-100 p-6 sticky top-[120px] overflow-hidden relative">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100 relative z-10">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
          <Calendar className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-secondary tracking-tight leading-none">
            Navigation
          </h3>
          <p className="text-[10px] text-secondary/50 font-bold uppercase tracking-widest mt-1.5">Quick Links</p>
        </div>
      </div>

      <nav className="flex flex-col space-y-1.5 relative z-10">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`relative flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 w-full text-left font-medium group ${
                isActive 
                  ? 'text-white' 
                  : 'text-secondary/70 hover:text-primary'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeSidebar"
                  className="absolute inset-0 bg-primary rounded-2xl shadow-md shadow-primary/20"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              
              {/* Hover Background */}
              {!isActive && (
                <div className="absolute inset-0 bg-gray-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
              
              <div className="relative z-10 flex items-center gap-3">
                <div className={`p-1.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-white/20 shadow-sm' : 'bg-gray-100 group-hover:bg-primary/10'}`}>
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-primary'}`} />
                </div>
                <span className="text-[15px]">{section.label}</span>
              </div>

              <ChevronRight className={`relative z-10 w-4 h-4 transition-all duration-300 ${
                isActive 
                  ? 'text-white/80 translate-x-0 opacity-100' 
                  : 'text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
              }`} />
            </button>
          );
        })}
      </nav>
    </div>
  );
};
