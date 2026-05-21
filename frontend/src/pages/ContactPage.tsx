import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ContactHero from '../components/Contact/ContactHero';
import ContactInfo from '../components/Contact/ContactInfo';
import ContactForm from '../components/Contact/ContactForm';
import ContactMap from '../components/Contact/ContactMap';
import { api } from '../utils/api';

const ContactPage = () => {
  const { t } = useTranslation();
  const [cmsData, setCmsData] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    api.pages.get('contact')
      .then(data => {
        if (data && Object.keys(data).length > 0) {
          setCmsData(data);
        }
      })
      .catch(err => {
        console.warn('Using default contact content:', err);
      });
  }, []);

  return (
    <div className="bg-white">
      <ContactHero cmsData={cmsData} />
      
      <section className="py-[100px] relative">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-24">
            <ContactInfo cmsData={cmsData} />
            <ContactForm cmsData={cmsData} />
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


