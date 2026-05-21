import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Send, Trash2, Calendar, Search, Tag, Eye, Globe } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  titleAm: string;
  category: string;
  categoryAm: string;
  content: string;
  contentAm: string;
  date: string;
  image: string;
  author: string;
}

interface StaffBlogsProps {
  blogs: BlogPost[];
  onAddBlog: (blog: Omit<BlogPost, 'id' | 'date' | 'author'>) => void;
  onDeleteBlog: (id: string) => void;
  darkMode: boolean;
}

export const StaffBlogs: React.FC<StaffBlogsProps> = ({
  blogs,
  onAddBlog,
  onDeleteBlog,
  darkMode
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isWriting, setIsWriting] = useState(false);
  const [editorLang, setEditorLang] = useState<'en' | 'am'>('en');

  // Form states
  const [title, setTitle] = useState('');
  const [titleAm, setTitleAm] = useState('');
  const [category, setCategory] = useState('Medical Updates');
  const [categoryAm, setCategoryAm] = useState('የሕክምና መረጃዎች');
  const [content, setContent] = useState('');
  const [contentAm, setContentAm] = useState('');
  const [selectedImage, setSelectedImage] = useState('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800');

  // Preset medical cover images
  const sampleImages = [
    { label: 'Cardio / Clinical', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800' },
    { label: 'Wellness / Health', url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800' },
    { label: 'Medical Research', url: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&q=80&w=800' },
    { label: 'Nutrition', url: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800' }
  ];

  const categories = [
    { en: 'Medical Updates', am: 'የሕክምና መረጃዎች' },
    { en: 'Health Education', am: 'የጤና ትምህርት' },
    { en: 'Hospital News', am: 'የሆስፒታል ዜና' },
    { en: 'Community Wellness', am: 'የማኅበረሰብ ጤና' }
  ];

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEn = e.target.value;
    const catPair = categories.find(c => c.en === selectedEn);
    if (catPair) {
      setCategory(catPair.en);
      setCategoryAm(catPair.am);
    }
  };

  const handlePublishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    onAddBlog({
      title,
      titleAm,
      category,
      categoryAm,
      content,
      contentAm,
      image: selectedImage
    });

    // Reset Form
    setTitle('');
    setTitleAm('');
    setContent('');
    setContentAm('');
    setIsWriting(false);
  };

  const filteredBlogs = blogs.filter(blog => {
    const t1 = (blog.title || blog.titleEn || '').toLowerCase();
    const t2 = (blog.titleAm || '').toLowerCase();
    const cat = (blog.category || blog.categoryEn || '').toLowerCase();
    return t1.includes(searchQuery.toLowerCase()) ||
           t2.includes(searchQuery.toLowerCase()) ||
           cat.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6 text-left">
      {/* Page Title Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className={`text-lg font-bold font-poppins tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Clinic Health Blogs & Communications
          </h2>
          <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Author articles, tips, and official clinical announcements</p>
        </div>
        <button
          onClick={() => setIsWriting(!isWriting)}
          className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <FileText className="w-4 h-4" />
          <span>{isWriting ? 'View Published Blogs' : 'Compose Health Article'}</span>
        </button>
      </div>

      {/* Write Blog Panel */}
      <AnimatePresence>
        {isWriting && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`border rounded-2xl p-5 ${
              darkMode ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex justify-between items-center mb-5 border-b border-slate-800/50 pb-3">
              <h3 className={`text-xs font-bold font-poppins uppercase tracking-wider ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Compose Health Article
              </h3>
              
              {/* Language Switch */}
              <div className="flex items-center gap-1.5 bg-slate-900/60 p-1 rounded-lg border border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditorLang('en')}
                  className={`text-[9.5px] font-bold px-2.5 py-1 rounded ${
                    editorLang === 'en' ? 'bg-primary text-white' : 'text-slate-400'
                  }`}
                >
                  English View
                </button>
                <button
                  type="button"
                  onClick={() => setEditorLang('am')}
                  className={`text-[9.5px] font-bold px-2.5 py-1 rounded ${
                    editorLang === 'am' ? 'bg-primary text-white' : 'text-slate-400'
                  }`}
                >
                  አማርኛ እይታ
                </button>
              </div>
            </div>

            <form onSubmit={handlePublishSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                {/* Form left inputs */}
                <div className="md:col-span-2 space-y-4">
                  {editorLang === 'en' ? (
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Article Title (English)
                      </label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. 5 Heart-Healthy Habits"
                        className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs font-semibold focus:outline-none focus:border-primary"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Article Title (Amharic)
                      </label>
                      <input
                        type="text"
                        value={titleAm}
                        onChange={(e) => setTitleAm(e.target.value)}
                        placeholder="ምሳሌ፡ 5 ጤናማ ልምዶች ለልብ ጤንነት"
                        className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs font-semibold focus:outline-none focus:border-primary"
                      />
                    </div>
                  )}

                  {editorLang === 'en' ? (
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Body Content (English)
                      </label>
                      <textarea
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write detailed health educational parameters..."
                        className="w-full bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 text-white text-xs font-semibold focus:outline-none focus:border-primary h-52 resize-none"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Body Content (Amharic)
                      </label>
                      <textarea
                        value={contentAm}
                        onChange={(e) => setContentAm(e.target.value)}
                        placeholder="እባክዎን ዝርዝር የሕክምና ትምህርቶችን እዚህ ይጻፉ..."
                        className="w-full bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 text-white text-xs font-semibold focus:outline-none focus:border-primary h-52 resize-none"
                      />
                    </div>
                  )}
                </div>

                {/* Form Right Inputs */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Article Category
                    </label>
                    <select
                      value={category}
                      onChange={handleCategoryChange}
                      className="w-full bg-slate-900/65 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs font-semibold focus:outline-none focus:border-primary"
                    >
                      {categories.map((cat) => (
                        <option key={cat.en} value={cat.en} className="bg-slate-900 text-white">
                          {cat.en}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Cover Banner Image
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {sampleImages.map((img) => (
                        <button
                          key={img.label}
                          type="button"
                          onClick={() => setSelectedImage(img.url)}
                          className={`relative rounded-lg overflow-hidden border-2 aspect-video transition-all ${
                            selectedImage === img.url ? 'border-primary scale-[1.02] shadow-sm' : 'border-slate-800 opacity-60'
                          }`}
                        >
                          <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-slate-950/40 flex items-end p-1">
                            <span className="text-[7.5px] font-bold text-white leading-none">{img.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Warning Box */}
                  <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl">
                    <div className="flex items-start gap-2">
                      <Globe className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <p className="text-[9px] text-slate-450 leading-relaxed font-semibold">
                        Dual-language support requires both English and Amharic variations before publishing to preserve clinic standards.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3.5 border-t border-slate-800/50 pt-4 mt-2">
                <button
                  type="button"
                  onClick={() => setIsWriting(false)}
                  className={`text-[10px] font-bold px-4 py-2 rounded-xl border ${
                    darkMode ? 'border-slate-800 text-slate-450 hover:text-white' : 'border-slate-200 text-slate-650 hover:text-slate-900'
                  }`}
                >
                  Discard Draft
                </button>
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-hover text-white text-[10px] font-extrabold px-5 py-2.5 rounded-xl shadow-md flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Article</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blogs Search and Listing */}
      {!isWriting && (
        <>
          <div className={`p-4 rounded-xl border flex justify-between items-center ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <span className={`text-[11px] font-bold uppercase tracking-wider ${darkMode ? 'text-slate-350' : 'text-slate-700'}`}>
              Clinical Health Library ({filteredBlogs.length})
            </span>

            {/* Search Box */}
            <div className="relative max-w-xs w-full">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                <Search className="w-3.5 h-3.5" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full bg-slate-950/40 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-white text-[11px] font-semibold focus:outline-none focus:border-primary placeholder-slate-500"
              />
            </div>
          </div>

          {/* Blogs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBlogs.length === 0 ? (
              <div className={`p-10 rounded-2xl border text-center md:col-span-2 ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <Globe className="w-10 h-10 text-slate-500 mx-auto mb-3" />
                <h4 className="text-xs font-bold text-slate-405">No articles found</h4>
                <p className="text-[10px] text-slate-450 mt-1">Compose one using the header action!</p>
              </div>
            ) : (
              filteredBlogs.map((blog) => (
                <motion.div
                  key={blog.id}
                  layout
                  className={`rounded-2xl overflow-hidden border flex flex-col justify-between ${
                    darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <div>
                    {/* Header Image */}
                    <div className="aspect-video w-full relative overflow-hidden">
                      <img src={blog.image || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800'} alt={blog.title || blog.titleEn || ''} className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-300" />
                      <div className="absolute top-3 left-3 bg-slate-950/70 border border-slate-800/80 rounded-lg px-2.5 py-1 flex items-center gap-1.5">
                        <Tag className="w-3 h-3 text-primary" />
                        <span className="text-[9px] font-bold text-white">{blog.category || blog.categoryEn || ''}</span>
                      </div>
                    </div>

                    {/* Article Info */}
                    <div className="p-5 space-y-2">
                      <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-semibold">
                        <Calendar className="w-3 h-3" />
                        <span>{blog.date || blog.dateEn || ''}</span>
                        <span>•</span>
                        <span>By {blog.author || blog.authorNameEn || 'Doctor'}</span>
                      </div>
                      <h4 className={`text-xs md:text-sm font-bold font-poppins tracking-tight leading-snug line-clamp-2 ${
                        darkMode ? 'text-white' : 'text-slate-900'
                      }`}>
                        {blog.title || blog.titleEn || ''}
                      </h4>
                      <p className="text-[9.5px] text-slate-400 font-semibold italic mt-0.5 line-clamp-1 border-t border-slate-800/30 pt-1.5">
                        አማርኛ፡ "{blog.titleAm || ''}"
                      </p>
                      <p className="text-[10.5px] text-slate-500 font-medium leading-relaxed line-clamp-3 mt-2">
                        {blog.content || blog.contentEn || blog.excerptEn || ''}
                      </p>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className={`p-4 border-t flex justify-between items-center ${
                    darkMode ? 'bg-slate-950/20 border-slate-800/80' : 'bg-slate-50/50 border-slate-200'
                  }`}>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Eye className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-bold">Published</span>
                    </div>

                    <button
                      onClick={() => onDeleteBlog(blog.id)}
                      className="p-1.5 rounded-lg border border-transparent text-red-405 hover:bg-red-500/10 hover:border-red-500/20 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};
