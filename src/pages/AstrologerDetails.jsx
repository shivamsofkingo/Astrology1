import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, Edit2, Ban, ShieldCheck, ExternalLink, TrendingUp, Award
} from 'lucide-react';

const StatCard = ({ label, value, subValue, icon: Icon, colorClass, bgClass, trend }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-full">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <p className={`text-2xl font-semibold ${colorClass}`}>{value}</p>
      </div>
      <div className={`${bgClass} ${colorClass} p-2 rounded-xl`}>
        {Icon && <Icon size={20} />}
      </div>
    </div>
    {trend && (
      <p className="text-[10px] font-semibold text-emerald-500 mt-2 flex items-center gap-1">
        {trend}
      </p>
    )}
    {subValue && (
      <div className="mt-2">{subValue}</div>
    )}
  </div>
);

const AstrologerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-6">
          <img 
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80" 
            alt="Alex Rivers" 
            className="w-20 h-20 rounded-full border-4 border-white shadow-xl object-cover" 
          />
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Alex Rivers</h1>
              <div className="flex items-center gap-2">
                <span className="bg-[#E0E7FF] text-[#4F46E5] text-[9px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 uppercase">
                   <div className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full"></div> Active
                </span>
                <span className="bg-[#FEF9C3] text-[#A16207] text-[9px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 uppercase">
                   ⭐ Premium Tier
                </span>
                <span className="bg-slate-800 text-white text-[9px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 uppercase">
                   🛡️ KYC Verified
                </span>
              </div>
            </div>
            <p className="text-[10px] font-medium text-slate-300 tracking-[0.2em] uppercase">UID: 8842-XQ-ORACLE-2024</p>
          </div>
        </div>
        <button 
          onClick={() => navigate(-1)}
          className="bg-[#00BAF2] text-white px-8 py-2 rounded-lg text-[13px] font-semibold uppercase tracking-widest hover:bg-[#00A0D2] transition-all shadow-lg shadow-[#00BAF2]/30"
        >
          Back
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard 
          label="Total Earnings" 
          value="$12,450.00" 
          colorClass="text-indigo-600" 
          bgClass="bg-indigo-50" 
          trend="+12% ↑"
        />
        <StatCard 
          label="Avg Rating" 
          value="4.9" 
          colorClass="text-amber-500" 
          bgClass="bg-amber-50"
          subValue={
            <div className="flex text-amber-400">
               {[1,2,3,4,5].map(i => <Star key={i} size={10} fill={i < 5 ? "currentColor" : "none"} />)}
            </div>
          }
        />
        <StatCard 
          label="Consultations" 
          value="1,248" 
          colorClass="text-purple-600" 
          bgClass="bg-purple-50"
          icon={TrendingUp}
        />
        <StatCard 
          label="Current Status" 
          value={isOnline ? "Online" : "Offline"} 
          colorClass={isOnline ? "text-amber-500" : "text-slate-400"} 
          bgClass={isOnline ? "bg-amber-50" : "bg-slate-50"}
          subValue={<div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-amber-400' : 'bg-slate-300'}`}></div>}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Earnings Trajectory */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-semibold text-slate-800">Earnings Trajectory</h3>
              <div className="flex gap-2">
                <button className="text-[10px] font-semibold text-slate-400 px-2 py-1 rounded hover:bg-slate-50 uppercase">30 Days</button>
                <button className="text-[10px] font-semibold text-[#00BAF2] px-2 py-1 rounded bg-[#00BAF2]/5 uppercase">90 Days</button>
              </div>
            </div>
            <div className="flex-1 flex items-end gap-2 px-4">
              {[40, 70, 45, 90, 60, 50, 80, 55, 75, 95].map((h, i) => (
                <div key={i} className="flex-1 bg-indigo-50 rounded-t-lg transition-all hover:bg-indigo-100" style={{ height: `${h}%` }}></div>
              ))}
            </div>
            <div className="flex justify-between mt-4 px-4 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
               <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>

          {/* Lineage & Expertise */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-xl font-semibold text-indigo-400 mb-6">Lineage & Expertise</h3>
            <div className="space-y-6 text-[15px] leading-relaxed text-slate-600">
              <p>Oracle Selene is a 3rd generation Vedic practitioner with over 15 years of cosmic counseling. Specialized in transit analysis and karmic patterns, she utilizes a synthesis of Hellenistic techniques and Modern Evolutionary Astrology.</p>
              <p>Her lineage traces back to the celestial observers of the Rajasthan plains, bringing a grounded, traditional wisdom to her modern digital readings.</p>
            </div>
            <div className="flex flex-wrap gap-3 mt-8">
              {['Vedic Mastery', 'Tarot Synthesis', 'Palmistry', 'Prashna'].map(tag => (
                <span key={tag} className="bg-indigo-50 text-indigo-500 px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-8">
          <div className="bg-white p-8 pb-16 rounded-2xl border border-slate-100 shadow-sm min-h-[620px]">
            <div className="flex items-center gap-2 mb-8">
              <Award className="text-indigo-400" size={18} />
              <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">Administrative Controls</h3>
            </div>
            
            <button className="w-full border border-slate-200 py-3 rounded-xl text-indigo-500 text-[12px] font-semibold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all mb-8">
              <Edit2 size={14} /> Edit Practitioner Profile
            </button>

            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[13px] font-semibold text-slate-800">Active Availability</p>
                  <p className="text-[11px] text-slate-400">Controls online/offline status</p>
                </div>
                <div 
                  onClick={() => setIsOnline(!isOnline)}
                  className={`w-12 h-6 rounded-full relative cursor-pointer transition-all ${isOnline ? 'bg-amber-400' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isOnline ? 'right-1' : 'left-1'}`}></div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-50">
                <div className="flex justify-between items-center mb-2">
                   <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">Commission Split</p>
                   <span className="text-amber-500 font-semibold text-[14px]">20%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                   <div className="w-[20%] h-full bg-amber-400"></div>
                </div>
                <p className="text-[10px] text-slate-400 mt-2 text-right">Platform Share</p>
              </div>

              <div className="pt-6 border-t border-slate-50 space-y-4">
                 <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">Per-Minute Rates ($)</p>
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="text-[10px] font-semibold text-slate-400 uppercase block mb-1">Chat</label>
                     <input type="text" value="3.50" readOnly className="w-full bg-slate-50 border border-slate-100 rounded-lg p-2.5 text-[13px] text-slate-600 font-medium" />
                   </div>
                   <div>
                     <label className="text-[10px] font-semibold text-slate-400 uppercase block mb-1">Voice</label>
                     <input type="text" value="5.00" readOnly className="w-full bg-slate-50 border border-slate-100 rounded-lg p-2.5 text-[13px] text-slate-600 font-medium" />
                   </div>
                 </div>
                 <div>
                   <label className="text-[10px] font-semibold text-slate-400 uppercase block mb-1">Video</label>
                   <input type="text" value="12.00" readOnly className="w-full bg-slate-50 border border-slate-100 rounded-lg p-2.5 text-[13px] text-slate-600 font-medium" />
                 </div>
              </div>

              <button className="w-full bg-rose-900/10 text-rose-600 py-3 rounded-xl text-[12px] font-semibold flex items-center justify-center gap-2 hover:bg-rose-900/20 transition-all mt-12 border border-rose-600/20">
                <Ban size={14} /> Block Practitioner
              </button>
              <p className="text-[10px] text-slate-400 text-center leading-relaxed">Blocking will suspend all pending payouts and cancel future bookings.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Vault (Full Width) */}
      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-semibold text-slate-800">Verification Vault</h3>
          <ShieldCheck className="text-amber-400" size={24} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative group overflow-hidden rounded-xl border border-slate-200">
            <img src="https://images.unsplash.com/photo-1633113088983-12fb3b2fe0ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="Doc 1" className="w-full h-64 object-cover opacity-80 group-hover:opacity-100 transition-all" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
               <button className="bg-white text-slate-900 px-6 py-3 rounded-lg text-[13px] font-semibold uppercase tracking-widest flex items-center gap-2">
                 <ExternalLink size={16} /> View Document
               </button>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-xl border border-slate-200">
            <img src="https://images.unsplash.com/photo-1589330694653-ded6df03f754?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="Doc 2" className="w-full h-64 object-cover opacity-80 group-hover:opacity-100 transition-all" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
               <button className="bg-white text-slate-900 px-6 py-3 rounded-lg text-[13px] font-semibold uppercase tracking-widest flex items-center gap-2">
                 <ExternalLink size={16} /> View Document
               </button>
            </div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="flex justify-between items-center py-4 border-b border-slate-50 text-[13px]">
              <span className="text-slate-400 font-medium uppercase tracking-wider">Background Check</span>
              <span className="text-emerald-500 font-semibold">CLEARED</span>
           </div>
           <div className="flex justify-between items-center py-4 border-b border-slate-50 text-[13px]">
              <span className="text-slate-400 font-medium uppercase tracking-wider">Professional Indemnity</span>
              <span className="text-amber-500 font-semibold">ACTIVE</span>
           </div>
        </div>
      </div>

      {/* Recent User Impressions (Full Width Footer) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
           <h3 className="text-2xl font-semibold text-slate-800">Recent User Impressions</h3>
           <span className="text-[13px] font-medium text-slate-400 italic">Showing 3 of 842 reviews</span>
        </div>
        <div className="space-y-6">
           {[
             { name: "Aria V.", date: "2 days ago", type: "Video Session", text: "Selene saw things in my chart that I haven't shared with anyone. Truly gifted and compassionate. The transit analysis was incredibly detailed." },
             { name: "Marcus Thorne", date: "5 days ago", type: "Chat Session", text: "Very professional and precise. She doesn't waste time and gets straight to the core of the cosmic alignments affecting your career path." },
             { name: "Kai S.", date: "1 week ago", type: "Voice Session", text: "Great session, just wish it could have been longer. Looking forward to our follow-up in Mercury Direct." }
           ].map((rev, i) => (
             <div key={i} className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 space-y-2">
               <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-[13px] ${i === 0 ? 'bg-indigo-500' : i === 1 ? 'bg-slate-800' : 'bg-purple-400'}`}>
                        {rev.name.charAt(0)}
                     </div>
                     <div>
                        <p className="text-[14px] font-semibold text-slate-900">{rev.name}</p>
                        <p className="text-[11px] text-slate-400">{rev.date} • {rev.type}</p>
                     </div>
                  </div>
                  <div className="flex text-amber-400">
                     {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="currentColor" />)}
                  </div>
               </div>
               <p className="text-[14px] text-slate-600 leading-relaxed">"{rev.text}"</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default AstrologerDetails;
