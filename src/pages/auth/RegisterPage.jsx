import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiPhone, FiEye, FiEyeOff, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineSparkles } from 'react-icons/hi';
import API from '../../services/api';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    else if (form.name.trim().length < 2) errs.name = 'Name must be at least 2 characters';

    if (!form.email.trim()) errs.email = 'Email address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Please enter a valid email with @';

    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) errs.phone = 'Enter a valid 10-digit mobile number';

    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 8) errs.password = 'Password must be at least 8 characters';
    else if (!/(?=.*[A-Z])(?=.*\d)/.test(form.password)) errs.password = 'Include at least one uppercase letter and one number';

    if (!form.confirm) errs.confirm = 'Please confirm your password';
    else if (form.confirm !== form.password) errs.confirm = 'Passwords do not match';

    return errs;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const errs = validate();
  setErrors(errs);

  if (Object.keys(errs).length > 0) return;

  try {
    setLoading(true);

    const res = await API.post('/auth/register', {
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
      confirm: form.confirm,
    });

    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));

    navigate('/');
  } catch (error) {
    alert(
      error.response?.data?.message ||
      'Registration failed'
    );
  } finally {
    setLoading(false);
  }
};

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  const pwStrength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 8 ? 2 : /(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%])/.test(form.password) ? 4 : 3;
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][pwStrength];
  const strengthColor = ['', 'bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'][pwStrength];

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-2/5 relative overflow-hidden bg-gradient-to-br from-orange-900/40 via-[#1A0800] to-red-900/30">
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl" />
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
            <h2 className="font-display font-bold text-4xl text-white mb-4">Join<br />FusionHub 🚀</h2>
            <p className="text-white/40 text-base mb-6">India's first super-app for food, dining, and entertainment.</p>
            <div className="glass rounded-2xl p-4 space-y-3">
              {[{ icon: '🍔', text: 'Order from 10,000+ restaurants' }, { icon: '🍽️', text: 'Reserve premium restaurant tables' }, { icon: '🎟️', text: 'Book event tickets instantly' }].map(item => (
                <div key={item.text} className="flex items-center gap-3 text-white/50 text-sm">
                  <span className="text-xl">{item.icon}</span>{item.text}
                </div>
              ))}
            </div>
          </div>
          <p className="text-white/20 text-xs">© 2025 FusionHub. All rights reserved.</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-start justify-center p-6 bg-[#0D0D0D] overflow-y-auto py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <HiOutlineSparkles className="text-white text-sm" />
            </div>
            <span className="font-display font-bold text-lg text-white">Fusion<span className="text-gradient-orange">Hub</span></span>
          </div>

          <h2 className="font-display font-bold text-white text-3xl mb-1">Create Account</h2>
          <p className="text-white/40 text-sm mb-6">Fill in the details below to get started</p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {[
              { key: 'name', label: 'Full Name', placeholder: 'John Doe', type: 'text', icon: FiUser },
              { key: 'email', label: 'Email Address', placeholder: 'you@example.com', type: 'email', icon: FiMail },
              { key: 'phone', label: 'Phone Number', placeholder: '9876543210', type: 'tel', icon: FiPhone },
            ].map(field => (
              <div key={field.key}>
                <label className="text-white/50 text-xs font-medium mb-1.5 block">{field.label}</label>
                <div className="relative">
                  <field.icon className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors[field.key] ? 'text-red-400' : 'text-white/30'}`} />
                  <input type={field.type} value={form[field.key]} onChange={e => handleChange(field.key, e.target.value)} placeholder={field.placeholder}
                    className={`w-full bg-white/5 border rounded-xl pl-11 pr-4 py-3 text-white text-sm placeholder-white/20 outline-none transition-all ${errors[field.key] ? 'border-red-500/60 bg-red-500/5' : 'border-white/10 focus:border-orange-500/60'}`} />
                </div>
                {errors[field.key] && <div className="flex items-center gap-1.5 mt-1"><FiAlertCircle className="text-red-400 text-xs" /><p className="text-red-400 text-xs">{errors[field.key]}</p></div>}
              </div>
            ))}

            {/* Password */}
            <div>
              <label className="text-white/50 text-xs font-medium mb-1.5 block">Password</label>
              <div className="relative">
                <FiLock className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.password ? 'text-red-400' : 'text-white/30'}`} />
                <input type={showPw ? 'text' : 'password'} value={form.password} onChange={e => handleChange('password', e.target.value)} placeholder="Min 8 chars, uppercase & number"
                  className={`w-full bg-white/5 border rounded-xl pl-11 pr-12 py-3 text-white text-sm placeholder-white/20 outline-none transition-all ${errors.password ? 'border-red-500/60 bg-red-500/5' : 'border-white/10 focus:border-orange-500/60'}`} />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">{showPw ? <FiEyeOff /> : <FiEye />}</button>
              </div>
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1,2,3,4].map(i => <div key={i} className={`flex-1 h-1 rounded-full transition-all ${i <= pwStrength ? strengthColor : 'bg-white/10'}`}></div>)}
                  </div>
                  <p className="text-xs text-white/30">Strength: <span className={`font-medium ${['', 'text-red-400', 'text-yellow-400', 'text-blue-400', 'text-green-400'][pwStrength]}`}>{strengthLabel}</span></p>
                </div>
              )}
              {errors.password && <div className="flex items-center gap-1.5 mt-1"><FiAlertCircle className="text-red-400 text-xs" /><p className="text-red-400 text-xs">{errors.password}</p></div>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-white/50 text-xs font-medium mb-1.5 block">Confirm Password</label>
              <div className="relative">
                <FiLock className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.confirm ? 'text-red-400' : form.confirm && form.confirm === form.password ? 'text-green-400' : 'text-white/30'}`} />
                <input type={showConfirm ? 'text' : 'password'} value={form.confirm} onChange={e => handleChange('confirm', e.target.value)} placeholder="Re-enter your password"
                  className={`w-full bg-white/5 border rounded-xl pl-11 pr-12 py-3 text-white text-sm placeholder-white/20 outline-none transition-all ${errors.confirm ? 'border-red-500/60 bg-red-500/5' : form.confirm && form.confirm === form.password ? 'border-green-500/40' : 'border-white/10 focus:border-orange-500/60'}`} />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">{showConfirm ? <FiEyeOff /> : <FiEye />}</button>
                {form.confirm && form.confirm === form.password && <FiCheckCircle className="absolute right-11 top-1/2 -translate-y-1/2 text-green-400 text-sm" />}
              </div>
              {errors.confirm && <div className="flex items-center gap-1.5 mt-1"><FiAlertCircle className="text-red-400 text-xs" /><p className="text-red-400 text-xs">{errors.confirm}</p></div>}
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2 mt-2">
              {loading ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Creating account...</> : 'Create Account'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-white/30 text-xs">or</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>
          <button className="w-full glass border border-white/10 rounded-xl py-3 flex items-center justify-center gap-3 text-white text-sm font-medium hover:border-white/20 hover:bg-white/5 transition-all">
            <FcGoogle className="text-xl" /> Sign up with Google
          </button>
          <p className="text-center text-white/30 text-sm mt-5">
            Already have an account? <Link to="/login" className="text-orange-400 font-medium hover:text-orange-300 transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
