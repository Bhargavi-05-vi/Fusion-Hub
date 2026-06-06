import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMapPin, FiCreditCard, FiCheckCircle, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import API from '../services/api';

const CheckoutPage = () => {
  const { cart, total, count, dispatch } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', phone: '', address: '', city: '', pincode: '' });
  const [payMethod, setPayMethod] = useState('card');
  const [ordered, setOrdered] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const delivery = 49;
  const taxes = Math.round(total * 0.05);
  const grandTotal = total + delivery + taxes;

  // Map frontend payment method values to backend-accepted enum values
  const paymentMethodMap = {
    card: 'card',
    upi: 'upi',
    cod: 'cash', // Backend Order model only accepts 'cash', not 'cod'
  };

  const handleOrder = async () => {
    setLoading(true);
    setError('');

    try {
      // Build the delivery address string from form fields
      const deliveryAddress = `${form.address}, ${form.city} - ${form.pincode}`;

      // Map cart items to the format the backend expects
      const items = cart.items.map(item => ({
        menuItemId: item.id,   // backend createOrder uses item.menuItemId
        quantity: item.qty,
      }));

      const payload = {
        restaurantId: cart.restaurantId,
        items,
        deliveryAddress,
        paymentMethod: paymentMethodMap[payMethod] || 'cash',
      };

      const response = await API.post('/orders', payload);

      if (response.data.success) {
        setOrderId(response.data.order._id);
        setOrdered(true);
        dispatch({ type: 'CLEAR_CART' });
      } else {
        setError(response.data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to place order. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (ordered) return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/30">
          <FiCheckCircle className="text-white text-4xl" />
        </div>
        <h2 className="font-display font-bold text-white text-3xl mb-2">Order Placed!</h2>
        <p className="text-white/50 mb-2">Order #{orderId ? orderId.slice(-6).toUpperCase() : 'N/A'}</p>
        <p className="text-white/40 text-sm mb-8">Your food is being prepared. Estimated delivery: 30-40 min</p>
        <Link to="/food" className="btn-primary inline-block">Order More Food</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/cart" className="text-white/40 hover:text-white transition-colors"><FiArrowLeft className="text-xl" /></Link>
          <h1 className="font-display font-bold text-white text-3xl">Checkout</h1>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-4 mb-8">
          {[{ n: 1, label: 'Delivery' }, { n: 2, label: 'Payment' }].map(s => (
            <React.Fragment key={s.n}>
              <div className={`flex items-center gap-2 ${step >= s.n ? 'text-orange-400' : 'text-white/30'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s.n ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' : 'bg-white/10 text-white/30'}`}>{s.n}</div>
                <span className="text-sm font-medium hidden sm:block">{s.label}</span>
              </div>
              {s.n < 2 && <div className={`flex-1 h-0.5 ${step > s.n ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-white/10'} max-w-16`}></div>}
            </React.Fragment>
          ))}
        </div>

        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <FiMapPin className="text-orange-400 text-lg" />
                  <h2 className="font-display font-semibold text-white text-lg">Delivery Address</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: 'name', label: 'Full Name', placeholder: 'John Doe', type: 'text', full: false },
                    { key: 'phone', label: 'Phone Number', placeholder: '+91 98765 43210', type: 'tel', full: false },
                    { key: 'address', label: 'Street Address', placeholder: 'House no, Street, Area', type: 'text', full: true },
                    { key: 'city', label: 'City', placeholder: 'Bengaluru', type: 'text', full: false },
                    { key: 'pincode', label: 'Pincode', placeholder: '560001', type: 'text', full: false },
                  ].map(f => (
                    <div key={f.key} className={f.full ? 'sm:col-span-2' : ''}>
                      <label className="text-white/50 text-xs font-medium mb-1.5 block">{f.label}</label>
                      <input type={f.type} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        placeholder={f.placeholder}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-orange-500/50 transition-all" />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setStep(2)}
                  disabled={!form.address || !form.city || !form.pincode}
                  className="mt-6 w-full btn-primary py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Payment →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <FiCreditCard className="text-orange-400 text-lg" />
                  <h2 className="font-display font-semibold text-white text-lg">Payment Method</h2>
                </div>
                <div className="space-y-3 mb-6">
                  {[
                    { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
                    { id: 'upi', label: 'UPI (GPay, PhonePe, Paytm)', icon: '📱' },
                    { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
                  ].map(pm => (
                    <label key={pm.id} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${payMethod === pm.id ? 'border-orange-500/50 bg-orange-500/5' : 'border-white/10 hover:border-white/20'}`}>
                      <input type="radio" name="payment" value={pm.id} checked={payMethod === pm.id} onChange={() => setPayMethod(pm.id)} className="accent-orange-500" />
                      <span className="text-xl">{pm.icon}</span>
                      <span className="text-white text-sm font-medium">{pm.label}</span>
                    </label>
                  ))}
                </div>
                {payMethod === 'card' && (
                  <div className="space-y-3 mb-6">
                    <input placeholder="Card number" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-orange-500/50" />
                    <div className="grid grid-cols-2 gap-3">
                      <input placeholder="MM / YY" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-orange-500/50" />
                      <input placeholder="CVV" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-orange-500/50" />
                    </div>
                  </div>
                )}
                <button
                  onClick={handleOrder}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? 'Placing Order...' : `Place Order · ₹${grandTotal}`}
                </button>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 p-5 h-fit sticky top-24">
            <h3 className="font-semibold text-white mb-4 text-sm">Order Summary ({count} items)</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto mb-4">
              {cart.items.map(item => (
                <div key={item.id} className="flex justify-between text-xs text-white/50">
                  <span className="truncate mr-2">{item.name} × {item.qty}</span>
                  <span className="flex-shrink-0">₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-3 space-y-2">
              <div className="flex justify-between text-xs text-white/40"><span>Subtotal</span><span>₹{total}</span></div>
              <div className="flex justify-between text-xs text-white/40"><span>Delivery</span><span>₹{delivery}</span></div>
              <div className="flex justify-between text-xs text-white/40"><span>Taxes</span><span>₹{taxes}</span></div>
              <div className="flex justify-between font-bold text-white pt-1 border-t border-white/10"><span>Total</span><span className="text-orange-400">₹{grandTotal}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
