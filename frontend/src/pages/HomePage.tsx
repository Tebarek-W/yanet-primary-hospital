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
  return (
    <>
      <Hero onAppointmentClick={onAppointmentClick} />
      <Features onAppointmentClick={onAppointmentClick} />
      <About />
      <Services />
      <HomeStats />
      <WhyChooseUs />
      <Doctors />
      <Testimonials />
      <VirtualTourSection />
      <CampaignBanner onAppointmentClick={onAppointmentClick} />
      <Blog />
    </>
  );
};

export default HomePage;
