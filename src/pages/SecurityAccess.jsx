import React, { useState } from 'react';
import { 
  ShieldCheck, Lock, Star, Eye, ShieldAlert, 
  BarChart3, Plus, Download, ChevronRight,
  Shield, Globe, Clock, MoreVertical, Search,
  Terminal, User, UserPlus, Mail, Fingerprint,
  RotateCcw, CheckCircle2, Zap, Briefcase,
  AlertCircle
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
  const [view, setView] = useState('list'); // 'list' or 'add'
  const [selectedRole, setSelectedRole] = useState('Super Admin');

  if (view === 'add') {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Add New Administrator</h1>
          <p className="text-[14px] text-slate-500 mt-1 font-semibold leading-relaxed">
            Provision a new entity into the high-council with specific celestial permissions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Form Area */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Admin Identity Card */}
            <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-2.5 text-amber-500">
                <UserPlus size={20} />
                <h2 className="text-[16px] font-bold text-slate-900">Admin Identity</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Orion Vance"
                    className="w-full px-4 py-3 bg-gray-100 border border-slate-50 rounded-lg text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00BAF2] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Employee ID</label>
                  <input 
                    type="text" 
                    placeholder="CS-9942"
                    className="w-full px-4 py-3 bg-gray-100 border border-slate-50 rounded-lg text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00BAF2] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                <input 
                  type="email" 
                  placeholder="orion.vance@celestial.io"
                  className="w-full px-4 py-3 bg-gray-100 border border-slate-50 rounded-lg text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00BAF2] transition-all"
                />
              </div>
            </div>

            {/* Role & Access Card */}
            <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-2.5 text-amber-500">
                <Shield size={20} />
                <h2 className="text-[16px] font-bold text-slate-900">Role & Access</h2>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Admin Role</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'Super Admin', desc: 'Unlimited access to all system sectors.', icon: Zap },
                    { name: 'Support Agent', desc: 'User support and ticket management.', icon: User },
                    { name: 'Moderator', desc: 'Content review and community safety.', icon: ShieldCheck },
                    { name: 'Analyst', desc: 'Read-only cosmic data insights.', icon: BarChart3 }
                  ].map((role) => (
                    <div 
                      key={role.name}
                      onClick={() => setSelectedRole(role.name)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all flex items-start gap-3 ${
                        selectedRole === role.name 
                          ? 'border-[#00BAF2] bg-blue-50/30' 
                          : 'border-slate-100 bg-gray-100/50 hover:bg-gray-100'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${selectedRole === role.name ? 'bg-[#00BAF2] text-white' : 'bg-white text-slate-400'}`}>
                        <role.icon size={18} />
                      </div>
                      <div>
                        <h4 className="text-[13px] font-bold text-slate-900">{role.name}</h4>
                        <p className="text-[10px] text-slate-400 font-semibold mt-0.5 leading-tight">{role.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Department</label>
                <select className="w-full px-4 py-3 bg-gray-100 border border-slate-50 rounded-lg text-[13px] font-semibold text-slate-700 outline-none appearance-none cursor-pointer">
                  <option>Technical Operations</option>
                  <option>Customer Relations</option>
                  <option>Data Analytics</option>
                  <option>Content Moderation</option>
                </select>
              </div>
            </div>

            {/* Security & Authentication Card */}
            <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-2.5 text-amber-500">
                <Fingerprint size={20} />
                <h2 className="text-[16px] font-bold text-slate-900">Security & Authentication</h2>
              </div>

              <div className="p-4 bg-gray-100 rounded-lg flex items-center justify-between">
                <div>
                  <h4 className="text-[13px] font-bold text-slate-900">Enforce Mandatory 2FA</h4>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Requires a multi-factor token for every login attempt.</p>
                </div>
                <div className="w-12 h-6 bg-[#00BAF2] rounded-lg relative cursor-pointer shadow-sm">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-lg"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Temporary Password</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value="C3L3ST-X88V"
                      readOnly
                      className="w-full px-4 py-3 bg-gray-100 border border-slate-50 rounded-lg text-[13px] font-mono font-semibold text-slate-700 outline-none"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
                      <RotateCcw size={14} />
                    </button>
                  </div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest pt-1">Valid for 24 hours until first login.</p>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">IP Restriction (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="0.0.0.0"
                    className="w-full px-4 py-3 bg-gray-100 border border-slate-50 rounded-lg text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00BAF2] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-center gap-4 pt-4">
              <button 
                onClick={() => setView('list')}
                className="px-10 py-3 bg-white border border-slate-900 text-slate-900 rounded-lg text-[13px] font-bold hover:bg-slate-50 transition-all uppercase tracking-widest"
              >
                Cancel
              </button>
              <button className="px-10 py-3 bg-[#00BAF2] text-white rounded-lg text-[13px] font-bold hover:bg-[#00a3d6] transition-all shadow-lg shadow-blue-100 uppercase tracking-widest">
                Create Administrator
              </button>
            </div>
          </div>

          {/* Right Column - Preview & Progress */}
          <div className="lg:col-span-4 space-y-8">
            {/* Previewing Role Card */}
            <div className="relative rounded-lg overflow-hidden shadow-2xl bg-gradient-to-br from-[#0B0D17] to-[#1E293B] text-white flex flex-col min-h-[380px]">
               {/* Background Glow */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#4D55FF]/20 blur-[100px] rounded-full"></div>
               
               <div className="relative z-10 p-8 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-[0.2em] mb-1">Previewing Role</p>
                      <h3 className="text-xl font-bold tracking-tight">{selectedRole}</h3>
                    </div>
                    <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                       <Star size={32} className="text-white/20" />
                    </div>
                  </div>

                  <div className="space-y-4 mb-auto">
                    <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-2">Core Permissions</p>
                    {[
                      'Full access to Financials & Billing',
                      'Ability to provision other Admins',
                      'Direct database entry/deletion rights',
                      'Override system-wide maintenance locks',
                      'Access to highly encrypted Security Vault'
                    ].map((perm, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-1 w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 size={10} className="text-slate-900" />
                        </div>
                        <span className="text-[12px] font-semibold text-white/80 leading-snug">{perm}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 rounded-lg bg-white/5 border border-white/5 space-y-2">
                     <div className="flex items-center gap-2 text-indigo-400">
                        <AlertCircle size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Council Advisory</span>
                     </div>
                     <p className="text-[11px] text-white/50 font-semibold leading-relaxed">
                        Assigning 'Super Admin' confers total control. Ensure the recipient is verified via physical biometric or hardware key.
                     </p>
                  </div>
               </div>
            </div>

            {/* Onboarding Progress */}
            <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm space-y-6">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Onboarding Progress</h4>
              <div className="space-y-3">
                 <div className="w-full h-2.5 bg-gray-100 rounded-lg overflow-hidden flex">
                    <div className="w-[75%] h-full bg-indigo-500 rounded-lg"></div>
                 </div>
                 <p className="text-[11px] text-slate-400 font-semibold">
                   75% of mandatory security fields completed.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Security & Access Control</h1>
          <p className="text-[14px] text-slate-500 mt-1 font-semibold">12 Active Admin Accounts</p>
        </div>
        <div className="flex gap-3">
           <button className="bg-slate-900 text-white px-6 py-2.5 rounded-lg text-[13px] font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 uppercase tracking-widest">
             Global Lockdown
           </button>
           <button 
            onClick={() => setView('add')}
            className="bg-[#00BAF2] text-white px-6 py-2.5 rounded-lg text-[13px] font-bold hover:bg-[#00a3d6] transition-all shadow-lg shadow-blue-100 flex items-center gap-2 uppercase tracking-widest"
           >
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
