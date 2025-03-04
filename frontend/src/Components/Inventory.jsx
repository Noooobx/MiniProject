import React, { useState, useEffect } from "react";
import AddProduct from "./AddProduct";

const Inventory = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simulating fetching data from DB (empty initially)
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products"); // Change this to actual API endpoint
        const data = await response.json();
        setProducts(data || []); // Set empty array if no data
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Default to empty
      }
    };

    fetchProducts();
  }, []);

  // Dummy data (only for UI preview)
  useEffect(() => {
    if (products.length === 0) {
      setProducts([
        {
          id: 1,
          name: "Carrots",
          category: "Root Vegetables",
          rate: 50,
          quantity: { value: 2, unit: "kg" },
          expiryTime: Date.now() + 5 * 24 * 60 * 60 * 1000, // 5 days
          image: "data:image/jpeg;base64,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",
          video: null,
        },
        {
          id: 2,
          name: "Eggs",
          category: "Eggs",
          rate: 150,
          quantity: { value: 1, unit: "dozen" },
          expiryTime: Date.now() + 10 * 24 * 60 * 60 * 1000, // 10 days
          image: "data:image/jpeg;base64,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",
          video: null,
        },
      ]);
    }
  }, [products]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProducts((prevProducts) =>
        prevProducts.filter((product) => !product.expiryTime || product.expiryTime > Date.now())
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Your Inventory</h2>

      <h3 className="text-xl font-semibold mb-3">Your Products</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="bg-white p-4 shadow rounded-lg">
              <h4 className="text-lg font-semibold">{product.name}</h4>
              <p>Category: {product.category}</p>
              <p>Rate: ₹{product.rate}</p>
              <p>
                Quantity: {product.quantity.value} {product.quantity.unit}
              </p>
              {product.expiryTime ? (
                <p className="text-red-500">
                  Expires in:{" "}
                  {Math.ceil((product.expiryTime - Date.now()) / (1000 * 60 * 60))} hours
                </p>
              ) : (
                <p className="text-green-500">No Expiry</p>
              )}
              {product.image && (
                <img
                  src={product.image}
                  alt="Product"
                  className="w-full h-32 object-cover mt-2 rounded"
                />
              )}
              {product.video && (
                <video controls className="w-full mt-2 rounded">
                  <source src={product.video} type="video/mp4" />
                </video>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No products available.</p>
        )}
      </div>
      <AddProduct onAdd={handleAddProduct} />
    </div>
  );
};

export default Inventory;
