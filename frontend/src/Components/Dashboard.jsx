import { useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {

  return (
    <div className="flex h-screen items-center bg-gray-100">
      {/* Sidebar */}
      {/* <div
        className={`fixed inset-y-0 left-0 z-50 bg-white shadow-lg w-64 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:static`}
      >
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-bold text-green-600">Farm Direct</h2>
        </div>
        <nav className="p-5 space-y-4">
          {[
            { name: "Home", path: "/", icon: <Home size={20} /> },
            { name: "Orders", path: "/orders", icon: <ShoppingCart size={20} /> },
            { name: "Analytics", path: "/analytics", icon: <BarChart size={20} /> },
            { name: "Users", path: "/users", icon: <Users size={20} /> },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:text-green-600 hover:bg-gray-100 transition-all"
            >
              {item.icon} {item.name}
            </Link>
          ))}
        </nav>
      </div> */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Dashboard Overview */}
        
        <main className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { title: "Total Orders", value: "120" },
            { title: "Total Sales", value: "$5,320" },
            { title: "Active Users", value: "250" },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md transform transition-all hover:scale-105 hover:shadow-xl"
            >
              <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
              <p className="text-3xl font-bold text-green-600">{card.value}</p>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
