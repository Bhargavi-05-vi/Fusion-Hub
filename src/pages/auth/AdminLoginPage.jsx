import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiLock, FiEye, FiEyeOff, FiAlertCircle, FiShield } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';

const AdminLoginPage = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!form.username.trim()) errs.username = 'Username is required';
    else if (form.username.trim().length < 3) errs.username = 'Username must be at least 3 characters';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
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
    <div className="min-h-screen flex items-center justify-center bg-[#080808] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#080808] to-slate-900" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <HiOutlineSparkles className="text-white" />
            </div>
            <span className="font-display font-bold text-xl text-white">Fusion<span className="text-gradient-orange">Hub</span></span>
          </Link>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-600 border border-white/10 flex items-center justify-center mx-auto mb-4 shadow-2xl">
            <FiShield className="text-white text-2xl" />
          </div>
          <h2 className="font-display font-bold text-white text-2xl mb-1">Admin Portal</h2>
          <p className="text-white/30 text-sm">Restricted access. Authorized personnel only.</p>
        </div>

        <div className="bg-[#111111] border border-white/8 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Username */}
            <div>
              <label className="text-white/40 text-xs font-medium mb-1.5 block uppercase tracking-widest">Username</label>
              <div className="relative">
                <FiUser className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm ${errors.username ? 'text-red-400' : 'text-white/20'}`} />
                <input
                  type="text"
                  value={form.username}
                  onChange={e => handleChange('username', e.target.value)}
                  placeholder="admin_username"
                  className={`w-full bg-white/3 border rounded-xl pl-11 pr-4 py-3.5 text-white text-sm placeholder-white/15 outline-none transition-all font-mono ${errors.username ? 'border-red-500/50 bg-red-500/5' : 'border-white/8 focus:border-blue-500/50 focus:bg-white/5'}`}
                />
              </div>
              {errors.username && (
                <div className="flex items-center gap-1.5 mt-1.5">
                  <FiAlertCircle className="text-red-400 text-xs flex-shrink-0" />
                  <p className="text-red-400 text-xs">{errors.username}</p>
                </div>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-white/40 text-xs font-medium mb-1.5 block uppercase tracking-widest">Password</label>
              <div className="relative">
                <FiLock className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm ${errors.password ? 'text-red-400' : 'text-white/20'}`} />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => handleChange('password', e.target.value)}
                  placeholder="••••••••••••"
                  className={`w-full bg-white/3 border rounded-xl pl-11 pr-12 py-3.5 text-white text-sm placeholder-white/15 outline-none transition-all font-mono ${errors.password ? 'border-red-500/50 bg-red-500/5' : 'border-white/8 focus:border-blue-500/50 focus:bg-white/5'}`}
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors">
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
              className="w-full bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 border border-white/10 text-white font-bold py-3.5 rounded-xl mt-3 transition-all hover:shadow-lg hover:shadow-black/50 hover:scale-105 active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2">
              {loading ? (
                <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Authenticating...</>
              ) : (
                <><FiShield className="text-sm" /> Access Dashboard</>
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-6 space-y-2">
          <p className="text-white/20 text-xs">All access attempts are logged and monitored.</p>
          <Link to="/login" className="text-white/30 text-xs hover:text-white/50 transition-colors">← Back to Customer Login</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
