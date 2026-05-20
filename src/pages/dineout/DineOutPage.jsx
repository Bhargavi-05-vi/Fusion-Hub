import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiStar, FiMapPin, FiUsers } from 'react-icons/fi';
import { dineOutRestaurants } from '../../data/mockData';

const DineOutPage = () => {
  const [search, setSearch] = useState('');
  const [guests, setGuests] = useState(2);

  const filtered = dineOutRestaurants.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) || r.cuisine.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-emerald-900/20 to-teal-900/10 py-16 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="font-display font-bold text-white text-4xl mb-2">Dine Out</h1>
          <p className="text-white/40 mb-8">Reserve tables at premium restaurants for an unforgettable experience</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
            <div className="flex-1 flex items-center gap-2 glass rounded-xl px-4 py-2.5 border border-white/10 focus-within:border-emerald-500/50">
              <FiSearch className="text-white/30" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search restaurants..."
                className="bg-transparent text-white placeholder-white/30 text-sm outline-none flex-1" />
            </div>
            <div className="flex items-center gap-2 glass rounded-xl px-4 py-2.5 border border-white/10">
              <FiUsers className="text-white/30" />
              <select value={guests} onChange={e => setGuests(e.target.value)} className="bg-transparent text-white text-sm outline-none appearance-none">
                {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n} className="bg-[#1A1A1A]">{n} Guest{n > 1 ? 's' : ''}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#111111] py-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto">
            {['All', 'Fine Dining', 'Romantic', 'Rooftop', 'Live Music', 'Premium'].map(f => (
              <button key={f} className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold glass border border-white/10 text-white/50 hover:text-white hover:border-emerald-500/30 transition-all">{f}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Restaurants Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(r => (
            <Link key={r.id} to={`/dine-out/${r.id}`} className="group">
              <div className="bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/5 hover:border-emerald-500/30 card-hover hover:shadow-2xl hover:shadow-emerald-500/10 transition-all">
                <div className="relative h-52 overflow-hidden">
                  <img src={r.image} alt={r.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-3 right-3 flex gap-1.5">
                    {r.tags.map(tag => <span key={tag} className="glass text-white/80 text-xs px-2.5 py-1 rounded-full">{tag}</span>)}
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 glass rounded-full px-2.5 py-1">
                    <FiStar className="text-yellow-400 text-xs fill-yellow-400" />
                    <span className="text-white text-xs font-semibold">{r.rating}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-white text-base mb-1 group-hover:text-emerald-400 transition-colors">{r.name}</h3>
                  <p className="text-white/40 text-xs mb-3">{r.cuisine}</p>
                  <div className="flex items-center justify-between text-xs text-white/40 mb-4">
                    <div className="flex items-center gap-1"><FiMapPin className="text-emerald-400" />{r.location}</div>
                    <span>₹{r.priceForTwo.toLocaleString()} for 2</span>
                  </div>
                  <div className="flex gap-2 overflow-x-auto">
                    {r.availableSlots.slice(0, 3).map(slot => (
                      <span key={slot} className="flex-shrink-0 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg font-medium">{slot}</span>
                    ))}
                    {r.availableSlots.length > 3 && <span className="flex-shrink-0 px-3 py-1.5 glass text-white/30 text-xs rounded-lg">+{r.availableSlots.length - 3}</span>}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DineOutPage;
