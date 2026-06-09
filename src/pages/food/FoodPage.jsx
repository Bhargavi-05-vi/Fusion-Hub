import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import RestaurantCard from '../../components/common/RestaurantCard';

import {
  restaurants,
  foodCategories,
  cities
} from '../../data/mockData';

const categoryKeywords = {
  All: [],
  Pizza: ['pizza', 'italian'],
  Burgers: ['burger', 'american'],
  Biryani: ['biryani'],
  Sushi: ['sushi', 'japanese'],
  Desserts: ['dessert', 'cake', 'sweet'],
  Chinese: ['chinese', 'asian'],
  'South Indian': ['south indian', 'dosa', 'idli'],
  Healthy: ['healthy', 'salad'],
};

const restaurantServesCategory = (restaurant, category) => {
  if (category === 'All') return true;

  const keywords =
    categoryKeywords[category] || [category.toLowerCase()];

  const cuisineMatch = keywords.some((kw) =>
    restaurant.cuisine.toLowerCase().includes(kw)
  );

  if (cuisineMatch) return true;

  return restaurant.menu?.some((item) =>
    keywords.some(
      (kw) =>
        item.name.toLowerCase().includes(kw)
    )
  );
};

const restaurantMatchesSearch = (restaurant, query) => {
  if (!query.trim()) return true;

  const q = query.toLowerCase();

  if (
    restaurant.name.toLowerCase().includes(q) ||
    restaurant.cuisine.toLowerCase().includes(q) ||
    restaurant.location.toLowerCase().includes(q)
  ) {
    return true;
  }

  return restaurant.menu?.some((item) =>
    item.name.toLowerCase().includes(q)
  );
};

const FoodPage = () => {
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get('search') || ''
  );

  const [activeCategory, setActiveCategory] = useState(
    searchParams.get('category') || 'All'
  );

  const [location, setLocation] = useState('');

  const [sortBy, setSortBy] = useState('rating');

  const filtered = restaurants
    .filter((r) => restaurantMatchesSearch(r, search))
    .filter((r) =>
      restaurantServesCategory(r, activeCategory)
    )
    .filter(
      (r) =>
        location === '' ||
        r.location.toLowerCase() ===
          location.toLowerCase()
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;

        case 'time':
          return (
            parseInt(a.deliveryTime) -
            parseInt(b.deliveryTime)
          );

        default:
          return 0;
      }
    });

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    setSearch('');
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
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
                onChange={(e) => {
                  setSearch(e.target.value);
                  setActiveCategory('All');
                }}
                placeholder="Search restaurants, dishes or cities..."
                className="bg-transparent text-white placeholder-white/30 text-sm outline-none flex-1"
              />

              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="text-white/30 hover:text-white"
                >
                  ×
                </button>
              )}
            </div>

            {/* City Filter */}
            <select
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
              className="glass border border-orange-500/30 rounded-xl px-4 py-2.5 text-white text-sm bg-[#1A1A1A] min-w-[180px]"
            >
              <option
                value=""
                className="bg-[#1A1A1A]"
              >
                All Cities
              </option>

              {cities.map((city) => (
                <option
                  key={city}
                  value={city}
                  className="bg-[#1A1A1A]"
                >
                  {city}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
              className="glass border border-orange-500/30 rounded-xl px-4 py-2.5 text-white text-sm bg-[#1A1A1A] min-w-[220px]"
            >
              <option
                value="rating"
                className="bg-[#1A1A1A]"
              >
                Top Rated
              </option>

              <option
                value="time"
                className="bg-[#1A1A1A]"
              >
                Fastest Delivery
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-[#111111] py-3 sticky top-16 z-30 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="flex gap-2 overflow-x-auto pb-1"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {[
              'All',
              ...foodCategories.map(
                (c) => c.name
              ),
            ].map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  handleCategoryClick(cat)
                }
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

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-white/30 text-xs mb-5">
          {filtered.length} restaurant
          {filtered.length !== 1 ? 's' : ''} found

          {activeCategory !== 'All' && (
            <span className="text-orange-400">
              {' '}
              · {activeCategory}
            </span>
          )}

          {location && (
            <span className="text-orange-400">
              {' '}
              · {location}
            </span>
          )}

          {search && (
            <span className="text-orange-400">
              {' '}
              · "{search}"
            </span>
          )}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">
              🍽️
            </div>

            <p className="text-white font-semibold mb-1">
              No restaurants found
            </p>

            <p className="text-white/40 text-sm">
              Try another city, search term,
              or category.
            </p>

            <button
              onClick={() => {
                setSearch('');
                setLocation('');
                setActiveCategory('All');
              }}
              className="mt-5 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold rounded-full hover:shadow-lg transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodPage;
