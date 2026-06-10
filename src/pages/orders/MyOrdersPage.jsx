import React, { useEffect, useState } from "react";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState({});
  const [currentTime, setCurrentTime] = useState(Date.now());

  // 1. Load initial data from localStorage
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const savedReviews = JSON.parse(localStorage.getItem("reviews")) || {};

    // Mock/Fallback injector: If orders exist but lack 'cancelUntil', 
    // we safely inject a 1-minute window for demonstration purposes.
    const normalizedOrders = savedOrders.map(order => {
      if ((order.status === "Pending" || order.status === "Placed" || !order.status) && !order.cancelUntil) {
        return {
          ...order,
          status: order.status || "Pending",
          cancelUntil: (order.date ? new Date(order.date).getTime() : Date.now()) + 60000 // 1 minute window
        };
      }
      return order;
    });

    setOrders(normalizedOrders);
    setReviews(savedReviews);
  }, []);

  // 2. Centralized 1-second clock + order status auto-updater
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      setCurrentTime(now);

      // Check if any order needs its status updated from Pending -> Confirmed
      setOrders((prevOrders) => {
        let hasChanges = false;
        
        const updated = prevOrders.map((order) => {
          const isPending = order.status === "Pending" || order.status === "Placed" || !order.status;
          
          if (isPending && order.cancelUntil && now > order.cancelUntil) {
            hasChanges = true;
            return { ...order, status: "Confirmed" };
          }
          return order;
        });

        if (hasChanges) {
          localStorage.setItem("orders", JSON.stringify(updated));
          return updated;
        }
        
        return prevOrders; // Return exact same reference if no changes occurred
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const cancelOrder = (id) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: "Cancelled" } : order
    );

    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    alert("Order cancelled successfully ❌");
  };

  const getRemainingTime = (cancelUntil) => {
    const remaining = Math.max(0, cancelUntil - currentTime);
    const minutes = Math.floor(remaining / 1000 / 60);
    const seconds = Math.floor((remaining / 1000) % 60);

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
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
    const comment = reviews[itemId]?.comment || "";
    saveReview(itemId, rating, comment);
  };

  const handleCommentChange = (itemId, comment) => {
    const rating = reviews[itemId]?.rating || 0;
    saveReview(itemId, rating, comment);
  };

  const handleSubmitReview = (itemId) => {
    if (!reviews[itemId]?.rating) {
      alert("Please select rating first ⭐");
      return;
    }
    alert("Review submitted successfully ✅");
  };

  const deleteReview = (itemId) => {
    const updated = { ...reviews };
    delete updated[itemId];
    setReviews(updated);
    localStorage.setItem("reviews", JSON.stringify(updated));
    alert("Review deleted 🗑️");
  };

  const foodOrders = orders.filter((order) => order.items);

  return (
    <div className="min-h-screen pt-24 px-6 bg-black text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Purchase History</h1>

        {foodOrders.length === 0 ? (
          <p className="text-gray-400">No orders found.</p>
        ) : (
          <div className="space-y-6">
            {foodOrders.map((order) => {
              const isPending = order.status === "Pending" || order.status === "Placed" || !order.status;
              
              return (
                <div key={order.id} className="bg-[#1A1A1A] border border-white/10 rounded-xl p-5">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h2 className="font-bold text-lg">Order #{order.id}</h2>
                      {order.date && (
                        <p className="text-gray-400 text-sm">
                          {new Date(order.date).toLocaleString()}
                        </p>
                      )}
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === "Cancelled"
                          ? "bg-red-500/10 text-red-400"
                          : isPending
                          ? "bg-orange-500/10 text-orange-400"
                          : "bg-green-500/10 text-green-400"
                      }`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </div>

                  {isPending && order.cancelUntil && (
                    <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
                      <p className="text-sm text-gray-400">Cancel available for:</p>
                      <p className="text-orange-400 text-xl font-bold">
                        {getRemainingTime(order.cancelUntil)}
                      </p>
                      <button
                        onClick={() => cancelOrder(order.id)}
                        className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition"
                      >
                        Cancel Order
                      </button>
                    </div>
                  )}

                  <h3 className="font-semibold text-orange-400 mb-3">Food Order</h3>

                  {order.items.map((item) => (
                    <div key={item.id} className="mb-4 border border-white/10 rounded-lg p-4">
                      <div className="flex justify-between mb-3">
                        <span>{item.name} × {item.qty}</span>
                        <span>₹{item.price * item.qty}</span>
                      </div>

                      <div className="flex gap-2 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => handleRating(item.id, star)}
                            className={`text-2xl ${
                              (reviews[item.id]?.rating || 0) >= star
                                ? "text-yellow-400"
                                : "text-gray-500"
                            }`}
                          >
                            ★
                          </button>
                        ))}
                      </div>

                      {reviews[item.id]?.rating && (
                        <p className="text-yellow-400 mb-2">
                          {getRatingEmoji(reviews[item.id].rating)}
                        </p>
                      )}

                      <textarea
                        rows="2"
                        value={reviews[item.id]?.comment || ""}
                        onChange={(e) => handleCommentChange(item.id, e.target.value)}
                        placeholder="Write review..."
                        className="w-full bg-black border border-white/10 rounded-lg p-3 text-white"
                      />

                      <div className="flex gap-3 mt-3">
                        <button
                          onClick={() => handleSubmitReview(item.id)}
                          className="bg-orange-500 px-4 py-2 rounded-lg text-sm"
                        >
                          Submit Review
                        </button>

                        {reviews[item.id]?.rating && (
                          <button
                            onClick={() => deleteReview(item.id)}
                            className="bg-red-600 px-4 py-2 rounded-lg text-sm"
                          >
                            Delete Review
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="mt-4 font-bold text-orange-400">
                    Total: ₹{order.total || 0}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
