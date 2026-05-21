import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogOut } from 'lucide-react';

// Import Modular Staff Components
import { StaffLogin } from '../../components/Staff/StaffLogin';
import { StaffSidebar } from '../../components/Staff/StaffSidebar';
import { StaffHeader } from '../../components/Staff/StaffHeader';
import { StaffOverview } from '../../components/Staff/StaffOverview';
import { StaffBlogs } from '../../components/Staff/StaffBlogs';
import { StaffMessages } from '../../components/Staff/StaffMessages';
import { API_BASE } from '../../utils/api';

interface StaffUser {
  email: string;
  name: string;
  role: string;
  avatar: string;
}

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

interface Message {
  id: string;
  sender: 'patient' | 'doctor';
  text: string;
  time: string;
}

interface ChatChannel {
  id: string;
  patientName: string;
  age: number;
  avatar: string;
  symptoms: string;
  lastActive: string;
  unread: boolean;
  history: Message[];
}



export const StaffPortal: React.FC = () => {
  const [staff, setStaff] = useState<StaffUser | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'blogs' | 'messages'>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // Default to light mode

  // Notifications state
  const [notifications, setNotifications] = useState([
    { id: 'n1', title: 'New Lab Request Received', message: 'Patient Abebe Kebede requested review for CBC panel.', time: '10 mins ago', read: false },
    { id: 'n2', title: 'Telemetry Alarm Confirmed', message: 'Martha Biru logs normal blood pressures.', time: '2 hours ago', read: true }
  ]);



  // Blogs state
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  // Chat Channels state
  const [channels, setChannels] = useState<ChatChannel[]>([]);

  // Read staff user from localStorage on mount and fetch data
  useEffect(() => {
    const storedStaff = localStorage.getItem('yanet_staff_user');
    if (storedStaff) {
      setStaff(JSON.parse(storedStaff));
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('yanet_staff_token');
    if (!token) return;

    try {
      // Fetch blogs authored by this doctor
      const blogsRes = await fetch(`${API_BASE}/blogs/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (blogsRes.ok) {
        const blogsData = await blogsRes.json();
        const currentStaffStr = localStorage.getItem('yanet_staff_user');
        const currentStaff = currentStaffStr ? JSON.parse(currentStaffStr) : null;
        const formattedBlogs = blogsData.map((b: any) => ({
          ...b,
          author: b.author || currentStaff?.name || 'Consultant Doctor'
        }));
        setBlogs(formattedBlogs);
      }

      // Fetch message channels for this doctor
      await fetchChannels();
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
  };

  const fetchChannels = async () => {
    const token = localStorage.getItem('yanet_staff_token');
    if (!token) return;
    try {
      const channelsRes = await fetch(`${API_BASE}/messages/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (channelsRes.ok) {
        const channelsData = await channelsRes.json();
        const formattedChannels = channelsData.map((c: any) => ({
          ...c,
          id: c.id.toString(),
          history: (c.history || []).map((m: any) => ({ ...m, id: m.id.toString() }))
        }));
        setChannels(formattedChannels);
      }
    } catch (err) {
      console.error('Failed to fetch channels:', err);
    }
  };

  // Poll channels every 5 seconds if staff is logged in
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (staff) {
      interval = setInterval(() => {
        fetchChannels();
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [staff]);

  // Theme Sync on dark mode state change
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogin = (email: string, name: string, role: string, avatar: string) => {
    const userObj = { email, name, role, avatar };
    setStaff(userObj);
    localStorage.setItem('yanet_staff_user', JSON.stringify(userObj));
    fetchData(); // Fetch data upon login
  };

  const handleLogout = () => {
    setStaff(null);
    localStorage.removeItem('yanet_staff_user');
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };



  // Blog operations
  const handleAddBlog = async (newBlog: Omit<BlogPost, 'id' | 'date' | 'author'>) => {
    const token = localStorage.getItem('yanet_staff_token');
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    try {
      const res = await fetch(`${API_BASE}/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...newBlog, date })
      });
      if (res.ok) {
        const createdBlog = await res.json();
        createdBlog.author = staff?.name || 'Consultant Doctor'; // API might not return author name directly depending on includes
        setBlogs(prev => [createdBlog, ...prev]);

        // Add notification
        const newNotify = {
          id: `n-blog-${Date.now()}`,
          title: `Article Published`,
          message: `"${newBlog.title.substring(0, 30)}..." is now live.`,
          time: 'Just now',
          read: false
        };
        setNotifications(prev => [newNotify, ...prev]);
      }
    } catch (err) {
      console.error('Failed to create blog:', err);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    const token = localStorage.getItem('yanet_staff_token');
    try {
      const res = await fetch(`${API_BASE}/blogs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setBlogs(prev => prev.filter(b => b.id.toString() !== id.toString()));
      }
    } catch (err) {
      console.error('Failed to delete blog:', err);
    }
  };

  // Message operations
  const handleSendMessage = async (channelId: string, text: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const token = localStorage.getItem('yanet_staff_token');

    try {
      const res = await fetch(`${API_BASE}/messages/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ channelId, text, time: timeStr, sender: 'doctor' })
      });

      if (res.ok) {
        const newMsg = await res.json();
        newMsg.id = newMsg.id.toString();

        setChannels(prev => prev.map(chan => {
          if (chan.id.toString() === channelId.toString()) {
            return {
              ...chan,
              lastActive: timeStr,
              history: [...chan.history, newMsg]
            };
          }
          return chan;
        }));
      }
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const handleReceiveSimulatedReply = async (channelId: string, replyText: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const token = localStorage.getItem('yanet_staff_token');

    try {
      const res = await fetch(`${API_BASE}/messages/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ channelId, text: replyText, time: timeStr, sender: 'patient' })
      });

      if (res.ok) {
        const replyMsg = await res.json();
        replyMsg.id = replyMsg.id.toString();

        setChannels(prev => prev.map(chan => {
          if (chan.id.toString() === channelId.toString()) {
            return {
              ...chan,
              lastActive: timeStr,
              history: [...chan.history, replyMsg]
            };
          }
          return chan;
        }));

        // Trigger Notification
        const targetChan = channels.find(c => c.id.toString() === channelId.toString());
        const newNotify = {
          id: `n-msg-${Date.now()}`,
          title: `Reply from ${targetChan?.patientName || 'Patient'}`,
          message: replyText.substring(0, 45) + '...',
          time: 'Just now',
          read: false
        };
        setNotifications(prev => [newNotify, ...prev]);
      }
    } catch (err) {
      console.error('Failed to simulate reply:', err);
    }
  };

  return (
    <div className={`min-h-screen text-slate-800 font-sans selection:bg-primary/10 antialiased transition-colors duration-200 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50'
      }`}>
      <AnimatePresence mode="wait">
        {!staff ? (

          /* 1. LOGIN SCREEN */
          <StaffLogin onLogin={handleLogin} />

        ) : (

          /* 2. AUTHENTICATED STAFF WORKSPACE */
          <motion.div
            key="staff-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`min-h-screen flex overflow-hidden ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50'}`}
          >
            {/* Sidebar Navigation */}
            <StaffSidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              sidebarCollapsed={sidebarCollapsed}
              setSidebarCollapsed={setSidebarCollapsed}
              logout={handleLogout}
              messagesCount={channels.filter(c => c.unread).length}
            />

            {/* Mobile Drawer Navigation overlay */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-slate-950/65 backdrop-blur-sm z-40 md:hidden"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <motion.div
                    initial={{ x: -260 }}
                    animate={{ x: 0 }}
                    exit={{ x: -260 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className={`w-64 h-full flex flex-col justify-between p-5 text-left ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                      }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 bg-gradient-to-tr from-primary to-teal-400 rounded-lg flex items-center justify-center text-white font-poppins font-extrabold shadow-sm shrink-0">
                            <span>Y</span>
                          </div>
                          <span className={`text-md font-bold tracking-tight font-poppins ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                            Yanet<span className="text-primary font-bold">Staff</span>
                          </span>
                        </div>
                        <button onClick={() => setMobileMenuOpen(false)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                          <X className="w-5 h-5 text-slate-400" />
                        </button>
                      </div>

                      <div className={`p-3 border rounded-xl mb-5 text-left ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                        }`}>
                        <h4 className={`text-xs font-bold font-poppins ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                          {staff.name}
                        </h4>
                        <p className="text-[10px] text-slate-405 font-semibold mt-0.5">{staff.role}</p>
                      </div>

                      <nav className="space-y-1">
                        {[
                          { id: 'overview', label: 'Dashboard' },
                          { id: 'blogs', label: 'Manage Blogs' },
                          { id: 'messages', label: 'Messages' }
                        ].map((item) => {
                          const isActive = activeTab === item.id;
                          return (
                            <button
                              key={item.id}
                              onClick={() => {
                                setActiveTab(item.id as any);
                                setMobileMenuOpen(false);
                              }}
                              className={`w-full rounded-lg transition-all font-semibold text-xs py-3 px-4 text-left border border-transparent ${isActive
                                  ? 'bg-primary text-white shadow-md font-bold'
                                  : darkMode
                                    ? 'text-slate-350 hover:bg-slate-800 hover:text-white'
                                    : 'text-slate-505 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                            >
                              {item.label}
                            </button>
                          );
                        })}
                      </nav>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2.5 w-full rounded-lg transition-colors font-semibold text-xs py-3 px-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 text-left border border-transparent"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span>Sign Out</span>
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dashboard Workspace */}
            <div className="flex-1 flex flex-col h-screen overflow-y-auto">

              {/* Top Header Controls */}
              <StaffHeader
                activeTab={activeTab}
                setMobileMenuOpen={setMobileMenuOpen}
                notifications={notifications}
                notificationsOpen={notificationsOpen}
                setNotificationsOpen={setNotificationsOpen}
                markAllNotificationsRead={markAllNotificationsRead}
                profileDropdownOpen={profileDropdownOpen}
                setProfileDropdownOpen={setProfileDropdownOpen}
                doctorName={staff.name}
                doctorEmail={staff.email}
                doctorAvatar={staff.avatar}
                logout={handleLogout}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />

              {/* Dynamic Pages */}
              <main className="flex-grow p-4 sm:p-6 overflow-y-auto">
                <AnimatePresence mode="wait">

                  {activeTab === 'overview' && (
                    <StaffOverview
                      doctorName={staff.name}
                      messagesCount={channels.filter(c => c.unread).length}
                      blogsCount={blogs.length}
                      setActiveTab={setActiveTab}
                      darkMode={darkMode}
                    />
                  )}

                  {activeTab === 'blogs' && (
                    <StaffBlogs
                      blogs={blogs}
                      onAddBlog={handleAddBlog}
                      onDeleteBlog={handleDeleteBlog}
                      darkMode={darkMode}
                    />
                  )}

                  {activeTab === 'messages' && (
                    <StaffMessages
                      channels={channels}
                      onSendMessage={handleSendMessage}
                      darkMode={darkMode}
                    />
                  )}

                </AnimatePresence>
              </main>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
