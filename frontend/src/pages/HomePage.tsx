import Hero from '../components/Home/Hero';
import Features from '../components/Home/Features';
import About from '../components/Home/About';
import Services from '../components/Home/Services';
import WhyChooseUs from '../components/Home/WhyChooseUs';
import Doctors from '../components/Home/Doctors';
import Testimonials from '../components/Home/Testimonials';
import Blog from '../components/Home/Blog';

interface HomePageProps {
  onAppointmentClick: () => void;
}

const HomePage = ({ onAppointmentClick }: HomePageProps) => {
  return (
    <>
      <Hero onAppointmentClick={onAppointmentClick} />
      <Features />
      <About />
      <Services />
      <WhyChooseUs />
      <Doctors />
      <Testimonials />
      <Blog />
    </>
  );
};

export default HomePage;
