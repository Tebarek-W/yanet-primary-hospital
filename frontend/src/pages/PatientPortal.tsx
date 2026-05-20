import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { X, LogOut } from 'lucide-react';

// Import Modular Portal Components
import { PatientLogin } from '../components/PatientPortal/PatientLogin';
import { PortalSidebar } from '../components/PatientPortal/PortalSidebar';
import { PortalHeader } from '../components/PatientPortal/PortalHeader';
import { PortalOverview } from '../components/PatientPortal/PortalOverview';
import { PortalAppointments } from '../components/PatientPortal/PortalAppointments';
import { PortalRecords } from '../components/PatientPortal/PortalRecords';
import { PortalPrescriptions } from '../components/PatientPortal/PortalPrescriptions';
import { PortalMessages } from '../components/PatientPortal/PortalMessages';
import { PortalSettings } from '../components/PatientPortal/PortalSettings';

// Shared interfaces
interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface LabResult {
  id: string;
  testName: string;
  date: string;
  doctor: string;
  value: string;
  range: string;
  status: 'Normal' | 'High' | 'Low';
}

interface Prescription {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  doctor: string;
  refills: number;
  takenToday: boolean;
}

interface Message {
  id: string;
  sender: 'patient' | 'doctor';
  text: string;
  time: string;
}

interface Doctor {
  name: string;
  specialty: string;
  avatar: string;
  chatHistory: Message[];
}

