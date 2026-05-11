import React from 'react';
import { 
  Globe, Languages, DollarSign, CreditCard, 
  Plus, Edit2, MoreVertical, Play, 
  CheckCircle2, AlertCircle, TrendingUp, 
  TrendingDown, Search, ChevronRight, Settings
} from 'lucide-react';
import { useState } from 'react';

const StatCard = ({ icon: Icon, label, value, badge, badgeColor, progress, progressColor }) => (
  <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm space-y-4 flex flex-col justify-between min-h-[180px]">
    <div className="flex justify-between items-start">
      <div className="p-2 rounded-lg bg-gray-50 text-indigo-500">
        <Icon size={20} />
      </div>
      <span className={`px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest ${badgeColor}`}>
        {badge}
      </span>
    </div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <h3 className="text-4xl font-bold text-indigo-500/20 absolute">{value}</h3>
      <h3 className="text-4xl font-bold text-indigo-100/50 absolute -mt-0.5 ml-0.5">{value}</h3>
      <h3 className="text-4xl font-bold text-indigo-600 relative">{value}</h3>
    </div>
    <div className="space-y-2">
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${progressColor} rounded-full`} style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  </div>
);

const LanguageRow = ({ flag, name, code, status, coverage, isDefault }) => (
  <tr className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors group">
    <td className="py-6 px-6">
      <div className="flex items-center gap-4">
        <div className="text-2xl">{flag}</div>
        <div>
          <h4 className="text-[14px] font-semibold text-slate-900">{name}</h4>
          <p className="text-[10px] text-slate-400 font-semibold uppercase">{code}</p>
        </div>
      </div>
    </td>
    <td className="py-6 px-6">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${status === 'Active' ? 'bg-indigo-500' : 'bg-slate-300'}`}></div>
        <span className={`text-[13px] font-semibold ${status === 'Active' ? 'text-indigo-500' : 'text-slate-400'}`}>
          {status}
        </span>
      </div>
    </td>
    <td className="py-6 px-6">
      <div className="flex items-center gap-4 min-w-[150px]">
        <div className="flex-grow h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${coverage}%` }}></div>
        </div>
        <span className="text-[12px] font-bold text-slate-700">{coverage}%</span>
      </div>
    </td>
    <td className="py-6 px-6">
      <div className="flex items-center justify-end gap-4">
        {isDefault ? (
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">System Default</span>
        ) : (
          status === 'Active' && (
            <button className="px-4 py-1.5 border border-amber-200 text-amber-500 text-[10px] font-bold rounded-lg hover:bg-amber-50 transition-all uppercase tracking-widest">
              Set Default
            </button>
          )
        )}
        <div className="flex items-center gap-3 text-slate-300">
          {status === 'Inactive' && <Play size={16} className="cursor-pointer hover:text-indigo-500" />}
          <Edit2 size={16} className="cursor-pointer hover:text-indigo-500" />
          <MoreVertical size={16} className="cursor-pointer hover:text-indigo-500" />
        </div>
      </div>
    </td>
  </tr>
);

