import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const ContactForm = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-white p-10 md:p-12 rounded-[30px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-50"
    >
      <div className="mb-10">
        <h2 className="text-[32px] font-bold text-secondary mb-4">Send Us a Message</h2>
        <p className="text-body text-[16px]">Have questions? Fill out the form below and our team will get back to you shortly.</p>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[14px] font-bold text-secondary uppercase tracking-wider ml-1">Full Name</label>
            <input 
              type="text" 
              placeholder="John Doe" 
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-[15px] focus:outline-none focus:border-primary focus:bg-white transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[14px] font-bold text-secondary uppercase tracking-wider ml-1">Email Address</label>
            <input 
              type="email" 
              placeholder="john@example.com" 
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-[15px] focus:outline-none focus:border-primary focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[14px] font-bold text-secondary uppercase tracking-wider ml-1">Phone Number</label>
            <input 
              type="text" 
              placeholder="+251 ..." 
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-[15px] focus:outline-none focus:border-primary focus:bg-white transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[14px] font-bold text-secondary uppercase tracking-wider ml-1">Subject</label>
            <select className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-[15px] focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none">
              <option>General Inquiry</option>
              <option>Appointment Request</option>
              <option>Feedback</option>
              <option>Medical Records</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[14px] font-bold text-secondary uppercase tracking-wider ml-1">Your Message</label>
          <textarea 
            rows={5} 
            placeholder="How can we help you?" 
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-[15px] focus:outline-none focus:border-primary focus:bg-white transition-all resize-none"
          ></textarea>
        </div>

        <button 
          type="submit"
          className="btn-primary w-full py-5 rounded-2xl flex items-center justify-center gap-3 text-[16px] shadow-xl shadow-primary/20"
        >
          Send Message
          <Send className="w-5 h-5" />
        </button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
