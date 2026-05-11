import React from 'react';
import { 
  Star, Search, Filter, Download, AlertTriangle, 
  CheckCircle2, Eye, Flag, XCircle, ChevronRight, 
  MessageCircle, MoreHorizontal, User, Sparkles,
  TrendingUp, Clock, AlertCircle
} from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, colorClass, bgClass }) => (
  <div className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm flex items-center gap-4 flex-1">
    <div className={`${bgClass} ${colorClass} p-2.5 rounded-lg`}>
      <Icon size={20} />
    </div>
    <div>
      <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
      <p className="text-xl font-semibold text-slate-900 leading-none">{value}</p>
    </div>
  </div>
);

const ReviewRow = ({ user, astrologer, stars, analysis, content, date, status, actions }) => {
  const getAnalysisStyle = (type) => {
    switch(type) {
      case 'POSITIVE': return 'bg-emerald-50 text-emerald-500 border-emerald-100';
      case 'NEGATIVE': return 'bg-rose-50 text-rose-500 border-rose-100';
      case 'NEUTRAL': return 'bg-slate-50 text-slate-500 border-slate-100';
      default: return 'bg-slate-50 text-slate-500';
    }
  };

  const getStatusStyle = (type) => {
    switch(type) {
      case 'Approved': return 'bg-emerald-50 text-emerald-500 border-emerald-100';
      case 'Pending': return 'bg-amber-50 text-amber-500 border-amber-100';
      default: return 'bg-slate-50 text-slate-500';
    }
  };

  return (
    <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
             <User size={18} className="text-slate-400" />
          </div>
          <div>
            <h4 className="text-[13px] font-semibold text-slate-900">{user}</h4>
            <div className="flex items-center gap-1 mt-0.5">
               <Sparkles size={9} className="text-slate-400" />
               <p className="text-[10px] text-slate-400 font-medium">with <span className="text-slate-600">{astrologer}</span></p>
            </div>
          </div>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="space-y-1.5">
          <div className="flex text-amber-400">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={12} fill={i <= stars ? "currentColor" : "none"} />
            ))}
          </div>
          <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-lg border uppercase tracking-wider ${getAnalysisStyle(analysis)}`}>
            {analysis}
          </span>
        </div>
      </td>
      <td className="py-4 px-6 max-w-[220px]">
        <p className="text-[12px] text-slate-600 leading-relaxed italic">"{content}"</p>
        <p className="text-[9px] text-slate-400 mt-1.5 font-medium">{date}</p>
      </td>
      <td className="py-4 px-6">
        <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${getStatusStyle(status)}`}>
          {status}
        </span>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-1.5">
          {status === 'Pending' ? (
            <>
              <button className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition-all shadow-sm">
                <CheckCircle2 size={16} />
              </button>
              <button className="w-8 h-8 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center hover:bg-rose-200 transition-all border border-rose-200">
                <XCircle size={16} />
              </button>
              <button className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-all">
                <AlertCircle size={16} />
              </button>
            </>
          ) : (
            <>
              <button className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-all border border-slate-200">
                <Flag size={16} />
              </button>
              <button className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-all">
                <Eye size={16} />
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

const SentimentCard = ({ title, badge, content, author }) => (
  <div className="p-4 bg-white border border-slate-100 rounded-lg hover:shadow-md transition-all group cursor-pointer">
    <div className="flex justify-between items-start mb-2">
      <h5 className="text-[13px] font-semibold text-[#003566]">{title}</h5>
      <span className={`text-[8px] font-semibold px-2 py-0.5 rounded-lg uppercase tracking-widest ${
        badge === 'URGENT' ? 'bg-rose-50 text-rose-500' : 'bg-slate-100 text-slate-400'
      }`}>
        {badge}
      </span>
    </div>
    <p className="text-[12px] text-slate-500 italic leading-relaxed">"{content}"</p>
    <div className="flex justify-between items-center mt-3">
      <span className="text-[10px] text-slate-400 font-medium">- {author}</span>
      <ChevronRight size={14} className="text-slate-300 group-hover:text-[#00BAF2] transition-colors" />
    </div>
  </div>
);

const ReviewsRatings = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">Reviews & ratings</h1>
          <p className="text-[14px] text-slate-500 max-w-lg leading-relaxed">
            Monitor celestial feedback and ensure the quality of spiritual guidance within the Modern Oracle ecosystem.
          </p>
        </div>
        <button className="bg-[#00BAF2] text-white px-6 py-3 rounded-lg text-[13px] font-semibold uppercase tracking-widest flex items-center gap-2 hover:bg-[#00A0D2] transition-all shadow-lg shadow-[#00BAF2]/20">
          <Download size={16} /> Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="flex gap-6 h-28">
        <StatCard 
          label="Total Reviews" 
          value="12,482" 
          icon={MessageCircle} 
          colorClass="text-indigo-500" 
          bgClass="bg-indigo-50" 
        />
        <StatCard 
          label="Avg Rating" 
          value="4.8" 
          icon={Star} 
          colorClass="text-amber-500" 
          bgClass="bg-amber-50" 
        />
        <StatCard 
          label="Pending" 
          value="42" 
          icon={Clock} 
          colorClass="text-amber-600" 
          bgClass="bg-amber-50" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Left Column: Main Table & Filters */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm space-y-6">
            {/* Filters Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-lg">
                <button className="px-5 py-2 bg-indigo-500 text-white text-[12px] font-semibold rounded-lg shadow-sm">All Reviews</button>
                <button className="px-5 py-2 text-slate-500 text-[12px] font-semibold flex items-center gap-2 hover:bg-slate-100 rounded-lg transition-all">
                  <AlertTriangle size={14} /> Negative Queue
                </button>
                <button className="px-5 py-2 text-slate-500 text-[12px] font-semibold flex items-center gap-2 hover:bg-slate-100 rounded-lg transition-all">
                  <Filter size={14} /> Filter By Star
                </button>
              </div>

              <div className="relative flex-grow max-w-xs">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search user or astrologer..." 
                  className="w-full pl-10 pr-4 py-3 bg-slate-100 border-none rounded-lg text-[13px] text-slate-700 placeholder-slate-400 focus:ring-1 focus:ring-indigo-400"
                />
              </div>
            </div>

            {/* Table Area */}
            <div className="rounded-lg border border-slate-100 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="py-4 px-6 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">User / Astrologer</th>
                    <th className="py-4 px-6 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Rating & Analysis</th>
                    <th className="py-4 px-6 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Content</th>
                    <th className="py-4 px-6 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="py-4 px-6 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <ReviewRow 
                    user="Elena Thorne"
                    astrologer="Dr. Lyra Solis"
                    stars={5}
                    analysis="POSITIVE"
                    content="The birth chart analysis was deeply resonant."
                    date="24 Oct 2023"
                    status="Approved"
                  />
                  <ReviewRow 
                    user="Marcus Orion"
                    astrologer="Master Zephyr"
                    stars={3}
                    analysis="NEGATIVE"
                    content="I waited 20 minutes for the session to start."
                    date="25 Oct 2023"
                    status="Pending"
                  />
                  <ReviewRow 
                    user="Cassandra Moon"
                    astrologer="Oracle Luna"
                    stars={4}
                    analysis="NEUTRAL"
                    content="Basic reading, but helpful."
                    date="23 Oct 2023"
                    status="Approved"
                  />
                </tbody>
              </table>
              
              {/* Table Footer */}
              <div className="py-4 px-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <p className="text-[11px] text-slate-400 font-medium">Showing 1-10 of 42 pending reviews</p>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-white transition-all">&lt;</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-500 text-white text-[12px] font-semibold shadow-sm">1</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-white text-[12px] font-semibold">2</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-white transition-all">&gt;</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sentiment Crisis Queue */}
        <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm space-y-6 h-130">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-rose-50 text-rose-500 rounded-lg">
                <TrendingUp size={16} className="rotate-180" />
              </div>
              <h4 className="text-[11px] font-semibold text-rose-400 uppercase tracking-widest">Sentiment Crisis Queue</h4>
            </div>
            <span className="bg-rose-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">12</span>
          </div>

          <div className="space-y-4">
            <SentimentCard 
              title="Connection Issue"
              badge="URGENT"
              content="Wait time was ridiculous. I paid for a live session but sat in a queue for 15 minutes."
              author="Thomas A."
            />
            <SentimentCard 
              title="Inaccurate Advice"
              badge="NORMAL"
              content="Didn't resonate at all. The reader seemed distracted and gave very generic advice."
              author="Sarah K."
            />
          </div>

          <button className="w-full py-3 px-2 bg-rose-50 text-rose-500 text-[11px] font-semibold uppercase tracking-widest rounded-lg hover:bg-rose-100 transition-all border border-rose-100">
            Address All Negative Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsRatings;
