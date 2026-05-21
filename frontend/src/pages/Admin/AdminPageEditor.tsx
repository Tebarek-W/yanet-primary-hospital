import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Save, Image as ImageIcon, Trash2, ArrowLeft, CheckCircle2, Type, Layout, Settings,
  Users, Calendar, Search, Zap, Award, Info, BookOpen, MapPin, Phone, Clock, Briefcase, Heart, MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';
import AdminDoctorCrud from '../../components/Admin/AdminDoctorCrud';
import { API_BASE } from '../../utils/api';

// CMS schema data for all pages
const pageSchemas: Record<string, any> = {
  home: {
    title: 'Home Page',
    tabs: ['Hero Section', 'Quick Actions', 'About Preview', 'Stats Bar', 'Why Choose Us', 'Services Preview', 'Campaign Banner', 'Testimonials', 'Virtual Tour Widget', 'Doctors Preview', 'News Preview', 'SEO'],
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
      'Stats Bar': [
        { id: 'stats_patients_target', label: 'Patients Served (count-up target)', type: 'text', value: '124582' },
        { id: 'stats_doctors_target', label: 'Doctors & Staff (count-up target)', type: 'text', value: '184' },
        { id: 'stats_branches_target', label: 'Hospital Branches (count-up target)', type: 'text', value: '6' },
      ],
      'Why Choose Us': [
        { id: 'why_phone', label: 'Contact Phone Number', type: 'text', value: '+251 11 123 4567' },
        { id: 'why_address', label: 'Hospital Address', type: 'text', value: 'Bole Road, Addis Ababa, Ethiopia' },
        { id: 'why_hours', label: 'Opening Hours', type: 'text', value: 'Mon - Sun: 24 Hours' },
        { id: 'why_stat1_title', label: 'Stat Card 1 Title', type: 'text', value: '50+ Specialist Doctors' },
        { id: 'why_stat1_desc', label: 'Stat Card 1 Description', type: 'text', value: 'Board-certified specialists across all departments.' },
        { id: 'why_stat2_title', label: 'Stat Card 2 Title', type: 'text', value: 'Award Winning' },
        { id: 'why_stat2_desc', label: 'Stat Card 2 Description', type: 'text', value: 'Nationally recognized for clinical excellence.' },
        { id: 'why_stat3_title', label: 'Stat Card 3 Title', type: 'text', value: '24/7 Service' },
        { id: 'why_stat3_desc', label: 'Stat Card 3 Description', type: 'text', value: 'Round-the-clock emergency and outpatient care.' },
        { id: 'why_stat4_title', label: 'Stat Card 4 Title', type: 'text', value: 'Modern Technology' },
        { id: 'why_stat4_desc', label: 'Stat Card 4 Description', type: 'text', value: 'State-of-the-art diagnostic and surgical equipment.' },
      ],
      'Campaign Banner': [
        { id: 'campaign_1_badge', label: 'Slide 1 Badge Text', type: 'text', value: 'Flu Season Alert' },
        { id: 'campaign_1_title', label: 'Slide 1 Title', type: 'text', value: 'Protect Yourself This Flu Season' },
        { id: 'campaign_1_desc', label: 'Slide 1 Description', type: 'textarea', value: 'Get your annual flu vaccination at any Yanet branch. Walk-ins welcome.' },
        { id: 'campaign_1_cta', label: 'Slide 1 CTA Button Text', type: 'text', value: 'Book Vaccination' },
        { id: 'campaign_2_badge', label: 'Slide 2 Badge Text', type: 'text', value: 'Wellness Program' },
        { id: 'campaign_2_title', label: 'Slide 2 Title', type: 'text', value: 'Annual Wellness Checkup Package' },
        { id: 'campaign_2_desc', label: 'Slide 2 Description', type: 'textarea', value: 'Comprehensive health screening for adults. Early detection saves lives.' },
        { id: 'campaign_2_cta', label: 'Slide 2 CTA Button Text', type: 'text', value: 'Book Checkup' },
        { id: 'campaign_3_badge', label: 'Slide 3 Badge Text', type: 'text', value: 'Maternal Health' },
        { id: 'campaign_3_title', label: 'Slide 3 Title', type: 'text', value: 'Maternal & Newborn Care Program' },
        { id: 'campaign_3_desc', label: 'Slide 3 Description', type: 'textarea', value: 'Expert prenatal, delivery, and postnatal care for mothers and babies.' },
        { id: 'campaign_3_cta', label: 'Slide 3 CTA Button Text', type: 'text', value: 'Learn More' },
      ],
      'Virtual Tour Widget': [
        { id: 'vt_widget_image', label: 'Preview Thumbnail Image URL', type: 'image', value: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=1200&q=80' },
        { id: 'vt_widget_title', label: 'Section Title', type: 'text', value: 'Explore Yanet Virtually' },
        { id: 'vt_widget_desc', label: 'Section Description', type: 'textarea', value: 'Take an immersive 360° walk through our modern wards, operating theatres, labs, and patient lounges.' },
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
    tabs: ['Hero Section', 'Company Overview', 'Mission & Vision', 'Core Values', 'Counter Stats', 'Timeline', 'Leadership', 'Medical Camp', 'Certifications', 'Partnerships', 'SEO'],
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
      'Counter Stats': [
        { id: 'counter_doctors_target', label: 'Doctors & Staff Count', type: 'text', value: '540' },
        { id: 'counter_success_target', label: 'Successful Procedures Count', type: 'text', value: '990' },
        { id: 'counter_presence_target', label: 'Community Presence Count', type: 'text', value: '3500' },
        { id: 'counter_experience_target', label: 'Years of Experience Count', type: 'text', value: '6' },
      ],
      'Timeline': [
        { id: 'timeline_title', label: 'Section Badge Text', type: 'text', value: 'Our History' },
        { id: 'timeline_json', label: 'Timeline Milestones (JSON — array of {year, event})', type: 'textarea', value: '[{"year":"2020","event":"Hospital Founded"},{"year":"2021","event":"Expanded to 3 branches"},{"year":"2022","event":"Launched ICU & Cardiology"},{"year":"2023","event":"International Partnerships"},{"year":"2024","event":"Digital Health Platform"},{"year":"2025","event":"National Excellence Award"}]' },
      ],
      'Leadership': [
        { id: 'leadership_title', label: 'Section Title', type: 'text', value: 'Our Management Team' },
        { id: 'leadership_desc', label: 'Section Description', type: 'textarea', value: 'Guided by experienced medical professionals.' },
        { id: 'leader_1_name', label: 'Leader 1 Name', type: 'text', value: 'Dr. Tebarek Liyana' },
        { id: 'leader_1_role', label: 'Leader 1 Role', type: 'text', value: 'Chief Executive Officer' },
        { id: 'leader_1_bio', label: 'Leader 1 Bio', type: 'textarea', value: 'Visionary leader with 15+ years in healthcare management.' },
        { id: 'leader_1_image', label: 'Leader 1 Photo URL', type: 'image', value: '/doctor_new.png' },
        { id: 'leader_1_email', label: 'Leader 1 Email', type: 'text', value: 'tebarek@yanethospital.com' },
        { id: 'leader_2_name', label: 'Leader 2 Name', type: 'text', value: 'Dr. Birhanu Mengiste' },
        { id: 'leader_2_role', label: 'Leader 2 Role', type: 'text', value: 'Medical Director' },
        { id: 'leader_2_bio', label: 'Leader 2 Bio', type: 'textarea', value: 'Senior physician specializing in internal medicine and hospital operations.' },
        { id: 'leader_2_image', label: 'Leader 2 Photo URL', type: 'image', value: '/doctors/doctor1.png' },
        { id: 'leader_2_email', label: 'Leader 2 Email', type: 'text', value: 'birhanu@yanethospital.com' },
        { id: 'leader_3_name', label: 'Leader 3 Name', type: 'text', value: 'Sister Tigist Hailu' },
        { id: 'leader_3_role', label: 'Leader 3 Role', type: 'text', value: 'Chief Nursing Officer' },
        { id: 'leader_3_bio', label: 'Leader 3 Bio', type: 'textarea', value: 'Dedicated nursing leader with expertise in patient care standards.' },
        { id: 'leader_3_image', label: 'Leader 3 Photo URL', type: 'image', value: '/doctors/doctor4.png' },
        { id: 'leader_3_email', label: 'Leader 3 Email', type: 'text', value: 'tigist@yanethospital.com' },
        { id: 'leader_4_name', label: 'Leader 4 Name', type: 'text', value: 'Samuel Bekele' },
        { id: 'leader_4_role', label: 'Leader 4 Role', type: 'text', value: 'Chief Operations Officer' },
        { id: 'leader_4_bio', label: 'Leader 4 Bio', type: 'textarea', value: 'Operations expert ensuring seamless hospital workflows and patient experience.' },
        { id: 'leader_4_image', label: 'Leader 4 Photo URL', type: 'image', value: '/doctors/doctor3.png' },
        { id: 'leader_4_email', label: 'Leader 4 Email', type: 'text', value: 'samuel@yanethospital.com' },
      ],
      'Medical Camp': [
        { id: 'camp_image', label: 'Medical Camp Image URL', type: 'image', value: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000' },
        { id: 'camp_title', label: 'Section Title', type: 'text', value: 'Free Medical Camp Services' },
        { id: 'camp_desc', label: 'Section Description', type: 'textarea', value: 'Yanet Primary Hospital regularly organizes free medical camps to serve underserved communities.' },
      ],
      'Certifications': [
        { id: 'cert_badge', label: 'Section Badge Text', type: 'text', value: 'Accreditations' },
        { id: 'cert_title', label: 'Section Title', type: 'text', value: 'Our Certifications & Accreditations' },
        { id: 'cert_desc', label: 'Section Description', type: 'textarea', value: 'Yanet Primary Hospital holds internationally recognized certifications.' },
        { id: 'cert_1_title', label: 'Cert 1 Title', type: 'text', value: 'FMHACA Licensed' },
        { id: 'cert_1_desc', label: 'Cert 1 Description', type: 'textarea', value: 'Fully licensed by the Ethiopian Food, Medicine and Healthcare Administration and Control Authority.' },
        { id: 'cert_2_title', label: 'Cert 2 Title', type: 'text', value: 'ISO 9001:2015' },
        { id: 'cert_2_desc', label: 'Cert 2 Description', type: 'textarea', value: 'Certified for quality management systems in healthcare service delivery.' },
        { id: 'cert_3_title', label: 'Cert 3 Title', type: 'text', value: 'National Quality Standard' },
        { id: 'cert_3_desc', label: 'Cert 3 Description', type: 'textarea', value: 'Meets all Ethiopian national healthcare quality benchmarks.' },
        { id: 'cert_4_title', label: 'Cert 4 Title', type: 'text', value: 'Ethiopian Medical Association' },
        { id: 'cert_4_desc', label: 'Cert 4 Description', type: 'textarea', value: 'Recognized member of the Ethiopian Medical Association.' },
      ],
      'Partnerships': [
        { id: 'partner_badge', label: 'Section Badge Text', type: 'text', value: 'Our Partners' },
        { id: 'partner_title', label: 'Section Title', type: 'text', value: 'Trusted Partnerships & Collaborations' },
        { id: 'partner_desc', label: 'Section Description', type: 'textarea', value: 'We collaborate with leading institutions to deliver the best care.' },
        { id: 'partner_insurers', label: 'Insurance Partners (comma-separated)', type: 'text', value: 'Nyala Insurance, Medhin Insurance, United Insurance, Awash Insurance' },
        { id: 'partner_hospitals', label: 'Hospital Partners (comma-separated)', type: 'text', value: 'Black Lion Hospital, Hawassa University Hospital' },
        { id: 'partner_ngos', label: 'NGO / International Partners (comma-separated)', type: 'text', value: 'Ethiopian Red Cross, USAID Ethiopia' },
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
    tabs: ['Manage Doctors', 'Hero Section', 'Directory Settings', 'Booking Integration', 'SEO'],
    fields: {
      'Manage Doctors': [],
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
        { id: 'vt_hero_image', label: 'Hero Background Image', type: 'image', value: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=1200&q=80' },
      ],
      'Tour Settings': [
        { id: 'vt_embed_url', label: 'Panoee / Matterport Embed URL', type: 'text', value: 'https://tour.panoee.net/iframe/69d5076793f8052809dbec8b' },
        { id: 'vt_autoplay', label: 'Autoplay Tour on Load (true/false)', type: 'text', value: 'false' },
      ],
      'Highlights': [
        { id: 'vt_highlights_title', label: 'Highlights Section Title', type: 'text', value: 'Key Areas to Explore' },
        { id: 'vt_areas', label: 'Highlighted Areas (JSON — array of {name, time})', type: 'textarea', value: '[{"name":"ICU Ward","time":"0:45"},{"name":"Operating Theatre","time":"1:20"},{"name":"Pediatrics","time":"2:10"}]' },
      ],
      'SEO': [
        { id: 'meta_title', label: 'Meta Title', type: 'text', value: 'Virtual Tour | Yanet Primary Hospital' },
        { id: 'meta_desc', label: 'Meta Description', type: 'textarea', value: 'Take a 360° virtual tour of Yanet Primary Hospital facilities.' },
      ]
    }
  },
  careers: {
    title: 'Careers',
    tabs: ['Hero Section', 'Why Join Us', 'HR Contact', 'Current Openings', 'Application Form', 'SEO'],
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
        { id: 'ben_4', label: 'Benefit 4 Headline', type: 'text', value: 'Career Growth' },
        { id: 'ben_4_desc', label: 'Benefit 4 Description', type: 'textarea', value: 'Clear promotion pathways and leadership development programs.' },
      ],
      'HR Contact': [
        { id: 'hr_email', label: 'HR Email Address', type: 'text', value: 'hr@yanetprimaryhospital.com' },
        { id: 'hr_phone', label: 'HR Phone Number', type: 'text', value: '+251 11 123 4568' },
        { id: 'hr_address', label: 'HR Office Address (English)', type: 'textarea', value: 'Main Branch, 3rd Floor, HR & Administration Suite, Addis Ababa, Ethiopia' },
        { id: 'hr_address_am', label: 'HR Office Address (Amharic)', type: 'textarea', value: 'ዋና ቅርንጫፍ፣ 3ኛ ፎቅ፣ የሰው ሀብት እና አስተዳደር ቢሮ፣ አዲስ አበባ፣ ኢትዮጵያ' },
        { id: 'hr_hours', label: 'Working Hours (English)', type: 'text', value: 'Mon - Fri: 8:30 AM - 5:00 PM' },
        { id: 'hr_hours_am', label: 'Working Hours (Amharic)', type: 'text', value: 'ሰኞ - አርብ: 2:30 ሰዓት - 11:00 ሰዓት' },
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
        { id: 'meta_desc', label: 'Meta Description', type: 'textarea', value: 'Join the Yanet Primary Hospital team. View open positions and internship programs.' },
      ]
    }
  }
};

const getTabIcon = (tab: string) => {
  const normalized = tab.toLowerCase();
  if (normalized.includes('doctor') || normalized.includes('leadership') || normalized.includes('member') || normalized.includes('team')) return Users;
  if (normalized.includes('hero') || normalized.includes('banner') || normalized.includes('preview')) return Layout;
  if (normalized.includes('seo') || normalized.includes('meta')) return Search;
  if (normalized.includes('setting') || normalized.includes('config') || normalized.includes('integration') || normalized.includes('tour')) return Settings;
  if (normalized.includes('book') || normalized.includes('appointment') || normalized.includes('schedule')) return Calendar;
  if (normalized.includes('action') || normalized.includes('quick')) return Zap;
  if (normalized.includes('value') || normalized.includes('mission') || normalized.includes('vision') || normalized.includes('award')) return Award;
  if (normalized.includes('info') || normalized.includes('about') || normalized.includes('overview') || normalized.includes('faq')) return Info;
  if (normalized.includes('blog') || normalized.includes('news') || normalized.includes('post') || normalized.includes('article')) return BookOpen;
  if (normalized.includes('map') || normalized.includes('branch') || normalized.includes('location') || normalized.includes('address')) return MapPin;
  if (normalized.includes('phone') || normalized.includes('contact') || normalized.includes('email') || normalized.includes('support')) return Phone;
  if (normalized.includes('hour') || normalized.includes('time') || normalized.includes('clock') || normalized.includes('date')) return Clock;
  if (normalized.includes('career') || normalized.includes('job') || normalized.includes('work') || normalized.includes('opening')) return Briefcase;
  if (normalized.includes('service') || normalized.includes('pricing') || normalized.includes('department')) return Heart;
  if (normalized.includes('testimonial') || normalized.includes('story') || normalized.includes('review') || normalized.includes('comment')) return MessageSquare;
  if (normalized.includes('image') || normalized.includes('media') || normalized.includes('photo') || normalized.includes('gallery')) return ImageIcon;
  return Type;
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
      fetch(`${API_BASE}/pages/${pageId}`)
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
      const response = await fetch(`${API_BASE}/pages/${pageId}`, {
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
    <div className="flex flex-col gap-6 flex-1 w-full transition-all duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-100">
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
      <div className="flex flex-col gap-6">
        
        {/* Top Horizontal Navigation Tabs */}
        <div className="py-2 border-b border-gray-100">
          <div className="flex flex-row gap-2 overflow-x-auto custom-scrollbar pb-2 pt-0.5 px-0.5">
            {schema.tabs.map((tab: string) => {
              const Icon = getTabIcon(tab);

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap shrink-0 ${
                    activeTab === tab 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:scale-[1.01]'
                  }`}
                >
                  <Icon className={`w-4.5 h-4.5 shrink-0 transition-colors ${activeTab === tab ? 'text-white' : 'text-gray-400'}`} />
                  <span>{tab}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Editor Form Area */}
        <div className="py-6 min-h-[500px]">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 pb-4 border-b border-gray-100">
            <Layout className="w-5 h-5 text-gray-400" />
            {activeTab} Settings
          </h3>

          <div className="space-y-6">
            {pageId === 'doctors' && activeTab === 'Manage Doctors' ? (
              <AdminDoctorCrud />
            ) : (
              schema.fields[activeTab]?.map((field: any) => (
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
              ))
            )}

            {!(pageId === 'doctors' && activeTab === 'Manage Doctors') && schema.fields[activeTab]?.length === 0 && (
              <p className="text-gray-400 text-center py-12 font-medium">No configurable fields in this section.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminPageEditor;
