import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiTrash2,
  FiPlus,
  FiMinus,
  FiShoppingBag,
  FiArrowRight,
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { coupons } from '../data/coupons';

const CartPage = () => {
  const { cart, dispatch, total, count } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');

  const delivery = total > 0 ? 49 : 0;
  const taxes = Math.round(total * 0.05);

  const grandTotal = total + delivery + taxes - discount;

  const applyCoupon = () => {
    const coupon = coupons.find(
      (c) => c.code === couponCode.toUpperCase()
    );

    if (!coupon) {
      setCouponMessage('❌ Invalid coupon code');
      setDiscount(0);
      return;
    }

    if (total < coupon.minOrder) {
      setCouponMessage(
        `❌ Minimum order amount is ₹${coupon.minOrder}`
      );
      setDiscount(0);
      return;
    }

    let discountAmount = 0;

    if (coupon.type === 'flat') {
      discountAmount = coupon.value;
    }

    if (coupon.type === 'percent') {
      discountAmount = (total * coupon.value) / 100;

      if (coupon.maxDiscount) {
        discountAmount = Math.min(
          discountAmount,
          coupon.maxDiscount
        );
      }
    }

    setDiscount(discountAmount);

    setCouponMessage(
      `🎉 Coupon Applied! You saved ₹${discountAmount}`
    );
  };

  if (cart.items.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <div className="text-8xl mb-6">🛒</div>

          <h2 className="font-display font-bold text-white text-2xl mb-2">
            Your cart is empty
          </h2>

          <p className="text-white/40 mb-8">
            Add some delicious food to get started!
          </p>

          <Link
            to="/food"
            className="btn-primary inline-flex items-center gap-2"
          >
            <FiShoppingBag />
            Browse Restaurants
          </Link>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen pt-24 pb-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display font-bold text-white text-3xl mb-8">
          Your Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-[#1A1A1A] rounded-2xl p-4 border border-white/5"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-16 rounded-xl object-cover flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-sm truncate">
                    {item.name}
                  </h3>

                  <p className="text-white/40 text-xs mt-0.5">
                    ₹{item.price} each
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      dispatch({
                        type: 'UPDATE_QTY',
                        payload: {
                          id: item.id,
                          qty: item.qty - 1,
                        },
                      })
                    }
                    className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white"
                  >
                    <FiMinus className="text-xs" />
                  </button>

                  <span className="text-white font-bold w-6 text-center text-sm">
                    {item.qty}
                  </span>

                  <button
                    onClick={() =>
                      dispatch({
                        type: 'UPDATE_QTY',
                        payload: {
                          id: item.id,
                          qty: item.qty + 1,
                        },
                      })
                    }
                    className="w-7 h-7 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400"
                  >
                    <FiPlus className="text-xs" />
                  </button>
                </div>

                <div className="text-white font-bold text-sm w-16 text-right">
                  ₹{item.price * item.qty}
                </div>

                <button
                  onClick={() =>
                    dispatch({
                      type: 'REMOVE_ITEM',
                      payload: item.id,
                    })
                  }
                  className="text-white/30 hover:text-red-400"
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 p-6 sticky top-24">
              <h3 className="font-display font-bold text-white text-lg mb-5">
                Order Summary
              </h3>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">
                    Subtotal ({count} items)
                  </span>
                  <span className="text-white">
                    ₹{total}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-white/40">
                    Delivery Fee
                  </span>
                  <span className="text-white">
                    ₹{delivery}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-white/40">
                    Taxes & Fees
                  </span>
                  <span className="text-white">
                    ₹{taxes}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-400">
                      Discount
                    </span>

                    <span className="text-green-400">
                      -₹{discount}
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t border-white/10 pt-4 mb-5">
                <div className="flex justify-between">
                  <span className="font-bold text-white">
                    Total
                  </span>

                  <span className="font-bold text-orange-400 text-lg">
                    ₹{grandTotal}
                  </span>
                </div>
              </div>

              {/* Coupon Section */}
              <div className="mb-5">
                <div className="flex gap-2">
                  <input
                    value={couponCode}
                    onChange={(e) =>
                      setCouponCode(e.target.value)
                    }
                    placeholder="Coupon code"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm placeholder-white/30 outline-none focus:border-orange-500/50"
                  />

                  <button
                    onClick={applyCoupon}
                    className="border border-orange-500/50 text-orange-400 px-3 py-2 rounded-xl text-sm font-semibold hover:bg-orange-500 hover:text-white transition-all"
                  >
                    Apply
                  </button>
                </div>

                {couponMessage && (
                  <p className="mt-2 text-sm text-green-400">
                    {couponMessage}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 mt-3">
                  {[
                    'WELCOME50',
                    'SAVE20',
                    'FOODIE30',
                    'FUSION100',
                  ].map((code) => (
                    <button
                      key={code}
                      onClick={() => setCouponCode(code)}
                      className="text-xs bg-orange-500/10 text-orange-400 px-3 py-1 rounded-full"
                    >
                      🔥 {code}
                    </button>
                  ))}
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-orange-500/30 transition-all hover:scale-105"
              >
                Proceed to Checkout
                <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
