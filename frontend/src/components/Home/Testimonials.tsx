import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TestimonialsProps {
  cmsData?: Record<string, any> | null;
}

const Testimonials = ({ cmsData }: TestimonialsProps) => {
  const { t } = useTranslation();
  const isAmharic = t('nav.home') === 'መነሻ';

  const defaultTestimonials = [
    {
      name: isAmharic ? "ሳራ ጄ." : "Sarah J.",
      role: isAmharic ? "እናት እና የንግድ ባለቤት" : "Mother & Business Owner",
      text: isAmharic 
        ? "ምርጥ የሆስፒታል ተሞክሮ! ሰራተኞቹ በሚያስደንቅ ሁኔታ ተንከባካቢዎች እና ባለሙያዎች ነበሩ።" 
        : "The best hospital experience! The staff was incredibly caring, attentive, and professional throughout my stay.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
      stars: 5
    },
    {
      name: isAmharic ? "ሚካኤል አር." : "Michael R.",
      role: isAmharic ? "የሶፍትዌር መሃንዲስ" : "Software Engineer",
      text: isAmharic 
        ? "እጅግ የላቁ የህክምና መሳሪያዎች እና በጣም ንጹህ አካባቢ። በምርመራው ጥራት በጣም ተደስቻለሁ።" 
        : "Highly advanced medical equipment and a pristine, sterile environment. The diagnostic process was swift and precise.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
      stars: 5
    },
    {
      name: isAmharic ? "ሮበርት ዊልሰን" : "Robert Wilson",
      role: isAmharic ? "ጡረተኛ" : "Retired Teacher",
      text: isAmharic 
        ? "የ24 ሰዓት አገልግሎት ህይወት አዳኝ ነው። በምሽት ድንገተኛ አደጋ አጋጥሞኝ ቡድኑ ወዲያውኑ ለመርዳት ዝግጁ ነበር።" 
        : "The 24/7 service is a genuine lifesaver. I had a cardiac emergency at night and the responsive trauma team saved me.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
      stars: 5
    },
    {
      name: isAmharic ? "ሄለን ታደሰ" : "Helen Tadesse",
      role: isAmharic ? "የሁለት ልጆች እናት" : "Mother of Two",
      text: isAmharic 
        ? "የህፃናት ህክምና ቡድኑ ከልጆቼ ጋር በጣም ተግባቢ እና ታጋሽ ነበር። ለሁሉም ወላጆች በጣም እመክራለሁ!" 
        : "The pediatric care unit is amazing! They were so friendly, gentle, and patient with my children. Highly recommended!",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
      stars: 5
    },
    {
      name: isAmharic ? "አብዲ ከበደ" : "Abdi Kebede",
      role: isAmharic ? "አትሌት" : "Professional Athlete",
      text: isAmharic 
        ? "የማገገሚያ እና ፊዚዮቴራፒ ቡድኑ በጣም ጥሩ ነው። ከጉዳት በኋላ በፍጥነት ወደ ውድድር እንድመለስ ረድተውኛል።" 
        : "The physiotherapy and physical rehabilitation team here is top-notch. They helped me recover from a major knee injury quickly.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop",
      stars: 5
    }
  ];

  const showCmsTitle = cmsData?.testi_title && cmsData.testi_title !== "Patient Stories";
  const showCmsSubtitle = cmsData?.testi_subtitle && cmsData.testi_subtitle !== "What our patients say about us";

  let testimonials = defaultTestimonials;
  if (cmsData?.testi_data) {
    try {
      const parsed = JSON.parse(cmsData.testi_data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // check if it's the default seed (1 or 2 items) to preserve the fully populated 3D rotating planet layout
        const isSeed = parsed.length <= 2 || (
          parsed.length === 2 && 
          parsed[0].name === "Sarah J." && 
          parsed[1].name === "Dr. Thomas B."
        );
        
        if (!isSeed) {
          testimonials = parsed.map((item: any, index: number) => ({
            name: item.name || `User ${index + 1}`,
            role: item.role || 'Patient',
            text: item.text || '',
            stars: item.stars || 5,
            image: item.image || `https://images.unsplash.com/photo-${index === 0 ? '1494790108377-be9c29b29330' : index === 1 ? '1507003211169-0a1dd7228f2d' : '1500648767791-00dcc994a43e'}?q=80&w=150&auto=format&fit=crop`
          }));
        }
      }
    } catch (e) {
      console.warn("Failed to parse testimonials data from CMS:", e);
    }
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const [orbitRotation, setOrbitRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [radius, setRadius] = useState(160);

  // Handle responsive orbit radius calculations
  useEffect(() => {
    const handleResize = () => {
      setRadius(window.innerWidth < 768 ? 120 : 160);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Continuous slow rotation of the orbit path
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setOrbitRotation(prev => (prev + 0.15) % 360);
    }, 30); // smooth tick rate

    return () => clearInterval(interval);
  }, [isPaused]);

  // Periodic active testimonial cycles when not hovered
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonials.length);
    }, 6000); // switch active testimonial every 6s

    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  return (
    <section className="py-[100px] bg-slate-50/50 overflow-hidden relative">
      {/* Background soft teal glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="container-custom relative z-10">
        <div className="section-title text-center max-w-[700px] mx-auto mb-[60px]">
          <span className="text-primary font-bold uppercase tracking-[3px] text-[13px]">{t('testimonials.badge')}</span>
          <h2 className="text-secondary text-[30px] md:text-[42px] font-extrabold leading-tight mt-2">
            {showCmsTitle ? cmsData.testi_title : t('testimonials.title')}
          </h2>
          <p className="text-body text-[16px] mt-4 leading-relaxed">
            {showCmsSubtitle ? cmsData.testi_subtitle : t('testimonials.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[50px] lg:gap-[80px] items-center">
          {/* Left Column: Rotating Patient Testimonial Solar System */}
          <div className="lg:col-span-6 flex justify-center items-center relative h-[380px] md:h-[450px]">
            
            {/* Dotted circular orbit paths */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Outer Orbit Ring */}
              <div 
                style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}
                className="border-2 border-dashed border-primary/20 rounded-full absolute transition-all duration-300"
              ></div>
              {/* Inner Orbit Ring */}
              <div 
                style={{ width: `${radius * 1.25}px`, height: `${radius * 1.25}px` }}
                className="border border-dashed border-primary/10 rounded-full absolute transition-all duration-300"
              ></div>
            </div>

            {/* Central glowing medical cross pulsing core */}
            <div className="w-[90px] h-[90px] md:w-[105px] md:h-[105px] rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center relative z-20 shadow-lg shadow-primary/5">
              <div className="w-[70px] h-[70px] md:w-[80px] md:h-[80px] rounded-full bg-primary/25 border border-primary/30 flex items-center justify-center animate-pulse-soft">
                <div className="w-[50px] h-[50px] md:w-[56px] md:h-[56px] rounded-full bg-primary flex items-center justify-center text-white shadow-md shadow-primary/30">
                  <Star className="w-5 h-5 fill-white text-white" />
                </div>
              </div>
            </div>

            {/* Rotating Patient Avatar Planets */}
            <div className="absolute inset-0 flex items-center justify-center">
              {testimonials.map((item, index) => {
                // Trigonometric layout using smooth state rotations
                const angle = (index * 2 * Math.PI) / testimonials.length + (orbitRotation * Math.PI) / 180;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const isActive = activeIndex === index;

                return (
                  <div
                    key={index}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                      zIndex: isActive ? 30 : 10
                    }}
                    onMouseEnter={() => {
                      setIsPaused(true);
                      setActiveIndex(index);
                    }}
                    onMouseLeave={() => {
                      setIsPaused(false);
                    }}
                    onClick={() => setActiveIndex(index)}
                    className="cursor-pointer"
                  >
                    <div className="relative group/avatar">
                      {/* Ring indicator for active selection */}
                      {isActive && (
                        <span className="absolute -inset-2.5 rounded-full border border-primary bg-primary/10 animate-ping opacity-60"></span>
                      )}
                      
                      {/* Glowing Avatar Border */}
                      <div className={`w-[55px] h-[55px] md:w-[65px] md:h-[65px] rounded-full p-[3px] transition-all duration-300 relative ${
                        isActive 
                          ? 'bg-primary shadow-[0_0_20px_rgba(0,184,184,0.4)] scale-110' 
                          : 'bg-white border border-gray-200 hover:border-primary/50 hover:scale-105 shadow-sm'
                      }`}>
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>

                      {/* Tooltip tooltip on hover */}
                      <span className={`absolute bottom-[-22px] left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-secondary text-white text-[9px] font-bold tracking-wider opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-md z-30 ${
                        isActive ? 'opacity-100 bg-primary' : ''
                      }`}>
                        {item.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Testimonial Presentation Card */}
          <div className="lg:col-span-6 flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 40, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -40, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-[35px] md:p-[45px] rounded-[24px] shadow-[0_20px_50px_rgba(0,184,184,0.06)] border border-primary/5 relative w-full max-w-[520px]"
              >
                {/* Decorative floating quote */}
                <div className="absolute top-[30px] right-[40px] text-primary/5 pointer-events-none">
                  <Quote className="w-[70px] h-[70px] fill-current" />
                </div>

                {/* Patient Stars */}
                <div className="flex gap-[4px] mb-[20px]">
                  {[...Array(testimonials[activeIndex].stars)].map((_, i) => (
                    <Star key={i} className="w-[18px] h-[18px] fill-primary text-primary" />
                  ))}
                </div>

                {/* Patient Feedback */}
                <p className="text-secondary font-medium italic text-[16px] md:text-[18px] leading-[1.8] mb-[28px] text-left">
                  "{testimonials[activeIndex].text}"
                </p>

                {/* Profile Details */}
                <div className="flex items-center gap-[15px] border-t border-gray-100 pt-[22px]">
                  <img 
                    src={testimonials[activeIndex].image} 
                    alt={testimonials[activeIndex].name} 
                    className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-full object-cover border-2 border-primary"
                  />
                  <div className="text-left">
                    <h4 className="text-secondary text-[18px] font-extrabold">{testimonials[activeIndex].name}</h4>
                    <span className="text-primary text-[14px] font-semibold">{testimonials[activeIndex].role}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
