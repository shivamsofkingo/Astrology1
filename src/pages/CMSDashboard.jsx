import React, { useState } from 'react';
import { 
  Download, Star, Search, Plus, Edit2, 
  ExternalLink, ChevronDown, Sparkles, 
  Layout, FileText, Newspaper, Image as ImageIcon,
  CheckCircle2, Clock, AlertCircle
} from 'lucide-react';

const ZodiacItem = ({ name, icon: Icon, active }) => (
  <button className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all border ${
    active 
      ? 'bg-indigo-500 border-indigo-400 text-white shadow-lg shadow-indigo-200' 
      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
  }`}>
    <div className={`mb-1.5 ${active ? 'text-white' : 'text-slate-500'}`}>
      <Icon size={18} />
    </div>
    <span className="text-[10px] font-semibold uppercase tracking-widest">{name}</span>
  </button>
);

const BannerCard = ({ title, subtitle, active, image }) => (
  <div className="relative group rounded-lg overflow-hidden border border-slate-100 shadow-sm h-32">
    <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent flex flex-col justify-end p-4">
      <div className="flex justify-between items-end">
        <div>
          <h4 className="text-[11px] font-semibold text-white uppercase tracking-wider mb-1">{title}</h4>
          <p className="text-[10px] text-slate-300 font-medium">{subtitle}</p>
        </div>
        <div className={`w-10 h-5 rounded-full p-1 cursor-pointer transition-colors ${active ? 'bg-indigo-500' : 'bg-slate-600'}`}>
          <div className={`w-3 h-3 bg-white rounded-full transition-transform ${active ? 'translate-x-5' : 'translate-x-0'}`}></div>
        </div>
      </div>
    </div>
  </div>
);

const StaticPageItem = ({ title, lastEdited, status }) => (
  <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-lg border border-slate-100 hover:bg-white hover:shadow-md transition-all group">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center text-slate-400">
        <FileText size={20} />
      </div>
      <div>
        <h4 className="text-[14px] font-semibold text-slate-800">{title}</h4>
        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-tighter mt-0.5">LAST EDITED: {lastEdited}</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <span className={`text-[9px] font-semibold px-2.5 py-0.5 rounded uppercase tracking-widest ${
        status === 'PUBLISHED' ? 'bg-emerald-50 text-emerald-500 border border-emerald-100' : 'bg-amber-50 text-amber-500 border border-amber-100'
      }`}>
        {status}
      </span>
      <button className="text-slate-300 group-hover:text-indigo-500 transition-colors">
        <Edit2 size={14} />
      </button>
    </div>
  </div>
);

const BlogCard = ({ image, category, seoScore, title, subtitle }) => (
  <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800 flex flex-col h-full group">
    <div className="relative h-40 overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
         <span className="bg-slate-900/50 backdrop-blur-md text-white text-[9px] font-semibold px-3 py-1 rounded-full uppercase tracking-widest border border-white/10">
           {category}
         </span>
         <span className="flex items-center gap-1.5 bg-slate-900/50 backdrop-blur-md text-emerald-400 text-[9px] font-semibold px-3 py-1 rounded-full border border-emerald-500/20">
           <Sparkles size={10} /> {seoScore} SEO
         </span>
      </div>
    </div>
    <div className="p-5 flex flex-col flex-1">
      <h4 className="text-[15px] font-semibold text-white mb-2 leading-tight">{title}</h4>
      <p className="text-[12px] text-slate-400 line-clamp-2 mb-4 leading-relaxed font-medium">{subtitle}</p>
      <div className="mt-auto pt-4 border-t border-slate-800 flex justify-between items-center">
        <div className="flex -space-x-2">
           <img src="https://i.pravatar.cc/150?u=a" className="w-6 h-6 rounded-full border-2 border-slate-900" />
           <img src="https://i.pravatar.cc/150?u=b" className="w-6 h-6 rounded-full border-2 border-slate-900" />
        </div>
        <button className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">
           Edit <ExternalLink size={12} />
        </button>
      </div>
    </div>
  </div>
);

const CMSDashboard = () => {
  const [activeZodiac, setActiveZodiac] = useState('ARIES');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">CMS Dashboard</h1>
          <p className="text-[14px] text-slate-500 max-w-lg leading-relaxed">
            Monitor celestial feedback and ensure the quality of spiritual guidance within the Modern Oracle ecosystem.
          </p>
        </div>
        <button className="bg-[#00BAF2] text-white px-6 py-3 rounded-lg text-[13px] font-semibold uppercase tracking-widest flex items-center gap-2 hover:bg-[#00A0D2] transition-all shadow-lg shadow-[#00BAF2]/20">
          <Download size={16} /> Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Daily Celestial Reading Section */}
        <div className="lg:col-span-2 bg-white p-8 rounded-lg border border-slate-100 shadow-sm space-y-8 relative overflow-hidden">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-amber-50 rounded-lg text-amber-500">
                <Star size={20} fill="currentColor" />
             </div>
             <h2 className="text-xl font-semibold text-slate-800">Daily Celestial Reading</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Left: Zodiac Selector */}
            <div className="md:col-span-4 space-y-6">
               <h4 className="text-[10px] font-semibold text-indigo-400 uppercase tracking-widest">SELECT ZODIAC</h4>
               <div className="grid grid-cols-3 gap-3">
                  <ZodiacItem name="ARIES" icon={Layout} active={activeZodiac === 'ARIES'} />
                  <ZodiacItem name="TAURUS" icon={Layout} active={activeZodiac === 'TAURUS'} />
                  <ZodiacItem name="GEMINI" icon={Layout} active={activeZodiac === 'GEMINI'} />
                  <ZodiacItem name="CANCER" icon={Layout} active={activeZodiac === 'CANCER'} />
                  <ZodiacItem name="LEO" icon={Layout} active={activeZodiac === 'LEO'} />
                  <ZodiacItem name="VIRGO" icon={Layout} active={activeZodiac === 'VIRGO'} />
               </div>
               <button className="flex items-center gap-2 text-[11px] font-semibold text-indigo-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">
                 View all 12 signs <ChevronDown size={14} />
               </button>
            </div>

            {/* Right: Text Editor */}
            <div className="md:col-span-8 space-y-6">
               <h4 className="text-[10px] font-semibold text-indigo-400 uppercase tracking-widest">TRANSIT READING ({activeZodiac})</h4>
               <div className="bg-gray-100 border border-slate-100 rounded-lg p-6 min-h-[220px]">
                  <textarea 
                    placeholder="Type the celestial guidance for today..."
                    className="w-full h-full bg-transparent border-none focus:ring-0 text-slate-600 text-[14px] leading-relaxed resize-none placeholder:text-slate-400 font-medium"
                  />
               </div>
               <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                       <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">AURA:</span>
                       <div className="w-3 h-3 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500/50"></div>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">LUCK:</span>
                       <span className="text-[12px] font-semibold text-amber-500">88%</span>
                    </div>
                  </div>
                  <button className="bg-indigo-600 text-white px-8 py-3.5 rounded-lg text-[13px] font-semibold uppercase tracking-widest shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all">
                    Publish Reading
                  </button>
               </div>
            </div>
          </div>

          {/* Background Decorative Element */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50/30 rounded-full -mr-10 -mt-10 blur-3xl -z-10"></div>
          <Sparkles className="absolute top-10 right-10 text-indigo-100" size={80} />
        </div>

        {/* Active Banners Section */}
        <div className="bg-white p-8 rounded-lg border border-slate-100 shadow-sm space-y-8 flex flex-col">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-800">Active Banners</h2>
            <Layout size={18} className="text-slate-400" />
          </div>

          <div className="space-y-4 flex-1">
            <BannerCard 
              title="MERCURY RETROGRADE SALE" 
              subtitle="Expires in 3 days" 
              active={true} 
              image="https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=400&auto=format&fit=crop"
            />
            <BannerCard 
              title="LUNAR READING SESSIONS" 
              subtitle="Always Active" 
              active={true} 
              image="https://images.unsplash.com/photo-1532693322450-2cb5c511067d?q=80&w=400&auto=format&fit=crop"
            />
          </div>

          <button className="w-full py-4 rounded-lg border-2 border-slate-100 text-[11px] font-semibold text-slate-400 hover:bg-slate-50 transition-all uppercase tracking-widest">
            MANAGE AD PLACEMENTS
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Static Pages Section */}
        <div className="bg-white p-8 rounded-lg border border-slate-100 shadow-sm space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-800">Static Pages</h2>
            <button className="flex items-center gap-2 text-[10px] font-semibold text-indigo-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">
              <Plus size={14} /> NEW PAGE
            </button>
          </div>

          <div className="space-y-3">
            <StaticPageItem title="About Us" lastEdited="2H AGO" status="PUBLISHED" />
            <StaticPageItem title="Privacy Policy" lastEdited="OCT 12" status="PUBLISHED" />
            <StaticPageItem title="FAQ" lastEdited="SEP 28" status="DRAFT" />
          </div>
        </div>

        {/* Blog Manager Section */}
        <div className="bg-white p-8 rounded-lg border border-slate-100 shadow-sm space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-800">Astrology Blog Manager</h2>
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                 <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">SEO HEALTH</span>
               </div>
               <button className="text-[10px] font-semibold text-indigo-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">
                 VIEW ALL ARTICLES
               </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BlogCard 
              image="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=400&auto=format&fit=crop"
              category="PLANET TRANSITS"
              seoScore="94"
              title="Saturn in Retrograde: The..."
              subtitle="How this planetary shift affects each house and what you should expect in"
            />
            <BlogCard 
              image="https://69fd6b5f867076fb670c5e98.imgix.net/bunch-of-diamonds-hd-photo-954980.png"
              category="CRYSTALS"
              seoScore="62"
              title="Top 5 Crystals for the New..."
              subtitle="Setting intentions becomes more powerful when paired with the right..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMSDashboard;
