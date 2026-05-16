import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DoctorCardProps {
  doctor: {
    id: string;
    name: string;
    role: string;
    image: string;
    desc: string;
  };
}


const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/doctors/${doctor.id}`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      onClick={handleCardClick}
      className="group bg-white rounded-[20px] p-8 text-center relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(0,184,184,0.15)] transition-all duration-500 border border-gray-100/50 flex flex-col h-full cursor-pointer"
    >
      {/* Premium Decorative Background Elements */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/10 transition-colors duration-500"></div>

      {/* Droplet Photo Style - Elevated */}
      <div className="relative mx-auto mb-8 w-[180px] h-[180px] shrink-0">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary to-primary/60 transition-transform duration-700 group-hover:rotate-[15deg] shadow-lg"
          style={{ borderRadius: '50% 50% 0 50%' }}
        ></div>
        <div className="absolute inset-2 overflow-hidden bg-white shadow-inner" style={{ borderRadius: '50% 50% 0 50%' }}>
          <img 
            src={doctor.image} 
            alt={doctor.name} 
            className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110"
          />
        </div>
        
        {/* Floating Action Icon */}
        <div className="absolute bottom-0 right-0 flex flex-col gap-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
           <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center shadow-xl hover:bg-primary transition-colors">
              <ArrowRight className="w-5 h-5" />
           </div>
        </div>
      </div>
      
      <div className="relative z-10 flex flex-col flex-grow text-center items-center">
        <h3 className="text-secondary text-[22px] font-bold mb-2 group-hover:text-primary transition-colors duration-300">
          {doctor.name}
        </h3>
        <p className="text-primary font-bold tracking-[1.5px] uppercase text-[11px] mb-4 bg-primary/5 inline-block px-4 py-1.5 rounded-full">
          {doctor.role}
        </p>
        <p className="text-[#5d666e] text-[14.5px] leading-relaxed mb-8 line-clamp-3">
          {doctor.desc}
        </p>

        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between w-full">
           {/* Social Icons - Stop propagation to prevent card click */}
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            {[Facebook, Twitter, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
          
          <div 
            className="text-primary font-bold text-[13px] flex items-center gap-1.5 group/link hover:text-secondary transition-colors"
          >
            VIEW DETAILS
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorCard;
