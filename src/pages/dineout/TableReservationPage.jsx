import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiClock, FiUsers, FiCheckCircle, FiStar } from 'react-icons/fi';
import { dineOutRestaurants } from '../../data/mockData';

const TableReservationPage = () => {
  const { id } = useParams();
  const restaurant = dineOutRestaurants.find(r => r.id === id);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [booked, setBooked] = useState(false);

  if (!restaurant) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center"><p className="text-white/40">Restaurant not found</p></div>
    </div>
  );

  if (booked) return (
    <div className="min-h-screen flex items-center justify-center pt-16 px-4">
      <div className="text-center max-w-sm">
        <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-emerald-500/30">
          <FiCheckCircle className="text-white text-4xl" />
        </div>
        <h2 className="font-display font-bold text-white text-3xl mb-2">Reservation Confirmed!</h2>
        <p className="text-white/50 mb-1">Booking ID: #TB{Math.floor(Math.random() * 90000 + 10000)}</p>
        <p className="text-white/30 text-sm mb-2">{restaurant.name}</p>
        <p className="text-white/40 text-sm mb-8">{selectedDate} · {selectedSlot} · {guests} Guests</p>
        <Link to="/dine-out" className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold px-8 py-3 rounded-full hover:shadow-lg transition-all">Back to Dine Out</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-16">
      <div className="relative h-64 overflow-hidden">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-black/60 to-transparent" />
        <div className="absolute top-6 left-6">
          <Link to="/dine-out" className="flex items-center gap-2 glass rounded-full px-4 py-2 text-white text-sm hover:bg-white/10 transition-all">
            <FiArrowLeft /> Back
          </Link>
        </div>
        <div className="absolute bottom-6 left-6">
          <h1 className="font-display font-bold text-white text-3xl mb-1">{restaurant.name}</h1>
          <div className="flex items-center gap-3 text-sm text-white/60">
            <span>{restaurant.cuisine}</span>
            <div className="flex items-center gap-1"><FiStar className="text-yellow-400 fill-yellow-400 text-xs" />{restaurant.rating}</div>
            <span>₹{restaurant.priceForTwo.toLocaleString()} for 2</span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 p-6">
          <h2 className="font-display font-bold text-white text-xl mb-6">Reserve a Table</h2>

          <div className="space-y-5">
            <div>
              <label className="text-white/50 text-xs font-medium mb-1.5 block flex items-center gap-1.5"><FiCalendar className="text-emerald-400" /> Date</label>
              <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} min={new Date().toISOString().split('T')[0]}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-emerald-500/50 transition-all" />
            </div>

            <div>
              <label className="text-white/50 text-xs font-medium mb-1.5 block flex items-center gap-1.5"><FiClock className="text-emerald-400" /> Time Slot</label>
              <div className="grid grid-cols-4 gap-2">
                {restaurant.availableSlots.map(slot => (
                  <button key={slot} onClick={() => setSelectedSlot(slot)}
                    className={`py-2.5 rounded-xl text-sm font-medium transition-all ${selectedSlot === slot ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg' : 'bg-white/5 border border-white/10 text-white/50 hover:border-emerald-500/30 hover:text-white'}`}>
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-white/50 text-xs font-medium mb-1.5 block flex items-center gap-1.5"><FiUsers className="text-emerald-400" /> Guests</label>
              <div className="flex items-center gap-3">
                <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white hover:border-emerald-500/30 transition-all text-lg">−</button>
                <span className="text-white font-bold text-xl w-8 text-center">{guests}</span>
                <button onClick={() => setGuests(Math.min(12, guests + 1))} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white hover:border-emerald-500/30 transition-all text-lg">+</button>
              </div>
            </div>

            <div>
              <label className="text-white/50 text-xs font-medium mb-1.5 block">Your Name</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-emerald-500/50 transition-all" />
            </div>
            <div>
              <label className="text-white/50 text-xs font-medium mb-1.5 block">Phone Number</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-emerald-500/50 transition-all" />
            </div>

            <button
              onClick={() => { if (selectedDate && selectedSlot && name && phone) setBooked(true); }}
              disabled={!selectedDate || !selectedSlot || !name || !phone}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100">
              Confirm Reservation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableReservationPage;
