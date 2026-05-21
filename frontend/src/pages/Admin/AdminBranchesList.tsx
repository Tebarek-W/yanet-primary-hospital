import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, Plus, Edit3, Trash2, Search, RefreshCw, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE } from '../../utils/api';

interface Branch {
  slug: string;
  name: string;
  nameAm: string;
  city: string;
  cityAm: string;
  address: string;
  addressAm: string;
  phone: string;
  email: string;
  image: string;
}

const AdminBranchesList: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const fetchBranches = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/branches`);
      if (!response.ok) throw new Error('Failed to fetch branches from API');
      const data = await response.json();
      setBranches(data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleDelete = async (slug: string) => {
    if (!window.confirm(`Are you sure you want to delete branch "${slug}"?`)) return;

    try {
      const response = await fetch(`${API_BASE}/branches/${slug}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setSuccessMsg('Branch deleted successfully.');
        setTimeout(() => setSuccessMsg(''), 3000);
        fetchBranches();
      } else {
        const errData = await response.json();
        alert(errData.message || 'Failed to delete branch.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to the server to delete branch.');
    }
  };

  const filteredBranches = branches.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.nameAm.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary" />
            Manage Hospital Branches
          </h2>
          <p className="text-sm text-gray-500 mt-1">Add, update, or remove regional hospital branches dynamically.</p>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button 
            onClick={fetchBranches}
            className="w-11 h-11 bg-gray-50 hover:bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 transition-colors border border-gray-100"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          
          <Link 
            to="/admin/branches/new"
            className="btn-primary !px-5 flex-1 sm:flex-none flex items-center justify-center gap-2 text-sm font-bold py-3"
          >
            <Plus className="w-4 h-4" />
            Add New Branch
          </Link>
        </div>
      </div>

      {successMsg && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-2xl flex items-center gap-3 font-semibold"
        >
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          {successMsg}
        </motion.div>
      )}

      {/* Filter and Search */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text"
            placeholder="Search branches by name, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-800 text-sm"
          />
        </div>
        <div className="text-xs text-gray-400 font-bold ml-auto uppercase tracking-wider">
          Total branches: <span className="text-primary text-sm font-extrabold">{filteredBranches.length}</span>
        </div>
      </div>

      {/* Grid List */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-500 font-semibold">Loading branches data...</p>
        </div>
      ) : filteredBranches.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-800">No branches found</h3>
          <p className="text-gray-400 text-sm mt-1">Try changing your search query or add a new branch to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredBranches.map((branch) => (
              <motion.div
                layout
                key={branch.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl border border-gray-150 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Branch cover image */}
                  <div className="relative h-44 overflow-hidden bg-gray-100">
                    <img 
                      src={branch.image || "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=600&auto=format&fit=crop"} 
                      alt={branch.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-4 left-4 bg-primary text-white font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full shadow">
                      {branch.city}
                    </div>
                  </div>

                  {/* Branch detail details */}
                  <div className="p-6">
                    <h3 className="text-lg font-extrabold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                      {branch.name}
                    </h3>
                    <p className="text-xs text-gray-400 font-bold mt-1 Amharic">{branch.nameAm}</p>

                    <div className="mt-4 pt-4 border-t border-gray-50 space-y-2.5 text-xs text-gray-500 font-medium">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{branch.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-primary shrink-0" />
                        <span>{branch.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary shrink-0" />
                        <span className="truncate">{branch.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="px-6 pb-6 pt-2 flex items-center gap-2 mt-auto">
                  <button
                    onClick={() => navigate(`/admin/branches/edit/${branch.slug}`)}
                    className="flex-1 bg-gray-50 hover:bg-primary/10 text-gray-700 hover:text-primary font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 transition-all border border-gray-150"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Edit Details
                  </button>
                  <button
                    onClick={() => handleDelete(branch.slug)}
                    className="bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-600 p-3 rounded-xl transition-all border border-gray-150 hover:border-red-100"
                    title="Delete branch"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default AdminBranchesList;
