import React from 'react';
import { Download, Calendar, Filter, DollarSign, Users, LineChart, Clock, Star, Trophy } from 'lucide-react';

const ReportsAnalytics = () => {
  return (
    <div className="w-full pb-10">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-[32px] font-semibold text-slate-900 tracking-tight">Reports & Analytics</h2>
          <div className="mt-2">
            <h3 className="text-slate-800 font-medium text-[15px]">Detailed Reports & Analytics</h3>
            <p className="text-slate-500 text-[13px] mt-1">Celestial movements and financial convergence data.</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-3">
          <button className="bg-[#00BAF2] hover:bg-[#00a3d4] text-white px-5 py-2 rounded-lg text-[14px] font-medium transition-colors flex items-center gap-2 shadow-sm">
            <Download size={16} />
            Export Report
          </button>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-[#F1F5F9] hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors border border-slate-200">
              <Calendar size={14} className="text-slate-400"/>
              Oct 01 - Oct 31, 2023
            </button>
            <button className="flex items-center gap-2 bg-[#F1F5F9] hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors border border-slate-200">
              <Filter size={14} className="text-slate-400" />
              All Categories
            </button>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg p-5 shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="flex justify-between items-start mb-3">
            <div className="w-9 h-9 rounded-lg bg-yellow-50 flex items-center justify-center text-yellow-500">
              <DollarSign size={18} />
            </div>
            <span className="text-yellow-500 text-[12px] font-semibold">+12.4%</span>
          </div>
          <div>
            <h4 className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-0.5">TOTAL REVENUE</h4>
            <h3 className="text-[28px] font-semibold text-slate-800">$428,940</h3>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="flex justify-between items-start mb-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
               <Users size={18} />
            </div>
            <span className="text-blue-500 text-[12px] font-semibold">+8.2%</span>
          </div>
          <div>
            <h4 className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-0.5">ACTIVE USERS</h4>
            <h3 className="text-[28px] font-semibold text-slate-800">18,542</h3>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="flex justify-between items-start mb-3">
            <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500">
              <LineChart size={18} />
            </div>
            <span className="text-purple-500 text-[12px] font-semibold">+2.1%</span>
          </div>
          <div>
            <h4 className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-0.5">CONVERSION RATE</h4>
            <h3 className="text-[28px] font-semibold text-slate-800">4.82%</h3>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="flex justify-between items-start mb-3">
            <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
              <Clock size={18} />
            </div>
            <span className="text-yellow-500 text-[12px] font-semibold">+4.5%</span>
          </div>
          <div>
            <h4 className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-0.5">RETENTION RATE</h4>
            <h3 className="text-[28px] font-semibold text-slate-800">62.5%</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 mb-8">
        {/* Main Chart */}
        <div className="col-span-8 bg-white rounded-lg p-6 shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-[17px] font-semibold text-slate-800">Revenue & User Growth</h2>
              <p className="text-[12px] text-slate-400 mt-1">Convergence of fiscal and social orbitals</p>
            </div>
            <div className="flex bg-[#F1F5F9] rounded-lg p-1">
              <button className="px-4 py-1.5 rounded-md bg-white shadow-sm text-[11px] font-semibold text-blue-600">Daily</button>
              <button className="px-4 py-1.5 rounded-md text-[11px] font-semibold text-slate-500 hover:text-slate-700">Weekly</button>
              <button className="px-4 py-1.5 rounded-md text-[11px] font-semibold text-slate-500 hover:text-slate-700">Monthly</button>
            </div>
          </div>
          
          <div className="flex-1 relative mt-2 min-h-[260px]">
             <div className="absolute inset-0 flex items-end justify-between gap-1.5 px-2">
                <div className="w-full h-[40%] bg-[#DDE4FF] rounded-t-md"></div>
                <div className="w-full h-[55%] bg-[#DDE4FF] rounded-t-md"></div>
                <div className="w-full h-[45%] bg-[#DDE4FF] rounded-t-md"></div>
                <div className="w-full h-[70%] bg-[#DDE4FF] rounded-t-md"></div>
                <div className="w-full h-[95%] bg-[#DDE4FF] rounded-t-md"></div>
                <div className="w-full h-[55%] bg-[#DDE4FF] rounded-t-md"></div>
                <div className="w-full h-[85%] bg-[#DDE4FF] rounded-t-md"></div>
                <div className="w-full h-[65%] bg-[#DDE4FF] rounded-t-md"></div>
             </div>
             <div className="absolute inset-0 top-[60%] border-t-[1.5px] border-yellow-300 flex items-center justify-end">
                <div className="w-3 h-3 rounded-full bg-yellow-400 mr-4 shadow-sm"></div>
             </div>
             
             <div className="absolute bottom-[-30px] left-0 right-0 flex justify-between px-4">
                <span className="text-[11px] text-slate-400 font-semibold">Oct 01</span>
                <span className="text-[11px] text-slate-400 font-semibold">Oct 08</span>
                <span className="text-[11px] text-slate-400 font-semibold">Oct 15</span>
                <span className="text-[11px] text-slate-400 font-semibold">Oct 22</span>
                <span className="text-[11px] text-slate-400 font-semibold">Oct 29</span>
             </div>
          </div>
        </div>

        {/* Astrologer Rank */}
        <div className="col-span-4 bg-white rounded-lg p-6 shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[15px] font-semibold text-blue-300">Astrologer Rank</h2>
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
          </div>

          <div className="flex flex-col gap-6 flex-1">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="relative">
                      <img src="https://i.pravatar.cc/150?img=60" className="w-10 h-10 rounded-full object-cover" alt="avatar" />
                      <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-white text-[9px] font-semibold px-1.5 rounded-full border-2 border-white">1st</div>
                   </div>
                   <div>
                     <h4 className="text-[14px] font-semibold text-slate-800">Dr. Celeste Astra</h4>
                     <p className="text-[11px] text-slate-400 mt-0.5">Natal Expert</p>
                   </div>
                </div>
                <div className="text-right">
                   <h4 className="text-[13px] font-semibold text-yellow-500">$12.4k</h4>
                   <p className="text-[10px] text-slate-500 mt-0.5">4.98 Rating</p>
                </div>
             </div>

             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="relative">
                      <img src="https://i.pravatar.cc/150?img=52" className="w-10 h-10 rounded-full object-cover" alt="avatar" />
                   </div>
                   <div>
                     <h4 className="text-[14px] font-semibold text-slate-800">Julian Moon</h4>
                     <p className="text-[11px] text-slate-400 mt-0.5">Vedic Master</p>
                   </div>
                </div>
                <div className="text-right">
                   <h4 className="text-[13px] font-semibold text-yellow-500">$9.8k</h4>
                   <p className="text-[10px] text-slate-500 mt-0.5">4.92 Rating</p>
                </div>
             </div>

             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="relative">
                      <img src="https://i.pravatar.cc/150?img=43" className="w-10 h-10 rounded-full object-cover" alt="avatar" />
                   </div>
                   <div>
                     <h4 className="text-[14px] font-semibold text-slate-800">Elena Sol</h4>
                     <p className="text-[11px] text-slate-400 mt-0.5">Horary Insight</p>
                   </div>
                </div>
                <div className="text-right">
                   <h4 className="text-[13px] font-semibold text-yellow-500">$8.1k</h4>
                   <p className="text-[10px] text-slate-500 mt-0.5">4.85 Rating</p>
                </div>
             </div>

             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="relative">
                      <img src="https://i.pravatar.cc/150?img=11" className="w-10 h-10 rounded-full object-cover" alt="avatar" />
                   </div>
                   <div>
                     <h4 className="text-[14px] font-semibold text-slate-800">Marcus Void</h4>
                     <p className="text-[11px] text-slate-400 mt-0.5">Transit Logic</p>
                   </div>
                </div>
                <div className="text-right">
                   <h4 className="text-[13px] font-semibold text-yellow-500">$7.2k</h4>
                   <p className="text-[10px] text-slate-500 mt-0.5">4.80 Rating</p>
                </div>
             </div>
          </div>
          
          <button className="w-full mt-6 py-3 border border-slate-200 rounded-lg text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
            View All Consultants
          </button>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-2 gap-8">
         {/* Conversion Funnel */}
         <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-100 flex flex-col">
            <div className="mb-6">
               <h2 className="text-[16px] font-semibold text-slate-800">Conversion Funnel</h2>
               <p className="text-[12px] text-slate-500 mt-1">Journey from arrival to enlightenment</p>
            </div>
            
            <div className="flex flex-col gap-4 mt-2">
               {/* Bar 1: Fully filled purple */}
               <div className="w-full h-[46px] bg-[#B0BDFC] rounded-lg relative overflow-hidden flex items-center justify-between px-6">
                 <span className="text-white font-semibold text-[14px] relative z-10">Unique Visits</span>
                 <div className="text-white text-right relative z-10 flex items-center gap-3">
                    <span className="text-[14px] font-semibold">124,500</span>
                    <span className="text-[13px] opacity-80">(100%)</span>
                 </div>
               </div>

               {/* Bar 2: Partially filled purple */}
               <div className="w-[95%] h-[46px] bg-[#E0E5FF] rounded-lg mx-auto relative overflow-hidden flex items-center justify-between">
                 <div className="absolute left-0 top-0 bottom-0 w-[70%] bg-[#B0BDFC]"></div>
                 <span className="text-white font-semibold text-[14px] relative z-10 px-6">Profile Viewed</span>
                 <div className="text-[#8B9FF0] text-right relative z-10 px-6 flex items-center gap-3">
                    <span className="text-[14px] font-semibold">87,150</span>
                    <span className="text-[13px]">(70%)</span>
                 </div>
               </div>

               {/* Bar 3: Fully lighter purple */}
               <div className="w-[90%] h-[46px] bg-[#D7DEFF] rounded-lg mx-auto relative overflow-hidden flex items-center justify-between">
                 <span className="text-white font-semibold text-[14px] relative z-10 px-6">Consultation</span>
                 <div className="text-white text-right relative z-10 px-6 flex items-center gap-3">
                    <span className="text-[14px] font-semibold p-1">11,200</span>
                    <span className="text-[13px] opacity-80">(9%)</span>
                 </div>
               </div>

               {/* Bar 4: Partially filled yellow over grey/gradient */}
               <div className="w-[85%] h-[46px] bg-[#F1F3DF] rounded-lg mx-auto relative overflow-hidden flex items-center justify-between">
                 <div className="absolute left-0 top-0 bottom-0 w-[40%] bg-[#E4D55B]"></div>
                 <span className="text-white font-semibold text-[14px] relative z-10 px-6 drop-shadow-sm">Repeat User</span>
                 <div className="text-white text-right relative z-10 px-6 flex items-center gap-3">
                    <span className="text-[14px] font-semibold drop-shadow-sm">4,480</span>
                    <span className="text-[13px] opacity-80 drop-shadow-sm">(3.6%)</span>
                 </div>
               </div>
            </div>
         </div>

         {/* Heatmap */}
         <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-100 flex flex-col">
            <div className="flex justify-between items-start mb-5">
               <div>
                 <h2 className="text-[16px] font-semibold text-slate-800">Peak Activity Heatmap</h2>
                 <p className="text-[12px] text-slate-500 mt-1">Intensity of user engagement by celestial hour</p>
               </div>
               <div className="w-16 h-3.5 bg-gradient-to-r from-blue-900 to-indigo-400 rounded-full"></div>
            </div>

            <div className="flex-1 w-full grid grid-cols-12 gap-1.5 mt-4">
                {[...Array(48)].map((_, i) => {
                   let bg = "bg-[#E0E7FF]";
                   if (i % 7 === 0) bg = "bg-[#C7D2FE]";
                   if (i % 11 === 0) bg = "bg-[#A5B4FC]";
                   if (i === 15 || i === 28 || i === 41) bg = "bg-[#818CF8]";
                   if (i === 26 || i === 31) bg = "bg-[#6366F1]";
                   if (i === 30) bg = "bg-[#EAE165]";
                   return (
                     <div key={i} className={`aspect-square rounded-sm ${bg}`}></div>
                   )
                })}
            </div>
            
            <div className="flex justify-between w-full mt-3 px-1 text-[10px] text-slate-400 font-medium">
               <span>00:00</span>
               <span className="flex flex-col"><span>04:0</span><span>0</span></span>
               <span>08:00</span>
               <span>12:00</span>
               <span>16:00</span>
               <span className="flex flex-col text-right"><span>20:0</span><span>0</span></span>
            </div>
         </div>
      </div>

    </div>
  );
};

export default ReportsAnalytics;
