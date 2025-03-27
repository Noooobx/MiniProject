import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState(null);

  const buyerId = "67e3ffb1462c1abf09e03255"; // Replace this with actual buyer ID from auth state

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/product/listings/${productId}`);
        const data = await response.json();

        if (response.ok) {
          setProduct(data.data);
        } else {
          console.error("Failed to fetch product:", data.message);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleRequestPickup = async () => {
    if (!product || !product.sellerId) {
      alert("Invalid product details.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerId,
          sellerId: product.sellerId,
          productId,
          amount: product.price, // Assuming price represents total amount
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setOrderStatus("pending");
        alert("Pickup request sent to the seller.");
      } else {
        console.error("Error placing order:", data.message);
      }
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!product) return <div>Product not found</div>;

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
        {/* Product Image & Details */}
        <div className="flex flex-col md:flex-row">
          <img
            src={product.image || "https://via.placeholder.com/400"}
            alt={product.name}
            className="w-full md:w-1/2 rounded-lg shadow-md"
          />
          <div className="md:ml-6 flex-1">
            <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
            <p className="text-lg text-gray-600 mt-2">{product.description}</p>
            <p className="text-xl font-semibold text-green-600 mt-4">
              ₹{product.price} per kg
            </p>
            <p className="text-gray-500 mt-2">Category: {product.category}</p>
          </div>
        </div>

        {/* Seller Information */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">Seller Information</h3>
          <p className="text-gray-700 mt-2">
            <strong>Seller ID:</strong> {product.sellerId || "N/A"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          {/* Request Pickup Button */}
          {orderStatus === "pending" ? (
            <p className="text-green-600 font-semibold">Order placed. Awaiting seller confirmation.</p>
          ) : (
            <button
              className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md shadow hover:bg-green-600 transition"
              onClick={handleRequestPickup}
            >
              Request Pickup
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
