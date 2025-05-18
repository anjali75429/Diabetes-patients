'use client';

import React, { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (cartItems.length > 0) {
        const response = await fetch('/api/recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cartItems }),
        });
        const data = await response.json();
        setRecommendations(data);
      } else {
        setRecommendations([]);
      }
    };

    fetchRecommendations();
  }, [cartItems]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div className="cart-page p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((item) => (
              <li key={item._id} className="bg-white shadow-md rounded-xl p-6">
                <h2 className="text-lg font-bold text-gray-800">{item.name}</h2>
                <p className="text-gray-600 mb-4">Price: ${item.price}</p>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 bg-gray-100 p-6 rounded-xl shadow-inner">
            <h3 className="text-xl font-bold mb-2">Cart Summary</h3>
            <p className="text-gray-700 mb-4">Total: ${calculateTotal()}</p>
            <button
              onClick={clearCart}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-200"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="recommendations mt-12">
          <h2 className="text-2xl font-semibold mb-4">Recommended for You</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((item) => (
              <li key={item._id} className="bg-white shadow-md rounded-xl p-6">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600 mb-4">Price: ${item.price}</p>
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200">
                  Add to Cart
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CartPage;
