import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook, FiLinkedin } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';

const Footer = () => (
  <footer className="bg-[#080808] border-t border-white/5 pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <HiOutlineSparkles className="text-white text-sm" />
            </div>
            <span className="font-display font-bold text-xl">
              <span className="text-white">Fusion</span><span className="text-gradient-orange">Hub</span>
            </span>
          </Link>
          <p className="text-white/40 text-sm leading-relaxed mb-6">One platform for food delivery, premium dining, and unforgettable events.</p>
          <div className="flex gap-3">
            {[FiInstagram, FiTwitter, FiFacebook, FiLinkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-lg glass flex items-center justify-center text-white/40 hover:text-orange-400 hover:border-orange-500/30 transition-all duration-300">
                <Icon className="text-sm" />
              </a>
            ))}
          </div>
        </div>
        {[
          { title: 'Explore', links: [['Food Delivery', '/food'], ['Dine Out', '/dine-out'], ['Events', '/events']] },
          { title: 'Account', links: [['Login', '/login'], ['Register', '/register'], ['My Cart', '/cart']] },
          { title: 'Support', links: [['Help Center', '#'], ['Contact Us', '#'], ['Privacy Policy', '#'], ['Terms of Service', '#']] },
        ].map(col => (
          <div key={col.title}>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-widest">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map(([label, path]) => (
                <li key={label}>
                  <Link to={path} className="text-white/40 text-sm hover:text-orange-400 transition-colors duration-300">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/30 text-sm">© 2025 FusionHub. All rights reserved.</p>
        <p className="text-white/20 text-xs">Built with ❤️ for Infotact Technical Internship Program</p>
      </div>
    </div>
  </footer>
);

export default Footer;
