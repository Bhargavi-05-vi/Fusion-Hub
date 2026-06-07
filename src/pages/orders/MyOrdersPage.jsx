import React, { useEffect, useState } from "react";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState({});

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const savedReviews =
      JSON.parse(localStorage.getItem("reviews")) || {};

    setOrders(savedOrders);
    setReviews(savedReviews);
  }, []);

  const getRatingEmoji = (rating) => {
    switch (rating) {
      case 1:
        return "😞 Very Bad";
      case 2:
        return "😕 Bad";
      case 3:
        return "😐 Average";
      case 4:
        return "😊 Good";
      case 5:
        return "🤩 Excellent";
      default:
        return "";
    }
  };

  const saveReview = (itemId, rating, comment) => {
    const updatedReviews = {
      ...reviews,
      [itemId]: {
        rating,
        comment,
      },
    };

    setReviews(updatedReviews);

    localStorage.setItem(
      "reviews",
      JSON.stringify(updatedReviews)
    );
  };

  const handleRating = (itemId, rating) => {
    const existingComment =
      reviews[itemId]?.comment || "";

    saveReview(itemId, rating, existingComment);
  };

  const handleCommentChange = (itemId, comment) => {
    const existingRating =
      reviews[itemId]?.rating || 0;

    saveReview(itemId, existingRating, comment);
  };

  const handleSubmitReview = (itemId) => {
    if (!reviews[itemId]?.rating) {
      alert("Please select a rating first ⭐");
      return;
    }

    alert(
      `Review submitted successfully!\n${getRatingEmoji(
        reviews[itemId].rating
      )}`
    );
  };

  const handleDeleteReview = (itemId) => {
    const updatedReviews = { ...reviews };

    delete updatedReviews[itemId];

    setReviews(updatedReviews);

    localStorage.setItem(
      "reviews",
      JSON.stringify(updatedReviews)
    );

    alert("Review deleted successfully 🗑️");
  };

  return (
    <div className="min-h-screen pt-24 px-6">
      <h1 className="text-3xl font-bold text-white mb-6">
        Purchase History
      </h1>

      {orders.length === 0 ? (
        <div className="text-white/60">
          No orders found
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-[#1A1A1A] rounded-xl border border-white/10 p-5 mb-6"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-white font-bold">
                Order #{order.id}
              </h3>

              <span className="text-orange-400 font-semibold">
                ₹{order.total}
              </span>
            </div>

            <p className="text-white/50 text-sm mt-1">
              {new Date(order.date).toLocaleString()}
            </p>

            <p className="text-green-400 mt-2 font-medium">
              {order.status}
            </p>

            <div className="mt-4 space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="border border-white/10 rounded-lg p-4"
                >
                  <div className="flex justify-between text-white">
                    <span>
                      {item.name} × {item.qty}
                    </span>

                    <span>
                      ₹{item.price * item.qty}
                    </span>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex gap-2 mt-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() =>
                          handleRating(item.id, star)
                        }
                        className={`text-2xl transition-all hover:scale-125 ${
                          (reviews[item.id]?.rating || 0) >=
                          star
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
                    <div className="mt-2 text-lg font-medium">
                      {getRatingEmoji(
                        reviews[item.id].rating
                      )}
                    </div>
                  )}

                  {/* Review Comment */}
                  <textarea
                    value={
                      reviews[item.id]?.comment || ""
                    }
                    onChange={(e) =>
                      handleCommentChange(
                        item.id,
                        e.target.value
                      )
                    }
                    placeholder="Write your review..."
                    className="w-full mt-3 bg-black/30 border border-white/10 rounded-lg p-3 text-white placeholder:text-white/40 focus:outline-none focus:border-orange-500"
                    rows="3"
                  />

                  {/* Buttons */}
                  <div className="mt-3 flex gap-3 flex-wrap">
                    <button
                      onClick={() =>
                        handleSubmitReview(item.id)
                      }
                      className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-2 rounded-lg font-semibold hover:scale-105 transition-all"
                    >
                      ✅ Submit Review
                    </button>

                    {reviews[item.id]?.rating > 0 && (
                      <button
                        onClick={() =>
                          handleDeleteReview(item.id)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold transition-all"
                      >
                        🗑️ Delete Review
                      </button>
                    )}
                  </div>

                  {/* Saved Review Preview */}
                  {reviews[item.id]?.rating > 0 && (
                    <div className="mt-4 p-3 bg-black/20 rounded-lg border border-white/5">
                      <p className="text-green-400 font-medium">
                        Rating:{" "}
                        {reviews[item.id].rating}/5 ⭐
                      </p>

                      <p className="text-lg mt-1">
                        {getRatingEmoji(
                          reviews[item.id].rating
                        )}
                      </p>

                      {reviews[item.id]?.comment && (
                        <p className="text-white/70 mt-2 italic">
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
