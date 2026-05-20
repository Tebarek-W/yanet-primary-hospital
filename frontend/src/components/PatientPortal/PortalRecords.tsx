import React from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, FileDown, Microscope } from 'lucide-react';

interface LabResult {
  id: string;
  testName: string;
  date: string;
  doctor: string;
  value: string;
  range: string;
  status: 'Normal' | 'High' | 'Low';
}

interface PortalRecordsProps {
  labResults: LabResult[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  darkMode: boolean;
}

export const PortalRecords: React.FC<PortalRecordsProps> = ({
  labResults,
  searchQuery,
  setSearchQuery,
  darkMode
}) => {
  
  const filteredLabResults = labResults.filter(rec => 
    rec.testName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    rec.doctor.toLowerCase().includes(searchQuery.toLowerCase()) || 
    rec.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = (id: string, testName: string) => {
    alert(`Requesting PDF report #${id} for ${testName}. Download starting...`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`border rounded-2xl p-6 transition-all duration-300 text-left font-roboto ${
        darkMode 
          ? 'bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800 shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:border-slate-800' 
          : 'bg-gradient-to-br from-white to-slate-50/50 border-slate-200 shadow-[0_6px_25_rgba(0,0,0,0.015)]'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl shrink-0 ${
            darkMode ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-primary/10 text-primary border border-primary/20'
          }`}>
            <Microscope className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-[10px] font-bold uppercase tracking-wider font-poppins ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Medical Records & Laboratory Diagnostics
            </h3>
            <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5">
              Review validated laboratory screens, chemical profiles, and pathology reports ordered by your clinicians.
            </p>
          </div>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search test panel or doctor..."
            className={`w-full pl-9 pr-4 py-2 border rounded-xl outline-none transition-all duration-300 font-medium text-xs ${
              darkMode 
                ? 'bg-slate-950 border-slate-800 text-white focus:border-primary focus:ring-2 focus:ring-primary/20' 
                : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 shadow-sm'
            }`}
          />
        </div>
      </div>

      <div className={`overflow-x-auto rounded-xl border transition-all duration-300 ${
        darkMode ? 'border-slate-800 bg-slate-950/20' : 'border-slate-200 bg-white/40'
      }`}>
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className={`font-bold font-poppins uppercase tracking-wider border-b text-[9.5px] ${
              darkMode ? 'bg-slate-950/80 border-slate-800 text-slate-400' : 'bg-slate-50/80 border-slate-200 text-slate-500'
            }`}>
              <th className="p-4">Diagnostic Report</th>
              <th className="p-4">Authorized Date</th>
              <th className="p-4">Ordering Physician</th>
              <th className="p-4">Test Result</th>
              <th className="p-4">Reference Range</th>
              <th className="p-4">Clinical Status</th>
              <th className="p-4 text-right">Records</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${
            darkMode ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'
          }`}>
            {filteredLabResults.length > 0 ? (
              filteredLabResults.map((rec) => (
                <tr 
                  key={rec.id} 
                  className={`transition-all duration-200 font-medium ${
                    darkMode ? 'hover:bg-slate-900/40' : 'hover:bg-slate-50/60'
                  }`}
                >
                  <td className="p-4 font-bold flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className={darkMode ? 'text-white' : 'text-slate-800'}>{rec.testName}</span>
                  </td>
                  <td className="p-4 text-slate-400 font-normal">{rec.date}</td>
                  <td className="p-4 font-bold">{rec.doctor}</td>
                  <td className={`p-4 font-extrabold text-sm ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    {rec.value}
                  </td>
                  <td className="p-4 text-slate-400 font-normal">{rec.range}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider border ${
                      rec.status === 'Normal' 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100/50 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/20' 
                        : 'bg-red-50 text-red-500 border-red-100/50 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/20'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        rec.status === 'Normal'
                          ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]'
                          : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse'
                      }`} />
                      {rec.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleDownload(rec.id, rec.testName)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-lg transition-all duration-200 text-[9.5px] font-bold ${
                        darkMode 
                          ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white shadow-sm' 
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm'
                      }`}
                    >
                      <FileDown className="w-3.5 h-3.5" /> PDF
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-10 text-slate-400 font-normal">
                  No laboratory records match the search filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
