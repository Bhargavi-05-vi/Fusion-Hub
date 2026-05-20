import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiAlertCircle, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Email address is required');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address containing @');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D] px-4">
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl" />
      <div className="relative z-10 w-full max-w-md">
        <Link to="/login" className="inline-flex items-center gap-2 text-white/30 hover:text-white/60 text-sm mb-8 transition-colors">
          <FiArrowLeft /> Back to Login
        </Link>

        <div className="bg-[#1A1A1A] border border-white/5 rounded-3xl p-8">
          {!sent ? (
            <>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-5 shadow-lg shadow-orange-500/20">
                <FiMail className="text-white text-2xl" />
              </div>
              <h2 className="font-display font-bold text-white text-2xl mb-1">Forgot Password?</h2>
              <p className="text-white/40 text-sm mb-6">Enter your registered email and we'll send you a reset link.</p>

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-4">
                  <label className="text-white/50 text-xs font-medium mb-1.5 block">Email Address</label>
                  <div className="relative">
                    <FiMail className={`absolute left-4 top-1/2 -translate-y-1/2 ${error ? 'text-red-400' : 'text-white/30'}`} />
                    <input
                      type="email"
                      value={email}
                      onChange={e => { setEmail(e.target.value); if (error) setError(''); }}
                      placeholder="you@example.com"
                      className={`w-full bg-white/5 border rounded-xl pl-11 pr-4 py-3 text-white text-sm placeholder-white/20 outline-none transition-all ${error ? 'border-red-500/60 bg-red-500/5' : 'border-white/10 focus:border-orange-500/60'}`}
                    />
                  </div>
                  {error && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <FiAlertCircle className="text-red-400 text-xs flex-shrink-0" />
                      <p className="text-red-400 text-xs">{error}</p>
                    </div>
                  )}
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all hover:scale-105 disabled:opacity-70 flex items-center justify-center gap-2">
                  {loading ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Sending...</> : 'Send Reset Link'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg shadow-green-500/20">
                <FiCheckCircle className="text-white text-2xl" />
              </div>
              <h3 className="font-display font-bold text-white text-xl mb-2">Check Your Email</h3>
              <p className="text-white/40 text-sm mb-1">We've sent a reset link to</p>
              <p className="text-orange-400 font-medium text-sm mb-6">{email}</p>
              <p className="text-white/20 text-xs mb-6">Didn't receive it? Check your spam folder or try again.</p>
              <button onClick={() => setSent(false)} className="text-orange-400 text-sm hover:text-orange-300 transition-colors">Try another email</button>
            </div>
          )}
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          Remembered it? <Link to="/login" className="text-orange-400 hover:text-orange-300 transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
