import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiStar,
  FiMapPin,
  FiUsers,
} from "react-icons/fi";
import API from "../../services/api";

const filters = [
  "All",
  "Fine Dining",
  "Romantic",
  "Premium",
  "Rooftop",
  "Live Music",
];

/* ── Helper: derive a short city / area from address string ── */
const getCityLabel = (address = "") => address.split(",")[0].trim();

/* ── Helper: cuisine array → display string ─────────────────── */
const getCuisineLabel = (cuisine) =>
  Array.isArray(cuisine) ? cuisine.join(", ") : cuisine || "";

/* ── Static preview slots shown on the card (not booking slots) */
const PREVIEW_SLOTS = ["7:00 PM", "7:30 PM", "8:00 PM", "9:00 PM"];

const DineOutPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState("");
  const [guests, setGuests]           = useState(2);
  const [selectedFilter, setSelectedFilter] = useState("All");

  /* ── Fetch all restaurants from real API ──────────────────── */
  useEffect(() => {
    API.get("/restaurants")
      .then((res) => setRestaurants(res.data.restaurants || []))
      .catch(() => setRestaurants([]))
      .finally(() => setLoading(false));
  }, []);

  /* ── Filter logic ─────────────────────────────────────────── */
  const filtered = restaurants.filter((r) => {
    const cuisineStr = getCuisineLabel(r.cuisine).toLowerCase();
    const nameStr    = r.name.toLowerCase();
    const searchStr  = search.toLowerCase();

    const matchesSearch =
      nameStr.includes(searchStr) || cuisineStr.includes(searchStr);

    // Filter by cuisine keyword since real DB has no tags/category fields
    const matchesFilter =
      selectedFilter === "All" ||
      cuisineStr.includes(selectedFilter.toLowerCase()) ||
      nameStr.includes(selectedFilter.toLowerCase());

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen pt-20">

      {/* HEADER */}
      <div className="relative py-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <h1 className="text-4xl font-bold text-white mb-2">Dine Out</h1>
          <p className="text-white/40 mb-8">Reserve tables at premium restaurants</p>

          {/* SEARCH BAR */}
          <div className="glass border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row gap-4 max-w-2xl">

            <div className="flex items-center gap-3 flex-1 min-w-[220px]">
              <FiSearch className="text-white/30" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Restaurants, cuisines..."
                className="bg-transparent outline-none text-white placeholder-white/30 flex-1"
              />
            </div>

            <div className="flex items-center gap-3">
              <FiUsers className="text-white/30" />
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="bg-transparent text-white outline-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n} className="bg-[#1A1A1A]">
                    {n} Guests
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="py-5 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex gap-3 overflow-x-auto scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`
                flex-shrink-0 px-5 py-2 rounded-full border transition-all
                ${
                  selectedFilter === filter
                    ? "border-emerald-500 text-emerald-400 bg-emerald-500/10"
                    : "border-white/10 text-white/50 hover:text-white"
                }
              `}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* RESTAURANT GRID */}
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-24">
            <div
              style={{
                width: 40,
                height: 40,
                border: "2px solid rgba(52,211,153,0.3)",
                borderTopColor: "#34d399",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }}
            />
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="text-center text-white/40 py-16">
            No restaurants found
          </div>
        )}

        {/* Cards */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((restaurant) => {
              const cuisineLabel = getCuisineLabel(restaurant.cuisine);
              const cityLabel    = getCityLabel(restaurant.address);

              return (
                /* Use _id (MongoDB) for the route — matches TableReservationPage useParams */
                <Link
                  key={restaurant._id}
                  to={`/dine-out/${restaurant._id}`}
                  className="group"
                >
                  <div className="bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/5 hover:border-emerald-500/30 transition-all">

                    {/* IMAGE */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    </div>

                    {/* CONTENT */}
                    <div className="p-5">

                      <div className="flex justify-between">
                        <div>
                          <h2 className="text-white font-bold text-lg">
                            {restaurant.name}
                          </h2>
                          <p className="text-white/40 text-sm">{cuisineLabel}</p>
                        </div>

                        <div className="flex items-center gap-1">
                          <FiStar className="text-yellow-400 fill-yellow-400" />
                          <span className="text-white text-sm">
                            {restaurant.rating > 0
                              ? restaurant.rating.toFixed(1)
                              : "New"}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between mt-4 text-sm">
                        <div className="flex items-center gap-1 text-white/50">
                          <FiMapPin className="text-emerald-400" />
                          {cityLabel || "—"}
                        </div>
                        {/* deliveryFee shown as a proxy for cost context */}
                        <span className="text-white/50">
                          {restaurant.deliveryFee > 0
                            ? `₹${restaurant.deliveryFee} delivery`
                            : "Free delivery"}
                        </span>
                      </div>

                      {/* PREVIEW SLOTS — static, actual slots selected on booking page */}
                      <div className="flex flex-wrap gap-2 mt-5">
                        {PREVIEW_SLOTS.map((slot) => (
                          <span
                            key={slot}
                            className="px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium"
                          >
                            {slot}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default DineOutPage;
