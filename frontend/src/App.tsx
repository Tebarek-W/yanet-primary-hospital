import { Routes, Route } from 'react-router-dom';
import TopHeader from './components/Layout/TopHeader';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="absolute top-0 left-0 w-full z-[100]">
        <TopHeader />
        <Navbar />
      </header>
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
