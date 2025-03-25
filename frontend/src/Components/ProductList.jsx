import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Sample product data
const products = [
  { id: 1, name: 'Basmati Rice', category: 'Rice', price: 120, image: '/images/rice.jpg' },
  { id: 2, name: 'Apple', category: 'Fruits', price: 150, image: '/images/apple.jpg' },
  { id: 3, name: 'Carrot', category: 'Vegetables', price: 60, image: '/images/carrot.jpg' },
  { id: 4, name: 'Eggs', category: 'Eggs', price: 90, image: '/images/eggs.jpg' },
  { id: 5, name: 'Mango', category: 'Fruits', price: 200, image: '/images/mango.jpg' },
  { id: 6, name: 'Brown Rice', category: 'Rice', price: 140, image: '/images/brownrice.jpg' },
  { id: 7, name: 'Tomato', category: 'Vegetables', price: 40, image: '/images/tomato.jpg' },
];

export default function ProductList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter Logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(products.map((product) => product.category))];

  return (
    <div className="p-8 bg-green-50 min-h-screen">
      <h1 className="text-5xl font-bold mt-20 mb-8 text-center text-green-700">Welcome to Farm Fresh</h1>
      <p className="text-center text-gray-600 mb-12">Discover fresh and organic farm produce directly from local farmers.</p>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search fresh produce..."
          className="border border-green-300 rounded-full p-3 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="border border-green-300 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Product Display Section */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />
              <h3 className="text-2xl font-semibold text-green-800">{product.name}</h3>
              <p className="text-gray-500 mb-2">{product.category}</p>
              <p className="text-green-700 font-bold text-xl">₹{product.price}</p>
              <Link 
                to={`/viewproduct`} 
                className="mt-4 block text-center bg-green-500 text-white py-2 rounded-full hover:bg-green-600 transition duration-300"
              >
                View Product
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-red-500 text-center text-lg">No products found!</p>
      )}
    </div>
  );
}
