import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Truck,
  XCircle,
  User,
  Store,
  Calendar,
  MapPin,
} from "lucide-react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Fetch orders from the backend
  const fetchOrders = async () => {
    try {
      const response = await fetch(baseUrl + "/api/orders", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders.");
      }
      const data = await response.json();
      console.log(data);

      if (data.success) {
        const pendingOrders = data.orders.filter(
          (order) => order.status === "pending"
        );
        setOrders(pendingOrders);
      } else {
        setError(data.message || "Failed to fetch orders.");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err.message || "Failed to fetch orders.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Function to handle clicking on an order to view details
  const handleViewOrder = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  // Function to update the status of an order to "Picked Up"
  const handleOrderPickedUp = async (orderId) => {
    try {
      console.log(orderId);
      const response = await fetch(`${baseUrl}/api/orders/${orderId}/pickup`, {
        method: "PATCH",
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);
      if (data.success) {
        alert("Order successfully marked as picked up!");
        await fetchOrders();
      } else {
        setError(data.message || "Failed to mark order as picked up.");
      }
    } catch (err) {
      console.error("Error picking up order:", err);
      setError(err.message || "Failed to mark order as picked up.");
    }
  };

  // Function to cancel an order
  const handleCancelOrder = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}/cancel`,
        {
          method: "PATCH",
        }
      );
      const data = await response.json();
      if (data.success) {
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== orderId)
        );
      } else {
        setError(data.message || "Failed to cancel order.");
      }
    } catch (err) {
      console.error("Error canceling order:", err);
      setError(err.message || "Failed to cancel order.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 flex items-center justify-center gap-3 mb-6 sm:mb-8">
          <Package size={32} className="sm:w-9 sm:h-9" /> Your Orders
        </h2>

        {error && (
          <div className="mb-6 text-red-500 text-center text-sm sm:text-base">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order._id}
                className="border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-xl transition-shadow duration-200 cursor-pointer"
                onClick={() => handleViewOrder(order._id)}
              >
                {/* Product Info */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <img
                    src={order.productId?.image}
                    alt={order.productId?.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-medium text-gray-800">
                      {order.productId?.name}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      ₹{order.productId?.price} • Qty: {order.quantity}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400">
                      {order.productId?.category} • {order.productId?.productType}
                    </p>
                  </div>
                </div>

                {/* Seller & Buyer Info */}
                <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base text-gray-600">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2">
                      <Store size={18} className="sm:w-5 sm:h-5" /> Seller
                    </h4>
                    <p>{order.sellerId?.name}</p>
                    <p className="text-xs sm:text-sm text-gray-400">
                      {order.sellerId?.email}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400">
                      {order.sellerId?.phone}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400">
                      {order.sellerId?.location}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold flex items-center gap-2">
                      <User size={18} className="sm:w-5 sm:h-5" /> Buyer
                    </h4>
                    <p>{order.buyer?.name}</p>
                    <p className="text-xs sm:text-sm text-gray-400">
                      {order.buyer?.email}
                    </p>
                  </div>
                </div>

                {/* Order Details */}
                <div className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-600">
                  <p className="flex items-center gap-2">
                    <MapPin size={18} className="sm:w-5 sm:h-5" />{" "}
                    {order.pickupLocation}
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar size={18} className="sm:w-5 sm:h-5" />{" "}
                    {new Date(order.pickupDate).toLocaleDateString()}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Ordered: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Status: {order.status}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4 sm:mt-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOrderPickedUp(order._id);
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white text-sm sm:text-base rounded-lg hover:bg-green-600 transition-colors w-full sm:w-auto"
                  >
                    <Truck size={18} className="sm:w-5 sm:h-5" />Marked as picked Up
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCancelOrder(order._id);
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white text-sm sm:text-base rounded-lg hover:bg-red-600 transition-colors w-full sm:w-auto"
                  >
                    <XCircle size={18} className="sm:w-5 sm:h-5" /> Cancel
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-sm sm:text-base">
              No pending orders.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;