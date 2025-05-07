import React, { useState } from 'react';
import axios from 'axios';

const EquipmentForm = () => {
  
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
      
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/equipment`, form);

      
      alert('Equipment added!');
      setForm({ title: '', content: '', category: '' });
    } catch (error) {
      
      console.error(error);
      alert('Error adding equipment');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Equipment</h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />

     
      <textarea
        name="content"
        placeholder="Content"
        value={form.content}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        required
      />

      
      <button type="submit">Submit</button>
    </form>
  );
};

export default EquipmentForm;
