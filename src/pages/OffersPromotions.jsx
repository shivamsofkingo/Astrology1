import React from 'react';
import { 
  Ticket, Percent, DollarSign, Users, 
  Zap, RotateCcw, Edit2, Plus, 
  ChevronRight, TrendingUp, MoreHorizontal,
  ToggleLeft, ToggleRight, Sparkles, CalendarCheck
} from 'lucide-react';

const StatCard = ({ label, value, trend, subtext, icon: Icon, iconColor, bgColor }) => (
  <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 rounded-lg ${bgColor} ${iconColor}`}>
        <Icon size={20} />
      </div>
      {trend && (
        <span className="text-[10px] font-semibold text-amber-500 bg-amber-50 px-2 py-1 rounded-full uppercase">
          {trend}
        </span>
      )}
      {subtext && (
        <div className="w-2 h-2 rounded-full bg-amber-400"></div>
      )}
    </div>
    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <h3 className="text-3xl font-semibold text-slate-900">{value}</h3>
  </div>
);

const CouponRow = ({ code, discount, status, usage, limit, expiry, badgeColor }) => (
  <tr className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
    <td className="py-4 px-6">
      <span className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold tracking-wider ${badgeColor}`}>
        {code}
      </span>
    </td>
    <td className="py-4 px-6 text-[13px] font-semibold text-slate-700">{discount}</td>
    <td className="py-4 px-6">
      <div className="flex items-center gap-1.5">
        <div className={`w-1.5 h-1.5 rounded-full ${status === 'Active' ? 'bg-amber-400' : 'bg-slate-300'}`}></div>
        <span className={`text-[12px] font-semibold ${status === 'Active' ? 'text-amber-500' : 'text-slate-400'}`}>
          {status}
        </span>
      </div>
    </td>
    <td className="py-4 px-6">
      <div className="text-[12px] font-semibold text-slate-500">
        <span className="text-slate-700">{usage}</span> / <span className="text-slate-400">{limit}</span>
      </div>
    </td>
    <td className="py-4 px-6">
      <div className="text-[12px] font-semibold text-slate-400">
        {expiry.split(',')[0]}<br />
        <span className="text-[10px] opacity-70">{expiry.split(',')[1]}</span>
      </div>
    </td>
    <td className="py-4 px-6">
      <button className="text-slate-400 hover:text-indigo-500 transition-colors">
        {status === 'Active' ? <Edit2 size={16} /> : <RotateCcw size={16} />}
      </button>
    </td>
  </tr>
);

const GlobalRuleCard = ({ title, description, status, icon: Icon }) => (
  <div className="bg-gray-100 p-5 rounded-lg border border-slate-100 space-y-4 relative group hover:bg-white hover:shadow-md transition-all">
    <div className="flex justify-between items-start">
      <h4 className="text-[14px] font-semibold text-slate-800 leading-tight pr-4">{title}</h4>
      <button className="text-slate-300 hover:text-slate-500"><MoreHorizontal size={16} /></button>
    </div>
    <p className="text-[12px] text-slate-500 font-semibold leading-relaxed">
      {description}
    </p>
    <div className="flex items-center justify-between pt-2">
      <span className={`text-[10px] font-semibold uppercase tracking-widest ${status === 'ENABLED' ? 'text-emerald-500' : 'text-rose-500'}`}>
        STATUS: {status}
      </span>
      <div className={status === 'ENABLED' ? 'text-indigo-500' : 'text-slate-300'}>
        {status === 'ENABLED' ? <Zap size={16} fill="currentColor" /> : <ToggleLeft size={20} />}
      </div>
    </div>
  </div>
);

