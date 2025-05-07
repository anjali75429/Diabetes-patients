'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '@/context/CartContext';

const EquipmentList = () => {
  const [equipment, setEquipment] = useState([]);
  const { addToCart } = useCart();



  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const res = await axios.get('http://localhost:5000/equipment/getall');
        setEquipment(res.data);
      } catch (error) {
        console.error('Failed to fetch equipment:', error);
      }
    };

    fetchEquipment();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
        Essential Equipment for Diabetes Care
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipment.map((item) => (
          <div key={item._id} className="bg-white shadow-md rounded-lg p-4 border">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 mb-1"><strong>Category:</strong> {item.category}</p>
            <p className="text-gray-700">{item.content}</p>
            <p className="text-sm text-gray-400 mt-2">
              Added on: {new Date(item.date).toLocaleDateString()}
            </p>
            <button
              className='bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600 transition duration-200'
              onClick={() => addToCart(item)}>add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipmentList;
