import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiMapPin, FiArrowRight, FiStar } from 'react-icons/fi';
import { HiOutlineTruck, HiOutlineCalendar, HiOutlineTable } from 'react-icons/hi';
import RestaurantCard from '../components/common/RestaurantCard';
import EventCard from '../components/common/EventCard';
import { restaurants, events, foodCategories, testimonials } from '../data/mockData';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/food?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="min-h-screen w-full">

      {/* ───── HERO ───── */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">

        {/* Full-bleed background */}
        <div className="absolute inset-0 w-full h-full bg-[#0D0D0D]" />

        {/* Gradient overlay — edge to edge */}
        <div className="absolute inset-0 w-full h-full"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(180,60,20,0.18) 0%, rgba(13,13,13,0) 70%)' }} />

        {/* Glow blobs — spread wide */}
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-orange-900/10 rounded-full blur-[100px]" />

        {/* Content — centered, generous width */}
        <div className="relative z-10 w-full px-4 sm:px-8 pt-24 pb-16 flex flex-col items-center text-center">

          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-white/60 text-sm font-medium">Delivering in 30+ cities across India</span>
          </div>

          <h1 className="font-display font-bold text-white leading-tight mb-6"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', lineHeight: '1.1' }}>
            One App for<br />
            <span className="text-gradient-orange">Food, Dining</span><br />
            <span className="text-white/50">&amp; Events</span>
          </h1>

          <p className="text-white/50 mb-10 leading-relaxed max-w-2xl"
            style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)' }}>
            Order food, reserve premium tables, and book event tickets — all in one seamless platform built for India's modern lifestyle.
          </p>

          {/* Search Bar — wider on large screens */}
          <form onSubmit={handleSearch} className="w-full max-w-2xl mb-8">
            <div className="flex items-center glass rounded-2xl p-2 border border-white/10 focus-within:border-orange-500/50 transition-all duration-300">
              <div className="flex items-center gap-2 px-3 text-white/30 border-r border-white/10 mr-2 flex-shrink-0">
                <FiMapPin className="text-orange-400" />
                <span className="text-sm hidden sm:block">Bengaluru</span>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search restaurants, dishes, events..."
                className="flex-1 bg-transparent text-white placeholder-white/30 text-sm outline-none py-2 px-2 min-w-0"
              />
              <button type="submit"
                className="flex-shrink-0 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl px-5 py-2.5 flex items-center gap-2 text-sm font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all hover:scale-105">
                <FiSearch /> <span className="hidden sm:inline">Search</span>
              </button>
            </div>
          </form>

          <div className="flex items-center justify-center flex-wrap gap-6 text-sm text-white/30">
            {['10K+ Restaurants', '500+ Events', '4.8 ★ Rating'].map(s => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-white/20 text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-orange-500/50 to-transparent"></div>
        </div>
      </section>

      {/* ───── SERVICES ───── */}
      <section className="w-full py-20 bg-[#0D0D0D]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: HiOutlineTruck, title: 'Food Delivery', desc: 'Order from 10,000+ restaurants. Fresh food at your doorstep in 30 minutes.', color: 'from-orange-500 to-red-500', path: '/food', shadow: 'hover:shadow-orange-500/20' },
              { icon: HiOutlineTable, title: 'Dine Out', desc: 'Reserve tables at premium restaurants. Experience fine dining, simplified.', color: 'from-emerald-500 to-teal-600', path: '/dine-out', shadow: 'hover:shadow-emerald-500/20' },
              { icon: HiOutlineCalendar, title: 'Events', desc: 'Discover concerts, comedy shows, food festivals. Book tickets instantly.', color: 'from-purple-600 to-pink-500', path: '/events', shadow: 'hover:shadow-purple-500/20' },
            ].map(service => (
              <Link key={service.title} to={service.path}
                className={`group bg-[#1A1A1A] rounded-2xl p-7 border border-white/5 hover:border-white/15 card-hover hover:shadow-2xl ${service.shadow} transition-all duration-400`}>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <service.icon className="text-white text-2xl" />
                </div>
                <h3 className="font-display font-bold text-white text-xl mb-2">{service.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-5">{service.desc}</p>
                <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all duration-300">
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${service.color}`}>Explore Now</span>
                  <FiArrowRight className="text-orange-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CATEGORIES ───── */}
      <section className="w-full py-12 bg-[#111111]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
          <h2 className="font-display font-bold text-white text-2xl mb-8">What are you craving?</h2>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {foodCategories.map(cat => (
              <Link key={cat.id} to={`/food?category=${cat.name}`}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-[#1A1A1A] border border-white/5 hover:border-white/15 hover:bg-[#222] transition-all duration-300 hover:-translate-y-1 group">
                <span className="text-3xl group-hover:scale-125 transition-transform duration-300">{cat.icon}</span>
                <span className="text-white/50 text-xs font-medium text-center">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───── FEATURED RESTAURANTS ───── */}
      <section className="w-full py-20 bg-[#0D0D0D]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display font-bold text-white text-3xl mb-1">Featured Restaurants</h2>
              <p className="text-white/40 text-sm">Top-rated spots in your area</p>
            </div>
            <Link to="/food" className="flex items-center gap-1 text-orange-400 text-sm font-medium hover:gap-2 transition-all">
              View All <FiArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.slice(0, 6).map(r => <RestaurantCard key={r.id} restaurant={r} />)}
          </div>
        </div>
      </section>

      {/* ───── TRENDING EVENTS ───── */}
      <section className="w-full py-20 bg-[#0A0A0F] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/8 to-pink-900/5" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display font-bold text-white text-3xl mb-1">Trending Events</h2>
              <p className="text-white/40 text-sm">Don't miss what's happening near you</p>
            </div>
            <Link to="/events" className="flex items-center gap-1 text-purple-400 text-sm font-medium hover:gap-2 transition-all">
              View All <FiArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.slice(0, 3).map(e => <EventCard key={e.id} event={e} />)}
          </div>
        </div>
      </section>

      {/* ───── STATS ───── */}
      <section className="w-full py-20 bg-[#111111]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '10K+', label: 'Restaurants', color: 'text-orange-400' },
              { value: '2M+', label: 'Happy Users', color: 'text-green-400' },
              { value: '500+', label: 'Live Events', color: 'text-purple-400' },
              { value: '4.8★', label: 'App Rating', color: 'text-yellow-400' },
            ].map(stat => (
              <div key={stat.label} className="text-center p-6 bg-[#1A1A1A] rounded-2xl border border-white/5">
                <div className={`font-display font-bold text-4xl ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-white/40 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── TESTIMONIALS ───── */}
      <section className="w-full py-20 bg-[#0D0D0D]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-white text-3xl mb-2">Loved by millions</h2>
            <p className="text-white/40">What our community has to say</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.id} className="glass rounded-2xl p-6 border border-white/10 hover:border-orange-500/20 transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => <FiStar key={i} className="text-yellow-400 fill-yellow-400 text-sm" />)}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-orange-500/30" />
                  <div>
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-white/30 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
