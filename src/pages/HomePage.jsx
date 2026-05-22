import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiMapPin, FiArrowRight, FiStar } from 'react-icons/fi';
import { HiOutlineTruck, HiOutlineCalendar, HiOutlineTable } from 'react-icons/hi';

import RestaurantCard from '../components/common/RestaurantCard';
import EventCard from '../components/common/EventCard';

import {
  restaurants,
  events,
  foodCategories,
} from '../data/mockData';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate(`/food?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0D0D0D]">

      {/* ───────────────── HERO SECTION ───────────────── */}
      <section className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 bg-[#0D0D0D]" />

        {/* Main gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(180,60,20,0.18) 0%, rgba(13,13,13,0) 70%)',
          }}
        />

        {/* Glow blobs */}
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-orange-900/10 rounded-full blur-[100px]" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-5xl px-4 sm:px-8 pt-24 pb-16 flex flex-col items-center text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>

            <span className="text-white/70 text-sm font-medium">
              Delivering in 30+ cities across India
            </span>
          </div>

          {/* Heading */}
          <h1
            className="font-display font-bold text-white leading-tight mb-6 animate-fadeIn"
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
              lineHeight: '1.1',
            }}
          >
            One App for
            <br />

            <span className="text-gradient-orange">
              Food, Dining
            </span>

            <br />

            <span className="text-white/80">
              &amp; Events
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-white/50 mb-10 leading-relaxed max-w-2xl"
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
            }}
          >
            Order food, reserve premium tables, and book event tickets —
            all in one seamless platform built for India's modern lifestyle.
          </p>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="w-full max-w-2xl mb-8"
          >
            <div className="flex items-center glass rounded-2xl p-2 border border-white/10 focus-within:border-orange-500/50 transition-all duration-300">

              {/* Location */}
              <div className="flex items-center gap-2 px-3 text-white/30 border-r border-white/10 mr-2 flex-shrink-0">
                <FiMapPin className="text-orange-400" />

                <span className="text-sm hidden sm:block">
                  Bengaluru
                </span>
              </div>

              {/* Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search restaurants, dishes, events..."
                className="flex-1 bg-transparent text-white placeholder-white/30 text-sm outline-none py-2 px-2 min-w-0"
              />

              {/* Button */}
              <button
                type="submit"
                className="flex-shrink-0 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl px-5 py-2.5 flex items-center gap-2 text-sm font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all hover:scale-105"
              >
                <FiSearch />

                <span className="hidden sm:inline">
                  Search
                </span>
              </button>
            </div>
          </form>

          {/* Stats */}
          <div className="flex items-center justify-center flex-wrap gap-6 text-sm text-white/30">
            {[
              '10K+ Restaurants',
              '500+ Events',
              '4.8 ★ Rating',
            ].map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>

        {/* Scroll */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-white/20 text-xs uppercase tracking-widest">
            Scroll
          </span>

          <div className="w-0.5 h-8 bg-gradient-to-b from-orange-500/50 to-transparent"></div>
        </div>
      </section>

      {/* ───────────────── SERVICES ───────────────── */}
      <section className="w-full py-20 bg-[#0D0D0D]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {[
              {
                icon: HiOutlineTruck,
                title: 'Food Delivery',
                desc: 'Order from 10,000+ restaurants. Fresh food delivered quickly.',
                color: 'from-orange-500 to-red-500',
                path: '/food',
                shadow: 'hover:shadow-orange-500/20',
              },

              {
                icon: HiOutlineTable,
                title: 'Dine Out',
                desc: 'Reserve premium tables and enjoy fine dining experiences.',
                color: 'from-emerald-500 to-teal-600',
                path: '/dine-out',
                shadow: 'hover:shadow-emerald-500/20',
              },

              {
                icon: HiOutlineCalendar,
                title: 'Events',
                desc: 'Book concerts, comedy shows, food festivals and more.',
                color: 'from-purple-600 to-pink-500',
                path: '/events',
                shadow: 'hover:shadow-purple-500/20',
              },
            ].map((service) => (
              <Link
                key={service.title}
                to={service.path}
                className={`group bg-[#1A1A1A] rounded-2xl p-7 border border-white/5 hover:border-white/15 card-hover hover:shadow-2xl ${service.shadow} transition-all duration-300`}
              >

                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <service.icon className="text-white text-2xl" />
                </div>

                <h3 className="font-display font-bold text-white text-xl mb-2">
                  {service.title}
                </h3>

                <p className="text-white/40 text-sm leading-relaxed mb-5">
                  {service.desc}
                </p>

                <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all duration-300">
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${service.color}`}>
                    Explore Now
                  </span>

                  <FiArrowRight className="text-orange-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── CATEGORIES ───────────────── */}
      <section className="w-full py-12 bg-[#111111]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">

          <h2 className="font-display font-bold text-white text-2xl mb-8">
            What are you craving?
          </h2>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">

            {foodCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/food?category=${cat.name}`}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-[#1A1A1A] border border-white/5 hover:border-white/15 hover:bg-[#222] transition-all duration-300 hover:-translate-y-1 group"
              >

                <span className="text-3xl group-hover:scale-125 transition-transform duration-300">
                  {cat.icon}
                </span>

                <span className="text-white/50 text-xs font-medium text-center">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;