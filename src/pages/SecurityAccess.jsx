import React from 'react';
import { 
  ShieldCheck, Lock, Star, Eye, ShieldAlert, 
  BarChart3, Plus, Download, ChevronRight,
  Shield, Globe, Clock, MoreVertical, Search,
  Terminal, User
} from 'lucide-react';

const RoleRow = ({ icon: Icon, name, count, lastModified, iconColor }) => (
  <tr className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
    <td className="py-6 px-6">
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-lg bg-gray-100 ${iconColor}`}>
          <Icon size={18} />
        </div>
        <span className="text-[14px] font-bold text-slate-900">{name}</span>
      </div>
    </td>
    <td className="py-6 px-6 text-[13px] font-semibold text-slate-500">{count}</td>
    <td className="py-6 px-6">
      <div className="text-[12px] font-semibold text-slate-400">
        {lastModified.split('by')[0]}
        {lastModified.includes('by') && (
          <span className="text-indigo-500 block text-[10px] uppercase">{lastModified.split('by')[1]}</span>
        )}
      </div>
    </td>
    <td className="py-6 px-6">
      <button className="text-[12px] font-bold text-slate-700 hover:text-[#00BAF2] transition-colors">
        Edit Permissions
      </button>
    </td>
  </tr>
);

const ActivityRow = ({ admin, action, ip, time, status, statusBg, statusText }) => (
  <tr className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors group">
    <td className="py-5 px-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white text-[10px] font-bold">
          {admin.split(' ').map(n => n[0]).join('')}
        </div>
        <span className="text-[13px] font-bold text-slate-900">{admin}</span>
      </div>
    </td>
    <td className="py-5 px-6">
      <span className="text-[13px] font-semibold text-slate-500 group-hover:text-slate-900 transition-colors">{action}</span>
    </td>
    <td className="py-5 px-6 text-[12px] font-mono font-semibold text-slate-400">{ip}</td>
    <td className="py-5 px-6 text-[12px] font-semibold text-slate-400">{time}</td>
    <td className="py-5 px-6">
      <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${statusBg} ${statusText}`}>
        {status}
      </span>
    </td>
  </tr>
);

