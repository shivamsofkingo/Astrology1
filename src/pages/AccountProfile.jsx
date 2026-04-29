import React from 'react';
import { Camera, RefreshCw, ShieldCheck, Info, Laptop, Settings, Clock, Globe, Moon, Sun, ChevronDown } from 'lucide-react';

const InputField = ({ label, value, type = "text", placeholder }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[11px] font-semibold text-[#00BAF2]">{label}</label>
    {type === "textarea" ? (
      <textarea 
        className="w-full bg-[#EAECEF] text-slate-700 text-[13px] px-4 py-3 rounded-lg border-none focus:ring-1 focus:ring-[#00BAF2] outline-none resize-none h-20"
        defaultValue={value}
        placeholder={placeholder}
      />
    ) : (
      <input 
        type={type}
        className="w-full bg-[#EAECEF] text-slate-700 text-[13px] px-4 py-2.5 rounded-lg border-none focus:ring-1 focus:ring-[#00BAF2] outline-none"
        defaultValue={value}
        placeholder={placeholder}
      />
    )}
  </div>
);

const SelectField = ({ label, icon: Icon, value, options }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[11px] font-semibold text-[#818CF8] flex items-center gap-1.5 mb-1">
      {Icon && <Icon size={12} />}
      {label}
    </label>
    <div className="relative">
      <select 
        className="w-full bg-[#EAECEF] text-slate-700 text-[13px] px-4 py-2.5 rounded-lg border-none focus:ring-1 focus:ring-[#818CF8] outline-none appearance-none cursor-pointer"
        defaultValue={value}
      >
        {options.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </select>
      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
    </div>
  </div>
);

const AccountProfile = () => {
  return (
    <div className="space-y-6 max-w-[1000px] mx-auto pb-10">
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Account Profile</h1>
        <p className="text-sm text-slate-500 font-normal">Manage your cosmic identity and contact details.</p>
      </div>

      {/* Main Profile Box */}
      <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 flex flex-col md:flex-row gap-10">
        
        {/* Left Side: Photo */}
        <div className="flex flex-col items-center gap-4 flex-shrink-0">
          <div className="bg-[#FFFCE8] text-[#D4AF37] text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 self-start md:self-center mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
            Live System Access
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
              alt="Profile" 
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
            />
            <button className="absolute bottom-0 right-0 bg-[#818CF8] text-white p-2 rounded-full hover:bg-[#6366F1] transition-colors border-2 border-white">
              <Camera size={14} />
            </button>
          </div>
          
          <p className="text-[10px] text-slate-400 font-medium">JPG, GIF or PNG. Max 1MB.</p>
        </div>

        {/* Right Side: Form */}
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <InputField label="Full Name" value="Aelius Starlight" />
          <InputField label="Email Address" value="aelius@modernoracle.com" type="email" />
          <InputField label="Phone Number" value="+1 (555) 0123-4567" />
          <InputField label="Professional Role" value="Celestial Data Architect" />
          <div className="md:col-span-2">
            <InputField 
              label="Personal Bio" 
              type="textarea" 
              value="Bridging the gap between the third dimension and the higher realms through precision data engineering. Expert in Mercury Retrograde risk mitigation." 
            />
          </div>
        </div>
      </div>

      {/* Two Columns: Security & 2FA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Security Credentials */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-6">
            <RefreshCw size={18} className="text-[#818CF8]" />
            <h3 className="text-lg font-semibold text-slate-900">Security Credentials</h3>
          </div>
          <div className="space-y-4">
            <InputField label="Current Password" type="password" value="••••••••••••" />
            <InputField label="New Password" type="password" placeholder="Enter new password" />
            <InputField label="Confirm New Password" type="password" placeholder="Confirm new password" />
          </div>
        </div>

        {/* Multi-Factor Auth */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck size={18} className="text-[#818CF8]" />
            <h3 className="text-lg font-semibold text-slate-900">Multi-Factor Auth</h3>
          </div>
          
          <div className="bg-[#F8F8FF] p-5 rounded-lg border border-[#EEF2FF] flex items-center justify-between mb-4">
            <div>
              <h4 className="text-[13px] font-semibold text-[#818CF8]">Two-Factor Authentication</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Protect your account with an extra layer of security.</p>
            </div>
            {/* Custom Toggle */}
            <div className="w-10 h-5 bg-[#D8B4E2] rounded-full relative cursor-pointer opacity-80">
               <div className="absolute right-1 top-1 w-3 h-3 bg-[#1E007B] rounded-full"></div>
            </div>
          </div>
          
          <p className="text-[11px] text-slate-500 flex items-center gap-1.5 mb-6">
            <Info size={14} className="text-[#D4AF37]" />
            2FA is currently <span className="text-[#D4AF37] font-semibold">Enabled</span> via Google Authenticator.
          </p>

          <div className="bg-[#F1F5F9] p-4 rounded-lg flex items-center justify-between mt-auto">
            <div className="flex items-center gap-3">
              <Laptop size={18} className="text-slate-400" />
              <div>
                <p className="text-[10px] font-bold text-[#A5B4FC] uppercase tracking-wider">Last login</p>
                <p className="text-[11px] font-semibold text-slate-400 mt-0.5">MacBook Pro, London UK</p>
              </div>
            </div>
            <span className="bg-[#E0E7FF] text-[#818CF8] text-[9px] font-bold px-3 py-1 rounded-md uppercase tracking-wider">Current</span>
          </div>
        </div>
      </div>

      {/* System Preferences */}
      <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-6">
          <Settings size={18} className="text-[#818CF8]" />
          <h3 className="text-lg font-semibold text-slate-900">System Preferences</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div>
            <SelectField 
              icon={Clock} 
              label="Celestial Timezone" 
              value="(UTC+00:00) London / GMT" 
              options={['(UTC+00:00) London / GMT', '(UTC-05:00) Eastern Time (US)', '(UTC+05:30) India Standard Time']} 
            />
            <p className="text-[9px] text-slate-400 mt-2">Critical for accurate transit alignment.</p>
          </div>
          
          <SelectField 
            icon={Globe} 
            label="Interface Language" 
            value="English (Universal)" 
            options={['English (Universal)', 'Spanish', 'French']} 
          />
          
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-[#818CF8] flex items-center gap-1.5 mb-1">
              <Moon size={12} />
              Interface Theme
            </label>
            <div className="flex bg-[#EAECEF] rounded-lg p-1">
              <button className="flex-1 flex items-center justify-center gap-2 bg-[#E0E7FF] text-[#4F46E5] text-[12px] font-bold py-2 rounded-md shadow-sm">
                <Moon size={14} /> Dark
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 text-slate-500 text-[12px] font-medium py-2 rounded-md hover:bg-slate-200 transition-colors">
                <Sun size={14} /> Light
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end items-center gap-4 pt-4">
        <button className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 text-[13px] font-semibold rounded-lg hover:bg-slate-50 transition-colors">
          Cancel
        </button>
        <button className="px-6 py-2.5 bg-[#00BAF2] text-white text-[13px] font-semibold rounded-lg hover:bg-[#00A0D2] transition-colors shadow-sm shadow-[#00BAF2]/30">
          Save Changes
        </button>
      </div>

    </div>
  );
};

export default AccountProfile;
