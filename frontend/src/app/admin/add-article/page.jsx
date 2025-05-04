// src/components/ArticleForm.jsx
'use client'
import React, { useState } from 'react';
import axios from 'axios';

const ArticleForm = () => {
  const [form, setForm] = useState({
    title: '',
    content: '',
    category: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/articles', form);
      alert('Article added successfully!');
      setForm({ title: '', content: '', category: '' });
    } catch (error) {
      console.error(error);
      alert('Failed to add article');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Add a New Article
        </h2>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Enter title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2" htmlFor="content">
            Content
          </label>
          <textarea
            name="content"
            id="content"
            value={form.content}
            onChange={handleChange}
            required
            rows="5"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Enter content"
          ></textarea>
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
            placeholder="Enter category"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Submit Article
        </button>
      </form>
    </div>
  );
};

export default ArticleForm;
