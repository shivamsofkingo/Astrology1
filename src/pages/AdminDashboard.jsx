import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, AreaChart, Area
} from 'recharts';
import { TrendingUp, AlertTriangle, UserPlus, Cloud } from 'lucide-react';

// Static Data for Charts
const revenueData = [
  { name: '10:00 Am', value: 10 },
  { name: '11:00 Am', value: 20 },
  { name: '12:00 Pm', value: 15 },
  { name: '01:00 Pm', value: 35 },
  { name: '02:00 Pm', value: 18 },
  { name: '03:00 Pm', value: 25 },
  { name: '04:00 Pm', value: 15 },
];

const engagementData = [
  { name: 'MON', value: 80 },
  { name: 'TUE', value: 40 },
  { name: 'WED', value: 90 },
  { name: 'THU', value: 45 },
];

const StatCard = ({ label, value, trend, valueColor = 'text-blue-600', trendColor = 'text-blue-500' }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 flex flex-col gap-1">
    <span className="text-[10px] font-medium text-slate-300 uppercase tracking-widest">{label}</span>
    <div className="flex items-center justify-between">
      <span className={`text-3xl font-semibold ${valueColor} leading-none`}>{value}</span>
      <div className={`flex items-center gap-1 text-[10px] font-medium ${trendColor}`}>
        <TrendingUp size={12} />
        {trend}
      </div>
    </div>
  </div>
);

const LiveConsultationCard = ({ name, type, status, image }) => (
  <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg mb-3 last:mb-0 bg-white">
    <div className="flex items-center gap-3">
      <img src={image} alt={name} className="w-10 h-10 rounded-full object-cover border border-slate-100" />
      <div>
        <h4 className="text-[13px] font-semibold text-slate-900 leading-tight">{name}</h4>
        <p className="text-[10px] text-slate-400 uppercase font-medium tracking-tighter">{type}</p>
      </div>
    </div>
    <span className={`text-[9px] font-semibold px-3 py-1 rounded-lg uppercase tracking-tighter ${
      status === 'In Progress' ? 'bg-amber-50 text-amber-500 border border-amber-100' :
      status === 'Waiting' ? 'bg-[#334155] text-white' : 'bg-rose-50 text-rose-500 border border-rose-100'
    }`}>
      {status}
    </span>
  </div>
);

const AlertCard = ({ title, desc, time, type }) => {
  const Icon = type === 'error' ? AlertTriangle : type === 'new' ? UserPlus : Cloud;
  const bgColor = type === 'error' ? 'bg-[#0F0F0F]' : type === 'new' ? 'bg-[#FCF9EE]' : 'bg-[#F4F7FF]';
  const iconColor = type === 'error' ? 'text-white' : type === 'new' ? 'text-amber-500' : 'text-blue-500';
  const textColor = type === 'error' ? 'text-white' : 'text-slate-900';
  const descColor = type === 'error' ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className={`${bgColor} px-4 py-3 rounded-lg flex items-start gap-4 shadow-sm`}>
      <div className={`${iconColor} mt-0.5`}>
        {type === 'error' ? <div className="bg-rose-500 p-1 rounded-full"><Icon size={12} className="text-white" /></div> : <Icon size={18} />}
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <h4 className={`text-[13px] font-semibold ${textColor}`}>{title}</h4>
          <span className="text-[10px] text-slate-400 font-normal">{time}</span>
        </div>
        <p className={`text-[11px] leading-relaxed mt-0.5 ${descColor} font-normal`}>{desc}</p>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Users" value="124,582" valueColor="text-[#0000FF]" trend="+12.5%" trendColor="text-[#0000FF]" />
        <StatCard label="Total Astrologers" value="3,120" valueColor="text-[#D4AF37]" trend="+4.2%" trendColor="text-[#D4AF37]" />
        <StatCard label="Total Earnings" value="$842,900" valueColor="text-[#0000FF]" trend="+21.8%" trendColor="text-[#0000FF]" />
      </div>

      {/* Charts & Lists Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Report */}
        <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-semibold text-slate-900">Revenue report</h3>
            <div className="flex bg-[#F1F5F9] p-1 rounded-lg">
              <button className="px-5 py-2 bg-[#00BAF2] text-white text-[11px] font-semibold rounded-lg">Daily</button>
              <button className="px-5 py-2 text-slate-500 text-[11px] font-semibold">Weekly</button>
              <button className="px-5 py-2 text-slate-500 text-[11px] font-semibold">Monthly</button>
            </div>
          </div>
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0000FF" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0000FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#94A3B8', fontWeight: 500 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#94A3B8', fontWeight: 500 }}
                  tickFormatter={(value) => `${value}K`}
                />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#0000FF" 
                  strokeWidth={2} 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Consultations */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-lg font-semibold text-slate-900 mb-6 leading-tight">Live <br /> Consultations</h3>
          <div className="flex-grow space-y-4 border-slate-200">
            <LiveConsultationCard 
              name="Maya Moon" 
              type="Psychic Reading" 
              status="In Progress" 
              image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80"
            />
            <LiveConsultationCard 
              name="Dr. Orion" 
              type="Birth Chart Sync" 
              status="Waiting" 
              image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80"
            />
            <LiveConsultationCard 
              name="Aria Star" 
              type="Relationship Transit" 
              status="Ended" 
              image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80"
            />
          </div>
          <button className="w-full py-3.5 bg-black text-white text-[10px] font-semibold uppercase tracking-[0.2em] rounded-lg mt-6 shadow-lg shadow-black/10">
            Full Session Log
          </button>
        </div>
      </div>

      {/* Charts & Lists Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* User Engagement */}
        <div className="lg:col-span-3 bg-white p-8 rounded-lg shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-8">User Engagement</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-center">
            <div className="md:col-span-3 h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementData}>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#94A3B8', fontWeight: 500 }}
                    dy={10}
                  />
                  <Bar dataKey="value" radius={[4, 4, 4, 4]} barSize={40}>
                    {engagementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#818CF8' : '#334155'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              <div className="bg-[#EEF2FF] p-5 rounded-lg border-l-8 border-[#818CF8]">
                <p className="text-[10px] font-semibold text-[#818CF8] uppercase tracking-widest">Active Seekers</p>
                <p className="text-2xl font-semibold text-slate-900 leading-none mt-2">82%</p>
              </div>
              <div className="bg-[#F1F5F9] p-5 rounded-lg border-l-8 border-slate-400">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Dormant Souls</p>
                <p className="text-2xl font-semibold text-slate-900 leading-none mt-2">18%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Alerts</h3>
            <span className="text-[10px] font-semibold text-[#818CF8] bg-[#EEF2FF] px-4 py-1 rounded-lg uppercase">4 New Updates</span>
          </div>
          <div className="flex-grow flex flex-col gap-4">
            <AlertCard 
              type="error"
              title="Mercury Sync Error" 
              time="2m ago"
              desc="Transit calculation latency detected in Sector 7-G. System resonance drifting."
            />
            <AlertCard 
              type="new"
              title="New High-Tier Mystic" 
              time="15m ago"
              desc="Master Astrologer 'Luna Sol' verified from Singapore."
            />
            <AlertCard 
              type="sync"
              title="Cloud Soul-Sync Complete" 
              time="1h ago"
              desc="Database backups for the lunar cycle archived."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
