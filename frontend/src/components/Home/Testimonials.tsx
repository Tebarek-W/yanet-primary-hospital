import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Testimonials = () => {
  const { t } = useTranslation();
  const isAmharic = t('nav.home') === 'መነሻ';

  const testimonials = [
    {
      name: isAmharic ? "ሳራ ጄ." : "Sarah J.",
      role: isAmharic ? "ታካሚ" : "Patient",
      text: t('testimonials.list.t1.text'),
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
      delay: 0.1
    },
    {
      name: isAmharic ? "ሚካኤል አር." : "Michael R.",
      role: isAmharic ? "ታካሚ" : "Patient",
      text: t('testimonials.list.t2.text'),
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
      delay: 0.2
    },
    {
      name: isAmharic ? "ሮበርት ዊልሰን" : "Robert Wilson",
      role: isAmharic ? "ታካሚ" : "Patient",
      text: isAmharic ? "የ24 ሰዓት አገልግሎት ህይወት አዳኝ ነው። በምሽት ድንገተኛ አደጋ አጋጥሞኝ ቡድኑ ወዲያውኑ ለመርዳት ዝግጁ ነበር። ታላቅ ተሞክሮ።" : "The 24/7 service is a life saver. I had an emergency at night and the team was ready to help immediately. Great experience.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
      delay: 0.3
    }
  ];

  return (
    <section className="pt-[60px] pb-[60px] bg-light-bg">
      <div className="container-custom">
        <div className="section-title">
          <span>{t('testimonials.badge')}</span>
          <h2 className="text-secondary">{t('testimonials.title')}</h2>
          <p>
            {t('testimonials.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: item.delay }}
              className="bg-white p-[40px] rounded-[15px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] relative group"
            >
              <div className="absolute top-[30px] right-[40px] text-primary/10 group-hover:text-primary transition-colors duration-500">
                <Quote className="w-[60px] h-[60px]" />
              </div>
              
              <div className="flex gap-[5px] mb-[25px]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-[18px] h-[18px] fill-primary text-primary" />
                ))}
              </div>
              
              <p className="text-body italic mb-[30px] leading-[1.8] relative z-10">
                "{item.text}"
              </p>
              
              <div className="flex items-center gap-[20px]">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-[60px] h-[60px] rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <h4 className="text-secondary text-[18px] font-bold">{item.name}</h4>
                  <span className="text-primary text-[14px]">{item.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

