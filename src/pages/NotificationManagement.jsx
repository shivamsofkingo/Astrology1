import React from 'react';
import { 
  Send, Smartphone, Mail, MessageSquare, 
  Search, MoreVertical, Edit2, Trash2, 
  Wifi, Info, AlertTriangle, ChevronRight,
  TrendingUp, Activity, Bell, Calendar, Box, AtSign
} from 'lucide-react';

const StatCard = ({ label, value, trend, subtext, trendColor = "text-[#00BAF2]" }) => (
  <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <div className="flex items-baseline justify-between">
      <h3 className="text-3xl font-semibold text-slate-900">{value}</h3>
      {trend && (
        <div className={`flex items-center gap-1 text-[10px] font-semibold ${trendColor}`}>
          <TrendingUp size={12} />
          {trend}
        </div>
      )}
      {subtext && (
        <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-widest">{subtext}</span>
      )}
    </div>
  </div>
);

const GatewayItem = ({ name, protocol, status, icon: Icon, iconColor, bgColor }) => (
  <div className="flex items-center justify-between py-2.5">
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center ${iconColor}`}>
        <Icon size={20} />
      </div>
      <div>
        <h4 className="text-[13px] font-semibold text-slate-900 leading-tight">{name}</h4>
        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest mt-0.5">{protocol}</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <span className={`text-[9px] font-semibold uppercase tracking-widest ${status === 'ACTIVE' ? 'text-emerald-500' : 'text-amber-500'}`}>
        {status}
      </span>
      <div className={`w-1.5 h-1.5 rounded-full ${status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
    </div>
  </div>
);

const LogRow = ({ title, channel, status, date, reach, openRate }) => {
  const getStatusStyle = (s) => {
    switch(s) {
      case 'SENT': return 'bg-indigo-50 text-indigo-500 border-indigo-100';
      case 'SCHEDULED': return 'bg-amber-50 text-amber-500 border-amber-100';
      case 'DRAFT': return 'bg-slate-800 text-white border-slate-800';
      default: return 'bg-slate-50 text-slate-400';
    }
  };

  const Icon = channel === 'Push' ? Smartphone : channel === 'Email' ? Mail : MessageSquare;

  return (
    <tr className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <div className="text-indigo-400">
            <Icon size={18} />
          </div>
          <div>
            <h4 className="text-[13px] font-semibold text-slate-800">{title}</h4>
            <p className="text-[10px] text-slate-400 font-semibold tracking-tight">Channel: {channel}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-6">
        <span className={`text-[9px] font-semibold px-3 py-1 rounded-full border uppercase tracking-widest ${getStatusStyle(status)}`}>
          {status}
        </span>
      </td>
      <td className="py-4 px-6 text-[12px] text-slate-500 font-semibold">{date}</td>
      <td className="py-4 px-6 text-[12px] text-slate-500 font-semibold">{reach}</td>
      <td className="py-4 px-6">
        {openRate ? (
          <div className="flex items-center gap-3">
            <span className="text-[12px] text-slate-600 font-semibold">{openRate}%</span>
            <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${openRate}%` }}></div>
            </div>
          </div>
        ) : (
          <span className="text-slate-300">-</span>
        )}
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-3 text-slate-300">
          {status === 'SENT' ? <MoreVertical size={16} /> : status === 'SCHEDULED' ? <Edit2 size={16} /> : <Trash2 size={16} />}
        </div>
      </td>
    </tr>
  );
};

const NotificationManagement = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">Notification Management</h1>
        <p className="text-[14px] text-slate-500 mt-1">Orchestrate cosmic broadcasts across all channels.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="TOTAL SENT" value="1.2M" trend="12%" />
        <StatCard label="DELIVERY RATE" value="98.5%" subtext="OPTIMAL" />
        <StatCard label="ACTIVE CAMPAIGNS" value="14" />
        <StatCard label="ENGAGEMENT RATE" value="24.8%" trend="4.2%" trendColor="text-indigo-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Push New Notification Form */}
          <div className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
              <div className="flex items-center gap-2 text-slate-800">
                <Edit2 size={18} className="text-indigo-500" />
                <h2 className="text-[15px] font-semibold uppercase tracking-wider">Push New Notification</h2>
              </div>
              <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">DRAFT AUTO-SAVED</span>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Broadcast Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Mercury Retrograde Alert" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Target Segment</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-[14px] appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all">
                    <option>All Seekers</option>
                    <option>Premium Members</option>
                    <option>New Users</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Message body</label>
                <textarea 
                  placeholder="Craft your celestial message here..."
                  className="w-full h-32 px-4 py-4 bg-slate-50 border border-slate-200 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="space-y-3">
                   <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block">Delivery Channel</label>
                   <div className="flex items-center gap-3">
                      <button className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200">
                        <Smartphone size={18} />
                      </button>
                      <button className="w-10 h-10 rounded-lg bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-slate-50 transition-all">
                        <Mail size={18} />
                      </button>
                      <button className="w-10 h-10 rounded-lg bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-slate-50 transition-all">
                        <MessageSquare size={18} />
                      </button>
                   </div>
                </div>

                <div className="flex items-center gap-8">
                   <button className="text-[11px] font-semibold text-slate-400 hover:text-indigo-500 transition-colors uppercase tracking-widest">
                     Schedule Later
                   </button>
                   <button className="bg-indigo-500 text-white px-10 py-4 rounded-lg text-[13px] font-semibold uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-indigo-200 hover:bg-indigo-600 transition-all">
                     <Send size={16} /> Push Now
                   </button>
                </div>
              </div>
            </div>
          </div>

          {/* Broadcast Log */}
          <div className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
              <h2 className="text-[15px] font-semibold text-slate-800 uppercase tracking-wider">Broadcast Log</h2>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Filter logs..." 
                  className="pl-10 pr-4 py-2 bg-transparent border-none text-[12px] focus:ring-0 placeholder:text-slate-400 font-semibold"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 text-[10px] font-semibold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                    <th className="py-4 px-6">Notification Title</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">Date</th>
                    <th className="py-4 px-6">Reach</th>
                    <th className="py-4 px-6">Open Rate</th>
                    <th className="py-4 px-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <LogRow 
                    title="Full Moon in Pisces" 
                    channel="Push" 
                    status="SENT" 
                    date="Oct 24, 2023" 
                    reach="842,000" 
                    openRate={32.4} 
                  />
                  <LogRow 
                    title="Retrograde Preparedness" 
                    channel="Email" 
                    status="SCHEDULED" 
                    date="Oct 28, 2023" 
                    reach="12,500" 
                  />
                  <LogRow 
                    title="Weekly Stellar Forecast" 
                    channel="SMS" 
                    status="DRAFT" 
                    date="Nov 02, 2023" 
                    reach="0" 
                  />
                </tbody>
              </table>
            </div>
            
            <div className="p-6 border-t border-slate-50 flex justify-center">
              <button className="flex items-center gap-2 text-[11px] font-semibold text-indigo-500 hover:text-indigo-700 transition-all uppercase tracking-widest">
                View Complete History <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Gateway Pulse */}
          <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
            <h2 className="text-[16px] font-semibold text-slate-900 mb-6">Gateway Pulse</h2>
            <div className="space-y-1">
              <GatewayItem 
                name="Firebase FCM" 
                protocol="PUSH PROTOCOL" 
                status="ACTIVE" 
                icon={Box} 
                iconColor="text-amber-500" 
                bgColor="bg-amber-50" 
              />
              <GatewayItem 
                name="Twilio Gateway" 
                protocol="SMS PROTOCOL" 
                status="ACTIVE" 
                icon={MessageSquare} 
                iconColor="text-rose-500" 
                bgColor="bg-rose-50" 
              />
              <GatewayItem 
                name="SendGrid API" 
                protocol="MAIL PROTOCOL" 
                status="SHIMMERING" 
                icon={AtSign} 
                iconColor="text-blue-500" 
                bgColor="bg-blue-50" 
              />
            </div>
            <button className="w-full mt-6 py-3 rounded-lg border border-slate-700 text-[12px] font-semibold text-slate-400 hover:bg-slate-50 transition-all">
              Run Connectivity Diagnostic
            </button>
          </div>

          {/* Astrology Insight */}
          <div className="relative rounded-lg overflow-hidden aspect-[4/3] group">
            <img 
              src="https://thumbs.dreamstime.com/b/vibrant-showing-vibrant-swirling-nebula-clouds-pink-purple-blue-cosmic-gas-deep-space-resolution-use-vibrant-swirling-424127369.jpg" 
              alt="Insight" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent p-6 flex flex-col justify-end">
              <h4 className="text-amber-400 text-[10px] font-semibold uppercase tracking-widest mb-2">Astrology Insight</h4>
              <p className="text-white text-[13px] leading-relaxed font-semibold">
                Maximize engagement by scheduling Mercury alerts during the Lunar hour (between 03:00 - 05:00 UTC).
              </p>
            </div>
          </div>

          {/* Celestial Anomaly Alert */}
          <div className="bg-gray-500 p-6 rounded-lg shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
            <div className="flex items-center gap-3 mb-4">
               <AlertTriangle className="text-rose-400" size={20} />
               <h3 className="text-[13px] font-semibold text-white uppercase tracking-wider">Celestial Anomaly</h3>
            </div>
            <p className="text-slate-300 text-[12px] leading-relaxed mb-6 font-medium">
              System detected a high bounce rate in Gemini users. We suggest reviewing the recent SMS template for encoding errors.
            </p>
            <button className="text-[10px] font-semibold text-rose-300 hover:text-rose-100 transition-colors uppercase tracking-widest underline decoration-2 underline-offset-4">
              Dismiss Advisory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationManagement;
