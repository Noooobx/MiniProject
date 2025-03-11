import React, { useState } from "react";
import Showcomp from "./Showcomp";

const products = [
  { id: 1, name: "Spinach", category: "Leafy Vegetables", price: 20 },
  { id: 2, name: "Lettuce", category: "Leafy Vegetables", price: 15 },
  { id: 3, name: "Onion", category: "Root Vegetables", price: 25 },
  { id: 4, name: "Carrot", category: "Root Vegetables", price: 30 },
  { id: 5, name: "Apple", category: "Fruits", price: 50 },
  { id: 6, name: "Orange", category: "Fruits", price: 40 },
  { id: 7, name: "Eggs", category: "Eggs", price: 10 },
  { id: 8, name: "Rice", category: "Rice and Grains", price: 60 },
  { id: 9, name: "Wheat", category: "Rice and Grains", price: 55 },
  { id: 10, name: "Chicken", category: "Chicken and Meat", price: 120 },
  { id: 11, name: "Beef", category: "Chicken and Meat", price: 150 }
];

const Buy = ({ category, setCategory, selectedItem, setSelectedItem, categories, items, applyFilter }) => {
  return (
    <div className="w-full bg-gray-800 p-5 mt-16 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full md:w-1/2">
          <label className="text-white font-semibold mb-2">Select Category</label>
          <select 
            className="p-2 border border-gray-300 rounded-lg"
            onChange={(e) => setCategory(e.target.value)} 
            value={category}
          >
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div className="flex flex-col w-full md:w-1/2">
          <label className="text-white font-semibold mb-2">Select Item</label>
          <select 
            className="p-2 border border-gray-300 rounded-lg" 
            onChange={(e) => setSelectedItem(e.target.value)} 
            value={selectedItem} 
            disabled={!category}
          >
            <option value="">Select Item</option>
            {items.map((item) => (
              <option key={item.id} value={item.name}>{item.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
          onClick={applyFilter}
        >
          Filter
        </button>
      </div>
      <div>
        <Showcomp/>
      </div>
    </div>
  );
};
export default Buy;

