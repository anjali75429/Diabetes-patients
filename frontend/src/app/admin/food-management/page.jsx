'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function FoodDashboard() {
  const [foodList, setFoodList] = useState([]);
  const [formData, setFormData] = useState({
    title: '', description: '', author: '', category: '', image: '', price: '', url: ''
  });

  const fetchFoods = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/foods`);
    setFoodList(res.data);
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/foods`, formData);
      setFormData({ title: '', description: '', author: '', category: '', image: '', price: '', url: '' });
      fetchFoods();
    } catch (err) {
      console.error('Error adding food:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/foods/${id}`);
      fetchFoods();
    } catch (err) {
      console.error('Error deleting food:', err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Food Management</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        {Object.keys(formData).map((field) => (
          <input
            key={field}
            placeholder={field}
            value={formData[field]}
            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
            className="block border p-2 w-full"
          />
        ))}
        <button type="submit" className="bg-green-600 text-white px-4 py-2">Add Food</button>
      </form>

      <ul>
        {foodList.map(item => (
          <li key={item._id} className="mb-4 border p-4 rounded">
            <h2 className="text-lg font-bold">{item.title}</h2>
            <p>{item.description}</p>
            <p>Author: {item.author}</p>
            <p>Category: {item.category}</p>
            <p>Price: ${item.price}</p>
            {item.url && (
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                {item.url}
              </a>
            )}
            <button onClick={() => handleDelete(item._id)} className="text-red-600 mt-2">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
