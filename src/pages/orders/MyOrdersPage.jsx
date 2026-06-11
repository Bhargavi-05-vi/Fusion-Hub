import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';

const STATUS_STYLES = {
  PLACED:            'bg-orange-500/10 text-orange-400',
  ACCEPTED:          'bg-blue-500/10 text-blue-400',
  PREPARING:         'bg-yellow-500/10 text-yellow-400',
  OUT_FOR_DELIVERY:  'bg-purple-500/10 text-purple-400',
  DELIVERED:         'bg-green-500/10 text-green-400',
  CANCELLED:         'bg-red-500/10 text-red-400',
};

const getRatingEmoji = (rating) => {
  const map = { 1: '😞 Very Bad', 2: '😕 Bad', 3: '😐 Average', 4: '😊 Good', 5: '🤩 Excellent' };
  return map[rating] || '';
};

// ── Countdown timer component ─────────────────────────
const CancelCountdown = ({ createdAt, onExpire }) => {
  const getRemaining = () => {
    const ms = 10 * 60 * 1000 - (Date.now() - new Date(createdAt).getTime());
    return Math.max(0, ms);
  };

  const [remaining, setRemaining] = useState(getRemaining);

  useEffect(() => {
    if (remaining <= 0) { onExpire(); return; }
    const timer = setInterval(() => {
      const r = getRemaining();
      setRemaining(r);
      if (r <= 0) { clearInterval(timer); onExpire(); }
    }, 1000);
    return () => clearInterval(timer);
  }, [createdAt]);

  const mins = Math.floor(remaining / 60000);
  const secs = Math.floor((remaining % 60000) / 1000);
  const isUrgent = remaining < 5 * 60 * 1000;

  return (
    <span className={`text-xs font-mono ${isUrgent ? 'text-red-400' : 'text-white/40'}`}>
      {mins}:{secs.toString().padStart(2, '0')} left to cancel
    </span>
  );
};

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancellingId, setCancellingId] = useState(null);
  const [expiredOrders, setExpiredOrders] = useState(new Set());

  const [reviews, setReviews] = useState(() => {
    try { return JSON.parse(localStorage.getItem('fh_reviews')) || {}; }
    catch { return {}; }
  });

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const { data } = await API.get('/orders/my-orders');
      setOrders(data.orders || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load orders.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  // ── Cancel order ──────────────────────────────────────
  const cancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    setCancellingId(orderId);
    try {
      await API.patch(`/orders/${orderId}/cancel`);
      setOrders((prev) =>
        prev.map((o) => o._id === orderId ? { ...o, status: 'CANCELLED' } : o)
      );
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel order.');
    } finally {
      setCancellingId(null);
    }
  };

  const canCancel = (order) => {
    if (!['PLACED', 'ACCEPTED'].includes(order.status)) return false;
    if (expiredOrders.has(order._id)) return false;
    const diffMinutes = (Date.now() - new Date(order.createdAt).getTime()) / 60000;
    return diffMinutes <= 10;
  };

  // ── Reviews ───────────────────────────────────────────
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
    if (!reviews[itemId]?.rating) { alert('Please select a rating first ⭐'); return; }
    alert('Review submitted ✅');
  };

  const deleteReview = (itemId) => {
    const updated = { ...reviews };
    delete updated[itemId];
    setReviews(updated);
    localStorage.setItem('fh_reviews', JSON.stringify(updated));
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button onClick={fetchOrders} className="px-5 py-2.5 bg-orange-500 text-white rounded-xl text-sm">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 bg-black text-white">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">My Orders</h1>
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
              const statusClass = STATUS_STYLES[order.status] || 'bg-white/10 text-white/60';
              const allSteps = ['PLACED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED'];
              const currentIndex = allSteps.indexOf(order.status);

              return (
                <div key={order._id} className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-4 sm:p-5">

                  {/* ── Order Header ──────────────────── */}
                  <div className="flex justify-between items-start mb-4 gap-2">
                    <div>
                      <h2 className="font-bold text-base sm:text-lg">
                        Order #{order._id.slice(-6).toUpperCase()}
                      </h2>
                      {order.createdAt && (
                        <p className="text-gray-400 text-xs sm:text-sm">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                      )}
                      {order.restaurant?.name && (
                        <p className="text-orange-400 text-sm mt-0.5">
                          {order.restaurant.name}
                        </p>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold flex-shrink-0 ${statusClass}`}>
                      {order.status}
                    </span>
                  </div>



                  {order.status === 'CANCELLED' && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-4 text-center">
                      <p className="text-red-400 text-sm">❌ This order was cancelled</p>
                    </div>
                  )}

                  {/* ── Cancel Button with Countdown ── */}
                  {canCancel(order) && (
                    <div className="flex items-center justify-between bg-red-500/5 border border-red-500/20 rounded-xl px-4 py-3 mb-4">
                      <CancelCountdown
                        createdAt={order.createdAt}
                        onExpire={() =>
                          setExpiredOrders((prev) => new Set([...prev, order._id]))
                        }
                      />
                      <button
                        onClick={() => cancelOrder(order._id)}
                        disabled={cancellingId === order._id}
                        className="px-4 py-1.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-lg text-sm font-semibold transition-all"
                      >
                        {cancellingId === order._id ? 'Cancelling...' : 'Cancel Order'}
                      </button>
                    </div>
                  )}

                  {/* ── Delivery Address ──────────────── */}
                  {order.deliveryAddress && (
                    <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10 text-xs sm:text-sm text-gray-400">
                      📍 {order.deliveryAddress}
                    </div>
                  )}

                  {/* ── Items ─────────────────────────── */}
                  <h3 className="font-semibold text-orange-400 mb-3 text-sm">Items</h3>
                  {(order.items || []).map((item) => {
                    const itemId = item.menuItem?._id || item.menuItem;
                    const itemName = item.menuItem?.name || 'Item';
                    return (
                      <div key={itemId} className="mb-4 border border-white/10 rounded-lg p-3 sm:p-4">
                        <div className="flex justify-between mb-3 text-sm">
                          <span>{itemName} × {item.quantity}</span>
                          <span>₹{item.price * item.quantity}</span>
                        </div>

                        {order.status === 'DELIVERED' && (
                          <>
                            <div className="flex gap-1 sm:gap-2 mb-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  onClick={() => handleRating(itemId, star)}
                                  className={`text-xl sm:text-2xl transition-colors ${
                                    (reviews[itemId]?.rating || 0) >= star
                                      ? 'text-yellow-400'
                                      : 'text-gray-600 hover:text-gray-400'
                                  }`}
                                >★</button>
                              ))}
                            </div>
                            {reviews[itemId]?.rating && (
                              <p className="text-yellow-400 mb-2 text-xs sm:text-sm">
                                {getRatingEmoji(reviews[itemId].rating)}
                              </p>
                            )}
                            <textarea
                              rows="2"
                              value={reviews[itemId]?.comment || ''}
                              onChange={(e) => handleCommentChange(itemId, e.target.value)}
                              placeholder="Write a review..."
                              className="w-full bg-black border border-white/10 rounded-lg p-2 sm:p-3 text-white text-xs sm:text-sm resize-none"
                            />
                            <div className="flex gap-2 sm:gap-3 mt-2 sm:mt-3">
                              <button
                                onClick={() => handleSubmitReview(itemId)}
                                className="bg-orange-500 hover:bg-orange-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition"
                              >
                                Submit Review
                              </button>
                              {reviews[itemId]?.rating && (
                                <button
                                  onClick={() => deleteReview(itemId)}
                                  className="bg-red-600 hover:bg-red-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition"
                                >
                                  Delete Review
                                </button>
                              )}
                            </div>
                          </>
                        )}

                        {order.status !== 'DELIVERED' && (
                          <p className="text-white/20 text-xs mt-1">
                            Reviews available after delivery
                          </p>
                        )}
                      </div>
                    );
                  })}

                  {/* ── Total ─────────────────────────── */}
                  <div className="mt-4 flex justify-between items-center border-t border-white/10 pt-3">
                    <span className="text-gray-400 text-xs sm:text-sm">
                      Payment: {order.paymentMethod || 'cash'}
                    </span>
                    <span className="font-bold text-orange-400 text-sm sm:text-base">
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