import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaFileAlt, FaLightbulb } from 'react-icons/fa';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/contact', label: 'Contact' },
    { path: '/interview-prep', label: 'Interview Prep' }, // Added new route
  ];

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 sm:px-6 py-3 sticky top-0 z-50">
      {/* Left side - Logo */}
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl px-2" onClick={closeMenu}>
          <span className="text-primary font-bold">AI</span> Resume Maker
        </Link>
      </div>
      
      {/* Center - Desktop Navigation (hidden on mobile) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`btn btn-ghost rounded-btn text-base font-medium ${
                  location.pathname === item.path 
                    ? 'text-primary bg-primary/10' 
                    : 'text-base-content hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Right side - CTA Button */}
      <div className="navbar-end">
        <Link 
          to="/generate-resume" 
          className="btn btn-primary px-5 normal-case hidden md:inline-flex gap-2"
        >
          <FaFileAlt />
          Build Resume
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="btn btn-ghost btn-circle ml-2 lg:hidden text-base-content"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-base-100 shadow-lg lg:hidden z-50">
          <ul className="menu py-4 px-4 space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`block py-3 px-4 rounded-lg text-lg ${
                    location.pathname === item.path 
                      ? 'text-primary bg-primary/10 font-medium' 
                      : 'text-base-content hover:bg-base-200'
                  }`}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-4">
              <Link 
                to="/generate-resume" 
                className="btn btn-primary w-full gap-2"
                onClick={closeMenu}
              >
                <FaFileAlt />
                Build Resume
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;