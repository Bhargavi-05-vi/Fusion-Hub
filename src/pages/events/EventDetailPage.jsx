import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiMapPin, FiStar, FiCheckCircle } from 'react-icons/fi';
import { events } from '../../data/mockData';

const seats = {
  VIP: { price: 1000, label: "VIP", color: "from-yellow-500 to-orange-500", count: 20 },
  Premium: { price: 500, label: "Premium", color: "from-purple-600 to-pink-500", count: 50 },
  General: { price: 0, label: "General", color: "from-blue-500 to-cyan-500", count: 100 },
};

const EventDetailPage = () => {
  const { id } = useParams();
  const event = events.find(e => e.id === id);
  
  // Existing States
  const [selectedTier, setSelectedTier] = useState('General');
  const [qty, setQty] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [booked, setBooked] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // NEW: States for user-selected Date and Time Slot
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Existing State for Payment Details
  const [paymentDetails, setPaymentDetails] = useState({
    upiId: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    bankName: ''
  });

  if (!event) return <div className="min-h-screen flex items-center justify-center"><p className="text-white/40">Event not found</p></div>;

  const price = event.price + (seats[selectedTier]?.price || 0);
  const total = price * qty;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    const numericId = Date.now();
    const stringBookingId = `EV${Math.floor(Math.random() * 90000 + 10000)}`;

    let cleanDetails = {};
    if (paymentMethod === "UPI") {
      cleanDetails = { upiId: paymentDetails.upiId };
    } else if (paymentMethod === "Card") {
      cleanDetails = { 
        cardName: paymentDetails.cardName, 
        cardNumber: paymentDetails.cardNumber.replace(/\d(?=\d{4})/g, "*")
      };
    } else if (paymentMethod === "Net Banking") {
      cleanDetails = { bankName: paymentDetails.bankName };
    }

    // Assemble complete object, now including user specified Date & Time slots
    const eventOrder = {
      id: numericId,
      bookingId: stringBookingId,
      type: "EVENT",
      eventName: event.name,
      qty,
      total,
      paymentMethod,
      paymentDetails: cleanDetails,
      bookingDate: selectedDate, // 👈 Saved custom selection date
      bookingTime: selectedTime, // 👈 Saved custom selection time
      createdAt: new Date().toISOString(),
      status: "Confirmed",
      cancelUntil: Date.now() + 60000,
    };

    const existing = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([eventOrder, ...existing]));
    
    setConfirmedBooking(eventOrder);
    setBooked(true);
  };

  if (booked && confirmedBooking) return (
    <div className="min-h-screen flex items-center justify-center pt-16 px-4">
      <div className="text-center max-w-sm">
        <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/30">
          <FiCheckCircle className="text-white text-4xl" />
        </div>
        <h2 className="font-display font-bold text-white text-3xl mb-2">Tickets Booked!</h2>
        <p className="text-white/50 mb-1">Booking ID: {confirmedBooking.bookingId}</p>
        <p className="text-white/40 text-sm mb-1">{event.name}</p>
        
        {/* Updated Success View showing selected date/time details */}
        <p className="text-purple-400 text-xs mb-3">
          📅 {confirmedBooking.bookingDate} @ 🕐 {confirmedBooking.bookingTime}
        </p>

        <p className="text-white/30 text-xs mb-8">{qty} × {selectedTier} Ticket{qty > 1 ? 's' : ''} · ₹{total.toLocaleString()}</p>
        <div className="glass rounded-2xl p-4 mb-6">
          <p className="text-white/40 text-xs mb-2">Your QR Code</p>
          <div className="w-24 h-24 mx-auto bg-white rounded-xl flex items-center justify-center">
            <div className="grid grid-cols-5 gap-0.5 w-16 h-16">
              {[...Array(25)].map((_, i) => <div key={i} className={`${Math.random() > 0.5 ? 'bg-black' : 'bg-white'} rounded-sm`}></div>)}
            </div>
          </div>
        </div>
        <Link to="/events" className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold px-8 py-3 rounded-full hover:shadow-lg transition-all">Browse More Events</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-16">
      <div className="relative h-72 overflow-hidden">
        <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-black/50 to-transparent" />
        <div className="absolute top-6 left-6">
          <Link to="/events" className="flex items-center gap-2 glass rounded-full px-4 py-2 text-white text-sm"><FiArrowLeft /> Back</Link>
        </div>
        <div className="absolute top-3 right-6">
          <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">{event.category}</span>
        </div>
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="font-display font-bold text-white text-3xl mb-2">{event.name}</h1>
          <div className="flex items-center gap-4 text-sm text-white/60">
            <div className="flex items-center gap-1"><FiCalendar className="text-purple-400" />{event.date}</div>
            <div className="flex items-center gap-1"><FiMapPin className="text-purple-400" />{event.venue}</div>
            <div className="flex items-center gap-1"><FiStar className="text-yellow-400 fill-yellow-400" />{event.rating}</div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Container */}
          <div className="lg:col-span-2 space-y-6">
            {/* Ticket Tiers */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 p-6">
              <h3 className="font-display font-bold text-white text-lg mb-4">Choose Your Tier</h3>
              <div className="space-y-3">
                {Object.entries(seats).map(([tier, info]) => (
                  <label key={tier} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${selectedTier === tier ? 'border-purple-500/50 bg-purple-500/5' : 'border-white/10 hover:border-white/20'}`}>
                    <input type="radio" name="tier" value={tier} checked={selectedTier === tier} onChange={() => setSelectedTier(tier)} className="accent-purple-500" />
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${info.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>{tier[0]}</div>
                    <div className="flex-1">
                      <div className="text-white font-semibold text-sm">{info.label}</div>
                      <div className="text-white/30 text-xs">{info.count} seats available</div>
                    </div>
                    <div className="text-white font-bold">₹{(event.price + info.price).toLocaleString()}</div>
                  </label>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 p-5">
              <h3 className="font-semibold text-white mb-3 text-sm">Event Highlights</h3>
              <div className="flex flex-wrap gap-2">
                {event.tags.map(tag => <span key={tag} className="px-3 py-1 glass border border-white/10 text-white/50 text-xs rounded-full">{tag}</span>)}
              </div>
            </div>
          </div>

          {/* Booking Widget Column */}
          <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 p-6 h-fit sticky top-24">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-white text-2xl">₹{price.toLocaleString()}</span>
              {event.originalPrice > event.price && <span className="text-white/30 line-through text-sm">₹{event.originalPrice.toLocaleString()}</span>}
            </div>
            <p className="text-white/30 text-xs mb-5">per ticket · {selectedTier}</p>

            <div className="mb-5">
              <label className="text-white/50 text-xs mb-2 block">Number of Tickets</label>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-white hover:border-purple-500/30 text-lg transition-all">−</button>
                <span className="text-white font-bold text-xl w-8 text-center">{qty}</span>
                <button type="button" onClick={() => setQty(Math.min(10, qty + 1))} className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-white hover:border-purple-500/30 text-lg transition-all">+</button>
              </div>
            </div>

            {/* NEW: Date and Time Dropdown Fields inside checkout form */}
            <div className="grid grid-cols-2 gap-3 mb-5 border-t border-white/5 pt-4">
              <div>
                <label className="text-white/50 text-xs mb-1.5 block">Select Date</label>
                <input 
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-xl p-2.5 text-white text-xs focus:outline-none focus:border-purple-500 [color-scheme:dark]"
                  required
                />
              </div>
              <div>
                <label className="text-white/50 text-xs mb-1.5 block">Select Time</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-xl p-2.5 text-white text-xs focus:outline-none focus:border-purple-500 text-left"
                  required
                >
                  <option value="">-- Slots --</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="06:00 PM">06:00 PM</option>
                  <option value="09:00 PM">09:00 PM</option>
                </select>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-white/40">{qty} × ₹{price.toLocaleString()}</span>
                <span className="text-white font-bold">₹{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-white/50 text-xs mb-2 block">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-purple-500"
              >
                <option value="UPI">UPI</option>
                <option value="Card">Credit / Debit Card</option>
                <option value="Net Banking">Net Banking</option>
              </select>
            </div>

            {/* Conditional Payment Method Input Fields */}
            <div className="mb-6 space-y-3 dynamic-payment-fields">
              {paymentMethod === "UPI" && (
                <div>
                  <label className="text-white/50 text-xs mb-1 block">UPI ID</label>
                  <input
                    type="text"
                    name="upiId"
                    placeholder="username@okhdfcbank"
                    value={paymentDetails.upiId}
                    onChange={handleInputChange}
                    className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>
              )}

              {paymentMethod === "Card" && (
                <div className="space-y-3">
                  <div>
                    <label className="text-white/50 text-xs mb-1 block">Name on Card</label>
                    <input
                      type="text"
                      name="cardName"
                      placeholder="John Doe"
                      value={paymentDetails.cardName}
                      onChange={handleInputChange}
                      className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs mb-1 block">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="0000 0000 0000 0000"
                      value={paymentDetails.cardNumber}
                      onChange={handleInputChange}
                      className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-purple-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-white/50 text-xs mb-1 block">Expiry Date</label>
                      <input
                        type="text"
                        name="cardExpiry"
                        placeholder="MM/YY"
                        value={paymentDetails.cardExpiry}
                        onChange={handleInputChange}
                        className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-purple-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-white/50 text-xs mb-1 block">CVV</label>
                      <input
                        type="password"
                        name="cardCvc"
                        placeholder="123"
                        maxLength="3"
                        value={paymentDetails.cardCvc}
                        onChange={handleInputChange}
                        className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-purple-500"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "Net Banking" && (
                <div>
                  <label className="text-white/50 text-xs mb-1 block">Select Bank</label>
                  <select
                    name="bankName"
                    value={paymentDetails.bankName}
                    onChange={handleInputChange}
                    className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-purple-500"
                    required
                  >
                    <option value="">-- Choose Bank --</option>
                    <option value="SBI">State Bank of India</option>
                    <option value="HDFC">HDFC Bank</option>
                    <option value="ICICI">ICICI Bank</option>
                    <option value="Axis">Axis Bank</option>
                  </select>
                </div>
              )}
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-105"
            >
              Book Tickets
            </button>
            
            <p className="text-white/20 text-xs text-center mt-3">Free cancellation up to 24 hours before event</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventDetailPage;
