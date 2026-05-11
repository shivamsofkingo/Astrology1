import React from 'react';
import { 
  Globe, TrendingUp, CreditCard, Shield, 
  Settings as SettingsIcon, Copy, Eye, RotateCcw, 
  Wrench, Megaphone, MessageSquare, Phone, 
  Video, DollarSign
} from 'lucide-react';

const SettingsConfiguration = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Settings & Configuration</h1>
        <p className="text-[14px] text-slate-500 mt-1 font-semibold">Core system parameters and celestial engine controls.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Global Localization */}
        <div className="lg:col-span-4 bg-[#F8FAFC] p-6 rounded-lg border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-amber-500">
            <Globe size={20} />
            <h2 className="text-[16px] font-bold text-slate-900">Global Localization</h2>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Default Currency</label>
              <select className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[13px] font-semibold text-slate-700 outline-none appearance-none shadow-sm cursor-pointer">
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>INR (₹)</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Primary Language</label>
              <select className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[13px] font-semibold text-slate-700 outline-none appearance-none shadow-sm cursor-pointer">
                <option>English (Universal)</option>
                <option>Hindi</option>
                <option>Spanish</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">System Timezone</label>
              <select className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[13px] font-semibold text-slate-700 outline-none appearance-none shadow-sm cursor-pointer">
                <option>UTC - Coordinate Universal</option>
                <option>EST - Eastern Standard</option>
                <option>IST - Indian Standard</option>
              </select>
            </div>
          </div>
        </div>

        {/* Financial Engine */}
        <div className="lg:col-span-8 bg-[#F8FAFC] p-6 rounded-lg border border-slate-100 shadow-sm space-y-6 flex flex-col">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-amber-500">
              <TrendingUp size={20} />
              <h2 className="text-[16px] font-bold text-slate-900">Financial Engine</h2>
            </div>
            <span className="bg-indigo-100 text-indigo-500 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span> Active Rates
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
            {/* Commission */}
            <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm flex flex-col justify-center">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Platform Commission (%)</p>
              <div className="flex items-center gap-4 mb-2">
                <span className="text-4xl font-bold text-slate-900">15</span>
                <span className="text-amber-400 font-bold text-xl">%</span>
              </div>
              <p className="text-[11px] font-semibold text-slate-400 leading-relaxed">
                Standard oracle fee applied to all celestial readings.
              </p>
            </div>

            {/* Base Service Matrix */}
            <div className="space-y-4">
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Base Service Matrix</p>
               <div className="space-y-3">
                 <div className="flex items-center justify-between p-3.5 bg-white border border-slate-100 rounded-lg shadow-sm">
                   <div className="flex items-center gap-3">
                     <MessageSquare size={16} className="text-indigo-400" />
                     <span className="text-[13px] font-semibold text-slate-700">Chat / Min</span>
                   </div>
                   <span className="text-[13px] font-bold text-slate-900">$2.50</span>
                 </div>
                 <div className="flex items-center justify-between p-3.5 bg-white border border-slate-100 rounded-lg shadow-sm">
                   <div className="flex items-center gap-3">
                     <Phone size={16} className="text-blue-400" />
                     <span className="text-[13px] font-semibold text-slate-700">Voice / Min</span>
                   </div>
                   <span className="text-[13px] font-bold text-slate-900">$4.00</span>
                 </div>
                 <div className="flex items-center justify-between p-3.5 bg-white border border-slate-100 rounded-lg shadow-sm">
                   <div className="flex items-center gap-3">
                     <Video size={16} className="text-purple-400" />
                     <span className="text-[13px] font-semibold text-slate-700">Video / Min</span>
                   </div>
                   <span className="text-[13px] font-bold text-slate-900">$7.50</span>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Payment Gateways */}
        <div className="lg:col-span-5 bg-[#F8FAFC] p-6 rounded-lg border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-amber-500">
            <CreditCard size={20} />
            <h2 className="text-[16px] font-bold text-slate-900">Payment Gateways</h2>
          </div>

          <div className="space-y-4">
            {/* Stripe */}
            <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-500">
                  <DollarSign size={20} />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-slate-900">Stripe</h4>
                  <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest mt-0.5">Production Active</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-1.5 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors">
                  <SettingsIcon size={14} />
                </button>
                <div className="w-11 h-6 bg-indigo-500 rounded-lg relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-lg shadow-sm"></div>
                </div>
              </div>
            </div>

            {/* PayPal */}
            <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
                  <Shield size={20} />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-slate-900">PayPal</h4>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Sandbox Mode</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-1.5 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors">
                  <SettingsIcon size={14} />
                </button>
                <div className="w-11 h-6 bg-slate-300 rounded-lg relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-lg shadow-sm"></div>
                </div>
              </div>
            </div>

            {/* Razorpay */}
            <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-sky-50 rounded-lg flex items-center justify-center text-sky-500">
                  <Globe size={20} />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-slate-900">Razorpay</h4>
                  <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest mt-0.5">Production Active</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-1.5 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors">
                  <SettingsIcon size={14} />
                </button>
                <div className="w-11 h-6 bg-indigo-500 rounded-lg relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-lg shadow-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* API & Technical Vault */}
        <div className="lg:col-span-7 bg-[#F8FAFC] p-6 rounded-lg border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-amber-500">
            <Shield size={20} />
            <h2 className="text-[16px] font-bold text-slate-900">API & Technical Vault</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Twilio SID</label>
                  <div className="relative">
                    <input 
                      type="password" 
                      value="AC******************34" 
                      readOnly
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[13px] font-mono font-semibold text-slate-700 outline-none shadow-sm pr-10"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-indigo-600 transition-colors">
                      <Copy size={16} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">SendGrid Secret</label>
                  <div className="relative">
                    <input 
                      type="password" 
                      value="SG...................." 
                      readOnly
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[13px] font-mono font-semibold text-slate-700 outline-none shadow-sm pr-10"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-indigo-600 transition-colors">
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
             </div>

             <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100 flex flex-col items-center justify-center text-center gap-3">
                <RotateCcw size={24} className="text-indigo-500 mb-1" />
                <h3 className="text-[14px] font-bold text-slate-900">Rotate All Keys</h3>
                <p className="text-[10px] font-semibold text-slate-500 leading-relaxed mb-2 px-4">
                  Instant invalidation across all connected celestial endpoints.
                </p>
                <button className="px-6 py-2 bg-indigo-200 text-indigo-700 rounded-lg text-[11px] font-bold uppercase tracking-widest hover:bg-indigo-300 transition-colors">
                  Authorize Now
                </button>
             </div>
          </div>
        </div>

        {/* System Maintenance Bottom Banner */}
        <div className="lg:col-span-12 bg-[#F8FAFC] p-6 rounded-lg border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-rose-100 rounded-lg flex items-center justify-center text-rose-500 flex-shrink-0">
                <Wrench size={24} />
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-slate-900">System Maintenance</h3>
                <p className="text-[12px] font-semibold text-slate-500 mt-1">Force global maintenance mode and broadcast celestial updates.</p>
              </div>
           </div>

           <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
              <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-lg border border-slate-100 shadow-sm w-full md:w-auto justify-between">
                 <div>
                   <p className="text-[12px] font-bold text-slate-900">Maintenance Mode</p>
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">System Stays Offline</p>
                 </div>
                 <div className="w-11 h-6 bg-slate-700 rounded-lg relative cursor-pointer">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-lg shadow-sm"></div>
                 </div>
              </div>

              <button className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-4 bg-white border border-indigo-100 text-indigo-600 rounded-lg text-[12px] font-bold shadow-sm hover:bg-indigo-50 transition-colors">
                 <Megaphone size={16} /> Global App Update Prompt
              </button>
           </div>
        </div>

      </div>

      {/* Footer Actions */}
      <div className="flex justify-end items-center gap-4 pt-6 border-t border-slate-100 mt-8">
         <button className="px-8 py-3 border border-[#00BAF2] text-[#00BAF2] rounded-lg text-[13px] font-bold hover:bg-blue-50 transition-colors">
           Cancel
         </button>
         <button className="px-8 py-3 bg-[#00BAF2] text-white rounded-lg text-[13px] font-bold hover:bg-[#00a3d6] transition-colors shadow-lg shadow-blue-100">
           Propagate Changes
         </button>
      </div>

    </div>
  );
};

export default SettingsConfiguration;
