<<<<<<< HEAD
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
        const cookies = document.cookie;
        const match = cookies.match(/token=([^;]*)/);
  
        if (!match) {
          console.error("Token not found");
          return;
        }
  
        const token = match[1];
        const payloadBase64 = token.split(".")[1];
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);
  
        if (!payload.userId) {
          console.error("User ID not found in token");
          return;
        }
  
        console.log("Extracted Payload:", payload);
  
        const res = await fetch(`${baseUrl}/api/product/listings?sellerId=${payload.userId}`);
        const data = await res.json();
  
        if (data.success) {
          setListings(data.data);
        }
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
=======
import React from 'react'
import ProductList from './ProductList'
>>>>>>> origin/main

function Buy() {
  return (
<<<<<<< HEAD
    <div className="flex flex-col min-h-screen bg-gray-100 pt-20">
      {/* <header className="bg-white shadow-md p-6 flex items-center justify-between rounded-lg mx-4 my-4"> */}
        {/* <h1 className="text-3xl font-bold text-gray-800">Marketplace</h1> */}
      {/* </header> */}

      {/* Search & Filter Section */}
      <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white shadow-lg rounded-lg mx-4 mt-4 gap-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search for products..."
          className="p-4 border border-gray-300 rounded-lg w-full sm:w-1/3 shadow-md focus:ring-2 focus:ring-green-400 outline-none transition"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Auctions Button */}
        <Link to={"/auction"}>
          <button className="bg-green-600 text-white px-8 py-3 rounded-lg shadow-lg font-semibold hover:bg-green-700 transition-all">
            Auctions
          </button>
        </Link>

        {/* Category Filter */}
        <select
          className="p-4 border border-gray-300 rounded-lg w-full sm:w-auto shadow-md focus:ring-2 focus:ring-green-400 outline-none transition cursor-pointer"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 max-w-7xl mx-auto px-4">
        {filteredListings.length > 0 ? (
          filteredListings.map((listing) => (
            <div
              key={listing._id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl relative"
            >
              <img
                src={listing.image}
                alt={listing.name}
                className="w-full h-56 object-cover rounded-t-2xl"
              />

              <span className="absolute top-3 left-3 bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                {listing.category}
              </span>

              <div className="p-6 text-center">
                <h2 className="text-2xl font-semibold text-gray-800">{listing.name}</h2>
                <p className="text-gray-600 text-lg mt-2 font-medium">₹{listing.price}/kg</p>

                <p className="text-gray-500 text-sm mt-3">
                  Sold by: <span className="font-medium text-gray-700">{listing.sellerName}</span>
                </p>
                <p className="text-gray-500 text-sm">
                  Location: <span className="font-medium text-gray-700">{listing.location}</span>
                </p>

                <p
                  className={`text-lg font-medium mt-3 ${
                    listing.stock > 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {listing.stock > 0 ? `${listing.stock} kg available` : "Out of stock"}
                </p>

                <Link to={`/viewproduct/${listing._id}`}>
                  <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
                    View Product
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-3 text-lg">No products found</p>
        )}
      </div>
=======
    <div>
      <ProductList></ProductList>
>>>>>>> origin/main
    </div>
  )
}

export default Buy