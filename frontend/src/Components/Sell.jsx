import React from "react";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";

const Sell = () => {
  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <Dashboard />
      

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto">
        {[
          { name: "Inventory", path: "/inventory" },
          { name: "Earnings", path: "/earnings" },
          { name: "Messages", path: "/messages" },
          { name: "Reviews", path: "/reviews" }
        ].map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex flex-col justify-center items-center bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <span className="text-xl font-semibold text-gray-700">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sell;
