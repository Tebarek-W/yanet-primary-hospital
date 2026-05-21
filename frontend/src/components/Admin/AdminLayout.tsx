import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Home,
  Info,
  Stethoscope,
  MapPin,
  Phone,
  Menu,
  X,
  Bell,
  LogOut,
  ChevronRight,
  FileText,
  Users,
  Compass,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const location = useLocation();
  const navigate = useNavigate();
  const { /* user */ } = useAuth(); // For mock user display if needed

  const navigation = [
    { name: 'Dashboard Overview', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Home Page', path: '/admin/pages/home', icon: Home },
    { name: 'About Us', path: '/admin/pages/about', icon: Info },
    { name: 'Services', path: '/admin/pages/services', icon: Stethoscope },
    { name: 'Branches Page Settings', path: '/admin/pages/branches', icon: MapPin },
    { name: 'Manage Branches', path: '/admin/branches', icon: MapPin },
    { name: 'Contact', path: '/admin/pages/contact', icon: Phone },
    { name: 'Blog & News', path: '/admin/pages/blog', icon: FileText },
    { name: 'Doctors', path: '/admin/pages/doctors', icon: Users },
    { name: 'Virtual Tour', path: '/admin/pages/virtual-tour', icon: Compass },
    { name: 'Careers', path: '/admin/pages/careers', icon: Briefcase },
  ];

return (
  <div className="flex h-screen bg-[#F4F8FB] overflow-hidden relative font-sans">

    {/* Mobile Sidebar Overlay */}
    {isSidebarOpen && (
      <div 
        className="fixed inset-0 bg-secondary/40 backdrop-blur-sm z-40 lg:hidden transition-all duration-300"
        onClick={() => setIsSidebarOpen(false)}
      />
    )}

    {/* Sidebar */}
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0F172A] border-r border-slate-800/80 transition-transform duration-300 transform shrink-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="flex items-center justify-between h-20 px-6 bg-[#0F172A] border-b border-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center font-black text-lg text-white shadow-lg shadow-primary/20">
            Y
          </div>
          <div>
            <h2 className="text-lg font-black text-white leading-tight tracking-tight">Yanet Admin</h2>
            <p className="text-[10px] text-slate-400 tracking-widest uppercase font-bold">CMS Dashboard</p>
          </div>
        </div>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden text-slate-400 hover:text-white hover:bg-slate-800/50 p-2 rounded-xl transition-all"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="px-4 py-6 space-y-1 overflow-y-auto h-[calc(100vh-80px)] custom-scrollbar">
        <p className="px-4 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-4">Website Pages</p>

        {navigation.map((item) => {
          const isActive = item.exact
            ? location.pathname === item.path
            : location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 1024) setIsSidebarOpen(false);
              }}
              className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group ${isActive
                  ? 'bg-primary text-white font-bold shadow-md shadow-primary/10'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100 font-medium'
                }`}
            >
              <div className="flex items-center gap-3.5">
                <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
                <span className="text-sm">{item.name}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4 text-white opacity-60" />}
            </NavLink>
          );
        })}
      </div>
    </aside>

    {/* Main Content Area */}
    <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">

      {/* Top Header */}
      <header className="h-20 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 z-30 relative shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 text-gray-500 hover:text-primary rounded-xl hover:bg-primary/5 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-extrabold text-gray-900 hidden sm:block tracking-tight">
            Content Management
          </h1>
        </div>

        <div className="flex items-center gap-4 lg:gap-6">
          <button className="relative p-2 text-gray-400 hover:text-primary transition-colors hover:bg-primary/5 rounded-xl">
            <Bell className="w-6 h-6" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          <div className="h-8 w-px bg-gray-200"></div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden shadow-inner">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100"
                alt="Admin"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:block text-right mr-2">
              <p className="text-sm font-bold text-gray-900 leading-tight">Admin User</p>
              <p className="text-[11px] text-gray-500 font-semibold tracking-wide">WEB MANAGER</p>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('yanet_admin_auth');
                navigate('/admin/login');
              }}
              className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
              title="Log Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Dynamic Page Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white p-6 lg:p-8 flex flex-col">
        <div className="w-full flex-1 flex flex-col">
          <Outlet />
        </div>
      </main>

    </div>
  </div>
);
};

export default AdminLayout;
