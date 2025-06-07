'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '@/context/CartContext';

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await axios.get('http://localhost:5000/food/getall');
        setFoods(res.data);
      } catch (error) {
        console.error('Failed to fetch food:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const filteredFoods = foods.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.title?.toLowerCase().includes(term) ||
      item.name?.toLowerCase().includes(term) ||
      item.description?.toLowerCase().includes(term) ||
      item.content?.toLowerCase().includes(term)
    );
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-700 mb-4">Diabetes-Friendly Foods</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Nutritious food options that help maintain healthy blood sugar levels.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search foods..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFoods.map((item) => (
          <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            {item.imageUrl && (
              <div className="h-48 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {item.category}
                </span>
                <span className="text-xs text-gray-500">
                  Glycemic Index: {item.glycemicIndex || 'N/A'}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {item.title} {item.name}
              </h3>
              <div className="mb-4">
                <p className="text-gray-600 line-clamp-3 mb-2">
                  {item.description || item.content}
                </p>
                {item.nutritionalInfo && (
                  <div className="text-sm text-gray-500">
                    <p><strong>Calories:</strong> {item.nutritionalInfo.calories || 'N/A'}</p>
                    <p><strong>Carbs:</strong> {item.nutritionalInfo.carbs || 'N/A'}g</p>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Added: {new Date(item.date).toLocaleDateString()}
                </span>
                <button
                  onClick={() => addToCart(item)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Add to Plan
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodList;
