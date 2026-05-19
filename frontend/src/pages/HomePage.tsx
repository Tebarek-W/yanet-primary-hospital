import { useState, useEffect } from 'react';
import Hero from '../components/Home/Hero';
import Features from '../components/Home/Features';
import About from '../components/Home/About';
import Services from '../components/Home/Services';
import HomeStats from '../components/Home/HomeStats';
import WhyChooseUs from '../components/Home/WhyChooseUs';
import Doctors from '../components/Home/Doctors';
import Testimonials from '../components/Home/Testimonials';
import CampaignBanner from '../components/Home/CampaignBanner';
import VirtualTourSection from '../components/Home/VirtualTourSection';
import Blog from '../components/Home/Blog';

interface HomePageProps {
  onAppointmentClick: () => void;
}

const HomePage = ({ onAppointmentClick }: HomePageProps) => {
  const [cmsData, setCmsData] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    fetch('http://localhost:5002/api/pages/home')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Database content not seeded or server offline');
      })
      .then(data => {
        if (data && Object.keys(data).length > 0) {
          setCmsData(data);
        }
      })
      .catch(err => {
        console.warn("Using default translation content: ", err);
      });
  }, []);

  return (
    <>
      <Hero onAppointmentClick={onAppointmentClick} cmsData={cmsData} />
      <Features onAppointmentClick={onAppointmentClick} cmsData={cmsData} />
      <About cmsData={cmsData} />
      <Services />
      <HomeStats />
      <WhyChooseUs />
      <Doctors />
      <Testimonials cmsData={cmsData} />
      <VirtualTourSection />
      <CampaignBanner onAppointmentClick={onAppointmentClick} />
      <Blog />
    </>
  );
};

export default HomePage;
