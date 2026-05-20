import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Food', path: '/food' },
    { label: 'Dine Out', path: '/dine-out' },
    { label: 'Events', path: '/events' },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-dark shadow-2xl' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <HiOutlineSparkles className="text-white text-sm" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">
              <span className="text-white">Fusion</span><span className="text-gradient-orange">Hub</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${isActive(link.path) ? 'text-orange-400' : 'text-white/70 hover:text-white'}`}>
                {link.label}
                <span className={`absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300 ${isActive(link.path) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/cart" className="relative p-2.5 text-white/70 hover:text-white transition-colors duration-300">
              <FiShoppingCart className="text-xl" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-xs font-bold flex items-center justify-center text-white">
                  {count}
                </span>
              )}
            </Link>
            <Link to="/login" className="text-sm font-medium text-white/70 hover:text-white transition-colors px-3 py-2">Login</Link>
            <Link to="/register" className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-5 py-2 rounded-full text-sm transition-all hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105">Sign Up</Link>
          </div>

          <div className="flex md:hidden items-center gap-3">
            <Link to="/cart" className="relative p-2 text-white">
              <FiShoppingCart className="text-xl" />
              {count > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full text-xs flex items-center justify-center">{count}</span>}
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white p-2">
              {menuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden glass-dark rounded-2xl mt-2 p-4">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path} onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 text-sm font-medium rounded-xl mb-1 transition-all ${isActive(link.path) ? 'text-orange-400 bg-orange-500/10' : 'text-white/70 hover:text-white hover:bg-white/5'}`}>
                {link.label}
              </Link>
            ))}
            <div className="border-t border-white/10 mt-3 pt-3 flex gap-3">
              <Link to="/login" onClick={() => setMenuOpen(false)} className="border border-white/20 text-white text-sm py-2 rounded-full flex-1 text-center hover:border-orange-500">Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm py-2 rounded-full flex-1 text-center">Sign Up</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
