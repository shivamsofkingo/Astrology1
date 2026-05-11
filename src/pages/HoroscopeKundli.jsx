import React from 'react';
import {
  Sparkles, Moon, Sun, Activity, Database,
  Cpu, Zap, RefreshCw, Globe, Plus,
  Eye, Copy, ChevronRight, AlertCircle,
  LayoutDashboard, Settings
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, Tooltip,
  ResponsiveContainer, Cell
} from 'recharts';

const energyData = [
  { day: 'MON', level: 55 },
  { day: 'TUE', level: 80 },
  { day: 'WED', level: 45 },
  { day: 'THU', level: 100, highlight: true },
  { day: 'FRI', level: 65 },
  { day: 'SAT', level: 45 },
  { day: 'SUN', level: 25 },
];

const ZodiacCard = ({ sign, icon, status, time, statusColor, statusBg }) => (
  <div className="bg-[#00BAF2] p-4 rounded-lg flex flex-col gap-4 text-white shadow-lg shadow-blue-100">
    <div className="flex justify-between items-center">
      <span className="text-2xl">{icon}</span>
      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest ${statusBg} ${statusColor}`}>
        {status}
      </span>
    </div>
    <div>
      <h4 className="text-[15px] font-semibold">{sign}</h4>
      <p className="text-[10px] opacity-70 font-semibold">{time}</p>
    </div>
  </div>
);

const APIRow = ({ provider, version, status, latency, usage, key }) => (
  <tr className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors group">
    <td className="py-7 px-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-white">
          {provider === 'AstroAPI Pro' ? <Sparkles size={20} /> : <Globe size={20} />}
        </div>
        <div>
          <h4 className="text-[13px] font-semibold text-slate-900">{provider}</h4>
          <p className="text-[10px] text-slate-400 font-semibold">{version}</p>
        </div>
      </div>
    </td>
    <td className="py-4 px-6">
      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${status === 'Operational' ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'
        }`}>
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-current mr-2"></span>
        {status}
      </span>
    </td>
    <td className="py-4 px-6 text-[13px] font-semibold text-slate-300">{latency}</td>
    <td className="py-4 px-6">
      <div className="flex flex-col gap-1.5 min-w-[120px]">
        <div className="flex justify-between text-[9px] font-bold text-slate-400">
          <span>{usage.percent}%</span>
          <span>{usage.current} / {usage.max}</span>
        </div>
        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${usage.percent}%` }}></div>
        </div>
      </div>
    </td>
    <td className="py-4 px-6">
      <div className="flex items-center gap-3">
        <code className="bg-slate-900 text-white px-3 py-1.5 rounded text-[11px] font-mono">
          {key}
        </code>
        <div className="flex gap-2 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
          <Eye size={14} className="cursor-pointer hover:text-slate-600" />
          <Copy size={14} className="cursor-pointer hover:text-slate-600" />
        </div>
      </div>
    </td>
  </tr>
);

const EventLog = ({ dotColor, text, time, category }) => (
  <div className="flex items-start gap-3 py-3 last:pb-0">
    <div className={`w-2 h-2 rounded-full mt-1.5 ${dotColor}`}></div>
    <div className="flex-grow">
      <p className="text-[13px] font-semibold text-slate-700 leading-snug">{text}</p>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-[10px] text-slate-400 font-semibold uppercase">{time}</span>
        <span className="text-slate-200 text-[10px]">•</span>
        <span className="text-[10px] text-slate-400 font-semibold uppercase">{category}</span>
      </div>
    </div>
  </div>
);

const HoroscopeKundli = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Horoscope & Kundli Management</h1>
        <p className="text-[14px] text-slate-500 mt-1 font-semibold leading-relaxed max-w-3xl">
          Orchestrate the celestial data flow. Manage daily predictions, fine-tune mathematical chart generations, and monitor live API throughput.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">

          {/* Horoscope Update Hub */}
          <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2.5 text-amber-500">
                <Sun size={20} />
                <h2 className="text-[16px] font-bold text-slate-900">Horoscope Update Hub</h2>
              </div>
              <div className="flex bg-slate-100 p-1 rounded-lg">
                <button className="px-4 py-1.5 bg-white text-slate-900 text-[11px] font-bold rounded shadow-sm">Daily</button>
                <button className="px-4 py-1.5 text-slate-400 text-[11px] font-bold">Weekly</button>
                <button className="px-4 py-1.5 text-slate-400 text-[11px] font-bold">Monthly</button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ZodiacCard sign="Aries" icon="♈" status="UPDATED" time="TODAY 06:00 AM" statusColor="text-white" statusBg="bg-white/20" />
              <ZodiacCard sign="Taurus" icon="♉" status="PENDING" time="DUE IN 2H" statusColor="text-white" statusBg="bg-white/20" />
              <ZodiacCard sign="Gemini" icon="♊" status="UPDATED" time="TODAY 05:45 AM" statusColor="text-white" statusBg="bg-white/20" />
              <ZodiacCard sign="Cancer" icon="♋" status="UPDATED" time="TODAY 06:12 AM" statusColor="text-white" statusBg="bg-white/20" />
              <ZodiacCard sign="Leo" icon="♌" status="UPDATED" time="TODAY 06:00 AM" statusColor="text-white" statusBg="bg-white/20" />
              <ZodiacCard sign="Virgo" icon="♍" status="FAILED" time="RETRYING..." statusColor="text-white" statusBg="bg-rose-400" />
              <ZodiacCard sign="Libra" icon="♎" status="UPDATED" time="TODAY 06:45 AM" statusColor="text-white" statusBg="bg-white/20" />
              <ZodiacCard sign="Scorpio" icon="♏" status="UPDATED" time="TODAY 06:50 AM" statusColor="text-white" statusBg="bg-white/20" />
            </div>
          </div>

          {/* API Integrations */}
          <div className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <div className="flex items-center gap-2.5 text-indigo-500">
                <Cpu size={20} />
                <h2 className="text-[16px] font-bold text-slate-900">API Integrations</h2>
              </div>
              <button className="text-[11px] font-bold text-slate-900 hover:text-[#00BAF2] transition-colors uppercase tracking-widest flex items-center gap-1.5">
                Add Connection <Plus size={14} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                    <th className="py-5 px-6">Service Provider</th>
                    <th className="py-5 px-6">Connection Status</th>
                    <th className="py-5 px-6">Latency</th>
                    <th className="py-5 px-6">Monthly Usage</th>
                    <th className="py-5 px-6">Key Management</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <APIRow
                    provider="AstroAPI Pro"
                    version="v4.2 Endpoint"
                    status="Operational"
                    latency="124ms"
                    usage={{ percent: 82, current: '41,200', max: '50k' }}
                    key="sk_live_....2h3f"
                  />
                  <APIRow
                    provider="Swiss Ephemeris"
                    version="Local Instance"
                    status="Syncing"
                    latency="12ms"
                    usage={{ percent: 5, current: 'UNLIMITED', max: '' }}
                    key="Local Socket Only"
                  />
                  <APIRow
                    provider="Vedic Metrics"
                    version="v2.1 Analytics"
                    status="Operational"
                    latency="89ms"
                    usage={{ percent: 45, current: '22,500', max: '50k' }}
                    key="sk_live_....9n2q"
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-8">

          {/* Kundli Configuration */}
          <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm space-y-7">
            <div className="flex items-center gap-2.5 text-indigo-500">
              <Database size={20} />
              <h2 className="text-[16px] font-bold text-slate-900">Kundli Configuration</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Ayanamsa Settings</label>
                <select className="w-full px-4 py-3 bg-gray-100 border border-slate-50 rounded-lg text-[13px] font-semibold text-slate-700 outline-none appearance-none cursor-pointer">
                  <option>Lahiri (Default)</option>
                  <option>B.V. Raman</option>
                  <option>KP Ayanamsa</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Chart Visual Style</label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-lg border-2 border-[#00BAF2] bg-blue-50/50 flex flex-col items-center justify-center text-center">
                    <span className="text-[11px] font-bold text-[#00BAF2]">North Indian</span>
                    <span className="text-[8px] font-bold text-indigo-300 uppercase tracking-widest">Diamond Grid</span>
                  </div>
                  <div className="p-4 rounded-lg border-2 border-transparent bg-gray-100 flex flex-col items-center justify-center text-center grayscale opacity-50">
                    <span className="text-[11px] font-bold text-slate-900">South Indian</span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Square Grid</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Calculation Precision</label>
                  <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">High (32-bit)</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-lg overflow-hidden">
                  <div className="w-[85%] h-full bg-gradient-to-r from-indigo-500 to-[#00BAF2] rounded-lg"></div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-indigo-50 border border-indigo-100 flex gap-3">
                <AlertCircle size={18} className="text-indigo-500 flex-shrink-0" />
                <p className="text-[11px] text-indigo-500 font-semibold leading-relaxed">
                  These parameters affect all new Kundli generations globally across the platform.
                </p>
              </div>
            </div>
          </div>

          {/* Recent System Events */}
          <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm space-y-6">
            <h2 className="text-[16px] font-bold text-slate-900">Recent System Events</h2>
            <div className="divide-y divide-slate-50">
              <EventLog dotColor="bg-emerald-500" text="Chart Engine successfully calculated 1,200 birth charts." time="2 mins ago" category="System" />
              <EventLog dotColor="bg-amber-500" text="Ayanamsa fallback triggered for user #9921." time="14 mins ago" category="Automation" />
              <EventLog dotColor="bg-rose-500" text="API connection timeout: AstroAPI secondary node." time="45 mins ago" category="Network" />
            </div>
            <button className="w-full py-2.5 text-[11px] font-bold text-indigo-500 hover:text-indigo-600 transition-colors uppercase tracking-widest border border-indigo-50 rounded-lg">
              View All Audit Logs
            </button>
          </div>
        </div>

        {/* Bottom Chart Row */}
        <div className="lg:col-span-12">
          <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm space-y-6">
            <h2 className="text-[16px] font-bold text-slate-900">Celestial Energy Shifts (Weekly)</h2>
            <div className="h-64 w-full px-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={energyData}>
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#94A3B8', fontWeight: 700 }}
                    dy={10}
                  />
                  <Tooltip
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="level" radius={[6, 6, 6, 6]} barSize={80}>
                    {energyData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.highlight ? '#6366F1' : '#E0E7FF'}
                        className="transition-all duration-300 hover:opacity-80"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoroscopeKundli;
