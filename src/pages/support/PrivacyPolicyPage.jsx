import React from 'react';
import { Link } from 'react-router-dom';

const sections = [
  {
    title: '1. Information We Collect',
    content: `We collect information you provide directly to us when you create an account, place an order, make a reservation, or contact us for support. This includes your name, email address, phone number, delivery address, and payment information. We also automatically collect certain information when you use our platform, such as your IP address, browser type, device information, and usage data.`
  },
  {
    title: '2. How We Use Your Information',
    content: `We use the information we collect to process your orders and reservations, send you order confirmations and updates, provide customer support, personalize your experience, send promotional offers (with your consent), improve our platform and services, and comply with legal obligations. We do not sell your personal information to third parties.`
  },
  {
    title: '3. Information Sharing',
    content: `We share your information only as necessary to provide our services. This includes sharing your delivery address with restaurant partners and delivery partners to fulfill your orders, sharing your reservation details with restaurants, and sharing payment information with our payment processors. All partners are bound by strict data protection agreements.`
  },
  {
    title: '4. Data Security',
    content: `We take the security of your personal information seriously. We use industry-standard SSL encryption for all data transmission. Passwords are hashed using bcrypt and never stored in plain text. We regularly audit our security practices and update them as needed. However, no method of transmission over the Internet is 100% secure.`
  },
  {
    title: '5. Cookies',
    content: `We use cookies and similar tracking technologies to enhance your experience on our platform. Cookies help us remember your preferences, keep you logged in, and understand how you use our services. You can control cookie settings through your browser preferences. Disabling cookies may affect some features of the platform.`
  },
  {
    title: '6. Your Rights',
    content: `You have the right to access the personal information we hold about you, request correction of inaccurate data, request deletion of your account and associated data, opt out of marketing communications at any time, and data portability. To exercise these rights, contact us at privacy@fusionhub.com.`
  },
  {
    title: '7. Children\'s Privacy',
    content: `FusionHub is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately and we will delete it.`
  },
  {
    title: '8. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. We will notify you of any significant changes by email or by displaying a prominent notice on our platform. Your continued use of FusionHub after any changes constitutes your acceptance of the updated policy.`
  },
  {
    title: '9. Contact Us',
    content: `If you have any questions about this Privacy Policy or our data practices, please contact our Privacy Team at privacy@fusionhub.com or write to us at FusionHub, Bengaluru, Karnataka, India.`
  },
];

const PrivacyPolicyPage = () => (
  <div className="min-h-screen bg-[#0D0D0D] pt-20 pb-16">

    {/* Header */}
    <div className="bg-gradient-to-br from-purple-900/20 to-[#0D0D0D] py-14 mb-10 border-b border-white/5">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <div className="text-5xl mb-4">🔒</div>
        <h1 className="font-display font-bold text-white text-4xl mb-3">Privacy Policy</h1>
        <p className="text-white/40 text-sm">Last updated: January 1, 2026</p>
      </div>
    </div>

    <div className="max-w-3xl mx-auto px-4">

      {/* Intro */}
      <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-6 mb-8">
        <p className="text-white/60 text-sm leading-relaxed">
          At <span className="text-white font-semibold">FusionHub</span>, we are committed to protecting your privacy.
          This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our
          platform for food delivery, dine-out reservations, and event bookings.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-6 hover:border-purple-500/20 transition-all">
            <h2 className="font-display font-bold text-white text-base mb-3">{section.title}</h2>
            <p className="text-white/50 text-sm leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-10 text-center">
        <p className="text-white/20 text-xs mb-4">
          By using FusionHub, you agree to this Privacy Policy.
        </p>
        <Link to="/contact"
          className="inline-block border border-purple-500/30 text-purple-400 font-semibold px-6 py-2.5 rounded-full hover:bg-purple-500/10 transition-all text-sm">
          Questions? Contact Us
        </Link>
      </div>
    </div>
  </div>
);

export default PrivacyPolicyPage;