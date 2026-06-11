import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import RestaurantCard from '../../components/common/RestaurantCard';
import API from '../../services/api';

const foodCategories = [
  'All', 'North Indian', 'South Indian', 'Chinese',
  'Italian', 'Biryani', 'Cafe',
];

const FoodPage = () => {
  const [searchParams] = useSearchParams();

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState('');

  const [search, setSearch]               = useState(searchParams.get('search') || '');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'All');
  const [cityFilter, setCityFilter]       = useState('');
  const [sortBy, setSortBy]               = useState('rating');

  // ── Fetch all restaurants from backend ──────────────
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        setError('');
        const { data } = await API.get('/restaurants');
        setRestaurants(data.restaurants || []);
      } catch (err) {
        setError('Failed to load restaurants. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  // ── Derive unique cities from loaded data ────────────
  const cities = [...new Set(
    restaurants
      .map((r) => (r.address || '').split(',')[0].trim())
      .filter(Boolean)
  )].sort();

  // ── Filter + sort ────────────────────────────────────
  const filtered = restaurants
    .filter((r) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      const cuisine = Array.isArray(r.cuisine)
        ? r.cuisine.join(' ')
        : (r.cuisine || '');
      return (
        r.name.toLowerCase().includes(q) ||
        cuisine.toLowerCase().includes(q) ||
        (r.address || '').toLowerCase().includes(q)
      );
    })
    .filter((r) => {
      if (activeCategory === 'All') return true;
      const cuisine = Array.isArray(r.cuisine)
        ? r.cuisine
        : [r.cuisine || ''];
      return cuisine.some((c) =>
        c.toLowerCase().includes(activeCategory.toLowerCase())
      );
    })
    .filter((r) => {
      if (!cityFilter) return true;
      return (r.address || '').toLowerCase().includes(cityFilter.toLowerCase());
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'time') return a.deliveryTime - b.deliveryTime;
      return 0;
    });

  // ── Adapt MongoDB doc shape for RestaurantCard ───────
  // RestaurantCard expects: id, name, cuisine (string),
  // rating, deliveryTime (string), image, location (string)
  const adapt = (r) => ({
    ...r,
    id: r._id,
    cuisine: Array.isArray(r.cuisine) ? r.cuisine.join(', ') : r.cuisine,
    deliveryTime: `${r.deliveryTime} min`,
    location: (r.address || '').split(',')[0].trim(),
    distance: '2.5 km',
  });

  return (
    <div className="min-h-screen pt-20">

      {/* ── Header ─────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-orange-900/20 to-red-900/10 py-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-bold text-white text-3xl sm:text-4xl mb-1">
            Food Delivery
          </h1>
          <p className="text-white/40 text-sm mb-5">
            Order from the best restaurants near you
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 flex items-center gap-2 glass rounded-xl px-4 py-2.5 border border-white/10 focus-within:border-orange-500/50 transition-all">
              <FiSearch className="text-white/30 flex-shrink-0" />
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setActiveCategory('All'); }}
                placeholder="Search restaurants, dishes or cities..."
                className="bg-transparent text-white placeholder-white/30 text-sm outline-none flex-1"
              />
              {search && (
                <button onClick={() => setSearch('')} className="text-white/30 hover:text-white">×</button>
              )}
            </div>

            {/* City */}
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="glass border border-orange-500/30 rounded-xl px-4 py-2.5 text-white text-sm bg-[#1A1A1A] min-w-[180px]"
            >
              <option value="" className="bg-[#1A1A1A]">All Cities</option>
              {cities.map((c) => (
                <option key={c} value={c} className="bg-[#1A1A1A]">{c}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="glass border border-orange-500/30 rounded-xl px-4 py-2.5 text-white text-sm bg-[#1A1A1A] min-w-[180px]"
            >
              <option value="rating" className="bg-[#1A1A1A]">Top Rated</option>
              <option value="time"   className="bg-[#1A1A1A]">Fastest Delivery</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Category Pills ──────────────────────────────── */}
      <div className="bg-[#111111] py-3 sticky top-16 z-30 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {foodCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setSearch(''); }}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                    : 'glass text-white/50 hover:text-white border border-white/10 hover:border-orange-500/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Results ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="w-10 h-10 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">⚠️</div>
            <p className="text-white/60 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold rounded-full"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <p className="text-white/30 text-xs mb-5">
              {filtered.length} restaurant{filtered.length !== 1 ? 's' : ''} found
              {activeCategory !== 'All' && <span className="text-orange-400"> · {activeCategory}</span>}
              {cityFilter && <span className="text-orange-400"> · {cityFilter}</span>}
              {search && <span className="text-orange-400"> · "{search}"</span>}
            </p>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((r) => (
                  <RestaurantCard key={r._id} restaurant={adapt(r)} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <div className="text-6xl mb-4">🍽️</div>
                <p className="text-white font-semibold mb-1">No restaurants found</p>
                <p className="text-white/40 text-sm">Try another city, search term, or category.</p>
                <button
                  onClick={() => { setSearch(''); setCityFilter(''); setActiveCategory('All'); }}
                  className="mt-5 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold rounded-full hover:shadow-lg transition-all"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FoodPage;
