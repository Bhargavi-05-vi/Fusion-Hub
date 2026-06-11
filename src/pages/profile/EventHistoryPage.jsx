import React, { useState, useEffect } from "react";

const EventHistoryPage = () => {
  // Safe lazy state initialization to read from localStorage once on mount
  const [eventOrders, setEventOrders] = useState(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    return savedOrders.filter((item) => item.type === "EVENT");
  });

  // Track the current real-world time to dynamically check for expiration
  const [currentTime, setCurrentTime] = useState(Date.now());

  // ── 1-Second Ticker Clock ─────────────────────────────
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // ── Parse Booking Date/Time into Timestamp ────────────
  const getEventTimestamp = (bookingDate, bookingTime) => {
    if (!bookingDate) return 0;
    
    try {
      // If bookingTime isn't provided or format is unexpected, default to start of day
      const timeString = bookingTime || "00:00";
      
      // Combines "YYYY-MM-DD" and "HH:MM" into a valid ISO string parsable by Date constructor
      const eventDateTime = new Date(`${bookingDate}T${timeString}`);
      return eventDateTime.getTime() || 0;
    } catch (e) {
      console.error("Failed to parse event date/time format", e);
      return 0;
    }
  };

  // ── Cancel Booking Handler ────────────────────────────
  const handleCancel = (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    // 1. Fetch current global list from storage
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

    // 2. Map through list to target and modify status string match
    const updatedAllOrders = allOrders.map((item) => {
      if (item.id === id) {
        return { ...item, status: "Cancelled" };
      }
      return item;
    });

    // 3. Save modified sequence back to persistent storage
    localStorage.setItem("orders", JSON.stringify(updatedAllOrders));

    // 4. Force synchronous reactive update for active event history items
    setEventOrders(
      updatedAllOrders.filter((item) => item.type === "EVENT")
    );
  };

  return (
    <div className="min-h-screen pt-24 px-6 max-w-5xl mx-auto bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">
        Event Bookings
      </h1>

      {eventOrders.length === 0 ? (
        <p className="text-gray-400">
          No event bookings found.
        </p>
      ) : (
        <div className="space-y-4">
          {eventOrders.map((item) => {
            // Calculate dynamic cancellation boundaries
            const eventTimeMs = getEventTimestamp(item.bookingDate, item.bookingTime);
            const isPastEvent = currentTime >= eventTimeMs;
            
            // Allow cancellation only if status isn't Cancelled AND the event hasn't started yet
            const isCancellable = item.status !== "Cancelled" && !isPastEvent;

            // Determine display status context dynamically
            let finalStatus = item.status || "Confirmed";
            if (finalStatus !== "Cancelled" && isPastEvent) {
              finalStatus = "Completed"; // Visually mark past active bookings as completed
            }

            return (
              <div
                key={item.id}
                className="bg-[#1A1A1A] p-6 rounded-xl border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-purple-500/20 transition-all duration-300"
              >
                <div className="space-y-1">
                  {/* DISPLAY REAL MATCHING BOOKING ID */}
                  <div className="text-xs text-purple-400 font-mono tracking-wider font-semibold">
                    {item.bookingId || `#EV-${item.id}`}
                  </div>

                  <h2 className="text-xl font-bold text-white">
                    {item.eventName}
                  </h2>

                  {/* DYNAMIC DATE & TIME SLOT FIELDS */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-400 py-1">
                    <p>
                      <span className="text-white/40">📅 Date:</span> {item.bookingDate || "N/A"}
                    </p>
                    <p>
                      <span className="text-white/40">🕐 Slot:</span> {item.bookingTime || "N/A"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-x-4 text-xs text-gray-500 pt-0.5">
                    <p>Tickets: <span className="text-gray-300 font-medium">{item.qty}</span></p>
                    <p>Total: <span className="text-gray-300 font-medium">₹{item.total?.toLocaleString()}</span></p>
                    <p>Via: <span className="text-gray-300 font-medium">{item.paymentMethod}</span></p>
                  </div>
                </div>

                {/* STATUS DISPLAY BADGE AND INTERACTION BUTTON */}
                <div className="flex items-center gap-4 self-end sm:self-center">
                  <span
                    className={`font-medium px-3 py-1 rounded-full text-sm border transition-colors ${
                      finalStatus === "Cancelled"
                        ? "bg-red-500/10 text-red-400 border-red-500/20"
                        : finalStatus === "Completed"
                        ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        : "bg-green-500/10 text-green-400 border-green-500/20"
                    }`}
                  >
                    {finalStatus}
                  </span>

                  {isCancellable && (
                    <button
                      onClick={() => handleCancel(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-medium text-sm px-4 py-2 rounded-lg transition-all"
                    >
                      Cancel Booking
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

export default EventHistoryPage;
