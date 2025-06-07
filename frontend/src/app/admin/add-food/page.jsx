'use client';

import React, { useState } from 'react';
import axios from 'axios';

const FoodForm = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    imageUrl: '',
    price: '',
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleChange = async (e) => {
    if (e.target.name === 'image') {
      const file = e.target.files[0];
      if (file) {
        setImagePreview(URL.createObjectURL(file));
        setLoading(true);
        try {
          const imageUrl = await uploadImage(file);
          setForm({ ...form, imageUrl });
        } catch (error) {
          alert('Failed to upload image');
        } finally {
          setLoading(false);
        }
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.imageUrl) {
      alert('Please upload an image');
      return;
    }

    try {
      await axios.post('http://localhost:5000/food/add', form);
      alert('Food item added successfully!');
      setForm({
        name: '',
        description: '',
        category: '',
        imageUrl: '',
        price: '',
      });
      setImagePreview(null);
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
          <label className="block text-gray-600 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Enter food description"
            rows="3"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={form.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Enter price"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-2" htmlFor="category">
            Category
          </label>
          <select
            name="category"
            id="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
          >
            <option value="">Select a category</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Proteins">Proteins</option>
            <option value="Grains">Grains</option>
            <option value="Dairy">Dairy</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2" htmlFor="image">
            Food Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
          } text-white py-2 rounded-lg transition`}
        >
          {loading ? 'Uploading...' : 'Add Food'}
        </button>
      </form>
    </div>
  );
};

export default FoodForm;
