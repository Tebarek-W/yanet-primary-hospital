import React from 'react';
import { 
  Activity, Calendar, FileText, Pill, MessageSquare, 
  Settings, LogOut, Menu, User
} from 'lucide-react';

interface PortalSidebarProps {
  activeTab: 'overview' | 'appointments' | 'records' | 'prescriptions' | 'messages' | 'settings';
  setActiveTab: (tab: any) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  logout: () => void;
  appointmentsCount: number;
  userName: string;
}

export const PortalSidebar: React.FC<PortalSidebarProps> = ({
  activeTab,
  setActiveTab,
  sidebarCollapsed,
  setSidebarCollapsed,
  logout,
  appointmentsCount,
  userName
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'appointments', label: 'Appointments', icon: Calendar, badge: appointmentsCount > 0 ? appointmentsCount.toString() : undefined },
    { id: 'records', label: 'Medical Records', icon: FileText, badge: 'New' },
    { id: 'prescriptions', label: 'Medications', icon: Pill },
    { id: 'messages', label: 'Messaging', icon: MessageSquare, badge: 'Live' },
    { id: 'settings', label: 'Portal Settings', icon: Settings },
  ];

  return (
    <aside 
      className={`hidden md:flex flex-col justify-between shrink-0 h-screen sticky top-0 bg-secondary border-r border-slate-800 transition-all duration-300 z-30 ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div>
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-800">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-poppins font-extrabold shrink-0 shadow-sm">
              <span>Y</span>
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col text-left leading-none">
                <span className="text-sm font-bold font-poppins text-white">Yanet Portal</span>
                <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">Primary Clinic</span>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 hover:bg-slate-800 rounded-md text-slate-400 hover:text-white transition-colors"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

        {/* Minimalist Patient Card */}
        {!sidebarCollapsed ? (
          <div className="m-4 p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-7.5 h-7.5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                {userName.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="overflow-hidden">
                <h4 className="text-xs font-bold text-white truncate font-poppins">{userName}</h4>
                <p className="text-[9.5px] text-slate-500 font-medium mt-0.5">Medical ID: YH-90210</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="my-5 mx-auto w-9 h-9 bg-slate-900 text-primary rounded-full flex items-center justify-center font-bold text-xs border border-slate-800">
            {userName.split(' ').map(n => n[0]).join('')}
          </div>
        )}

        {/* Sidebar Nav links */}
        <nav className="px-2.5 space-y-1 mt-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`flex items-center w-full rounded-lg transition-all font-semibold text-xs py-2.5 px-3.5 border border-transparent ${
                  isActive 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                } ${sidebarCollapsed ? 'justify-center px-0' : 'gap-3.5 text-left'}`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {!sidebarCollapsed && (
                  <div className="flex-1 flex justify-between items-center text-left">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className={`text-[8.5px] font-bold px-1.5 py-0.5 rounded ${
                        isActive 
                          ? 'bg-slate-900 text-primary font-extrabold'
                          : item.badge === 'New' || item.badge === 'Live'
                          ? 'bg-primary text-white font-extrabold'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout container */}
      <div className="p-2.5 border-t border-slate-800">
        <button
          onClick={logout}
          className={`flex items-center w-full rounded-lg transition-colors font-semibold text-xs py-2.5 px-3.5 text-red-400 hover:bg-red-950/20 ${sidebarCollapsed ? 'justify-center px-0' : 'gap-3.5 text-left'}`}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!sidebarCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};
