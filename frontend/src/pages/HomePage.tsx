import Hero from '../components/Home/Hero';
import Features from '../components/Home/Features';
import About from '../components/Home/About';
import Services from '../components/Home/Services';
import Appointment from '../components/Home/Appointment';
import Doctors from '../components/Home/Doctors';
import Testimonials from '../components/Home/Testimonials';
import Blog from '../components/Home/Blog';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Features />
      <About />
      <Services />
      <Appointment />
      <Doctors />
      <Testimonials />
      <Blog />
    </>
  );
};

export default HomePage;
