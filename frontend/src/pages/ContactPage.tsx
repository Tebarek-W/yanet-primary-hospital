import { useTranslation } from 'react-i18next';
import PageBanner from '../components/Layout/PageBanner';
import ContactInfo from '../components/Contact/ContactInfo';
import ContactForm from '../components/Contact/ContactForm';
import ContactMap from '../components/Contact/ContactMap';

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white">
      <PageBanner 
        title={t('contact_page.title')} 
        breadcrumbs={[{ label: t('contact_page.title') }]} 
      />
      
      <section className="py-[100px] relative">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-24">
            <ContactInfo />
            <ContactForm />
          </div>
          
          <div className="mt-20">
            <div className="section-title">
              <span>{t('contact_page.find_us')}</span>
              <h2 className="text-secondary">{t('contact_page.location_title')}</h2>
              <p>{t('contact_page.location_desc')}</p>
            </div>
            <ContactMap />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

