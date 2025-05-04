'use client';

import React, { useState } from 'react';
import axios from 'axios';

const EquipmentForm = () => {
  const [form, setForm] = useState({
    name: '',
    type: '',
    description: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/equipment', form);
      alert('Equipment added successfully!');
      setForm({ name: '', type: '', description: '' });
    } catch (error) {
      console.error(error);
      alert('Failed to add equipment');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Add Equipment
        </h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-600 mb-2">
            Equipment Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter equipment name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-600 mb-2">
            Type
          </label>
          <input
            type="text"
            name="type"
            id="type"
            value={form.type}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter equipment type"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-600 mb-2">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter a short description"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Equipment
        </button>
      </form>
    </div>
  );
};

export default EquipmentForm;
