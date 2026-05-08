import React from 'react';
import {
  Users, Sparkles, Banknote, ChevronRight,
  BarChart3, Filter, Search, ArrowUpRight,
  UserCheck, Clock, ShieldCheck, Zap
} from 'lucide-react';

const StatCard = ({ label, value, trend, icon: Icon, colorClass, trendColor }) => (
  <div className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm">
    <div className="flex justify-between items-start mb-3">
      <div className={`p-2 rounded-lg ${colorClass}`}>
        <Icon size={20} />
      </div>
      <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${trendColor} flex items-center gap-1`}>
        {trend} <ArrowUpRight size={10} />
      </span>
    </div>
    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <h3 className="text-3xl font-semibold text-slate-900 tracking-tight">{value}</h3>
  </div>
);

const AffiliateRow = ({ name, tier, conversion, commissions, tierColor, textColor }) => (
  <tr className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
    <td className="py-4 px-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-[10px] font-bold">
          {name.split(' ').map(n => n[0]).join('')}
        </div>
        <span className="text-[13px] font-semibold text-slate-900">{name}</span>
      </div>
    </td>
    <td className="py-4 px-6">
      <span className={`px-2 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest ${tierColor}`}>
        {tier}
      </span>
    </td>
    <td className="py-4 px-6 text-[13px] font-semibold text-slate-500">{conversion}</td>
    <td className={`py-4 px-6 text-[13px] font-bold ${textColor}`}>{commissions}</td>
  </tr>
);

const UserSegment = ({ label, count, progress, color }) => (
  <div className="space-y-2 p-5 bg-gray-100/50 rounded-lg border border-slate-50">
    <div className="flex justify-between items-center text-[12px] font-bold">
      <span className="text-slate-700">{label}</span>
      <span className="text-slate-400 bg-white px-2 py-0.5 rounded-md border border-slate-100">{count}</span>
    </div>
    <div className="w-full h-2.5 bg-[#0D121F] rounded-lg overflow-hidden">
      <div className={`h-full ${color} rounded-lg`} style={{ width: progress }}></div>
    </div>
  </div>
);

const FeedItem = ({ name, code, time, status, statusColor, statusBg, dotColor }) => (
  <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors rounded-lg group">
    <div className="flex items-center gap-3">
      <div className="relative p-2 bg-gray-100 rounded-lg text-slate-400 group-hover:text-[#00BAF2] transition-colors">
        <Zap size={16} />
        {dotColor && <div className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-white ${dotColor}`}></div>}
      </div>
      <div>
        <h4 className="text-[13px] font-bold text-slate-900">New Sign-up: {name}</h4>
        <div className="flex items-center gap-2">
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">CODE: {code}</p>
          <span className="text-[9px] text-slate-300 font-bold">•</span>
          <p className="text-[9px] text-slate-400 font-bold uppercase">{time}</p>
        </div>
      </div>
    </div>
    <span className={`px-2 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest ${statusBg} ${statusColor}`}>
      {status}
    </span>
  </div>
);

