import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, Eye, EyeOff, Check, HeartPulse } from 'lucide-react';

interface StaffLoginProps {
  onLogin: (email: string, name: string, role: string, avatar: string) => void;
}

export const StaffLogin: React.FC<StaffLoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const presets = [
    {
      name: 'Dr. Tebarek Liyana',
      email: 'dr.tebarek@yanethospital.com',
      role: 'Chief Cardiologist',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200',
    },
    {
      name: 'Dr. Birhanu Mengiste',
      email: 'dr.birhanu@yanethospital.com',
      role: 'General Surgeon',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200',
    }
  ];

  const handlePresetSelect = (preset: typeof presets[0]) => {
    setEmail(preset.email);
    setPassword('yanetpass123');
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all clinical credentials.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:5002/api/auth/staff-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Invalid staff credentials.');
        setIsLoading(false);
        return;
      }

      // Store token and call onLogin
      localStorage.setItem('yanet_staff_token', data.token);
      localStorage.setItem('yanet_staff_user', JSON.stringify(data.user));

      onLogin(data.user.email, data.user.name, data.user.role, data.user.avatar || 'https://images.unsplash.com/photo-1594824813573-246434e33963?auto=format&fit=crop&q=80&w=200');
    } catch (err) {
      setError('Connection to authentication server failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-secondary to-slate-950 px-4 py-12 relative overflow-hidden select-none">
      {/* Background Aesthetic Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[480px] bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 rounded-[24px] shadow-2xl relative z-10 text-left"
      >
        {/* Brand/Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-tr from-primary to-teal-400 rounded-2xl flex items-center justify-center text-white shadow-lg mb-4">
            <HeartPulse className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold font-poppins text-white tracking-tight">
            Yanet Staff<span className="text-primary">Portal</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider">
            Physician & Clinical Care Access
          </p>
        </div>

        {/* Action Error Banner */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold leading-relaxed"
          >
            {error}
          </motion.div>
        )}

        {/* Preset quick login badges */}
        <div className="mb-6">
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
            Quick-Login presets (Select one)
          </label>
          <div className="grid grid-cols-1 gap-2.5">
            {presets.map((preset) => {
              const isSelected = email === preset.email;
              return (
                <button
                  key={preset.email}
                  type="button"
                  onClick={() => handlePresetSelect(preset)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-primary/10 border-primary shadow-md'
                      : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={preset.avatar}
                      alt={preset.name}
                      className="w-9 h-9 rounded-full object-cover border border-slate-750"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{preset.name}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{preset.role}</p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative flex py-3 items-center">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink mx-4 text-slate-500 text-[10px] font-bold uppercase tracking-widest">Or enter credentials</span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4.5 mt-2">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Staff Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="physician@yanethospital.com"
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-11 pr-4 py-3.5 text-white text-xs font-semibold placeholder-slate-550 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Secure Key / Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-11 pr-11 py-3.5 text-white text-xs font-semibold placeholder-slate-550 focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-350 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary-hover text-white rounded-xl py-4 text-xs font-extrabold shadow-lg transition-colors flex items-center justify-center gap-2 mt-6 relative overflow-hidden"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Shield className="w-4 h-4" />
                <span>Verify Access Credentials</span>
              </>
            )}
          </button>
        </form>

        <p className="text-[10px] text-center text-slate-500 mt-6 leading-relaxed">
          Authorized personnel only. All access, operations, and consultations are secured under patient-data confidentiality standards.
        </p>
      </motion.div>
    </div>
  );
};
