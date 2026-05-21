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
import { api } from '../utils/api';

interface HomePageProps {
  onAppointmentClick: () => void;
}

const HomePage = ({ onAppointmentClick }: HomePageProps) => {
  const [cmsData, setCmsData] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    api.pages.get('home')
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
      <HomeStats cmsData={cmsData} />
      <WhyChooseUs cmsData={cmsData} />
      <Doctors />
      <Testimonials cmsData={cmsData} />
      <VirtualTourSection cmsData={cmsData} />
      <CampaignBanner onAppointmentClick={onAppointmentClick} cmsData={cmsData} />
      <Blog />
    </>
  );
};

export default HomePage;
