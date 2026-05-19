import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { 
  User, Calendar, FileText, Pill, CreditCard, LogOut, 
  Bell, FileDown, PlusCircle, CheckCircle2, Clock 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PageBanner from '../components/Layout/PageBanner';

const PatientPortal: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'records' | 'prescriptions' | 'billing'>('overview');

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Mock Data
  const appointments = [
    { id: '1', doctor: 'Dr. Birhanu Mengiste', specialty: 'General Surgery', date: 'May 25, 2026', time: '10:00 AM', status: 'upcoming' },
    { id: '2', doctor: 'Dr. Tebarek Liyana', specialty: 'Cardiology', date: 'April 12, 2026', time: '02:30 PM', status: 'completed' },
    { id: '3', doctor: 'Dr. Sarah J.', specialty: 'Pediatrics', date: 'January 18, 2026', time: '09:00 AM', status: 'completed' }
  ];

  const medicalRecords = [
    { id: 'R1', type: 'Complete Blood Count (CBC)', date: 'April 12, 2026', doctor: 'Dr. Tebarek Liyana', status: 'Ready' },
    { id: 'R2', type: 'Electrocardiogram (ECG)', date: 'April 12, 2026', doctor: 'Dr. Tebarek Liyana', status: 'Ready' },
    { id: 'R3', type: 'Chest X-Ray', date: 'January 18, 2026', doctor: 'Dr. Sarah J.', status: 'Ready' }
  ];

  const prescriptions = [
    { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', doctor: 'Dr. Tebarek Liyana', refills: 2 },
    { name: 'Amoxicillin', dosage: '500mg', frequency: 'Three times daily', doctor: 'Dr. Sarah J.', refills: 0 },
    { name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily at bedtime', doctor: 'Dr. Tebarek Liyana', refills: 5 }
  ];

  const billing = [
    { id: 'INV-1024', description: 'Consultation & Lab Works', date: 'April 12, 2026', amount: '1,200 ETB', status: 'Paid' },
    { id: 'INV-0988', description: 'Pediatric Visit', date: 'January 18, 2026', amount: '450 ETB', status: 'Paid' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner 
        title="Patient Portal" 
        breadcrumbs={[{ label: 'Patient Portal' }]}
        image="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000"
      />

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Nav */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100 text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
                <User className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-extrabold text-gray-900">{user?.name}</h3>
              <p className="text-xs font-semibold text-primary mt-1">Medical ID: YH-90210</p>
              
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-1 text-sm text-gray-500 font-medium">
                <span>{user?.email}</span>
                <span>{user?.phone}</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-3 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col gap-1">
              {[
                { id: 'overview', label: 'Dashboard Overview', icon: User },
                { id: 'appointments', label: 'My Appointments', icon: Calendar },
                { id: 'records', label: 'Medical Records', icon: FileText },
                { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
                { id: 'billing', label: 'Billing & Invoices', icon: CreditCard }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm transition-all ${
                      activeTab === tab.id 
                        ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                        : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    <Icon className="w-4.5 h-4.5" />
                    {tab.label}
                  </button>
                );
              })}
              <button 
                onClick={logout}
                className="flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm text-red-600 hover:bg-red-50 transition-all mt-4 border-t border-gray-100"
              >
                <LogOut className="w-4.5 h-4.5" />
                Logout
              </button>
            </div>
          </div>

          {/* Main Dashboard Panel */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 min-h-[500px]">
              
              {/* Tab: Overview */}
              {activeTab === 'overview' && (
                <div className="space-y-8 animate-fade-in">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Hello, {user?.name.split(' ')[0]}</h2>
                      <p className="text-gray-500 mt-1">Here is a quick overview of your medical health record status.</p>
                    </div>
                    <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 px-4 py-2.5 rounded-2xl text-blue-600">
                      <Bell className="w-5 h-5 animate-bounce-soft" />
                      <span className="text-xs font-bold">1 New Lab Result Available</span>
                    </div>
                  </div>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-primary/5 to-primary-light/5 border border-primary/10 rounded-2xl p-6">
                      <div className="flex justify-between items-start">
                        <Calendar className="w-8 h-8 text-primary" />
                        <span className="text-[10px] font-extrabold uppercase bg-primary/10 text-primary px-2.5 py-1 rounded-full">Next Visit</span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mt-4">May 25, 2026</h4>
                      <p className="text-xs text-gray-500 mt-1">Dr. Birhanu M. • 10:00 AM</p>
                    </div>

                    <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 border border-secondary/10 rounded-2xl p-6">
                      <div className="flex justify-between items-start">
                        <FileText className="w-8 h-8 text-secondary" />
                        <span className="text-[10px] font-extrabold uppercase bg-secondary/10 text-secondary px-2.5 py-1 rounded-full">Reports</span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mt-4">3 Available</h4>
                      <p className="text-xs text-gray-500 mt-1">Last uploaded: April 12</p>
                    </div>

                    <div className="bg-gradient-to-br from-amber-500/5 to-amber-600/5 border border-amber-500/10 rounded-2xl p-6">
                      <div className="flex justify-between items-start">
                        <Pill className="w-8 h-8 text-amber-500" />
                        <span className="text-[10px] font-extrabold uppercase bg-amber-500/10 text-amber-600 px-2.5 py-1 rounded-full">Prescriptions</span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mt-4">2 Active Medications</h4>
                      <p className="text-xs text-gray-500 mt-1">Lisinopril, Atorvastatin</p>
                    </div>
                  </div>

                  {/* Upcoming Appointments Short List */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Upcoming Appointments</h3>
                    <div className="border border-gray-100 rounded-2xl overflow-hidden divide-y divide-gray-100">
                      {appointments.filter(a => a.status === 'upcoming').map(app => (
                        <div key={app.id} className="p-5 flex justify-between items-center bg-white hover:bg-gray-50/50 transition-all">
                          <div>
                            <h4 className="font-bold text-gray-900">{app.doctor}</h4>
                            <p className="text-xs text-gray-500 mt-0.5">{app.specialty}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900 text-sm">{app.date}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{app.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Appointments */}
              {activeTab === 'appointments' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Appointments Schedule</h2>
                      <p className="text-sm text-gray-500 mt-0.5">Manage and track your schedule with our specialist doctors.</p>
                    </div>
                    <button className="flex items-center gap-1.5 bg-primary text-white font-bold px-4 py-2.5 rounded-xl hover:bg-primary-dark transition-all text-xs">
                      <PlusCircle className="w-4 h-4" /> Book Appointment
                    </button>
                  </div>

                  <div className="border border-gray-100 rounded-2xl overflow-hidden divide-y divide-gray-100">
                    {appointments.map(app => (
                      <div key={app.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-xl shrink-0 ${
                            app.status === 'upcoming' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-400'
                          }`}>
                            <Calendar className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">{app.doctor}</h4>
                            <p className="text-xs text-gray-500 mt-0.5">{app.specialty}</p>
                            <p className="text-xs text-gray-450 mt-2 flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" /> {app.date} at {app.time}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 self-end md:self-center">
                          {app.status === 'upcoming' ? (
                            <>
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-600 border border-green-100">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Scheduled
                              </span>
                              <button className="text-xs font-bold text-red-600 hover:bg-red-50 px-3 py-2 rounded-xl transition-all border border-transparent hover:border-red-100">
                                Cancel
                              </button>
                            </>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-50 text-gray-500 border border-gray-100">
                              Completed
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Medical Records */}
              {activeTab === 'records' && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Medical Reports & Labs</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Securely view and download your health reports.</p>
                  </div>

                  <div className="border border-gray-100 rounded-2xl overflow-hidden divide-y divide-gray-100">
                    {medicalRecords.map(rec => (
                      <div key={rec.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-secondary/10 text-secondary rounded-xl shrink-0">
                            <FileText className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">{rec.type}</h4>
                            <p className="text-xs text-gray-500 mt-0.5">Ordered by: {rec.doctor}</p>
                            <p className="text-xs text-gray-400 mt-2">Available since: {rec.date}</p>
                          </div>
                        </div>

                        <button className="self-end md:self-center flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold px-4 py-2.5 rounded-xl transition-all text-xs border border-gray-200">
                          <FileDown className="w-4 h-4" /> Download PDF
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Prescriptions */}
              {activeTab === 'prescriptions' && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Current Medications</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Track your active prescriptions and refills.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {prescriptions.map((pres, idx) => (
                      <div key={idx} className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start">
                          <h4 className="font-extrabold text-lg text-gray-900">{pres.name}</h4>
                          <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase ${
                            pres.refills > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                          }`}>
                            {pres.refills > 0 ? `${pres.refills} Refills Left` : 'No Refills'}
                          </span>
                        </div>
                        <div className="mt-4 space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Dosage:</span>
                            <span className="font-bold text-gray-700">{pres.dosage}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Frequency:</span>
                            <span className="font-bold text-gray-700">{pres.frequency}</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-gray-50">
                            <span className="text-gray-400 text-xs">Prescribed by:</span>
                            <span className="font-semibold text-gray-600 text-xs">{pres.doctor}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Billing */}
              {activeTab === 'billing' && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Billing History</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Review invoices and payment receipts.</p>
                  </div>

                  <div className="border border-gray-100 rounded-2xl overflow-hidden divide-y divide-gray-100">
                    {billing.map(invoice => (
                      <div key={invoice.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-amber-500/10 text-amber-600 rounded-xl shrink-0">
                            <CreditCard className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">{invoice.description}</h4>
                            <p className="text-xs text-gray-400 mt-1">Invoice ID: {invoice.id} • {invoice.date}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 self-end md:self-center">
                          <span className="font-extrabold text-gray-900">{invoice.amount}</span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-600 border border-green-100">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Paid
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PatientPortal;
