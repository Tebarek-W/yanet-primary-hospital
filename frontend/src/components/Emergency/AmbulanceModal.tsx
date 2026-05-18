import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Phone, User, Loader2, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface AmbulanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AmbulanceModal: React.FC<AmbulanceModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: ''
  });

  const [isLocating, setIsLocating] = useState(false);

  const handleGetLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            location: `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`
          }));
          setIsLocating(false);
        },
        (error) => {
          console.error("Error getting location", error);
          alert(t('emergency.location_error', 'Unable to get your location. Please enter manually.'));
          setIsLocating(false);
        }
      );
    } else {
      alert(t('emergency.location_unsupported', 'Geolocation is not supported by your browser.'));
      setIsLocating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call for the frontend-only implementation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Auto close after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', phone: '', location: '' });
        onClose();
      }, 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1005] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="bg-red-600 p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <svg viewBox="0 0 24 24" className="w-32 h-32 fill-current">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
              </svg>
            </div>
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors z-10"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-2xl font-black mb-2 relative z-10 tracking-tight">
              {t('emergency.ambulance_title', 'Request Ambulance')}
            </h2>
            <p className="text-red-100 text-sm relative z-10 font-medium">
              {t('emergency.ambulance_desc', 'Fill out the form below and an ambulance will be dispatched to your location immediately.')}
            </p>
          </div>

          {/* Body */}
          <div className="p-6">
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 flex flex-col items-center justify-center text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {t('emergency.success_title', 'Ambulance Dispatched!')}
                </h3>
                <p className="text-gray-500 text-sm">
                  {t('emergency.success_desc', 'Our medical team is on the way. Please keep your phone nearby and stay calm.')}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">
                    {t('emergency.patient_name', 'Patient Name')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-sm font-medium"
                      placeholder="Enter full name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">
                    {t('emergency.callback_number', 'Callback Number')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-sm font-medium"
                      placeholder="+251 911 234 567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">
                    {t('emergency.location', 'Pickup Location')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-[120px] py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-sm font-medium"
                      placeholder="Address or coordinates"
                    />
                    <div className="absolute inset-y-0 right-1 flex items-center">
                      <button
                        type="button"
                        onClick={handleGetLocation}
                        disabled={isLocating}
                        className="h-[80%] px-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-bold transition-colors disabled:opacity-50 flex items-center gap-1.5"
                      >
                        {isLocating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <MapPin className="w-3.5 h-3.5" />}
                        {t('emergency.use_gps', 'Use GPS')}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.name || !formData.phone || !formData.location}
                    className="w-full bg-red-600 text-white font-bold py-3.5 rounded-xl hover:bg-red-700 focus:ring-4 focus:ring-red-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:active:scale-100 shadow-lg shadow-red-600/20"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {t('emergency.dispatching', 'Dispatching...')}
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                        </svg>
                        {t('emergency.submit', 'Request Ambulance Now')}
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AmbulanceModal;
