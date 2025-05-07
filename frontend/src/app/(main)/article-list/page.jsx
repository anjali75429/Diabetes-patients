'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get('http://localhost:5000/article/getall');

        
        setArticles(res.data);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
        Articles on Diabetes Care
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div key={article._id} className="bg-white shadow-md rounded-lg p-4 border">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {article.title}
            </h3>
            <p className="text-gray-600 mb-1"><strong>Category:</strong> {article.category}</p>
            <p className="text-gray-700">{article.content}</p>
            <p className="text-sm text-gray-400 mt-2">
              Published on: {new Date(article.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
