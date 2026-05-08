import React from 'react';
import { AlertTriangle, Info, Shield, CheckCircle2, MoreVertical } from 'lucide-react';

const NotificationCategory = ({ icon: Icon, label, count, active }) => (
  <div className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-all rounded-lg mb-1 ${
    active ? 'bg-[#E0F7FF] text-[#00BAF2]' : 'text-slate-400 hover:bg-slate-50'
  }`}>
    <div className="flex items-center gap-3">
      <Icon size={18} />
      <span className="text-[13px] font-medium">{label}</span>
    </div>
    {count && (
      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
        active ? 'bg-[#00BAF2] text-white' : 'bg-slate-100 text-slate-500'
      }`}>
        {count}
      </span>
    )}
  </div>
);

const NotificationItem = ({ type, title, desc, time, tags, hasBorder }) => {
  const Icon = type === 'critical' ? AlertTriangle : type === 'update' ? Info : Shield;
  const iconBg = type === 'critical' ? 'bg-rose-100 text-rose-500' : type === 'update' ? 'bg-indigo-100 text-indigo-500' : 'bg-amber-100 text-amber-500';
  
  return (
    <div className={`p-6 bg-white border-b border-slate-100 last:border-0 relative ${hasBorder ? 'border-l-4 border-l-amber-400' : ''}`}>
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-full ${iconBg}`}>
          <Icon size={20} />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-[15px] font-semibold text-slate-900">{title}</h4>
              <p className="text-[13px] text-slate-400 mt-1 leading-relaxed">{desc}</p>
            </div>
            <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">{time}</span>
          </div>
          <div className="flex items-center gap-2 mt-4">
            {tags.map((tag, i) => (
              <span key={i} className={`text-[9px] font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                tag === 'CRITICAL' ? 'bg-rose-50 text-rose-500' : 
                tag === 'INFRASTRUCTURE' ? 'bg-slate-800 text-white' : 
                tag === 'UPDATE' ? 'bg-indigo-50 text-indigo-500' : 
                'bg-slate-100 text-slate-500'
              }`}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const NotificationsCenter = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">Notifications Center</h1>
        <p className="text-sm text-slate-500 font-normal">Manage and respond to system-wide cosmic shifts.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Sidebar Categories */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
          <NotificationCategory icon={Info} label="All Notifications" count="12" active />
          <NotificationCategory icon={Shield} label="Security Alerts" count="3" />
          <NotificationCategory icon={CheckCircle2} label="System Updates" />
          <NotificationCategory icon={AlertTriangle} label="User Reports" count="2" />
        </div>

        {/* Notifications List */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
          <NotificationItem 
            type="critical"
            title="Mercury Retrograde Buffer Alert"
            desc="System latency detected in Natal Chart calculation engine during transits..."
            time="2m ago"
            tags={['CRITICAL', 'INFRASTRUCTURE']}
            hasBorder
          />
          <NotificationItem 
            type="update"
            title="New Lunar Cycle Integration"
            desc="Successfully synced with the lunar ephemeris API for November cycles."
            time="1h ago"
            tags={['UPDATE']}
          />
          <NotificationItem 
            type="security"
            title="Suspicious Login Attempt"
            desc="Login attempt blocked from unidentified IP: 192.168.1.XX"
            time="3h ago"
            tags={['READ']}
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationsCenter;
