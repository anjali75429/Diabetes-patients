'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderList = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [equipmentItems, setEquipmentItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [userId] = useState('66350001a1b2c3d4e5f60001'); // Replace with actual user ID (from context or auth)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const [foodRes, equipRes] = await Promise.all([
          axios.get('http://localhost:5000/food/getall'),
          axios.get('http://localhost:5000/equipment/getall')
        ]);
        setFoodItems(foodRes.data);
        setEquipmentItems(equipRes.data);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    };

    fetchItems();
  }, []);

  const addToCart = (item, type) => {
    setCart(prev => [...prev, {
      itemId: item._id,
      itemType: type,
      quantity: 1,
      price: item.price,
      title: item.title
    }]);
  };

  const handleQuantityChange = (index, value) => {
    const newCart = [...cart];
    newCart[index].quantity = Math.max(1, parseInt(value));
    setCart(newCart);
  };

  const calculateTotal = () => 
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async () => {
    const orderPayload = {
      items: cart.map(({ itemId, itemType, quantity }) => ({ itemId, itemType, quantity })),
      totalPrice: calculateTotal(),
    };

    try {
      await axios.post('http://localhost:5000/order', orderPayload, {
        headers: { 'x-user-id': userId },
      });
      alert('Order placed successfully!');
      setCart([]);
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Failed to place order');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
        Place Your Order
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Display Food Items */}
        {foodItems.map((item) => (
          <div key={item._id} className="bg-white shadow-md rounded-lg p-4 border">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-gray-600 mb-1"><strong>Category:</strong> {item.category}</p>
            <p className="text-gray-700">{item.content}</p>
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="mt-4 w-full h-48 object-cover rounded"
              />
            )}
            <div className="flex justify-between items-center mt-4">
              <span className="text-gray-700">Price: ${item.price}</span>
              <button
                onClick={() => addToCart(item, 'Food')}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}

        {/* Display Equipment Items */}
        {equipmentItems.map((item) => (
          <div key={item._id} className="bg-white shadow-md rounded-lg p-4 border">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-gray-600 mb-1"><strong>Category:</strong> {item.category}</p>
            <p className="text-gray-700">{item.content}</p>
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="mt-4 w-full h-48 object-cover rounded"
              />
            )}
            <div className="flex justify-between items-center mt-4">
              <span className="text-gray-700">Price: ${item.price}</span>
              <button
                onClick={() => addToCart(item, 'Equipment')}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-center text-green-700">Your Cart</h3>
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
        <div className="text-xl font-semibold text-right mt-4">
          Total: ${calculateTotal().toFixed(2)}
        </div>
        <div className="text-center mt-6">
          <button
            onClick={handleSubmit}
            disabled={cart.length === 0}
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-800 disabled:bg-gray-400"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
