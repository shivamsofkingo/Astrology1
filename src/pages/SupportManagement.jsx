import React from 'react';
import { 
  AlertTriangle, ClipboardList, Clock, Banknote, 
  ChevronRight, Search, Filter, MoreVertical,
  User, ShieldAlert, Cpu, CheckCircle2,
  TrendingUp, RefreshCw, TrendingDown, Frown
} from 'lucide-react';

const StatCard = ({ label, value, trendText, trendColor, trendIcon: TrendIcon, mainIcon: MainIcon }) => (
  <div className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm flex justify-between items-start">
    <div>
      <p className="text-[11px] font-bold text-slate-400 mb-1">{label}</p>
      <h3 className="text-3xl font-bold text-slate-900 mb-3">{value}</h3>
      <div className={`flex items-center gap-1.5 text-[10px] font-bold ${trendColor}`}>
        {TrendIcon && <TrendIcon size={12} />}
        <span>{trendText}</span>
      </div>
    </div>
    <div className="text-slate-300">
      <MainIcon size={24} />
    </div>
  </div>
);

const DisputeRow = ({ id, reporter, reason, reasonIcon: ReasonIcon, priority, status, statusColor }) => (
  <tr className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors group">
    <td className="py-3.5 px-6 text-[13px] font-semibold text-slate-500">{id}</td>
    <td className="py-3.5 px-6">
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
    <td className="py-3.5 px-6">
      <div className="flex items-center gap-2">
        <span className="text-[13px] font-semibold text-slate-700">{reason}</span>
        {ReasonIcon && <ReasonIcon size={14} className="text-amber-500" />}
      </div>
    </td>
    <td className="py-3.5 px-6">
      <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
        priority === 'URGENT' ? 'bg-rose-50 text-rose-300' :
        priority === 'NORMAL' ? 'bg-amber-50 text-amber-300' :
        'bg-slate-100 text-slate-300'
      }`}>
        {priority}
      </span>
    </td>
    <td className="py-3.5 px-6">
      <div className="flex items-center gap-2">
        <div className={`w-1.5 h-1.5 rounded-full ${statusColor}`}></div>
        <span className="text-[13px] font-semibold text-slate-700">{status}</span>
      </div>
    </td>
    <td className="py-3.5 px-6 text-right">
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
          trendText="+4 since yesterday" 
          trendColor="text-rose-500"
          trendIcon={TrendingUp}
          mainIcon={AlertTriangle} 
        />
        <StatCard 
          label="Pending Reports" 
          value="48" 
          trendText="In-queue processing"
          trendColor="text-slate-400"
          trendIcon={RefreshCw}
          mainIcon={ClipboardList} 
        />
        <StatCard 
          label="Avg. Resolution Time" 
          value="4.2h" 
          trendText="-12% this week" 
          trendColor="text-slate-300"
          trendIcon={TrendingDown}
          mainIcon={Clock} 
        />
        <StatCard 
          label="Refunds Processed" 
          value="$1,240" 
          trendText="Current month total"
          trendColor="text-slate-400"
          mainIcon={Banknote} 
        />
      </div>

      {/* Unified Dispute Queue */}
      <div className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden">
        <div className="py-5 px-6 border-b border-slate-50 flex justify-between items-center">
          <h2 className="text-[13px] font-bold text-slate-900">Unified Dispute Queue</h2>
          <span className="text-[9px] font-semibold text-slate-400">Showing 1-6 of 12 issues</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white text-[10px] font-bold text-slate-400 border-b border-slate-50">
                <th className="py-3.5 px-6 font-semibold">Dispute ID</th>
                <th className="py-3.5 px-6 font-semibold">Reporter</th>
                <th className="py-3.5 px-6 font-semibold">Reason</th>
                <th className="py-3.5 px-6 font-semibold">Priority</th>
                <th className="py-3.5 px-6 font-semibold">Status</th>
                <th className="py-3.5 px-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <DisputeRow 
                id="#DSP-4092"
                reporter={{ name: 'Luna Sky', role: 'User' }}
                reason="Accuracy"
                reasonIcon={Frown}
                priority="URGENT"
                status="Open"
                statusColor="bg-indigo-500"
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