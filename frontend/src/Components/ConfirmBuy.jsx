import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const ConfirmBuy = () => {
  const location = useLocation();
  const product = location.state?.product || {};
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [quantity, setQuantity] = useState(1);
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [isOrdered, setIsOrdered] = useState(false);
  const [error, setError] = useState(""); // State to handle error messages

  // Fetch authenticated user details
  useEffect(() => {
    // const fetchUser = async () => {
    //   try {
    //     const response = await fetch("http://localhost:5000/api/users/me", {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
    //       },
    //     });

    //     const data = await response.json();
    //     if (data.success) {
    //       setUser(data.user); // Store user data
    //     } else {
    //       setError("User not found. Please log in.");
    //     }
    //   } catch (err) {
    //     console.error("Error fetching user:", err);
    //     setError("Failed to fetch user details.");
    //   }
    // };

    // fetchUser();
  }, []);

  const handleOrder = async () => {
    if (!pickupLocation || !pickupDate) {
      alert("Please fill all fields and ensure you're logged in!");
      return;
    }

    // Prepare order details
    const orderDetails = {
      listingId: product._id, // product._id assumes the product has an _id
      quantity,
      pickupLocation,
      pickupDate,
    };

    try {
      // Make an API call to create the order
      const response = await fetch(baseUrl+"/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
        credentials:"include"
      });

      const data = await response.json();

      if (data.success) {
        setIsOrdered(true);
        setError(""); // Clear error state on success
      } else {
        setError(data.message || "Failed to confirm order. Please try again.");
      }
    } catch (error) {
      console.error("Error confirming order:", error);
      setError("Failed to confirm order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-xl border border-gray-200 transition-all">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          🛒 Confirm Purchase
        </h2>

        <div className="mb-6">
          <p className="text-xl font-semibold text-gray-700 mb-1">
            {product?.name || "Product Name"}
          </p>
          <p className="text-sm text-gray-500">
            Price: ₹{product?.price ?? "N/A"}
          </p>
        </div>

        {/* Quantity */}
        <div className="relative mb-6">
          <label className="block text-gray-600 mb-2">Select Quantity (kg)</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-400 bg-white transition"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          >
            {Array.from(
              { length: product?.quantity || 10 },
              (_, i) => i + 1
            ).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Pickup Location */}
        <div className="relative mb-6">
          <label className="block text-gray-600 mb-2">Pickup Location</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-400 transition"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            placeholder="Eg: MG Road, Kochi"
          />
        </div>

        {/* Pickup Date */}
        <div className="relative mb-6">
          <label className="block text-gray-600 mb-2">Pickup Date</label>
          <input
            type="date"
            className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-400 transition"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
          />
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 text-red-600 text-center">
            <p>{error}</p>
          </div>
        )}

        {/* Confirm Button or Status */}
        {!isOrdered ? (
          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-all shadow-md"
            onClick={handleOrder}
          >
            ✅ Proceed & Confirm
          </button>
        ) : (
          <motion.div
            className="text-center text-green-700 font-semibold text-xl flex flex-col items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <span>🎉 Order Confirmed!</span>
            <span className="text-sm text-gray-500">
              Seller will contact you soon
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ConfirmBuy;
