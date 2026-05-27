import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email with @';
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    if (!form.message.trim()) errs.message = 'Message is required';
    else if (form.message.trim().length < 20) errs.message = 'Message must be at least 20 characters';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setLoading(true);
      setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
    }
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  if (submitted) return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/30">
          <FiCheckCircle className="text-white text-3xl" />
        </div>
        <h2 className="font-display font-bold text-white text-2xl mb-2">Message Sent!</h2>
        <p className="text-white/40 text-sm mb-2">Thanks for reaching out, {form.name}.</p>
        <p className="text-white/30 text-sm mb-8">We'll get back to you at <span className="text-orange-400">{form.email}</span> within 24 hours.</p>
        <a href="/" className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-8 py-3 rounded-full hover:shadow-lg transition-all">
          Back to Home
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0D0D0D] pt-20 pb-16">

      {/* Header */}
      <div className="bg-gradient-to-br from-orange-900/20 to-[#0D0D0D] py-14 mb-10 border-b border-white/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">📬</div>
          <h1 className="font-display font-bold text-white text-4xl mb-3">Contact Us</h1>
          <p className="text-white/40">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Contact Info */}
          <div className="space-y-4">
            {[
              { icon: FiMail,    label: 'Email Us',     value: 'support@fusionhub.com', color: 'text-orange-400',  bg: 'bg-orange-500/10 border-orange-500/20' },
              { icon: FiPhone,   label: 'Call Us',      value: '+91 1800-123-4567',     color: 'text-green-400',   bg: 'bg-green-500/10 border-green-500/20'   },
              { icon: FiMapPin,  label: 'Office',       value: 'Bengaluru, Karnataka',  color: 'text-purple-400',  bg: 'bg-purple-500/10 border-purple-500/20' },
            ].map(item => (
              <div key={item.label} className={`flex items-start gap-4 p-5 rounded-2xl border ${item.bg}`}>
                <div className={`w-10 h-10 rounded-xl ${item.bg} border flex items-center justify-center flex-shrink-0`}>
                  <item.icon className={`${item.color} text-base`} />
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-0.5">{item.label}</p>
                  <p className="text-white font-medium text-sm">{item.value}</p>
                </div>
              </div>
            ))}

            <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-5">
              <h4 className="text-white font-semibold text-sm mb-3">Support Hours</h4>
              <div className="space-y-2">
                {[
                  ['Monday – Friday', '9:00 AM – 9:00 PM'],
                  ['Saturday',        '10:00 AM – 6:00 PM'],
                  ['Sunday',          '10:00 AM – 4:00 PM'],
                ].map(([day, time]) => (
                  <div key={day} className="flex justify-between text-xs">
                    <span className="text-white/40">{day}</span>
                    <span className="text-white/60">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-[#1A1A1A] rounded-2xl border border-white/5 p-6">
            <h3 className="font-display font-bold text-white text-lg mb-5">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="text-white/40 text-xs font-medium mb-1.5 block">Full Name</label>
                  <input value={form.name} onChange={e => handleChange('name', e.target.value)}
                    placeholder="John Doe"
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none transition-all ${errors.name ? 'border-red-500/60' : 'border-white/10 focus:border-orange-500/60'}`} />
                  {errors.name && <div className="flex items-center gap-1 mt-1"><FiAlertCircle className="text-red-400 text-xs" /><p className="text-red-400 text-xs">{errors.name}</p></div>}
                </div>

                {/* Email */}
                <div>
                  <label className="text-white/40 text-xs font-medium mb-1.5 block">Email Address</label>
                  <input type="email" value={form.email} onChange={e => handleChange('email', e.target.value)}
                    placeholder="you@example.com"
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none transition-all ${errors.email ? 'border-red-500/60' : 'border-white/10 focus:border-orange-500/60'}`} />
                  {errors.email && <div className="flex items-center gap-1 mt-1"><FiAlertCircle className="text-red-400 text-xs" /><p className="text-red-400 text-xs">{errors.email}</p></div>}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="text-white/40 text-xs font-medium mb-1.5 block">Subject</label>
                <select value={form.subject} onChange={e => handleChange('subject', e.target.value)}
                  className={`w-full bg-[#111] border rounded-xl px-4 py-3 text-white text-sm outline-none transition-all ${errors.subject ? 'border-red-500/60' : 'border-white/10 focus:border-orange-500/60'}`}>
                  <option value="" className="bg-[#111]">Select a topic</option>
                  <option value="order" className="bg-[#111]">Order Issue</option>
                  <option value="reservation" className="bg-[#111]">Table Reservation</option>
                  <option value="event" className="bg-[#111]">Event Ticket</option>
                  <option value="payment" className="bg-[#111]">Payment Problem</option>
                  <option value="account" className="bg-[#111]">Account Issue</option>
                  <option value="other" className="bg-[#111]">Other</option>
                </select>
                {errors.subject && <div className="flex items-center gap-1 mt-1"><FiAlertCircle className="text-red-400 text-xs" /><p className="text-red-400 text-xs">{errors.subject}</p></div>}
              </div>

              {/* Message */}
              <div>
                <label className="text-white/40 text-xs font-medium mb-1.5 block">Message</label>
                <textarea value={form.message} onChange={e => handleChange('message', e.target.value)}
                  placeholder="Describe your issue in detail..."
                  rows={5}
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none transition-all resize-none ${errors.message ? 'border-red-500/60' : 'border-white/10 focus:border-orange-500/60'}`} />
                {errors.message && <div className="flex items-center gap-1 mt-1"><FiAlertCircle className="text-red-400 text-xs" /><p className="text-red-400 text-xs">{errors.message}</p></div>}
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all hover:scale-105 disabled:opacity-70 flex items-center justify-center gap-2">
                {loading
                  ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Sending...</>
                  : <><FiSend /> Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;