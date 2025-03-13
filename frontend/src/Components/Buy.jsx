import { useState } from "react";
import { Link } from "react-router-dom";
import BuyComponent from "./BuyComponent";

export default function Buy() {
  const [sortOption, setSortOption] = useState("");
  const [showBuyComponent, setShowBuyComponent] = useState(false);

  return (
    <div className="flex flex-col h-auto min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <header className="bg-white shadow-md p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-700">Dashboard</h1>
      </header>

      {/* Sort Bar (Amazon-style) */}
      <div className="p-4 flex justify-end">
        <select
          className="p-2 border border-gray-300 rounded-md"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort by</option>
          <optgroup label="Category">
            <option value="leafy">Leafy Vegetables</option>
            <option value="rooty">Rooty Vegetables</option>
            <option value="fruits">Fruits</option>
            <option value="grains">Rice</option>
          </optgroup>
        </select>
        <button
          className="ml-4 p-2 bg-blue-500 text-white rounded-md"
          onClick={() => setShowBuyComponent(true)}
        >
          Filter
        </button>
      </div>

      {/* Buy Component - Only Appears When Clicking Filter Button */}
      {showBuyComponent && <BuyComponent category={sortOption} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 max-w-5xl mx-auto">
              {[
                { name: "Cart", path: "/inventory", description: "Manage your products and stock." },
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
}
