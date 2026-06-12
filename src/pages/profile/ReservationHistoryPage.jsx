import React, { useState, useEffect } from "react";
import API from "../../services/api";

/* ── Helpers ─────────────────────────────────────────────────── */
function formatDateFull(isoString) {
  if (!isoString) return "—";
  const d = new Date(isoString);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${String(d.getDate()).padStart(2,"0")} ${months[d.getMonth()]}, ${d.getFullYear()}`;
}

function formatTime(isoString) {
  if (!isoString) return "—";
  const d = new Date(isoString);
  const h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, "0");
  const hh = h > 12 ? h - 12 : h === 0 ? 12 : h;
  const ampm = h < 12 ? "AM" : "PM";
  return `${String(hh).padStart(2,"0")}:${m} ${ampm}`;
}

/* ── Component ───────────────────────────────────────────────── */
const ReservationHistoryPage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [error, setError]               = useState("");

  /* ── Fetch from API on mount ────────────────────────────── */
  useEffect(() => {
    API.get("/reservations/my-reservations")
      .then((res) => setReservations(res.data.reservations || []))
      .catch(() => setError("Failed to load reservations. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  /* ── Cancel via API ─────────────────────────────────────── */
  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this reservation?")) return;
    setCancellingId(id);
    try {
      await API.patch(`/reservations/cancel/${id}`);
      setReservations((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: "cancelled" } : r))
      );
    } catch {
      alert("Could not cancel reservation. Please try again.");
    } finally {
      setCancellingId(null);
    }
  };

  /* ── Derive display status ──────────────────────────────── */
  const getDisplayStatus = (reservation) => {
    if (reservation.status === "cancelled") return "Cancelled";
    const isPast = new Date(reservation.reservationDate) < new Date();
    return isPast ? "Completed" : reservation.status === "confirmed" ? "Confirmed" : "Pending";
  };

  const statusStyles = {
    Cancelled:  "bg-red-500/10 text-red-400 border-red-500/20",
    Completed:  "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Confirmed:  "bg-green-500/10 text-green-400 border-green-500/20",
    Pending:    "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  };

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <div className="min-h-screen pt-24 px-6 max-w-5xl mx-auto bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">Table Reservations</h1>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center py-24">
          <div style={{
            width: 36, height: 36,
            border: "2px solid rgba(249,115,22,0.3)",
            borderTopColor: "#f97316",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <p className="text-red-400">{error}</p>
      )}

      {/* Empty */}
      {!loading && !error && reservations.length === 0 && (
        <p className="text-gray-400">No reservations found. Book a table from the Dine Out section!</p>
      )}

      {/* List */}
      {!loading && !error && reservations.length > 0 && (
        <div className="space-y-4">
          {reservations.map((res) => {
            const displayStatus  = getDisplayStatus(res);
            const isCancellable  = displayStatus !== "Cancelled" && displayStatus !== "Completed";
            const restaurantName = res.restaurant?.name || "Unknown Restaurant";

            return (
              <div
                key={res._id}
                className="bg-[#1A1A1A] p-6 rounded-xl border border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:border-orange-500/30 transition-all duration-300"
              >
                {/* LEFT — details */}
                <div className="flex gap-4 items-start">
                  {res.restaurant?.image && (
                    <img
                      src={res.restaurant.image}
                      alt={restaurantName}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0 hidden sm:block"
                    />
                  )}
                  <div>
                    <h2 className="text-white font-bold text-xl mb-3">{restaurantName}</h2>
                    <div className="space-y-1 text-sm text-gray-300">
                      <p className="flex items-center gap-2">
                        <span className="text-white/40">👥 Guests:</span>
                        <span className="text-white">{res.guests}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-white/40">📅 Date:</span>
                        <span className="text-white">{formatDateFull(res.reservationDate)}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-white/40">🕐 Time:</span>
                        <span className="text-white">{formatTime(res.reservationDate)}</span>
                      </p>
                      {res.customerName && (
                        <p className="flex items-center gap-2">
                          <span className="text-white/40">👤 Name:</span>
                          <span className="text-white">{res.customerName}</span>
                        </p>
                      )}
                      {res.phone && (
                        <p className="flex items-center gap-2">
                          <span className="text-white/40">📞 Phone:</span>
                          <span className="text-white">{res.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* RIGHT — status + cancel */}
                <div className="flex flex-row md:flex-col lg:flex-row items-center gap-3 self-end md:self-center">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold border capitalize ${statusStyles[displayStatus]}`}>
                    {displayStatus}
                  </span>
                  {isCancellable && (
                    <button
                      onClick={() => handleCancel(res._id)}
                      disabled={cancellingId === res._id}
                      className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-medium text-sm px-4 py-2 rounded-lg transition-all duration-200"
                    >
                      {cancellingId === res._id ? "Cancelling..." : "Cancel Table"}
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
