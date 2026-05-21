import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Briefcase, Clock, Calendar, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { careersData, type JobVacancy } from '../../data/careersData';
import { api } from '../../utils/api';

interface JobListProps {
  searchQuery: string;
  onApplyClick: (job: JobVacancy) => void;
}

const JobList: React.FC<JobListProps> = ({ searchQuery, onApplyClick }) => {
  const { t, i18n } = useTranslation();
  const isAmharic = i18n.language.startsWith('am');

  const [activeDept, setActiveDept] = useState<string>('All');
  const [activeLoc, setActiveLoc] = useState<string>('All');
  const [jobs, setJobs] = useState<JobVacancy[]>([...careersData]);

  useEffect(() => {
    api.careers.getVacancies()
      .then((data: JobVacancy[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setJobs(data);
        }
      })
      .catch(() => { /* keep static fallback */ });
  }, []);

  // Extract unique departments & locations with bilingual mapping
  const departmentsMap = useMemo(() => {
    const map = new Map<string, { en: string; am: string }>();
    jobs.forEach(job => {
      map.set(job.department, { en: job.department, am: job.departmentAm });
    });
    return [
      { key: 'All', en: 'All Departments', am: 'ሁሉም የስራ ክፍሎች' },
      ...Array.from(map.values()).map(v => ({ key: v.en, en: v.en, am: v.am }))
    ];
  }, [jobs]);

  const locationsMap = useMemo(() => {
    const map = new Map<string, { en: string; am: string }>();
    jobs.forEach(job => {
      map.set(job.location, { en: job.location, am: job.locationAm });
    });
    return [
      { key: 'All', en: 'All Branches', am: 'ሁሉም ቅርንጫፎች' },
      ...Array.from(map.values()).map(v => ({ key: v.en, en: v.en, am: v.am }))
    ];
  }, [jobs]);

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchQuery = searchQuery ? (
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.titleAm.includes(searchQuery) ||
        job.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase())
      ) : true;

      const matchDept = activeDept === 'All' ? true : job.department === activeDept;
      const matchLoc = activeLoc === 'All' ? true : job.location === activeLoc;

      return matchQuery && matchDept && matchLoc;
    });
  }, [searchQuery, activeDept, activeLoc, jobs]);

  return (
    <div className="py-[100px] bg-gray-50/50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-primary text-xs font-bold uppercase tracking-[3px] mb-2 block">
              {t('careers.explore_jobs', 'Current Openings')}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-secondary tracking-tight">
              {t('careers.available_positions', 'Available Job Vacancies')}
            </h2>
          </div>

          {/* Location Dropdown Filter */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-600 shrink-0">
              <MapPin size={16} className="inline text-primary mr-1" />
              {t('careers.filter_loc', 'Location:')}
            </span>
            <select
              value={activeLoc}
              onChange={(e) => setActiveLoc(e.target.value)}
              className="bg-white border border-gray-200 py-2.5 px-4 rounded-xl font-bold text-sm text-gray-800 shadow-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none cursor-pointer"
            >
              {locationsMap.map(locObj => (
                <option key={locObj.key} value={locObj.key}>
                  {isAmharic ? locObj.am : locObj.en}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Department Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {departmentsMap.map(deptObj => (
            <button
              key={deptObj.key}
              onClick={() => setActiveDept(deptObj.key)}
              className={`px-6 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all duration-300 shadow-sm flex items-center gap-2 ${
                activeDept === deptObj.key
                  ? 'bg-primary text-white shadow-primary/20 scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-100'
              }`}
            >
              <Briefcase size={16} />
              {isAmharic ? deptObj.am : deptObj.en}
            </button>
          ))}
        </div>

        {/* Job Cards */}
        <AnimatePresence mode="popLayout">
          {filteredJobs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 bg-white rounded-3xl border border-gray-100 text-center flex flex-col items-center justify-center shadow-sm"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                <Briefcase size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {t('careers.no_jobs', 'No Vacancies Found')}
              </h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto">
                {t('careers.no_jobs_desc', 'We currently do not have open positions matching your search filters. Please check back soon.')}
              </p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {filteredJobs.map((job, index) => {
                const title = isAmharic ? job.titleAm : job.title;
                const dept = isAmharic ? job.departmentAm : job.department;
                const loc = isAmharic ? job.locationAm : job.location;
                const type = isAmharic ? job.typeAm : job.type;
                const exp = isAmharic ? job.experienceAm : job.experience;
                const desc = isAmharic ? job.descAm : job.desc;
                const reqs = isAmharic ? job.reqsAm : job.reqs;

                return (
                  <motion.div
                    key={job.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 group"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                      {/* Left Side: Title & Badges */}
                      <div className="space-y-4 max-w-3xl">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                            {dept}
                          </span>
                          <span className="px-3.5 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                            {type}
                          </span>
                          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">
                            <Clock size={13} />
                            {exp}
                          </span>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-black text-secondary group-hover:text-primary transition-colors">
                          {title}
                        </h3>

                        <p className="text-gray-600 font-medium leading-relaxed">
                          {desc}
                        </p>

                        {/* Requirements */}
                        <div className="space-y-2 pt-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                            {t('careers.key_reqs', 'Key Qualifications:')}
                          </h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm font-medium text-gray-700">
                            {reqs.map((req, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Right Side: Location & Apply Button */}
                      <div className="flex flex-col lg:items-end justify-between shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100 gap-6">
                        <div className="space-y-2 text-left lg:text-right">
                          <div className="flex items-center lg:justify-end gap-1.5 font-bold text-gray-800 text-sm">
                            <MapPin size={16} className="text-primary shrink-0" />
                            <span>{loc}</span>
                          </div>
                          <div className="flex items-center lg:justify-end gap-1.5 text-xs text-gray-400">
                            <Calendar size={13} />
                            <span>{isAmharic ? 'የወጣበት ቀን: ' : 'Posted: '}{job.postedDate}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => onApplyClick(job)}
                          className="w-full lg:w-auto px-8 py-3.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 group/btn"
                        >
                          <span>{t('careers.apply_now', 'Apply Now')}</span>
                          <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JobList;