const MarketingGrowth = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Marketing & Growth Tools</h1>
        <p className="text-[14px] text-slate-500 mt-1 font-semibold leading-relaxed max-w-3xl">
          Orchestrate the celestial data flow. Manage daily predictions, fine-tune mathematical chart generations, and monitor live API throughput.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Total Referrals"
          value="42,891"
          trend="+12.4%"
          icon={Users}
          colorClass="bg-blue-50 text-[#00BAF2]"
          trendColor="bg-blue-50 text-[#00BAF2]"
        />
        <StatCard
          label="Active Affiliates"
          value="1,204"
          trend="+5.2%"
          icon={Sparkles}
          colorClass="bg-purple-50 text-purple-500"
          trendColor="bg-purple-50 text-purple-500"
        />
        <StatCard
          label="Growth Revenue"
          value="$892,400.00"
          trend="+28.1%"
          icon={Banknote}
          colorClass="bg-amber-50 text-amber-500"
          trendColor="bg-amber-50 text-amber-500"
        />
      </div>

      {/* Campaign Performance Chart */}
      <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-[18px] font-bold text-slate-900">Campaign Performance</h2>
          <select className="bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg outline-none cursor-pointer">
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>All Time</option>
          </select>
        </div>

        <div className="flex flex-col h-72">
          <div className="flex-grow flex items-end justify-between gap-2 px-4">
            {[
              { label: 'Moon Phase Sale', height: 'h-24', color: 'bg-indigo-100' },
              { height: 'h-32', color: 'bg-indigo-200' },
              { label: 'Equinox Bonus', height: 'h-20', color: 'bg-indigo-100' },
              { height: 'h-40', color: 'bg-indigo-200' },
              { height: 'h-36', color: 'bg-indigo-100' },
              { label: 'Lunar New Year Bonus', height: 'h-48', color: 'bg-amber-400', highlight: true },
              { height: 'h-44', color: 'bg-indigo-200' },
              { label: 'Jupiter Rising', height: 'h-32', color: 'bg-indigo-100' },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center group">
                <div className={`w-full max-w-[85px] ${bar.height} ${bar.color} rounded-lg transition-all group-hover:scale-105 ${bar.highlight ? 'shadow-lg shadow-amber-100' : ''}`}></div>
                <div className="h-16 flex items-center justify-center w-full">
                  {bar.label && (
                    <span className={`text-[9px] font-semibold text-center uppercase tracking-widest ${bar.highlight ? 'text-slate-900' : 'text-slate-400'} leading-tight px-1`}>
                      {bar.label}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Affiliate Management */}
        <div className="lg:col-span-8 bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <h2 className="text-[18px] font-bold text-slate-900">Affiliate Management Hub</h2>
            <div className="flex gap-4 text-slate-400">
              <Filter size={18} className="cursor-pointer hover:text-slate-600" />
              <Search size={18} className="cursor-pointer hover:text-slate-600" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                  <th className="py-4 px-6">Affiliate</th>
                  <th className="py-4 px-6">Tier</th>
                  <th className="py-4 px-6">Conversion</th>
                  <th className="py-4 px-6">Commissions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <AffiliateRow
                  name="Astra V."
                  tier="Universe"
                  conversion="14.8%"
                  commissions="$12,450"
                  tierColor="bg-amber-50 text-amber-500"
                  textColor="text-amber-500"
                />
                <AffiliateRow
                  name="Orion K."
                  tier="Galaxy"
                  conversion="9.2%"
                  commissions="$5,820"
                  tierColor="bg-purple-50 text-purple-500"
                  textColor="text-purple-500"
                />
                <AffiliateRow
                  name="Luna M."
                  tier="Star"
                  conversion="4.1%"
                  commissions="$1,100"
                  tierColor="bg-slate-100 text-slate-400"
                  textColor="text-slate-400"
                />
              </tbody>
            </table>
          </div>
        </div>

        {/* User Segments & Feed */}
        <div className="lg:col-span-4 space-y-8">
          {/* User Segments */}
          <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm space-y-6 h-fit">
            <h2 className="text-[18px] font-bold text-slate-900">User Segments</h2>
            <div className="space-y-4">
              <UserSegment label="Heavy Vedic Users" count="12.4k" progress="70%" color="bg-[#00BAF2]" />
              <UserSegment label="Daily Horoscope Readers" count="28.9k" progress="90%" color="bg-amber-400" />
              <UserSegment label="New Seekers" count="5.2k" progress="40%" color="bg-purple-500" />
            </div>
            <button className="w-full py-3 bg-white border border-slate-100 text-slate-400 text-[11px] font-semibold rounded-lg hover:bg-slate-50 transition-all uppercase tracking-widest">
              View All Segments
            </button>
          </div>

          {/* Real-time Feed */}
          <div className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-50">
              <h2 className="text-[18px] font-bold text-slate-900">Real-time Feed</h2>
            </div>
            <div className="divide-y divide-slate-50">
              <FeedItem name="Zodiac_Zen" code="ASTRO40" time="2M AGO" status="Verified" statusColor="text-emerald-500" statusBg="bg-emerald-50" dotColor="bg-amber-400" />
              <FeedItem name="Mystic_Maven" code="GALAXY_PRO" time="14M AGO" status="Pending" statusColor="text-amber-500" statusBg="bg-amber-50" dotColor="bg-blue-400" />
              <FeedItem name="Cosmic_Child" code="ASTRO40" time="48M AGO" status="Verified" statusColor="text-emerald-500" statusBg="bg-emerald-50" />
              <FeedItem name="Solar_Spirit" code="LUNAR_NEW" time="1H AGO" status="Pending" statusColor="text-amber-500" statusBg="bg-amber-50" />
            </div>
            <button className="w-full py-4 bg-slate-900 text-white text-[11px] font-semibold hover:bg-slate-800 transition-all uppercase tracking-widest mt-auto rounded-lg">
              View Transaction Log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingGrowth;
