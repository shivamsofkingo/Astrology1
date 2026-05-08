import React from 'react';
import { 
  Users, TrendingDown, Wallet, Star, Moon, Sun, 
  Check, X, Edit3, Plus, Calendar, MessageSquare, 
  Video, Sparkles 
} from 'lucide-react';

const StatCard = ({ label, value, trend, icon: Icon, iconBg, iconColor, trendColor }) => (
  <div className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm">
    <div className="flex justify-between items-start mb-3">
      <div className={`p-2 rounded-lg ${iconBg} ${iconColor}`}>
        <Icon size={20} />
      </div>
      {trend && (
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${trendColor} bg-opacity-10`}>
          {trend}
        </span>
      )}
    </div>
    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <h3 className="text-3xl font-semibold text-slate-900">{value}</h3>
  </div>
);

const PlanCard = ({ name, price, period, features, userCount, isActive, icon: Icon, isPopular }) => (
  <div className={`bg-white p-6 rounded-lg border ${isPopular ? 'border-[#00BAF2] shadow-xl shadow-blue-50' : 'border-slate-100 shadow-sm'} relative flex flex-col h-full`}>
    {isPopular && (
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-400 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
        Most Popular
      </div>
    )}
    
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-3">
        <Icon size={22} className={isPopular ? 'text-[#00BAF2]' : 'text-slate-400'} />
        <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
      </div>
      <button className="p-1 text-slate-300 hover:text-slate-500 transition-colors">
        <Edit3 size={16} />
      </button>
    </div>

    <div className="mb-6">
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold text-slate-900">${price}</span>
        <span className="text-slate-400 font-semibold text-xs">/ {period}</span>
      </div>
    </div>

    <div className="space-y-3 mb-8 flex-grow">
      {features.map((feature, i) => (
        <div key={i} className="flex items-start gap-3">
          {feature.included ? (
            <Check size={16} className="text-[#00BAF2] mt-0.5" />
          ) : (
            <X size={16} className="text-slate-300 mt-0.5" />
          )}
          <span className={`text-sm font-semibold ${feature.included ? 'text-slate-700' : 'text-slate-300'}`}>
            {feature.text}
          </span>
        </div>
      ))}
    </div>

    <div className="flex items-center gap-2 pt-6 border-t border-slate-50">
      <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[11px] font-bold rounded-md">
        {userCount} Users
      </span>
      {isActive && (
        <span className="px-3 py-1 border border-slate-200 text-slate-400 text-[11px] font-bold rounded-md">
          Active
        </span>
      )}
    </div>
  </div>
);

const FeatureRow = ({ icon: Icon, title, description, tiers }) => (
  <tr className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
    <td className="py-4 px-6">
      <div className="flex items-start gap-3">
        <div className="p-1.5 bg-gray-100 rounded-lg text-slate-500">
          <Icon size={18} />
        </div>
        <div>
          <h4 className="text-[13px] font-bold text-slate-900">{title}</h4>
          <p className="text-[10px] text-slate-400 font-semibold">{description}</p>
        </div>
      </div>
    </td>
    {tiers.map((hasAccess, i) => (
      <td key={i} className="py-4 px-6 text-center">
        <div className="flex justify-center">
          {hasAccess ? (
            <div className="w-6 h-6 rounded-md bg-[#00BAF2] flex items-center justify-center text-white">
              <Check size={14} strokeWidth={3} />
            </div>
          ) : (
            <div className="w-6 h-6 rounded-md border-2 border-slate-200"></div>
          )}
        </div>
      </td>
    ))}
  </tr>
);

const SubscriptionManagement = () => {
  const [view, setView] = React.useState('list'); // 'list' or 'create'
  const [formData, setFormData] = React.useState({
    name: 'Sun Sage',
    identifier: 'tier_sun_sage_premium',
    tagline: 'Deep cosmic insights for the enlightened soul',
    price: '29.99',
    billingCycle: 'Monthly',
    trialPeriod: '7',
    features: {
      horoscope: true,
      community: true,
      liveChat: false,
      video: false,
      transit: true,
      support: true
    },
    benefits: [
      'Unlimited Astrological Birth Chart Reports',
      'Exclusive Monthly Moon Ritual Guides',
      'Early Access to New Celestial Tools'
    ]
  });

  if (view === 'create') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Configure new tier</h1>
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
            
            {/* Tier Identity */}
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-[#00BAF2]">
                 <div className="p-1.5 bg-amber-50 text-amber-500 rounded-md">
                   <Sun size={18} />
                 </div>
                 <h2 className="text-lg font-bold text-[#003566]">Tier Identity</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[12px] font-semibold text-slate-400 uppercase tracking-widest">Tier Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-100 border border-slate-200 rounded-lg text-[14px] font-semibold text-slate-700 outline-none focus:border-[#00BAF2]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-semibold text-slate-400 uppercase tracking-widest">Internal Identifier</label>
                  <input 
                    type="text" 
                    value={formData.identifier}
                    className="w-full px-4 py-3 bg-gray-100 border border-slate-200 rounded-lg text-[14px] font-mono font-semibold text-slate-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-semibold text-slate-400 uppercase tracking-widest">Marketing Tagline</label>
                <input 
                  type="text" 
                  value={formData.tagline}
                  onChange={(e) => setFormData({...formData, tagline: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-100 border border-slate-200 rounded-lg text-[14px] font-semibold text-slate-700 outline-none focus:border-[#00BAF2]"
                />
              </div>
            </div>

            {/* Pricing Configuration */}
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-6">
               <div className="flex items-center gap-2 text-[#00BAF2]">
                 <div className="p-1.5 bg-amber-50 text-amber-500 rounded-md">
                   <Wallet size={18} />
                 </div>
                 <h2 className="text-lg font-bold text-[#003566]">Pricing Configuration</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[12px] font-semibold text-slate-400 uppercase tracking-widest">Price ($)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                    <input 
                      type="text" 
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full pl-8 pr-4 py-3 bg-gray-100 border border-slate-200 rounded-lg text-[14px] font-semibold text-slate-700 outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-semibold text-slate-400 uppercase tracking-widest">Billing Cycle</label>
                  <select 
                    value={formData.billingCycle}
                    onChange={(e) => setFormData({...formData, billingCycle: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-100 border border-slate-200 rounded-lg text-[14px] font-semibold text-slate-700 outline-none appearance-none"
                  >
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Yearly</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-semibold text-slate-400 uppercase tracking-widest">Trial Period (Days)</label>
                  <input 
                    type="text" 
                    value={formData.trialPeriod}
                    onChange={(e) => setFormData({...formData, trialPeriod: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-100 border border-slate-200 rounded-lg text-[14px] font-semibold text-slate-700 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Feature Access Matrix */}
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-6">
               <div className="flex items-center gap-2 text-[#00BAF2]">
                 <div className="p-1.5 bg-amber-50 text-amber-500 rounded-md">
                   <Sparkles size={18} />
                 </div>
                 <h2 className="text-lg font-bold text-[#003566]">Feature Access Matrix</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'horoscope', label: 'Daily Horoscope Push' },
                  { id: 'community', label: 'Community Access' },
                  { id: 'liveChat', label: 'Live Chat with Astrologers' },
                  { id: 'video', label: 'Video Consultations' },
                  { id: 'transit', label: 'Premium Transit Visualizer' },
                  { id: 'support', label: 'Priority Support' },
                ].map((feature) => (
                  <div key={feature.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg bg-white shadow-sm">
                    <span className="text-[13px] font-semibold text-slate-700">{feature.label}</span>
                    <div 
                      onClick={() => setFormData({
                        ...formData, 
                        features: { ...formData.features, [feature.id]: !formData.features[feature.id] }
                      })}
                      className={`w-12 h-6 rounded-full relative cursor-pointer transition-all ${formData.features[feature.id] ? 'bg-[#00BAF2]' : 'bg-slate-300'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.features[feature.id] ? 'right-1' : 'left-1'}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefit Builder */}
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-6">
               <div className="flex justify-between items-center">
                 <div className="flex items-center gap-2 text-[#00BAF2]">
                    <div className="p-1.5 bg-amber-50 text-amber-500 rounded-md">
                      <Star size={18} />
                    </div>
                    <h2 className="text-lg font-bold text-[#003566]">Benefit Builder</h2>
                 </div>
                 <button className="text-[11px] font-bold text-[#00BAF2] flex items-center gap-1 hover:underline">
                    <Plus size={14} /> Add Perk
                 </button>
               </div>

               <div className="space-y-3">
                 {formData.benefits.map((benefit, i) => (
                   <div key={i} className="flex items-center gap-3 p-4 border border-slate-100 rounded-lg bg-white shadow-sm group">
                     <Check size={14} className="text-amber-500" />
                     <span className="text-[13px] font-semibold text-slate-700 flex-grow">{benefit}</span>
                     <button className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity hover:text-rose-500">
                        <X size={16} />
                     </button>
                   </div>
                 ))}
               </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 pt-6 pb-10">
               <button 
                onClick={() => setView('list')}
                className="px-10 py-3 border border-slate-200 text-slate-400 rounded-lg font-bold hover:bg-slate-50 transition-all"
               >
                 Discard Changes
               </button>
               <button className="px-10 py-3 bg-[#00BAF2] text-white rounded-lg font-bold flex items-center gap-2 hover:bg-[#00a3d6] transition-all shadow-lg shadow-blue-100">
                 <Plus size={18} /> Publish New Tier
               </button>
            </div>
          </div>

          {/* Live Preview */}
          <div className="lg:col-span-4">
            <div className="sticky top-20 space-y-6">
              <h3 className="text-lg font-bold text-slate-800">Live Customer Preview</h3>
              
              <div className="relative w-full rounded-lg overflow-hidden shadow-2xl bg-[#0B0D17] text-white flex flex-col p-8 min-h-[600px]">
                {/* Galaxy Background Image */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src="/images/cosmic-bg.png" 
                    alt="Cosmic Background" 
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0B0D17]/40 via-[#0B0D17]/80 to-[#0B0D17]"></div>
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6">
                    <span className="px-3 py-1 bg-amber-400/20 text-amber-400 text-[9px] font-bold uppercase tracking-[0.2em] rounded-md border border-amber-400/30 backdrop-blur-sm">
                      Most Popular
                    </span>
                  </div>

                  <h4 className="text-4xl font-bold mb-4 tracking-tight">{formData.name || 'Tier Name'}</h4>
                  <p className="text-[12px] text-white/50 font-medium italic mb-10 leading-relaxed pr-6">
                    "{formData.tagline}"
                  </p>

                  <div className="mb-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">${formData.price}</span>
                      <span className="text-white/40 text-sm font-semibold">/ {formData.billingCycle.toLowerCase()}</span>
                    </div>
                  </div>
                  <p className="text-amber-400 text-[11px] font-bold mb-8">{formData.trialPeriod} Days Free Trial included</p>

                  <div className="space-y-4 mb-auto">
                    {formData.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-1 w-4 h-4 rounded-full border border-blue-400/50 flex items-center justify-center">
                          <Check size={10} className="text-blue-400" />
                        </div>
                        <span className="text-[12px] font-semibold text-white/80 leading-snug">{benefit}</span>
                      </div>
                    ))}
                    {Object.entries(formData.features).filter(([_, val]) => !val).map(([key], i) => (
                      <div key={i} className="flex items-start gap-3 opacity-30">
                         <div className="mt-1 w-4 h-4 rounded-full border border-white/20 flex items-center justify-center">
                          <X size={10} />
                        </div>
                        <span className="text-[12px] font-semibold text-white/50 leading-snug">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-8 text-center space-y-4">
                    <button className="w-full py-4 bg-[#4D55FF] text-white rounded-lg font-bold text-lg hover:bg-blue-600 transition-all shadow-lg shadow-blue-900/40">
                      BEGIN JOURNEY
                    </button>
                    <p className="text-[10px] text-white/30 font-medium tracking-wide">
                      Secure cosmic encryption enabled.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Subscription & Management</h1>
        <p className="text-[14px] text-slate-500 mt-1 font-semibold">Control premium tiers and celestial access</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="Total Subscribers" 
          value="14,208" 
          trend="+12%" 
          icon={Users} 
          iconBg="bg-blue-50" 
          iconColor="text-[#00BAF2]" 
          trendColor="text-amber-500 bg-amber-100"
        />
        <StatCard 
          label="Churn Rate" 
          value="3.1%" 
          trend="-2.4%" 
          icon={TrendingDown} 
          iconBg="bg-indigo-50" 
          iconColor="text-indigo-500" 
          trendColor="text-rose-500 bg-rose-200"
        />
        <StatCard 
          label="Monthly Recurring Revenue" 
          value="$82,450" 
          trend="+8.1%" 
          icon={Wallet} 
          iconBg="bg-emerald-50" 
          iconColor="text-emerald-500" 
          trendColor="text-amber-500 bg-amber-100"
        />
      </div>

      {/* Active Plan Tiers */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-[20px] font-bold text-slate-900">Active Plan Tiers</h2>
          <button 
            onClick={() => setView('create')}
            className="flex items-center gap-1.5 text-[#00BAF2] text-sm font-bold hover:underline"
          >
            <Plus size={16} /> Add New Tier
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PlanCard 
            name="Star Seeker"
            price="9.99"
            period="WEEKLY"
            icon={Star}
            userCount="8.2k"
            isActive={true}
            features={[
              { text: 'Daily Horoscope Push', included: true },
              { text: 'Community Access', included: true },
              { text: 'Video Consultations', included: false },
            ]}
          />
          <PlanCard 
            name="Moon Mystic"
            price="29.99"
            period="MONTHLY"
            icon={Moon}
            userCount="4.5k"
            isActive={true}
            isPopular={true}
            features={[
              { text: 'All Star Seeker Features', included: true },
              { text: 'Monthly Birth Chart Analysis', included: true },
              { text: 'Live Chat with Oracles', included: true },
            ]}
          />
          <PlanCard 
            name="Sun Sage"
            price="249.99"
            period="YEARLY"
            icon={Sun}
            userCount="1.5k"
            isActive={true}
            features={[
              { text: 'Unlimited Personal Consults', included: true },
              { text: 'Premium Transit Visualizer', included: true },
              { text: 'Priority Video Sessions', included: true },
            ]}
          />
        </div>
      </div>

      {/* Feature Access Grid */}
      <div className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50">
          <h2 className="text-[18px] font-bold text-slate-900">Feature Access Grid</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <th className="py-4 px-8 w-1/3">Platform Feature</th>
                <th className="py-4 px-6 text-center">Star Seeker</th>
                <th className="py-4 px-6 text-center">Moon Mystic</th>
                <th className="py-4 px-6 text-center">Sun Sage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <FeatureRow 
                icon={Calendar}
                title="Daily Horoscope"
                description="Automated planetary insights"
                tiers={[true, true, true]}
              />
              <FeatureRow 
                icon={MessageSquare}
                title="Live Chat"
                description="Direct message with system astrologers"
                tiers={[false, true, true]}
              />
              <FeatureRow 
                icon={Video}
                title="Video Consultations"
                description="1-on-1 private video calls"
                tiers={[false, false, true]}
              />
              <FeatureRow 
                icon={Sparkles}
                title="Cosmic Transit Tools"
                description="Advanced planetary tracking widgets"
                tiers={[false, true, true]}
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManagement;
