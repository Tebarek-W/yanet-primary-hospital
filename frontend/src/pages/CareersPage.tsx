import React, { useState, useEffect } from 'react';
import CareersHero from '../components/Careers/CareersHero';
import JobList from '../components/Careers/JobList';
import InternshipSection from '../components/Careers/InternshipSection';
import HRContact from '../components/Careers/HRContact';
import ApplicationModal from '../components/Careers/ApplicationModal';
import { careersData, type JobVacancy } from '../data/careersData';

const CareersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState<JobVacancy | null>(null);

  // Set page title for SEO
  useEffect(() => {
    document.title = "Careers & Vacancies | Yanet Primary Hospital";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CareersHero 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        totalJobs={careersData.length} 
      />
      
      <JobList 
        searchQuery={searchQuery} 
        onApplyClick={(job) => setSelectedJob(job)} 
      />
      
      <InternshipSection />
      
      <HRContact />
      
      <ApplicationModal 
        job={selectedJob} 
        onClose={() => setSelectedJob(null)} 
      />
    </>
  );
};

export default CareersPage;