const PatientPortal: React.FC = () => {
  const { user, login, logout, isAuthenticated } = useAuth();
  
  // Dashboard Core Navigation States
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'records' | 'prescriptions' | 'messages' | 'settings'>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  // Interactive Search & Selection States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctorIndex, setSelectedDoctorIndex] = useState(0);
  const [chatInput, setChatInput] = useState('');
  const [appointmentFilter, setAppointmentFilter] = useState<'all' | 'upcoming' | 'completed'>('all');
  
  // Settings Preferences States
  const [phoneInput, setPhoneInput] = useState('+251 911 123456');
  const [weightInput, setWeightInput] = useState('72');
  const [heightInput, setHeightInput] = useState('178');
  const [darkMode, setDarkMode] = useState(false);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  // Notifications state
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'New Lab Result Authorized', message: 'Your Complete Blood Count report has been signed by Dr. Tebarek.', time: '10 mins ago', read: false },
    { id: '2', title: 'Consultation Confirmed', message: 'Your appointment request with Dr. Birhanu has been scheduled.', time: '2 hours ago', read: true },
    { id: '3', title: 'Prescription Refill Approved', message: 'Lisinopril 10mg refill request was authorized by Dr. Tebarek.', time: '1 day ago', read: true },
  ]);

  // Dynamic Appointments state
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: '1', doctor: 'Dr. Birhanu Mengiste', specialty: 'General Surgery', date: 'May 25, 2026', time: '10:00 AM', status: 'upcoming' },
    { id: '2', doctor: 'Dr. Tebarek Liyana', specialty: 'Cardiology', date: 'April 12, 2026', time: '02:30 PM', status: 'completed' },
    { id: '3', doctor: 'Dr. Sarah J.', specialty: 'Pediatrics', date: 'January 18, 2026', time: '09:00 AM', status: 'completed' }
  ]);

  // Static Lab Records
  const [labResults] = useState<LabResult[]>([
    { id: 'R1', testName: 'Complete Blood Count (CBC)', date: 'April 12, 2026', doctor: 'Dr. Tebarek Liyana', value: '14.5 g/dL', range: '13.5 - 17.5 g/dL', status: 'Normal' },
    { id: 'R2', testName: 'Electrocardiogram (ECG)', date: 'April 12, 2026', doctor: 'Dr. Tebarek Liyana', value: '72 bpm (Normal Sinus)', range: '60 - 100 bpm', status: 'Normal' },
    { id: 'R3', testName: 'Fasting Blood Glucose', date: 'April 12, 2026', doctor: 'Dr. Tebarek Liyana', value: '110 mg/dL', range: '70 - 99 mg/dL', status: 'High' },
    { id: 'R4', testName: 'Thyroid Stimulating Hormone (TSH)', date: 'January 18, 2026', doctor: 'Dr. Sarah J.', value: '2.4 uIU/mL', range: '0.4 - 4.0 uIU/mL', status: 'Normal' },
    { id: 'R5', testName: 'Chest X-Ray Screen', date: 'January 18, 2026', doctor: 'Dr. Sarah J.', value: 'Clear Lung Fields', range: 'Clear', status: 'Normal' }
  ]);

  // Prescriptions checklist state
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    { id: 'P1', name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily in the morning', doctor: 'Dr. Tebarek Liyana', refills: 2, takenToday: false },
    { id: 'P2', name: 'Amoxicillin', dosage: '500mg', frequency: 'Three times daily with food', doctor: 'Dr. Sarah J.', refills: 0, takenToday: true },
    { id: 'P3', name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily at bedtime', doctor: 'Dr. Tebarek Liyana', refills: 5, takenToday: false }
  ]);

  // Care Team direct messaging channels state
  const [doctors, setDoctors] = useState<Doctor[]>([
    {
      name: 'Dr. Birhanu Mengiste',
      specialty: 'General Surgery',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200',
      chatHistory: [
        { id: 'm1', sender: 'doctor', text: 'Hello, how is the healing progressing after your minor surgery?', time: '09:30 AM' },
        { id: 'm2', sender: 'patient', text: 'Hello Dr. Birhanu, the incision is healing clean and pain is completely gone.', time: '09:45 AM' },
        { id: 'm3', sender: 'doctor', text: 'Excellent. Keep the area sterile and let us know if you observe any swelling.', time: '10:00 AM' }
      ]
    },
    {
      name: 'Dr. Tebarek Liyana',
      specialty: 'Cardiology',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200',
      chatHistory: [
        { id: 'm4', sender: 'doctor', text: 'Hello Abebe, I reviewed your lipid panel. Your glucose is slightly elevated.', time: 'Yesterday' },
        { id: 'm5', sender: 'patient', text: 'Thank you, Doctor. Do I need to adjust Atorvastatin dose?', time: 'Yesterday' },
        { id: 'm6', sender: 'doctor', text: 'Let’s maintain 20mg for now but focus on a low-sodium, heart-healthy diet for the next 4 weeks.', time: 'Yesterday' }
      ]
    },
    {
      name: 'Dr. Sarah J.',
      specialty: 'Pediatrics',
      avatar: 'https://images.unsplash.com/photo-1594824813573-246434e33963?auto=format&fit=crop&q=80&w=200',
      chatHistory: [
        { id: 'm7', sender: 'doctor', text: 'Hi Abebe, I have approved the refill request for the active pediatric prescription.', time: 'May 15' }
      ]
    }
  ]);

  // Handle Dynamic Messages & Doctor responses
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const currentDoc = doctors[selectedDoctorIndex];
    const newMsg: Message = {
      id: `m-custom-${Date.now()}`,
      sender: 'patient',
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedDocs = [...doctors];
    updatedDocs[selectedDoctorIndex] = {
      ...currentDoc,
      chatHistory: [...currentDoc.chatHistory, newMsg]
    };
    setDoctors(updatedDocs);
    setChatInput('');

    // Simulate direct physician answer after 1.5 seconds
    setTimeout(() => {
      const responses = [
        `I have received your inquiry and noted the updates in your health file. Please continue monitoring.`,
        `That appears well within safe clinical parameters. Maintain your therapy as outlined.`,
        `We will examine this in detail during your next in-person clinic visit. If it is an emergency, call 911.`,
        `Direct message logged. Ensure to drink plenty of fluids and take active medications as scheduled.`,
      ];
      const randomReply = responses[Math.floor(Math.random() * responses.length)];
      
      const doctorReply: Message = {
        id: `m-reply-${Date.now()}`,
        sender: 'doctor',
        text: randomReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const updatedDocsWithReply = [...updatedDocs];
      updatedDocsWithReply[selectedDoctorIndex] = {
        ...currentDoc,
        chatHistory: [...updatedDocs[selectedDoctorIndex].chatHistory, doctorReply]
      };
      setDoctors(updatedDocsWithReply);

      // Trigger standard system notification
      const newNotify = {
        id: `n-${Date.now()}`,
        title: `Message from ${currentDoc.name}`,
        message: randomReply.substring(0, 50) + '...',
        time: 'Just now',
        read: false
      };
      setNotifications(prev => [newNotify, ...prev]);
    }, 1500);
  };

  // Toggle Medication checklist taken state
  const toggleMedication = (id: string) => {
    setPrescriptions(prev => prev.map(p => 
      p.id === id ? { ...p, takenToday: !p.takenToday } : p
    ));
  };

  // Cancel dynamic consultation
  const handleCancelAppointment = (id: string) => {
    setAppointments(prev => prev.map(a => 
      a.id === id ? { ...a, status: 'cancelled' } : a
    ));
  };

  // Schedule dynamic consultation
  const handleBookAppointmentSubmit = (doctorName: string, date: string, time: string) => {
    const doctorDetails: Record<string, string> = {
      'Dr. Birhanu Mengiste': 'General Surgery',
      'Dr. Tebarek Liyana': 'Cardiology',
      'Dr. Sarah J.': 'Pediatrics'
    };

    const newApp: Appointment = {
      id: `app-${Date.now()}`,
      doctor: doctorName,
      specialty: doctorDetails[doctorName] || 'General Practitioner',
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: time,
      status: 'upcoming'
    };

    setAppointments(prev => [newApp, ...prev]);
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getGreeting = () => {
    const hrs = new Date().getHours();
    if (hrs < 12) return 'Good morning';
    if (hrs < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleSaveSettings = () => {
    alert('Portal settings and biological configurations saved successfully.');
  };

  // Keep dark theme body background synchronized
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen text-slate-800 font-sans selection:bg-primary/10 antialiased transition-colors duration-200 ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50'
    }`}>
      
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          
          /* 1. LOGIN SECTION - Clean Simple Centered Clinical Card */
          <PatientLogin login={login} />
          
        ) : (
          
          /* 2. AUTHENTICATED PORTAL MODULE - Modular SaaS-style Workspace */
          <motion.div 
            key="dashboard-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`min-h-screen flex overflow-hidden ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50'}`}
          >
            {/* Collapsible Sidebar Navigation */}
            <PortalSidebar 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              sidebarCollapsed={sidebarCollapsed}
              setSidebarCollapsed={setSidebarCollapsed}
              logout={logout}
              appointmentsCount={appointments.filter(a => a.status === 'upcoming').length}
              userName={user?.name || 'Abebe Kebede'}
            />

            {/* Mobile Drawer Overlay Switcher */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-slate-950/65 backdrop-blur-sm z-40 md:hidden"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <motion.div 
                    initial={{ x: -260 }}
                    animate={{ x: 0 }}
                    exit={{ x: -260 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className={`w-64 h-full flex flex-col justify-between p-5 text-left ${
                      darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-poppins font-extrabold shadow-sm shrink-0">
                            <span>Y</span>
                          </div>
                          <span className={`text-md font-bold tracking-tight font-poppins ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                            Yanet<span className="text-primary font-bold">Portal</span>
                          </span>
                        </div>
                        <button onClick={() => setMobileMenuOpen(false)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                          <X className="w-5 h-5 text-slate-400" />
                        </button>
                      </div>

                      <div className={`p-3 border rounded-xl mb-5 text-left ${
                        darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <h4 className={`text-xs font-bold font-poppins ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                          {user?.name || 'Abebe Kebede'}
                        </h4>
                        <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Medical ID: YH-90210</p>
                      </div>

                      <nav className="space-y-1">
                        {[
                          { id: 'overview', label: 'Overview Summary' },
                          { id: 'appointments', label: 'Book Consultations' },
                          { id: 'records', label: 'Diagnostic Records' },
                          { id: 'prescriptions', label: 'Active Medications' },
                          { id: 'messages', label: 'Secure Inbox' },
                          { id: 'settings', label: 'Portal Settings' },
                        ].map((item) => {
                          const isActive = activeTab === item.id;
                          return (
                            <button
                              key={item.id}
                              onClick={() => {
                                setActiveTab(item.id as any);
                                setMobileMenuOpen(false);
                              }}
                              className={`w-full rounded-lg transition-all font-semibold text-xs py-3 px-4 text-left border border-transparent ${
                                isActive 
                                  ? 'bg-primary text-white shadow-md font-bold' 
                                  : darkMode
                                  ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                              }`}
                            >
                              {item.label}
                            </button>
                          );
                        })}
                      </nav>
                    </div>

                    <button
                      onClick={logout}
                      className="flex items-center gap-2.5 w-full rounded-lg transition-colors font-semibold text-xs py-3 px-4 text-red-505 hover:bg-red-50 dark:hover:bg-red-950/20 text-left border border-transparent"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span>Log Out</span>
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dashboard Content Container */}
            <div className="flex-1 flex flex-col h-screen overflow-y-auto">
              
              {/* Dynamic Header */}
              <PortalHeader 
                activeTab={activeTab}
                setMobileMenuOpen={setMobileMenuOpen}
                notifications={notifications}
                notificationsOpen={notificationsOpen}
                setNotificationsOpen={setNotificationsOpen}
                markAllNotificationsRead={markAllNotificationsRead}
                profileDropdownOpen={profileDropdownOpen}
                setProfileDropdownOpen={setProfileDropdownOpen}
                userName={user?.name || 'Abebe Kebede'}
                userEmail={user?.email || 'patient@example.com'}
                logout={logout}
                setActiveTab={setActiveTab}
                darkMode={darkMode}
              />

              {/* Dynamic Workspace content switchboard */}
              <main className="flex-grow p-4 sm:p-6 overflow-y-auto">
                <AnimatePresence mode="wait">
                  
                  {activeTab === 'overview' && (
                    <PortalOverview 
                      userName={user?.name || 'Abebe Kebede'}
                      getGreeting={getGreeting}
                      appointments={appointments}
                      prescriptions={prescriptions}
                      doctors={doctors}
                      toggleMedication={toggleMedication}
                      handleCancelAppointment={handleCancelAppointment}
                      setActiveTab={setActiveTab}
                      setSelectedDoctorIndex={setSelectedDoctorIndex}
                      darkMode={darkMode}
                    />
                  )}

                  {activeTab === 'appointments' && (
                    <PortalAppointments 
                      appointments={appointments}
                      doctors={doctors}
                      appointmentFilter={appointmentFilter}
                      setAppointmentFilter={setAppointmentFilter}
                      handleCancelAppointment={handleCancelAppointment}
                      handleBookAppointmentSubmit={handleBookAppointmentSubmit}
                      darkMode={darkMode}
                    />
                  )}

                  {activeTab === 'records' && (
                    <PortalRecords 
                      labResults={labResults}
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                      darkMode={darkMode}
                    />
                  )}

                  {activeTab === 'prescriptions' && (
                    <PortalPrescriptions 
                      prescriptions={prescriptions}
                      toggleMedication={toggleMedication}
                      darkMode={darkMode}
                    />
                  )}

                  {activeTab === 'messages' && (
                    <PortalMessages 
                      doctors={doctors}
                      selectedDoctorIndex={selectedDoctorIndex}
                      setSelectedDoctorIndex={setSelectedDoctorIndex}
                      chatInput={chatInput}
                      setChatInput={setChatInput}
                      handleSendMessage={handleSendMessage}
                      darkMode={darkMode}
                    />
                  )}

                  {activeTab === 'settings' && (
                    <PortalSettings 
                      phoneInput={phoneInput}
                      setPhoneInput={setPhoneInput}
                      heightInput={heightInput}
                      setHeightInput={setHeightInput}
                      weightInput={weightInput}
                      setWeightInput={setWeightInput}
                      darkMode={darkMode}
                      setDarkMode={setDarkMode}
                      smsAlerts={smsAlerts}
                      setSmsAlerts={setSmsAlerts}
                      emailAlerts={emailAlerts}
                      setEmailAlerts={setEmailAlerts}
                      handleSaveSettings={handleSaveSettings}
                    />
                  )}

                </AnimatePresence>
              </main>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PatientPortal;
