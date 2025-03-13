import { useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="flex flex-col h-auto max-h-screen mt-12 bg-gray-100">
      {/* Top Navbar */}
      <header className="bg-white shadow-md p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-700">Total Sales</h1>
      </header>

      {/* Dashboard Overview in Full-Width Rectangular Box */}
      <main className="p-4 flex justify-center">
        <div className="bg-white w-full flex justify-around p-1 rounded-lg  shadow-md h-16">
          {[
            { title: "Total Orders", value: "120" },
            { title: "Total Sales", value: "$5,320" },
            { title: "Active Users", value: "250" },
          ].map((card, index) => (
            <div key={index} className="text-center  w-1/4">
              <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
              <p className="text-2xl font-bold text-green-600">{card.value}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

