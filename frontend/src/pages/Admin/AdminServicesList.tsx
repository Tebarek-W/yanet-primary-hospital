import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus, Edit2, Trash2, Search, RefreshCw, CheckCircle2, AlertTriangle,
  Stethoscope, HeartPulse, Activity, Brain, Baby, Eye, FlaskConical, Pill, ShieldCheck, X, Save
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../utils/api';

interface Service {
  slug: string;
  category: 'department' | 'service';
  iconName: string;
  title: string;
  titleAm: string;
  desc: string;
  descAm: string;
  fullDesc: string;
  fullDescAm: string;
  specialty: string;
  treatments: string[];
  treatmentsAm: string[];
  equipment: string[];
  equipmentAm: string[];
}

const ICON_OPTIONS = ['HeartPulse','Activity','Stethoscope','Brain','Baby','Eye','FlaskConical','Pill','ShieldCheck','AlertCircle'];
const SPECIALTY_OPTIONS = ['Emergency','General','Cardiology','Pediatrics','Surgery','Diagnostics','Neurology','Ophthalmology'];

const getIcon = (name: string) => {
  const cls = 'w-5 h-5';
  switch (name) {
    case 'HeartPulse': return <HeartPulse className={cls} />;
    case 'Activity': return <Activity className={cls} />;
    case 'Brain': return <Brain className={cls} />;
    case 'Baby': return <Baby className={cls} />;
    case 'Eye': return <Eye className={cls} />;
    case 'FlaskConical': return <FlaskConical className={cls} />;
    case 'Pill': return <Pill className={cls} />;
    case 'ShieldCheck': return <ShieldCheck className={cls} />;
    default: return <Stethoscope className={cls} />;
  }
};

const emptyService = (): Partial<Service> => ({
  slug: '', category: 'department', iconName: 'Stethoscope',
  title: '', titleAm: '', desc: '', descAm: '',
  fullDesc: '', fullDescAm: '', specialty: 'General',
  treatments: [], treatmentsAm: [], equipment: [], equipmentAm: []
});

