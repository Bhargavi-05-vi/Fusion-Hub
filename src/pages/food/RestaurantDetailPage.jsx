import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FiStar, FiClock, FiMapPin,
  FiArrowLeft, FiShoppingCart,
} from 'react-icons/fi';
import MenuItemCard from '../../components/common/MenuItemCard';
import { useCart } from '../../context/CartContext';
import API from '../../services/api';

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { count, total } = useCart();

  const [restaurant, setRestaurant]     = useState(null);
  const [menuItems, setMenuItems]       = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState('');

  // ── Fetch restaurant + its menu from backend ─────────
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');

        const [restRes, menuRes] = await Promise.all([
          API.get(`/restaurants/${id}`),
          API.get(`/menu/${id}`),
        ]);

        const fetchedRestaurant = restRes.data.restaurant;
        const fetchedItems = menuRes.data.items || [];

        setRestaurant(fetchedRestaurant);
        setMenuItems(fetchedItems);

        // Set the first available category as default
        if (fetchedItems.length > 0) {
          const firstCategory = fetchedItems[0].category;
          setActiveCategory(firstCategory);
        }
      } catch (err) {
        setError('Failed to load restaurant. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // ── Loading state ─────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  // ── Error state ───────────────────────────────────────
  if (error || !restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🍽️</div>
          <p className="text-white/40 mb-4">{error || 'Restaurant not found'}</p>
          <Link to="/food" className="btn-primary inline-block">Go Back</Link>
        </div>
      </div>
    );
  }

  // ── Derived data ──────────────────────────────────────
  const categories   = [...new Set(menuItems.map((i) => i.category))];
  const filteredItems = activeCategory
    ? menuItems.filter((i) => i.category === activeCategory)
    : menuItems;

  const cuisineLabel = Array.isArray(restaurant.cuisine)
    ? restaurant.cuisine.join(', ')
    : restaurant.cuisine;

  const cityLabel = (restaurant.address || '').split(',')[0].trim();

  // ── Adapt menu item for MenuItemCard ─────────────────
  // MenuItemCard expects: id, name, price, image, description
  // We pass restaurantId so CartContext can guard against
  // mixing items from different restaurants
  const adaptItem = (item) => ({
    ...item,
    id: item._id,
  });

  return (
    <div className="min-h-screen pt-16">

      {/* ── Hero Image ───────────────────────────────── */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-black/50 to-transparent" />

        <div className="absolute top-6 left-6">
          <Link
            to="/food"
            className="flex items-center gap-2 glass rounded-full px-4 py-2 text-white text-sm hover:bg-white/10 transition-all"
          >
            <FiArrowLeft /> Back
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-display font-bold text-white text-3xl sm:text-4xl mb-1">
              {restaurant.name}
            </h1>
            <p className="text-white/60 text-sm mb-3">{cuisineLabel}</p>
            <div className="flex items-center gap-4 text-sm flex-wrap">
              <div className="flex items-center gap-1.5 bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                <FiStar className="fill-green-400" /> {restaurant.rating}
              </div>
              <div className="flex items-center gap-1.5 text-white/50">
                <FiClock className="text-orange-400" /> {restaurant.deliveryTime} min
              </div>
              <div className="flex items-center gap-1.5 text-white/50">
                <FiMapPin className="text-orange-400" /> {cityLabel}
              </div>
              <div className="text-white/50">
                Delivery: ₹{restaurant.deliveryFee}
              </div>
              {!restaurant.isOpen && (
                <div className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-bold">
                  Currently Closed
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Category Pills */}
        {categories.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6" style={{ scrollbarWidth: 'none' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                    : 'glass text-white/50 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Menu Items */}
        {filteredItems.length > 0 ? (
          <div className="space-y-3">
            {filteredItems.map((item) => (
              <MenuItemCard
                key={item._id}
                item={adaptItem(item)}
                restaurantId={restaurant._id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">🍽️</div>
            <p className="text-white/40">No items in this category</p>
          </div>
        )}
      </div>

      {/* ── Cart Sticky Bar ───────────────────────────── */}
      {count > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 z-50">
          <div className="max-w-md mx-auto">
            <Link
              to="/cart"
              className="flex items-center justify-between bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-4 shadow-2xl shadow-orange-500/40 hover:shadow-orange-500/60 transition-all hover:scale-105"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                  <FiShoppingCart className="text-white text-sm" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">{count} items in cart</div>
                  <div className="text-white/70 text-xs">View cart</div>
                </div>
              </div>
              <div className="text-white font-bold">₹{total} →</div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetailPage;
