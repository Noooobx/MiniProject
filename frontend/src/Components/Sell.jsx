import React from "react";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";

const Sell = () => {
  return (
    <div 
      className="p-6 min-h-screen bg-cover bg-center bg-gray-100"
      style={{ backgroundImage: "url('/3.jpg')" }}
    >
      <Dashboard />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 max-w-5xl mx-auto">
        {[
          { name: "Inventory", path: "/inventory", description: "Manage your products and stock." },
          { name: "Earnings", path: "/earnings", description: "View your earnings and sales reports." },
          { name: "Messages", path: "/messages", description: "Check messages from buyers." },
          { name: "Reviews", path: "/reviews", description: "See feedback from customers." },
          { name: "Auction", path: "/Auction", description: "Start Your Auction Here." },
          { name: "Help and Support", path: "/Help", description: "If Any Queries Follow This." },
          { name: "Chat Bot 24/7", path: "/bot", description: "Hey I am Here For You..." },
        ].map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex flex-col justify-center items-center bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <h2 className="text-xl font-semibold text-gray-700">{item.name}</h2>
            <p className="text-gray-600">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sell;
