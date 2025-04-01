import React, { useState, useEffect } from "react";

const FinishedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchFinishedOrders = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/orders/show-pending`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch finished orders.");
        }

        const data = await response.json();
        console.log(data)
        if (data.success) {
          setOrders(data.orders);
        } else {
          setError(data.message || "Failed to fetch orders.");
        }
      } catch (err) {
        console.error("Error fetching finished orders:", err);
        setError(err.message || "Failed to fetch orders.");
      }
    };

    fetchFinishedOrders();
  }, []);

  return (
    <div className="min-h-screen flex items-center py-28 justify-center bg-gray-50 p-8">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Deal History
        </h2>

        {error && <p className="text-center text-red-600">{error}</p>}

        <div className="space-y-6">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order._id}
                className="border border-gray-300 p-6 rounded-xl bg-white hover:shadow-xl transition-all"
              >
                <div className="flex gap-6 mb-4 flex-wrap">
                  <div className="flex flex-col justify-between w-full">
                    <h3 className="text-2xl font-semibold text-gray-800">
                      {order.productId?.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      <strong>Category:</strong> {order.productId?.category}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Price:</strong> ₹{order.productId?.price}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Quantity:</strong> {order.quantity}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-xl font-semibold text-gray-700">
                    Order Details
                  </h4>
                  <p className="text-sm text-gray-500">
                    <strong>Pickup Location:</strong> {order.pickupLocation}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Pickup Date:</strong>{" "}
                    {new Date(order.pickupDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Order Status:</strong> {order.status}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No finished orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinishedOrders;
