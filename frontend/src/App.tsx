import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import TopHeader from './components/Layout/TopHeader';
import Navbar from './components/Layout/Navbar';
import AppointmentModal from './components/Home/AppointmentModal';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import DoctorsPage from './pages/DoctorsPage';
import DoctorDetail from './components/Doctors/DoctorDetail';
import VirtualTourPage from './pages/VirtualTourPage';
import BranchesPage from './pages/BranchesPage';
import BranchDetailPage from './pages/BranchDetailPage';
import CareersPage from './pages/CareersPage';
import PatientGuidePage from './pages/PatientGuidePage';

import ScrollToTop from './components/Layout/ScrollToTop';
import ChatBot from './components/Chat/ChatBot';
import EmergencySOS from './components/Emergency/EmergencySOS';
import { AuthProvider } from './context/AuthContext';
import PatientPortal from './pages/PatientPortal';
import AdminLayout from './components/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminPageEditor from './pages/Admin/AdminPageEditor';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminProtectedRoute from './components/Admin/AdminProtectedRoute';
import AdminBranchesList from './pages/Admin/AdminBranchesList';
import AdminBranchForm from './pages/Admin/AdminBranchForm';

const PublicLayout = ({ isAppointmentOpen, setIsAppointmentOpen }: any) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <header className="absolute top-0 left-0 w-full z-[100]">
        <TopHeader />
        <Navbar onAppointmentClick={() => setIsAppointmentOpen(true)} />
      </header>
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage onAppointmentClick={() => setIsAppointmentOpen(true)} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage onAppointmentClick={() => setIsAppointmentOpen(true)} />} />
          <Route path="/services/:slug" element={<ServiceDetailPage onAppointmentClick={() => setIsAppointmentOpen(true)} />} />
          <Route path="/branches" element={<BranchesPage />} />
          <Route path="/branches/:slug" element={<BranchDetailPage onAppointmentClick={() => setIsAppointmentOpen(true)} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/doctors/:id" element={<DoctorDetail />} />
          <Route path="/virtual-tour" element={<VirtualTourPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/patient-guide" element={<PatientGuidePage />} />
        </Routes>
      </main>

      <Footer />

      <AppointmentModal 
        isOpen={isAppointmentOpen} 
        onClose={() => setIsAppointmentOpen(false)} 
      />
      <ChatBot />
      <EmergencySOS />
    </div>
  );
};
function App() {
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<AdminProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="pages/:pageId" element={<AdminPageEditor />} />
            <Route path="branches" element={<AdminBranchesList />} />
            <Route path="branches/new" element={<AdminBranchForm />} />
            <Route path="branches/edit/:slug" element={<AdminBranchForm />} />
          </Route>
        </Route>

        {/* Patient Portal (Standalone) */}
        <Route path="/patient" element={<PatientPortal />} />

        {/* Public Routes */}
        <Route path="/*" element={
          <PublicLayout 
            isAppointmentOpen={isAppointmentOpen} 
            setIsAppointmentOpen={setIsAppointmentOpen} 
          />
        } />
      </Routes>
    </AuthProvider>
  );
}

export default App;
