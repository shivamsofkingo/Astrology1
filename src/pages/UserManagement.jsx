import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown, Filter, Edit2, Ban, Trash2, Shield } from 'lucide-react';
import { getAllUsers } from "../api/userApi";

const UserRow = ({ id, name, email, mobile, gender, avatar, date, kyc, wallet, status }) => {
  const navigate = useNavigate();

  const getKycStyle = (status) => {
    switch (status) {
      case 'VERIFIED': return 'text-[#10B981] border-[#10B981] bg-[#ECFDF5]';
      case 'PENDING': return 'text-[#F59E0B] border-[#F59E0B] bg-[#FFFBEB]';
      case 'NOT STARTED': return 'text-[#64748B] border-[#94A3B8] bg-[#F8FAFC]';
      default: return 'text-slate-500 border-slate-200 bg-white';
    }
  };

  const getKycDot = (status) => {
    switch (status) {
      case 'VERIFIED': return 'bg-[#10B981]';
      case 'PENDING': return 'bg-[#F59E0B]';
      case 'NOT STARTED': return 'bg-[#94A3B8]';
      default: return 'bg-slate-400';
    }
  };

  return (
    <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
      <td className="py-3 px-6">
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate(`/users/${id}`)}
        >
          <img src={avatar} alt={name} className="w-9 h-9 rounded-full object-cover border border-slate-200 group-hover:border-[#00BAF2] transition-colors" />
          <div>
            <h4 className="text-[13px] font-semibold text-slate-900 group-hover:text-[#00BAF2] transition-colors">{name}</h4>
            <p className="text-[11px] text-slate-400">{email}</p>
          </div>
        </div>
      </td>

      {/* Mobile */}
      <td className="py-3 px-6 text-[12px] text-slate-600 font-medium whitespace-nowrap">
        {mobile || "—"}
      </td>

      {/* Gender */}
      <td className="py-3 px-6 text-[12px] text-slate-600 font-medium">
        {gender ? gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase() : "—"}
      </td>

      {/* Join Date */}
      <td className="py-3 px-6 text-[12px] text-slate-600 font-medium whitespace-nowrap">
        {date}
      </td>

      {/* KYC */}
      <td className="py-3 px-6">
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px] font-semibold tracking-wider ${getKycStyle(
            kyc
          )}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${getKycDot(kyc)}`}
          ></span>
          {kyc}
        </div>
      </td>

      {/* Wallet */}
      <td className="py-3 px-6 text-[13px] font-semibold text-[#D4AF37]">
        {wallet}
      </td>

      {/* Status */}
      <td className="py-3 px-6">
        <div className="flex items-center gap-1.5">
          <span
            className={`w-1.5 h-1.5 rounded-full ${status === "Active"
              ? "bg-[#818CF8]"
              : "bg-slate-700"
              }`}
          ></span>

          <span
            className={`text-[12px] font-medium ${status === "Active"
              ? "text-[#818CF8]"
              : "text-slate-700"
              }`}
          >
            {status}
          </span>
        </div>
      </td>

      {/* Actions */}
      <td className="py-3 px-6">
        <div className="flex items-center gap-4 text-slate-300">
          <button className="hover:text-slate-500 transition-colors">
            <Edit2 size={14} />
          </button>
          <button
            className={`hover:text-slate-500 transition-colors ${status === "Blocked" ? "text-[#818CF8]" : ""
              }`}
          >
            {status === "Blocked" ? (
              <Shield size={14} />
            ) : (
              <Ban size={14} />
            )}
          </button>
          <button className="hover:text-rose-500 transition-colors">
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // search and role filters
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Show 10 users per page
  const limit = 10;

  /* =======================================================
     Fetch Users
  ======================================================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 700);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await getAllUsers(
          currentPage,
          limit,
          debouncedSearch,
          role
        );
        setUsers(response.users || []);
        setTotalUsers(response.totalUsers || 0);
        setTotalPages(response.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [currentPage, debouncedSearch, role]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  /* =======================================================
     Convert API users into table users

     Only some fields come from backend.

     The following are STATIC for now:
       - avatar
       - kyc
       - wallet
       - status

     Later these can come from your database.
  ======================================================= */

  const tableUsers = users.map((user, index) => {
    const userName =
      user.name ||
      user.fullName ||
      user.username ||
      "Unknown User";
    const userEmail =
      user.email || "No email";
    const userMobile =
      user.mobileNumber ||
      user.mobile ||
      user.phone ||
      user.phoneNumber ||
      "—";
    const userGender =
      user.gender || "—";
    let joinDate = "—";

    if (user.createdAt) {
      joinDate = new Date(
        user.createdAt
      ).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
    }

    return {
      id: user.id,
      name: userName,
      email: userEmail,
      mobile: userMobile,
      gender: userGender,
      date: joinDate,
      /*
        Static data for now
      */
      avatar:
        user.profileImage ||
        user.avatar ||
        "https://ui-avatars.com/api/?name=" +
        encodeURIComponent(userName),
      kyc:
        index % 3 === 0
          ? "VERIFIED"
          : index % 3 === 1
            ? "PENDING"
            : "NOT STARTED",

      wallet: "$0.00",
      status:
        index % 4 === 0
          ? "Blocked"
          : "Active",
    };
  });

  /* =======================================================
     Pagination
  ======================================================= */

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  /*
    Create page numbers.

    Example:

    1 2 3 4 5

    If there are many pages, we can later improve this
    to:

    1 2 3 ... 20
  */

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  /* =======================================================
     Showing text
  ======================================================= */

  const showingFrom =
    totalUsers === 0
      ? 0
      : (currentPage - 1) * limit + 1;

  const showingTo =
    Math.min(
      currentPage * limit,
      totalUsers
    );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
        User Management
      </h1>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 flex items-center gap-4">

        {/* Search */}
        <div className="relative flex-grow">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Filter by name, email or mobile..."
            className="w-full pl-10 pr-4 py-2.5 bg-transparent border border-slate-200 rounded-lg text-[13px] text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#00BAF2] focus:border-[#00BAF2]"
          />
        </div>

        {/* KYC */}
        <div className="relative min-w-[160px]">
          <select className="w-full px-4 py-2.5 bg-transparent border border-slate-200 rounded-lg text-[13px] text-slate-700 font-medium appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#00BAF2] focus:border-[#00BAF2]">
            <option>All KYC Status</option>
            <option>Verified</option>
            <option>Pending</option>
            <option>Not Started</option>
          </select>
          <ChevronDown
            size={14}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
          />
        </div>

        {/* Roles */}
        <div className="relative min-w-[140px]">
          <select
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-2.5 bg-transparent border border-slate-200 rounded-lg text-[13px] text-slate-700 font-medium appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#00BAF2] focus:border-[#00BAF2]"
          >
            <option value="">
              All roles
            </option>
            <option value="Seeker">
              Seeker
            </option>
            <option value="Admin">
              Admin
            </option>
          </select>
          <ChevronDown
            size={14}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
          />
        </div>

        {/* Filter Button */}
        <button className="p-2.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
          <Filter size={18} />
        </button>
        <button
          onClick={() => {
            setSearch("");
            setRole("");
            setCurrentPage(1);
          }}
          className="px-4 py-2.5 border border-slate-200 rounded-lg text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          Clear
        </button>
      </div>

      {/* ===================================================
          Data Table
      =================================================== */}

      <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* Table Header */}
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-slate-100">
                <th className="py-4 px-6 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                  User Profile
                </th>
                <th className="py-4 px-6 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                  Mobile Number
                </th>
                <th className="py-4 px-6 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                  Gender
                </th>
                <th className="py-4 px-6 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                  Join Date
                </th>
                <th className="py-4 px-6 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                  KYC Status
                </th>
                <th className="py-4 px-6 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                  Wallet Balance
                </th>
                <th className="py-4 px-6 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                  Status
                </th>
                <th className="py-4 px-6 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                  Actions
                </th>
              </tr>
            </thead>

            {/* =================================================
                Table Body
            ================================================= */}

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="8"
                    className="py-12 text-center text-sm text-slate-400"
                  >
                    Loading users...
                  </td>
                </tr>
              ) : tableUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="py-12 text-center text-sm text-slate-400"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                tableUsers.map((user) => (
                  <UserRow
                    key={user.id}
                    {...user}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* =================================================
            Pagination Footer
        ================================================= */}

        <div className="py-4 px-6 border-t border-slate-100 flex items-center justify-between">

          {/* Showing */}
          <p className="text-[11px] text-slate-400 font-medium">
            Showing{" "}
            <span className="text-slate-600">{showingFrom}</span>
            {" "}
            to{" "}
            <span className="text-slate-600">{showingTo}</span>
            {" "}
            of{" "}
            <span className="text-slate-600">{totalUsers}</span>
            {" "}
            users
          </p>

          {/* Pagination */}
          <div className="flex items-center gap-1">
            {/* Previous */}
            <button onClick={handlePreviousPage} disabled={currentPage === 1 || loading} className={`w-7 h-7 flex items-center justify-center rounded border text-[12px] font-medium transition-colors ${currentPage === 1 || loading ? "border-slate-100 text-slate-300 cursor-not-allowed" : "border-slate-100 text-slate-500 hover:bg-slate-50"
              }`}>
              &lt;
            </button>

            {/* Page Numbers */}
            {pageNumbers.map((page) => (
              <button key={page} onClick={() => handlePageChange(page)} disabled={loading} className={`w-7 h-7 flex items-center justify-center rounded text-[12px] font-medium transition-colors ${currentPage === page ? "bg-[#E0E7FF] text-[#4F46E5] font-semibold" : "border border-slate-100 text-slate-500 hover:bg-slate-50"}`}>
                {page}
              </button>
            ))}

            {/* Next */}
            <button onClick={handleNextPage} disabled={currentPage === totalPages || loading} className={`w-7 h-7 flex items-center justify-center rounded border text-[12px] font-medium transition-colors ${currentPage === totalPages || loading ? "border-slate-100 text-slate-300 cursor-not-allowed" : "border-slate-100 text-slate-500 hover:bg-slate-50"}`}>
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;