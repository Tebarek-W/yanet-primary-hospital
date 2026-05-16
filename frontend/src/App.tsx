import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import TopHeader from './components/Layout/TopHeader';
import Navbar from './components/Layout/Navbar';
import AppointmentModal from './components/Home/AppointmentModal';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';

import ScrollToTop from './components/Layout/ScrollToTop';

function App() {
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <header className="absolute top-0 left-0 w-full z-[100]">
          <TopHeader />
          <Navbar onAppointmentClick={() => setIsAppointmentOpen(true)} />
        </header>
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage onAppointmentClick={() => setIsAppointmentOpen(true)} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage onAppointmentClick={() => setIsAppointmentOpen(true)} />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
          </Routes>
        </main>

        <Footer />

        <AppointmentModal 
          isOpen={isAppointmentOpen} 
          onClose={() => setIsAppointmentOpen(false)} 
        />
      </div>
    </>
  );
}

export default App;
