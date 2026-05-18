import Breadcrumb from '../components/About/Breadcrumb';
import AboutUs from '../components/About/AboutUs';
import InfoSection from '../components/About/InfoSection';
import MissionVision from '../components/About/MissionVision';
import Timeline from '../components/About/Timeline';
import LeadershipTeam from '../components/About/LeadershipTeam';
import Certifications from '../components/About/Certifications';
import Partnerships from '../components/About/Partnerships';
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
      <Timeline />
      <LeadershipTeam />
      <Certifications />
      <Partnerships />
      <MedicalCamp />
      <CounterStats />
      <DoctorTeam />
      <CTABanner />
    </div>
  );
};

export default AboutPage;
