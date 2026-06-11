import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';

// ── Helpers ───────────────────────────────────────────
const STATUS_STYLES = {
  PLACED:            'bg-orange-500/10 text-orange-400',
  ACCEPTED:          'bg-blue-500/10 text-blue-400',
  PREPARING:         'bg-yellow-500/10 text-yellow-400',
  OUT_FOR_DELIVERY:  'bg-purple-500/10 text-purple-400',
  DELIVERED:         'bg-green-500/10 text-green-400',
  CANCELLED:         'bg-red-500/10 text-red-400',
};

const CANCELLABLE_STATUSES = ['PLACED'];

const getRatingEmoji = (rating) => {
  const map = { 1: '😞 Very Bad', 2: '😕 Bad', 3: '😐 Average', 4: '😊 Good', 5: '🤩 Excellent' };
  return map[rating] || '';
};

// ── Component ─────────────────────────────────────────
const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Reviews are kept local only (for display); in a real app POST to /api/reviews
  const [reviews, setReviews] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('fh_reviews')) || {};
    } catch {
      return {};
    }
  });

  // ── Fetch orders from backend ─────────────────────────
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const { data } = await API.get('/orders/my-orders');
      setOrders(data.orders || []);
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to load orders.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // ── Cancel order ──────────────────────────────────────
  const cancelOrder = async (orderId) => {
    if (!window.confirm('Cancel this order?')) return;
    try {
      await API.patch(`/orders/${orderId}/status`, { status: 'Cancelled' });
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status: 'Cancelled' } : o
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel order.');
    }
  };

  // ── Reviews (local persistence) ───────────────────────
  const saveReview = (itemId, rating, comment) => {
    const updated = { ...reviews, [itemId]: { rating, comment } };
    setReviews(updated);
    localStorage.setItem('fh_reviews', JSON.stringify(updated));
  };

  const handleRating = (itemId, rating) =>
    saveReview(itemId, rating, reviews[itemId]?.comment || '');

  const handleCommentChange = (itemId, comment) =>
    saveReview(itemId, reviews[itemId]?.rating || 0, comment);

  const handleSubmitReview = (itemId) => {
    if (!reviews[itemId]?.rating) {
      alert('Please select a rating first ⭐');
      return;
    }
    alert('Review submitted ✅');
  };

  const deleteReview = (itemId) => {
    const updated = { ...reviews };
    delete updated[itemId];
    setReviews(updated);
    localStorage.setItem('fh_reviews', JSON.stringify(updated));
  };

  // ── Render ────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 px-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={fetchOrders}
            className="px-5 py-2.5 bg-orange-500 text-white rounded-xl text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-6 bg-black text-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Orders</h1>
          <button
            onClick={fetchOrders}
            className="text-sm text-orange-400 hover:text-orange-300 transition-colors"
          >
            ↻ Refresh
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-gray-400 mb-6">No orders yet.</p>
            <Link
              to="/food"
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl"
            >
              Order Food
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const isCancellable = CANCELLABLE_STATUSES.includes(order.status);
              const statusClass =
                STATUS_STYLES[order.status] || 'bg-white/10 text-white/60';

              return (
                <div
                  key={order._id}
                  className="bg-[#1A1A1A] border border-white/10 rounded-xl p-5"
                >
                  {/* Order header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="font-bold text-lg">
                        Order #{order._id.slice(-6).toUpperCase()}
                      </h2>
                      {order.createdAt && (
                        <p className="text-gray-400 text-sm">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                      )}
                      {order.restaurant?.name && (
                        <p className="text-orange-400 text-sm mt-0.5">
                          {order.restaurant.name}
                        </p>
                      )}
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${statusClass}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Cancel button */}
                  {isCancellable && (
                    <div className="mb-4">
                      <button
                        onClick={() => cancelOrder(order._id)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition"
                      >
                        Cancel Order
                      </button>
                    </div>
                  )}

                  {/* Delivery address */}
                  {order.deliveryAddress && (
  <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10 text-sm text-gray-400">
    📍 {order.deliveryAddress}
  </div>
)}


                  {/* Items */}
                  <h3 className="font-semibold text-orange-400 mb-3">Items</h3>
                  {(order.items || []).map((item) => {
                    const itemId = item.menuItem?._id || item.menuItem;
                    const itemName = item.menuItem?.name || 'Item';

                    return (
                      <div
                        key={itemId}
                        className="mb-4 border border-white/10 rounded-lg p-4"
                      >
                        <div className="flex justify-between mb-3">
                          <span>
                            {itemName} × {item.quantity}
                          </span>
                          <span>₹{item.price * item.quantity}</span>
                        </div>

                        {/* Star rating */}
                        <div className="flex gap-2 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => handleRating(itemId, star)}
                              className={`text-2xl ${
                                (reviews[itemId]?.rating || 0) >= star
                                  ? 'text-yellow-400'
                                  : 'text-gray-500'
                              }`}
                            >
                              ★
                            </button>
                          ))}
                        </div>

                        {reviews[itemId]?.rating && (
                          <p className="text-yellow-400 mb-2 text-sm">
                            {getRatingEmoji(reviews[itemId].rating)}
                          </p>
                        )}

                        <textarea
                          rows="2"
                          value={reviews[itemId]?.comment || ''}
                          onChange={(e) =>
                            handleCommentChange(itemId, e.target.value)
                          }
                          placeholder="Write a review..."
                          className="w-full bg-black border border-white/10 rounded-lg p-3 text-white text-sm"
                        />

                        <div className="flex gap-3 mt-3">
                          <button
                            onClick={() => handleSubmitReview(itemId)}
                            className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm transition"
                          >
                            Submit Review
                          </button>
                          {reviews[itemId]?.rating && (
                            <button
                              onClick={() => deleteReview(itemId)}
                              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm transition"
                            >
                              Delete Review
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Total */}
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-gray-400 text-sm">
                      Payment: {order.paymentMethod || 'COD'}
                    </span>
                    <span className="font-bold text-orange-400">
                      Total: ₹{order.totalAmount || 0}

                    </span>
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