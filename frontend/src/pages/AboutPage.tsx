import { useState, useEffect } from 'react';
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
import { api } from '../utils/api';

const AboutPage = () => {
  const [cmsData, setCmsData] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    api.pages.get('about')
      .then(data => {
        if (data && Object.keys(data).length > 0) {
          setCmsData(data);
        }
      })
      .catch(err => {
        console.warn("Using default translation content for AboutPage:", err);
      });
  }, []);

  return (
    <div className="bg-white">
      <Breadcrumb title="About Us" cmsData={cmsData} />
      <AboutUs cmsData={cmsData} />
      <InfoSection />
      <MissionVision cmsData={cmsData} />
      <Timeline cmsData={cmsData} />
      <LeadershipTeam cmsData={cmsData} />
      <Certifications cmsData={cmsData} />
      <Partnerships cmsData={cmsData} />
      <MedicalCamp cmsData={cmsData} />
      <CounterStats cmsData={cmsData} />
      <DoctorTeam />
      <CTABanner />
    </div>
  );
};

export default AboutPage;

