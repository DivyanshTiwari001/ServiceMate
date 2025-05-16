import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Logo & Description */}
          <div>
            <Link
              to="/"
              className="text-xl font-bold inline-flex rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,0,0,0.8)] hover:scale-105 mb-4"
            >
              <span className="bg-red-600 text-white text-lg px-3 py-2 animate-pulse">
                Service
              </span>
              <span className="bg-blue-600 text-white text-lg px-3 py-2 animate-pulse">
                Mate
              </span>
            </Link>
            <p className="mt-4">
              Your one-stop solution for plumbing, electrician, and household
              repair services. Trusted, skilled, and just a tap away.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-red-500">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition">Services</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-red-500">Follow Us</h3>
            <div className="flex space-x-4 text-2xl">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition"><FaFacebook /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition"><FaInstagram /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition"><FaTwitter /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition"><FaLinkedin /></a>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ServiceMate. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
