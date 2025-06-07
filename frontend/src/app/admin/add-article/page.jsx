'use client'
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ArticleForm = () => {
  const [form, setForm] = useState({
    title: '',
    content: '',
    category: '',
    description: '',
    image: '',
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/article/add', form);
      alert('Article added successfully!');
      setForm({
        title: '',
        content: '',
        category: '',
        description: '',
        image: '',
      });
    } catch (error) {
      console.error(error);
      // alert('Failed to add article');
      toast.error('Failed to add article');
    }
  };


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
      console.log(data);
      
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
          setForm({ ...form, image : imageUrl });
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Add a New Article
        </h2>

        {/* Title */}
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

        {/* Content */}
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

        {/* Category */}
        <div className="mb-4">
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

        {/* Description */}
        <div className="mb-6">
          <label className="block text-gray-600 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Enter a short description"
          ></textarea>
        </div>
          <div className="mb-4">
          <label className="block text-gray-600 mb-2" htmlFor="image">
            Image
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
          {loading ? 'Uploading...' : 'Submit Article'}
        </button>
      </form>
    </div>
  );
};

export default ArticleForm;
