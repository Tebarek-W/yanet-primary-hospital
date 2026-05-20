import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, ChevronRight, ShieldCheck } from 'lucide-react';

interface PatientLoginProps {
  login: (email: string, name: string) => void;
}

export const PatientLogin: React.FC<PatientLoginProps> = ({ login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);

    setTimeout(() => {
      if (!email.trim()) {
        setLoginError('Please enter your registered email address.');
        setIsLoading(false);
        return;
      }
      login(email, 'Abebe Kebede');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F4F8FB] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans relative overflow-hidden">

      {/* === ADMIN-STYLE BACKGROUND === */}
      {/* Skewed navy banner – identical to AdminLogin */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-secondary/90 -skew-y-6 transform origin-top-left -translate-y-20 z-0" />
      {/* Dot-grid overlay on the right */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-10 z-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#ffffff 2px, transparent 2px)', backgroundSize: '30px 30px' }}
      />

      {/* === HEADER (sits on the dark section) === */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center font-black text-3xl text-primary shadow-2xl">
            Y
          </div>
        </div>
        <h2 className="text-center text-3xl font-extrabold text-white tracking-tight">
          Patient Portal
        </h2>

      </div>

      {/* === FORM CARD === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <div className="bg-white py-10 px-6 shadow-2xl sm:rounded-[2rem] sm:px-10 border border-gray-100">

          {loginError && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 flex items-start gap-3 border border-red-100">
              <span className="w-2 h-2 rounded-full bg-red-500 mt-1 shrink-0" />
              <p className="text-sm font-semibold text-red-600 leading-snug">{loginError}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLoginSubmit}>
            {/* Email */}
            <div>
              <label htmlFor="patient-email" className="block text-sm font-bold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="patient-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium text-gray-900 transition-all bg-gray-50 focus:bg-white"
                  placeholder="patient@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="patient-password" className="block text-sm font-bold text-gray-700">
                  Password
                </label>
                <a href="#forgot" className="text-sm font-bold text-primary hover:text-secondary transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="patient-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium text-gray-900 transition-all bg-gray-50 focus:bg-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 font-medium cursor-pointer">
                  Remember me
                </label>
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white transition-all ${isLoading
                    ? 'bg-primary/70 cursor-not-allowed'
                    : 'bg-primary hover:bg-secondary hover:shadow-lg hover:-translate-y-0.5'
                  }`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In to Portal
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Demo autofill */}
          <div className="mt-6 border-t border-gray-100 pt-5 text-center">
            <button
              type="button"
              onClick={() => {
                setEmail('patient@example.com');
                setPassword('password123');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary text-[10.5px] font-bold transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Auto-Fill Demo Credentials
            </button>
          </div>
        </div>

        <p className="text-center text-xs font-semibold text-gray-400 mt-8">
          Secure access for registered Yanet Primary Hospital patients only.
        </p>
      </motion.div>
    </div>
  );
};
