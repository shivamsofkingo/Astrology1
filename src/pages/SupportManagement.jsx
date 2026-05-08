import React from 'react';
import { 
  AlertTriangle, ClipboardList, Clock, Banknote, 
  ChevronRight, Search, Filter, MoreVertical,
  User, ShieldAlert, Cpu, CheckCircle2
} from 'lucide-react';

const StatCard = ({ label, value, trend, subtext, icon: Icon, iconBg, iconColor, trendColor }) => (
  <div className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm">
    <div className="flex justify-between items-start mb-3">
      <div className={`p-2 rounded-lg ${iconBg} ${iconColor}`}>
        <Icon size={20} />
      </div>
      {trend && (
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${trendColor}`}>
          {trend}
        </span>
      )}
    </div>
    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <div className="flex items-baseline gap-2">
      <h3 className="text-3xl font-semibold text-slate-900">{value}</h3>
      {subtext && <span className="text-[10px] font-semibold text-slate-400">{subtext}</span>}
    </div>
  </div>
);

const DisputeRow = ({ id, reporter, reason, reasonIcon: ReasonIcon, priority, status, statusColor }) => (
  <tr className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors group">
    <td className="py-4 px-6 text-[13px] font-semibold text-slate-500">{id}</td>
    <td className="py-4 px-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-[10px] font-bold">
          {reporter.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <h4 className="text-[13px] font-semibold text-slate-900">{reporter.name}</h4>
          <p className="text-[10px] text-slate-400 font-semibold">{reporter.role}</p>
        </div>
      </div>
    </td>
    <td className="py-4 px-6">
      <div className="flex items-center gap-2">
        <span className="text-[13px] font-semibold text-slate-700">{reason}</span>
        {ReasonIcon && <ReasonIcon size={14} className="text-amber-500" />}
      </div>
    </td>
    <td className="py-4 px-6">
      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
        priority === 'URGENT' ? 'bg-rose-50 text-rose-500' :
        priority === 'NORMAL' ? 'bg-amber-50 text-amber-500' :
        'bg-slate-100 text-slate-400'
      }`}>
        {priority}
      </span>
    </td>
    <td className="py-4 px-6">
      <div className="flex items-center gap-2">
        <div className={`w-1.5 h-1.5 rounded-full ${statusColor}`}></div>
        <span className="text-[13px] font-semibold text-slate-700">{status}</span>
      </div>
    </td>
    <td className="py-4 px-6 text-right">
      <button className="text-slate-300 group-hover:text-[#00BAF2] transition-colors">
        <ChevronRight size={18} />
      </button>
    </td>
  </tr>
);

const SupportManagement = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dispute & Support Management</h1>
        <p className="text-[14px] text-slate-500 mt-1 font-semibold">Managing celestial misalignments and user reports.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard 
          label="Open Disputes" 
          value="12" 
          trend="+4 since yesterday" 
          icon={AlertTriangle} 
          iconBg="bg-rose-50" 
          iconColor="text-rose-500" 
          trendColor="text-rose-500 bg-rose-50"
        />
        <StatCard 
          label="Pending Reports" 
          value="48" 
          subtext="In-queue processing"
          icon={ClipboardList} 
          iconBg="bg-indigo-50" 
          iconColor="text-indigo-500" 
        />
        <StatCard 
          label="Avg. Resolution Time" 
          value="4.2h" 
          trend="-12% this week" 
          icon={Clock} 
          iconBg="bg-amber-50" 
          iconColor="text-amber-500" 
          trendColor="text-emerald-500 bg-emerald-50"
        />
        <StatCard 
          label="Refunds Processed" 
          value="$1,240" 
          subtext="Current month total"
          icon={Banknote} 
          iconBg="bg-emerald-50" 
          iconColor="text-emerald-500" 
        />
      </div>

      {/* Unified Dispute Queue */}
      <div className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <h2 className="text-[18px] font-bold text-slate-900">Unified Dispute Queue</h2>
          <span className="text-[11px] font-semibold text-slate-400">Showing 1-8 of 12 issues</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                <th className="py-4 px-6">Dispute ID</th>
                <th className="py-4 px-6">Reporter</th>
                <th className="py-4 px-6">Reason</th>
                <th className="py-4 px-6">Priority</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <DisputeRow 
                id="#DSP-4092"
                reporter={{ name: 'Luna Sky', role: '' }}
                reason="Accuracy"
                reasonIcon={ShieldAlert}
                priority="URGENT"
                status="Open"
                statusColor="bg-blue-500"
              />
              <DisputeRow 
                id="#DSP-4088"
                reporter={{ name: 'Zodiac Orin', role: 'Astrologer' }}
                reason="Harassment"
                reasonIcon={AlertTriangle}
                priority="NORMAL"
                status="Investigating"
                statusColor="bg-amber-500"
              />
              <DisputeRow 
                id="#DSP-4088"
                reporter={{ name: 'Zodiac Orin', role: 'Astrologer' }}
                reason="Harassment"
                reasonIcon={AlertTriangle}
                priority="NORMAL"
                status="Investigating"
                statusColor="bg-amber-500"
              />
              <DisputeRow 
                id="#DSP-4085"
                reporter={{ name: 'Aria Mars', role: 'User' }}
                reason="Technical Issue"
                reasonIcon={Cpu}
                priority="LOW"
                status="Resolved"
                statusColor="bg-slate-400"
              />
              <DisputeRow 
                id="#DSP-4085"
                reporter={{ name: 'Aria Mars', role: 'User' }}
                reason="Technical Issue"
                reasonIcon={CheckCircle2}
                priority="LOW"
                status="Resolved"
                statusColor="bg-slate-400"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SupportManagement;