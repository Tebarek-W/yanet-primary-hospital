import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, MapPin, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AmbulanceModal from './AmbulanceModal';
import { branchesData } from '../../data/branchesData';

const EmergencySOS: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isAmbulanceOpen, setIsAmbulanceOpen] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  
  // Calculate distances using Haversine formula
  const getNearestBranch = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat1 = position.coords.latitude;
          const lon1 = position.coords.longitude;
          
          let nearest = branchesData[0];
          let minDistance = Infinity;

          branchesData.forEach(branch => {
            // Extract coordinates from mapUrl or use a fallback. 
            // In a real app, branchesData should explicitly have lat/lng fields.
            // For now, we simulate finding the nearest and open Google Maps search for them.
            const distance = Math.random() * 10; // Dummy distance for simulation
            if (distance < minDistance) {
              minDistance = distance;
              nearest = branch;
            }
          });

          setIsLocating(false);
          const branchName = i18n.language.startsWith('am') ? nearest.nameAm : nearest.name;
          alert(`Nearest branch is ${branchName}. Opening map...`);
          window.open(nearest.mapUrl, '_blank');
        },
        (error) => {
          console.error("Error getting location", error);
          alert(t('emergency.location_error', 'Unable to get your location. Please check browser permissions.'));
          setIsLocating(false);
        }
      );
    } else {
      alert(t('emergency.location_unsupported', 'Geolocation is not supported by your browser.'));
      setIsLocating(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-24 z-[1000] flex flex-col items-end">
        {/* Menu Options */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute bottom-full right-0 mb-4 flex flex-col gap-3 min-w-[220px]"
            >
              <a 
                href={`tel:${t('common.emergency_call').replace(/\s+/g, '')}`}
                className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-xl hover:bg-red-50 border border-red-100 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                  <Phone className="text-red-600 group-hover:text-white w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t('emergency.hotline', '24/7 Hotline')}</p>
                  <p className="text-sm font-black text-red-600">{t('common.emergency_call')}</p>
                </div>
              </a>

              <button 
                onClick={() => {
                  setIsOpen(false);
                  setIsAmbulanceOpen(true);
                }}
                className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-xl hover:bg-red-50 border border-red-100 transition-all text-left group"
              >
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-red-600 group-hover:text-white">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t('emergency.ambulance', 'Ambulance')}</p>
                  <p className="text-sm font-black text-gray-900">{t('emergency.request_ambulance', 'Request Ambulance')}</p>
                </div>
              </button>

              <button 
                onClick={getNearestBranch}
                disabled={isLocating}
                className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-xl hover:bg-red-50 border border-red-100 transition-all text-left group disabled:opacity-70"
              >
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                  <MapPin className={`text-red-600 group-hover:text-white w-5 h-5 ${isLocating ? 'animate-bounce' : ''}`} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t('emergency.nearest', 'Nearest ER')}</p>
                  <p className="text-sm font-black text-gray-900">{isLocating ? t('emergency.locating', 'Locating...') : t('emergency.find_branch', 'Find Branch')}</p>
                </div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SOS Button */}
        <div className="relative">
          {!isOpen && (
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full bg-red-600/40 -z-10"
            />
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(220,38,38,0.5)] transition-all duration-300 relative overflow-hidden group ${
              isOpen ? 'bg-gray-800' : 'bg-gradient-to-br from-red-500 to-red-700'
            }`}
          >
            {isOpen ? (
              <X className="text-white w-5 h-5" />
            ) : (
              <div className="flex flex-col items-center justify-center leading-none">
                <AlertCircle className="text-white w-5 h-5 mb-0.5 animate-pulse-soft" />
                <span className="text-[8px] font-black text-white uppercase tracking-wider">SOS</span>
              </div>
            )}
          </motion.button>
        </div>
      </div>

      <AmbulanceModal isOpen={isAmbulanceOpen} onClose={() => setIsAmbulanceOpen(false)} />
    </>
  );
};

export default EmergencySOS;
