import React from "react";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";

const Sell = () => {
  return (
    <div 
      className="p-6 min-h-screen bg-cover bg-center" 
      style={{ backgroundImage: "url('/3.jpg')" }}
    >
      <Dashboard />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <Link to="/inventory" className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold">Inventory</h2>
          <p className="text-gray-600">Manage your products and stock.</p>
        </Link>

        <Link to="/earnings" className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold">Earnings</h2>
          <p className="text-gray-600">View your earnings and sales reports.</p>
        </Link>

        <Link to="/messages" className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold">Messages</h2>
          <p className="text-gray-600">Check messages from buyers.</p>
        </Link>

        <Link to="/reviews" className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold">Reviews</h2>
          <p className="text-gray-600">See feedback from customers.</p>
        </Link>

        <Link to="/Auction" className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold">Auction</h2>
          <p className="text-gray-600">Start Your Auction Here</p>
        </Link>

        <Link to="/Help" className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold">Help and Support</h2>
          <p className="text-gray-600">If Any Queries Follow This</p>
        </Link>
        <Link to="/bot" className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold">Chat Bot 24/7</h2>
          <p className="text-gray-600">Hey I am Here For You...</p>
        </Link>

      </div>
    </div>
  );
};

export default Sell;
