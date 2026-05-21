import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileEdit, 
  Image as ImageIcon, 
  Users, 
  Eye, 
  TrendingUp, 
  Clock, 
  FileText, 
  Activity, 
  ChevronRight, 
  LayoutTemplate,
  Home,
  Info,
  Stethoscope,
  MapPin,
  Phone,
  Compass,
  Briefcase
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const stats = [
    { title: 'Total Pages', value: '12', icon: LayoutTemplate, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Recent Edits', value: '34', icon: FileEdit, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'Media Assets', value: '156', icon: ImageIcon, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Site Visitors', value: '2.4k', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const recentActivity = [
    { id: 1, action: 'Updated "Hero Banner" text', page: 'Home Page', time: '2 hours ago', icon: FileEdit, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 2, action: 'Changed Doctor Profile Image', page: 'Doctors', time: '5 hours ago', icon: ImageIcon, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 3, action: 'Added new service description', page: 'Services', time: '1 day ago', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 4, action: 'Updated branch contact number', page: 'Branches', time: '2 days ago', icon: Activity, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const quickPages = [
    { name: 'Home Page', path: '/admin/pages/home', desc: 'Hero, Services preview, Stats', icon: Home },
    { name: 'About Us', path: '/admin/pages/about', desc: 'Mission, Vision, History', icon: Info },
    { name: 'Services', path: '/admin/pages/services', desc: 'Medical departments list', icon: Stethoscope },
    { name: 'Branches Settings', path: '/admin/pages/branches', desc: 'Configure map options', icon: MapPin },
    { name: 'Manage Branches', path: '/admin/branches', desc: 'Add/edit/delete branch records', icon: MapPin },
    { name: 'Contact', path: '/admin/pages/contact', desc: 'Contact details, Hero image', icon: Phone },
    { name: 'Blog & News', path: '/admin/pages/blog', desc: 'Blog configuration', icon: FileText },
    { name: 'Doctors', path: '/admin/pages/doctors', desc: 'Directory settings', icon: Users },
    { name: 'Virtual Tour', path: '/admin/pages/virtual-tour', desc: 'Tour embed URL', icon: Compass },
    { name: 'Careers', path: '/admin/pages/careers', desc: 'Job benefits, Description', icon: Briefcase },
  ];

  return (
    <div className="flex flex-col gap-8 pb-10 w-full">
      
      {/* Welcome Banner - Premium flat minimalist typography style */}
      <div className="py-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 mb-2">Welcome to CMS Dashboard</h2>
          <p className="text-gray-500 font-medium max-w-4xl text-sm md:text-base leading-relaxed">
            Manage your hospital's digital presence with enterprise-grade control. Update pages, configure services, and monitor patient engagement from a unified interface.
          </p>
        </div>
        <Link 
          to="/" 
          target="_blank" 
          className="shrink-0 flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-900 px-5 py-3 rounded-xl font-bold transition-all border border-gray-200 text-sm shadow-sm"
        >
          <Eye className="w-4 h-4 text-gray-500" />
          View Live Site
        </Link>
      </div>

      {/* Stats Row - Flat and clean */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-b border-gray-100 pb-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex items-center gap-4 p-2"
          >
            <div className={`w-12 h-12 shrink-0 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center shadow-inner`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.title}</p>
              <h3 className="text-2xl font-black text-gray-900 mt-0.5">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Quick Edit Links - Flat Grid */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <h3 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
                <LayoutTemplate className="w-5 h-5 text-gray-500" />
                Page Management
              </h3>
              <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md">{quickPages.length} Pages</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quickPages.map((page, idx) => (
                <Link 
                  key={idx}
                  to={page.path}
                  className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50/80 transition-all border border-gray-100/60"
                >
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-200/50 group-hover:bg-white group-hover:border-gray-300 transition-colors">
                    <page.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 truncate">{page.name}</h4>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{page.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity - Timeline Structure */}
        <div className="space-y-6">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <h3 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-gray-500" />
                Audit Log
              </h3>
            </div>
            
            <div className="flex-1">
              <div className="space-y-6">
                {recentActivity.map((activity, idx) => (
                  <div key={activity.id} className="flex gap-4 relative">
                    {idx !== recentActivity.length - 1 && (
                      <div className="absolute left-[15px] top-8 bottom-[-24px] w-[2px] bg-gray-100"></div>
                    )}
                    <div className={`w-8 h-8 rounded-full ${activity.bg} ${activity.color} flex items-center justify-center shrink-0 z-10 ring-4 ring-white`}>
                      <activity.icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="pt-1.5 pb-2">
                      <p className="text-sm font-semibold text-gray-900 leading-tight">{activity.action}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{activity.page}</span>
                        <span className="text-[11px] font-medium text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {activity.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-8 border-t border-gray-100">
              <button className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-gray-700 text-xs font-bold transition-all">
                View Full Log
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
