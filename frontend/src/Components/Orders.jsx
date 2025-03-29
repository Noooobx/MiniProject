import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  // Fetch orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(baseUrl + "/api/orders", {
            credentials: "include",
          });
          
        if (!response.ok) {
          throw new Error("Failed to fetch orders.");
        }
        const data = await response.json();

        if (data.success) {
          setOrders(data.orders);
        } else {
          setError(data.message || "Failed to fetch orders.");
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.message || "Failed to fetch orders.");
      }
    };

    fetchOrders();
  }, []);

  // Function to handle clicking on an order to view details
  const handleViewOrder = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  // Function to update the status of an order to "Picked Up"
  const handleOrderPickedUp = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/pickup`, {
        method: "PATCH",
      });
      const data = await response.json();
      if (data.success) {
        // Update the order status locally
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: "Picked Up" } : order
          )
        );
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
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/cancel`, {
        method: "PATCH",
      });
      const data = await response.json();
      if (data.success) {
        // Update the order status locally
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">🛒 Your Orders</h2>

        {error && (
          <div className="mb-6 text-red-600 text-center">
            <p>{error}</p>
          </div>
        )}

        {/* Orders list */}
        <div className="space-y-6">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order._id}
                className="border border-gray-300 p-6 rounded-xl hover:shadow-xl transition-all cursor-pointer bg-white"
                onClick={() => handleViewOrder(order._id)}
              >
                {/* Product Details */}
                <div className="flex gap-6 mb-4">
                  <img
                    src={order.productId?.image}
                    alt={order.productId?.name}
                    className="w-40 h-40 object-cover rounded-lg"
                  />
                  <div className="flex flex-col justify-between">
                    <h3 className="text-2xl font-semibold text-gray-800">{order.productId?.name}</h3>
                    <p className="text-sm text-gray-500">Category: {order.productId?.category}</p>
                    <p className="text-sm text-gray-500">Price: ₹{order.productId?.price}</p>
                    <p className="text-sm text-gray-500">Quantity: {order.quantity}</p>
                    <p className="text-sm text-gray-500">Product Type: {order.productId?.productType}</p>
                  </div>
                </div>

                {/* Seller Details */}
                <div className="mt-4">
                  <h4 className="text-xl font-semibold text-gray-700">Seller Info</h4>
                  <p className="text-sm text-gray-500">Name: {order.sellerId?.name}</p>
                  <p className="text-sm text-gray-500">Email: {order.sellerId?.email}</p>
                  <p className="text-sm text-gray-500">Phone: {order.sellerId?.phone}</p>
                  <p className="text-sm text-gray-500">Location: {order.sellerId?.location}</p>
                </div>

                {/* Buyer Details */}
                <div className="mt-4">
                  <h4 className="text-xl font-semibold text-gray-700">Buyer Info</h4>
                  <p className="text-sm text-gray-500">Name: {order.buyer?.name}</p>
                  <p className="text-sm text-gray-500">Email: {order.buyer?.email}</p>
                </div>

                {/* Order Details */}
                <div className="mt-4">
                  <h4 className="text-xl font-semibold text-gray-700">Order Details</h4>
                  <p className="text-sm text-gray-500">Pickup Location: {order.pickupLocation}</p>
                  <p className="text-sm text-gray-500">Pickup Date: {new Date(order.pickupDate).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-500">Order Status: {order.status}</p>
                  <p className="text-sm text-gray-500">Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => handleOrderPickedUp(order._id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Mark as Picked Up
                  </button>
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
