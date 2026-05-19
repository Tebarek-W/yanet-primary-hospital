import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Image as ImageIcon, Trash2, ArrowLeft, CheckCircle2, Type, Layout, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock schema data for different pages
const pageSchemas: Record<string, any> = {
  home: {
    title: 'Home Page',
    tabs: ['Hero Section', 'Quick Actions', 'About Preview', 'Services Preview', 'Testimonials', 'Doctors Preview', 'News Preview', 'SEO'],
    fields: {
      'Hero Section': [
        { id: 'hero_title', label: 'Main Headline', type: 'text', value: 'Advanced Healthcare Made Personal' },
        { id: 'hero_subtitle', label: 'Sub Headline', type: 'textarea', value: 'Providing world-class medical care with compassion and excellence.' },
        { id: 'hero_bg_image', label: 'Background Image', type: 'image', value: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d' },
        { id: 'hero_cta_text', label: 'Primary Button Text', type: 'text', value: 'Book Appointment' },
        { id: 'hero_cta_link', label: 'Primary Button Link', type: 'text', value: '/appointment' },
      ],
      'Quick Actions': [
        { id: 'qa_emergency_title', label: 'Emergency Card Title', type: 'text', value: 'Emergency Cases' },
        { id: 'qa_emergency_desc', label: 'Emergency Description', type: 'textarea', value: 'We are available 24/7 for emergency medical services.' },
        { id: 'qa_emergency_phone', label: 'Emergency Phone', type: 'text', value: '8181' },
        { id: 'qa_hours_title', label: 'Working Hours Title', type: 'text', value: 'Opening Hours' },
        { id: 'qa_hours_desc', label: 'Working Hours Info', type: 'textarea', value: 'Open 24 hours every day, including holidays.' },
        { id: 'qa_booking_title', label: 'Booking Card Title', type: 'text', value: 'Book Appointment' },
        { id: 'qa_booking_desc', label: 'Booking Description', type: 'textarea', value: 'Easily schedule your visit online.' },
      ],
      'About Preview': [
        { id: 'about_preview_title', label: 'Section Title', type: 'text', value: 'About Yanet Hospital' },
        { id: 'about_preview_desc', label: 'Short Description', type: 'textarea', value: 'Yanet Primary Hospital is a state-of-the-art facility...' },
        { id: 'about_preview_image', label: 'Preview Image', type: 'image', value: 'https://images.unsplash.com/photo-1538108149393-cebb60368140' },
        { id: 'stat_1_value', label: 'Stat 1 Value', type: 'text', value: '50+' },
        { id: 'stat_1_label', label: 'Stat 1 Label', type: 'text', value: 'Specialist Doctors' },
        { id: 'stat_2_value', label: 'Stat 2 Value', type: 'text', value: '10k+' },
        { id: 'stat_2_label', label: 'Stat 2 Label', type: 'text', value: 'Happy Patients' },
      ],
      'Services Preview': [
        { id: 'srv_preview_title', label: 'Section Title', type: 'text', value: 'Our Medical Services' },
        { id: 'srv_preview_desc', label: 'Section Description', type: 'textarea', value: 'Comprehensive healthcare solutions for your family.' },
        { id: 'srv_max_items', label: 'Number of Services to Show', type: 'text', value: '6' },
      ],
      'Testimonials': [
        { id: 'testi_title', label: 'Section Title', type: 'text', value: 'Patient Stories' },
        { id: 'testi_subtitle', label: 'Section Subtitle', type: 'text', value: 'What our patients say about us' },
        { id: 'testi_data', label: 'Testimonials Data (JSON format)', type: 'textarea', value: '[\n  {\n    "name": "Sarah J.",\n    "role": "Mother & Business Owner",\n    "text": "The best hospital experience! The staff was incredibly caring.",\n    "stars": 5\n  }\n]' },
      ],
      'Doctors Preview': [
        { id: 'doc_preview_title', label: 'Section Title', type: 'text', value: 'Meet Our Specialists' },
        { id: 'doc_max_items', label: 'Number of Doctors to Show', type: 'text', value: '4' },
      ],
      'News Preview': [
        { id: 'news_preview_title', label: 'Section Title', type: 'text', value: 'Latest Health News' },
        { id: 'news_max_items', label: 'Number of Articles to Show', type: 'text', value: '3' },
      ],
      'SEO': [
        { id: 'meta_title', label: 'Meta Title', type: 'text', value: 'Yanet Primary Hospital - Home' },
        { id: 'meta_desc', label: 'Meta Description', type: 'textarea', value: 'Welcome to Yanet Primary Hospital. We provide world-class medical care.' },
      ]
    }
  },
  about: {
    title: 'About Us',
    tabs: ['Hero Section', 'Company Overview', 'Mission & Vision', 'Core Values', 'Timeline', 'Leadership', 'SEO'],
    fields: {
      'Hero Section': [
        { id: 'about_hero_title', label: 'Page Headline', type: 'text', value: 'About Yanet Hospital' },
        { id: 'about_hero_image', label: 'Hero Background Image', type: 'image', value: 'https://images.unsplash.com/photo-1516549655169-df83a0774514' },
      ],
      'Company Overview': [
        { id: 'overview_title', label: 'Overview Title', type: 'text', value: 'Who We Are' },
        { id: 'overview_content', label: 'Main Content', type: 'textarea', value: 'Yanet Primary Hospital was established with the vision of...' },
        { id: 'overview_image', label: 'Side Image', type: 'image', value: 'https://images.unsplash.com/photo-1538108149393-cebb60368140' },
      ],
      'Mission & Vision': [
        { id: 'mission_statement', label: 'Our Mission', type: 'textarea', value: 'To provide accessible, high-quality healthcare...' },
        { id: 'vision_statement', label: 'Our Vision', type: 'textarea', value: 'To be the leading hospital in Ethiopia...' },
      ],
      'Core Values': [
        { id: 'values_title', label: 'Section Title', type: 'text', value: 'Our Core Values' },
        { id: 'value_1_title', label: 'Value 1 Title', type: 'text', value: 'Compassion' },
        { id: 'value_1_desc', label: 'Value 1 Description', type: 'textarea', value: 'We treat every patient with empathy and respect.' },
        { id: 'value_2_title', label: 'Value 2 Title', type: 'text', value: 'Excellence' },
        { id: 'value_2_desc', label: 'Value 2 Description', type: 'textarea', value: 'We strive for the highest standards in medical care.' },
        { id: 'value_3_title', label: 'Value 3 Title', type: 'text', value: 'Integrity' },
        { id: 'value_3_desc', label: 'Value 3 Description', type: 'textarea', value: 'We maintain transparency and ethical practices.' },
      ],
      'Timeline': [
        { id: 'timeline_title', label: 'Section Title', type: 'text', value: 'Our History' },
        { id: 'timeline_json', label: 'Timeline Data (JSON format)', type: 'textarea', value: '[{"year":"2020", "event":"Hospital Founded"}]' }
      ],
      'Leadership': [
        { id: 'leadership_title', label: 'Section Title', type: 'text', value: 'Our Management Team' },
        { id: 'leadership_desc', label: 'Description', type: 'textarea', value: 'Guided by experienced medical professionals.' },
      ],
      'SEO': [
        { id: 'meta_title', label: 'Meta Title', type: 'text', value: 'About Us | Yanet Primary Hospital' },
        { id: 'meta_desc', label: 'Meta Description', type: 'textarea', value: 'Learn about the history, mission, and vision of Yanet Hospital.' },
      ]
    }
  },
  services: {
    title: 'Medical Services',
    tabs: ['Hero Section', 'Services Display', 'Pricing Info', 'FAQ', 'SEO'],
    fields: {
      'Hero Section': [
        { id: 'srv_hero_title', label: 'Page Headline', type: 'text', value: 'Our Medical Services' },
        { id: 'srv_hero_desc', label: 'Subtitle', type: 'textarea', value: 'Comprehensive healthcare for you and your family.' },
        { id: 'srv_hero_image', label: 'Hero Image', type: 'image', value: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d' },
      ],
      'Services Display': [
        { id: 'srv_grid_title', label: 'Grid Title', type: 'text', value: 'Departments & Specialties' },
        { id: 'srv_items_note', label: 'Note', type: 'info', value: 'Individual services are managed from the Services database module.' }
      ],
      'Pricing Info': [
        { id: 'pricing_title', label: 'Insurance & Pricing Title', type: 'text', value: 'Insurance Partners' },
        { id: 'pricing_desc', label: 'Insurance Description', type: 'textarea', value: 'We accept major health insurance providers.' },
      ],
      'FAQ': [
        { id: 'faq_title', label: 'FAQ Section Title', type: 'text', value: 'Frequently Asked Questions' },
        { id: 'faq_json', label: 'FAQs (JSON)', type: 'textarea', value: '[{"q":"How do I book?", "a":"Call us."}]' },
      ],
      'SEO': [
        { id: 'meta_title', label: 'Meta Title', type: 'text', value: 'Services | Yanet Primary Hospital' },
      ]
    }
  },
  branches: {
    title: 'Hospital Branches',
    tabs: ['Hero Section', 'Map Integration', 'Branch Listings', 'Regional Contact', 'SEO'],
    fields: {
      'Hero Section': [
        { id: 'br_title', label: 'Page Headline', type: 'text', value: 'Our Hospital Branches' },
        { id: 'br_desc', label: 'Subtitle', type: 'textarea', value: 'Find a Yanet hospital branch near you for accessible care.' },
        { id: 'br_hero_image', label: 'Hero Image', type: 'image', value: 'https://images.unsplash.com/photo-1516549655169-df83a0774514' },
      ],
      'Map Integration': [
        { id: 'map_api_key', label: 'Google Maps API Key', type: 'text', value: 'AIzaSy...' },
        { id: 'map_def_lat', label: 'Default Map Latitude', type: 'text', value: '8.9806' },
        { id: 'map_def_lng', label: 'Default Map Longitude', type: 'text', value: '38.7578' },
        { id: 'map_zoom', label: 'Default Zoom Level', type: 'text', value: '12' },
      ],
      'Branch Listings': [
        { id: 'br_list_title', label: 'Section Title', type: 'text', value: 'All Locations' },
        { id: 'br_list_note', label: 'Note', type: 'info', value: 'Branch data (addresses, hours, phones) is managed in the Branches database.' },
      ],
      'Regional Contact': [
        { id: 'reg_contact_title', label: 'Regional Support Title', type: 'text', value: 'Need help finding us?' },
        { id: 'reg_contact_phone', label: 'Support Hotline', type: 'text', value: '8181' },
      ],
      'SEO': [
        { id: 'meta_title', label: 'Meta Title', type: 'text', value: 'Locations & Branches | Yanet Hospital' },
      ]
    }
  },
  contact: {
    title: 'Contact Us',
    tabs: ['Hero Section', 'Contact Information', 'Contact Form', 'Working Hours', 'SEO'],
    fields: {
      'Hero Section': [
        { id: 'cont_title', label: 'Page Headline', type: 'text', value: 'Get in Touch' },
        { id: 'cont_sub', label: 'Subtitle', type: 'textarea', value: 'We are here to answer your questions and provide support.' },
        { id: 'cont_img', label: 'Hero Image', type: 'image', value: 'https://images.unsplash.com/photo-1516549655169-df83a0774514' },
      ],
      'Contact Information': [
        { id: 'email_general', label: 'General Inquiries Email', type: 'text', value: 'info@yanethospital.com' },
        { id: 'email_support', label: 'Patient Support Email', type: 'text', value: 'support@yanethospital.com' },
        { id: 'phone_main', label: 'Main Phone Number', type: 'text', value: '+251 11 123 4567' },
        { id: 'phone_emergency', label: 'Emergency Hotline', type: 'text', value: '8181' },
        { id: 'address_hq', label: 'Headquarters Address', type: 'textarea', value: 'Bole Road, Addis Ababa, Ethiopia' },
      ],
      'Contact Form': [
        { id: 'form_title', label: 'Form Section Title', type: 'text', value: 'Send us a Message' },
        { id: 'form_recipient', label: 'Form Submission Email Destination', type: 'text', value: 'inbox@yanethospital.com' },
        { id: 'form_success_msg', label: 'Success Message', type: 'text', value: 'Thank you! Your message has been sent.' },
      ],
      'Working Hours': [
        { id: 'hours_title', label: 'Section Title', type: 'text', value: 'Working Hours' },
        { id: 'hours_weekdays', label: 'Weekdays (Mon-Fri)', type: 'text', value: '24 Hours' },
        { id: 'hours_weekends', label: 'Weekends (Sat-Sun)', type: 'text', value: '24 Hours' },
        { id: 'hours_holidays', label: 'Holidays', type: 'text', value: 'Open for Emergencies' },
      ],
      'SEO': [
        { id: 'meta_title', label: 'Meta Title', type: 'text', value: 'Contact Us | Yanet Primary Hospital' },
      ]
    }
  },
  blog: {
    title: 'Blog & News',
    tabs: ['Hero Section', 'Featured Post', 'Categories', 'Pagination', 'SEO'],
    fields: {
      'Hero Section': [
        { id: 'blog_title', label: 'Page Headline', type: 'text', value: 'Health News & Articles' },
        { id: 'blog_desc', label: 'Subtitle', type: 'textarea', value: 'Stay updated with the latest health tips and hospital news.' },
        { id: 'blog_hero_img', label: 'Hero Image', type: 'image', value: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528' },
      ],
      'Featured Post': [
        { id: 'featured_enabled', label: 'Enable Featured Post Banner', type: 'text', value: 'true' },
        { id: 'featured_post_id', label: 'Featured Post ID (Optional)', type: 'text', value: '' },
      ],
      'Categories': [
        { id: 'categories_list', label: 'Active Categories (Comma separated)', type: 'textarea', value: 'Health Tips, Hospital News, Events, Research' },
      ],
      'Pagination': [
        { id: 'posts_per_page', label: 'Posts per page', type: 'text', value: '9' },
      ],
      'SEO': [
        { id: 'meta_title', label: 'Meta Title', type: 'text', value: 'Blog & News | Yanet Hospital' },
      ]
    }
  },
  doctors: {
    title: 'Doctors Directory',
    tabs: ['Hero Section', 'Directory Settings', 'Booking Integration', 'SEO'],
    fields: {
      'Hero Section': [
        { id: 'doc_title', label: 'Page Headline', type: 'text', value: 'Our Medical Specialists' },
        { id: 'doc_desc', label: 'Subtitle', type: 'textarea', value: 'Meet our dedicated team of expert doctors and specialists.' },
        { id: 'doc_hero_img', label: 'Hero Image', type: 'image', value: 'https://images.unsplash.com/photo-1551076805-e1869033e561' },
      ],
      'Directory Settings': [
        { id: 'doc_departments', label: 'Filter Departments (Comma separated)', type: 'textarea', value: 'Cardiology, Neurology, Pediatrics, Orthopedics' },
        { id: 'doc_sort_by', label: 'Default Sorting', type: 'text', value: 'Experience' },
      ],
      'Booking Integration': [
        { id: 'booking_enabled', label: 'Enable Direct Appointment Booking', type: 'text', value: 'true' },
        { id: 'booking_url', label: 'External Booking System URL (If applicable)', type: 'text', value: '' },
      ],
      'SEO': [
        { id: 'meta_title', label: 'Meta Title', type: 'text', value: 'Our Doctors | Yanet Primary Hospital' },
      ]
    }
  },
  'virtual-tour': {
    title: 'Virtual Tour',
    tabs: ['Hero Section', 'Tour Settings', 'Highlights', 'SEO'],
    fields: {
      'Hero Section': [
        { id: 'vt_title', label: 'Page Headline', type: 'text', value: 'Take a 360° Virtual Tour' },
        { id: 'vt_desc', label: 'Subtitle', type: 'textarea', value: 'Explore our state-of-the-art facilities from the comfort of your home.' },
      ],
      'Tour Settings': [
        { id: 'vt_embed_url', label: 'Matterport / 360 Tour Embed URL', type: 'text', value: 'https://my.matterport.com/show/?m=xxx' },
        { id: 'vt_autoplay', label: 'Autoplay Tour', type: 'text', value: 'false' },
      ],
      'Highlights': [
        { id: 'vt_highlights_title', label: 'Highlights Section Title', type: 'text', value: 'Key Areas to Explore' },
        { id: 'vt_areas', label: 'Highlighted Areas (JSON)', type: 'textarea', value: '[{"name":"ICU", "time":"0:45"}]' },
      ],
      'SEO': [
        { id: 'meta_title', label: 'Meta Title', type: 'text', value: 'Virtual Tour | Yanet Primary Hospital' },
      ]
    }
  },
  careers: {
    title: 'Careers',
    tabs: ['Hero Section', 'Why Join Us', 'Current Openings', 'Application Form', 'SEO'],
    fields: {
      'Hero Section': [
        { id: 'car_title', label: 'Page Headline', type: 'text', value: 'Join Our Medical Team' },
        { id: 'car_desc', label: 'Subtitle', type: 'textarea', value: 'Build a rewarding career at Yanet Primary Hospital.' },
        { id: 'car_hero_img', label: 'Hero Image', type: 'image', value: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118' },
      ],
      'Why Join Us': [
        { id: 'ben_title', label: 'Section Title', type: 'text', value: 'Why Work With Us?' },
        { id: 'ben_1', label: 'Benefit 1 Headline', type: 'text', value: 'Competitive Salary' },
        { id: 'ben_1_desc', label: 'Benefit 1 Description', type: 'textarea', value: 'We offer industry-leading compensation packages.' },
        { id: 'ben_2', label: 'Benefit 2 Headline', type: 'text', value: 'Health Insurance' },
        { id: 'ben_2_desc', label: 'Benefit 2 Description', type: 'textarea', value: 'Comprehensive health coverage for you and your family.' },
        { id: 'ben_3', label: 'Benefit 3 Headline', type: 'text', value: 'Continuous Training' },
        { id: 'ben_3_desc', label: 'Benefit 3 Description', type: 'textarea', value: 'Regular workshops and professional development opportunities.' },
      ],
      'Current Openings': [
        { id: 'jobs_title', label: 'Section Title', type: 'text', value: 'Open Positions' },
        { id: 'jobs_note', label: 'Note', type: 'info', value: 'Job listings are managed through the Careers database module.' },
      ],
      'Application Form': [
        { id: 'app_email', label: 'HR Receiving Email', type: 'text', value: 'hr@yanethospital.com' },
        { id: 'app_success_msg', label: 'Application Success Message', type: 'text', value: 'Your application has been received. We will contact you soon.' },
      ],
      'SEO': [
        { id: 'meta_title', label: 'Meta Title', type: 'text', value: 'Careers & Jobs | Yanet Primary Hospital' },
      ]
    }
  }
};

const AdminPageEditor: React.FC = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('');
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Load schema for current page
  const schema = pageId && pageSchemas[pageId] ? pageSchemas[pageId] : null;

  useEffect(() => {
    if (schema) {
      setActiveTab(schema.tabs[0]);
      
      // Initialize form data with schema defaults
      const initialData: Record<string, any> = {};
      Object.values(schema.fields).forEach((tabFields: any) => {
        tabFields.forEach((field: any) => {
          initialData[field.id] = field.value;
        });
      });
      
      // Fetch live data from backend to override defaults
      fetch(`http://localhost:5002/api/pages/${pageId}`)
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data) {
            setFormData({ ...initialData, ...data });
          } else {
            setFormData(initialData);
          }
        })
        .catch(err => {
          console.error("Failed to fetch page data from API", err);
          setFormData(initialData);
        });
    }
  }, [pageId, schema]);

  if (!schema) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-2xl font-bold text-gray-400">Page schema not found</h2>
        <button onClick={() => navigate('/admin')} className="mt-4 text-primary font-bold">Go back to Dashboard</button>
      </div>
    );
  }

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`http://localhost:5002/api/pages/${pageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        alert("Failed to save changes to the database.");
      }
    } catch (err) {
      console.error(err);
      alert("Error communicating with the CMS server.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="space-y-6 max-w-5xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin')}
            className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
              Editing: <span className="text-primary">{schema.title}</span>
            </h2>
            <p className="text-sm text-gray-500 mt-1">Make changes to the content and layout of this page.</p>
          </div>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="btn-primary !px-6 flex items-center gap-2 disabled:opacity-70 w-full sm:w-auto justify-center"
        >
          {isSaving ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isSaving ? 'Saving...' : 'Publish Changes'}
        </button>
      </div>

      {isSuccess && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-2xl flex items-center gap-3 font-bold"
        >
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          Page changes published successfully!
        </motion.div>
      )}

      {/* Editor Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Tabs Sidebar */}
        <div className="lg:w-64 shrink-0">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-2 lg:sticky lg:top-24">
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible custom-scrollbar pb-2 lg:pb-0">
              {schema.tabs.map((tab: string) => {
                let Icon = Type;
                if (tab === 'SEO') Icon = Settings;
                if (tab.includes('Image') || tab.includes('Media')) Icon = ImageIcon;

                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all text-left whitespace-nowrap shrink-0 lg:w-full ${
                      activeTab === tab 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4.5 h-4.5 shrink-0" />
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Editor Form Area */}
        <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 min-h-[500px]">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 pb-4 border-b border-gray-100">
            <Layout className="w-5 h-5 text-gray-400" />
            {activeTab} Settings
          </h3>

          <div className="space-y-6">
            {schema.fields[activeTab]?.map((field: any) => (
              <div key={field.id} className="space-y-2">
                <label className="block text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                  {field.label}
                </label>
                
                {field.type === 'text' && (
                  <input
                    type="text"
                    value={formData[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm"
                  />
                )}

                {field.type === 'textarea' && (
                  <textarea
                    rows={4}
                    value={formData[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm resize-none custom-scrollbar"
                  />
                )}

                {field.type === 'image' && (
                  <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 bg-gray-50 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors cursor-pointer group">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                      <ImageIcon className="w-8 h-8 text-gray-400 group-hover:text-primary transition-colors" />
                    </div>
                    <p className="font-bold text-gray-700">Click to upload new image</p>
                    <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                    
                    {formData[field.id] && (
                      <div className="mt-4 relative rounded-xl overflow-hidden border border-gray-200">
                        <img src={formData[field.id]} alt="Preview" className="w-full max-w-sm h-32 object-cover" />
                        <div className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 className="w-4 h-4" />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {field.type === 'info' && (
                  <div className="bg-blue-50 border border-blue-100 text-blue-700 px-6 py-4 rounded-2xl font-medium text-sm">
                    {field.value}
                  </div>
                )}
              </div>
            ))}

            {schema.fields[activeTab]?.length === 0 && (
              <p className="text-gray-400 text-center py-12 font-medium">No configurable fields in this section.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminPageEditor;
