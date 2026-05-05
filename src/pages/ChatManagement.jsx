import React, { useState } from 'react';
import { 
  Video, MessageSquare, Phone, Search, 
  SlidersHorizontal, Clock, ShieldCheck,
  ChevronRight, MoreVertical, Info
} from 'lucide-react';

const LiveSessionCard = ({ user, sign, astrologer, type, icon: Icon, duration }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex-1 min-w-[300px]">
    <div className="flex justify-between items-start mb-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
           <img src={`https://i.pravatar.cc/150?u=${user}`} alt={user} className="w-10 h-10 rounded-full" />
        </div>
        <div>
          <p className="text-[14px] font-semibold text-slate-900">{user}</p>
          <p className="text-[11px] text-slate-400 font-medium">{sign}</p>
        </div>
      </div>
      <span className="bg-amber-50 text-amber-600 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-amber-100">
        LIVE NOW
      </span>
    </div>
    
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-[12px] text-slate-400 font-medium">Astrologer</span>
        <span className="text-[13px] font-semibold text-slate-800">{astrologer}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-[12px] text-slate-400 font-medium">Type</span>
        <div className="flex items-center gap-1.5 text-indigo-500 font-semibold text-[13px]">
          <Icon size={14} /> {type}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-[12px] text-slate-400 font-medium">Duration</span>
        <span className="text-[14px] font-bold text-amber-500 font-mono">{duration}</span>
      </div>
    </div>
  </div>
);

const ChatManagement = () => {
  const [autoDisconnect, setAutoDisconnect] = useState(true);
  const [balanceWarning, setBalanceWarning] = useState(true);

  const history = [
    { id: 1, user: 'Elena S.', astrologer: 'Oracle Luna', type: 'Voice', date: 'Oct 24, 2023', time: '14:00 - 14:45', duration: '45m 00s', billing: '$112.50', status: 'COMPLETED' },
    { id: 2, user: 'Marc V.', astrologer: 'Oracle Orion', type: 'Chat', date: 'Oct 24, 2023', time: '10:30 - 10:42', duration: '12m 15s', billing: '$30.37', status: 'COMPLETED' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">Chat / Call / Video Management</h1>
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
           <p className="text-[13px] text-slate-500 font-medium ">Live Session Monitoring</p>
        </div>
      </div>

      {/* Live Sessions Grid */}
      <div className="flex justify-between items-end mb-4">
         <h2 className="ml-3 text-[11px] font-bold text-slate-600 uppercase tracking-widest">Active Sessions</h2>
         <button className="mr-2 text-[11px] font-bold text-slate-600 hover:text-slate-900 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded">View All</button>
      </div>
      <div className="flex gap-6 overflow-x-auto no-scrollbar pb-2">
        <LiveSessionCard 
          user="Alex Rivers" 
          sign="Capricorn Sun" 
          astrologer="Oracle Astraea" 
          type="Video Call" 
          icon={Video} 
          duration="24:12" 
        />
        <LiveSessionCard 
          user="James D." 
          sign="Leo Moon" 
          astrologer="Master Solon" 
          type="Chat" 
          icon={MessageSquare} 
          duration="08:45" 
        />
      </div>

      {/* Consultation History */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mt-10">
        <div className="p-6 border-b border-slate-50 flex flex-wrap justify-between items-center gap-4">
           <h3 className="text-lg font-semibold text-slate-800">Consultation History</h3>
           <div className="flex gap-3">
              <div className="relative">
                 <input 
                   type="text" 
                   placeholder="Search sessions..." 
                   className="pl-10 pr-4 py-2 bg-slate-900 text-white text-[13px] rounded-lg w-[260px] focus:outline-none placeholder:text-slate-500"
                 />
                 <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 text-[13px] font-semibold hover:bg-slate-100 transition-all">
                <SlidersHorizontal size={14} /> Filter
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-400/10 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                <th className="py-4 px-6">Participants</th>
                <th className="py-4 px-6 text-center">Type</th>
                <th className="py-4 px-6 text-center">Start/End</th>
                <th className="py-4 px-6 text-center">Duration</th>
                <th className="py-4 px-6 text-center">Billing</th>
                <th className="py-4 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-slate-700 font-medium">
              {history.map((row) => (
                <tr key={row.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                  <td className="py-5 px-6">
                    <p className="font-semibold text-slate-900">{row.user}</p>
                    <p className="text-[11px] text-indigo-400 font-medium ">{row.astrologer}</p>
                  </td>
                  <td className="py-5 px-6 text-center">
                    <div className="flex items-center justify-center gap-2 text-slate-500">
                       {row.type === 'Voice' ? <Phone size={14} /> : <MessageSquare size={14} />}
                       {row.type}
                    </div>
                  </td>
                  <td className="py-5 px-6 text-center">
                    <p className="text-slate-900">{row.time}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-tighter">{row.date}</p>
                  </td>
                  <td className="py-5 px-6 text-center text-slate-500">{row.duration}</td>
                  <td className="py-5 px-6 text-center font-semibold text-amber-500">{row.billing}</td>
                  <td className="py-5 px-6 text-right">
                    <span className="bg-indigo-50 text-indigo-500 text-[9px] font-bold px-3 py-1 rounded uppercase tracking-wider">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Financial Safety */}
      <div className="max-w-2xl">
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-8">
           <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="text-amber-400" size={20} />
              <h3 className="text-lg font-semibold text-slate-800">Financial Safety</h3>
           </div>

           <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[14px] font-semibold text-slate-800">Auto-Disconnect</p>
                  <p className="text-[11px] text-slate-400">When wallet hits $0</p>
                </div>
                <div 
                  onClick={() => setAutoDisconnect(!autoDisconnect)}
                  className={`w-12 h-6 rounded-full relative cursor-pointer transition-all ${autoDisconnect ? 'bg-indigo-500' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${autoDisconnect ? 'right-1' : 'left-1'}`}></div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[14px] font-semibold text-slate-800">Balance Warning</p>
                  <p className="text-[11px] text-slate-400">Notify at 2 min remaining</p>
                </div>
                <div 
                  onClick={() => setBalanceWarning(!balanceWarning)}
                  className={`w-12 h-6 rounded-full relative cursor-pointer transition-all ${balanceWarning ? 'bg-indigo-500' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${balanceWarning ? 'right-1' : 'left-1'}`}></div>
                </div>
              </div>
           </div>

           <div className="pt-8 border-t border-slate-50 space-y-4">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Max Session Duration</h4>
              <div className="relative pt-6 pb-2">
                 <div className="absolute top-1/2 left-0 w-full h-[3px] bg-slate-900 -translate-y-1/2"></div>
                 <div className="flex justify-between relative">
                    <div className="flex flex-col items-center gap-2">
                       <div className="w-1 h-3 bg-slate-900"></div>
                       <span className="text-[10px] font-bold text-slate-900">30 MIN</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                       <div className="w-1 h-3 bg-slate-900"></div>
                       <span className="text-[10px] font-bold text-slate-900">60 MIN</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                       <div className="w-1 h-3 bg-slate-900"></div>
                       <span className="text-[10px] font-bold text-slate-900">UNLIMITED</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ChatManagement;