const AdminServicesList: React.FC = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<Service> | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [modalTab, setModalTab] = useState<'basic' | 'content' | 'lists'>('basic');

  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const data = await api.services.getAll();
      setServices(Array.isArray(data) ? data : []);
    } catch { setServices([]); }
    finally { setIsLoading(false); }
  };

  useEffect(() => { fetchServices(); }, []);

  const openAdd = () => {
    setEditing(emptyService());
    setIsEditMode(false);
    setModalTab('basic');
    setIsModalOpen(true);
  };

  const openEdit = (s: Service) => {
    setEditing(JSON.parse(JSON.stringify(s)));
    setIsEditMode(true);
    setModalTab('basic');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing?.slug || !editing?.title) { showToast('Slug and title are required.', 'error'); return; }
    setIsSaving(true);
    try {
      if (isEditMode) {
        await api.services.update(editing.slug!, editing);
        showToast(`Service "${editing.title}" updated.`);
      } else {
        await api.services.create(editing);
        showToast(`Service "${editing.title}" created.`);
      }
      setIsModalOpen(false);
      fetchServices();
    } catch { showToast('Failed to save service.', 'error'); }
    finally { setIsSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.services.delete(deleteTarget.slug);
      showToast(`"${deleteTarget.title}" deleted.`);
      setDeleteTarget(null);
      fetchServices();
    } catch { showToast('Failed to delete service.', 'error'); }
  };

  const updateList = (field: keyof Service, idx: number, val: string) => {
    if (!editing) return;
    const arr = [...((editing[field] as string[]) || [])];
    arr[idx] = val;
    setEditing({ ...editing, [field]: arr });
  };
  const addListItem = (field: keyof Service) => {
    if (!editing) return;
    setEditing({ ...editing, [field]: [...((editing[field] as string[]) || []), ''] });
  };
  const removeListItem = (field: keyof Service, idx: number) => {
    if (!editing) return;
    const arr = [...((editing[field] as string[]) || [])];
    arr.splice(idx, 1);
    setEditing({ ...editing, [field]: arr });
  };

  const filtered = services.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 w-full flex-1">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className={`fixed bottom-6 right-6 z-50 px-5 py-4 rounded-2xl shadow-xl flex items-center gap-3 font-bold text-sm border ${toast.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'}`}>
            {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <AlertTriangle className="w-5 h-5 text-rose-500" />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-100">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-primary" /> Manage Medical Services
          </h2>
          <p className="text-sm text-gray-500 mt-1">Add, edit, or remove hospital departments and support services.</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button onClick={fetchServices} className="w-11 h-11 bg-gray-50 hover:bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 border border-gray-100">
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button onClick={openAdd} className="btn-primary !px-5 flex-1 sm:flex-none flex items-center justify-center gap-2 text-sm font-bold py-3">
            <Plus className="w-4 h-4" /> Add Service
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center py-2">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input type="text" placeholder="Search by title or specialty..." value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50/70 border border-gray-200/80 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm" />
        </div>
        <div className="text-xs text-gray-400 font-bold ml-auto uppercase tracking-wider">
          Total: <span className="text-primary text-sm font-extrabold">{filtered.length}</span>
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-500 font-semibold">Loading services...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 border border-gray-100 rounded-3xl">
          <Stethoscope className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-800">No services found</h3>
          <p className="text-gray-400 text-sm mt-1">Add a new service to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filtered.map(s => (
              <motion.div key={s.slug} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="bg-white rounded-3xl border border-gray-150 transition-all duration-300 p-6 flex flex-col justify-between group">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                      {getIcon(s.iconName)}
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${s.category === 'department' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                      {s.category}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-gray-900 text-base group-hover:text-primary transition-colors">{s.title}</h3>
                  <p className="text-xs text-gray-400 font-bold mt-0.5">{s.titleAm}</p>
                  <p className="text-xs text-gray-500 mt-3 leading-relaxed line-clamp-2">{s.desc}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{s.specialty}</span>
                    <span className="text-[10px] text-gray-400">{s.treatments?.length || 0} treatments</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-5 pt-4 border-t border-gray-50">
                  <button onClick={() => openEdit(s)}
                    className="flex-1 bg-gray-50 hover:bg-primary/10 text-gray-700 hover:text-primary font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all border border-gray-100">
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button onClick={() => setDeleteTarget(s)}
                    className="bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-600 p-2.5 rounded-xl transition-all border border-gray-100">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && editing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto py-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative z-10">
              {/* Modal Header */}
              <div className="px-6 py-5 bg-gray-50 border-b border-gray-100 flex items-center justify-between shrink-0">
                <h3 className="font-extrabold text-gray-900 text-lg">{isEditMode ? 'Edit Service' : 'Add New Service'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="w-9 h-9 bg-white border border-gray-100 hover:bg-red-500 hover:text-white rounded-full flex items-center justify-center transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {/* Tabs */}
              <div className="px-6 bg-white border-b border-gray-100 flex gap-2 py-2 shrink-0 overflow-x-auto">
                {(['basic', 'content', 'lists'] as const).map(tab => (
                  <button key={tab} onClick={() => setModalTab(tab)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${modalTab === tab ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}>
                    {tab === 'basic' ? '1. Basic Info' : tab === 'content' ? '2. Descriptions' : '3. Treatments & Equipment'}
                  </button>
                ))}
              </div>
              {/* Form */}
              <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-5 custom-scrollbar">
                {modalTab === 'basic' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest">Slug (URL ID) *</label>
                      <input type="text" required disabled={isEditMode} value={editing.slug || ''} onChange={e => setEditing({ ...editing, slug: e.target.value })}
                        placeholder="e.g. cardiology" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm font-semibold text-gray-800 disabled:opacity-50" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest">Category *</label>
                      <select value={editing.category || 'department'} onChange={e => setEditing({ ...editing, category: e.target.value as any })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm font-bold text-gray-800">
                        <option value="department">Medical Department</option>
                        <option value="service">Support Service</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest">Title (English) *</label>
                      <input type="text" required value={editing.title || ''} onChange={e => setEditing({ ...editing, title: e.target.value })}
                        placeholder="e.g. Cardiology" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm font-semibold text-gray-800" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest">Title (Amharic) *</label>
                      <input type="text" required value={editing.titleAm || ''} onChange={e => setEditing({ ...editing, titleAm: e.target.value })}
                        placeholder="e.g. የልብ ሕክምና" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm font-semibold text-gray-800" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest">Icon Name</label>
                      <select value={editing.iconName || 'Stethoscope'} onChange={e => setEditing({ ...editing, iconName: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm font-bold text-gray-800">
                        {ICON_OPTIONS.map(i => <option key={i} value={i}>{i}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest">Specialty</label>
                      <select value={editing.specialty || 'General'} onChange={e => setEditing({ ...editing, specialty: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm font-bold text-gray-800">
                        {SPECIALTY_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                )}
                {modalTab === 'content' && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest">Short Description (English)</label>
                        <textarea rows={3} value={editing.desc || ''} onChange={e => setEditing({ ...editing, desc: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm font-semibold text-gray-800 resize-none" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest">Short Description (Amharic)</label>
                        <textarea rows={3} value={editing.descAm || ''} onChange={e => setEditing({ ...editing, descAm: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm font-semibold text-gray-800 resize-none" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest">Full Description (English)</label>
                      <textarea rows={5} value={editing.fullDesc || ''} onChange={e => setEditing({ ...editing, fullDesc: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm font-semibold text-gray-800 resize-none custom-scrollbar" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest">Full Description (Amharic)</label>
                      <textarea rows={5} value={editing.fullDescAm || ''} onChange={e => setEditing({ ...editing, fullDescAm: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm font-semibold text-gray-800 resize-none custom-scrollbar" />
                    </div>
                  </div>
                )}
                {modalTab === 'lists' && (
                  <div className="space-y-8">
                    {([
                      { field: 'treatments' as keyof Service, label: 'Treatments (English)', placeholder: 'e.g. Cardiac Surgery' },
                      { field: 'treatmentsAm' as keyof Service, label: 'Treatments (Amharic)', placeholder: 'e.g. የልብ ቀዶ ጥገና' },
                      { field: 'equipment' as keyof Service, label: 'Equipment (English)', placeholder: 'e.g. ECG Machine' },
                      { field: 'equipmentAm' as keyof Service, label: 'Equipment (Amharic)', placeholder: 'e.g. የECG ማሽን' },
                    ]).map(({ field, label, placeholder }) => (
                      <div key={field} className="space-y-3">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                          <h4 className="font-extrabold text-sm text-gray-800">{label}</h4>
                          <button type="button" onClick={() => addListItem(field)}
                            className="text-xs text-primary font-bold hover:underline flex items-center gap-1">
                            <Plus className="w-3.5 h-3.5" /> Add
                          </button>
                        </div>
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                          {((editing[field] as string[]) || []).map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <input type="text" value={item} placeholder={placeholder}
                                onChange={e => updateList(field, idx, e.target.value)}
                                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:border-primary outline-none" />
                              <button type="button" onClick={() => removeListItem(field, idx)}
                                className="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                          {((editing[field] as string[]) || []).length === 0 && (
                            <p className="text-[11px] text-gray-400 text-center py-4 font-bold">No items yet. Click Add.</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </form>
              {/* Footer */}
              <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3 shrink-0">
                <button type="button" onClick={() => setIsModalOpen(false)}
                  className="px-5 py-3 rounded-2xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 text-sm font-extrabold transition-colors">Cancel</button>
                <button type="button" onClick={handleSave} disabled={isSaving}
                  className="btn-primary !px-6 flex items-center gap-2 text-sm font-extrabold disabled:opacity-70">
                  {isSaving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                  {isSaving ? 'Saving...' : 'Save Service'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirm */}
      <AnimatePresence>
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setDeleteTarget(null)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="bg-white border border-gray-100 shadow-2xl rounded-3xl w-full max-w-md p-6 relative z-10 space-y-4">
              <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-gray-900 text-lg">Delete service?</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Remove <span className="font-bold text-gray-900">"{deleteTarget.title}"</span>? This cannot be undone.
                </p>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setDeleteTarget(null)} className="flex-1 py-3 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-xl text-xs font-bold border border-gray-200">Cancel</button>
                <button onClick={handleDelete} className="flex-1 py-3 bg-red-500 text-white hover:bg-red-600 rounded-xl text-xs font-bold shadow-md">Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminServicesList;
