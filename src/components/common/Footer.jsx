import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiInstagram,
  FiTwitter,
  FiFacebook,
  FiLinkedin
} from 'react-icons/fi';



const Footer = () => (
  <footer className="bg-gradient-to-t from-[#080808] to-[#101010] border-t border-white/5 pt-14 pb-8">

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* TOP GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

        {/* LOGO SECTION */}
        <div className="min-w-0">

          <Link to="/" className="flex items-center gap-2 mb-4">

            <div className="relative">
  <img
    src="/logo.png"
    alt="FusionHub Logo"
    className="w-10 h-10 object-contain rounded-2xl group-hover:scale-110 transition-all duration-500"
  />
</div>

            <span className="font-display font-bold text-2xl">
              <span className="text-white">Fusion</span>
              <span className="text-gradient-orange">Hub</span>
            </span>

          </Link>

          <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
            One platform for food delivery, premium dining and unforgettable events.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-3">

            {[FiInstagram, FiTwitter, FiFacebook, FiLinkedin].map((Icon, i) => (

              <a
                key={i}
                href="#"
                className="
                  w-10 h-10 rounded-xl glass
                  flex items-center justify-center
                  text-white/40
                  hover:text-orange-400
                  hover:border-orange-500/30
                  hover:-translate-y-1
                  transition-all duration-300
                "
              >
                <Icon className="text-sm" />
              </a>

            ))}

          </div>
        </div>

        {/* FOOTER LINKS */}
        {[
          {
            title: 'Explore',
            links: [
              ['Food Delivery', '/food'],
              ['Dine Out', '/dine-out'],
              ['Events', '/events']
            ]
          },

          {
            title: 'Account',
            links: [
              ['Login', '/login'],
              ['Register', '/register'],
              ['My Cart', '/cart']
            ]
          },

          {
  title: 'Support',
  links: [
    ['Help Center', '/help'],
    ['Contact Us', '/contact'],
    ['Privacy Policy', '/privacy']
  ]
}

        ].map((col) => (

          <div key={col.title} className="min-w-0">

            <h4 className="
              font-display
              font-semibold
              text-white
              mb-5
              text-sm
              uppercase
              tracking-[0.2em]
            ">
              {col.title}
            </h4>

            <ul className="space-y-3">

              {col.links.map(([label, path]) => (

                <li key={label}>

                  <Link
                    to={path}
                    className="
                      text-white/40
                      text-sm
                      hover:text-orange-400
                      transition-all duration-300
                      hover:translate-x-1
                      inline-block
                    "
                  >
                    {label}
                  </Link>

                </li>

              ))}

            </ul>

          </div>

        ))}

      </div>

      {/* BOTTOM BAR */}
      <div className="
        border-t border-white/5
        pt-6
        flex flex-col md:flex-row
        items-center
        justify-between
        gap-3
      ">

        <p className="text-white/30 text-sm text-center md:text-left">
          © 2026 FusionHub. All rights reserved.
        </p>

        <p className="text-white/20 text-xs text-center md:text-right">
          Built with ❤️ for seamless food, dining & event experiences.
        </p>

      </div>

    </div>

  </footer>
);

export default Footer;