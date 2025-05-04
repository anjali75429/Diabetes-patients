import Link from 'next/link';
import React from 'react';

const FoodListHome = () => {
  return (
    <div className="homepage-container text-center py-12 px-4">
      <h1 className="text-4xl font-bold text-green-700 mb-4">
        Welcome to Diabetes Care Platform
      </h1>
      <p className="text-gray-600 mb-6">
        Explore recommended food options to help manage your diabetes effectively.
      </p>

      <div className="flex justify-center space-x-4">
        <Link
          href="/foods"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          View Foods
        </Link>
        <Link
          href="/add-food"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add Food
        </Link>
      </div>
    </div>
  );
};

export default FoodListHome;
