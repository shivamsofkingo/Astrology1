import React, { useState } from 'react';
import { Filter, Download, ArrowUpRight, Clock, Plus, Percent, Star, Gem, Sparkles, Banknote, ChevronDown, Check } from 'lucide-react';

const StatCard = ({ title, value, subtitle, valueColor, subtitleColor, iconColor }) => (
  <div className="bg-white rounded-lg shadow-sm border border-slate-100/50 p-5 flex-1 min-w-0 relative overflow-hidden">
    <div className="relative z-10">
      <div className="text-[13px] font-medium text-slate-400">{title}</div>
      <div className={`mt-1.5 text-[28px] font-semibold ${valueColor}`}>{value}</div>
      {subtitle && (
        <div className={`text-[11px] mt-2 font-medium flex items-center gap-1 ${subtitleColor}`}>
          <ArrowUpRight size={12} strokeWidth={3} className={iconColor || ''} />
          {subtitle}
        </div>
      )}
    </div>
  </div>
);

const TransactionRow = ({ tx }) => {
  const getBadgeClass = (type) => {
    switch (type) {
      case 'RECHARGE': return 'bg-indigo-50/80 text-indigo-400';
      case 'PAYOUT': return 'bg-amber-50 text-amber-500';
      case 'REFUND': return 'bg-rose-50 text-rose-400';
      case 'COMMISSION': return 'bg-fuchsia-50 text-fuchsia-400';
      default: return 'bg-slate-50 text-slate-400';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'SUCCESS': return 'text-emerald-400';
      case 'PENDING': return 'text-amber-400';
      case 'FAILED': return 'text-rose-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
      <td className="py-4 px-6 text-[13px] text-indigo-400 font-medium">{tx.id}</td>
      <td className="py-4 px-6">
        <div className="text-[13px] text-slate-500 font-medium">{tx.entity.name}</div>
        <div className="text-[10px] text-slate-400 font-semibold tracking-wider mt-0.5">{tx.entity.role}</div>
      </td>
      <td className="py-4 px-6">
        <span className={`px-2.5 py-1 rounded text-[10px] font-semibold tracking-wider uppercase ${getBadgeClass(tx.type)}`}>
          {tx.type}
        </span>
      </td>
      <td className={`py-4 px-6 text-[14px] font-medium ${tx.amount.startsWith('+') ? 'text-emerald-400' : tx.amount.startsWith('-') ? 'text-rose-400' : 'text-slate-300'}`}>
        {tx.amount}
      </td>
      <td className="py-4 px-6">
        <div className={`flex items-center gap-1.5 text-[11px] font-semibold tracking-wider ${getStatusClass(tx.status)}`}>
          <div className="w-3.5 h-3.5 rounded-full border-[1.5px] flex items-center justify-center border-current">
            <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
          </div>
          {tx.status}
        </div>
      </td>
    </tr>
  );
};

const PlanCard = ({ plan }) => (
  <div className={`bg-white rounded-lg shadow-sm border border-slate-100 p-6 w-full md:w-[31%] relative border-l-[3px] flex flex-col min-h-[300px] ${plan.borderClass}`}>
    {plan.popular && (
      <div className="absolute right-4 bottom-4 bg-[#FFF8E6] text-[#FFC107] text-[10px] font-semibold px-2.5 py-1 rounded">
        POPULAR
      </div>
    )}
    <div className="text-[13px] font-semibold text-slate-800">{plan.name}</div>
    <div className="text-[9px] text-slate-400 mb-4 tracking-wider uppercase">{plan.id}</div>
    <div className="flex items-baseline gap-1 mb-4">
      <span className="text-3xl font-semibold text-slate-900">${plan.price}</span>
      <span className="text-xs text-slate-400">/ {plan.credits} Credits</span>
    </div>
    <div className="space-y-2 mb-8">
      {plan.features.map((f, i) => (
        <div key={i} className="flex items-center gap-2 text-[12px] text-slate-400">
          <div className="w-[14px] h-[14px] rounded-full bg-emerald-50 flex items-center justify-center text-emerald-400 shrink-0 text-[9px] font-semibold">?</div>
          {f}
        </div>
      ))}
    </div>
    <div className="text-[10px] font-semibold tracking-wider text-emerald-400 uppercase mt-auto">{plan.status}</div>
  </div>
);

const CreatePlanView = ({ onBack }) => {
  return (
    <div className="w-full pb-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-10">
        <div>
          <h2 className="text-[32px] font-semibold text-slate-900 tracking-tight">Wallets & Payments</h2>
          <div className="mt-4">
            <h3 className="text-blue-500 font-medium text-[14px]">Craft New Celestial Plan</h3>
            <p className="text-slate-600 text-[13px] mt-1">Design a new energy exchange package for the soul-seekers.</p>
          </div>
        </div>
        <button onClick={onBack} className="bg-[#00BAF2] hover:bg-[#00a3d4] text-white px-10 py-3 rounded-lg text-[14px] font-medium transition-colors">
          Back
        </button>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8 flex flex-col gap-8">
          
          {/* Plan Identity */}
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <Star className="text-yellow-400" size={20} strokeWidth={2.5} />
              <h4 className="text-[17px] font-medium text-slate-800">Plan Identity</h4>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[12px] font-medium text-slate-400 uppercase tracking-widest mb-3">Plan Name</label>
                <input type="text" placeholder="e.g., Diamond Seeker" className="w-full bg-[#EEEEEE]/70 border-none rounded-lg px-5 py-4 text-[14px] text-slate-700 outline-none focus:ring-1 focus:ring-indigo-400 placeholder:text-slate-500" />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-slate-400 uppercase tracking-widest mb-3">Plan Identifier/ID</label>
                <input type="text" placeholder="DS-2024-X" className="w-full bg-[#EEEEEE]/70 border-none rounded-lg px-5 py-4 text-[14px] text-slate-700 outline-none focus:ring-1 focus:ring-indigo-400 placeholder:text-slate-500" />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-medium text-slate-400 uppercase tracking-widest mb-3">Marketing Description</label>
              <textarea placeholder="A short tagline for the store..." rows="4" className="w-full bg-[#EEEEEE]/70 border-none rounded-lg px-5 py-4 text-[14px] text-slate-700 outline-none focus:ring-1 focus:ring-indigo-400 resize-none placeholder:text-slate-500"></textarea>
            </div>
          </div>

          {/* Value & Pricing */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-indigo-50/50">
            <div className="flex items-center gap-2.5 mb-6">
              <Gem className="text-indigo-400" size={18} />
              <h4 className="text-[15px] font-medium text-indigo-400">Value & Pricing</h4>
            </div>

            <div className="grid grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 uppercase tracking-widest mb-1">Credit Amount</label>
                <p className="text-[10px] text-slate-400 mb-2">Points awarded upon purchase</p>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-300">
                    <Sparkles size={14} />
                  </div>
                  <input type="text" placeholder="5000" className="w-full bg-[#EEEEEE]/70 border-none rounded-lg pl-10 pr-4 py-3.5 text-[13px] text-slate-700 outline-none focus:ring-1 focus:ring-indigo-400" />
                </div>
              </div>
              
              <div>
                <label className="block text-[11px] font-medium text-slate-400 uppercase tracking-widest mb-1">Package Price ($)</label>
                <p className="text-[10px] text-transparent mb-2">Spacer</p>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-yellow-500">
                    <Banknote size={14} />
                  </div>
                  <input type="text" placeholder="?99.00" className="w-full bg-[#EEEEEE]/70 border-none rounded-lg pl-10 pr-4 py-3.5 text-[13px] text-slate-700 outline-none focus:ring-1 focus:ring-indigo-400 placeholder:text-slate-500" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 uppercase tracking-widest mb-2">Credit Validity</label>
                <div className="relative">
                  <select className="w-full bg-[#EEEEEE]/70 border-none rounded-lg px-4 py-3.5 text-[13px] text-slate-800 outline-none focus:ring-1 focus:ring-indigo-400 appearance-none font-medium">
                    <option>30 Days</option>
                    <option>60 Days</option>
                    <option>No Expiry</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <ChevronDown size={14} />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col justify-end">
                <div className="bg-[#B0B6BE] rounded-lg p-3.5 flex items-center justify-between">
                  <div className="text-slate-800">
                    <div className="text-[13px] font-medium">Recommended Plan</div>
                    <div className="text-[10px] text-slate-500/80 font-medium">Show "Popular" badge</div>
                  </div>
                  {/* Custom Toggle */}
                  <div className="w-10 h-[22px] bg-[#31364A] rounded-full p-0.5 cursor-pointer relative shadow-inner">
                    <div className="w-[18px] h-[18px] bg-white rounded-full absolute right-0.5 shadow-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="col-span-4 flex flex-col ">
          {/* Benefits & Access */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="p-5 border-b border-slate-50">
              <div className="flex items-center gap-2.5">
                <Gem className="text-[#A259FF]" size={16} />
                <h4 className="text-[13px] font-medium text-slate-800">Benefits & Access</h4>
              </div>
            </div>

            <div className="p-5 space-y-3">
              {[
                { title: "Voice Call Access", desc: "Allow direct audio consultations", active: true },
                { title: "Video Call Access", desc: "Face-to-face spiritual reading", active: true },
                { title: "Priority Support", desc: "24/7 Concierge assistance", active: false },
                { title: "Exclusive Content", desc: "Access to private cosmic logs", active: false },
              ].map((ben, i) => (
                <div key={i} className="flex items-start gap-3.5 p-3.5 bg-[#EEEEEE]/50 rounded-lg">
                  <div className={`mt-0.5 w-[14px] h-[14px] rounded-[4px] flex items-center justify-center shrink-0 border ${ben.active ? 'bg-[#9BA1FF] border-[#9BA1FF] text-white' : 'bg-transparent border-slate-300'}`}>
                    {ben.active && <Check size={10} strokeWidth={4} />}
                  </div>
                  <div>
                      <div className="text-[14px] font-semibold text-slate-800">{ben.title}</div>
                      <div className="text-[12px] text-slate-500 mt-0.5 leading-tight">{ben.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button className="w-full bg-[#4E44DE] hover:bg-[#3D35B3] text-white rounded w-[80%] mx-auto py-3 text-[13px] font-medium flex items-center justify-center gap-2 transition-colors shadow-sm">
              <Sparkles size={14} /> Create Plan
            </button>
            <button onClick={onBack} className="w-full bg-white hover:bg-slate-50 border border-slate-100 text-slate-400 rounded w-[80%] mx-auto py-3 text-[13px] font-medium transition-colors">
              Discard/Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function WalletsPayments() {
  const [isCreatingPlan, setIsCreatingPlan] = useState(false);

  if (isCreatingPlan) {
    return <CreatePlanView onBack={() => setIsCreatingPlan(false)} />;
  }

  const stats = [
    { title: 'Total Revenue', value: '$124,592.00', subtitle: '+12.4% vs last month', valueColor: 'text-indigo-400', subtitleColor: 'text-emerald-400' },
    { title: 'Pending Payouts', value: '$8,240.50', subtitle: '14 Payouts processing', valueColor: 'text-amber-400', subtitleColor: 'text-slate-400', iconColor: 'text-slate-300' },
    { title: 'Refund Requests', value: '28', subtitle: '4 High Priority', valueColor: 'text-rose-400', subtitleColor: 'text-rose-400' },
    { title: 'Active Recharge Plans', value: '4', subtitle: 'Standardized global pricing', valueColor: 'text-fuchsia-400', subtitleColor: 'text-slate-400', iconColor: 'text-slate-300' },
  ];

  const transactions = [
    { id: '#TX-89210', entity: { name: 'Elena V.', role: 'USER' }, type: 'RECHARGE', amount: '+$150.00', status: 'SUCCESS' },
    { id: '#TX-89209', entity: { name: 'Master Kaelen', role: 'ASTROLOGER' }, type: 'PAYOUT', amount: '$1,200.00', status: 'PENDING' },
    { id: '#TX-89208', entity: { name: 'Sarah J.', role: 'USER' }, type: 'REFUND', amount: '-$45.00', status: 'FAILED' },
    { id: '#TX-89207', entity: { name: 'Luna Mystica', role: 'ASTROLOGER' }, type: 'COMMISSION', amount: '+$24.50', status: 'SUCCESS' },
  ];

  const plans = [
    { name: 'Bronze', id: 'PLAN_ID: BR-01', price: '25', credits: '15', features: ['Basic Chat Access', '24h Expiry'], status: 'ACTIVE', borderClass: 'border-l-orange-500' },
    { name: 'Silver', id: 'PLAN_ID: SL-01', price: '50', credits: '40', features: ['Audio Call Support', '7-Day Expiry'], status: 'ACTIVE', popular: true, borderClass: 'border-l-blue-400' },
    { name: 'Gold', id: 'PLAN_ID: GL-01', price: '100', credits: '100', features: ['Video Call Access', 'No Expiry'], status: 'ACTIVE', borderClass: 'border-l-amber-400' },
  ];

  const gateways = [
    { name: 'Stripe', status: 'ACTIVE', statusIcon: 'bg-emerald-400', bg: 'bg-[#191D2B]', logoText: 'text-indigo-400 bg-white/10' },
    { name: 'PayPal', status: 'MAINTENANCE', statusIcon: 'bg-amber-400', bg: 'bg-[#191D2B]', logoText: 'text-blue-400 bg-white/10' },
    { name: 'CryptoPay', status: 'INACTIVE', statusIcon: 'bg-slate-500', bg: 'bg-[#191D2B]', logoText: 'text-orange-400 bg-white/10' },
  ];

  return (
    <div className="max-w-[1200px] mx-auto pb-10">
      <h2 className="text-[28px] font-semibold text-slate-900 mb-6 tracking-tight">Wallets & Payments</h2>

      <div className="flex gap-4 mb-6">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-6 flex flex-col min-h-[420px]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-slate-800 tracking-tight">Transaction History</h3>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm font-medium transition-colors">
                  <Filter size={14} /> Filter
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm font-medium transition-colors">
                  <Download size={14} /> Export
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto flex-grow -mx-6 mb-4">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-y border-slate-100">
                  <tr>
                    <th className="py-3.5 px-6 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Transaction Id</th>
                    <th className="py-3.5 px-6 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Entity</th>
                    <th className="py-3.5 px-6 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Type</th>
                    <th className="py-3.5 px-6 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Amount</th>
                    <th className="py-3.5 px-6 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => (
                    <TransactionRow key={t.id} tx={t} />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-center mt-auto">
              <button className="text-[13px] font-medium text-indigo-400 hover:text-indigo-500">View All Transactions</button>
            </div>
          </div>

          <div className="mt-8 flex items-end justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium text-slate-800">Recharge Plans</h3>
              <p className="text-[12px] text-slate-400">Manage user credit packages</p>
            </div>
            <button onClick={() => setIsCreatingPlan(true)} className="bg-[#E4E4FF] text-indigo-400 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center hover:bg-[#D5D5FF] transition-colors">
              + Create New Plan
            </button>
          </div>
          
          <div className="flex gap-4">
            {plans.map((p) => (
              <PlanCard key={p.name} plan={p} />
            ))}
          </div>
        </div>

        <div className="col-span-4 space-y-6">
          {/* Commission Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-6 flex items-center justify-center text-indigo-300">
                <Percent size={18} strokeWidth={3} />
              </div>
              <h4 className="text-lg font-medium text-indigo-200">Commission Settings</h4>
            </div>
            
            <div className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Global Platform Fee</div>
            <div className="flex items-center bg-slate-100/70 rounded-lg p-1 pr-3 mb-6 border border-slate-100">
              <input className="w-full bg-transparent border-none outline-none px-3 py-1 text-sm font-medium text-slate-700" defaultValue="20" />
              <div className="text-sm font-semibold text-slate-600">%</div>
            </div>
            
            <div className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Category Overrides</div>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-slate-600 font-medium">Vedic Masters</span>
                <span className="text-indigo-400 font-medium">25%</span>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-slate-600 font-medium">Tarot Readers</span>
                <span className="text-indigo-400 font-medium">15%</span>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-slate-600 font-medium">Psychic Healers</span>
                <span className="text-indigo-400 font-medium">20%</span>
              </div>
            </div>
            
            <button className="w-full py-2.5 bg-[#EEF2FF] hover:bg-[#E4E4FF] text-indigo-400 rounded-lg text-[13px] font-medium transition-colors">
              Update Commission Policy
            </button>
          </div>

          {/* Refund Queue */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-[18px] h-[18px] rounded-sm flex items-center justify-center border border-rose-200 text-rose-400 bg-rose-50">
                <Plus size={10} strokeWidth={4} />
              </div>
              <h4 className="text-[15px] font-medium text-slate-800">Refund Queue</h4>
              <span className="ml-auto bg-[#9D0000] text-white text-[8px] font-semibold px-1.5 py-0.5 rounded-full flex items-center gap-1 leading-none h-4">
                <span className="w-1 h-1 bg-rose-200 rounded-full inline-block animate-pulse"></span> 4 NEW
              </span>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100/80">
                <div className="flex justify-between items-start mb-1.5">
                  <div className="text-[11px] font-semibold text-slate-800">Sarah J. ? Luna Mystica</div>
                  <div className="text-[11px] text-slate-400 font-medium">$45.00</div>
                </div>
                <div className="text-[10px] text-slate-400 font-medium leading-relaxed mb-3">
                  "Connection dropped midway, didn't finish session."
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 bg-[#D1F2EB] hover:bg-emerald-200 text-emerald-500 rounded md:text-[9px] text-[10px] font-semibold tracking-wide uppercase transition-colors">Approve</button>
                  <button className="flex-1 py-1.5 bg-[#FADBD8] hover:bg-rose-200 text-[#CD5C5C] rounded md:text-[9px] text-[10px] font-semibold tracking-wide uppercase transition-colors">Reject</button>
                </div>
              </div>
              
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100/80">
                <div className="flex justify-between items-start mb-1.5">
                  <div className="text-[11px] font-semibold text-slate-800">Mark T. ? Vedic Master A.</div>
                  <div className="text-[11px] text-slate-400 font-medium">$120.00</div>
                </div>
                <div className="text-[10px] text-slate-400 font-medium leading-relaxed mb-3">
                  "Inaccurate predictions, very disappointed."
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 bg-[#D1F2EB] hover:bg-emerald-200 text-emerald-500 rounded md:text-[9px] text-[10px] font-semibold tracking-wide uppercase transition-colors">Approve</button>
                  <button className="flex-1 py-1.5 bg-[#FADBD8] hover:bg-rose-200 text-[#CD5C5C] rounded md:text-[9px] text-[10px] font-semibold tracking-wide uppercase transition-colors">Reject</button>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button className="text-[11px] font-medium text-slate-400 hover:text-slate-500">See all requests</button>
            </div>
          </div>

          {/* Payment Gateways */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-5">
            <h4 className="text-[15px] font-medium text-slate-800 mb-4">Payment Gateways</h4>
            <div className="space-y-2.5">
              {gateways.map((g) => (
                <div key={g.name} className={`flex items-center justify-between px-3 py-2.5 rounded-lg ${g.bg}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded flex items-center justify-center font-semibold font-serif text-sm ${g.logoText}`}>
                      {g.name[0]}
                    </div>
                    <span className="text-[13px] font-semibold text-slate-200">{g.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[8px] font-semibold tracking-wider uppercase text-slate-300">
                    <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_4px] ${g.statusIcon} shadow-${g.statusIcon.replace('bg-', '')}`}></div>
                    {g.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

