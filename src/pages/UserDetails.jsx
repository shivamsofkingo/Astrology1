import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Download, Ban, Mail, Phone, MapPin, 
  Globe, CreditCard, Clock, Star, 
  ExternalLink, Plus, MessageSquare, Video,
  CheckCircle, AlertTriangle, Trash2, Edit2, Shield
} from 'lucide-react';

const usersData = {
  '1': { id: '1', name: 'Selene Nightfall', email: 'selene@astral.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80', date: 'Oct 12, 2023', kyc: 'VERIFIED', wallet: '$1,240.50', status: 'Active' },
  '2': { id: '2', name: 'Arion Starlight', email: 'arion.s@cosmic.net', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80', date: 'Nov 05, 2023', kyc: 'PENDING', wallet: '$45.00', status: 'Active' },
  '3': { id: '3', name: 'Lyra Moon', email: 'lyra.moon@void.io', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80', date: 'Dec 01, 2023', kyc: 'NOT STARTED', wallet: '$0.00', status: 'Blocked' },
  '4': { id: '4', name: 'Cassian Vesper', email: 'vesper@horizon.co', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80', date: 'Jan 14, 2024', kyc: 'VERIFIED', wallet: '$8,450.00', status: 'Active' },
};

const StatCard = ({ icon: Icon, label, value, color = "text-[#00BAF2]", bgColor = "bg-[#F0F9FF]" }) => (
  <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm flex flex-col gap-2">
    <div className="flex items-center gap-2">
      <div className={`${bgColor} ${color} p-1.5 rounded-lg`}>
        <Icon size={16} />
      </div>
      <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">{label}</span>
    </div>
    <span className="text-xl font-semibold text-slate-900">{value}</span>
  </div>
);

const TabButton = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-1 py-4 text-[14px] font-semibold transition-all relative ${
      active ? 'text-[#00BAF2]' : 'text-slate-400 hover:text-slate-600'
    }`}
  >
    {label}
    {active && (
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00BAF2] rounded-full" />
    )}
  </button>
);

const InfoBox = ({ icon: Icon, title, children }) => (
  <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm h-full">
    <div className="flex items-center gap-2 mb-6">
      <div className="bg-indigo-50 text-indigo-500 p-1.5 rounded-lg">
        <Icon size={16} />
      </div>
      <h3 className="text-[12px] font-semibold text-slate-800 uppercase tracking-wide">{title}</h3>
    </div>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const UserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Profile Details');
  
  const user = usersData[userId] || usersData['1'];

  const renderProfileDetails = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoBox icon={Mail} title="Contact Information">
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-slate-400">Email</span>
            <span className="text-indigo-500 font-medium">{user.email}</span>
          </div>
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-slate-400">Phone</span>
            <span className="text-indigo-500 font-medium">+1 (555) 902-1244</span>
          </div>
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-slate-400">Location</span>
            <span className="text-indigo-500 font-medium">Sedona, AZ (MST)</span>
          </div>
        </InfoBox>
        
        <InfoBox icon={Star} title="Cosmic Profile">
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-slate-400 font-semibold">Sun Sign</span>
            <span className="text-amber-500 font-semibold flex items-center gap-1.5">
               <span className="text-[14px]">♒</span> Aquarius
            </span>
          </div>
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-slate-400 font-semibold">Birth Date</span>
            <span className="text-indigo-500 font-medium">Feb 12, 1994, 04:22 AM</span>
          </div>
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-slate-400 font-semibold">Member Since</span>
            <span className="text-indigo-500 font-medium">October 2021</span>
          </div>
        </InfoBox>
      </div>

      <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-indigo-50 text-indigo-500 p-1.5 rounded-lg">
            <Globe size={16} />
          </div>
          <h3 className="text-[13px] font-semibold text-slate-800 uppercase tracking-wide">Astral Links</h3>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="bg-indigo-400 text-white px-4 py-3 rounded-lg flex items-center gap-3 min-w-[180px]">
             <div className="bg-white/20 p-2 rounded-lg"><Globe size={18} /></div>
             <div>
                <p className="text-[10px] font-semibold opacity-80 uppercase tracking-wider">Instagram</p>
                <p className="text-[13px] font-semibold">@alex_stargazer</p>
             </div>
          </div>
          <div className="bg-amber-300 text-slate-900 px-4 py-3 rounded-lg flex items-center gap-3 min-w-[180px]">
             <div className="bg-white/30 p-2 rounded-lg"><CreditCard size={18} /></div>
             <div>
                <p className="text-[10px] font-semibold opacity-80 uppercase tracking-wider">Astro-Bank</p>
                <p className="text-[13px] font-semibold">ID: 9920334</p>
             </div>
          </div>
          <div className="bg-purple-300 text-slate-900 px-4 py-3 rounded-lg flex items-center gap-3 min-w-[180px]">
             <div className="bg-white/30 p-2 rounded-lg"><ExternalLink size={18} /></div>
             <div>
                <p className="text-[10px] font-semibold opacity-80 uppercase tracking-wider">Portfolio</p>
                <p className="text-[13px] font-semibold">arivers.space</p>
             </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-50 text-indigo-500 p-1.5 rounded-lg">
              <MessageSquare size={16} />
            </div>
            <h3 className="text-[13px] font-semibold text-slate-800 uppercase tracking-wide">Administrative Notes</h3>
          </div>
          <button className="text-[#00BAF2] text-[12px] font-semibold flex items-center gap-1 hover:underline">
            Add Note
          </button>
        </div>
        <div className="space-y-4">
          <div className="border-l-4 border-indigo-400 pl-4 py-1">
             <div className="flex justify-between items-center mb-1">
                <span className="text-[13px] font-semibold text-indigo-500">Staff: Sarah K.</span>
                <span className="text-[11px] text-slate-400">2 days ago</span>
             </div>
             <p className="text-[14px] text-slate-700 font-medium">"User requested a clarification on his natal chart houses. Premium support session booked for next Friday."</p>
          </div>
          <div className="border-l-4 border-amber-400 pl-4 py-1">
             <div className="flex justify-between items-center mb-1">
                <span className="text-[13px] font-semibold text-amber-500">System Update</span>
                <span className="text-[11px] text-slate-400">1 month ago</span>
             </div>
             <p className="text-[14px] text-slate-700 font-medium">"Upgraded to Premium Tier after completing 25 successful sessions."</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderConsultationHistory = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border-l-4 border-indigo-400 shadow-sm">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Total Sessions</p>
          <p className="text-2xl font-semibold text-indigo-600">42</p>
          <p className="text-[10px] text-indigo-400 font-medium mt-1">+3 this month</p>
        </div>
        <div className="bg-white p-6 rounded-lg border-l-4 border-purple-400 shadow-sm">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Total Duration</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-semibold text-purple-600">1,260</p>
            <span className="text-[12px] font-medium text-slate-400">mins</span>
          </div>
          <p className="text-[10px] text-purple-400 font-medium mt-1">Avg 30m / session</p>
        </div>
        <div className="bg-white p-6 rounded-lg border-l-4 border-amber-400 shadow-sm">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Total Spend</p>
          <p className="text-2xl font-semibold text-amber-500">$8,420.00</p>
          <p className="text-[10px] text-amber-400 font-medium mt-1">LTV Tier: Diamond</p>
        </div>
        <div className="bg-white p-6 rounded-lg border-l-4 border-blue-400 shadow-sm">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Avg. Rating</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-semibold text-blue-500">4.9</p>
            <div className="flex text-amber-400">
               {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
            </div>
          </div>
          <p className="text-[10px] text-blue-400 font-medium mt-1">Based on 38 reviews</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-slate-100">
                <th className="py-4 px-6 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Astrologer</th>
                <th className="py-4 px-6 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Date & Time</th>
                <th className="py-4 px-6 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Service</th>
                <th className="py-4 px-6 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Cost</th>
                <th className="py-4 px-6 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="py-4 px-6 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Duration</th>
                <th className="py-4 px-6 text-[10px] font-semibold text-slate-500 uppercase tracking-widest text-center">Rating</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4].map((i) => (
                <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80" alt="Astro" className="w-8 h-8 rounded-full border border-slate-100" />
                      <span className="text-[13px] font-semibold text-slate-900">Alex Josch</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-[13px] font-semibold text-slate-900">Oct 12, 2025</p>
                      <p className="text-[10px] text-slate-400 font-medium uppercase">09:00 AM IST</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1.5 text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md w-fit">
                      {i % 3 === 0 ? <Video size={12} /> : i % 3 === 1 ? <MessageSquare size={12} /> : <Phone size={12} />}
                      <span className="text-[9px] font-semibold uppercase tracking-wider">{i % 3 === 0 ? 'Video' : i % 3 === 1 ? 'Chat' : 'Voice'}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[13px] font-semibold text-amber-500">₹ 60.00</td>
                  <td className="py-4 px-6">
                    <span className="text-[9px] font-semibold text-emerald-500 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full uppercase tracking-widest flex items-center gap-1 w-fit">
                       <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                       Completed
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[13px] font-semibold text-slate-700">30 min</td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col items-center">
                      <div className="flex text-amber-400 mb-0.5">
                        {[1,2,3,4,5].map(s => <Star key={s} size={10} fill="currentColor" />)}
                      </div>
                      <span className="text-[8px] text-slate-400 font-medium italic">Deeply insightful reading</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderWalletBillings = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
           <div className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-[#00BAF2]/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              <p className="text-[9px] font-semibold uppercase text-gray-600  tracking-widest mb-1">Current Balance</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-semibold text-amber-500">1,420.50</span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase">Credits</span>
              </div>
              <p className="text-[10px] text-indigo-500 font-medium mt-1">↑ +20% this month</p>
           </div>
           <div className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm">
              <p className="text-[9px] font-semibold uppercase text-gray-600  tracking-widest mb-1">Total Lifetime Spent</p>
              <p className="text-2xl font-semibold text-slate-300">$12,840.00</p>
              <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-tighter">Active since year zero</p>
           </div>
           <div className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm">
              <p className="text-[9px] font-semibold uppercase text-gray-600  tracking-widest mb-1">Active Subscription</p>
              <p className="text-xl font-semibold text-indigo-400">Cosmos Pro</p>
              <p className="text-[10px] text-amber-400 font-medium mt-1 flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div> Live Connection
              </p>
           </div>
           <div className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm">
              <p className="text-[9px] font-semibold text-gray-600 uppercase tracking-widest mb-1">Next Billing Date</p>
              <p className="text-xl font-semibold text-slate-300">Nov 14, 2024</p>
              <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-tighter">Recurring $299.00 / mo</p>
           </div>
        </div>

        <div className="bg-white p-8 rounded-lg border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
             <h3 className="text-2xl font-semibold text-indigo-100">Transaction History</h3>
             <button className="bg-slate-900 text-white p-1.5 rounded-lg"><ArrowLeft size={14} className="rotate-90" /></button>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full">
               <thead>
                 <tr className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-4">
                   <th className="pb-4">Date</th>
                   <th className="pb-4">ID</th>
                   <th className="pb-4">Type</th>
                   <th className="pb-4">Amount</th>
                   <th className="pb-4">Status</th>
                 </tr>
               </thead>
               <tbody className="text-[13px] font-medium text-slate-800">
                 <tr className="border-b border-slate-50/50">
                    <td className="py-4">Oct 28, 2024</td>
                    <td className="py-4 text-slate-400 ">#TXN-88210-C</td>
                    <td className="py-4"><div className="flex items-center gap-2 text-indigo-400 font-semibold"><Clock size={14} /> Consultation</div></td>
                    <td className="py-4 text-amber-500 ">-$150.00</td>
                    <td className="py-4"><span className="text-[9px] font-semibold text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-100">Completed</span></td>
                 </tr>
                 <tr className="border-b border-slate-50/50">
                    <td className="py-4">Oct 24, 2024</td>
                    <td className="py-4 text-slate-400 ">#TXN-88195-R</td>
                    <td className="py-4"><div className="flex items-center gap-2 text-emerald-400 font-semibold"><Download size={14} className="rotate-180" /> Recharge</div></td>
                    <td className="py-4 text-emerald-500 ">+$500.00</td>
                    <td className="py-4"><span className="text-[9px] font-semibold text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-100">Completed</span></td>
                 </tr>
                 <tr className="border-b border-slate-50/50">
                    <td className="py-4">Oct 20, 2024</td>
                    <td className="py-4 text-slate-400 ">#TXN-88150-S</td>
                    <td className="py-4"><div className="flex items-center gap-2 text-blue-400 font-semibold"><Globe size={14} /> Subscription</div></td>
                    <td className="py-4 text-amber-500 ">-$299.00</td>
                    <td className="py-4"><span className="text-[9px] font-semibold text-amber-500 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider border border-amber-100">Pending</span></td>
                 </tr>
                 <tr className="border-b border-slate-50/50">
                    <td className="py-4">Oct 15, 2024</td>
                    <td className="py-4 text-slate-400 ">#TXN-88012-F</td>
                    <td className="py-4"><div className="flex items-center gap-2 text-indigo-400 font-semibold"><Clock size={14} /> Consultation</div></td>
                    <td className="py-4 font-semibold">$25.00</td>
                    <td className="py-4"><span className="text-[9px] font-semibold text-rose-500 bg-rose-50 px-3 py-1 rounded-full uppercase tracking-wider border border-rose-100">Failed</span></td>
                 </tr>
               </tbody>
             </table>
          </div>
          <button className="w-full text-center py-4 text-[11px] font-semibold text-[#00BAF2] uppercase tracking-widest hover:bg-slate-50 transition-colors mt-4">Load More Transits</button>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">Payment Methods</h3>
              <Plus size={16} className="text-indigo-400 cursor-pointer" />
           </div>
           <div className="space-y-3">
              <div className="border border-indigo-100 rounded-lg p-4 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="bg-slate-800 text-white p-2 rounded-lg"><CreditCard size={18} /></div>
                    <div>
                       <p className="text-[13px] font-semibold text-slate-800">•••• •••• 4242</p>
                       <p className="text-[10px] text-slate-400 font-medium">Expires 12/26</p>
                    </div>
                 </div>
                 <span className="text-[9px] font-semibold text-white bg-indigo-500 px-2 py-0.5 rounded uppercase tracking-wider">Default</span>
              </div>
              <div className="border border-slate-100 rounded-lg p-4 flex items-center gap-3">
                 <div className="bg-slate-800 text-white p-2 rounded-lg"><Globe size={18} /></div>
                 <div>
                    <p className="text-[13px] font-semibold text-slate-800">Chase Bank •••• 9810</p>
                    <p className="text-[10px] text-slate-400 font-medium">Connected</p>
                 </div>
              </div>
           </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
           <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-4">Billing Address</h3>
           <div className="text-[13px] text-slate-800 font-medium space-y-1">
              <p className="text-indigo-400 font-semibold">{user.name}</p>
              <p>1280 Stardust Ave, Suite 402</p>
              <p>Celestial Heights, CA 90210</p>
              <p>United States</p>
           </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
           <div className="flex items-center justify-between mb-4">
              <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">Auto-Recharge</h3>
              <div className="w-10 h-5 bg-indigo-500 rounded-full relative cursor-pointer">
                 <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
              </div>
           </div>
           <p className="text-[11px] text-slate-400 leading-relaxed mb-4">Automatically add credits when balance falls below <span className="text-indigo-400 font-semibold">50 Credits</span>.</p>
           <div className="bg-slate-50 p-4 rounded-lg flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">Amount to add:</span>
              <span className="text-[11px] font-semibold text-amber-500 uppercase tracking-wider">200 Credits ($199)</span>
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-6">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-20 h-20 rounded-full border-4 border-white shadow-xl object-cover" 
          />
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">{user.name}</h1>
              <div className="flex items-center gap-2">
                <span className="bg-[#E0E7FF] text-[#4F46E5] text-[9px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 uppercase">
                   <div className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full"></div> Active
                </span>
                <span className="bg-[#FEF9C3] text-[#A16207] text-[9px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 uppercase">
                   ⭐ Premium Tier
                </span>
                <span className="bg-slate-800 text-white text-[9px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 uppercase">
                   ⚙️ KYC Verified
                </span>
              </div>
            </div>
            <p className="text-[10px] font-medium text-slate-300 tracking-[0.2em] uppercase">UID: 8842-XQ-ORACLE-2024</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-slate-800 text-white px-3.5 py-2 rounded-lg text-[10px] font-semibold uppercase tracking-widest flex items-center gap-1.5 hover:bg-slate-700 transition-all shadow-lg shadow-slate-900/10">
            <Download size={12} /> Export Data
          </button>
          <button className="bg-[#FECACA] text-[#EF4444] px-3.5 py-2 rounded-lg text-[10px] font-semibold uppercase tracking-widest flex items-center gap-1.5 hover:bg-[#FEE2E2] transition-all border border-[#FCA5A5]/30">
            <Ban size={12} /> Suspend
          </button>
          <button 
            onClick={() => navigate(-1)}
            className="bg-[#00BAF2] text-white px-6 py-2 rounded-lg text-[11px] font-semibold uppercase tracking-widest hover:bg-[#00A0D2] transition-all shadow-lg shadow-[#00BAF2]/30"
          >
            Back
          </button>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={CreditCard} label="Total Spent" value="$12,450.00" color="text-blue-500" bgColor="bg-blue-50" />
        <StatCard icon={MessageSquare} label="Consultations" value="42 Sessions" color="text-indigo-500" bgColor="bg-indigo-50" />
        <StatCard icon={Download} label="Wallet Balance" value="$450.50" color="text-amber-500" bgColor="bg-amber-50" />
        <StatCard icon={Star} label="Avg. Rating Given" value="4.9 / 5.0" color="text-purple-500" bgColor="bg-purple-50" />
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-100 flex items-center gap-12">
        <TabButton 
          label="Profile Details" 
          active={activeTab === 'Profile Details'} 
          onClick={() => setActiveTab('Profile Details')} 
        />
        <TabButton 
          label="Consultation History" 
          active={activeTab === 'Consultation History'} 
          onClick={() => setActiveTab('Consultation History')} 
        />
        <TabButton 
          label="Wallet & Billings" 
          active={activeTab === 'Wallet & Billings'} 
          onClick={() => setActiveTab('Wallet & Billings')} 
        />
      </div>

      {/* Tab Content */}
      <div className="pb-12">
        {activeTab === 'Profile Details' && renderProfileDetails()}
        {activeTab === 'Consultation History' && renderConsultationHistory()}
        {activeTab === 'Wallet & Billings' && renderWalletBillings()}
      </div>
    </div>
  );
};

export default UserDetails;
