import Breadcrumb from '../components/About/Breadcrumb';
import AboutUs from '../components/About/AboutUs';
import InfoSection from '../components/About/InfoSection';
import MissionVision from '../components/About/MissionVision';
import CounterStats from '../components/About/CounterStats';
import DoctorTeam from '../components/About/DoctorTeam';
import MedicalCamp from '../components/About/MedicalCamp';
import CTABanner from '../components/About/CTABanner';

const AboutPage = () => {
  return (
    <div className="bg-white">
      <Breadcrumb title="About Us" />
      <AboutUs />
      <InfoSection />
      <MissionVision />
      <MedicalCamp />
      <CounterStats />
      <DoctorTeam />
      <CTABanner />
    </div>
  );
};

export default AboutPage;