const SecurityAccess = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Security & Access Control</h1>
          <p className="text-[14px] text-slate-500 mt-1 font-semibold">12 Active Admin Accounts</p>
        </div>
        <div className="flex gap-3">
           <button className="bg-slate-900 text-white px-6 py-2.5 rounded-lg text-[13px] font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
             Global Lockdown
           </button>
           <button className="bg-[#00BAF2] text-white px-6 py-2.5 rounded-lg text-[13px] font-bold hover:bg-[#00a3d6] transition-all shadow-lg shadow-blue-100 flex items-center gap-2">
             <Plus size={18} /> Add New Admin
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Roles */}
        <div className="lg:col-span-8 bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden min-h-[620px] flex flex-col">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <h2 className="text-[18px] font-bold text-slate-900">Admin Roles & Permissions</h2>
            <button className="text-slate-400 hover:text-slate-600"><Search size={18} /></button>
          </div>
          
          <div className="overflow-x-auto flex-grow">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                  <th className="py-4 px-6">Role Name</th>
                  <th className="py-4 px-6">Permissions Count</th>
                  <th className="py-4 px-6">Last Modified</th>
                  <th className="py-4 px-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <RoleRow 
                  icon={Star} 
                  name="Super Admin" 
                  count="All (48)" 
                  lastModified="2h ago by System" 
                  iconColor="text-amber-500"
                />
                <RoleRow 
                  icon={Eye} 
                  name="Moderator" 
                  count="24 Permissions" 
                  lastModified="3 days ago" 
                  iconColor="text-indigo-500"
                />
                <RoleRow 
                  icon={Lock} 
                  name="Support Agent" 
                  count="12 Permissions" 
                  lastModified="1 week ago" 
                  iconColor="text-[#00BAF2]"
                />
                <RoleRow 
                  icon={BarChart3} 
                  name="Analyst" 
                  count="8 Permissions" 
                  lastModified="2 weeks ago" 
                  iconColor="text-emerald-500"
                />
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column - Configs */}
        <div className="lg:col-span-4 space-y-8">
          {/* Security Configs */}
          <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm space-y-8">
            <div className="flex items-center gap-2 text-[#00BAF2]">
              <ShieldCheck size={20} />
              <h2 className="text-[18px] font-bold text-slate-900">Security Configs</h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-bold text-slate-700 leading-tight">Enable 2FA for all Admins</p>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Mandatory hardware or app token</p>
                </div>
                <div className="w-12 h-6 bg-[#00BAF2] rounded-lg relative cursor-pointer">
                   <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-lg"></div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Session Timeout</label>
                <select className="w-full px-4 py-3 bg-gray-100 border border-slate-200 rounded-lg text-[13px] font-bold text-slate-700 outline-none appearance-none">
                  <option>15 Minutes (Recommended)</option>
                  <option>30 Minutes</option>
                  <option>1 Hour</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">IP Whitelisting</label>
                <div className="space-y-2">
                   {['192.168.1.1', '10.0.0.42'].map((ip, i) => (
                     <div key={i} className="flex items-center justify-between px-4 py-2.5 bg-gray-100 border border-slate-200 rounded-lg">
                        <span className="text-[13px] font-mono font-bold text-slate-600">{ip}</span>
                        <Plus size={14} className="rotate-45 text-slate-300 cursor-pointer hover:text-rose-500 transition-colors" />
                     </div>
                   ))}
                   <button className="w-full py-2.5 border-2 border-dashed border-slate-100 text-slate-300 text-[11px] font-bold rounded-lg hover:bg-slate-50 transition-all uppercase tracking-widest">
                     + Add New IP Range
                   </button>
                </div>
              </div>
            </div>
          </div>

          {/* Data Privacy */}
          <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-4 right-4">
               <span className="px-2 py-1 bg-amber-50 text-amber-500 text-[9px] font-bold uppercase tracking-widest rounded border border-amber-200">GDPR Compliant</span>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-[#00BAF2]">
                <Globe size={20} />
                <h2 className="text-[18px] font-bold text-slate-900">Data Privacy</h2>
              </div>

              <p className="text-[12px] text-slate-400 font-semibold leading-relaxed">
                "As above, so below; as within, so without."
              </p>

              <div className="space-y-2">
                 <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-slate-400">Compliance Status</span>
                    <span className="text-emerald-500">98.4% Secure</span>
                 </div>
                 <div className="w-full h-1.5 bg-gray-100 rounded-lg overflow-hidden">
                    <div className="w-[98.4%] h-full bg-emerald-500 rounded-lg"></div>
                 </div>
                 <div className="flex justify-between text-[9px] font-bold text-slate-300 pt-1 uppercase">
                    <span>Last Audit: Oct 24, 2023</span>
                    <span>Next: Apr 2024</span>
                 </div>
              </div>

              <button className="w-full py-3 border border-[#00BAF2] text-[#00BAF2] rounded-lg text-[12px] font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-all uppercase tracking-widest">
                <Download size={16} /> Download Compliance Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Activity Logs */}
      <div className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <div className="flex items-center gap-2 text-slate-900">
             <Terminal size={20} className="text-[#00BAF2]" />
             <h2 className="text-[18px] font-bold">Recent Security Activity Logs</h2>
          </div>
          <button className="text-[11px] font-bold text-[#00BAF2] hover:underline uppercase tracking-widest">View All History</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                <th className="py-4 px-6">Administrator</th>
                <th className="py-4 px-6">Action Description</th>
                <th className="py-4 px-6">IP Address</th>
                <th className="py-4 px-6">Timestamp</th>
                <th className="py-4 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <ActivityRow 
                admin="Admin Orion" 
                action="Updated Astrology Rates (Global)" 
                ip="192.168.1.1" 
                time="14:23:05 UT" 
                status="Success" 
                statusBg="bg-emerald-50" 
                statusText="text-emerald-500"
              />
              <ActivityRow 
                admin="Admin Zara" 
                action="Approved Refund Request #7741" 
                ip="203.11.4.12" 
                time="13:10:44 UT" 
                status="Success" 
                statusBg="bg-emerald-50" 
                statusText="text-emerald-500"
              />
              <ActivityRow 
                admin="System Agent" 
                action="Automatic Backup: Stellar Database" 
                ip="Internal" 
                time="12:00:00 UT" 
                status="Automatic" 
                statusBg="bg-indigo-50" 
                statusText="text-indigo-500"
              />
              <ActivityRow 
                admin="Unknown User" 
                action="Failed Login Attempt (Admin Panel)" 
                ip="172.16.25.10" 
                time="11:58:21 UT" 
                status="Blocked" 
                statusBg="bg-rose-50" 
                statusText="text-rose-500"
              />
            </tbody>
          </table>
          <div className="p-4 flex justify-center border-t border-slate-50">
             <button className="text-[11px] font-bold text-slate-300 hover:text-slate-500 flex items-center gap-1 uppercase tracking-widest transition-colors">
               Load older logs <ChevronRight size={14} className="rotate-90" />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityAccess;
