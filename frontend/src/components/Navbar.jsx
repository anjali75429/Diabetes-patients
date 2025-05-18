'use client';

import Link from 'next/link';  // Make sure this import is here!
import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/article-list', label: 'Articles' },
  { href: '/contact', label: 'Contact' },
  { href: '/purchase', label: 'Purchase' },
  { href: '/about', label: 'About Us' },
  { href: '/cart', label: 'Cart' },
];

const Navbar = () => {
  const { cartItems } = useCart();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      {/* Top nav bar content (logo, nav links, menu button) */}
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo + App Name */}
        <Link href="/" className="flex items-center space-x-2">
          <img
            src="/images/logo.jpg"
            alt="Logo"
            className="h-12 w-12 md:h-16 md:w-16 object-contain rounded-full"
          />
          <span className="text-white text-xl md:text-2xl font-bold">
            Diabetes Health Hub
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 text-white items-center">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-green-400 relative">
              {label}
              {label === 'Cart' && mounted && cartItems.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link href="/login" className="text-white bg-green-600 px-4 py-2 rounded hover:bg-green-700">Login</Link>
          <Link href="/signup" className="text-white bg-green-600 px-4 py-2 rounded hover:bg-green-700">Signup</Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle mobile menu"
            aria-expanded={menuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div> {/* End of container */}

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-700 text-white px-4 pt-4 pb-2 space-y-3">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="block hover:text-green-400 relative">
              {label}
              {label === 'Cart' && mounted && cartItems.length > 0 && (
                <span className="absolute top-0 left-20 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          ))}
          <hr className="border-gray-600" />
          <Link href="/login" className="block text-white bg-green-600 px-4 py-2 rounded hover:bg-green-700">Login</Link>
          <Link href="/signup" className="block text-white bg-green-600 px-4 py-2 rounded hover:bg-green-700">Signup</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
