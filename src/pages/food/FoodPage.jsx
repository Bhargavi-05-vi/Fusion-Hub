import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import RestaurantCard from '../../components/common/RestaurantCard';
import { restaurants, foodCategories, menuItems } from '../../data/mockData';

// Map each category pill to keywords that match cuisine OR menu item names
const categoryKeywords = {
  'All':        [],
  'Pizza':      ['pizza', 'italian'],
  'Burgers':    ['burger', 'american', 'fast food'],
  'Biryani':    ['biryani', 'mughlai', 'north indian'],
  'Sushi':      ['sushi', 'japanese'],
  'Desserts':   ['dessert', 'sweet', 'cake'],
  'Chinese':    ['chinese', 'thai', 'asian'],
  'South Indian': ['south indian', 'dosa', 'idli'],
  'Healthy':    ['healthy', 'salad', 'mediterranean'],
};

// Check if a restaurant serves a food type — looks at cuisine AND its menu items
const restaurantServesCategory = (restaurant, category) => {
  if (category === 'All') return true;
  const keywords = categoryKeywords[category] || [category.toLowerCase()];

  // Check cuisine string
  const cuisineMatch = keywords.some(kw =>
    restaurant.cuisine.toLowerCase().includes(kw)
  );
  if (cuisineMatch) return true;

  // Check menu item names & categories
  const items = menuItems[restaurant.id] || [];
  return items.some(item =>
    keywords.some(kw =>
      item.name.toLowerCase().includes(kw) ||
      item.category.toLowerCase().includes(kw)
    )
  );
};

// For free-text search: match restaurant name, cuisine, OR any menu item name
const restaurantMatchesSearch = (restaurant, query) => {
  if (!query.trim()) return true;
  const q = query.toLowerCase();

  if (
    restaurant.name.toLowerCase().includes(q) ||
    restaurant.cuisine.toLowerCase().includes(q)
  ) return true;

  const items = menuItems[restaurant.id] || [];
  return items.some(item =>
    item.name.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q)
  );
};

const FoodPage = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get('category') || 'All'
  );
  const [sortBy, setSortBy] = useState('rating');

  const filtered = restaurants
    .filter(r => restaurantMatchesSearch(r, search))
    .filter(r => restaurantServesCategory(r, activeCategory))
    .sort((a, b) =>
      sortBy === 'rating'
        ? b.rating - a.rating
        : parseInt(a.deliveryTime) - parseInt(b.deliveryTime)
    );

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    setSearch(''); // clear text search when picking a category pill
  };

  return (
    <div className="min-h-screen pt-20">

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-900/20 to-red-900/10 py-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-bold text-white text-3xl sm:text-4xl mb-1">Food Delivery</h1>
          <p className="text-white/40 text-sm mb-5">Order from the best restaurants near you</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
            <div className="flex-1 flex items-center gap-2 glass rounded-xl px-4 py-2.5 border border-white/10 focus-within:border-orange-500/50 transition-all">
              <FiSearch className="text-white/30 flex-shrink-0" />
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setActiveCategory('All'); }}
                placeholder="Search by dish, cuisine or restaurant…"
                className="bg-transparent text-white placeholder-white/30 text-sm outline-none flex-1 min-w-0"
              />
              {search && (
                <button onClick={() => setSearch('')}
                  className="text-white/30 hover:text-white transition-colors flex-shrink-0 text-lg leading-none">
                  ×
                </button>
              )}
            </div>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="glass border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none bg-[#1A1A1A] cursor-pointer"
            >
              <option value="rating">Sort: Top Rated</option>
              <option value="time">Sort: Fastest Delivery</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="bg-[#111111] py-3 sticky top-16 z-30 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {['All', ...foodCategories.map(c => c.name)].map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300
                  ${activeCategory === cat
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

        {/* Result label */}
        <p className="text-white/30 text-xs mb-5">
          {filtered.length} restaurant{filtered.length !== 1 ? 's' : ''} found
          {activeCategory !== 'All' && <span className="text-orange-400"> · {activeCategory}</span>}
          {search && <span className="text-orange-400"> · "{search}"</span>}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(r => <RestaurantCard key={r.id} restaurant={r} />)}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🍽️</div>
            <p className="text-white font-semibold mb-1">No restaurants found</p>
            <p className="text-white/40 text-sm">
              Try searching for something else or pick a different category.
            </p>
            <button
              onClick={() => { setSearch(''); setActiveCategory('All'); }}
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
