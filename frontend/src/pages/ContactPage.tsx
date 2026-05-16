import PageBanner from '../components/Layout/PageBanner';
import ContactInfo from '../components/Contact/ContactInfo';
import ContactForm from '../components/Contact/ContactForm';
import ContactMap from '../components/Contact/ContactMap';

const ContactPage = () => {
  return (
    <div className="bg-white">
      <PageBanner 
        title="Contact Us" 
        breadcrumbs={[{ label: "Contact Us" }]} 
      />
      
      <section className="py-[100px] relative">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-24">
            <ContactInfo />
            <ContactForm />
          </div>
          
          <div className="mt-20">
            <div className="section-title">
              <span>Find Us</span>
              <h2 className="text-secondary">Our Hospital Location</h2>
              <p>We are conveniently located in the heart of Addis Ababa, easily accessible from all parts of the city.</p>
            </div>
            <ContactMap />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
