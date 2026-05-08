import React, { useState } from 'react';
import { Download, TrendingUp, Calendar, Clock, Edit2, Check, X, Moon, Power, Search, Upload, FileBarChart, MoreHorizontal } from 'lucide-react';

const BookingsManagement = () => {
  return (
    <div className="w-full pb-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[32px] font-semibold text-slate-900 tracking-tight">Booking Management</h2>
        <button className="bg-[#00BAF2] hover:bg-[#00a3d4] text-white px-5 py-2.5 rounded-lg text-[14px] font-semibold transition-colors flex items-center gap-2 shadow-sm">
          <Download size={16} />
          Export Report
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">TOTAL BOOKINGS</h4>
            <TrendingUp size={16} className="text-blue-500" />
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-semibold text-slate-800">1,284</h3>
            <div className="flex gap-1 items-center mt-2 text-[12px] text-slate-500">
              <TrendingUp size={12} className="text-green-500" />
              <span>12% increase from last month</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">UPCOMING TODAY</h4>
            <div className="w-2 h-2 rounded-full bg-yellow-400 mt-1"></div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-semibold text-slate-800">24</h3>
            <p className="mt-2 text-[12px] text-slate-500">Next session in 45 mins</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">PENDING REQUESTS</h4>
            <FileBarChart size={16} className="text-orange-400" />
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-semibold text-slate-800">12</h3>
            <p className="mt-2 text-[12px] text-orange-400 font-semibold">Needs immediate review</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">CANCELLED</h4>
            <X size={16} className="text-red-400" />
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-semibold text-slate-800">08</h3>
            <p className="mt-2 text-[12px] text-red-400">3% cancellation rate</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 mb-8">
        <div className="col-span-8 bg-white rounded-lg p-6 flex flex-col shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Calendar className="text-blue-500" size={24} />
              <h2 className="text-xl font-semibold text-slate-800">Session Calendar</h2>
            </div>
            <div className="flex bg-slate-100 rounded-lg p-1">
              <button className="px-4 py-1.5 rounded-md bg-white shadow-sm text-sm font-semibold text-blue-600">Month</button>
              <button className="px-4 py-1.5 rounded-md text-sm font-semibold text-slate-500 hover:text-slate-700">Week</button>
              <button className="px-4 py-1.5 rounded-md text-sm font-semibold text-slate-500 hover:text-slate-700">Day</button>
            </div>
          </div>
          {/* Calendar placeholder */}
          <div className="grid grid-cols-7 gap-3 mt-4">
            {['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'].map((day, i) => (
              <div key={i} className="text-center text-[11px] font-semibold text-slate-400 mb-2">{day}</div>
            ))}
            {[...Array(14)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-100 rounded-lg p-2 relative">
                <span className="text-xs font-semibold text-slate-500">{(i + 1).toString().padStart(2, '0')}</span>
                {i === 2 && (
                  <div className="absolute bottom-2 left-2 right-2 bg-blue-100 text-blue-600 text-[10px] font-semibold p-1 rounded">3 Sessions</div>
                )}
                {i === 3 && (
                  <div className="absolute bottom-2 left-2 right-2 flex flex-col gap-1">
                    <div className="bg-indigo-500 text-white text-[10px] font-semibold p-1 rounded">Natal Ch...</div>
                    <div className="bg-orange-400 text-white text-[10px] font-semibold p-1 rounded">Transit R...</div>
                  </div>
                )}
                {i === 9 && (
                   <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-yellow-400"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-4 bg-white rounded-lg p-6 flex flex-col shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-8">
            <Clock className="text-yellow-500" size={24} />
            <h2 className="text-xl font-semibold text-slate-800">Slot Management</h2>
          </div>
          
          <div className="mb-8">
            <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-4">QUICK TOGGLE AVAILABILITY</h4>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Moon className="text-blue-500" size={20} />
                <span className="text-sm font-semibold text-blue-600">Night Shift Slots</span>
              </div>
              <div className="w-10 h-5 bg-indigo-500 rounded-full relative cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-4">RECURRING WINDOWS</h4>
            
            <div className="bg-[#F8F9FA] rounded-lg p-4 mb-3 flex justify-between items-center border border-slate-100">
              <div>
                <h5 className="text-sm font-semibold text-slate-800">Standard Work Hours</h5>
                <p className="text-xs text-slate-500 mt-1">Mon - Fri, 09:00 - 17:00</p>
              </div>
              <Edit2 size={14} className="text-slate-400" />
            </div>

            <div className="bg-[#F8F9FA] rounded-lg p-4 mb-5 flex justify-between items-center border border-slate-100">
              <div className="border-l-[3px] border-orange-400 pl-3 -ml-4">
                <h5 className="text-sm font-semibold text-slate-800">Weekend Intuition</h5>
                <p className="text-xs text-slate-500 mt-1">Sat, 10:00 - 14:00</p>
              </div>
              <Edit2 size={14} className="text-slate-400" />
            </div>

            <button className="w-full py-3 rounded-lg border-2 border-indigo-100 text-indigo-500 font-semibold text-sm hover:bg-indigo-50 transition-colors">
              Define New Window
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-100">
        <div className="p-6 flex justify-between items-center border-b border-slate-100 h-18">
          <h2 className="text-xl font-semibold text-slate-800">Recent Activity</h2>
          <div className="flex gap-3">
            <select className="bg-slate-100 border-none text-slate-600 text-sm rounded-lg px-4 py-2 outline-none appearance-none pr-8 cursor-pointer relative">
              <option>All Astrologers</option>
            </select>
            <select className="bg-slate-100 border-none text-slate-600 text-sm rounded-lg px-4 py-2 outline-none appearance-none pr-8 cursor-pointer relative">
              <option>Filter Status</option>
            </select>
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-[11px] font-semibold text-slate-500 uppercase tracking-widest border-b border-slate-100">
              <th className="px-5 py-4 font-semibold w-[25%]">CLIENT</th>
              <th className="px-5 py-4 font-semibold w-[20%]">TYPE</th>
              <th className="px-5 py-4 font-semibold w-[20%]">DATE & TIME</th>
              <th className="px-5 py-4 font-semibold w-[25%]">PRACTITIONER</th>
              <th className="px-5 py-4 font-semibold text-right w-[10%]">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
              <td className="px-5 py-3 align-middle">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold text-sm">JW</div>
                   <div><p className="font-semibold text-slate-800 text-sm">Julian Waters</p></div>
                </div>
              </td>
              <td className="px-5 py-3 align-middle">
                <span className="bg-indigo-50 text-indigo-500 px-3 py-1.5 rounded-md text-xs font-semibold">Solar Return</span>
              </td>
              <td className="px-5 py-3 align-middle">
                <div className="text-sm font-semibold text-slate-600">Oct 12, 14:00</div>
              </td>
              <td className="px-5 py-3 align-middle">
                 <div className="flex items-center gap-3">
                   <img src="https://i.pravatar.cc/150?img=47" className="w-8 h-8 rounded-full object-cover" alt="avatar" />
                   <div><p className="font-semibold text-slate-800 text-sm">Selene Moon</p></div>
                 </div>
              </td>
              <td className="px-5 py-3 text-right align-middle">
                 <div className="flex justify-end gap-4 text-slate-400">
                   <button className="hover:text-slate-600 hover:bg-slate-200 p-1 rounded transition"><Upload size={16} className="rotate-90"/></button>
                   <button className="hover:text-red-500 hover:bg-slate-200 p-1 rounded transition"><X size={16} /></button>
                 </div>
              </td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-5 py-3 align-middle">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-semibold text-sm">EA</div>
                   <div><p className="font-semibold text-slate-800 text-sm">Elena Astra</p></div>
                </div>
              </td>
              <td className="px-5 py-3 align-middle">
                <span className="bg-orange-50 text-orange-500 px-3 py-1.5 rounded-md text-xs font-semibold border-orange-100 border">Compatibility</span>
              </td>
              <td className="px-5 py-3 align-middle">
                <div className="text-sm font-semibold text-slate-600">Oct 12, 16:30</div>
              </td>
              <td className="px-5 py-3 align-middle">
                 <div className="flex items-center gap-3">
                   <img src="https://i.pravatar.cc/150?img=11" className="w-8 h-8 rounded-full object-cover" alt="avatar" />
                   <div>
                     <p className="font-semibold text-slate-800 text-sm">Dr. Orion</p>
                   </div>
                 </div>
              </td>
              <td className="px-5 py-3 text-right align-middle">
                 <div className="flex justify-end gap-4 text-slate-400">
                   <button className="hover:text-slate-600 hover:bg-slate-200 p-1 rounded transition"><Upload size={16} className="rotate-90"/></button>
                   <button className="hover:text-red-500 hover:bg-slate-200 p-1 rounded transition"><X size={16} /></button>
                 </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default BookingsManagement;



