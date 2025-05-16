import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaServicestack,
  FaInfoCircle,
  FaPhoneAlt,
  FaSearch,
  FaBars,
  FaTimes,
} from 'react-icons/fa';

function Header() {
  const [searchText, setSearchText] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleChangeSearchText = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="navbar bg-base-100 shadow-md px-4 md:px-8 sticky top-0 z-50">
      {/* Left: Logo */}
      <div className="flex-1">
        <Link
          to="/"
          className="text-xl font-bold inline-flex rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,0,0,0.8)] hover:scale-105"
        >
          <span className="bg-red-600 text-white text-lg px-3 py-2 animate-pulse">
            Service
          </span>
          <span className="bg-blue-600 text-white text-lg px-3 py-2 animate-pulse">
            Mate
          </span>
        </Link>
      </div>

      {/* Middle: Desktop Menu */}
      <div className="hidden lg:flex flex-1 justify-center gap-6 text-md font-semibold">
        <Link to="/" className="flex items-center gap-2 hover:text-primary transition-all duration-200">
          <FaHome /> Home
        </Link>
        <Link to="/services" className="flex items-center gap-2 hover:text-primary transition-all duration-200">
          <FaServicestack /> Services
        </Link>
        <Link to="/about" className="flex items-center gap-2 hover:text-primary transition-all duration-200">
          <FaInfoCircle /> About Us
        </Link>
        <Link to="/contact" className="flex items-center gap-2 hover:text-primary transition-all duration-200">
          <FaPhoneAlt /> Contact Us
        </Link>
      </div>

      {/* Right: Search & Auth */}
      <div className="flex-1 flex justify-end items-center gap-3">
        {/* Search Bar (hidden on small screens) */}
        <div className="hidden md:flex items-center border border-red-500 rounded-md overflow-hidden shadow-sm">
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={handleChangeSearchText}
            className="input input-bordered w-48 md:w-64 h-10 bg-base-200 text-white border-none focus:outline-none"
          />
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 h-10 flex items-center justify-center transition-all"
          >
            <FaSearch />
          </button>
        </div>

        {/* Auth Buttons (always visible) */}
        <Link to="/login">
          <button className="btn btn-sm bg-red-500 hover:bg-red-600 text-white transition-all duration-200">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="btn btn-sm btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200">
            Sign Up
          </button>
        </Link>

        {/* Hamburger Menu Icon (Mobile Only) */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-2xl text-red-600 hover:text-red-800 transition-all"
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Mobile Slide Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-base-200 bg-opacity-95 z-50 flex flex-col items-center justify-center gap-6 text-xl font-semibold transition-all duration-300">
          {/* Close Button */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-4 right-4 text-3xl text-red-600 hover:text-red-800"
          >
            <FaTimes />
          </button>

          {/* Menu Items */}
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 hover:text-primary">
            <FaHome /> Home
          </Link>
          <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 hover:text-primary">
            <FaServicestack /> Services
          </Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 hover:text-primary">
            <FaInfoCircle /> About Us
          </Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 hover:text-primary">
            <FaPhoneAlt /> Contact Us
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
