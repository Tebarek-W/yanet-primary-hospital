import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import TopHeader from './components/Layout/TopHeader';
import Navbar from './components/Layout/Navbar';
import Hero from './components/Home/Hero';
import Features from './components/Home/Features';
import About from './components/Home/About';
import Services from './components/Home/Services';
import WhyChooseUs from './components/Home/WhyChooseUs';
import AppointmentModal from './components/Home/AppointmentModal';
import Doctors from './components/Home/Doctors';
import Testimonials from './components/Home/Testimonials';
import Blog from './components/Home/Blog';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

function App() {
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="absolute top-0 left-0 w-full z-[100]">
        <TopHeader />
        <Navbar onAppointmentClick={() => setIsAppointmentOpen(true)} />
      </header>
      
      <main className="flex-grow">
        <Hero onAppointmentClick={() => setIsAppointmentOpen(true)} />
        <Features />
        <About />
        <Services />
        <WhyChooseUs />
        <Doctors />
        <Testimonials />
        <Blog />
      </main>

      <Footer />

      <AppointmentModal 
        isOpen={isAppointmentOpen} 
        onClose={() => setIsAppointmentOpen(false)} 
      />
    </div>
  );
}

export default App;
