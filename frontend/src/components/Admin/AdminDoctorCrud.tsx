import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Plus, Edit2, Trash2, Globe, Mail, Phone, 
  MapPin, X, PlusCircle, Check, Award, GraduationCap, 
  Briefcase, FileText, UserPlus, Sparkles, CheckCircle2, AlertTriangle, Key
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { doctorsData } from '../../data/doctorsData';
import type { Doctor } from '../../data/doctorsData';

const AdminDoctorCrud: React.FC = () => {
  // Reactive list of doctors
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [branches, setBranches] = useState<{slug: string, name: string}[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  
  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Partial<Doctor> | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState<Doctor | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  // Editor tab inside Modal: 'general' | 'bio' | 'details'
  const [modalTab, setModalTab] = useState<'general' | 'bio' | 'details'>('general');
  
  // Custom alerts/toasts
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'danger' } | null>(null);

  const API_URL = 'http://localhost:5002/api/doctors';

  const loadDoctorsAndBranches = async () => {
    try {
      const [docRes, branchRes] = await Promise.all([
        fetch(API_URL),
        fetch('http://localhost:5002/api/branches')
      ]);
      if (docRes.ok) {
        const data = await docRes.json();
        setDoctors(data);
      }
      if (branchRes.ok) {
        const branchData = await branchRes.json();
        setBranches(branchData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      triggerToast('Failed to load data from server.', 'danger');
    }
  };

  // Load doctors on mount
  useEffect(() => {
    loadDoctorsAndBranches();
  }, []);

  const triggerToast = (message: string, type: 'success' | 'danger' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Handle Delete operation
  const confirmDelete = (doctor: Doctor) => {
    setDoctorToDelete(doctor);
    setIsDeleteConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (!doctorToDelete) return;
    try {
      const res = await fetch(`${API_URL}/${doctorToDelete.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setDoctors(doctors.filter(doc => doc.id !== doctorToDelete.id));
        triggerToast(`Doctor ${doctorToDelete.name} has been removed successfully.`);
      } else {
        triggerToast('Failed to delete doctor.', 'danger');
      }
    } catch (error) {
      triggerToast('An error occurred while deleting.', 'danger');
    }
    setIsDeleteConfirmOpen(false);
    setDoctorToDelete(null);
  };

  // Open Edit or Add modal
  const openEditModal = (doctor: Doctor | null) => {
    setModalTab('general');
    setImageFile(null);
    if (doctor) {
      setEditingDoctor(JSON.parse(JSON.stringify(doctor))); // deep copy
    } else {
      // Default empty doctor template
      setEditingDoctor({
        name: '',
        nameAm: '',
        roleKey: 'doctor_team.roles.cardiologist',
        specialty: 'Cardiology',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop',
        desc: '',
        descAm: '',
        email: '',
        phone: '',
        location: 'Addis Ababa, Ethiopia',
        education: [],
        educationAm: [],
        experience: [],
        experienceAm: [],
        skills: [],
        skillsAm: [],
        biography: '',
        biographyAm: '',
        branchSlugs: [],
        password: 'yanetstaff123'
      });
    }
    setIsEditModalOpen(true);
  };

  // Save add/edit form
  const handleSaveDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDoctor || !editingDoctor.name || !editingDoctor.email || !editingDoctor.specialty) {
      triggerToast('Name, email, and specialty are required.', 'danger');
      return;
    }

    setIsSaving(true);
    try {
      const isNew = !editingDoctor.id;
      const url = isNew ? API_URL : `${API_URL}/${editingDoctor.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const assignedBranches = branches.filter(b => editingDoctor.branchSlugs?.includes(b.slug));
      const computedLocation = assignedBranches.length > 0 
        ? assignedBranches.map(b => b.name).join(', ') 
        : 'Addis Ababa, Ethiopia';

      let uploadedImageUrl = editingDoctor.image;

      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        const uploadRes = await fetch('http://localhost:5002/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!uploadRes.ok) {
          throw new Error('Failed to upload image');
        }

        const uploadData = await uploadRes.json();
        uploadedImageUrl = `http://localhost:5002${uploadData.imageUrl}`;
      }

      const doctorDataToSave = {
        ...editingDoctor,
        location: computedLocation,
        image: uploadedImageUrl
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doctorDataToSave),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to save doctor');
      }

      const savedDoctor = await res.json();

      if (isNew) {
        setDoctors([savedDoctor, ...doctors]);
        triggerToast(`Doctor ${savedDoctor.name} added to the registry.`);
      } else {
        setDoctors(doctors.map(d => d.id === savedDoctor.id ? savedDoctor : d));
        triggerToast(`Profile for ${savedDoctor.name} updated successfully.`);
      }

      setIsEditModalOpen(false);
      setEditingDoctor(null);
    } catch (error: any) {
      triggerToast(error.message || 'An error occurred while saving.', 'danger');
    } finally {
      setIsSaving(false);
    }
  };

  const generatePassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$";
    let pwd = "";
    for(let i=0; i<10; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    if (editingDoctor) {
      setEditingDoctor({ ...editingDoctor, password: pwd });
    }
  };

  // Lists management inside form (Education, Experience, Skills)
  const handleAddListItem = (field: 'education' | 'educationAm' | 'experience' | 'experienceAm' | 'skills' | 'skillsAm') => {
    if (!editingDoctor) return;
    const currentList = editingDoctor[field] as string[] || [];
    setEditingDoctor({
      ...editingDoctor,
      [field]: [...currentList, '']
    });
  };

  const handleUpdateListItem = (field: 'education' | 'educationAm' | 'experience' | 'experienceAm' | 'skills' | 'skillsAm', index: number, value: string) => {
    if (!editingDoctor) return;
    const currentList = [...(editingDoctor[field] as string[] || [])];
    currentList[index] = value;
    setEditingDoctor({
      ...editingDoctor,
      [field]: currentList
    });
  };

  const handleRemoveListItem = (field: 'education' | 'educationAm' | 'experience' | 'experienceAm' | 'skills' | 'skillsAm', index: number) => {
    if (!editingDoctor) return;
    const currentList = [...(editingDoctor[field] as string[] || [])];
    currentList.splice(index, 1);
    setEditingDoctor({
      ...editingDoctor,
      [field]: currentList
    });
  };

  // Filter list
  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.nameAm && doc.nameAm.includes(searchQuery)) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesSpecialty = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
    
    return matchesSearch && matchesSpecialty;
  });

  const specialties = ['All', ...Array.from(new Set(doctors.map(d => d.specialty))).filter(Boolean)];

  return (
    <div className="space-y-6">
      
      {/* Toast Alert */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 border font-bold text-sm ${
              toast.type === 'success' 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
            )}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Real-time Notice */}
      <div className="bg-blue-50/70 border border-blue-100 rounded-3xl p-5 flex items-start gap-4 shadow-sm backdrop-blur-md">
        <Sparkles className="w-6 h-6 text-primary shrink-0 mt-0.5" />
        <div>
          <h4 className="font-extrabold text-blue-900 leading-tight">Instant Synchronized Updates</h4>
          <p className="text-xs text-blue-700/90 mt-1 leading-relaxed">
            Doctor CRUD changes persist instantly in the CMS. Newly created or modified doctor cards will render immediately across the live home page, specialist directories, branch listings, and detail pages. 
            <span className="font-bold underline ml-1">No need to click "Publish Changes" above.</span>
          </p>
        </div>
      </div>



      {/* Search & Actions Bar */}
      <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 max-w-2xl">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search specialists by name, specialty, language..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50/70 hover:bg-gray-50 border border-gray-200/80 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium text-gray-800"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative shrink-0">
            <Filter className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="pl-10 pr-8 py-3.5 bg-gray-50/70 border border-gray-200/80 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-bold text-gray-700 appearance-none cursor-pointer"
            >
              {specialties.map(spec => (
                <option key={spec} value={spec}>{spec} Department</option>
              ))}
            </select>
          </div>
        </div>

        <button 
          onClick={() => openEditModal(null)}
          className="btn-primary !px-5 flex items-center justify-center gap-2 text-sm font-bold shrink-0 self-stretch md:self-auto"
        >
          <UserPlus className="w-4.5 h-4.5" />
          Add New Doctor
        </button>
      </div>

      {/* Doctor Grid list */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-widest text-gray-400">Doctor Profile</th>
                <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-widest text-gray-400">Specialty / Role</th>
                <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-widest text-gray-400">Amharic Name</th>
                <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-widest text-gray-400">Contact Details</th>
                <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-widest text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence initial={false}>
                {filteredDoctors.map(doctor => (
                  <motion.tr 
                    key={doctor.id}
                    layoutId={`row-${doctor.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4.5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden border border-gray-100 shrink-0 bg-gray-50">
                          <img 
                            src={doctor.image || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop'} 
                            alt={doctor.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop';
                            }}
                          />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-gray-900 group-hover:text-primary transition-colors text-sm">{doctor.name}</h4>
                          <span className="text-xs text-gray-400 block mt-0.5 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {doctor.location || 'Addis Ababa'}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4.5">
                      <span className="px-3 py-1.5 bg-primary/10 text-primary text-[11px] font-black rounded-xl uppercase tracking-wider block w-fit">
                        {doctor.specialty}
                      </span>
                    </td>

                    <td className="px-6 py-4.5">
                      <span className="text-sm font-bold text-gray-800 font-sans">{doctor.nameAm || '—'}</span>
                    </td>

                    <td className="px-6 py-4.5 space-y-1">
                      <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        <span>{doctor.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                        <span>{doctor.phone}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => openEditModal(doctor)}
                          className="w-9 h-9 bg-gray-50 text-gray-600 hover:bg-primary hover:text-white rounded-xl flex items-center justify-center transition-all shadow-sm"
                          title="Edit Profile"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => confirmDelete(doctor)}
                          className="w-9 h-9 bg-gray-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl flex items-center justify-center transition-all shadow-sm"
                          title="Remove Doctor"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-16 px-4 space-y-3">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-400">
              <Search className="w-8 h-8" />
            </div>
            <h4 className="font-extrabold text-gray-800 text-lg">No specialists found</h4>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              We couldn't find any doctor matching "{searchQuery}" or department filters. Try expanding your search queries.
            </p>
          </div>
        )}
      </div>

      {/* Stunning Tabbed Edit Modal */}
      <AnimatePresence>
        {isEditModalOpen && editingDoctor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto">
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative z-10"
            >
              
              {/* Header */}
              <div className="px-6 py-5 bg-gray-50 border-b border-gray-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-gray-900 text-lg">
                      {doctors.some(d => d.id === editingDoctor.id) ? 'Edit Doctor Profile' : 'Register New Specialist'}
                    </h3>
                    <p className="text-xs text-gray-400 font-bold mt-0.5">Fill out translations & details carefully.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="w-9 h-9 bg-white border border-gray-100 hover:bg-red-500 hover:text-white rounded-full flex items-center justify-center transition-colors shadow-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sub-Tabs Nav */}
              <div className="px-6 bg-white border-b border-gray-100 flex items-center gap-2 shrink-0 overflow-x-auto scrollbar-none py-2">
                {[
                  { id: 'general', label: '1. General Info', icon: Globe },
                  { id: 'bio', label: '2. biography & Descriptions', icon: FileText },
                  { id: 'details', label: '3. Credentials & Lists', icon: Award }
                ].map(tab => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setModalTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                      modalTab === tab.id 
                        ? 'bg-primary text-white shadow-md shadow-primary/20' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <tab.icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Form Content */}
              <form onSubmit={handleSaveDoctor} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 custom-scrollbar">
                
                {modalTab === 'general' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* EN Name */}
                    <div className="space-y-2">
                      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest">Full Name (English)</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Dr. Dawit Yilma"
                        value={editingDoctor.name || ''}
                        onChange={(e) => setEditingDoctor({ ...editingDoctor, name: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-semibold text-gray-800"
                      />
                    </div>

                    {/* AM Name */}
                    <div className="space-y-2">
                      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest">የሐኪም ሙሉ ስም (Amharic)</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. ዶ/ር ዳዊት ይልማ"
                        value={editingDoctor.nameAm || ''}
                        onChange={(e) => setEditingDoctor({ ...editingDoctor, nameAm: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-semibold text-gray-800"
                      />
                    </div>

                    {/* Department / Specialty */}
                    <div className="space-y-2">
                      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest">Specialty Department</label>
                      <select 
                        value={editingDoctor.specialty || 'Cardiology'}
                        onChange={(e) => setEditingDoctor({ ...editingDoctor, specialty: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-bold text-gray-800"
                      >
                        <option value="Cardiology">Cardiology</option>
                        <option value="Neurology">Neurology</option>
                        <option value="Surgery">Surgery</option>
                        <option value="Pediatrics">Pediatrics</option>
                        <option value="Ophthalmology">Ophthalmology</option>
                        <option value="Dermatology">Dermatology</option>
                        <option value="Orthopedics">Orthopedics</option>
                      </select>
                    </div>

                    {/* Role Translation Key */}
                    <div className="space-y-2">
                      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest">Role Translation Key</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. doctor_team.roles.cardiologist"
                        value={editingDoctor.roleKey || ''}
                        onChange={(e) => setEditingDoctor({ ...editingDoctor, roleKey: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-semibold text-gray-800"
                      />
                    </div>

                    {/* Contact details */}
                    <div className="space-y-2">
                      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                      <input 
                        type="email" 
                        required
                        placeholder="dawit.yilma@yanethospital.com"
                        value={editingDoctor.email || ''}
                        onChange={(e) => setEditingDoctor({ ...editingDoctor, email: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-semibold text-gray-800"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest">Phone Number</label>
                      <input 
                        type="text" 
                        required
                        placeholder="+251 911 22 33 44"
                        value={editingDoctor.phone || ''}
                        onChange={(e) => setEditingDoctor({ ...editingDoctor, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-semibold text-gray-800"
                      />
                    </div>

                    {/* Password Generate */}
                    <div className="space-y-2">
                      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest">Staff Login Password</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Password"
                          value={editingDoctor.password || ''}
                          onChange={(e) => setEditingDoctor({ ...editingDoctor, password: e.target.value })}
                          className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-semibold text-gray-800"
                        />
                        <button
                          type="button"
                          onClick={generatePassword}
                          className="px-4 py-3 bg-primary/10 text-primary hover:bg-primary hover:text-white border border-primary/20 rounded-2xl flex items-center justify-center gap-2 transition-colors font-bold text-sm shrink-0"
                        >
                          <Key className="w-4 h-4" />
                          Generate
                        </button>
                      </div>
                      <p className="text-[10px] text-gray-400 font-bold">Share this password with the staff member.</p>
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2">
                      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest">Profile Image</label>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setImageFile(file);
                          }
                        }}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-semibold text-gray-800"
                      />
                    </div>

                    {/* Branch Assignment */}
                    <div className="md:col-span-2 space-y-2">
                      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest">Assign to Branches</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-gray-50 p-4 border border-gray-200 rounded-2xl">
                        {branches.map(branch => {
                          const isAssigned = editingDoctor.branchSlugs?.includes(branch.slug);
                          return (
                            <label key={branch.slug} className="flex items-center gap-2 cursor-pointer">
                              <input 
                                type="checkbox"
                                checked={isAssigned || false}
                                onChange={(e) => {
                                  const currentSlugs = editingDoctor.branchSlugs || [];
                                  if (e.target.checked) {
                                    setEditingDoctor({ ...editingDoctor, branchSlugs: [...currentSlugs, branch.slug] });
                                  } else {
                                    setEditingDoctor({ ...editingDoctor, branchSlugs: currentSlugs.filter(s => s !== branch.slug) });
                                  }
                                }}
                                className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                              />
                              <span className="text-xs font-bold text-gray-700">{branch.name}</span>
                            </label>
                          );
                        })}
                        {branches.length === 0 && (
                          <div className="col-span-full text-xs text-gray-400 italic">No branches available.</div>
                        )}
                      </div>
                    </div>

                    {/* Image Preview Box */}
                    <div className="md:col-span-2 p-4 bg-gray-50 border border-gray-100 rounded-2xl flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-gray-200 shrink-0">
                        <img 
                          src={imageFile ? URL.createObjectURL(imageFile) : editingDoctor.image} 
                          alt="preview" 
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop';
                          }}
                        />
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-800 text-xs">Image Preview</h5>
                        <p className="text-[10px] text-gray-400 font-medium mt-0.5">Please upload a high-quality photo.</p>
                      </div>
                    </div>
                  </div>
                )}

                {modalTab === 'bio' && (
                  <div className="space-y-6">
                    {/* Short Description */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest">Short Description (English)</label>
                        <textarea 
                          rows={3}
                          placeholder="Brief one-sentence tagline about the doctor's experience..."
                          value={editingDoctor.desc || ''}
                          onChange={(e) => setEditingDoctor({ ...editingDoctor, desc: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-semibold text-gray-800 resize-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest">አጭር መግለጫ (Amharic)</label>
                        <textarea 
                          rows={3}
                          placeholder="ስለ ሐኪሙ አጭር መግለጫ..."
                          value={editingDoctor.descAm || ''}
                          onChange={(e) => setEditingDoctor({ ...editingDoctor, descAm: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-semibold text-gray-800 resize-none"
                        />
                      </div>
                    </div>

                    {/* Biography */}
                    <div className="space-y-2">
                      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest">Biography (English)</label>
                      <textarea 
                        rows={6}
                        placeholder="Detailed professional career story, philosophy of care, and medical achievements..."
                        value={editingDoctor.biography || ''}
                        onChange={(e) => setEditingDoctor({ ...editingDoctor, biography: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-semibold text-gray-800 resize-none custom-scrollbar"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest">ባዮግራፊ / የግል ታሪክ (Amharic)</label>
                      <textarea 
                        rows={6}
                        placeholder="የሐኪሙ ሙሉ የሥራ ታሪክና ስኬቶች..."
                        value={editingDoctor.biographyAm || ''}
                        onChange={(e) => setEditingDoctor({ ...editingDoctor, biographyAm: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-semibold text-gray-800 resize-none custom-scrollbar"
                      />
                    </div>
                  </div>
                )}

                {modalTab === 'details' && (
                  <div className="space-y-8">
                    {/* Dynamic Education list */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Education EN */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                          <h4 className="font-extrabold text-sm text-gray-800 flex items-center gap-1.5">
                            <GraduationCap className="w-4.5 h-4.5 text-primary" />
                            Education (English)
                          </h4>
                          <button
                            type="button"
                            onClick={() => handleAddListItem('education')}
                            className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
                          >
                            <PlusCircle className="w-3.5 h-3.5" /> Add
                          </button>
                        </div>
                        <div className="space-y-2 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                          {(editingDoctor.education || []).map((edu, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <input 
                                type="text"
                                value={edu}
                                onChange={(e) => handleUpdateListItem('education', idx, e.target.value)}
                                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:border-primary outline-none"
                                placeholder="Degree, University, Country..."
                              />
                              <button 
                                type="button" 
                                onClick={() => handleRemoveListItem('education', idx)}
                                className="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center shrink-0 hover:bg-red-500 hover:text-white transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                          {(editingDoctor.education || []).length === 0 && (
                            <p className="text-[11px] text-gray-400 text-center py-6 font-bold">No education items registered.</p>
                          )}
                        </div>
                      </div>

                      {/* Education AM */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                          <h4 className="font-extrabold text-sm text-gray-800 flex items-center gap-1.5">
                            <GraduationCap className="w-4.5 h-4.5 text-primary" />
                            ትምህርት (Amharic)
                          </h4>
                          <button
                            type="button"
                            onClick={() => handleAddListItem('educationAm')}
                            className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
                          >
                            <PlusCircle className="w-3.5 h-3.5" /> አክል
                          </button>
                        </div>
                        <div className="space-y-2 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                          {(editingDoctor.educationAm || []).map((edu, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <input 
                                type="text"
                                value={edu}
                                onChange={(e) => handleUpdateListItem('educationAm', idx, e.target.value)}
                                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:border-primary outline-none"
                                placeholder="የተቀበሉት ዲግሪ እና ዩኒቨርሲቲ..."
                              />
                              <button 
                                type="button" 
                                onClick={() => handleRemoveListItem('educationAm', idx)}
                                className="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center shrink-0 hover:bg-red-500 hover:text-white transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                          {(editingDoctor.educationAm || []).length === 0 && (
                            <p className="text-[11px] text-gray-400 text-center py-6 font-bold">ምንም የትምህርት መረጃ አልተመዘገበም</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-100 pt-6">
                      {/* Experience EN */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                          <h4 className="font-extrabold text-sm text-gray-800 flex items-center gap-1.5">
                            <Briefcase className="w-4.5 h-4.5 text-indigo-500" />
                            Experience (English)
                          </h4>
                          <button
                            type="button"
                            onClick={() => handleAddListItem('experience')}
                            className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
                          >
                            <PlusCircle className="w-3.5 h-3.5" /> Add
                          </button>
                        </div>
                        <div className="space-y-2 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                          {(editingDoctor.experience || []).map((exp, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <input 
                                type="text"
                                value={exp}
                                onChange={(e) => handleUpdateListItem('experience', idx, e.target.value)}
                                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:border-primary outline-none"
                                placeholder="e.g. Chief Surgeon at Yanet Hospital (5 years)"
                              />
                              <button 
                                type="button" 
                                onClick={() => handleRemoveListItem('experience', idx)}
                                className="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center shrink-0 hover:bg-red-500 hover:text-white transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                          {(editingDoctor.experience || []).length === 0 && (
                            <p className="text-[11px] text-gray-400 text-center py-6 font-bold">No experience items registered.</p>
                          )}
                        </div>
                      </div>

                      {/* Experience AM */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                          <h4 className="font-extrabold text-sm text-gray-800 flex items-center gap-1.5">
                            <Briefcase className="w-4.5 h-4.5 text-indigo-500" />
                            የሥራ ልምድ (Amharic)
                          </h4>
                          <button
                            type="button"
                            onClick={() => handleAddListItem('experienceAm')}
                            className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
                          >
                            <PlusCircle className="w-3.5 h-3.5" /> አክል
                          </button>
                        </div>
                        <div className="space-y-2 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                          {(editingDoctor.experienceAm || []).map((exp, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <input 
                                type="text"
                                value={exp}
                                onChange={(e) => handleUpdateListItem('experienceAm', idx, e.target.value)}
                                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:border-primary outline-none"
                                placeholder="የሥራ ልምድ እና የዓመታት ርዝማኔ..."
                              />
                              <button 
                                type="button" 
                                onClick={() => handleRemoveListItem('experienceAm', idx)}
                                className="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center shrink-0 hover:bg-red-500 hover:text-white transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                          {(editingDoctor.experienceAm || []).length === 0 && (
                            <p className="text-[11px] text-gray-400 text-center py-6 font-bold">ምንም የሥራ ልምድ አልተመዘገበም</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-100 pt-6">
                      {/* Skills EN */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                          <h4 className="font-extrabold text-sm text-gray-800 flex items-center gap-1.5">
                            <Check className="w-4.5 h-4.5 text-emerald-500 animate-pulse" />
                            Skills / Expertises (English)
                          </h4>
                          <button
                            type="button"
                            onClick={() => handleAddListItem('skills')}
                            className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
                          >
                            <PlusCircle className="w-3.5 h-3.5" /> Add
                          </button>
                        </div>
                        <div className="space-y-2 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                          {(editingDoctor.skills || []).map((sk, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <input 
                                type="text"
                                value={sk}
                                onChange={(e) => handleUpdateListItem('skills', idx, e.target.value)}
                                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:border-primary outline-none"
                                placeholder="e.g. Cardiac Surgery"
                              />
                              <button 
                                type="button" 
                                onClick={() => handleRemoveListItem('skills', idx)}
                                className="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center shrink-0 hover:bg-red-500 hover:text-white transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                          {(editingDoctor.skills || []).length === 0 && (
                            <p className="text-[11px] text-gray-400 text-center py-6 font-bold">No skills registered.</p>
                          )}
                        </div>
                      </div>

                      {/* Skills AM */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                          <h4 className="font-extrabold text-sm text-gray-800 flex items-center gap-1.5">
                            <Check className="w-4.5 h-4.5 text-emerald-500 animate-pulse" />
                            የክህሎት ማጠቃለያ (Amharic)
                          </h4>
                          <button
                            type="button"
                            onClick={() => handleAddListItem('skillsAm')}
                            className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
                          >
                            <PlusCircle className="w-3.5 h-3.5" /> አክል
                          </button>
                        </div>
                        <div className="space-y-2 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                          {(editingDoctor.skillsAm || []).map((sk, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <input 
                                type="text"
                                value={sk}
                                onChange={(e) => handleUpdateListItem('skillsAm', idx, e.target.value)}
                                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:border-primary outline-none"
                                placeholder="ክህሎት እና የልዩ ዕውቀት አቅጣጫ..."
                              />
                              <button 
                                type="button" 
                                onClick={() => handleRemoveListItem('skillsAm', idx)}
                                className="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center shrink-0 hover:bg-red-500 hover:text-white transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                          {(editingDoctor.skillsAm || []).length === 0 && (
                            <p className="text-[11px] text-gray-400 text-center py-6 font-bold">ምንም የክህሎት መረጃ አልተመዘገበም</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </form>

              {/* Footer */}
              <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3 shrink-0">
                <button 
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  disabled={isSaving}
                  className="px-5 py-3 rounded-2xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 text-sm font-extrabold transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  type="button"
                  onClick={handleSaveDoctor}
                  disabled={isSaving}
                  className="btn-primary !px-6 flex items-center gap-2 text-sm font-extrabold disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <div className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Check className="w-4.5 h-4.5" />
                  )}
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Deletion Dialog */}
      <AnimatePresence>
        {isDeleteConfirmOpen && doctorToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleteConfirmOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-gray-100 shadow-2xl rounded-3xl w-full max-w-md p-6 relative z-10 space-y-4"
            >
              <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-extrabold text-gray-900 text-lg">Remove specialist profile?</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Are you absolutely sure you want to remove <span className="font-bold text-gray-900">{doctorToDelete.name}</span> from the registry? 
                  This will remove their profile cards from active branch layouts, search registries, and clinic widgets.
                </p>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button 
                  onClick={() => setIsDeleteConfirmOpen(false)}
                  className="flex-1 py-3 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-xl text-xs font-bold transition-all border border-gray-200"
                >
                  No, Keep Profile
                </button>
                <button 
                  onClick={handleDelete}
                  className="flex-1 py-3 bg-red-500 text-white hover:bg-red-600 rounded-xl text-xs font-bold transition-all shadow-md shadow-red-500/10"
                >
                  Yes, Remove
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AdminDoctorCrud;
