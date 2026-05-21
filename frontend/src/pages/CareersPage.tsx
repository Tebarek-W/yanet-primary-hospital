import React, { useState, useEffect } from 'react';
import CareersHero from '../components/Careers/CareersHero';
import JobList from '../components/Careers/JobList';
import InternshipSection from '../components/Careers/InternshipSection';
import HRContact from '../components/Careers/HRContact';
import ApplicationModal from '../components/Careers/ApplicationModal';
import { careersData, type JobVacancy } from '../data/careersData';
import { api } from '../utils/api';

const CareersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState<JobVacancy | null>(null);
  const [totalJobs, setTotalJobs] = useState(careersData.length);
  const [cmsData, setCmsData] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    document.title = "Careers & Vacancies | Yanet Primary Hospital";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    api.pages.get('careers')
      .then(data => {
        if (data && Object.keys(data).length > 0) setCmsData(data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    api.careers.getVacancies()
      .then((data: JobVacancy[]) => {
        if (Array.isArray(data) && data.length > 0) setTotalJobs(data.length);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <CareersHero 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        totalJobs={totalJobs} 
      />
      <JobList 
        searchQuery={searchQuery} 
        onApplyClick={(job) => setSelectedJob(job)} 
      />
      <InternshipSection />
      <HRContact cmsData={cmsData} />
      <ApplicationModal 
        job={selectedJob} 
        onClose={() => setSelectedJob(null)} 
      />
    </>
  );
};

export default CareersPage;