const OffersPromotions = () => {
  const [view, setView] = React.useState('list'); // 'list' or 'create'
  const [formData, setFormData] = React.useState({
    couponCode: 'LUNAR20',
    activeStatus: true,
    description: 'Strategic promotion for Lunar New Year transits...',
    discountType: 'Percentage',
    discountValue: '20',
    minPurchase: '50.00',
    startDate: '',
    expiryDate: '2024-12-31',
    totalUsageLimit: '500',
    usageLimitPerUser: '1',
    categories: ['Vedic', 'Tarot'],
    exclusions: ''
  });

  if (view === 'create') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Create new offers</h1>
          <button 
            onClick={() => setView('list')}
            className="bg-[#00BAF2] text-white px-8 py-2 rounded-lg font-semibold hover:bg-[#00a3d6] transition-all"
          >
            Back
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Side */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Coupon Identity */}
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-[#00BAF2]">
                <div className="p-1.5 bg-amber-50 text-amber-500 rounded-md">
                   <Ticket size={18} />
                </div>
                <h2 className="text-lg font-semibold text-[#003566]">Coupon Identity</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <div className="space-y-2">
                  <label className="text-[12px] font-semibold text-slate-400">Coupon Code</label>
                  <input 
                    type="text" 
                    value={formData.couponCode}
                    onChange={(e) => setFormData({...formData, couponCode: e.target.value})}
                    placeholder="e.g. LUNAR20"
                    className="w-full px-4 py-3 bg-gray-100 border border-slate-200 rounded-lg text-[14px] font-semibold text-slate-700 outline-none focus:border-[#00BAF2]"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                   <div 
                    onClick={() => setFormData({...formData, activeStatus: !formData.activeStatus})}
                    className={`w-12 h-6 rounded-full relative cursor-pointer transition-all ${formData.activeStatus ? 'bg-[#00BAF2]' : 'bg-slate-200'}`}
                   >
                     <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.activeStatus ? 'right-1' : 'left-1'}`}></div>
                   </div>
                   <span className="text-[14px] font-semibold text-slate-700">Active Status</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-semibold text-slate-400">Internal Description</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-100 border border-slate-200 rounded-lg text-[14px] font-semibold text-slate-700 outline-none focus:border-[#00BAF2] min-h-[100px]"
                  placeholder="Strategic promotion for Lunar New Year transits..."
                />
              </div>
            </div>

            {/* Discount Details */}
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-6">
               <div className="flex items-center gap-2 text-[#00BAF2]">
                <div className="p-1.5 bg-amber-50 text-amber-500 rounded-md">
                   <DollarSign size={18} />
                </div>
                <h2 className="text-lg font-semibold text-[#003566]">Discount Details</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[12px] font-semibold text-slate-400">Discount Type</label>
                  <select 
                    value={formData.discountType}
                    onChange={(e) => setFormData({...formData, discountType: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-100 border border-slate-200 rounded-lg text-[14px] font-semibold text-slate-700 outline-none focus:border-[#00BAF2] appearance-none"
                  >
                    <option>Percentage</option>
                    <option>Fixed Amount</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-semibold text-slate-400">Discount Value</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">%</span>
                    <input 
                      type="text" 
                      value={formData.discountValue}
                      onChange={(e) => setFormData({...formData, discountValue: e.target.value})}
                      className="w-full pl-8 pr-4 py-3 bg-gray-100 border border-slate-200 rounded-lg text-[14px] font-semibold text-slate-700 outline-none focus:border-[#00BAF2]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-semibold text-slate-400">Min. Purchase</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
                    <input 
                      type="text" 
                      value={formData.minPurchase}
                      onChange={(e) => setFormData({...formData, minPurchase: e.target.value})}
                      className="w-full pl-8 pr-4 py-3 bg-gray-100 border border-slate-200 rounded-lg text-[14px] font-semibold text-slate-700 outline-none focus:border-[#00BAF2]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Validity & Rules */}
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-6">
               <div className="flex items-center gap-2 text-[#00BAF2]">
                <div className="p-1.5 bg-amber-50 text-amber-500 rounded-md">
                   <CalendarCheck size={18} />
                </div>
                <h2 className="text-lg font-semibold text-[#003566]">Validity & Rules</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[12px] font-semibold text-slate-400">Start Date</label>
                  <input 
                    type="text" 
                    placeholder="mm/dd/yyyy"
                    className="w-full px-4 py-3 bg-gray-100 border border-slate-200 rounded-lg text-[14px] font-semibold text-slate-700 outline-none focus:border-[#00BAF2]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-semibold text-slate-400">Expiry Date</label>
                  <input 
                    type="text" 
                    value={formData.expiryDate}
                    placeholder="mm/dd/yyyy"
                    className="w-full px-4 py-3 bg-gray-100 border border-slate-200 rounded-lg text-[14px] font-semibold text-slate-700 outline-none focus:border-[#00BAF2]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-semibold text-slate-400">Total Usage Limit</label>
                  <input 
                    type="text" 
                    value={formData.totalUsageLimit}
                    className="w-full px-4 py-3 bg-gray-100 border border-slate-200 rounded-lg text-[14px] font-semibold text-slate-700 outline-none focus:border-[#00BAF2]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-semibold text-slate-400">Usage Limit Per User</label>
                  <input 
                    type="text" 
                    value={formData.usageLimitPerUser}
                    className="w-full px-4 py-3 bg-gray-100 border border-slate-200 rounded-lg text-[14px] font-semibold text-slate-700 outline-none focus:border-[#00BAF2]"
                  />
                </div>
              </div>
            </div>

            {/* Targeting & Categories */}
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-6">
               <div className="flex items-center gap-2 text-[#00BAF2]">
                <div className="p-1.5 bg-amber-50 text-amber-500 rounded-md">
                   <TrendingUp size={18} />
                </div>
                <h2 className="text-lg font-semibold text-[#003566]">Targeting & Categories</h2>
              </div>

              <div className="space-y-4">
                <label className="text-[12px] font-semibold text-slate-400 block">Applicable Categories</label>
                <div className="flex flex-wrap gap-2">
                  {formData.categories.map((cat, i) => (
                    <span key={i} className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-500 text-[12px] font-semibold rounded-lg">
                      {cat} <Plus size={14} className="rotate-45 cursor-pointer" />
                    </span>
                  ))}
                  <button className="px-3 py-1.5 border border-dashed border-slate-300 text-slate-400 text-[12px] font-semibold rounded-lg hover:bg-slate-50">
                    + Add Category
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-semibold text-slate-400">Exclusions</label>
                <input 
                  type="text" 
                  placeholder="Search sessions or practitioners to exclude..."
                  className="w-full px-4 py-3 bg-gray-100 border border-slate-200 rounded-lg text-[14px] font-semibold text-slate-700 outline-none focus:border-[#00BAF2]"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 pt-4">
               <button 
                onClick={() => setView('list')}
                className="px-10 py-3 border border-[#00BAF2] text-[#00BAF2] rounded-lg font-semibold hover:bg-blue-50 transition-all"
               >
                 Discard
               </button>
               <button className="px-10 py-3 bg-[#00BAF2] text-white rounded-lg font-semibold hover:bg-[#00a3d6] transition-all shadow-lg shadow-[#00BAF2]/20">
                 Publish Coupon
               </button>
            </div>
          </div>

          {/* Preview Side */}
          <div className="lg:col-span-4">
            <div className="sticky top-20 space-y-6">
               <h3 className="text-lg font-semibold text-slate-800">Live Customer Preview</h3>
               
               <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#4F5B93] via-[#2F3554] to-[#1A1F35] flex flex-col p-8 text-center text-white min-h-[580px]">
                 {/* Top Decorative Elements */}
                 <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
                 
                 <div className="mt-4 mb-4">
                    <Sparkles className="mx-auto text-yellow-400" size={32} />
                 </div>

                 <div className="inline-block mx-auto mb-8">
                   <span className="px-3 py-1 bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 rounded text-[10px] font-bold uppercase tracking-widest">
                     Limited Time
                   </span>
                 </div>

                 <div className="space-y-1 mb-10">
                   <p className="text-[10px] font-semibold tracking-[0.2em] text-white/60 uppercase">Your Celestial Discount Code</p>
                   <h4 className="text-4xl font-bold tracking-tight">{formData.couponCode || 'CODE'}</h4>
                 </div>

                 <div className="flex flex-col gap-4 mb-8">
                   <div className="flex justify-between items-center px-4 py-3 border-b border-white/10">
                      <span className="text-sm text-white/50 font-medium">Discount</span>
                      <span className="text-lg font-bold">{formData.discountValue}% OFF</span>
                   </div>
                   <div className="flex justify-between items-center px-4">
                      <span className="text-sm text-white/50 font-medium">Valid until</span>
                      <span className="text-sm font-semibold">Dec 31, 2024</span>
                   </div>
                 </div>

                 <p className="text-[11px] text-white/40 font-medium italic mb-8 px-4 leading-relaxed">
                   "Unlock cosmic clarity with our premium lunar transition report."
                 </p>

                 <div className="mt-auto">
                    <button className="w-full py-4 bg-[#C5CAFF] text-[#4F5B93] rounded-xl font-bold text-lg hover:scale-[1.02] transition-transform shadow-lg shadow-black/20">
                      Apply to Cart
                    </button>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">Offers & Promotions</h1>
        <p className="text-[14px] text-slate-500 mt-1">Manage celestial discounts and user growth incentives.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard 
          label="ACTIVE PROMOTIONS" 
          value="24" 
          trend="+12% VS LW" 
          icon={Sparkles} 
          iconColor="text-indigo-500" 
          bgColor="bg-indigo-50" 
        />
        <StatCard 
          label="TOTAL COUPONS REDEEMED" 
          value="1,842" 
          icon={Ticket} 
          iconColor="text-amber-500" 
          bgColor="bg-amber-50" 
        />
        <StatCard 
          label="REVENUE FROM OFFERS" 
          value="$12.4k" 
          icon={DollarSign} 
          iconColor="text-emerald-500" 
          bgColor="bg-emerald-50" 
        />
        <StatCard 
          label="NEW REFERRALS TODAY" 
          value="89" 
          subtext={true}
          icon={Users} 
          iconColor="text-purple-500" 
          bgColor="bg-purple-50" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Coupon Code Management */}
        <div className="lg:col-span-8 bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <h2 className="text-[18px] font-semibold text-slate-900">Coupon Code Management</h2>
            <button 
              onClick={() => setView('create')}
              className="bg-indigo-500 text-white px-5 py-2.5 rounded-lg text-[13px] font-semibold uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-indigo-100 hover:bg-indigo-600 transition-all"
            >
              <Plus size={16} /> Add New Coupon
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100 text-[10px] font-semibold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                  <th className="py-4 px-6">Code</th>
                  <th className="py-4 px-6">Discount</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Usage</th>
                  <th className="py-4 px-6">Expiry</th>
                  <th className="py-4 px-6">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <CouponRow 
                  code="LUNAR20" 
                  discount="20% Off" 
                  status="Active" 
                  usage="452" 
                  limit="1000" 
                  expiry="Oct 12, 2024" 
                  badgeColor="bg-indigo-50 text-indigo-500"
                />
                <CouponRow 
                  code="STARGAZE" 
                  discount="$15 Fixed" 
                  status="Active" 
                  usage="128" 
                  limit="500" 
                  expiry="Nov 01, 2024" 
                  badgeColor="bg-purple-50 text-purple-500"
                />
                <CouponRow 
                  code="MERCURY10" 
                  discount="10% Off" 
                  status="Expired" 
                  usage="500" 
                  limit="500" 
                  expiry="Aug 20, 2024" 
                  badgeColor="bg-slate-100 text-slate-400"
                />
              </tbody>
            </table>
          </div>
        </div>

        {/* Referral System */}
        <div className="lg:col-span-4 bg-white rounded-lg border border-[#F5E6A3]/30 p-8 space-y-8">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-amber-400 rounded-lg text-white">
                <Users size={20} />
             </div>
             <h2 className="text-[20px] font-semibold text-slate-900">Referral System</h2>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Referrer Reward</label>
              <div className="relative">
                <input 
                  type="text" 
                  value="50 Credits" 
                  readOnly
                  className="w-full px-4 py-3.5 bg-gray-100 border border-slate-200 rounded-lg text-[14px] font-semibold text-slate-700"
                />
                <DollarSign size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Referee Discount</label>
              <div className="relative">
                <input 
                  type="text" 
                  value="15% Off First Session" 
                  readOnly
                  className="w-full px-4 py-3.5 bg-gray-100 border border-slate-200 rounded-lg text-[14px] font-semibold text-slate-700"
                />
                <Percent size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            <button className="w-full py-4 rounded-lg border-2 border-amber-400 text-amber-500 text-[13px] font-semibold uppercase tracking-widest hover:bg-amber-400 hover:text-white transition-all">
              Update Referral Logic
            </button>
          </div>
        </div>
      </div>

      {/* Global Rules */}
      <div className="bg-white rounded-lg border border-slate-100 shadow-sm p-8 space-y-8">
        <h2 className="text-[20px] font-semibold text-slate-900">Global Rules</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          <GlobalRuleCard 
            title="New User Cashback"
            description="10% Cashback on first consultation added to wallet instantly."
            status="ENABLED"
            icon={Zap}
          />
          <GlobalRuleCard 
            title="Wallet Recharge Bonus"
            description="Flat $5 off on wallet recharges over $50 during lunar peaks."
            status="ENABLED"
            icon={Zap}
          />
          <GlobalRuleCard 
            title="Bundle Multiplier"
            description="Extra 5% discount when booking 3+ sessions at once."
            status="DISABLED"
            icon={Zap}
          />
          
          <button className="h-full min-h-[160px] border-2 border-dashed border-slate-100 rounded-lg flex flex-col items-center justify-center gap-2 text-slate-400 hover:bg-slate-50 transition-all group">
            <Plus size={24} className="group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-semibold uppercase tracking-widest">+ Define New Rule</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OffersPromotions;
