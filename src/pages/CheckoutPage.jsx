import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMapPin, FiCreditCard, FiCheckCircle, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import API from '../services/api';

const CheckoutPage = () => {
  const { cart, total, count, dispatch } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const discount = location.state?.discount || 0;
  const appliedCoupon = location.state?.appliedCoupon || null;

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });
  const [payMethod, setPayMethod] = useState('cod');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [placedOrder, setPlacedOrder] = useState(null);

  const delivery = 49;
  const taxes = Math.round(total * 0.05);
  const grandTotal = total + delivery + taxes - discount;

  const handleOrder = async () => {
    setLoading(true);
    setError('');

    try {
     const orderPayload = {
  restaurantId: cart.restaurantId,
  items: cart.items.map((item) => ({
    menuItemId: item.id,
    quantity: item.qty,
  })),
  deliveryAddress: `${form.name}, ${form.phone}, ${form.address}, ${form.city} - ${form.pincode}`,
  paymentMethod: payMethod === 'cod' ? 'cash' : payMethod,
};

      const { data } = await API.post('/orders', orderPayload);

      dispatch({ type: 'CLEAR_CART' });
      setPlacedOrder(data.order);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        'Failed to place order. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // ── Success screen ────────────────────────────────────
 if (placedOrder) {
  return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/30">
          <FiCheckCircle className="text-white text-4xl" />
        </div>
        <h2 className="font-display font-bold text-white text-3xl mb-2">
          Order Placed!
        </h2>
        <p className="text-white/50 mb-2">
          Order #{placedOrder._id?.slice(-6).toUpperCase()}
        </p>

       

       

        <div className="flex gap-3 justify-center">
          <Link to="/my-orders" className="btn-primary inline-block">
            View My Orders
          </Link>
          <Link
            to="/food"
            className="px-5 py-2.5 border border-white/10 text-white/60 rounded-xl text-sm hover:border-white/30 transition-all"
          >
            Order More
          </Link>
        </div>
      </div>
    </div>
  );
}
  return (
    <div className="min-h-screen pt-24 pb-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link to="/cart" className="text-white/40 hover:text-white transition-colors">
            <FiArrowLeft className="text-xl" />
          </Link>
          <h1 className="font-display font-bold text-white text-3xl">Checkout</h1>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-4 mb-8">
          {[{ n: 1, label: 'Delivery' }, { n: 2, label: 'Payment' }].map((s) => (
            <React.Fragment key={s.n}>
              <div className={`flex items-center gap-2 ${step >= s.n ? 'text-orange-400' : 'text-white/30'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= s.n
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                    : 'bg-white/10 text-white/30'
                }`}>
                  {s.n}
                </div>
                <span className="text-sm font-medium hidden sm:block">{s.label}</span>
              </div>
              {s.n < 2 && (
                <div className={`flex-1 h-0.5 ${
                  step > s.n ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-white/10'
                } max-w-16`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left panel */}
          <div className="lg:col-span-2">

            {/* Step 1 — Delivery Address */}
            {step === 1 && (
              <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <FiMapPin className="text-orange-400 text-lg" />
                  <h2 className="font-display font-semibold text-white text-lg">
                    Delivery Address
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: 'name',    label: 'Full Name',       placeholder: 'John Doe',              type: 'text', full: false },
                    { key: 'phone',   label: 'Phone Number',    placeholder: '+91 98765 43210',        type: 'tel',  full: false },
                    { key: 'address', label: 'Street Address',  placeholder: 'House no, Street, Area', type: 'text', full: true  },
                    { key: 'city',    label: 'City',            placeholder: 'Bengaluru',              type: 'text', full: false },
                    { key: 'pincode', label: 'Pincode',         placeholder: '560001',                 type: 'text', full: false },
                  ].map((f) => (
                    <div key={f.key} className={f.full ? 'sm:col-span-2' : ''}>
                      <label className="text-white/50 text-xs font-medium mb-1.5 block">
                        {f.label}
                      </label>
                      <input
                        type={f.type}
                        value={form[f.key]}
                        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                        placeholder={f.placeholder}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-orange-500/50 transition-all"
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    if (!form.name || !form.phone || !form.address || !form.city || !form.pincode) {
                      setError('Please fill in all delivery details.');
                      return;
                    }
                    setError('');
                    setStep(2);
                  }}
                  className="mt-6 w-full btn-primary py-3.5"
                >
                  Continue to Payment →
                </button>
                {error && (
                  <p className="mt-3 text-red-400 text-sm text-center">{error}</p>
                )}
              </div>
            )}

            {/* Step 2 — Payment */}
            {step === 2 && (
              <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <FiCreditCard className="text-orange-400 text-lg" />
                  <h2 className="font-display font-semibold text-white text-lg">
                    Payment Method
                  </h2>
                </div>
                <div className="space-y-3 mb-6">
                  {[
                    { id: 'card', label: 'Credit / Debit Card',       icon: '💳' },
                    { id: 'upi',  label: 'UPI (GPay, PhonePe, Paytm)', icon: '📱' },
                    { id: 'cod',  label: 'Cash on Delivery',           icon: '💵' },
                  ].map((pm) => (
                    <label
                      key={pm.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                        payMethod === pm.id
                          ? 'border-orange-500/50 bg-orange-500/5'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={pm.id}
                        checked={payMethod === pm.id}
                        onChange={() => setPayMethod(pm.id)}
                        className="accent-orange-500"
                      />
                      <span className="text-xl">{pm.icon}</span>
                      <span className="text-white text-sm font-medium">{pm.label}</span>
                    </label>
                  ))}
                </div>

                {/* Card fields — UI only until Razorpay is integrated */}
                {payMethod === 'card' && (
                  <div className="space-y-3 mb-6">
                    <input
                      placeholder="Card number"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-orange-500/50"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        placeholder="MM / YY"
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-orange-500/50"
                      />
                      <input
                        placeholder="CVV"
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-orange-500/50"
                      />
                    </div>
                  </div>
                )}

                {error && (
                  <p className="mb-4 text-red-400 text-sm text-center">{error}</p>
                )}

                <button
                  onClick={handleOrder}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    `Place Order · ₹${grandTotal}`
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 p-5 h-fit sticky top-24">
            <h3 className="font-semibold text-white mb-4 text-sm">
              Order Summary ({count} items)
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto mb-4">
              {cart.items.map((item) => (
                <div key={item.id} className="flex justify-between text-xs text-white/50">
                  <span className="truncate mr-2">{item.name} × {item.qty}</span>
                  <span className="flex-shrink-0">₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-3 space-y-2">
              <div className="flex justify-between text-xs text-white/40">
                <span>Subtotal</span><span>₹{total}</span>
              </div>
              <div className="flex justify-between text-xs text-white/40">
                <span>Delivery</span><span>₹{delivery}</span>
              </div>
              <div className="flex justify-between text-xs text-white/40">
                <span>Taxes</span><span>₹{taxes}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-xs text-green-400">
                  <span>Discount ({appliedCoupon})</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-white pt-1 border-t border-white/10">
                <span>Total</span>
                <span className="text-orange-400">₹{grandTotal}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;