'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart items from localStorage on initialization
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cartItems');
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      // Check if the item already exists in the cart
      const itemExists = prev.some((cartItem) => cartItem._id === item._id);
      if (itemExists) {
        return prev; // If item exists, don't add it again
      }
      return [...prev, item]; // Otherwise, add the item
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
