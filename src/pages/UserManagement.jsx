import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, Filter, Edit2, Ban, Trash2, Shield } from 'lucide-react';

const UserRow = ({ id, name, email, avatar, date, kyc, wallet, status }) => {
  const navigate = useNavigate();
  
  const getKycStyle = (status) => {
    switch(status) {
      case 'VERIFIED': return 'text-[#10B981] border-[#10B981] bg-[#ECFDF5]';
      case 'PENDING': return 'text-[#F59E0B] border-[#F59E0B] bg-[#FFFBEB]';
      case 'NOT STARTED': return 'text-[#64748B] border-[#94A3B8] bg-[#F8FAFC]';
      default: return 'text-slate-500 border-slate-200 bg-white';
    }
  };

  const getKycDot = (status) => {
    switch(status) {
      case 'VERIFIED': return 'bg-[#10B981]';
      case 'PENDING': return 'bg-[#F59E0B]';
      case 'NOT STARTED': return 'bg-[#94A3B8]';
      default: return 'bg-slate-400';
    }
  };

  return (
    <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
      <td className="py-3 px-6">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => navigate(`/users/${id}`)}
        >
          <img src={avatar} alt={name} className="w-9 h-9 rounded-full object-cover border border-slate-200 group-hover:border-[#00BAF2] transition-colors" />
          <div>
            <h4 className="text-[13px] font-semibold text-slate-900 group-hover:text-[#00BAF2] transition-colors">{name}</h4>
            <p className="text-[11px] text-slate-400">{email}</p>
          </div>
        </div>
      </td>
      <td className="py-3 px-6 text-[12px] text-slate-600 font-medium">{date}</td>
      <td className="py-3 px-6">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px] font-bold tracking-wider ${getKycStyle(kyc)}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${getKycDot(kyc)}`}></span>
          {kyc}
        </div>
      </td>
      <td className="py-3 px-6 text-[13px] font-semibold text-[#D4AF37]">{wallet}</td>
      <td className="py-3 px-6">
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${status === 'Active' ? 'bg-[#818CF8]' : 'bg-slate-700'}`}></span>
          <span className={`text-[12px] font-medium ${status === 'Active' ? 'text-[#818CF8]' : 'text-slate-700'}`}>
            {status}
          </span>
        </div>
      </td>
      <td className="py-3 px-6">
        <div className="flex items-center gap-4 text-slate-300">
          <button className="hover:text-slate-500 transition-colors"><Edit2 size={14} /></button>
          <button className={`hover:text-slate-500 transition-colors ${status === 'Blocked' ? 'text-[#818CF8]' : ''}`}>
            {status === 'Blocked' ? <Shield size={14} /> : <Ban size={14} />}
          </button>
          <button className="hover:text-rose-500 transition-colors"><Trash2 size={14} /></button>
        </div>
      </td>
    </tr>
  );
};

const UserManagement = () => {
  const users = [
    { id: '1', name: 'Selene Nightfall', email: 'selene@astral.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80', date: 'Oct 12, 2023', kyc: 'VERIFIED', wallet: '$1,240.50', status: 'Active' },
    { id: '2', name: 'Arion Starlight', email: 'arion.s@cosmic.net', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80', date: 'Nov 05, 2023', kyc: 'PENDING', wallet: '$45.00', status: 'Active' },
    { id: '3', name: 'Lyra Moon', email: 'lyra.moon@void.io', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80', date: 'Dec 01, 2023', kyc: 'NOT STARTED', wallet: '$0.00', status: 'Blocked' },
    { id: '4', name: 'Cassian Vesper', email: 'vesper@horizon.co', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80', date: 'Jan 14, 2024', kyc: 'VERIFIED', wallet: '$8,450.00', status: 'Active' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-2xl font-bold text-slate-900 tracking-tight">User Management</h1>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 flex items-center gap-4">
        <div className="relative flex-grow">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Filter by name, email or astral sign..." 
            className="w-full pl-10 pr-4 py-2.5 bg-transparent border border-slate-200 rounded-lg text-[13px] text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#00BAF2] focus:border-[#00BAF2]"
          />
        </div>
        
        <div className="relative min-w-[160px]">
          <select className="w-full px-4 py-2.5 bg-transparent border border-slate-200 rounded-lg text-[13px] text-slate-700 font-medium appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#00BAF2] focus:border-[#00BAF2]">
            <option>All KYC Status</option>
            <option>Verified</option>
            <option>Pending</option>
            <option>Not Started</option>
          </select>
          <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
        </div>

        <div className="relative min-w-[140px]">
          <select className="w-full px-4 py-2.5 bg-transparent border border-slate-200 rounded-lg text-[13px] text-slate-700 font-medium appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#00BAF2] focus:border-[#00BAF2]">
            <option>All roles</option>
            <option>Seeker</option>
            <option>Admin</option>
          </select>
          <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
        </div>

        <button className="p-2.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
          <Filter size={18} />
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-slate-100">
                <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">User Profile</th>
                <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Join Date</th>
                <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">KYC Status</th>
                <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wallet Balance</th>
                <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <UserRow 
                  key={index} 
                  {...user} 
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="py-4 px-6 border-t border-slate-100 flex items-center justify-between">
          <p className="text-[11px] text-slate-400 font-medium w-48">Showing 1 to 10 of 420 cosmic seekers</p>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-100 text-slate-400 hover:bg-slate-50 text-[12px] font-medium">&lt;</button>
            <button className="w-7 h-7 flex items-center justify-center rounded bg-[#E0E7FF] text-[#4F46E5] text-[12px] font-bold">1</button>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-100 text-slate-500 hover:bg-slate-50 text-[12px] font-medium">2</button>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-100 text-slate-500 hover:bg-slate-50 text-[12px] font-medium">3</button>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-100 text-slate-400 hover:bg-slate-50 text-[12px] font-medium">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
