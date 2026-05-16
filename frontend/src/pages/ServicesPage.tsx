import { motion } from 'framer-motion';
import { HeartPulse, Activity, Stethoscope, Brain, Baby, Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageBanner from '../components/Layout/PageBanner';

interface ServicesPageProps {
  onAppointmentClick: () => void;
}

const ServicesPage = ({ onAppointmentClick }: ServicesPageProps) => {
  const services = [
    {
      icon: <HeartPulse className="w-7 h-7" />,
      title: "Cardiology",
      desc: "Comprehensive heart care with modern diagnostic tools and experienced cardiologists.",
      num: "01",
      delay: 0.1
    },
    {
      icon: <Activity className="w-7 h-7" />,
      title: "Diagnostic",
      desc: "Advanced diagnostic services including X-ray, MRI, and full laboratory testing.",
      num: "02",
      delay: 0.15
    },
    {
      icon: <Stethoscope className="w-7 h-7" />,
      title: "Surgery",
      desc: "Expert surgical procedures with minimally invasive techniques and rapid recovery.",
      num: "03",
      delay: 0.2
    },
    {
      icon: <Brain className="w-7 h-7" />,
      title: "Neurology",
      desc: "Specialized care for neurological conditions including stroke and epilepsy.",
      num: "04",
      delay: 0.25
    },
    {
      icon: <Baby className="w-7 h-7" />,
      title: "Pediatrics",
      desc: "Dedicated care for children from birth through adolescence in a safe environment.",
      num: "05",
      delay: 0.3
    },
    {
      icon: <Eye className="w-7 h-7" />,
      title: "Ophthalmology",
      desc: "Complete eye care services including vision correction and eye diseases treatment.",
      num: "06",
      delay: 0.35
    }
  ];

  return (
    <>
      <PageBanner
        title="Our Services"
        breadcrumbs={[{ label: 'Services' }]}
      />

      {/* Services Grid Section */}
      <section className="pt-[80px] pb-[80px] bg-white relative overflow-hidden">
        <div className="container-custom relative z-10">
          {/* Section Header */}
          <div className="section-title">
            <span>What We Offer</span>
            <h2 className="text-secondary">Our Medical Services</h2>
            <p className="text-[15px] text-body">
              We provide a comprehensive range of healthcare services with the latest technology and compassionate care.
            </p>
          </div>

          {/* Services Grid — Corf Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: service.delay }}
                className="group relative bg-[#F8FAFB] rounded-[12px] p-[35px] text-center border border-transparent hover:border-primary/15 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:bg-white overflow-hidden"
              >
                {/* Background Number */}
                <span className="absolute top-[15px] right-[20px] text-[60px] font-extrabold text-gray-100 leading-none select-none pointer-events-none group-hover:text-primary/[0.07] transition-colors duration-500">
                  {service.num}
                </span>

                {/* Bottom accent bar — appears on hover */}
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-[65px] h-[65px] bg-white rounded-full flex items-center justify-center text-primary mx-auto mb-[22px] shadow-[0_4px_15px_rgba(0,184,184,0.12)] group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:shadow-[0_8px_25px_rgba(0,184,184,0.3)]">
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-secondary text-[18px] font-bold mb-[10px] group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-body text-[13px] leading-[1.75] mb-[18px]">
                    {service.desc}
                  </p>

                  {/* Read More Link */}
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-secondary/70 group-hover:text-primary transition-all duration-300"
                  >
                    Read More
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-[80px] bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#00B8B8 1px, transparent 1px)', backgroundSize: '25px 25px' }}></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3"></div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-[700px] mx-auto"
          >
            <span className="text-primary font-bold uppercase tracking-[3px] text-[12px] mb-4 block">Need Assistance?</span>
            <h2 className="text-white text-[28px] md:text-[38px] leading-tight mb-6">
              Ready To Get Started? <span className="text-primary italic">Book An Appointment</span>
            </h2>
            <p className="text-white/50 text-[15px] mb-8 leading-relaxed">
              Our team of specialists is ready to provide you with the best medical care. Schedule your consultation today and take the first step towards better health.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button 
                onClick={onAppointmentClick}
                className="btn-primary shadow-xl shadow-primary/20"
              >
                Book Appointment
              </button>
              <Link to="/contact" className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-[8px] font-semibold transition-all border border-white/10 backdrop-blur-md text-[15px]">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
