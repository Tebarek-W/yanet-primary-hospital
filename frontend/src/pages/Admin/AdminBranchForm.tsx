import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, CheckCircle2, MapPin, Calendar, Heart, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

const ALL_SERVICES = [
  { slug: 'general-medicine', title: 'General Medicine' },
  { slug: 'cardiology', title: 'Cardiology' },
  { slug: 'pediatrics', title: 'Pediatrics' },
  { slug: 'surgery', title: 'General Surgery' },
  { slug: 'imaging-diagnostics', title: 'Imaging & Diagnostics' },
  { slug: 'neurology', title: 'Neurology' },
  { slug: 'ophthalmology', title: 'Ophthalmology' },
  { slug: 'laboratory', title: 'Laboratory' },
  { slug: 'pharmacy', title: '24/7 Pharmacy' },
  { slug: 'preventive-healthcare', title: 'Preventive Healthcare' },
  { slug: 'ambulance-services', title: 'Ambulance Services' }
];

const AdminBranchForm: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const isEditMode = !!slug;
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<'basic' | 'hours' | 'services' | 'theme'>('basic');

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [branchSlug, setBranchSlug] = useState('');
  const [name, setName] = useState('');
  const [nameAm, setNameAm] = useState('');
  const [city, setCity] = useState('');
  const [cityAm, setCityAm] = useState('');
  const [address, setAddress] = useState('');
  const [addressAm, setAddressAm] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [mapEmbedUrl, setMapEmbedUrl] = useState('');
  const [image, setImage] = useState('');

  // Working Hours State
  const [workingHours, setWorkingHours] = useState({
    weekdays: '24 Hours / 7 Days',
    weekdaysAm: '24 ሰዓት / 7 ቀናት',
    saturdays: '24 Hours / 7 Days',
    saturdaysAm: '24 ሰዓት / 7 ቀናት',
    sundays: '24 Hours / 7 Days',
    sundaysAm: '24 ሰዓት / 7 ቀናት',
    holidays: '24 Hours / 7 Days',
    holidaysAm: '24 ሰዓት / 7 ቀናት'
  });

  // Services State
  const [serviceSlugs, setServiceSlugs] = useState<string[]>([]);
  const [doctorIdsRaw, setDoctorIdsRaw] = useState('1, 2, 3, 4');
  const [featuredServicesRaw, setFeaturedServicesRaw] = useState('Cardiology, General Surgery, 24/7 Emergency Care, Pediatrics');
  const [featuredServicesAmRaw, setFeaturedServicesAmRaw] = useState('የልብ ሕክምና, ጠቅላላ ቀዶ ጥገና, የ24 ሰዓት ድንገተኛ ሕክምና, የህፃናት ሕክምና');

  // Theme State
  const [gradientClass, setGradientClass] = useState('from-secondary via-secondary/70 to-primary/30');
  const [accentHex, setAccentHex] = useState('#0f47af');
  const [secondaryHex, setSecondaryHex] = useState('#078930');
  const [badgeBg, setBadgeBg] = useState('bg-primary');
  const [tagline, setTagline] = useState('The Central Hub of Multi-Specialty Medical Excellence in Ethiopia');
  const [taglineAm, setTaglineAm] = useState('በኢትዮጵያ ውስጥ የአጠቃላይ የሕክምና የላቀ ደረጃ ማዕከል');
  const [specialCardBg, setSpecialCardBg] = useState('bg-primary/5 border-primary/20');

  useEffect(() => {
    if (isEditMode && slug) {
      setIsLoading(true);
      fetch(`http://localhost:5002/api/branches/${slug}`)
        .then(res => {
          if (!res.ok) throw new Error('Branch not found');
          return res.json();
        })
        .then(data => {
          setBranchSlug(data.slug);
          setName(data.name || '');
          setNameAm(data.nameAm || '');
          setCity(data.city || '');
          setCityAm(data.cityAm || '');
          setAddress(data.address || '');
          setAddressAm(data.addressAm || '');
          setPhone(data.phone || '');
          setEmail(data.email || '');
          setMapEmbedUrl(data.mapEmbedUrl || '');
          setImage(data.image || '');

          if (data.workingHours) {
            setWorkingHours({ ...workingHours, ...data.workingHours });
          }
          if (data.serviceSlugs) {
            setServiceSlugs(data.serviceSlugs);
          }
          if (data.doctorIds) {
            setDoctorIdsRaw(Array.isArray(data.doctorIds) ? data.doctorIds.join(', ') : '');
          }
          if (data.featuredServices) {
            setFeaturedServicesRaw(Array.isArray(data.featuredServices) ? data.featuredServices.join(', ') : '');
          }
          if (data.featuredServicesAm) {
            setFeaturedServicesAmRaw(Array.isArray(data.featuredServicesAm) ? data.featuredServicesAm.join(', ') : '');
          }
          if (data.theme) {
            setGradientClass(data.theme.gradientClass || '');
            setAccentHex(data.theme.accentHex || '');
            setSecondaryHex(data.theme.secondaryHex || '');
            setBadgeBg(data.theme.badgeBg || '');
            setTagline(data.theme.tagline || '');
            setTaglineAm(data.theme.taglineAm || '');
            setSpecialCardBg(data.theme.specialCardBg || '');
          }
        })
        .catch(err => {
          console.error(err);
          alert('Failed to load branch details for editing.');
          navigate('/admin/branches');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isEditMode, slug, navigate]);

  const handleServiceToggle = (serviceSlug: string) => {
    setServiceSlugs(prev => 
      prev.includes(serviceSlug) 
        ? prev.filter(s => s !== serviceSlug)
        : [...prev, serviceSlug]
    );
  };

  const handleHoursChange = (field: string, value: string) => {
    setWorkingHours(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !nameAm || (!isEditMode && !branchSlug)) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSaving(true);

    const doctorIds = doctorIdsRaw.split(',').map(id => id.trim()).filter(Boolean);
    const featuredServices = featuredServicesRaw.split(',').map(s => s.trim()).filter(Boolean);
    const featuredServicesAm = featuredServicesAmRaw.split(',').map(s => s.trim()).filter(Boolean);

    const payload = {
      slug: isEditMode ? slug : branchSlug.toLowerCase().replace(/[^a-z0-9-_]/g, '-'),
      name,
      nameAm,
      city,
      cityAm,
      address,
      addressAm,
      phone,
      email,
      mapEmbedUrl,
      image,
      workingHours,
      serviceSlugs,
      doctorIds,
      featuredServices,
      featuredServicesAm,
      theme: {
        gradientClass,
        accentHex,
        secondaryHex,
        badgeBg,
        tagline,
        taglineAm,
        specialCardBg
      }
    };

    try {
      const url = isEditMode 
        ? `http://localhost:5002/api/branches/${slug}`
        : 'http://localhost:5002/api/branches';
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          navigate('/admin/branches');
        }, 1500);
      } else {
        const err = await response.json();
        alert(err.message || 'Failed to save branch.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error while saving branch.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-gray-100 shadow-sm">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-500 font-semibold">Loading branch details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/branches')}
            className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              {isEditMode ? 'Edit Branch Profile' : 'Register New Branch'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">Configure layout, contact channels, theme palettes, and working hours.</p>
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
          {isSaving ? 'Saving Changes...' : 'Save & Publish'}
        </button>
      </div>

      {isSuccess && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-2xl flex items-center gap-3 font-semibold"
        >
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          Branch records updated successfully! Redirecting...
        </motion.div>
      )}

      {/* Editor Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Sidebar Sections Selector */}
        <div className="lg:w-56 shrink-0">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-150 p-2 lg:sticky lg:top-24 space-y-1">
            <button
              onClick={() => setActiveSection('basic')}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all text-left w-full ${
                activeSection === 'basic' ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <MapPin className="w-4.5 h-4.5" />
              Basic Information
            </button>
            <button
              onClick={() => setActiveSection('hours')}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all text-left w-full ${
                activeSection === 'hours' ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Calendar className="w-4.5 h-4.5" />
              Working Hours
            </button>
            <button
              onClick={() => setActiveSection('services')}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all text-left w-full ${
                activeSection === 'services' ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Heart className="w-4.5 h-4.5" />
              Medical Services
            </button>
            <button
              onClick={() => setActiveSection('theme')}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all text-left w-full ${
                activeSection === 'theme' ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Palette className="w-4.5 h-4.5" />
              Theme & Tagline
            </button>
          </div>
        </div>

        {/* Editor Settings Card */}
        <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-150 p-6 md:p-8 min-h-[500px]">
          <form onSubmit={handleSave} className="space-y-6">
            
            {/* Section 1: Basic info */}
            {activeSection === 'basic' && (
              <div className="space-y-5">
                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-3 mb-4">Basic Profile Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider">Branch Slug (unique URL id) *</label>
                    <input 
                      type="text"
                      disabled={isEditMode}
                      value={branchSlug}
                      onChange={(e) => setBranchSlug(e.target.value)}
                      placeholder="e.g. hawassa, bole-road"
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider">Cover Image URL</label>
                    <input 
                      type="text"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider">Branch Name (English) *</label>
                    <input 
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Hawassa Branch (HQ)"
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider">Branch Name (Amharic) *</label>
                    <input 
                      type="text"
                      value={nameAm}
                      onChange={(e) => setNameAm(e.target.value)}
                      placeholder="ሀዋሳ ቅርንጫፍ (ዋናው መሥሪያ ቤት)"
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm Amharic"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider">City (English)</label>
                    <input 
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Hawassa"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider">City (Amharic)</label>
                    <input 
                      type="text"
                      value={cityAm}
                      onChange={(e) => setCityAm(e.target.value)}
                      placeholder="ሀዋሳ"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm Amharic"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider">Detailed Address (English)</label>
                  <input 
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="HQ Building, Near Lake Hawassa, Hawassa, Ethiopia"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider">Detailed Address (Amharic)</label>
                  <input 
                    type="text"
                    value={addressAm}
                    onChange={(e) => setAddressAm(e.target.value)}
                    placeholder="ዋና መሥሪያ ቤት ሕንፃ፣ ከሐዋሳ ሐይቅ..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm Amharic"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider">Contact Phone</label>
                    <input 
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+251 46 220 1234"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider">Contact Email</label>
                    <input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="hawassa@yanethospital.com"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider">Google Map Iframe Embed URL</label>
                  <textarea 
                    rows={3}
                    value={mapEmbedUrl}
                    onChange={(e) => setMapEmbedUrl(e.target.value)}
                    placeholder="https://www.google.com/maps/embed?pb=..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm resize-none custom-scrollbar"
                  />
                </div>
              </div>
            )}

            {/* Section 2: Hours */}
            {activeSection === 'hours' && (
              <div className="space-y-5">
                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-3 mb-4">Working Hours Schedules</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider">Weekdays (English)</label>
                    <input 
                      type="text"
                      value={workingHours.weekdays}
                      onChange={(e) => handleHoursChange('weekdays', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider">Weekdays (Amharic)</label>
                    <input 
                      type="text"
                      value={workingHours.weekdaysAm}
                      onChange={(e) => handleHoursChange('weekdaysAm', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm Amharic"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider">Saturdays (English)</label>
                    <input 
                      type="text"
                      value={workingHours.saturdays}
                      onChange={(e) => handleHoursChange('saturdays', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider">Saturdays (Amharic)</label>
                    <input 
                      type="text"
                      value={workingHours.saturdaysAm}
                      onChange={(e) => handleHoursChange('saturdaysAm', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm Amharic"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider">Sundays (English)</label>
                    <input 
                      type="text"
                      value={workingHours.sundays}
                      onChange={(e) => handleHoursChange('sundays', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider">Sundays (Amharic)</label>
                    <input 
                      type="text"
                      value={workingHours.sundaysAm}
                      onChange={(e) => handleHoursChange('sundaysAm', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm Amharic"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider">Holidays (English)</label>
                    <input 
                      type="text"
                      value={workingHours.holidays}
                      onChange={(e) => handleHoursChange('holidays', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider">Holidays (Amharic)</label>
                    <input 
                      type="text"
                      value={workingHours.holidaysAm}
                      onChange={(e) => handleHoursChange('holidaysAm', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm Amharic"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Section 3: Services */}
            {activeSection === 'services' && (
              <div className="space-y-5">
                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-3 mb-4">Departments & Specialty Offerings</h3>
                
                <div className="space-y-3">
                  <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider">Select Available Medical Services</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {ALL_SERVICES.map(srv => (
                      <label 
                        key={srv.slug} 
                        className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                          serviceSlugs.includes(srv.slug) 
                            ? 'bg-primary/5 border-primary/30 text-primary font-bold shadow-sm' 
                            : 'border-gray-200 hover:bg-gray-50 text-gray-700 font-medium'
                        }`}
                      >
                        <input 
                          type="checkbox"
                          checked={serviceSlugs.includes(srv.slug)}
                          onChange={() => handleServiceToggle(srv.slug)}
                          className="h-4.5 w-4.5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
                        />
                        <span className="text-xs">{srv.title}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider">Featured Services English (comma-separated)</label>
                  <input 
                    type="text"
                    value={featuredServicesRaw}
                    onChange={(e) => setFeaturedServicesRaw(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider">Featured Services Amharic (comma-separated)</label>
                  <input 
                    type="text"
                    value={featuredServicesAmRaw}
                    onChange={(e) => setFeaturedServicesAmRaw(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm Amharic"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider">Practicing Doctor IDs (comma-separated, matches doctorsData.ts)</label>
                  <input 
                    type="text"
                    value={doctorIdsRaw}
                    onChange={(e) => setDoctorIdsRaw(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm"
                  />
                </div>
              </div>
            )}

            {/* Section 4: Theme styling */}
            {activeSection === 'theme' && (
              <div className="space-y-5">
                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-3 mb-4">Aesthetics & Localized Taglines</h3>
                
                <div className="space-y-2">
                  <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider">Branch Tagline / Statement (English)</label>
                  <input 
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider">Branch Tagline / Statement (Amharic)</label>
                  <input 
                    type="text"
                    value={taglineAm}
                    onChange={(e) => setTaglineAm(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm Amharic"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider">Primary Accent Color Hex</label>
                    <input 
                      type="text"
                      value={accentHex}
                      onChange={(e) => setAccentHex(e.target.value)}
                      placeholder="#0f47af"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider">Secondary Theme Color Hex</label>
                    <input 
                      type="text"
                      value={secondaryHex}
                      onChange={(e) => setSecondaryHex(e.target.value)}
                      placeholder="#078930"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider">Accent Tailwind Gradient Class</label>
                    <input 
                      type="text"
                      value={gradientClass}
                      onChange={(e) => setGradientClass(e.target.value)}
                      placeholder="from-secondary via-secondary/70 to-primary/30"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider">Badge Tailwind CSS Class</label>
                    <input 
                      type="text"
                      value={badgeBg}
                      onChange={(e) => setBadgeBg(e.target.value)}
                      placeholder="bg-primary"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider">Banner Panel Tailwind Class</label>
                  <input 
                    type="text"
                    value={specialCardBg}
                    onChange={(e) => setSpecialCardBg(e.target.value)}
                    placeholder="bg-primary/5 border-primary/20"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm"
                  />
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminBranchForm;
