'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '@/context/CartContext';

const EquipmentList = () => {
  const [equipment, setEquipment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

  const categories = [
    'all',
    'Glucose Meters',
    'Insulin Pumps',
    'Testing Supplies',
    'Insulin Pens',
    'Continuous Glucose Monitors',
    'Other'
  ];

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const res = await axios.get('http://localhost:5000/equipment/getall');
        setEquipment(res.data);
      } catch (error) {
        console.error('Failed to fetch equipment:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  const filteredEquipment = equipment.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
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
        <h1 className="text-4xl font-bold text-green-700 mb-4">Diabetes Care Equipment</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Essential tools and devices to help you monitor and manage your diabetes effectively.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search equipment..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${selectedCategory === category
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEquipment.map((item) => (
          <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            {item.imageUrl && (
              <div className="h-48 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {item.category}
                </span>
                <span className="text-sm font-semibold text-green-600">
                  ${item.price?.toFixed(2) || 'N/A'}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {item.name}
              </h3>
              <p className="text-gray-600 line-clamp-3 mb-4">
                {item.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Added: {new Date(item.date).toLocaleDateString()}
                </span>
                <button
                  onClick={() => addToCart(item)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center"
                  disabled={item.stock === 0}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  {item.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipmentList;
