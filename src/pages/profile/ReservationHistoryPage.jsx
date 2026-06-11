import React, { useState, useEffect } from "react";

const ReservationHistoryPage = () => {
  // Safe, lazy state initialization from localStorage ('reservations' or 'orders')
  const [reservations, setReservations] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("reservations")) ||
        JSON.parse(localStorage.getItem("orders")) ||
        []
      );
    } catch (e) {
      return [];
    }
  });

  // Track the current real-world time to dynamically calculate cancellation windows
  const [currentTime, setCurrentTime] = useState(Date.now());

  // ── 1-Second Ticker Clock ─────────────────────────────
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Filter down to table reservations or dine-out orders
  const filteredReservations = reservations.filter(
    (item) => item && (item.type === "RESERVATION" || item.type === "DINE-OUT" || !item.type)
  );

  // ── Parse Reservation Date/Time into Timestamp ────────
  const getReservationTimestamp = (resDate, resTime) => {
    if (!resDate) return 0;
    
    try {
      // Ensure the time component defaults gracefully if missing
      const timeString = resTime || "00:00";
      
      // Combines "YYYY-MM-DD" and "HH:MM" strings into a valid parsable ISO format
      const reservationDateTime = new Date(`${resDate}T${timeString}`);
      return reservationDateTime.getTime() || 0;
    } catch (e) {
      console.error("Failed to parse reservation date/time format", e);
      return 0;
    }
  };

  // Cancellation handler
  const handleCancelReservation = (id, index) => {
    if (!window.confirm("Are you sure you want to cancel this reservation?")) return;

    // 1. Determine which key is actually holding the data in localStorage
    const storageKey = localStorage.getItem("reservations") ? "reservations" : "orders";
    
    // 2. Map through current state and update the status of the item that matches
    const updatedReservations = reservations.map((item, idx) => {
      // Fallback matching using index if an absolute item.id doesn't exist
      if ((item.id && item.id === id) || (!item.id && idx === index)) {
        return { ...item, status: "Cancelled" };
      }
      return item;
    });

    // 3. Update localStorage and component state
    localStorage.setItem(storageKey, JSON.stringify(updatedReservations));
    setReservations(updatedReservations);
  };

  function formatDateFull(d) {
    if (!d) return "";
    // Safe check if date format isn't YYYY-MM-DD
    if (!d.includes("-")) return d; 
    const [y, m, day] = d.split("-");
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${day} ${months[+m - 1]}, ${y}`;
  }

  return (
    <div className="min-h-screen pt-24 px-6 max-w-5xl mx-auto bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">
        Table Reservations
      </h1>

      {filteredReservations.length === 0 ? (
        <p className="text-gray-400">No reservations found.</p>
      ) : (
        <div className="space-y-4">
          {filteredReservations.map((res, index) => {
            // 1. Compute dynamic expiration metrics
            const reservationTimeMs = getReservationTimestamp(res.date, res.time);
            const isPastReservation = currentTime >= reservationTimeMs;
            
            // 2. Control cancellation permissions
            const isCancellable = res.status !== "Cancelled" && !isPastReservation;

            // 3. Evaluate display status context layout
            let currentStatus = res.status || "Confirmed";
            if (currentStatus !== "Cancelled" && isPastReservation) {
              currentStatus = "Completed"; // Gracefully tags old bookings as completed
            }
            
            return (
              <div
                key={res.id || index}
                className="bg-[#1A1A1A] p-6 rounded-xl border border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:border-orange-500/30 transition-all duration-300"
              >
                <div>
                  {/* RESTAURANT NAME */}
                  <h2 className="text-white font-bold text-xl mb-3">
                    {res.restaurantName || "Unknown Restaurant"}
                  </h2> 

                  {/* DETAILS SECTION */}
                  <div className="space-y-2 text-sm text-gray-300">
                    <p className="flex items-center gap-2">
                      <span className="text-white/40 font-medium">👥 Guests:</span> 
                      <span className="text-white">{res.guests || "-"}</span>
                    </p>

                    <p className="flex items-center gap-2">
                      <span className="text-white/40 font-medium">📅 Date:</span> 
                      <span className="text-white">{formatDateFull(res.date) || "-"}</span>
                    </p>

                    <p className="flex items-center gap-2">
                      <span className="text-white/40 font-medium">🕐 Time:</span> 
                      <span className="text-white">{res.time || "-"}</span>
                    </p>
                    
                    {res.customerName && (
                      <p className="flex items-center gap-2">
                        <span className="text-white/40 font-medium">👤 Name:</span> 
                        <span className="text-white">{res.customerName}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* ACTIONS SECTION (STATUS BADGE & CANCEL BUTTON) */}
                <div className="flex flex-row md:flex-col lg:flex-row items-center gap-4 self-end md:self-center">
                  {/* DYNAMIC STATUS BADGE */}
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold border capitalize transition-colors duration-300 ${
                      currentStatus === "Cancelled"
                        ? "bg-red-500/10 text-red-400 border-red-500/20"
                        : currentStatus === "Pending"
                        ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                        : currentStatus === "Completed"
                        ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        : "bg-green-500/10 text-green-400 border-green-500/20"
                    }`}
                  >
                    {currentStatus}
                  </span>

                  {/* CONDITIONAL CANCEL BUTTON */}
                  {isCancellable && (
                    <button
                      onClick={() => handleCancelReservation(res.id, index)}
                      className="bg-red-500 hover:bg-red-600 text-white font-medium text-sm px-4 py-2 rounded-lg transition-all duration-200"
                    >
                      Cancel Table
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReservationHistoryPage;
