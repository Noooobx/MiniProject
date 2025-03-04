import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, BarChart, Users, Home } from "lucide-react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-auto bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 bg-white shadow-md w-64 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:static`}
      >
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-bold text-green-600">Farm Direct</h2>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="p-5 space-y-4">
          <Link
            to="/"
            className="flex items-center gap-3 text-gray-700 hover:text-green-600"
          >
            <Home size={20} /> Home
          </Link>
          <Link
            to="/orders"
            className="flex items-center gap-3 text-gray-700 hover:text-green-600"
          >
            <ShoppingCart size={20} /> Orders
          </Link>
          <Link
            to="/analytics"
            className="flex items-center gap-3 text-gray-700 hover:text-green-600"
          >
            <BarChart size={20} /> Analytics
          </Link>
          <Link
            to="/users"
            className="flex items-center gap-3 text-gray-700 hover:text-green-600"
          >
            <Users size={20} /> Users
          </Link>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white shadow-md p-4 flex items-center justify-between">
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
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
