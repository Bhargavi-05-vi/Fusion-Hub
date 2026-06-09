import React, { useEffect, useState } from "react";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState({});
  const [currentTime, setCurrentTime] = useState(Date.now());

  // 1. Initial Load from LocalStorage
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const savedReviews = JSON.parse(localStorage.getItem("reviews")) || {};

    setOrders(savedOrders);
    setReviews(savedReviews);
  }, []);

  // 2. Combined Clock & Order Expiry Check (Prevents Infinite Loop)
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      setCurrentTime(now);

      setOrders((prevOrders) => {
        let hasChanges = false;

        const updated = prevOrders.map((order) => {
          if (order.status === "Pending" && now > order.cancelUntil) {
            hasChanges = true;
            return {
              ...order,
              status: "Placed Successfully",
            };
          }
          return order;
        });

        // Only update localStorage and state if an order actually expired
        if (hasChanges) {
          localStorage.setItem("orders", JSON.stringify(updated));
          return updated;
        }
        return prevOrders;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 3. Cancel Order Handler
  const cancelOrder = (orderId) => {
    setOrders((prevOrders) => {
      const updated = prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: "Cancelled" } : order
      );
      localStorage.setItem("orders", JSON.stringify(updated));
      return updated;
    });
    alert("Order cancelled successfully ❌");
  };

  const getRatingEmoji = (rating) => {
    switch (rating) {
      case 1: return "😞 Very Bad";
      case 2: return "😕 Bad";
      case 3: return "😐 Average";
      case 4: return "😊 Good";
      case 5: return "🤩 Excellent";
      default: return "";
    }
  };

  const saveReview = (itemId, rating, comment) => {
    const updatedReviews = {
      ...reviews,
      [itemId]: { rating, comment },
    };

    setReviews(updatedReviews);
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
  };

  const handleRating = (itemId, rating) => {
    const existingComment = reviews[itemId]?.comment || "";
    saveReview(itemId, rating, existingComment);
  };

  const handleCommentChange = (itemId, comment) => {
    const existingRating = reviews[itemId]?.rating || 0;
    saveReview(itemId, existingRating, comment);
  };

  const handleSubmitReview = (itemId) => {
    if (!reviews[itemId]?.rating) {
      alert("Please select a rating first ⭐");
      return;
    }
    alert(`Review submitted successfully!\n${getRatingEmoji(reviews[itemId].rating)}`);
  };

  const handleDeleteReview = (itemId) => {
    const updatedReviews = { ...reviews };
    delete updatedReviews[itemId];

    setReviews(updatedReviews);
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    alert("Review deleted successfully 🗑️");
  };

  const getRemainingTime = (cancelUntil) => {
    const remaining = Math.max(0, cancelUntil - currentTime);
    const minutes = Math.floor(remaining / 1000 / 60);
    const seconds = Math.floor((remaining / 1000) % 60);

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen pt-24 px-6 bg-black text-white">
      <h1 className="text-3xl font-bold text-white mb-6">Purchase History</h1>

      {orders.length === 0 ? (
        <div className="text-white/60">No orders found</div>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-[#1A1A1A] rounded-xl border border-white/10 p-5 mb-6"
          >
            {/* Order Header */}
            <div className="flex justify-between items-center">
              <h3 className="text-white font-bold">Order #{order.id}</h3>
              <span className="text-orange-400 font-semibold">₹{order.total}</span>
            </div>

            <p className="text-white/50 text-sm mt-1">
              {new Date(order.date).toLocaleString()}
            </p>

            <p className={`mt-2 font-medium ${order.status === 'Cancelled' ? 'text-red-500' : 'text-green-400'}`}>
              {order.status}
            </p>

            {/* FIXED: Cancellation Logic moved outside of items iteration to Order level */}
            {order.status === "Pending" && (
              <div className="mt-3 p-3 bg-white/5 rounded-lg border border-white/15 max-w-xs">
                <p className="text-sm text-white/70">Auto Confirm In:</p>
                <p className="text-xl font-bold text-orange-400">
                  {getRemainingTime(order.cancelUntil)}
                </p>
                <button
                  onClick={() => cancelOrder(order.id)}
                  className="mt-2 w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-medium transition-all text-sm"
                >
                  Cancel Order
                </button>
              </div>
            )}

            {/* Items Ordered List */}
            <div className="mt-4 space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="border border-white/10 rounded-lg p-4 bg-zinc-900/50"
                >
                  <div className="flex justify-between text-white">
                    <span>{item.name} × {item.qty}</span>
                    <span>₹{item.price * item.qty}</span>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex gap-2 mt-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRating(item.id, star)}
                        className={`text-2xl transition-all hover:scale-125 ${
                          (reviews[item.id]?.rating || 0) >= star
                            ? "text-yellow-400"
                            : "text-gray-500"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>

                  {/* Emoji Reaction */}
                  {reviews[item.id]?.rating > 0 && (
                    <div className="mt-2 text-sm font-medium text-yellow-500">
                      {getRatingEmoji(reviews[item.id].rating)}
                    </div>
                  )}

                  {/* Review Comment Input */}
                  <textarea
                    value={reviews[item.id]?.comment || ""}
                    onChange={(e) => handleCommentChange(item.id, e.target.value)}
                    placeholder="Write your review..."
                    className="w-full mt-3 bg-black/30 border border-white/10 rounded-lg p-3 text-white placeholder:text-white/40 focus:outline-none focus:border-orange-500 text-sm"
                    rows="2"
                  />

                  {/* Actions */}
                  <div className="mt-3 flex gap-3 flex-wrap">
                    <button
                      onClick={() => handleSubmitReview(item.id)}
                      className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:scale-105 transition-all"
                    >
                      ✅ Submit Review
                    </button>

                    {reviews[item.id]?.rating > 0 && (
                      <button
                        onClick={() => handleDeleteReview(item.id)}
                        className="bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600 hover:text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-all"
                      >
                        🗑️ Delete Review
                      </button>
                    )}
                  </div>

                  {/* Saved Review Preview */}
                  {reviews[item.id]?.rating > 0 && (
                    <div className="mt-4 p-3 bg-black/40 rounded-lg border border-white/5">
                      <p className="text-green-400 font-medium text-xs">
                        Saved Review Summary:
                      </p>
                      <p className="text-sm mt-1 font-semibold">
                        {reviews[item.id].rating}/5 ⭐ — {getRatingEmoji(reviews[item.id].rating)}
                      </p>
                      {reviews[item.id]?.comment && (
                        <p className="text-white/70 text-sm mt-1 italic">
                          "{reviews[item.id].comment}"
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrdersPage;
