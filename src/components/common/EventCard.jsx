import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiMapPin, FiStar } from 'react-icons/fi';

const EventCard = ({ event }) => (
  <Link to={`/events/${event.id}`} className="group block">
    <div className="bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/30 card-hover hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-400">
      <div className="relative overflow-hidden h-52">
        <img src={event.image} alt={event.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">{event.category}</span>
        </div>
        {event.originalPrice > event.price && (
          <div className="absolute top-3 right-3 glass text-green-400 text-xs font-bold px-2.5 py-1 rounded-full">
            {Math.round((1 - event.price / event.originalPrice) * 100)}% OFF
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-display font-bold text-white text-base leading-tight group-hover:text-purple-300 transition-colors duration-300">{event.name}</h3>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 text-xs text-white/40">
            <FiCalendar className="text-purple-400" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <FiStar className="text-yellow-400 fill-yellow-400" />
            <span className="text-white/60">{event.rating}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-white/40">
            <FiMapPin className="text-purple-400" />
            <span className="truncate max-w-[150px]">{event.venue}</span>
          </div>
          <div className="text-right">
            <div className="text-white font-bold text-sm">₹{event.price.toLocaleString()}</div>
            {event.originalPrice > event.price && (
              <div className="text-white/30 text-xs line-through">₹{event.originalPrice.toLocaleString()}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default EventCard;
