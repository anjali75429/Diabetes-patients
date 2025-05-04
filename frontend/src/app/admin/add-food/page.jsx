'use client';

import React, { useState } from 'react';
import axios from 'axios';

const FoodForm = () => {
  const [form, setForm] = useState({
    name: '',
    calories: '',
    category: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/foods', form);
      alert('Food item added successfully!');
      setForm({ name: '', calories: '', category: '' });
    } catch (error) {
      console.error(error);
      alert('Failed to add food');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Add a Food Item
        </h2>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2" htmlFor="name">
            Food Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Enter food name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2" htmlFor="calories">
            Calories
          </label>
          <input
            type="number"
            name="calories"
            id="calories"
            value={form.calories}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Enter calories"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-2" htmlFor="category">
            Category
          </label>
          <input
            type="text"
            name="category"
            id="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Enter food category (e.g. Fruit, Protein)"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Add Food
        </button>
      </form>
    </div>
  );
};

export default FoodForm;
