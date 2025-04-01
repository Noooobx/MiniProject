import React, { useEffect, useState } from "react";
import axios from "axios"; // Ensure axios is installed for API requests
import { Link } from "react-router-dom";

const WonAuctions = () => {
  const [auctionOrders, setAuctionOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch auction orders from the backend API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/success/auction-orders") // Replace with your API URL if needed
      .then((response) => {
        console.log(response);
        setAuctionOrders(response.data.auctionOrders); // Set the auction orders from response
        setLoading(false); // Stop loading when data is fetched
      })
      .catch((err) => {
        setError("Error fetching auction orders");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Completed Auctions
      </h1>
      {auctionOrders.length === 0 ? (
        <p className="text-center text-lg text-gray-500">
          No won auctions found.
        </p>
      ) : (
        <ul className="space-y-6">
          {auctionOrders.map((order) => (
            <li
              key={order._id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-bold text-gray-800">
                {order.auctionId.title}
              </h3>
              <p className="text-gray-600 mb-2">
                <strong>Description:</strong> {order.auctionId.description}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Buyer:</strong> {order.buyerId.name} (
                {order.buyerId.email})
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Seller:</strong> {order.sellerId.name} (
                {order.sellerId.email})
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Start Time:</strong>{" "}
                {new Date(order.auctionId.startTime).toLocaleString()}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>End Time:</strong>{" "}
                {new Date(order.auctionId.endTime).toLocaleString()}
              </p>
              <p className="text-lg font-semibold text-gray-700">
                <strong>Amount:</strong> ₹{order.amount}
              </p>
              
              {order.pickupLocation && order.contactInfo ? (
                <div className="mt-4">
                  <p className="text-gray-700">
                    <strong>Pickup Location:</strong> {order.pickupLocation}
                  </p>
                  <p className="text-gray-700">
                    <strong>Pickup Date:</strong> {order.contactInfo}
                  </p>
                  <div className="flex gap-4 mt-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none">
                      Mark as Finished
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <Link to={`/auction-pickup/${order.auctionId._id}`}>
                  <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none">
                    Confirm Pickup Location
                  </button>
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WonAuctions;