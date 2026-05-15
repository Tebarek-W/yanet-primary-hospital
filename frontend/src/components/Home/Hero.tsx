import { motion } from 'framer-motion';
import { Play, Calendar, ArrowRight, Heart, Stethoscope, Activity, Plus } from 'lucide-react';

const SolarSystem = () => {
  return (
    <>
      {/* Primary System */}
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] pointer-events-none z-0 will-change-transform">
        {/* Optimized Central Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[80px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[60px] animate-pulse"></div>
        
        {/* Orbit 1 - Heart */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ translateZ: 0 }}
          className="absolute inset-[0%] border border-primary/20 rounded-full border-dashed will-change-transform"
        >
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ translateZ: 0 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-pink-500 to-red-600 rounded-full flex items-center justify-center text-white shadow-[0_0_10px_rgba(236,72,153,0.4)] border border-white/20 will-change-transform"
          >
            <Heart className="w-4 h-4 fill-white" />
          </motion.div>
        </motion.div>

        {/* Orbit 2 - Stethoscope */}
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ translateZ: 0 }}
          className="absolute inset-[20%] border border-white/10 rounded-full will-change-transform"
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ translateZ: 0 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-10 h-10 bg-gradient-to-br from-primary to-cyan-400 rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(0,184,184,0.5)] border border-white/20 will-change-transform"
          >
            <Stethoscope className="w-5 h-5" />
          </motion.div>
        </motion.div>

        {/* Orbit 3 - Activity */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          style={{ translateZ: 0 }}
          className="absolute inset-[38%] border border-primary/10 rounded-full border-dashed will-change-transform"
        >
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            style={{ translateZ: 0 }}
            className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white shadow-[0_0_10px_rgba(251,191,36,0.4)] border border-white/20 will-change-transform"
          >
            <Activity className="w-3.5 h-3.5" />
          </motion.div>
        </motion.div>

        {/* Orbit 4 - Plus */}
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          style={{ translateZ: 0 }}
          className="absolute inset-[52%] border border-white/5 rounded-full will-change-transform"
        >
          <div className="absolute top-[20%] left-0 -translate-x-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_5px_rgba(0,184,184,0.6)]"></div>
          <div className="absolute bottom-[20%] right-0 translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_5px_rgba(34,211,238,0.6)]"></div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            style={{ translateZ: 0 }}
            className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-[0_0_8px_rgba(99,102,241,0.5)] border border-white/20 will-change-transform"
          >
            <Plus className="w-3 h-3" />
          </motion.div>
        </motion.div>
      </div>

      {/* Secondary System */}
      <div className="absolute top-[75%] left-[25%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none z-[-1] opacity-30 scale-75 blur-[40px] will-change-transform">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-secondary/30 rounded-full blur-[60px]"></div>
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          style={{ translateZ: 0 }}
          className="absolute inset-[0%] border border-white/10 rounded-full border-dashed will-change-transform"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-pink-500 rounded-full shadow-[0_0_8px_rgba(236,72,153,0.6)]"></div>
        </motion.div>
      </div>

      {/* Tertiary System */}
      <div className="absolute top-[20%] left-[80%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none z-[-1] opacity-20 scale-50 blur-[30px] will-change-transform">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-primary/10 rounded-full blur-[50px]"></div>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          style={{ translateZ: 0 }}
          className="absolute inset-[0%] border border-white/5 rounded-full border-dashed will-change-transform"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_5px_rgba(251,191,36,0.6)]"></div>
        </motion.div>
      </div>
    </>
  );
};

const Hero = () => {
  return (
    <section className="relative h-[700px] lg:h-[850px] flex items-start pt-[140px] lg:pt-[170px] overflow-hidden bg-secondary">
      {/* Dynamic Background with improved overlay */}
      <motion.div 
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent"></div>
      </motion.div>

      {/* Optimized Floating Orbs */}
      <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] animate-pulse-soft"></div>
      <div className="absolute bottom-[20%] right-[30%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] animate-pulse-soft"></div>

      <div className="container-custom relative z-10 pt-0 mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-[60px]">
          {/* Left Side: Content */}
          <div className="max-w-[700px]">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              className="flex items-center gap-4 mb-[25px]"
            >
              <div className="w-[3px] h-[25px] bg-primary"></div>
              <span className="text-white text-[15px] font-bold uppercase tracking-[4px]">
                Excellence in Healthcare
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, type: "spring", bounce: 0.4 }}
              className="text-white mb-[25px] leading-[1.1] font-extrabold tracking-tighter !text-[35px] md:!text-[50px] lg:!text-[60px]"
            >
              Providing Best <span className="gradient-text">Medical Care</span> For Your Family
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-[16px] md:text-[18px] mb-[40px] text-white/80 leading-[1.6] font-light max-w-[600px]"
            >
              Experience world-class healthcare with modern technology and expert specialists. We're dedicated to your health and well-being around the clock.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap items-center gap-[25px]"
            >
              <button className="btn-primary flex items-center gap-3 group">
                Find A Doctor
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
              
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-[60px] h-[60px] bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/20 group-hover:bg-primary transition-all duration-500">
                  <Play className="w-6 h-6 text-white fill-white" />
                </div>
                <span className="text-white font-bold tracking-wider group-hover:text-primary transition-colors">WATCH VIDEO</span>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Doctor Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.5, type: "spring" }}
            className="hidden lg:block relative mt-[60px]"
          >
            <SolarSystem />
            <div className="relative z-10 flex justify-end">
              <img 
                src="/doctor_new.png" 
                alt="Ethiopian Doctor" 
                className="w-auto h-auto max-h-none scale-[1.3] origin-bottom object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] animate-float relative z-10"
              />
            </div>
              
              {/* Floating Stat Card */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[20%] -left-[40px] bg-white/90 backdrop-blur-xl p-5 rounded-[20px] shadow-2xl z-20 flex items-center gap-4 border border-white"
              >
                <div className="w-[50px] h-[50px] bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-secondary text-[20px] font-bold">24/7</h4>
                  <p className="text-body text-[12px] font-bold uppercase">Online Help</p>
                </div>
              </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Modern Wave Separator */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[80px] fill-white">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113,2,1200,34.72V0Z" opacity=".5"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".25"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
