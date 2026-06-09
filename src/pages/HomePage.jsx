import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiMapPin, FiArrowRight, FiStar, FiArrowUpRight } from 'react-icons/fi';
import {
  HiOutlineTruck,
  HiOutlineCalendar,
  HiOutlineTable,
} from 'react-icons/hi';

import RestaurantCard from '../components/common/RestaurantCard';
import EventCard from '../components/common/EventCard';

import {
  restaurants,
  events,
  foodCategories,
} from '../data/mockData';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );

          const data = await response.json();

          const city =
            data.address.city ||
            data.address.county ||
            data.address.town ||
            data.address.village ||
            data.address.suburb ||
            data.address.municipality ||
            data.address.state_district ||
            data.address.state ||
            'Unknown Location';

          setLocationInput(city);
        } catch (error) {
          console.error(error);
          setLocation('Location Error');
        }
      },
      () => {
        setLocation('');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/food?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const fetchLocations = async (value) => {
    setLocationInput(value);

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&apiKey=${import.meta.env.VITE_GEOAPIFY_KEY}`
      );

      const data = await response.json();
      setSuggestions(data.features || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0B0A09] text-[#F5F1EA] antialiased selection:bg-amber-500/30">
      {/* ───────────────── HERO ───────────────── */}
      <section className="relative w-full min-h-[94vh] flex items-center justify-center overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#100D0A] via-[#0B0A09] to-[#0B0A09]" />

        {/* Warm glow orbs */}
        <div className="pointer-events-none absolute -top-44 -left-32 w-[38rem] h-[38rem] rounded-full bg-amber-500/20 blur-[130px]" />
        <div className="pointer-events-none absolute -bottom-52 -right-24 w-[36rem] h-[36rem] rounded-full bg-rose-600/15 blur-[130px]" />
        <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[44rem] h-[44rem] rounded-full bg-orange-500/10 blur-[150px]" />

        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage:
              'radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 75%)',
          }}
        />

        <div className="relative z-10 w-full max-w-5xl px-4 sm:px-8 pt-28 pb-20 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/[0.06] backdrop-blur-md px-4 py-2 mb-8 shadow-lg shadow-black/40">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-amber-100/80 text-sm font-medium tracking-wide">
              Delivering in 30+ cities across India
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display font-extrabold leading-[1.05] mb-6 tracking-tight"
            style={{ fontSize: 'clamp(2.8rem, 7.5vw, 6rem)' }}
          >
            <span className="block text-[#F5F1EA]">One App for</span>
            <span className="block bg-gradient-to-r from-amber-300 via-orange-400 to-rose-500 bg-clip-text text-transparent">
              Food, Dining
            </span>
            <span className="block text-[#F5F1EA]/35">&amp; Events</span>
          </h1>

          <p
            className="text-[#F5F1EA]/50 mb-10 leading-relaxed max-w-2xl text-balance"
            style={{ fontSize: 'clamp(1rem, 1.8vw, 1.15rem)' }}
          >
            Order food, reserve premium tables and book event tickets — all in
            one seamless platform built for India&apos;s modern lifestyle.
          </p>

          {/* SEARCH BAR */}
          <form onSubmit={handleSearch} className="w-full max-w-2xl mb-10">
            <div className="group flex items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl p-2 shadow-2xl shadow-black/50 transition-all duration-300 focus-within:border-amber-400/50 focus-within:bg-white/[0.07]">
              {/* LOCATION */}
              <div className="relative flex items-center gap-2 px-3 border-r border-white/10">
                <FiMapPin className="text-amber-400 shrink-0" />
                <div className="relative">
                  <input
                    type="text"
                    value={locationInput}
                    onChange={(e) => fetchLocations(e.target.value)}
                    placeholder="Location"
                    className="bg-transparent text-[#F5F1EA] text-sm outline-none w-[120px] sm:w-[160px] placeholder-white/30"
                  />

                  {suggestions.length > 0 && (
                    <div className="absolute top-10 left-0 z-50 w-[260px] max-h-56 overflow-y-auto rounded-xl border border-white/10 bg-[#15120F] shadow-2xl shadow-black/60">
                      {suggestions.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-3 text-sm text-[#F5F1EA]/80 hover:bg-white/[0.06] cursor-pointer transition-colors"
                          onClick={() => {
                            setLocation(item.properties.formatted);
                            setLocationInput(item.properties.formatted);
                            setSuggestions([]);
                          }}
                        >
                          <FiMapPin className="text-amber-400/70 shrink-0" />
                          <span className="truncate">{item.properties.formatted}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* SEARCH INPUT */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search restaurants, dishes, events..."
                className="flex-1 bg-transparent text-[#F5F1EA] placeholder-white/30 text-sm outline-none py-2 px-3 min-w-0"
              />

              {/* BUTTON */}
              <button
                type="submit"
                className="flex-shrink-0 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-2.5 flex items-center gap-2 text-sm font-semibold text-[#1A1206] shadow-lg shadow-amber-500/20 transition-all hover:shadow-amber-500/40 hover:brightness-105 active:scale-95"
              >
                <FiSearch />
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
          </form>

          {/* Stats */}
          <div className="flex items-center justify-center flex-wrap gap-x-8 gap-y-3 text-sm">
            {[
              { value: '10K+', label: 'Restaurants' },
              { value: '500+', label: 'Events' },
              { value: '4.8', label: 'Avg Rating', star: true },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="font-display font-bold text-[#F5F1EA] text-base flex items-center gap-1">
                  {s.value}
                  {s.star && <FiStar className="text-amber-400 fill-amber-400" />}
                </span>
                <span className="text-[#F5F1EA]/30">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[#F5F1EA]/25 text-xs uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-amber-400/60 to-transparent" />
        </div>
      </section>

      {/* ───────────────── SERVICES ───────────────── */}
      <section className="relative w-full py-24 bg-[#0B0A09]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
          <div className="mb-12 flex flex-col items-center text-center">
            <span className="text-amber-400/80 text-xs font-semibold uppercase tracking-[0.25em] mb-3">
              What we offer
            </span>
            <h2 className="font-display font-bold text-[#F5F1EA] text-3xl sm:text-4xl tracking-tight">
              Everything in one place
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: HiOutlineTruck,
                title: 'Food Delivery',
                desc: 'Order from 10,000+ restaurants. Fresh food delivered quickly.',
                color: 'from-amber-400 to-orange-500',
                path: '/food',
                glow: 'group-hover:shadow-amber-500/20',
              },
              {
                icon: HiOutlineTable,
                title: 'Dine Out',
                desc: 'Reserve premium tables and enjoy fine dining experiences.',
                color: 'from-orange-500 to-rose-500',
                path: '/dine-out',
                glow: 'group-hover:shadow-orange-500/20',
              },
              {
                icon: HiOutlineCalendar,
                title: 'Events',
                desc: 'Book concerts, comedy shows, food festivals and more.',
                color: 'from-rose-500 to-red-600',
                path: '/events',
                glow: 'group-hover:shadow-rose-500/20',
              },
            ].map((service) => (
              <Link
                key={service.title}
                to={service.path}
                className={`group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400/20 hover:shadow-2xl ${service.glow}`}
              >
                {/* corner glow */}
                <div
                  className={`pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${service.color} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25`}
                />

                <div
                  className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <service.icon className="text-[#1A1206] text-2xl" />
                </div>

                <h3 className="relative font-display font-bold text-[#F5F1EA] text-xl mb-2">
                  {service.title}
                </h3>

                <p className="relative text-[#F5F1EA]/40 text-sm leading-relaxed mb-6">
                  {service.desc}
                </p>

                <div className="relative flex items-center gap-2 text-sm font-medium">
                  <span className={`bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                    Explore Now
                  </span>
                  <FiArrowRight className="text-amber-400 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── CATEGORIES ───────────────── */}
      <section className="w-full py-16 bg-[#0F0C09] border-y border-white/[0.05]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display font-bold text-[#F5F1EA] text-2xl sm:text-3xl tracking-tight">
              What are you craving?
            </h2>
            <Link
              to="/food"
              className="hidden sm:flex items-center gap-1 text-sm text-[#F5F1EA]/40 hover:text-amber-400 transition-colors"
            >
              View all <FiArrowUpRight />
            </Link>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {foodCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/food?category=${cat.name}`}
                className="group flex flex-col items-center gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400/30 hover:bg-white/[0.06]"
              >
                <span className="text-3xl transition-transform duration-300 group-hover:scale-125">
                  {cat.icon}
                </span>
                <span className="text-[#F5F1EA]/50 text-xs font-medium text-center group-hover:text-[#F5F1EA]/80 transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── FEATURED RESTAURANTS ───────────────── */}
      <section className="w-full py-24 bg-[#0B0A09]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-amber-400/80 text-xs font-semibold uppercase tracking-[0.25em] mb-2 block">
                Top rated
              </span>
              <h2 className="font-display font-bold text-[#F5F1EA] text-3xl sm:text-4xl tracking-tight">
                Featured restaurants
              </h2>
            </div>
            <Link
              to="/food"
              className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm text-[#F5F1EA]/70 hover:border-amber-400/40 hover:text-[#F5F1EA] transition-all"
            >
              See all <FiArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {restaurants.slice(0, 4).map((item) => (
              <RestaurantCard key={item.id} restaurant={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── UPCOMING EVENTS ───────────────── */}
      <section className="w-full py-24 bg-[#0F0C09] border-t border-white/[0.05]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-rose-400/80 text-xs font-semibold uppercase tracking-[0.25em] mb-2 block">
                Don&apos;t miss out
              </span>
              <h2 className="font-display font-bold text-[#F5F1EA] text-3xl sm:text-4xl tracking-tight">
                Upcoming events
              </h2>
            </div>
            <Link
              to="/events"
              className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm text-[#F5F1EA]/70 hover:border-rose-400/40 hover:text-[#F5F1EA] transition-all"
            >
              See all <FiArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.slice(0, 3).map((item) => (
              <EventCard key={item.id} event={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── CTA ───────────────── */}
      <section className="w-full py-24 bg-[#0B0A09]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
          <div className="relative overflow-hidden rounded-[2rem] border border-amber-400/[0.12] bg-gradient-to-br from-amber-500/10 via-[#15110C] to-rose-500/10 px-8 py-16 sm:px-16 sm:py-20 text-center">
            <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-[40rem] rounded-full bg-amber-500/20 blur-[120px]" />
            <h2 className="relative font-display font-extrabold text-[#F5F1EA] text-3xl sm:text-5xl tracking-tight mb-5 text-balance">
              Hungry? Let&apos;s get you fed.
            </h2>
            <p className="relative text-[#F5F1EA]/50 max-w-xl mx-auto mb-9 leading-relaxed">
              Discover the best food, dining and events near you — all from a
              single, beautifully simple app.
            </p>
            <Link
              to="/food"
              className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-8 py-4 font-semibold text-[#1A1206] shadow-xl shadow-amber-500/25 transition-all hover:brightness-105 hover:scale-105 active:scale-95"
            >
              Order Now <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
