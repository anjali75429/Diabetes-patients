import React, { useState } from 'react';
import axios from 'axios';

const EquipmentForm = () => {
  // State to handle form data for equipment
  const [form, setForm] = useState({
    title: '',
    content: '',
    category: '',
  });

  // Handle input changes and update form state
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission and make POST request to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending POST request to the backend (assuming backend is running on port 5000)
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/equipment`, form);

      // Alert success and reset the form
      alert('Equipment added!');
      setForm({ title: '', content: '', category: '' });
    } catch (error) {
      // If an error occurs during the POST request
      console.error(error);
      alert('Error adding equipment');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Equipment</h2>

      {/* Input for Title */}
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />

      {/* Textarea for Content */}
      <textarea
        name="content"
        placeholder="Content"
        value={form.content}
        onChange={handleChange}
        required
      />

      {/* Input for Category */}
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        required
      />

      {/* Submit Button */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default EquipmentForm;
