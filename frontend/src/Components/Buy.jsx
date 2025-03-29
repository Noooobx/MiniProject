import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Buy() {
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      const baseUrl = import.meta.env.VITE_BASE_URL;
      try {

        const res = await fetch(
          `${baseUrl}/api/product/listings`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();
        if (data.success) setListings(data.data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);

  const filteredListings = listings.filter(
    (listing) =>
      listing.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (sortOption === "" || listing.category === sortOption)
  );

  return (
    <div className="flex flex-col min-h-screen bg-green-50 py-20">
      {/* Search & Filter Section */}
      <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-xl shadow-md mx-4 mt-4 gap-4">
        <input
          type="text"
          placeholder="Search products..."
          className="p-3 border border-gray-200 rounded-lg w-full sm:w-1/3 shadow-sm focus:ring-2 focus:ring-green-400 outline-none transition"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Link to={"/auction"}>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition">
            Auctions
          </button>
        </Link>

        <select
          className="p-3 border border-gray-200 rounded-lg w-full sm:w-auto shadow-sm focus:ring-2 focus:ring-green-400 outline-none transition cursor-pointer"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="leafy">Leafy Vegetables</option>
          <option value="rooty">Root Vegetables</option>
          <option value="fruits">Fruits</option>
          <option value="grains">Grains</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10 max-w-7xl mx-auto px-4">
        {filteredListings.length > 0 ? (
          filteredListings.map((listing) => (
            <div
              key={listing._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative"
            >
              <img
                src={listing.image}
                alt={listing.name}
                className="w-full h-40 object-cover"
              />
              <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                {listing.category}
              </span>
              <div className="p-4 flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {listing.name}
                </h2>
                <p className="text-green-700 font-bold">₹{listing.price}/kg</p>
                <p className="text-xs text-gray-500">
                  Qty: {listing.quantity} kg
                </p>
                <p className="text-xs text-gray-500">
                  Posted:{" "}
                  {new Date(listing.createdAt).toLocaleDateString("en-IN")}
                </p>
                <Link
                  to={`/viewproduct/${listing.sellerId}`}
                  state={{ product: listing }}
                >
                  <button className="mt-2 w-full bg-blue-600 text-white text-sm py-2 rounded-md hover:bg-blue-700 transition">
                    View Product
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-4 text-lg">
            No products found
          </p>
        )}
      </div>
    </div>
  );
}
