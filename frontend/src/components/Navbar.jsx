'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';  
import { CartProvider } from "@/context/CartContext";

const Navbar = () => {
  const { cartItems } = useCart();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo + App Name */}
        <div className="flex items-center space-x-2">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <img
                src="/images/logo.jpg"
                alt="Logo"
                className="h-12 w-12 md:h-16 md:w-16 object-contain rounded-full"
              />
              <span className="text-white text-xl md:text-2xl font-bold">
                Diabetes Health Hub
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8 text-white">
          <Link href="/" className="hover:text-green-400">Home</Link>
          <Link href="/article-list" className="hover:text-green-400">Articles</Link>
          <Link href="/contact" className="hover:text-green-400">Contact</Link>
          <Link href="/purchase" className="hover:text-green-400">Purchase</Link>
          <Link href="/about" className="hover:text-green-400">About Us</Link>

          <Link href="/cart" className="hover:text-green-400 relative">
            Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link href="/login" className="text-white bg-green-600 px-4 py-2 rounded hover:bg-green-700">Login</Link>
          <Link href="/signup" className="text-white bg-green-600 px-4 py-2 rounded hover:bg-green-700">Signup</Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
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
      </div>
    </nav>
  );
};

export default Navbar;
