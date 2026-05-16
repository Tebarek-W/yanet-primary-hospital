import { motion } from 'framer-motion';

const ContactMap = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="w-full h-[500px] rounded-[40px] overflow-hidden shadow-2xl border-8 border-white relative"
    >
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15762.607421372863!2d38.7845!3d9.0117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d4a!2sBole%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1715848800000!5m2!1sen!2set" 
        width="100%" 
        height="100%" 
        style={{ border: 0 }} 
        allowFullScreen={true} 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        title="Yanet Primary Hospital Location"
        className="grayscale hover:grayscale-0 transition-all duration-1000"
      ></iframe>
      
      {/* Overlay for premium look */}
      <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/20 hidden md:block">
        <h4 className="text-secondary font-bold text-[18px] mb-2">Yanet Primary Hospital</h4>
        <p className="text-body text-[14px]">Bole Road, Addis Ababa</p>
        <p className="text-primary font-bold text-[13px] mt-2 underline cursor-pointer">Get Directions</p>
      </div>
    </motion.div>
  );
};

export default ContactMap;
