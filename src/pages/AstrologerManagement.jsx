import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Zap, Clock, ShieldAlert,
  ChevronDown, Plus, ChevronRight, Search
} from 'lucide-react';
import { getAllAstrologers } from '../api/astrologerApi';

const StatCard = ({ icon: Icon, label, value, colorClass, bgClass }) => (
  <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm flex items-center gap-4 flex-1">
    <div className={`${bgClass} ${colorClass} p-3 rounded-lg`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-2xl font-semibold text-slate-900">{value}</p>
    </div>
  </div>
);

const AstrologerRow = ({ id, fullName, profileImage, about, isApproved, isRejected, createdAt, chatRate, callRate, videoCallRate, specializations, }) => {
  const navigate = useNavigate();
  const status = isRejected ? 'Rejected' : isApproved ? 'Approved' : 'Pending';

  // Format createdAt
  const joinDate = createdAt
    ? new Date(createdAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
    : '—';

  return (
    <tr className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
      {/* User Profile */}
      <td className="py-4 px-6">
        <div
          onClick={() => navigate(`/astrologers/${id}`)}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {profileImage ? (
            <img
              src={profileImage}
              alt={fullName || 'Astrologer'}
              className="w-10 h-10 rounded-full border border-slate-100 object-cover group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-10 h-10 rounded-full border border-slate-100 bg-indigo-50 text-indigo-500 flex items-center justify-center font-semibold group-hover:scale-105 transition-transform">
              {(fullName || 'A').charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-[14px] font-semibold text-slate-900 group-hover:text-indigo-500 transition-colors">{fullName || 'Unnamed Astrologer'}</p>
            <p className="text-[11px] text-slate-400 font-medium">ID: {id}</p>
          </div>
        </div>
      </td>

      {/* Join Date */}
      <td className="py-4 px-6 text-center">
        <p className="text-[14px] font-medium text-slate-600">{joinDate}</p>
      </td>

      {/* Approval and availability status */}
      <td className="py-4 px-6">
        <div className="flex justify-center">
          <span className={`text-[10px] font-semibold px-3 py-1 rounded-full border flex items-center gap-1.5 w-fit uppercase tracking-wider ${isRejected
            ? 'bg-rose-50 text-rose-600 border-rose-100'
            : isApproved
              ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
              : 'bg-amber-50 text-amber-600 border-amber-100'
            }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isRejected ? 'bg-rose-500' : isApproved ? 'bg-emerald-500' : 'bg-amber-500'
              }`}></span>
            {status}
          </span>
        </div>
      </td>

      {/* Chat Rate */}
      <td className="py-4 px-6 text-center">
        <p className="text-[14px] font-semibold text-amber-500">
          ₹ {chatRate ?? 0}
          <span className="text-[10px] text-slate-400 font-medium ml-1">
            /-min
          </span>
        </p>
      </td>

      {/* Call Rate */}
      <td className="py-4 px-6 text-center">
        <p className="text-[14px] font-semibold text-amber-500">
          ₹ {callRate ?? 0}
          <span className="text-[10px] text-slate-400 font-medium ml-1">
            /-min
          </span>
        </p>
      </td>

      {/* Video Call Rate */}
      <td className="py-4 px-6 text-center">
        <p className="text-[14px] font-semibold text-amber-500">
          ₹ {videoCallRate ?? 0}
          <span className="text-[10px] text-slate-400 font-medium ml-1">/-min</span>
        </p>
      </td>

      {/* Specialty */}
      <td className="py-4 px-6">
        <div className="flex justify-center flex-wrap gap-1">
          {Array.isArray(specializations) && specializations.length > 0 ? (
            specializations.map((specialty, index) => (
              <span
                key={index}
                className="bg-indigo-50 text-indigo-600 text-[9px] font-semibold px-3 py-1.5 rounded-lg uppercase tracking-widest"
              >
                {specialty}
              </span>
            ))
          ) : (
            <span className="text-[12px] text-slate-400">
              —
            </span>
          )}
          {typeof specializations === 'string' && specializations && (
            <span className="bg-indigo-50 text-indigo-600 text-[9px] font-semibold px-3 py-1.5 rounded-lg uppercase tracking-widest">
              {specializations}
            </span>
          )}
          {about && (
            <div className="basis-full max-w-xs mx-auto text-center text-[10px] text-slate-400 line-clamp-2" title={about}>
              {about}
            </div>
          )}
        </div>
      </td>

      {/* Action */}
      <td className="py-4 px-6 text-right">
        <button
          onClick={() => navigate(`/astrologers/${id}`)}
          className="p-2 rounded-full border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-indigo-500 transition-all"
        >
          <ChevronRight size={18} />
        </button>
      </td>
    </tr>
  );
};

const AstrologerManagement = () => {
  const navigate = useNavigate();
  const [astrologers, setAstrologers] = useState([]);
  const [astrologerCount, setAstrologerCount] = useState(0);
  const [astrologerLoading, setAstrologerLoading] = useState(true);
  const [astrologerError, setAstrologerError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const limit = 10;

  useEffect(() => {
    let isMounted = true;
    const fetchAstrologers = async () => {
      try {
        setAstrologerLoading(true);
        setAstrologerError('');
        const response = await getAllAstrologers(currentPage, limit, search);
        if (isMounted) {
          setAstrologers(response.astrologers || []);
          setAstrologerCount(response.totalAstrologers || 0);
          setTotalPages(response.totalPages || 1);
        }
      } catch (error) {
        console.error('Failed to fetch astrologers:', error);
        if (isMounted) {
          setAstrologers([]);
          setAstrologerCount(0);
          setTotalPages(1);
          setAstrologerError('Unable to load astrologers. Please try again later.');
        }
      } finally {
        if (isMounted) {
          setAstrologerLoading(false);
        }
      }
    };
    fetchAstrologers();
    return () => {
      isMounted = false;
    };
  }, [currentPage, limit, search]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* Page Header */}
      <div className="flex justify-between items-end">
        <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">Astrologer Management</h1>
      </div>

      {/* Top Stat Cards */}
      <div className="flex gap-6 overflow-x-auto pb-2 no-scrollbar">
        <StatCard
          icon={Users}
          label="Total Astrologers"
          value={astrologerLoading ? (<span className="inline-block w-16 h-6 bg-gray-200 rounded animate-pulse" />) : (astrologerCount)}
          colorClass="text-indigo-500"
          bgClass="bg-indigo-50"
        />
        <StatCard
          icon={Zap}
          label="Live Now"
          value="84"
          colorClass="text-amber-500"
          bgClass="bg-amber-50"
        />
        <StatCard
          icon={Clock}
          label="Pending Verification"
          value="12"
          colorClass="text-purple-500"
          bgClass="bg-purple-50"
        />
        <StatCard
          icon={ShieldAlert}
          label="Compliance Alerts"
          value="3"
          colorClass="text-rose-500"
          bgClass="bg-rose-50"
        />
      </div>

      {/* Filters and Actions */}
      <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="search" value={search} onChange={(event) => { setSearch(event.target.value); setCurrentPage(1); }}
              placeholder="Search name or mobile..." className="bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2.5 text-[13px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
          </div>

          {/* Specialtization */}
          <div className="relative">
            <select className="appearance-none bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 pr-10 text-[13px] font-semibold text-slate-700 min-w-[160px] cursor-pointer hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
              <option>Specialization</option>
              <option>Vedic</option>
              <option>Tarot</option>
              <option>Numerology</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
          </div>

          {/* Status */}
          <div className="relative">
            <select className="appearance-none bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 pr-10 text-[13px] font-semibold text-slate-700 min-w-[160px] cursor-pointer hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
              <option>Status</option>
              <option>Verified</option>
              <option>Pending</option>
              <option>Blocked</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
          </div>
        </div>

        {/* Add Astrologer */}
        <button
          onClick={() => navigate('/astrologers/add')}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-[13px] font-semibold flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
        >
          <Plus size={18} /> Add New Astrologer
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="py-5 px-6 text-[11px] font-semibold text-slate-500 uppercase tracking-widest">User Profile</th>
                <th className="py-5 px-6 text-[11px] font-semibold text-slate-500 uppercase tracking-widest text-center">Join Date</th>
                <th className="py-5 px-6 text-[11px] font-semibold text-slate-500 uppercase tracking-widest text-center">KYC Status</th>
                <th className="py-5 px-6 text-[11px] font-semibold text-slate-500 uppercase tracking-widest text-center">Chat Rate</th>
                <th className="py-5 px-6 text-[11px] font-semibold text-slate-500 uppercase tracking-widest text-center">Call Rate</th>
                <th className="py-5 px-6 text-[11px] font-semibold text-slate-500 uppercase tracking-widest text-center">Video Call Rate</th>
                <th className="py-5 px-6 text-[11px] font-semibold text-slate-500 uppercase tracking-widest text-center">Specialization</th>
                <th className="py-5 px-6 text-[11px] font-semibold text-slate-500 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {astrologerLoading ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400">
                    Loading astrologers...
                  </td>
                </tr>
              ) : astrologerError ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-rose-600">
                    {astrologerError}
                  </td>
                </tr>
              ) : astrologers.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400">
                    No astrologers found.
                  </td>
                </tr>
              ) : (
                astrologers.map((astro) => (
                  <AstrologerRow key={astro.id}{...astro} />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-6 border-t border-slate-50 flex justify-between items-center bg-white">
          <p className="text-[12px] text-slate-400 font-medium">
            Showing{' '}
            <span className="text-slate-900 font-semibold">
              {astrologers.length > 0 ? `${(currentPage - 1) * limit + 1} to ${Math.min(currentPage * limit, astrologerCount)}` : '0'}
            </span>{' '}
            of{' '}
            <span className="text-slate-900 font-semibold">
              {astrologerCount}
            </span>{' '}
            results
          </p>
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))} className="p-2 text-slate-400 hover:text-indigo-500 disabled:opacity-30" disabled={currentPage === 1 || astrologerLoading} aria-label="Previous page">
              <ChevronRight size={18} className="rotate-180" />
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button key={page} type="button" onClick={() => setCurrentPage(page)} disabled={page === currentPage || astrologerLoading} aria-label={`Page ${page}`} aria-current={page === currentPage ? 'page' : undefined}
                className={`w-8 h-8 rounded-lg text-[12px] font-semibold ${page === currentPage ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-400 hover:bg-slate-50'
                  }`} >
                {page}
              </button>
            ))}
            <button type="button" onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))} className="p-2 text-slate-400 hover:text-indigo-500 disabled:opacity-30" disabled={currentPage === totalPages || astrologerLoading} aria-label="Next page">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AstrologerManagement;
