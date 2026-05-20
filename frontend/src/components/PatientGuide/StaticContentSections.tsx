import { 
  Calendar, CreditCard, Clock, Shield, CheckCircle, 
  ClipboardList, Stethoscope, Briefcase, FileText, 
  MapPin, AlertCircle, ScanLine, Smartphone, Check,
  AlertTriangle, Heart, Activity, HelpCircle
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const AppointmentGuidelines = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
          <Calendar className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-secondary tracking-tight">Appointment Guidelines</h2>
          <p className="text-secondary/60 mt-1">Everything you need to know before your visit.</p>
        </div>
      </div>
      
      <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
        <p className="text-secondary/80 leading-relaxed text-lg">
          Proper preparation for your appointment ensures that our medical professionals can provide you with the best possible care.
        </p>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-2">
          <ClipboardList className="w-6 h-6 text-primary" />
          How to Prepare
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: Activity, title: "Symptom Tracking", desc: "Write down any symptoms, when they started, and frequency." },
            { icon: Stethoscope, title: "Medications", desc: "List all current medications, vitamins, and supplements." },
            { icon: FileText, title: "Medical History", desc: "Note key personal information and recent major life changes." },
            { icon: HelpCircle, title: "Questions", desc: "Prepare a list of questions to ask your doctor." }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-secondary mb-1">{item.title}</h4>
                  <p className="text-sm text-secondary/70 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4">
        <h3 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-primary" />
          What to Bring
        </h3>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <ul className="divide-y divide-gray-50">
            {[
              "A valid government-issued photo ID.",
              "Your current insurance card and necessary referral forms.",
              "Copies of previous medical records, test results, or X-rays.",
              "A form of payment for copays or deductibles."
            ].map((text, idx) => (
              <li key={idx} className="flex items-center gap-4 p-5 hover:bg-gray-50/50 transition-colors">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-secondary/80 font-medium">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const AdmissionDischarge = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
          <CheckCircle className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-secondary tracking-tight">Admission & Discharge</h2>
          <p className="text-secondary/60 mt-1">Step-by-step guide to your hospital stay.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Admission */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-secondary flex items-center gap-2">
            <span className="text-primary font-black text-3xl opacity-50">01.</span>
            Admission Process
          </h3>
          <div className="relative pl-6 space-y-8 before:absolute before:inset-0 before:ml-[11px] before:w-0.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
            {[
              { title: "Registration", desc: "Proceed to the main admissions desk located in the lobby. Present your ID and insurance." },
              { title: "Documentation", desc: "Sign necessary consent forms for treatment and review our privacy policy." },
              { title: "Orientation", desc: "A nurse will escort you to your room and explain the facilities and daily routine." }
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-primary border-4 border-white shadow-sm shrink-0 mt-1 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm w-full">
                  <h4 className="font-bold text-secondary mb-2">{step.title}</h4>
                  <p className="text-sm text-secondary/70 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Discharge */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-secondary flex items-center gap-2">
            <span className="text-primary font-black text-3xl opacity-50">02.</span>
            Discharge Process
          </h3>
          <div className="relative pl-6 space-y-8 before:absolute before:inset-0 before:ml-[11px] before:w-0.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
            {[
              { title: "Medical Review", desc: "Your doctor provides final instructions, prescriptions, and follow-up details." },
              { title: "Clearance", desc: "A nurse will review your discharge paperwork with you." },
              { title: "Billing", desc: "Visit the discharge desk to settle any outstanding balances." },
              { title: "Departure", desc: "We will assist you to your vehicle if needed." }
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-green-500 border-4 border-white shadow-sm shrink-0 mt-1 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm w-full">
                  <h4 className="font-bold text-secondary mb-2">{step.title}</h4>
                  <p className="text-sm text-secondary/70 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const InsuranceBilling = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
          <CreditCard className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-secondary tracking-tight">Insurance & Billing</h2>
          <p className="text-secondary/60 mt-1">Information on accepted insurers and payments.</p>
        </div>
      </div>

      <div className="bg-green-50/50 rounded-2xl p-6 border border-green-100">
        <p className="text-secondary/80 leading-relaxed text-lg">
          We strive to make the billing process transparent and straightforward. We accept a variety of payment methods and work with numerous insurance providers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-bold text-secondary mb-6">Accepted Insurers</h3>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <ul className="divide-y divide-gray-50">
              {[
                "Ethiopian Health Insurance Agency",
                "Awash Insurance",
                "Nyala Insurance",
                "United Insurance",
                "International Health Insurance"
              ].map((text, idx) => (
                <li key={idx} className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors">
                  <Shield className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-secondary/80 font-medium">{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-secondary/50 mt-3 italic flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Contact billing to verify specific plan coverage.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-secondary mb-6">Payment Methods</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: "Cash", icon: "💵" },
              { name: "Credit/Debit Cards", icon: "💳" },
              { name: "Telebirr", icon: "📱" },
              { name: "CBE Birr", icon: "🏦" },
              { name: "Bank Transfers", icon: "🔄" }
            ].map((method, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3 hover:border-primary/30 transition-colors cursor-default">
                <span className="text-2xl">{method.icon}</span>
                <span className="font-bold text-secondary/80">{method.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const VisitingHours = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
          <Clock className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-secondary tracking-tight">Visiting Hours</h2>
          <p className="text-secondary/60 mt-1">Guidelines for family and friends.</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-primary to-primary-light rounded-3xl p-8 text-white shadow-xl shadow-primary/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-medium text-white/90 mb-2 uppercase tracking-wider text-sm">General Visiting Hours</h3>
            <div className="text-3xl md:text-4xl font-black mb-2">10:00 AM - 12:00 PM</div>
            <div className="text-xl md:text-2xl font-bold text-white/90">& 4:00 PM - 7:00 PM</div>
            <p className="text-white/80 mt-4 text-sm max-w-sm">
              * ICU and Maternity wards may have restricted visiting hours. Please inquire at the front desk.
            </p>
          </div>
          <Clock className="w-32 h-32 text-white/20 absolute right-8 -bottom-8" />
        </div>
      </div>

      <div className="pt-4">
        <h3 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-primary" />
          Visitor Guidelines
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { text: "Maximum of two visitors per patient at a time." },
            { text: "Sanitize your hands upon entering and exiting." },
            { text: "Do not visit if you are experiencing symptoms of illness." },
            { text: "Maintain a quiet environment for all patients." },
            { text: "Children under 12 must be accompanied by an adult." }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
              </div>
              <p className="text-secondary/80 font-medium leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const PatientRights = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
          <Shield className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-secondary tracking-tight">Rights & Responsibilities</h2>
          <p className="text-secondary/60 mt-1">Our commitment to you, and yours to us.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Rights */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-md overflow-hidden flex flex-col">
          <div className="bg-primary/5 p-6 border-b border-gray-100">
            <h3 className="text-2xl font-bold text-secondary flex items-center gap-2">
              <Heart className="w-6 h-6 text-primary" />
              Your Rights
            </h3>
          </div>
          <div className="p-6 flex-1">
            <ul className="space-y-5">
              {[
                { title: "Respectful Care", desc: "Right to considerate and respectful care under all circumstances." },
                { title: "Information", desc: "Right to obtain complete, current info concerning diagnosis and treatment." },
                { title: "Privacy", desc: "Right to every consideration of privacy concerning your medical care." },
                { title: "Refusal of Treatment", desc: "Right to refuse treatment to the extent permitted by law." }
              ].map((item, idx) => (
                <li key={idx} className="flex gap-4">
                  <div className="mt-1"><CheckCircle className="w-5 h-5 text-green-500" /></div>
                  <div>
                    <h4 className="font-bold text-secondary">{item.title}</h4>
                    <p className="text-sm text-secondary/70 leading-relaxed mt-1">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Responsibilities */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-md overflow-hidden flex flex-col">
          <div className="bg-orange-50 p-6 border-b border-gray-100">
            <h3 className="text-2xl font-bold text-secondary flex items-center gap-2">
              <ClipboardList className="w-6 h-6 text-orange-500" />
              Your Responsibilities
            </h3>
          </div>
          <div className="p-6 flex-1">
            <ul className="space-y-5">
              {[
                { title: "Provide Information", desc: "Provide complete and accurate info about your health and history." },
                { title: "Follow Instructions", desc: "Follow the treatment plan recommended by your practitioner." },
                { title: "Respect Others", desc: "Be considerate of the rights of other patients and personnel." },
                { title: "Financial Obligations", desc: "Assure that financial obligations are fulfilled promptly." }
              ].map((item, idx) => (
                <li key={idx} className="flex gap-4">
                  <div className="mt-1"><AlertCircle className="w-5 h-5 text-orange-400" /></div>
                  <div>
                    <h4 className="font-bold text-secondary">{item.title}</h4>
                    <p className="text-sm text-secondary/70 leading-relaxed mt-1">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BarcodePosting = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
          <ScanLine className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-secondary tracking-tight">Barcode & Identification</h2>
          <p className="text-secondary/60 mt-1">Ensuring patient safety and accurate care.</p>
        </div>
      </div>

      <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
        <p className="text-secondary/80 leading-relaxed text-lg">
          For your safety and to ensure the highest quality of care, Yanet Primary Hospital utilizes a comprehensive barcode identification system throughout your stay.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
          <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Shield className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-secondary mb-3">Patient Wristbands</h3>
          <p className="text-secondary/70 text-sm leading-relaxed">
            Upon admission, you receive a wristband featuring a unique barcode linked securely to your electronic health record. Please wear it at all times until discharge.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
          <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <CheckCircle className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-secondary mb-3">Care Verification</h3>
          <p className="text-secondary/70 text-sm leading-relaxed">
            Before administering medication or performing procedures, staff will scan your wristband to verify your identity and ensure correct treatment.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
          <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Smartphone className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-secondary mb-3">Interactive Scanning</h3>
          <p className="text-secondary/70 text-sm leading-relaxed">
            Scan QR codes posted in your room with your mobile device for quick access to the patient portal, meal menus, and educational materials.
          </p>
        </div>
      </div>
    </div>
  );
};
