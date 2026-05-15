import TopHeader from './components/Layout/TopHeader';
import Navbar from './components/Layout/Navbar';
import Hero from './components/Home/Hero';
import Features from './components/Home/Features';
import About from './components/Home/About';
import Services from './components/Home/Services';
import Appointment from './components/Home/Appointment';
import Doctors from './components/Home/Doctors';
import Testimonials from './components/Home/Testimonials';
import Blog from './components/Home/Blog';
import Footer from './components/Layout/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="absolute top-0 left-0 w-full z-[100]">
        <TopHeader />
        <Navbar />
      </header>
      
      <main className="flex-grow">
        <Hero />
        <Features />
        <About />
        <Services />
        <Appointment />
        <Doctors />
        <Testimonials />
        <Blog />
      </main>

      <Footer />
    </div>
  );
}

export default App;
