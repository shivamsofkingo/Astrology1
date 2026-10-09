import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, ArrowLeft, Camera, Edit2, Info, X, ChevronDown, Check,
  UploadCloud, FileText, FileBadge, IndianRupee
} from 'lucide-react';
import { createAstrologer } from "../api/astrologerApi";

const MultiSelectDropdown = ({ id, label, options, selected, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  const toggleOption = (option) => {
    onChange(
      selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected, option]
    );
  };

  return (
    <div ref={dropdownRef} className="relative space-y-1.5">
      <label id={`${id}-label`} className="text-[12px] font-bold text-slate-600">
        {label}
      </label>
      <div className={`min-h-[46px] w-full rounded-lg border bg-white p-2 flex flex-wrap items-center gap-1.5 transition-colors ${isOpen ? 'border-[#00BAF2] ring-2 ring-[#00BAF2]/10' : 'border-slate-200'
        }`}>
        {selected.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => toggleOption(item)}
            aria-label={`Remove ${item}`}
            className="inline-flex items-center gap-1 rounded-full bg-[#F0FAFB] px-2.5 py-1 text-[12px] font-medium text-[#00BAF2] hover:bg-[#DDF5FA]"
          >
            {item}
            <X size={13} />
          </button>
        ))}
        <button
          id={id}
          type="button"
          aria-labelledby={`${id}-label`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setIsOpen(false);
          }}
          className="flex min-w-[140px] flex-1 items-center justify-between gap-2 px-2 py-1 text-left text-[13px] text-slate-500 outline-none"
        >
          {selected.length === 0 && <span>{placeholder}</span>}
          <ChevronDown
            size={16}
            className={`ml-auto shrink-0 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {isOpen && (
        <div
          role="listbox"
          aria-labelledby={`${id}-label`}
          aria-multiselectable="true"
          className="absolute left-0 right-0 top-full z-30 mt-1 max-h-56 overflow-y-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg"
        >
          {options.map((option) => {
            const isSelected = selected.includes(option);
            return (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => toggleOption(option)}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-[13px] transition-colors ${isSelected ? 'bg-[#F0FAFB] text-[#008FB8]' : 'text-slate-600 hover:bg-slate-50'
                  }`}
              >
                {option}
                {isSelected && <Check size={15} className="text-[#00BAF2]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const StepIndicator = ({ step }) => (
  <div className="mb-8">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-[13px] text-[#00BAF2] font-medium">Add New Astrologer</h3>
      <span className="text-[12px] text-slate-500 bg-slate-100 px-3 py-1 rounded-full font-medium">Step {step} of 3</span>
    </div>
    <div className="flex gap-2">
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

const AddAstrologer = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [chatRate, setChatRate] = useState('20.00');
  const [callRate, setCallRate] = useState('20.00');
  const [videoCallRate, setVideoCallRate] = useState('20.00');
  const [platformFees, setPlatformFees] = useState({
    chat: '15',
    call: '15',
    videoCall: '15',
  });
  const [specializations, setSpecializations] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [bio, setBio] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    gender: "",
    age: "",
    experience: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [idProof, setIdProof] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const profileInputRef = useRef(null);
  const idProofInputRef = useRef(null);
  const certificateInputRef = useRef(null);

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({
      ...prev,
      [field]: "",
      submit: "",
    }));
  };

  const specializationOptions = [
    'Vedic Astrology',
    'Tarot Reading',
    'Numerology',
    'Vastu Shastra',
    'Other',
  ];
  const languageOptions = [
    'English',
    'Hindi',
    'Gujarati',
    'Marathi',
    'Tamil',
    'Telugu',
    'Bengali',
    'Other',
  ];

  const calculateEarnings = (rate, feePercentage) => {
    const numericRate = Number.parseFloat(rate);
    const numericFee = Number.parseFloat(feePercentage);
    const validRate = Number.isFinite(numericRate) ? numericRate : 0;
    const validFee = Number.isFinite(numericFee) ? numericFee : 0;
    const fee = validRate * (validFee / 100);

    return {
      fee: fee.toFixed(2),
      earnings: (validRate - fee).toFixed(2),
    };
  };

  const updatePlatformFee = (type, value) => {
    setPlatformFees((fees) => ({ ...fees, [type]: value }));
  };

  const consultationRates = [
    { key: 'chat', label: 'Chat *', rate: chatRate, setRate: setChatRate },
    { key: 'call', label: 'Voice Call *', rate: callRate, setRate: setCallRate },
    { key: 'videoCall', label: 'Video Call *', rate: videoCallRate, setRate: setVideoCallRate },
  ];

  // Step navigation
  // const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    if (submitting || !validateStep3()) return;

    setSubmitting(true);

    try {
      const payload = new FormData();

      payload.append("fullName", form.fullName.trim());
      payload.append("email", form.email.trim().toLowerCase());
      payload.append(
        "mobileNumber",
        `+91${form.mobileNumber.replace(/\D/g, "")}`
      );
      payload.append("gender", form.gender);
      payload.append("age", String(Number(form.age)));
      payload.append("experience", String(Number(form.experience)));
      payload.append("about", bio.trim());
      payload.append("specializations", JSON.stringify(specializations));
      payload.append("languages", JSON.stringify(languages));
      payload.append("chatRate", String(Number(chatRate)));
      payload.append("callRate", String(Number(callRate)));
      payload.append("videoCallRate", String(Number(videoCallRate)));
      payload.append("profileImage", profileImage);
      payload.append("certificate", certificate);
      payload.append("idProof", idProof);

      await createAstrologer(payload);
      navigate("/astrologers");
    } catch (error) {
      const responseData = error.response?.data;

      if (responseData?.errors) {
        setErrors((prev) => ({
          ...prev,
          ...responseData.errors,
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          submit:
            responseData?.message ||
            "Failed to create astrologer. Please try again.",
        }));
      }
    } finally {
      setSubmitting(false);
    }

  };

  const validateStep1 = () => {
    const nextErrors = {};
    const mobile = form.mobileNumber.replace(/\D/g, "");
    const age = Number(form.age);

    if (form.age.trim() === "") {
      nextErrors.age = "Age is required";
    } else if (
      !Number.isInteger(age) ||
      age < 18 ||
      age > 100
    ) {
      nextErrors.age = "Age must be a whole number between 18 and 100";
    }

    if (!form.fullName.trim()) {
      nextErrors.fullName = "Full name is required";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address";
    }

    if (!/^\d{10}$/.test(mobile)) {
      nextErrors.mobileNumber = "Enter a valid 10-digit mobile number";
    }

    if (!form.gender) {
      nextErrors.gender = "Please select a gender";
    }

    if (!profileImage) {
      nextErrors.profileImage = "Profile photo is required";
    } else if (profileImage.size > 2 * 1024 * 1024) {
      nextErrors.profileImage = "Profile photo must be 2MB or smaller";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateStep2 = () => {
    const nextErrors = {};

    if (
      form.experience === "" ||
      !Number.isFinite(Number(form.experience)) ||
      Number(form.experience) < 0
    ) {
      nextErrors.experience = "Enter valid years of experience";
    }

    if (!specializations.length) {
      nextErrors.specializations = "Select at least one specialization";
    }

    if (!languages.length) {
      nextErrors.languages = "Select at least one language";
    }

    if (!bio.trim()) {
      nextErrors.bio = "Professional bio is required";
    } else if (bio.trim().length > 500) {
      nextErrors.bio = "Bio cannot exceed 500 characters";
    }

    for (const [field, value] of [
      ["chatRate", chatRate],
      ["callRate", callRate],
      ["videoCallRate", videoCallRate],
    ]) {
      if (value.trim() === "" || !Number.isFinite(Number(value)) ||
        Number(value) <= 0) {
        nextErrors[field] = "Enter a rate greater than zero";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateStep3 = () => {
    const nextErrors = {};

    if (!idProof) {
      nextErrors.idProof = "Government ID is required";
    }

    if (!certificate) {
      nextErrors.certificate = "Certificate is required";
    }

    if (!termsAccepted) {
      nextErrors.termsAccepted = "Please accept the terms and conditions";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const nextStep = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;

    setStep((prev) => Math.min(prev + 1, 3));
  };

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
        <StepIndicator step={step} />

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
              <input
                ref={profileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  if (file.size > 2 * 1024 * 1024) {
                    setErrors((prev) => ({
                      ...prev,
                      profileImage: "Profile photo must be 2MB or smaller",
                    }));
                    event.target.value = "";
                    return;
                  }
                  setProfileImage(file);
                  setErrors((prev) => ({ ...prev, profileImage: "" }));
                }}
              />

              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-[#E8E6FC] flex items-center justify-center text-indigo-400 overflow-hidden">
                  {profileImage ? (
                    <img
                      src={URL.createObjectURL(profileImage)}
                      alt="Selected profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera size={32} />
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => profileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#00BAF2] text-white flex items-center justify-center border-2 border-white shadow-sm"
                >
                  <Edit2 size={14} />
                </button>
              </div>

              <div className="text-center">
                <p className="text-[14px] font-bold text-slate-700">
                  {profileImage ? profileImage.name : "Upload Astrologer Profile Photo"}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  JPG, PNG, WEBP (MAX. 2MB)
                </p>
                {errors.profileImage && (
                  <p className="text-sm text-red-500 mt-2">{errors.profileImage}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-slate-600">Full Name *</label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => updateForm("fullName", e.target.value)}
                  placeholder="Enter full name"
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-[14px] focus:ring-2 focus:ring-[#00BAF2]/20 focus:border-[#00BAF2] outline-none"
                />
                {errors.fullName && (
                  <p className="text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-slate-600">Email Address *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                  placeholder="email@example.com"
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-[14px] focus:ring-2 focus:ring-[#00BAF2]/20 focus:border-[#00BAF2] outline-none"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-slate-600">
                  Contact Number *
                </label>

                {/* Input row */}
                <div className="flex items-start gap-2">
                  <span className="border border-slate-200 rounded-lg px-3 py-2.5 text-[14px] text-slate-600 bg-slate-50">
                    +91
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={form.mobileNumber}
                    onChange={(e) =>
                      updateForm(
                        "mobileNumber",
                        e.target.value.replace(/\D/g, "").slice(0, 10)
                      )
                    }
                    placeholder="10-digit mobile number"
                    className="w-full min-w-0 border border-slate-200 rounded-lg px-4 py-2.5 text-[14px] focus:ring-2 focus:ring-[#00BAF2]/20 focus:border-[#00BAF2] outline-none"
                  />
                </div>

                {/* Error below the entire input row */}
                {errors.mobileNumber && (
                  <p className="text-sm text-red-500">
                    {errors.mobileNumber}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-slate-600">Gender *</label>
                <select
                  value={form.gender}
                  onChange={(e) => updateForm("gender", e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-[14px] text-slate-600 bg-white"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-sm text-red-500">{errors.gender}</p>
                )}
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[12px] font-bold text-slate-600">
                  Age *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="18"
                    max="100"
                    step="1"
                    placeholder="Enter age"
                    value={form.age}
                    onChange={(e) => updateForm("age", e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-[14px] text-slate-600"
                  />
                  {errors.age && (
                    <p className="text-sm text-red-500">{errors.age}</p>
                  )}
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
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00BAF2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
                    <h2 className="text-[16px] font-bold">Expertise & Experience</h2>
                  </div>

                  <div className="grid grid-cols-1 gap-6 mb-6">
                    <div className="space-y-1.5">
                      <label className="text-[12px] font-bold text-slate-600">Years of Experience *</label>
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={form.experience}
                          onChange={(e) => updateForm("experience", e.target.value)}
                          placeholder="e.g. 5"
                          className="w-full border border-slate-200 rounded-lg px-4 py-2.5 pr-12 text-[14px] focus:ring-2 focus:ring-[#00BAF2]/20 focus:border-[#00BAF2] outline-none"
                        />
                        {errors.experience && (
                          <p className="text-sm text-red-500">{errors.experience}</p>
                        )}
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[13px] text-slate-400 font-medium">years</span>
                      </div>
                    </div>
                    <MultiSelectDropdown
                      id="astrologer-specialization"
                      label="Specializations *"
                      options={specializationOptions}
                      selected={specializations}
                      onChange={setSpecializations}
                      placeholder="Select specializations..."
                    />
                    {errors.specializations && (
                      <p className="text-sm text-red-500">{errors.specializations}</p>
                    )}
                  </div>

                  <MultiSelectDropdown
                    id="astrologer-language"
                    label="Languages Spoken *"
                    options={languageOptions}
                    selected={languages}
                    onChange={setLanguages}
                    placeholder="Select languages..."
                  />
                  {errors.languages && (
                    <p className="text-sm text-red-500">{errors.languages}</p>
                  )}
                </div>

                {/* Professional Bio */}
                <div className="border border-slate-100 rounded-2xl p-7 shadow-sm">
                  <div className="flex items-center gap-2.5 text-slate-800 mb-6 border-b border-slate-50 pb-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00BAF2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                    <h2 className="text-[16px] font-bold">Professional Bio</h2>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-slate-600">Short Bio / Description *</label>
                    <textarea
                      rows="4"
                      value={bio}
                      maxLength={500}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Describe your astrological journey, methodologies, and what clients can expect from a session with you..."
                      className="w-full border border-slate-200 rounded-lg p-4 text-[14px] focus:ring-2 focus:ring-[#00BAF2]/20 focus:border-[#00BAF2] outline-none transition-all resize-none placeholder:text-slate-400"
                    ></textarea>
                    {errors.bio && (
                      <p className="text-sm text-red-500">{errors.bio}</p>
                    )}
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-[11px] text-slate-400 font-medium">Be specific and descriptive to attract more clients.</p>
                      <p className="text-[11px] text-slate-400 font-medium">{bio.length}/500 characters</p>
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

                  <div className="space-y-4">
                    {consultationRates.map(({ key, label, rate, setRate }) => {
                      const { fee, earnings } = calculateEarnings(
                        rate,
                        platformFees[key]
                      );

                      const rateErrorKey =
                        key === "chat"
                          ? "chatRate"
                          : key === "call"
                            ? "callRate"
                            : "videoCallRate";
                      return (
                        <div
                          key={key}
                          className="rounded-xl border border-slate-200 bg-white p-4 space-y-3"
                        >
                          <h3 className="text-[13px] font-bold text-slate-800">
                            {label}
                          </h3>
                          <div className="grid grid-cols-2 gap-3">
                            {/* Rate per minute */}
                            <div className="space-y-1.5">
                              <label
                                htmlFor={`${key}-rate`}
                                className="text-[11px] font-semibold text-slate-500"
                              >
                                Rate per minute
                              </label>

                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-slate-500">
                                  ₹
                                </span>
                                <input
                                  id={`${key}-rate`}
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  value={rate}
                                  onChange={(event) => setRate(event.target.value)}
                                  className="w-full rounded-lg border border-slate-200 py-2 pl-7 pr-3 text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00BAF2] focus:ring-2 focus:ring-[#00BAF2]/20"
                                />
                              </div>
                              {errors[rateErrorKey] && (
                                <p className="text-xs text-red-500 whitespace-nowrap">
                                  {errors[rateErrorKey]}
                                </p>
                              )}
                            </div>

                            {/* Platform fee */}
                            <div className="space-y-1.5">
                              <label
                                htmlFor={`${key}-fee`}
                                className="text-[11px] font-semibold text-slate-500"
                              >
                                Platform fee
                              </label>
                              <div className="relative">
                                <input
                                  id={`${key}-fee`}
                                  type="number"
                                  min="0"
                                  max="100"
                                  step="0.1"
                                  value={platformFees[key]}
                                  onChange={(event) =>
                                    updatePlatformFee(key, event.target.value)
                                  }
                                  className="w-full rounded-lg border border-slate-200 py-2 pl-3 pr-8 text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00BAF2] focus:ring-2 focus:ring-[#00BAF2]/20"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] text-slate-400">
                                  %
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Earnings summary */}
                          <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-3 text-[11px]">
                            <p className="text-slate-500">
                              Platform fee:{" "}
                              <span className="font-semibold text-rose-500">
                                ₹{fee}
                              </span>
                            </p>
                            <p className="font-semibold text-slate-700">
                              Net earnings:{" "}
                              <span className="text-[#00BAF2]">
                                ₹{earnings}/min
                              </span>
                            </p>
                          </div>
                        </div>
                      );
                    })}
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
                <h3 className="text-[15px] font-bold text-slate-900 mb-1">Government ID *</h3>
                <input
                  ref={idProofInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    if (file.size > 10 * 1024 * 1024) {
                      setErrors((prev) => ({
                        ...prev,
                        idProof: "Government ID must be 10MB or smaller",
                      }));
                      e.target.value = "";
                      return;
                    }

                    setIdProof(file);
                    setErrors((prev) => ({ ...prev, idProof: "" }));
                  }}
                />

                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => idProofInputRef.current?.click()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      idProofInputRef.current?.click();
                    }
                  }}
                  className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50/50 cursor-pointer hover:border-[#00BAF2]/50"
                >
                  <UploadCloud size={24} className="text-slate-400 mb-2" />
                  <p className="text-[13px] font-bold text-slate-700">
                    {idProof ? idProof.name : "Click to upload Government ID"}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    PDF, PNG, JPG, WEBP up to 10MB
                  </p>
                </div>

                {errors.idProof && (
                  <p className="text-sm text-red-500 mt-2">{errors.idProof}</p>
                )}
              </div>

              {/* Doc 2 */}
              <div className="border border-slate-200 rounded-2xl p-6 shadow-sm bg-white relative overflow-hidden group">
                <div className="absolute top-4 right-4 bg-purple-50 text-purple-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                  Verified
                </div>
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500 mb-4">
                  <FileText size={20} />
                </div>
                <h3 className="text-[15px] font-bold text-slate-900 mb-1">Certifications *</h3>
                <input
                  ref={certificateInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    if (file.size > 10 * 1024 * 1024) {
                      setErrors((prev) => ({
                        ...prev,
                        certificate: "Certificate must be 10MB or smaller",
                      }));
                      e.target.value = "";
                      return;
                    }

                    setCertificate(file);
                    setErrors((prev) => ({ ...prev, certificate: "" }));
                  }}
                />
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => certificateInputRef.current?.click()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      certificateInputRef.current?.click();
                    }
                  }}
                  className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50/50 cursor-pointer hover:border-[#00BAF2]/50"
                >
                  <FileText size={24} className="text-slate-400 mb-2" />
                  <p className="text-[13px] font-bold text-slate-700">
                    {certificate ? certificate.name : "Click to upload certificate"}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    PDF, PNG, JPG, WEBP up to 10MB
                  </p>
                </div>
                {errors.certificate && (
                  <p className="text-sm text-red-500 mt-2">{errors.certificate}</p>
                )}
              </div>
            </div>

            <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-6">
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <div className="mt-1 shrink-0">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => {
                      setTermsAccepted(e.target.checked);
                      setErrors((prev) => ({
                        ...prev,
                        termsAccepted: "",
                      }));
                    }}
                    className="w-5 h-5 rounded border-slate-300 text-[#00BAF2] focus:ring-[#00BAF2] cursor-pointer"
                  />
                </div>

                {/* Agreement content */}
                <div className="min-w-0 flex-1">
                  <h4 className="text-[14px] font-bold text-slate-800 mb-1">
                    Signed Terms & Conditions Agreement *
                  </h4>
                  <p className="text-[12px] text-slate-500 font-medium leading-relaxed mb-2">
                    I confirm that all provided documents are authentic and I agree
                    to Softkingo's Astrologer Code of Conduct and Privacy Policy.
                    I understand that misrepresentation may lead to immediate
                    account suspension.
                  </p>
                  <button
                    type="button"
                    className="text-[12px] font-bold text-[#00BAF2] flex items-center gap-1 hover:underline"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    Read full agreement
                  </button>
                </div>
              </div>

              {/* Validation error below the entire agreement */}
              {errors.termsAccepted && (
                <p className="text-sm text-red-500 mt-3">
                  {errors.termsAccepted}
                </p>
              )}
            </div>
            {errors.submit && (

              <div
                role="alert"
                className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {errors.submit}
              </div>
            )}
            <div className="pt-6 flex justify-between items-center border-t border-slate-100">
              <button onClick={prevStep} className="px-6 py-2.5 rounded-lg border border-[#00BAF2] text-[#00BAF2] hover:bg-[#F0FAFB] text-[14px] font-semibold flex items-center gap-2 transition-colors">
                <ArrowLeft size={16} /> Previous Step
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="bg-[#00BAF2] hover:bg-[#0099C7] disabled:opacity-60 disabled:cursor-not-allowed text-white px-10 py-2.5 rounded-lg text-[14px] font-bold flex items-center gap-2 transition-colors shadow-lg shadow-[#00BAF2]/20"
              >
                {submitting ? "Adding Astrologer..." : "Add Astrologer"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddAstrologer;