const CurrencyRow = ({ pair, rate, trend, trendValue }) => (
  <div className="p-4 bg-white rounded-lg border border-slate-100 shadow-sm flex items-center justify-between group hover:border-indigo-100 transition-all">
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">
          {pair.split('/')[0] === 'EUR' ? '€' : '$'}
        </div>
        <div className="w-8 h-8 rounded-full bg-indigo-600 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">
          {pair.split('/')[1] === 'USD' ? '$' : '₹'}
        </div>
      </div>
      <div>
        <h4 className="text-[12px] font-bold text-slate-900">{pair}</h4>
        <p className="text-[14px] font-bold text-indigo-600 leading-none">{rate}</p>
      </div>
    </div>
    <div className="text-right">
      <div className={`flex items-center gap-1 text-[10px] font-bold ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
        {trend === 'up' ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
        {trendValue}%
      </div>
      <button className="text-[9px] font-bold text-indigo-400 hover:underline uppercase tracking-widest">Override</button>
    </div>
  </div>
);

const Localization = () => {
  const [view, setView] = useState('hub'); // 'hub' or 'add'
  const [textDirection, setTextDirection] = useState('LTR');

  if (view === 'add') {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Add New Language</h1>
            <p className="text-[14px] text-slate-500 mt-1 font-semibold leading-relaxed max-w-2xl">
              Expand the reach of the Astrology. Define localization parameters for global celestial data distribution.
            </p>
          </div>
          <button 
            onClick={() => setView('hub')}
            className="bg-[#00BAF2] text-white px-8 py-2.5 rounded-lg text-[13px] font-bold hover:bg-[#00a3d6] transition-all shadow-lg shadow-blue-100 uppercase tracking-widest"
          >
            Back
          </button>
        </div>

        <div className="w-full space-y-8">
          {/* Core Language Data Card */}
          <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm space-y-8">
            <div className="flex items-center gap-2.5 text-indigo-500">
              <Languages size={20} />
              <h2 className="text-[16px] font-bold text-slate-900">Core Language Data</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Language Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Hindi"
                  className="w-full px-4 py-3 bg-gray-100 border border-slate-50 rounded-lg text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00BAF2] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ISO Code</label>
                <input 
                  type="text" 
                  placeholder="E.G. HI-IN"
                  className="w-full px-4 py-3 bg-gray-100 border border-slate-50 rounded-lg text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00BAF2] transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg border border-slate-50">
              <div>
                <h4 className="text-[13px] font-bold text-slate-900">Set as Default</h4>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Primary interface language for new accounts</p>
              </div>
              <div className="w-12 h-6 bg-slate-700 rounded-full relative cursor-pointer shadow-inner">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Regional Attributes Card */}
          <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm space-y-8">
            <div className="flex items-center gap-2.5 text-amber-500">
              <Globe size={20} />
              <h2 className="text-[16px] font-bold text-slate-900">Regional Attributes</h2>
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Text Direction</label>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'LTR', label: 'LTR (Left-to-Right)', icon: <div className="flex flex-col gap-1 w-4"><div className="h-0.5 w-4 bg-current"></div><div className="h-0.5 w-3 bg-current"></div><div className="h-0.5 w-4 bg-current"></div></div> },
                    { id: 'RTL', label: 'RTL (Right-to-Left)', icon: <div className="flex flex-col gap-1 items-end w-4"><div className="h-0.5 w-4 bg-current"></div><div className="h-0.5 w-3 bg-current"></div><div className="h-0.5 w-4 bg-current"></div></div> }
                  ].map((dir) => (
                    <div 
                      key={dir.id}
                      onClick={() => setTextDirection(dir.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all flex items-center justify-center gap-3 ${
                        textDirection === dir.id 
                          ? 'border-[#00BAF2] bg-blue-50/50 text-[#00BAF2]' 
                          : 'border-slate-100 bg-gray-50/30 text-slate-400 hover:bg-gray-50'
                      }`}
                    >
                      {dir.icon}
                      <span className="text-[12px] font-bold uppercase tracking-widest">{dir.label}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Default Currency Mapping</label>
              <select className="w-full px-4 py-3 bg-gray-100 border border-slate-50 rounded-lg text-[13px] font-semibold text-slate-700 outline-none appearance-none cursor-pointer">
                <option>INR (₹) - Indian Rupee</option>
                <option>USD ($) - US Dollar</option>
                <option>EUR (€) - Euro</option>
                <option>GBP (£) - British Pound</option>
              </select>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-4">
            <button 
              onClick={() => setView('hub')}
              className="px-10 py-3 bg-white border border-slate-900 text-slate-900 rounded-lg text-[12px] font-bold hover:bg-slate-50 transition-all uppercase tracking-widest"
            >
              Cancel
            </button>
            <button className="px-10 py-3 bg-[#00BAF2] text-white rounded-lg text-[12px] font-bold hover:bg-[#00a3d6] transition-all shadow-lg shadow-blue-100 uppercase tracking-widest">
              Finalize Language
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Multi-language & Localization</h1>
        <p className="text-[14px] text-slate-500 mt-1 font-semibold leading-relaxed">
          Manage global translations, currency conversions, and regional payment configurations.
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard 
          icon={Globe} 
          label="Total Languages Supported" 
          value="12" 
          badge="+2 this month" 
          badgeColor="bg-amber-50 text-amber-500" 
          progress={100} 
          progressColor="bg-indigo-500"
        />
        <StatCard 
          icon={Languages} 
          label="Translation Coverage" 
          value="94.2%" 
          badge="Optimal" 
          badgeColor="bg-indigo-50 text-indigo-500" 
          progress={94.2} 
          progressColor="bg-indigo-500"
        />
        <StatCard 
          icon={AlertCircle} 
          label="Pending Review Keys" 
          value="184" 
          badge="Action Needed" 
          badgeColor="bg-rose-50 text-rose-500" 
          progress={35} 
          progressColor="bg-amber-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Language Management Hub */}
        <div className="lg:col-span-8 bg-white rounded-lg border border-slate-100 shadow-sm flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white">
            <h2 className="text-[20px] font-bold text-slate-900">Language Management Hub</h2>
            <button 
              onClick={() => setView('add')}
              className="bg-[#00BAF2] text-white px-6 py-2.5 rounded-lg text-[13px] font-bold hover:bg-[#00a3d6] transition-all shadow-lg shadow-blue-100 flex items-center gap-2 uppercase tracking-widest"
            >
              <Plus size={18} /> Add New Language
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                  <th className="py-4 px-6">Language</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Coverage</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <LanguageRow flag="🇺🇸" name="English (US)" code="System Default" status="Active" coverage={100} isDefault={true} />
                <LanguageRow flag="🇮🇳" name="Hindi" code="ISO: HI-IN" status="Active" coverage={87} isDefault={false} />
                <LanguageRow flag="🇪🇸" name="Spanish" code="ISO: ES-ES" status="Inactive" coverage={62} isDefault={false} />
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-slate-50 bg-gray-50/30 flex justify-center">
            <button className="text-[11px] font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest flex items-center gap-1">
              Load More Languages <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          {/* Currency Engine */}
          <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-indigo-500">
                <DollarSign size={20} />
                <h2 className="text-[18px] font-bold text-slate-900">Currency Engine</h2>
              </div>
              <button className="p-1.5 rounded-lg bg-gray-50 text-slate-400 hover:text-indigo-500 transition-colors">
                <Settings size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <CurrencyRow pair="EUR / USD" rate="1.0842" trend="up" trendValue="0.12" />
              <CurrencyRow pair="USD / INR" rate="82.94" trend="down" trendValue="0.04" />
            </div>

            <div className="space-y-6 pt-2">
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Payment Gateways</h4>
                <div className="space-y-3">
                   {[
                     { name: 'Stripe', regions: '(USD, EUR, GBP)' },
                     { name: 'Razorpay', regions: '(INR)' },
                     { name: 'PayPal', regions: '(Global)' }
                   ].map((gateway, i) => (
                     <div key={i} className="flex items-center justify-between text-[13px] font-semibold text-slate-600">
                        <span>{gateway.name}</span>
                        <span className="text-[11px] text-slate-400">{gateway.regions}</span>
                     </div>
                   ))}
                </div>
              </div>

              <button className="w-full py-3 border border-indigo-100 text-indigo-500 rounded-lg text-[12px] font-bold hover:bg-indigo-50 transition-all uppercase tracking-widest">
                Configure Gateways
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Localization;
