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
          image: "https://via.placeholder.com/150",
          video: null,
        },
        {
          id: 2,
          name: "Eggs",
          category: "Eggs",
          rate: 150,
          quantity: { value: 1, unit: "dozen" },
          expiryTime: Date.now() + 10 * 24 * 60 * 60 * 1000, // 10 days
          image: "https://via.placeholder.com/150",
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
