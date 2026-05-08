import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Zap, Clock, ShieldAlert,
  ChevronDown, Plus, ChevronRight, Search
} from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, colorClass, bgClass }) => (
  <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm flex items-center gap-4 flex-1">
    <div className={`${bgClass} ${colorClass} p-3 rounded-lg`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-2xl font-semibold text-slate-900">{value}</p>
    </div>
  </div>
);

const AstrologerRow = ({ id, name, avatar, joinDate, kycStatus, rate, specialty }) => {
  const navigate = useNavigate();
  return (
    <tr className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
      <td className="py-4 px-6">
        <div 
          onClick={() => navigate(`/astrologers/${id}`)}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img src={avatar} alt={name} className="w-10 h-10 rounded-full border border-slate-100 object-cover group-hover:scale-105 transition-transform" />
          <div>
            <p className="text-[14px] font-semibold text-slate-900 group-hover:text-indigo-500 transition-colors">{name}</p>
            <p className="text-[11px] text-slate-400 font-medium">ID: {id}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-6 text-center">
        <p className="text-[14px] font-medium text-slate-600">{joinDate}</p>
      </td>
      <td className="py-4 px-6">
        <div className="flex justify-center">
          <span className="bg-emerald-50 text-emerald-600 text-[10px] font-semibold px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1.5 w-fit uppercase tracking-wider">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
            {kycStatus}
          </span>
        </div>
      </td>
      <td className="py-4 px-6 text-center">
        <p className="text-[14px] font-semibold text-amber-500">
          ₹ {rate}<span className="text-[11px] text-slate-400 font-medium ml-1">/-min</span>
        </p>
      </td>
      <td className="py-4 px-6">
        <div className="flex justify-center">
          <span className="bg-indigo-50 text-indigo-600 text-[9px] font-semibold px-3 py-1.5 rounded-lg uppercase tracking-widest">
            {specialty}
          </span>
        </div>
      </td>
      <td className="py-4 px-6 text-right">
        <button 
          onClick={() => navigate(`/astrologers/${id}`)}
          className="p-2 rounded-full border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-indigo-500 transition-all"
        >
          <ChevronRight size={18} />
        </button>
      </td>
    </tr>
  );
};

const AstrologerManagement = () => {
  const astrologers = [
    { id: 'AST-8812', name: 'Alex Josch', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80', joinDate: 'Oct 12, 2025', kycStatus: 'VERIFIED', rate: '20', specialty: 'VEDIC ASTROLOGY' },
    { id: 'AST-8813', name: 'Sarah Moon', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80', joinDate: 'Oct 14, 2025', kycStatus: 'VERIFIED', rate: '25', specialty: 'NUMEROLOGY' },
    { id: 'AST-8814', name: 'David Star', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80', joinDate: 'Oct 15, 2025', kycStatus: 'VERIFIED', rate: '15', specialty: 'TAROT READING' },
    { id: 'AST-8815', name: 'Elena Sun', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80', joinDate: 'Oct 18, 2025', kycStatus: 'VERIFIED', rate: '30', specialty: 'VEDIC ASTROLOGY' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">Astrologer Management</h1>
      </div>

      {/* Top Stat Cards */}
      <div className="flex gap-6 overflow-x-auto pb-2 no-scrollbar">
        <StatCard
          icon={Users}
          label="Total Astrologers"
          value="1,248"
          colorClass="text-indigo-500"
          bgClass="bg-indigo-50"
        />
        <StatCard
          icon={Zap}
          label="Live Now"
          value="84"
          colorClass="text-amber-500"
          bgClass="bg-amber-50"
        />
        <StatCard
          icon={Clock}
          label="Pending Verification"
          value="12"
          colorClass="text-purple-500"
          bgClass="bg-purple-50"
        />
        <StatCard
          icon={ShieldAlert}
          label="Compliance Alerts"
          value="3"
          colorClass="text-rose-500"
          bgClass="bg-rose-50"
        />
      </div>

      {/* Filters and Actions */}
      <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm flex flex-wrap justify-between items-center gap-4">
        <div className="flex gap-4">
          <div className="relative">
            <select className="appearance-none bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 pr-10 text-[13px] font-semibold text-slate-700 min-w-[160px] cursor-pointer hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
              <option>Specialty</option>
              <option>Vedic</option>
              <option>Tarot</option>
              <option>Numerology</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
          </div>
          <div className="relative">
            <select className="appearance-none bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 pr-10 text-[13px] font-semibold text-slate-700 min-w-[160px] cursor-pointer hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
              <option>Status</option>
              <option>Verified</option>
              <option>Pending</option>
              <option>Blocked</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
          </div>
        </div>

        <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-[13px] font-semibold flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20">
          <Plus size={18} /> Add New Astrologer
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="py-5 px-6 text-[11px] font-semibold text-slate-500 uppercase tracking-widest">User Profile</th>
                <th className="py-5 px-6 text-[11px] font-semibold text-slate-500 uppercase tracking-widest text-center">Join Date</th>
                <th className="py-5 px-6 text-[11px] font-semibold text-slate-500 uppercase tracking-widest text-center">KYC Status</th>
                <th className="py-5 px-6 text-[11px] font-semibold text-slate-500 uppercase tracking-widest text-center">Rates</th>
                <th className="py-5 px-6 text-[11px] font-semibold text-slate-500 uppercase tracking-widest text-center">Specialty</th>
                <th className="py-5 px-6 text-[11px] font-semibold text-slate-500 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {astrologers.map((astro) => (
                <AstrologerRow key={astro.id} {...astro} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-6 border-t border-slate-50 flex justify-between items-center bg-white">
          <p className="text-[12px] text-slate-400 font-medium">
            Showing <span className="text-slate-900 font-semibold">1 to 4</span> of 20 results
          </p>
          <div className="flex items-center gap-1">
            <button className="p-2 text-slate-400 hover:text-indigo-500 disabled:opacity-30" disabled>
              <ChevronRight size={18} className="rotate-180" />
            </button>
            <button className="w-8 h-8 rounded-lg bg-indigo-500 text-white text-[12px] font-semibold shadow-md shadow-indigo-500/20">1</button>
            <button className="w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-50 text-[12px] font-semibold">2</button>
            <button className="w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-50 text-[12px] font-semibold">3</button>
            <button className="p-2 text-slate-400 hover:text-indigo-500">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AstrologerManagement;
