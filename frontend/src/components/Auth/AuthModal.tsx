import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Lock, Mail, User, Phone, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialTab = 'login' }) => {
  const { t } = useTranslation();
  const { login, signup } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic Validation
    if (activeTab === 'signup' && password !== confirmPassword) {
      setError(t('auth.error_match', 'Passwords do not match'));
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      setTimeout(() => {
        if (activeTab === 'login') {
          login(email, email.split('@')[0]);
        } else {
          signup(name, email, phone);
        }
        setIsSuccess(false);
        onClose();
        // Reset fields
        setEmail('');
        setPassword('');
        setName('');
        setPhone('');
        setConfirmPassword('');
      }, 1000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden transform transition-all duration-300 border border-gray-100">
        
        {/* Top Header Gradient */}
        <div className="bg-gradient-to-r from-primary to-secondary p-6 md:p-8 text-white relative shrink-0">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-2">
            {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
          </h3>
          <p className="text-white/80 text-xs md:text-sm mt-2">
            {activeTab === 'login' 
              ? 'Access your personalized Patient Portal dashboard.' 
              : 'Sign up to manage appointments and medical records online.'}
          </p>

          {/* Tabs */}
          <div className="flex bg-white/10 p-1.5 rounded-2xl mt-6 border border-white/15">
            <button
              onClick={() => { setActiveTab('login'); setError(''); }}
              className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'login' ? 'bg-white text-primary shadow-lg' : 'text-white hover:bg-white/5'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => { setActiveTab('signup'); setError(''); }}
              className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'signup' ? 'bg-white text-primary shadow-lg' : 'text-white hover:bg-white/5'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1">
          {isSuccess ? (
            <div className="text-center py-10 animate-fade-in">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-150 shadow-lg shadow-green-500/10">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h4 className="text-2xl font-extrabold text-gray-900 mb-2">
                {activeTab === 'login' ? 'Login Successful!' : 'Account Created!'}
              </h4>
              <p className="text-gray-500">Redirecting to your patient dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-xs font-semibold">
                  {error}
                </div>
              )}

              {activeTab === 'signup' && (
                <div>
                  <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 md:py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 md:py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {activeTab === 'signup' && (
                <div>
                  <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 md:py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm"
                      placeholder="+251 911 234 567"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 md:py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {activeTab === 'signup' && (
                <div>
                  <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 md:py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-extrabold py-3.5 md:py-4 rounded-2xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-[0.98] mt-4"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>{activeTab === 'login' ? 'Sign In' : 'Register Now'}</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
