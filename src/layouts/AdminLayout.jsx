import React from 'react';
import { 
  LayoutDashboard, Users, UserCog, MessageSquare, Wallet, 
  CalendarCheck, BarChart3, Star, FileText, Bell, 
  Tag, CreditCard, Settings, LifeBuoy, ShieldCheck, 
  Globe, Moon, TrendingUp
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const SidebarItem = ({ icon: Icon, label, path, active }) => (
  <Link to={path} className={`flex items-center gap-3 px-4 py-2 cursor-pointer transition-all mx-4 rounded-lg mb-2 ${
    active 
      ? 'bg-[#00BAF2] text-white shadow-lg shadow-[#00BAF2]/20' 
      : 'text-slate-800 hover:bg-slate-50'
  }`}>
    <Icon size={20} strokeWidth={active ? 1.5 : 2} />
    <span className={`text-[12px] font-medium`}>{label}</span>
  </Link>
);

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const menuItems = [
    { icon: LayoutDashboard, label: 'Admin Dashboard', path: '/' },
    { icon: Users, label: 'User management', path: '/users' },
    { icon: UserCog, label: 'Astrologer Management', path: '/astrologers' },
    { icon: MessageSquare, label: 'Chat / Call / Video Management', path: '/chat' },
    { icon: Wallet, label: 'Wallet & Payments', path: '/wallet' },
    { icon: CalendarCheck, label: 'Booking & Appointment Management', path: '/bookings' },
    { icon: BarChart3, label: 'Reports & Analytics', path: '/reports' },
    { icon: Star, label: 'Reviews & Ratings', path: '/reviews' },
    { icon: FileText, label: 'CMS (Content Management System)', path: '/cms' },
    { icon: Bell, label: 'Notifications Management', path: '/notification-management' },
    { icon: Tag, label: 'Offers & Promotions', path: '/offers' },
    { icon: CreditCard, label: 'Subscription & Membership Plans', path: '/subscriptions' },
    { icon: Settings, label: 'Settings & Configuration', path: '/settings' },
    { icon: LifeBuoy, label: 'Dispute & Support Management', path: '/support' },
    { icon: ShieldCheck, label: 'Security & Roles', path: '/security' },
    { icon: Globe, label: 'Multi-language & Localization', path: '/localization' },
    { icon: Moon, label: 'Horoscope & Kundli Management', path: '/horoscope' },
    { icon: TrendingUp, label: 'Marketing & Growth Tools', path: '/marketing' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-[280px] flex-shrink-0 bg-white border-r border-slate-200 flex flex-col py-6 sticky top-0 h-screen overflow-y-auto no-scrollbar">
        <div className="px-8 mb-10 flex flex-col items-center">
          <img 
            src="/src/assets/softkingo-logo.d4fc7414.png" 
            alt="Softkingo Logo" 
            className="h-12 w-auto object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="flex flex-col items-center">
             <p className="text-[11px] text-slate-900 font-semibold tracking-[0.3em] uppercase">ASTROLOGY</p>
          </div>
          <div className="hidden flex-col items-center justify-center">
            <h1 className="text-[#00BAF2] text-2xl font-semibold tracking-tight">Softkíngo</h1>
          </div>
        </div>

        <nav className="flex-grow">
          {menuItems.map((item, index) => (
            <SidebarItem 
              key={index} 
              {...item} 
              active={location.pathname === item.path}
            />
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-[#00BAF2] flex items-center justify-between px-8 text-white sticky top-0 z-40">
          <div>
            <h2 className="text-xl font-light leading-none flex items-center gap-2">
              Hello, <span className="font-medium">Aelius</span>
            </h2>
            <p className="text-sm opacity-90 mt-1 font-normal">Check & maintain your dashboard</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/notifications" className="relative p-2 bg-white rounded-full hover:bg-slate-50 text-[#00BAF2] cursor-pointer transition-all shadow-sm">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-3 h-3 bg-rose-500 rounded-full border-2 border-[#00BAF2]"></span>
            </Link>
            <Link to="/profile" className="flex items-center gap-3 pl-2 cursor-pointer hover:opacity-80 transition-opacity">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="Profile" 
                className="w-10 h-10 rounded-full border-2 border-white/50 shadow-sm object-cover"
              />
            </Link>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
