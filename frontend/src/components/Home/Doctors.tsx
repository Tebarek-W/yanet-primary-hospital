import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Doctors = () => {
  const doctors = [
    {
      name: "Dr. James Anderson",
      role: "Cardiologist",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
      delay: 0.1
    },
    {
      name: "Dr. Sarah Taylor",
      role: "Neurologist",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1974&auto=format&fit=crop",
      delay: 0.2
    },
    {
      name: "Dr. Robert Smith",
      role: "Surgeon",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop",
      delay: 0.3
    },
    {
      name: "Dr. Emily White",
      role: "Pediatrician",
      image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=2070&auto=format&fit=crop",
      delay: 0.4
    }
  ];

  const socialLinks = [
    { icon: <Facebook className="w-[18px] h-[18px]" />, color: "bg-[#3b5998]" },
    { icon: <Twitter className="w-[18px] h-[18px]" />, color: "bg-[#1da1f2]" },
    { icon: <Linkedin className="w-[18px] h-[18px]" />, color: "bg-[#0077b5]" },
    { icon: <Instagram className="w-[18px] h-[18px]" />, color: "bg-[#e1306c]" }
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="section-title">
          <span>Our Professional Doctors</span>
          <h2 className="text-secondary">Meet Our Qualified Doctors</h2>
          <p>
            Our doctors are experts in their respective fields, providing dedicated and professional healthcare.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px]">
          {doctors.map((doctor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: doctor.delay }}
              className="group"
            >
              <div className="relative rounded-[15px] overflow-hidden mb-[25px]">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Social Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="flex gap-[10px] transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                    {socialLinks.map((social, sIndex) => (
                      <a 
                        key={sIndex} 
                        href="#" 
                        className={`${social.color} text-white w-[40px] h-[40px] rounded-full flex items-center justify-center hover:scale-110 transition-transform`}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-secondary text-[22px] mb-[5px] group-hover:text-primary transition-colors">
                  {doctor.name}
                </h3>
                <span className="text-primary font-medium">{doctor.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Doctors;
