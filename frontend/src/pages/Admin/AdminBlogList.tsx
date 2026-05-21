import React, { useState, useEffect } from 'react';
import {
  Plus, Edit2, Trash2, Search, RefreshCw, CheckCircle2, AlertTriangle,
  FileText, X, Save, Calendar, User, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../utils/api';

interface BlogPost {
  id: string;
  categoryEn: string;
  categoryAm: string;
  titleEn: string;
  titleAm: string;
  excerptEn: string;
  excerptAm: string;
  image: string;
  dateEn: string;
  dateAm: string;
  authorId: string;
  authorNameEn: string;
  authorNameAm: string;
  readMin: number;
  contentEn: string;
  contentAm: string;
}

const CATEGORIES_EN = ['Cardiology', 'Nutrition', 'Pediatrics', 'Surgery', 'Mental Health', 'Preventive Care', 'General Health', 'Hospital News'];

const emptyPost = (): Partial<BlogPost> => ({
  id: `post-${Date.now()}`,
  categoryEn: 'General Health', categoryAm: 'አጠቃላይ ጤና',
  titleEn: '', titleAm: '',
  excerptEn: '', excerptAm: '',
  image: '', dateEn: '', dateAm: '',
  authorId: '', authorNameEn: '', authorNameAm: '',
  readMin: 5, contentEn: '', contentAm: ''
});

const AdminBlogList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<BlogPost> | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [modalTab, setModalTab] = useState<'meta' | 'content'>('meta');
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const data = await api.blog.getAll();
      setPosts(Array.isArray(data) ? data : []);
    } catch { setPosts([]); }
    finally { setIsLoading(false); }
  };

  useEffect(() => { fetchPosts(); }, []);

  const openAdd = () => {
    setEditing(emptyPost());
    setIsEditMode(false);
    setModalTab('meta');
    setIsModalOpen(true);
  };

  const openEdit = (p: BlogPost) => {
    setEditing(JSON.parse(JSON.stringify(p)));
    setIsEditMode(true);
    setModalTab('meta');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing?.titleEn) { showToast('English title is required.', 'error'); return; }
    setIsSaving(true);
    try {
      if (isEditMode && editing.id) {
        await api.blog.update(editing.id, editing);
        showToast(`Post "${editing.titleEn}" updated.`);
      } else {
        await api.blog.create(editing);
        showToast(`Post "${editing.titleEn}" created.`);
      }
      setIsModalOpen(false);
      fetchPosts();
    } catch { showToast('Failed to save post.', 'error'); }
    finally { setIsSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.blog.delete(deleteTarget.id);
      showToast(`"${deleteTarget.titleEn}" deleted.`);
      setDeleteTarget(null);
      fetchPosts();
    } catch { showToast('Failed to delete post.', 'error'); }
  };

  const filtered = posts.filter(p =>
    p.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.categoryEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.authorNameEn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const inputCls = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm font-semibold text-gray-800";
  const labelCls = "block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1.5";

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
            <FileText className="w-6 h-6 text-primary" /> Manage Blog Posts
          </h2>
          <p className="text-sm text-gray-500 mt-1">Create, edit, or remove health articles and hospital news.</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button onClick={fetchPosts} className="w-11 h-11 bg-gray-50 hover:bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 border border-gray-100">
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button onClick={openAdd} className="btn-primary !px-5 flex-1 sm:flex-none flex items-center justify-center gap-2 text-sm font-bold py-3">
            <Plus className="w-4 h-4" /> New Post
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center py-2">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input type="text" placeholder="Search by title, category, or author..." value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50/70 border border-gray-200/80 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm" />
        </div>
        <div className="text-xs text-gray-400 font-bold ml-auto uppercase tracking-wider">
          Total: <span className="text-primary text-sm font-extrabold">{filtered.length}</span>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-500 font-semibold">Loading posts...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 border border-gray-100 rounded-3xl">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-800">No posts found</h3>
          <p className="text-gray-400 text-sm mt-1">Create your first blog post to get started.</p>
        </div>
      ) : (
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-widest text-gray-400">Article</th>
                  <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-widest text-gray-400">Category</th>
                  <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-widest text-gray-400">Author</th>
                  <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-widest text-gray-400">Date</th>
                  <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-widest text-gray-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <AnimatePresence initial={false}>
                  {filtered.map(post => (
                    <motion.tr key={post.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-10 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                            {post.image ? (
                              <img src={post.image} alt={post.titleEn} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <FileText className="w-5 h-5" />
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-extrabold text-gray-900 group-hover:text-primary transition-colors text-sm line-clamp-1">{post.titleEn}</h4>
                            <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{post.titleAm}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-primary/10 text-primary text-[11px] font-black rounded-xl uppercase tracking-wider">{post.categoryEn}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                          <User className="w-3.5 h-3.5 text-gray-400" />
                          {post.authorNameEn}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          {post.dateEn}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                          <Clock className="w-3 h-3" /> {post.readMin} min read
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openEdit(post)}
                            className="w-9 h-9 bg-gray-50 text-gray-600 hover:bg-primary hover:text-white rounded-xl flex items-center justify-center transition-all">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => setDeleteTarget(post)}
                            className="w-9 h-9 bg-gray-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl flex items-center justify-center transition-all">
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
              <div className="px-6 py-5 bg-gray-50 border-b border-gray-100 flex items-center justify-between shrink-0">
                <h3 className="font-extrabold text-gray-900 text-lg">{isEditMode ? 'Edit Blog Post' : 'New Blog Post'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="w-9 h-9 bg-white border border-gray-100 hover:bg-red-500 hover:text-white rounded-full flex items-center justify-center transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="px-6 bg-white border-b border-gray-100 flex gap-2 py-2 shrink-0">
                {(['meta', 'content'] as const).map(tab => (
                  <button key={tab} onClick={() => setModalTab(tab)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${modalTab === tab ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}>
                    {tab === 'meta' ? '1. Post Details' : '2. Article Content'}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-5 custom-scrollbar">
                {modalTab === 'meta' && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className={labelCls}>Title (English) *</label>
                        <input type="text" required value={editing.titleEn || ''} onChange={e => setEditing({ ...editing, titleEn: e.target.value })} className={inputCls} placeholder="Article title in English" />
                      </div>
                      <div>
                        <label className={labelCls}>Title (Amharic) *</label>
                        <input type="text" required value={editing.titleAm || ''} onChange={e => setEditing({ ...editing, titleAm: e.target.value })} className={inputCls} placeholder="የጽሑፉ ርዕስ" />
                      </div>
                      <div>
                        <label className={labelCls}>Category (English)</label>
                        <select value={editing.categoryEn || 'General Health'} onChange={e => setEditing({ ...editing, categoryEn: e.target.value })} className={inputCls}>
                          {CATEGORIES_EN.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className={labelCls}>Category (Amharic)</label>
                        <input type="text" value={editing.categoryAm || ''} onChange={e => setEditing({ ...editing, categoryAm: e.target.value })} className={inputCls} placeholder="ምድብ" />
                      </div>
                      <div>
                        <label className={labelCls}>Author Name (English)</label>
                        <input type="text" value={editing.authorNameEn || ''} onChange={e => setEditing({ ...editing, authorNameEn: e.target.value })} className={inputCls} placeholder="Dr. Dawit Yilma" />
                      </div>
                      <div>
                        <label className={labelCls}>Author Name (Amharic)</label>
                        <input type="text" value={editing.authorNameAm || ''} onChange={e => setEditing({ ...editing, authorNameAm: e.target.value })} className={inputCls} placeholder="ዶ/ር ዳዊት ይልማ" />
                      </div>
                      <div>
                        <label className={labelCls}>Author ID (links to doctor profile)</label>
                        <input type="text" value={editing.authorId || ''} onChange={e => setEditing({ ...editing, authorId: e.target.value })} className={inputCls} placeholder="e.g. 1" />
                      </div>
                      <div>
                        <label className={labelCls}>Read Time (minutes)</label>
                        <input type="number" min={1} value={editing.readMin || 5} onChange={e => setEditing({ ...editing, readMin: parseInt(e.target.value) })} className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls}>Date (English)</label>
                        <input type="text" value={editing.dateEn || ''} onChange={e => setEditing({ ...editing, dateEn: e.target.value })} className={inputCls} placeholder="May 21, 2026" />
                      </div>
                      <div>
                        <label className={labelCls}>Date (Amharic)</label>
                        <input type="text" value={editing.dateAm || ''} onChange={e => setEditing({ ...editing, dateAm: e.target.value })} className={inputCls} placeholder="ግንቦት 21, 2026" />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Cover Image URL</label>
                      <input type="text" value={editing.image || ''} onChange={e => setEditing({ ...editing, image: e.target.value })} className={inputCls} placeholder="https://images.unsplash.com/..." />
                      {editing.image && (
                        <div className="mt-2 rounded-xl overflow-hidden h-28 border border-gray-100">
                          <img src={editing.image} alt="preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className={labelCls}>Excerpt (English)</label>
                        <textarea rows={3} value={editing.excerptEn || ''} onChange={e => setEditing({ ...editing, excerptEn: e.target.value })} className={`${inputCls} resize-none`} placeholder="Short summary of the article..." />
                      </div>
                      <div>
                        <label className={labelCls}>Excerpt (Amharic)</label>
                        <textarea rows={3} value={editing.excerptAm || ''} onChange={e => setEditing({ ...editing, excerptAm: e.target.value })} className={`${inputCls} resize-none`} placeholder="አጭር ማጠቃለያ..." />
                      </div>
                    </div>
                  </div>
                )}
                {modalTab === 'content' && (
                  <div className="space-y-5">
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-xs text-blue-700 font-medium">
                      Use Markdown: <code className="bg-blue-100 px-1 rounded"># H1</code>, <code className="bg-blue-100 px-1 rounded">## H2</code>, <code className="bg-blue-100 px-1 rounded">* bullet</code>, <code className="bg-blue-100 px-1 rounded">**bold**</code>
                    </div>
                    <div>
                      <label className={labelCls}>Full Article Content (English)</label>
                      <textarea rows={14} value={editing.contentEn || ''} onChange={e => setEditing({ ...editing, contentEn: e.target.value })}
                        className={`${inputCls} resize-none custom-scrollbar font-mono text-xs`} placeholder="# Article Title&#10;&#10;## Section 1&#10;Content here..." />
                    </div>
                    <div>
                      <label className={labelCls}>Full Article Content (Amharic)</label>
                      <textarea rows={14} value={editing.contentAm || ''} onChange={e => setEditing({ ...editing, contentAm: e.target.value })}
                        className={`${inputCls} resize-none custom-scrollbar font-mono text-xs`} placeholder="# ርዕስ&#10;&#10;## ክፍል 1&#10;ይዘት..." />
                    </div>
                  </div>
                )}
              </form>
              <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3 shrink-0">
                <button type="button" onClick={() => setIsModalOpen(false)}
                  className="px-5 py-3 rounded-2xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 text-sm font-extrabold">Cancel</button>
                <button type="button" onClick={handleSave} disabled={isSaving}
                  className="btn-primary !px-6 flex items-center gap-2 text-sm font-extrabold disabled:opacity-70">
                  {isSaving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                  {isSaving ? 'Saving...' : 'Publish Post'}
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
                <h3 className="font-extrabold text-gray-900 text-lg">Delete post?</h3>
                <p className="text-xs text-gray-500 mt-1">Remove <span className="font-bold text-gray-900">"{deleteTarget.titleEn}"</span>? This cannot be undone.</p>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setDeleteTarget(null)} className="flex-1 py-3 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-xl text-xs font-bold border border-gray-200">Cancel</button>
                <button onClick={handleDelete} className="flex-1 py-3 bg-red-500 text-white hover:bg-red-600 rounded-xl text-xs font-bold">Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminBlogList;
