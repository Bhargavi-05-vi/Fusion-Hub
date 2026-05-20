import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiClock, FiMapPin } from 'react-icons/fi';

const RestaurantCard = ({ restaurant, basePath = '/food' }) => (
  <Link to={`${basePath}/${restaurant.id}`} className="group block">
    <div className="bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/5
      hover:border-orange-500/30 hover:shadow-xl hover:shadow-orange-500/10
      hover:-translate-y-1 hover:scale-[1.01]
      transition-all duration-300">

      {/* Image */}
      <div className="relative overflow-hidden"
        style={{ height: 'clamp(160px, 28vw, 210px)' }}>
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        {/* Discount badge */}
        {restaurant.discount && (
          <div className="absolute top-2.5 left-2.5 bg-gradient-to-r from-orange-500 to-red-500
            text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-lg">
            {restaurant.discount}
          </div>
        )}

        {/* Tag badge */}
        {restaurant.tags?.[0] && (
          <div className="absolute top-2.5 right-2.5 glass text-white/90 text-[11px]
            px-2.5 py-1 rounded-full font-medium">
            {restaurant.tags[0]}
          </div>
        )}

        {/* Rating */}
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1
          glass rounded-full px-2 py-1">
          <FiStar className="text-yellow-400 text-[10px] fill-yellow-400" />
          <span className="text-white text-[11px] font-semibold">{restaurant.rating}</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3.5">
        <h3 className="font-display font-semibold text-white text-[15px] mb-0.5
          group-hover:text-orange-400 transition-colors duration-300 truncate">
          {restaurant.name}
        </h3>
        <p className="text-white/40 text-xs mb-3 truncate">{restaurant.cuisine}</p>

        <div className="flex items-center justify-between text-[11px] text-white/40">
          <div className="flex items-center gap-1">
            <FiClock className="text-orange-400 flex-shrink-0" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiMapPin className="text-orange-400 flex-shrink-0" />
            <span>{restaurant.distance}</span>
          </div>
          <span className="text-white/25">₹{restaurant.priceForTwo} for 2</span>
        </div>
      </div>
    </div>
  </Link>
);

export default RestaurantCard;
