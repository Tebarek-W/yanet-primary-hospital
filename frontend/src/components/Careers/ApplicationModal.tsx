import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, CheckCircle2, Loader2, FileText, User, Mail, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { type JobVacancy } from '../../data/careersData';

interface ApplicationModalProps {
  job: JobVacancy | null;
  onClose: () => void;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({ job, onClose }) => {
  const { t, i18n } = useTranslation();
  const isAmharic = i18n.language.startsWith('am');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  if (!job) return null;

  const jobTitle = isAmharic ? job.titleAm : job.title;
  const jobDept = isAmharic ? job.departmentAm : job.department;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert(t('careers.file_required', 'Please attach your resume/CV.'));
      return;
    }

    setIsSubmitting(true);
    setProgress(10);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 25;
      });
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', email: '', phone: '', coverLetter: '' });
        setFile(null);
        setProgress(0);
        onClose();
      }, 3500);
    }, 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1010] flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 my-8"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-secondary to-primary p-6 md:p-8 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider mb-2">
              {jobDept}
            </span>
            <h2 className="text-2xl md:text-3xl font-black mb-1">{jobTitle}</h2>
            <p className="text-white/80 text-sm font-medium">{t('careers.apply_subtitle', 'Submit your application to join our medical team')}</p>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center flex flex-col items-center"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-12 h-12 text-green-600 animate-bounce" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">
                  {t('careers.success_title', 'Application Submitted Successfully!')}
                </h3>
                <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed mb-6">
                  {t('careers.success_desc', 'Thank you for applying to Yanet Primary Hospital. Our Talent Acquisition team will review your qualifications and reach out for an interview.')}
                </p>
                <div className="p-4 bg-gray-50 rounded-2xl inline-flex items-center gap-3 border border-gray-100">
                  <FileText className="text-primary w-5 h-5" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-gray-800">{file?.name}</p>
                    <p className="text-[10px] text-gray-400">Uploaded Successfully</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      {t('careers.full_name', 'Full Name')} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <User className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary text-sm font-medium"
                        placeholder="Dr. Abebe Bekele"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      {t('careers.email', 'Email Address')} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Mail className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary text-sm font-medium"
                        placeholder="abebe@gmail.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {t('careers.phone', 'Phone Number')} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Phone className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary text-sm font-medium"
                      placeholder="+251 911 234 567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {t('careers.cover_letter', 'Cover Letter / Brief Statement')}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({...formData, coverLetter: e.target.value})}
                    className="block w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary text-sm font-medium resize-none"
                    placeholder={t('careers.cover_placeholder', 'Detail your clinical experience, specializations, and why you are interested in joining Yanet Hospital...')}
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {t('careers.resume', 'Resume / CV (PDF or DOCX)')} <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-200 hover:border-primary bg-gray-50/50 rounded-2xl p-6 text-center transition-colors relative">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Upload size={24} />
                      </div>
                      <p className="text-sm font-bold text-gray-800">
                        {file ? file.name : t('careers.drag_drop', 'Click or drag file to upload')}
                      </p>
                      <p className="text-xs text-gray-400 font-medium">
                        {file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : 'Max size: 10MB'}
                      </p>
                    </div>
                  </div>
                </div>

                {isSubmitting && (
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs font-bold text-gray-600">
                      <span>Uploading & Validating...</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="pt-4 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="w-1/3 py-3.5 border border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    {t('common.cancel', 'Cancel')}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !file}
                    className="w-2/3 py-3.5 bg-primary text-white font-bold rounded-2xl hover:bg-primary-hover shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {t('careers.processing', 'Processing...')}
                      </>
                    ) : (
                      t('careers.submit_app', 'Submit Application')
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

export default ApplicationModal;
