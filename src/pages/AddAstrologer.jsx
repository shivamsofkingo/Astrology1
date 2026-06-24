import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, ArrowLeft, Camera, Edit2, Info, X, 
  UploadCloud, FileText, Check, FileBadge, CheckCircle, IndianRupee
} from 'lucide-react';

const AddAstrologer = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [rate, setRate] = useState('20.00');
  
  // Step navigation
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // Step Header component
  const StepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[13px] text-[#00BAF2] font-medium">Add New Astrologer</h3>
        <span className="text-[12px] text-slate-500 bg-slate-100 px-3 py-1 rounded-full font-medium">Step {step} of 3</span>
      </div>
      <div className="flex gap-2">
        {/* Progress Bars */}
        <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-[#00BAF2]' : 'bg-slate-100'}`}></div>
        <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-[#00BAF2]' : 'bg-slate-100'}`}></div>
        <div className={`h-1.5 flex-1 rounded-full ${step >= 3 ? 'bg-[#00BAF2]' : 'bg-slate-100'}`}></div>
      </div>
      <div className="flex mt-2 px-2">
        <div className={`flex-1 text-[11px] font-semibold text-center ${step >= 1 ? 'text-[#00BAF2]' : 'text-slate-400'}`}>Personal Info</div>
        <div className={`flex-1 text-[11px] font-semibold text-center ${step >= 2 ? 'text-[#00BAF2]' : 'text-slate-400'}`}>Professional</div>
        <div className={`flex-1 text-[11px] font-semibold text-center ${step >= 3 ? 'text-[#00BAF2]' : 'text-slate-400'}`}>Verification</div>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Add Astrologer</h1>
        <button 
          onClick={() => navigate('/astrologers')}
          className="bg-[#00BAF2] hover:bg-[#0099C7] text-white px-8 py-2 rounded-lg text-[14px] font-semibold transition-colors"
        >
          Back
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <StepIndicator />

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-3 text-slate-800">
              <div className="w-8 h-8 rounded-full bg-[#E5F8FD] flex items-center justify-center text-[#00BAF2]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <h2 className="text-xl font-bold">Personal Information</h2>
            </div>

            <div className="border border-dashed border-slate-200 bg-slate-50/50 rounded-xl p-8 flex flex-col items-center justify-center gap-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-[#E8E6FC] flex items-center justify-center text-indigo-400">
                  <Camera size={32} />
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#00BAF2] text-white flex items-center justify-center border-2 border-white shadow-sm hover:scale-105 transition-transform">
                  <Edit2 size={14} />
                </button>
              </div>
              <div className="text-center">
                <p className="text-[14px] font-bold text-slate-700">Upload Astrologer Profile Photo</p>
                <p className="text-[11px] text-slate-400 font-medium mt-1">JPG, PNG (MAX. 2MB)</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-slate-600">Full Name</label>
                <input type="text" placeholder="Enter full legal name" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-[14px] focus:ring-2 focus:ring-[#00BAF2]/20 focus:border-[#00BAF2] outline-none transition-all placeholder:text-slate-300" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-slate-600">Email Address</label>
                <input type="email" placeholder="email@softkingo.com" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-[14px] focus:ring-2 focus:ring-[#00BAF2]/20 focus:border-[#00BAF2] outline-none transition-all placeholder:text-slate-300" />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-slate-600">Contact Number</label>
                <div className="flex gap-2">
                  <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-[14px] font-medium text-slate-600 flex items-center w-20 justify-center">+91</div>
                  <input type="tel" placeholder="10-digit mobile number" className="flex-1 border border-slate-200 rounded-lg px-4 py-2.5 text-[14px] focus:ring-2 focus:ring-[#00BAF2]/20 focus:border-[#00BAF2] outline-none transition-all placeholder:text-slate-300" />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-slate-600">Gender Selection</label>
                <select className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-[14px] text-slate-600 focus:ring-2 focus:ring-[#00BAF2]/20 focus:border-[#00BAF2] outline-none transition-all appearance-none bg-white">
                  <option>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[12px] font-bold text-slate-600">Date of Birth</label>
                <div className="relative">
                  <input type="date" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-[14px] text-slate-600 focus:ring-2 focus:ring-[#00BAF2]/20 focus:border-[#00BAF2] outline-none transition-all" />
                </div>
              </div>
            </div>

            <div className="bg-[#F0FAFB] border border-[#D5F2F7] rounded-xl p-4 flex gap-3">
              <Info className="text-[#00BAF2] shrink-0 mt-0.5" size={20} />
              <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                This information is essential for profile identification, legal compliance, and accurate horoscope calculations. Birth details are kept private and only used to generate the natal charts for consultations.
              </p>
            </div>

            <div className="pt-6 flex justify-between items-center border-t border-slate-100">
              <button onClick={() => navigate('/astrologers')} className="text-[14px] font-bold text-slate-500 hover:text-slate-800 transition-colors">
                Cancel
              </button>
              <button onClick={nextStep} className="bg-[#00BAF2] hover:bg-[#0099C7] text-white px-6 py-2.5 rounded-lg text-[14px] font-semibold flex items-center gap-2 transition-colors">
                Next: Professional Details <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="animate-in slide-in-from-right-4 duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Expertise */}
                <div className="border border-slate-100 rounded-2xl p-6 shadow-sm">
                   <div className="flex items-center gap-2.5 text-slate-800 mb-6 border-b border-slate-50 pb-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00BAF2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
                    <h2 className="text-[16px] font-bold">Expertise & Experience</h2>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="space-y-1.5">
                      <label className="text-[12px] font-bold text-slate-600">Years of Experience</label>
                      <div className="relative">
                        <input type="text" placeholder="e.g. 5" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 pr-12 text-[14px] focus:ring-2 focus:ring-[#00BAF2]/20 focus:border-[#00BAF2] outline-none transition-all" />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[13px] text-slate-400 font-medium">years</span>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[12px] font-bold text-slate-600">Primary Specialty</label>
                      <select className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-[14px] text-slate-600 focus:ring-2 focus:ring-[#00BAF2]/20 focus:border-[#00BAF2] outline-none transition-all appearance-none bg-white">
                        <option>Select Specialty</option>
                        <option>Vedic Astrology</option>
                        <option>Tarot Reading</option>
                        <option>Numerology</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-slate-600">Languages Spoken</label>
                    <div className="border border-slate-200 rounded-lg p-2 flex flex-wrap gap-2 items-center min-h-[46px]">
                      <span className="bg-[#F0FAFB] text-[#00BAF2] px-3 py-1 rounded-full text-[13px] font-semibold flex items-center gap-1.5">
                        English <button><X size={14} /></button>
                      </span>
                      <span className="bg-[#F0FAFB] text-[#00BAF2] px-3 py-1 rounded-full text-[13px] font-semibold flex items-center gap-1.5">
                        Hindi <button><X size={14} /></button>
                      </span>
                      <input type="text" placeholder="Add more..." className="flex-1 outline-none text-[13px] bg-transparent min-w-[100px] ml-1" />
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium mt-1">Press Enter to add multiple languages</p>
                  </div>
                </div>

                {/* Professional Bio */}
                <div className="border border-slate-100 rounded-2xl p-6 shadow-sm">
                   <div className="flex items-center gap-2.5 text-slate-800 mb-6 border-b border-slate-50 pb-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00BAF2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    <h2 className="text-[16px] font-bold">Professional Bio</h2>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-slate-600">Short Bio / Description</label>
                    <textarea 
                      rows="4" 
                      placeholder="Describe your astrological journey, methodologies, and what clients can expect from a session with you..."
                      className="w-full border border-slate-200 rounded-lg p-4 text-[14px] focus:ring-2 focus:ring-[#00BAF2]/20 focus:border-[#00BAF2] outline-none transition-all resize-none placeholder:text-slate-400"
                    ></textarea>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-[11px] text-slate-400 font-medium">Be specific and descriptive to attract more clients.</p>
                      <p className="text-[11px] text-slate-400 font-medium">0/500 characters</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-2.5 text-slate-800 mb-6 border-b border-slate-100 pb-4">
                    <IndianRupee size={18} className="text-[#00BAF2]" />
                    <h2 className="text-[16px] font-bold">Consultation Rates</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-1.5">
                      <label className="text-[12px] font-bold text-slate-600">Rate per Minute (INR)</label>
                      <div className="relative">
                         <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[14px] font-medium text-slate-600">₹</span>
                         <input 
                            type="text" 
                            value={rate} 
                            onChange={(e) => setRate(e.target.value)}
                            className="w-full border border-slate-200 rounded-lg pl-8 pr-4 py-2.5 text-[14px] font-semibold text-slate-700 focus:ring-2 focus:ring-[#00BAF2]/20 focus:border-[#00BAF2] outline-none transition-all bg-white" 
                         />
                      </div>
                    </div>

                    <div className="bg-[#F0FAFB] rounded-xl p-5 border border-[#D5F2F7]">
                      <div className="flex justify-between items-center text-[13px] font-semibold text-slate-600 mb-3 border-b border-[#D5F2F7] pb-3">
                        <span>Platform Fee (15%)</span>
                        <span className="text-rose-500">-₹3.00</span>
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[12px] font-bold text-slate-800">Estimated</p>
                          <p className="text-[12px] font-bold text-slate-800">Earnings</p>
                        </div>
                        <p className="text-xl font-bold text-[#00BAF2]">₹17.00/min</p>
                      </div>
                      <p className="text-[10px] text-slate-500 font-medium mt-3 leading-relaxed">
                        This is the net amount you will receive per minute of consultation.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-100 shadow-sm rounded-xl p-5 flex gap-3">
                  <Info className="text-[#00BAF2] shrink-0" size={18} />
                  <div>
                    <h4 className="text-[13px] font-bold text-[#00BAF2] mb-1">Professional Profile Tips</h4>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                      Profiles with detailed bios and specific specialties receive 3.5x more session requests on average.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 flex justify-between items-center border-t border-slate-100">
              <button onClick={prevStep} className="px-6 py-2.5 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 text-[14px] font-semibold flex items-center gap-2 transition-colors">
                <ArrowLeft size={16} /> Previous
              </button>
              <div className="flex items-center gap-4">
                 <button className="text-[14px] font-bold text-slate-500 hover:text-slate-800 transition-colors">
                  Save as Draft
                </button>
                <button onClick={nextStep} className="bg-[#00BAF2] hover:bg-[#0099C7] text-white px-6 py-2.5 rounded-lg text-[14px] font-semibold flex items-center gap-2 transition-colors">
                  Next: Verification <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-[22px] font-bold text-slate-900 mb-2">Finalize Onboarding</h2>
              <p className="text-[13px] text-slate-500 font-medium max-w-2xl">
                To ensure the highest quality of service and trust on Softkingo, we require official documentation. These files are encrypted and used solely for verification purposes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Doc 1 */}
              <div className="border border-slate-200 rounded-2xl p-6 shadow-sm bg-white relative overflow-hidden group">
                <div className="absolute top-4 right-4 bg-[#E5F8FD] text-[#00BAF2] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                  Required
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#E5F8FD] flex items-center justify-center text-[#00BAF2] mb-4">
                  <FileBadge size={20} />
                </div>
                <h3 className="text-[15px] font-bold text-slate-900 mb-1">Government ID</h3>
                <p className="text-[12px] text-slate-500 font-medium mb-6">
                  Upload a clear scan or photo of your Aadhaar Card, Passport, or Driver's License.
                </p>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50/50 group-hover:bg-slate-50 group-hover:border-[#00BAF2]/50 transition-colors cursor-pointer">
                   <UploadCloud size={24} className="text-slate-400 mb-2" />
                   <p className="text-[13px] font-bold text-slate-700">Click to upload or drag & drop</p>
                   <p className="text-[11px] text-slate-400 font-medium">PDF, PNG, JPG up to 10MB</p>
                </div>
              </div>

              {/* Doc 2 */}
              <div className="border border-slate-200 rounded-2xl p-6 shadow-sm bg-white relative overflow-hidden group">
                 <div className="absolute top-4 right-4 bg-purple-50 text-purple-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                  Verified
                </div>
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500 mb-4">
                  <FileText size={20} />
                </div>
                <h3 className="text-[15px] font-bold text-slate-900 mb-1">Certifications</h3>
                <p className="text-[12px] text-slate-500 font-medium mb-6">
                  Upload certifications from recognized astrology institutions or Vedic schools.
                </p>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50/50 group-hover:bg-slate-50 group-hover:border-[#00BAF2]/50 transition-colors cursor-pointer">
                   <FileText size={24} className="text-slate-400 mb-2" />
                   <p className="text-[13px] font-bold text-slate-700">Click to upload credentials</p>
                   <p className="text-[11px] text-slate-400 font-medium">Supporting documents for skills</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-6 flex items-start gap-4">
              <div className="mt-1">
                <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-[#00BAF2] focus:ring-[#00BAF2] cursor-pointer" />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-slate-800 mb-1">Signed Terms & Conditions Agreement</h4>
                <p className="text-[12px] text-slate-500 font-medium leading-relaxed mb-2">
                  I confirm that all provided documents are authentic and I agree to Softkingo's Astrologer Code of Conduct and Privacy Policy. I understand that misrepresentation may lead to immediate account suspension.
                </p>
                <button className="text-[12px] font-bold text-[#00BAF2] flex items-center gap-1 hover:underline">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  Read full agreement
                </button>
              </div>
            </div>

            <div className="pt-6 flex justify-between items-center border-t border-slate-100">
              <button onClick={prevStep} className="px-6 py-2.5 rounded-lg border border-[#00BAF2] text-[#00BAF2] hover:bg-[#F0FAFB] text-[14px] font-semibold flex items-center gap-2 transition-colors">
                <ArrowLeft size={16} /> Previous Step
              </button>
              <button 
                onClick={() => navigate('/astrologers')} 
                className="bg-[#00BAF2] hover:bg-[#0099C7] text-white px-10 py-2.5 rounded-lg text-[14px] font-bold flex items-center gap-2 transition-colors shadow-lg shadow-[#00BAF2]/20"
              >
                Add Astrologer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddAstrologer;
