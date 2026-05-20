import React from 'react';
import { 
  Activity, FileText, MessageSquare, 
  LogOut, Menu
} from 'lucide-react';

interface StaffSidebarProps {
  activeTab: 'overview' | 'blogs' | 'messages';
  setActiveTab: (tab: any) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  logout: () => void;
  messagesCount: number;
}

export const StaffSidebar: React.FC<StaffSidebarProps> = ({
  activeTab,
  setActiveTab,
  sidebarCollapsed,
  setSidebarCollapsed,
  logout,
  messagesCount
}) => {
  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: Activity },
    { id: 'blogs', label: 'Manage Blogs', icon: FileText, badge: 'New' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: messagesCount > 0 ? messagesCount.toString() : 'Live' },
  ];

  return (
    <aside 
      className={`hidden md:flex flex-col justify-between shrink-0 h-screen sticky top-0 bg-slate-900 border-r border-slate-800 transition-all duration-300 z-30 ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div>
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-800">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 bg-gradient-to-tr from-primary to-teal-400 rounded-lg flex items-center justify-center text-white font-poppins font-extrabold shrink-0 shadow-sm">
              <span>Y</span>
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col text-left leading-none">
                <span className="text-sm font-bold font-poppins text-white">Yanet Staff</span>
                <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">Clinical Workspace</span>
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
                          ? 'bg-slate-950 text-primary font-extrabold'
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
