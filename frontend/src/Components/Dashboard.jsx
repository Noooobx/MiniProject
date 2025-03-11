import { useState } from "react";

export default function Dashboard() {
  return (
    <div className="flex h-auto bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white shadow-md p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-700">Dashboard</h1>
        </header>

        {/* Dashboard Overview */}
        <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Total Orders</h3>
            <p className="text-3xl font-bold text-green-600">120</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Total Sales</h3>
            <p className="text-3xl font-bold text-green-600">$5,320</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Active Users</h3>
            <p className="text-3xl font-bold text-green-600">250</p>
          </div>
        </main>
      </div>
    </div>
  );
}
