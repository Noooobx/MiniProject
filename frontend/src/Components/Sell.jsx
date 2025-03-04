import React from "react";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import Inventory from "./Inventory";
import Earnings from "./Earnings";
import Messages from "./Messages";
import Reviews from "./Reviews";

const Sell = () => {
  return (
    <div className="p-6">
      <Dashboard />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <Link to="/inventory" className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <Inventory />
        </Link>

        <Link to="/earnings" className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <Earnings />
        </Link>

        <Link to="/messages" className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <Messages />
        </Link>

        <Link to="/reviews" className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <Reviews />
        </Link>
      </div>
    </div>
  );
};

export default Sell;
