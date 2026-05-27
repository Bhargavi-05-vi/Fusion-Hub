import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiSearch } from 'react-icons/fi';

const faqs = [
  {
    category: '🍔 Food Delivery',
    questions: [
      { q: 'How long does delivery take?', a: 'Most deliveries take 25-45 minutes depending on your location and restaurant. You can track your order in real time after placing it.' },
      { q: 'Can I cancel my order?', a: 'You can cancel your order within 2 minutes of placing it. After that, cancellation depends on whether the restaurant has accepted the order.' },
      { q: 'What if my order is wrong or missing items?', a: 'Go to My Orders → select the order → tap "Report Issue". Our support team will resolve it within 24 hours.' },
      { q: 'Is there a minimum order amount?', a: 'Minimum order amount varies by restaurant, typically between ₹99 and ₹299.' },
    ]
  },
  {
    category: '🍽️ Dine Out',
    questions: [
      { q: 'How do I reserve a table?', a: 'Go to Dine Out → select a restaurant → choose date, time and number of guests → confirm your reservation.' },
      { q: 'Can I modify or cancel a reservation?', a: 'Yes. Go to My Dashboard → Table Bookings → select the booking → modify or cancel up to 2 hours before the reservation time.' },
      { q: 'Is there a reservation fee?', a: 'No, table reservations on FusionHub are completely free.' },
    ]
  },
  {
    category: '🎟️ Events',
    questions: [
      { q: 'How do I get my event tickets?', a: 'After booking, your QR code tickets are available in My Dashboard → My Tickets. You can also download them as PDF.' },
      { q: 'Are event tickets refundable?', a: 'Refund policies vary by event. Most events allow cancellation up to 24 hours before the event for a full refund.' },
      { q: 'What if the event is cancelled?', a: 'If an event is cancelled by the organizer, you will receive a full refund within 5-7 business days.' },
    ]
  },
  {
    category: '💳 Payments',
    questions: [
      { q: 'What payment methods are accepted?', a: 'We accept UPI (GPay, PhonePe, Paytm), Credit/Debit cards, and Cash on Delivery for food orders.' },
      { q: 'Is my payment information secure?', a: 'Yes. We use industry-standard SSL encryption. We never store your card details on our servers.' },
      { q: 'How do refunds work?', a: 'Refunds are processed within 5-7 business days back to your original payment method.' },
    ]
  },
];

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-2xl transition-all duration-300 ${open ? 'border-orange-500/30 bg-orange-500/5' : 'border-white/5 bg-[#1A1A1A]'}`}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left">
        <span className="text-white font-medium text-sm pr-4">{q}</span>
        {open
          ? <FiChevronUp className="text-orange-400 flex-shrink-0" />
          : <FiChevronDown className="text-white/30 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-white/50 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
};

const HelpCenterPage = () => {
  const [search, setSearch] = useState('');

  const filtered = faqs.map(cat => ({
    ...cat,
    questions: cat.questions.filter(item =>
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  return (
    <div className="min-h-screen bg-[#0D0D0D] pt-20 pb-16">

      {/* Header */}
      <div className="bg-gradient-to-br from-orange-900/20 to-[#0D0D0D] py-16 mb-10 border-b border-white/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">🙋</div>
          <h1 className="font-display font-bold text-white text-4xl mb-3">Help Center</h1>
          <p className="text-white/40 text-base mb-8">Find answers to common questions about FusionHub</p>

          {/* Search */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 focus-within:border-orange-500/50 transition-all max-w-xl mx-auto">
            <FiSearch className="text-white/30 flex-shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search for help..."
              className="bg-transparent text-white placeholder-white/20 text-sm outline-none flex-1"
            />
          </div>
        </div>
      </div>

      {/* FAQ Sections */}
      <div className="max-w-3xl mx-auto px-4">
        {filtered.length > 0 ? (
          filtered.map(cat => (
            <div key={cat.category} className="mb-10">
              <h2 className="font-display font-bold text-white text-lg mb-4">{cat.category}</h2>
              <div className="space-y-3">
                {cat.questions.map(item => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-white/40">No results found for "{search}"</p>
          </div>
        )}

        {/* Still need help */}
        <div className="mt-12 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-8 text-center">
          <h3 className="font-display font-bold text-white text-xl mb-2">Still need help?</h3>
          <p className="text-white/40 text-sm mb-5">Our support team is available 9 AM – 9 PM, 7 days a week</p>
          <a href="/contact"
            className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-8 py-3 rounded-full hover:shadow-lg hover:shadow-orange-500/30 transition-all hover:scale-105">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;