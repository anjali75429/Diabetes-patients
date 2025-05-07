'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [userInfo, setUserInfo] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [userId] = useState('66350001a1b2c3d4e5f60001'); // Replace with actual user ID (from context or auth)

  useEffect(() => {
    // Fetch cart data from localStorage or state management if required
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);

    // Calculate total price
    const total = storedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (index, value) => {
    const newCart = [...cart];
    newCart[index].quantity = Math.max(1, parseInt(value));
    setCart(newCart);

    // Recalculate total price
    const total = newCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleCheckout = async () => {
    // Validation
    if (!userInfo.name || !userInfo.address || !userInfo.phone || !userInfo.email) {
      return alert('Please fill in all fields!');
    }

    const orderPayload = {
      userId,
      items: cart.map(({ itemId, itemType, quantity }) => ({ itemId, itemType, quantity })),
      totalPrice,
      userInfo,
    };

    try {
      await axios.post('http://localhost:5000/order', orderPayload, {
        headers: { 'x-user-id': userId },
      });
      alert('Order placed successfully!');
      localStorage.removeItem('cart'); // Clear cart after order
      setCart([]);
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Failed to place order');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Checkout</h2>

      {/* User Information */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Shipping Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="p-3 border rounded-md"
          />
          <input
            type="text"
            name="address"
            value={userInfo.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="p-3 border rounded-md"
          />
          <input
            type="tel"
            name="phone"
            value={userInfo.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="p-3 border rounded-md"
          />
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            className="p-3 border rounded-md"
          />
        </div>
      </div>

      {/* Cart Items */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Cart</h3>
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty</p>
        ) : (
          cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center border p-4 mb-2">
              <span>{item.title} ({item.itemType})</span>
              <div className="flex items-center">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                  className="w-16 border p-1"
                  min="1"
                />
                <span className="ml-2">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Total Price */}
      <div className="text-xl font-semibold text-right mt-4">
        Total: ${totalPrice.toFixed(2)}
      </div>

      {/* Checkout Button */}
      <div className="text-center mt-6">
        <button
          onClick={handleCheckout}
          disabled={cart.length === 0 || !userInfo.name || !userInfo.address || !userInfo.phone || !userInfo.email}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-800 disabled:bg-gray-400"
        >
          Complete Checkout
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
