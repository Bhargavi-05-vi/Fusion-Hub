import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import EventCard from '../../components/common/EventCard';
import { events, eventCategories } from '../../data/mockData';

const EventsPage = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = events.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.venue.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || e.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-purple-900/20 to-pink-900/10 py-16 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="font-display font-bold text-white text-4xl mb-2">Events & Experiences</h1>
          <p className="text-white/40 mb-8">Concerts, comedy, food fests and more — book your next great memory</p>
          <div className="flex gap-3 max-w-xl">
            <div className="flex-1 flex items-center gap-2 glass rounded-xl px-4 py-2.5 border border-white/10 focus-within:border-purple-500/50">
              <FiSearch className="text-white/30" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events, artists, venues..."
                className="bg-transparent text-white placeholder-white/30 text-sm outline-none flex-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="bg-[#111111] py-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto">
            {eventCategories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${activeCategory === cat ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/30' : 'glass border border-white/10 text-white/50 hover:text-white'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {filtered.length > 0 ? (
          <>
            <p className="text-white/30 text-sm mb-6">{filtered.length} events found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(e => <EventCard key={e.id} event={e} />)}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎭</div>
            <p className="text-white/40">No events found. Try a different category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
