import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineSparkles } from 'react-icons/hi';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Email must contain @ and be a valid address';
    }
    if (!form.password) {
      errs.password = 'Password is required';
    } else if (form.password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setLoading(true);
      setTimeout(() => { setLoading(false); navigate('/'); }, 1500);
    }
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-orange-900/40 via-[#1A0800] to-red-900/30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-red-500/15 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative">
  <img
    src="/logo.png"
    alt="FusionHub Logo"
    className="w-9 h-9 object-contain rounded-2xl group-hover:scale-110 transition-all duration-500"
  />
</div>
            <span className="font-display font-bold text-xl text-white">Fusion<span className="text-gradient-orange">Hub</span></span>
          </Link>
          <div>
            <h2 className="font-display font-bold text-5xl text-white mb-4 leading-tight">Welcome<br />Back 👋</h2>
            <p className="text-white/40 text-lg mb-8">Sign in to access food delivery, dine-out reservations and event bookings.</p>
            <div className="space-y-3">
              {['10,000+ restaurants on one platform', 'Exclusive deals and discounts', 'Real-time order tracking'].map(f => (
                <div key={f} className="flex items-center gap-3 text-white/50 text-sm">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  {f}
                </div>
              ))}
            </div>
          </div>
          <p className="text-white/20 text-xs">© 2026 FusionHub. Crafted for seamless food & event experiences.</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[#0D0D0D]">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <HiOutlineSparkles className="text-white text-sm" />
            </div>
            <span className="font-display font-bold text-lg text-white">Fusion<span className="text-gradient-orange">Hub</span></span>
          </div>

          <h2 className="font-display font-bold text-white text-3xl mb-1">Sign In</h2>
          <p className="text-white/40 text-sm mb-8">Enter your credentials to continue</p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email */}
            <div>
              <label className="text-white/50 text-xs font-medium mb-1.5 block">Email Address</label>
              <div className="relative">
                <FiMail className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.email ? 'text-red-400' : 'text-white/30'}`} />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => handleChange('email', e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full bg-white/5 border rounded-xl pl-11 pr-4 py-3 text-white text-sm placeholder-white/20 outline-none transition-all ${errors.email ? 'border-red-500/60 bg-red-500/5 focus:border-red-500' : 'border-white/10 focus:border-orange-500/60 focus:bg-white/8'}`}
                />
              </div>
              {errors.email && (
                <div className="flex items-center gap-1.5 mt-1.5">
                  <FiAlertCircle className="text-red-400 text-xs flex-shrink-0" />
                  <p className="text-red-400 text-xs">{errors.email}</p>
                </div>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-white/50 text-xs font-medium">Password</label>
                <Link to="/forgot-password" className="text-orange-400 text-xs hover:text-orange-300 transition-colors">Forgot password?</Link>
              </div>
              <div className="relative">
                <FiLock className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.password ? 'text-red-400' : 'text-white/30'}`} />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => handleChange('password', e.target.value)}
                  placeholder="Enter your password"
                  className={`w-full bg-white/5 border rounded-xl pl-11 pr-12 py-3 text-white text-sm placeholder-white/20 outline-none transition-all ${errors.password ? 'border-red-500/60 bg-red-500/5 focus:border-red-500' : 'border-white/10 focus:border-orange-500/60 focus:bg-white/8'}`}
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
                  {showPw ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center gap-1.5 mt-1.5">
                  <FiAlertCircle className="text-red-400 text-xs flex-shrink-0" />
                  <p className="text-red-400 text-xs">{errors.password}</p>
                </div>
              )}
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3.5 rounded-xl mt-2 hover:shadow-lg hover:shadow-orange-500/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2">
              {loading ? (
                <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Signing in...</>
              ) : 'Sign In'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-white/30 text-xs">or continue with</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          <button className="w-full glass border border-white/10 rounded-xl py-3 flex items-center justify-center gap-3 text-white text-sm font-medium hover:border-white/20 hover:bg-white/5 transition-all">
            <FcGoogle className="text-xl" /> Continue with Google
          </button>

          <p className="text-center text-white/30 text-sm mt-6">
            Don't have an account? <Link to="/register" className="text-orange-400 font-medium hover:text-orange-300 transition-colors">Create one</Link>
          </p>

          <div className="mt-4 text-center">
            <Link to="/admin-login" className="text-white/20 text-xs hover:text-white/40 transition-colors">Admin Login →</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
