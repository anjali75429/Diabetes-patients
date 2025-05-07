'use client';

import React, { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Fetch recommendations based on cart items
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
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id} className="cart-item">
                <div>
                  <h2>{item.name}</h2>
                  <p>Price: ${item.price}</p>
                </div>
                <button onClick={() => removeFromCart(item._id)}>Remove</button>
              </li>
            ))} 
          </ul>
          <div className="cart-summary">
            <h3>Cart Summary</h3>
            <p>Total: ${calculateTotal()}</p>
            <button onClick={clearCart} className="clear-cart">
              Clear Cart
            </button>
          </div>
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="recommendations">
          <h2>Recommended for You</h2>
          <ul>
            {recommendations.map((item) => (
              <li key={item._id} className="recommendation-item">
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <button>Add to Cart</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CartPage;