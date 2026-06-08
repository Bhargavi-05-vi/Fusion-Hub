import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiStar,
  FiMapPin,
  FiUsers
} from "react-icons/fi";

import { dineOutRestaurants } from "../../data/mockData";

const filters = [
  "All",
  "Fine Dining",
  "Romantic",
  "Premium",
  "Rooftop",
  "Live Music"
];

const DineOutPage = () => {

  const [search, setSearch] = useState("");
  const [guests, setGuests] = useState(2);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filtered = dineOutRestaurants.filter((restaurant) => {

    const matchesSearch =
      restaurant.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      restaurant.cuisine
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      selectedFilter === "All" ||

      restaurant.category === selectedFilter ||

      restaurant.tags?.includes(selectedFilter);

    return matchesSearch && matchesFilter;

  });

  return (

    <div className="min-h-screen pt-20">

      {/* HEADER */}

      <div className="relative py-12 border-b border-white/5">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <h1 className="text-4xl font-bold text-white mb-2">
            Dine Out
          </h1>

          <p className="text-white/40 mb-8">
            Reserve tables at premium restaurants
          </p>

          {/* SEARCH BAR */}

          <div
            className="
            glass
            border
            border-white/10
            rounded-2xl
            p-4
            flex
            flex-col
            md:flex-row
            gap-4
            max-w-2xl
          "
          >

            <div className="flex items-center gap-3 flex-1 min-w-[220px]">

              <FiSearch className="text-white/30" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Restaurants, cuisines..."
                className="
                bg-transparent
                outline-none
                text-white
                placeholder-white/30
                flex-1
              "
              />

            </div>

            <div className="flex items-center gap-3">

              <FiUsers className="text-white/30" />

              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="bg-transparent text-white outline-none"
              >

                {[1,2,3,4,5,6,7,8].map((n) => (

                  <option
                    key={n}
                    value={n}
                    className="bg-[#1A1A1A]"
                  >
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
                flex-shrink-0
                px-5
                py-2
                rounded-full
                border
                transition-all
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

      {/* RESTAURANTS */}

      <div className="max-w-7xl mx-auto px-4 py-10">

        {filtered.length === 0 ? (

          <div className="text-center text-white/40">

            No restaurants found

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {filtered.map((restaurant) => (

              <Link
                key={restaurant.id}
                to={`/dine-out/${restaurant.id}`}
                className="group"
              >

                <div
                  className="
                  bg-[#1A1A1A]
                  rounded-2xl
                  overflow-hidden
                  border
                  border-white/5
                  hover:border-emerald-500/30
                  transition-all
                "
                >

                  {/* IMAGE */}

                  <div className="relative h-52 overflow-hidden">

                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="
                      w-full
                      h-full
                      object-cover
                      group-hover:scale-105
                      transition
                      duration-500
                    "
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                  </div>

                  {/* CONTENT */}

                  <div className="p-5">

                    <div className="flex justify-between">

                      <div>

                        <h2 className="text-white font-bold text-lg">

                          {restaurant.name}

                        </h2>

                        <p className="text-white/40 text-sm">

                          {restaurant.cuisine}

                        </p>

                      </div>

                      <div className="flex items-center gap-1">

                        <FiStar className="text-yellow-400 fill-yellow-400" />

                        <span className="text-white text-sm">

                          {restaurant.rating}

                        </span>

                      </div>

                    </div>

                    <div className="flex justify-between mt-4 text-sm">

                      <div className="flex items-center gap-1 text-white/50">

                        <FiMapPin className="text-emerald-400" />

                        {restaurant.location}

                      </div>

                      <span className="text-white/50">

                        ₹{restaurant.priceForTwo} for 2

                      </span>

                    </div>

                    {/* TIMINGS */}

                    <div className="flex flex-wrap gap-2 mt-5">

                      {restaurant.availableSlots
                        ?.slice(0, 6)
                        .map((slot) => (

                          <span
                            key={slot}
                            className="
                            px-3
                            py-2
                            rounded-lg
                            bg-emerald-500/10
                            border
                            border-emerald-500/20
                            text-emerald-400
                            text-xs
                            font-medium
                          "
                          >

                            {slot}

                          </span>

                      ))}

                    </div>

                  </div>

                </div>

              </Link>

            ))}

          </div>

        )}

      </div>

    </div>

  );

};

export default DineOutPage;