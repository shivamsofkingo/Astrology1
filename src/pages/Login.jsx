import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import backgroundLogin from '../assets/backgroundlogin.png';
import softkingoLogo from '../assets/softkingo-logo.d4fc7414.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        // Redirect to admin panel
        navigate('/');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred during login. Is the backend running?');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundLogin})` }}
    >
      <div className="bg-white p-10 rounded-xl  shadow-2xl w-full max-w-[470px] relative z-10 animate-in fade-in duration-500">
        <div className="flex flex-col items-center mb-10">
          <img
            src={softkingoLogo}
            alt="Softkingo Logo"
            className="h-[48px] w-auto object-contain mb-4"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <h2 className="text-[24px] font-bold text-slate-800 tracking-tight">Admin Login</h2>
          <p className="text-[13px] text-slate-500 mt-1.5 font-medium">Sign in to access astrology panel</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-xl text-sm mb-6 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 bg-[#EEF2F6] border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-[#00BAF2] focus:ring-4 focus:ring-[#00BAF2]/10 transition-all text-[13px] text-slate-800 font-medium"
              placeholder="Enter email address"
              required
            />
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 bg-[#EEF2F6] border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-[#00BAF2] focus:ring-4 focus:ring-[#00BAF2]/10 transition-all text-[13px] tracking-normal text-slate-800 font-medium pr-12"
                placeholder="•••••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#00BAF2] hover:bg-[#00A1D3] text-white py-3.5 rounded-xl font-bold text-[15px] transition-all transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#00BAF2]/30 mt-4"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
