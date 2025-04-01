import React, { useState, useEffect, useCallback } from "react";
import AddProduct from "./AddProduct";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner"; // Import your Loading Spinner Component

const baseUrl = import.meta.env.VITE_BASE_URL;

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const fetchProducts = useCallback(async () => {
    setLoading(true); // Set loading to true before starting fetch
    try {
      const response = await fetch(`${baseUrl}/api/product/listings/seller`, {
        credentials: "include",
      });
      const { data } = await response.json();
      console.log(data);
      if (!response.ok) throw new Error("Failed to fetch products");
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false); // Set loading to false after fetching is complete
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddProduct = async (newProduct) => {
    try {
      const formattedProduct = {
        name: newProduct.name,
        price: Number(newProduct.rate),
        quantity: Number(newProduct.quantity.value),
        productType: "Vegetable",
        category: newProduct.category,
        description: newProduct.description || "No description provided",
        image: newProduct.image || "https://example.com/default.jpg",
        video: newProduct.video || "",
      };

      const response = await fetch(`${baseUrl}/api/product/add/item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formattedProduct),
      });

      const data = await response.json();

      if (!response.ok) throw new Error("Failed to add product");

      setProducts((prev) => [...prev, data.data]);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/api/product/remove`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) throw new Error("Failed to delete product");

      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="p-6 min-h-screen flex flex-col justify-center max-w-5xl pt-24 mx-auto">
      <h1 className="text-3xl text-center font-semibold  mb-24 text-gray-700">
        Your Products
      </h1>

      {/* Show loading spinner when loading state is true */}
      {loading ? (
        <div className="flex justify-center items-start -mt-56">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-xl rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={product.image || "https://via.placeholder.com/150"}
                  alt={product.name}
                  className="w-full h-44 object-cover"
                />

                <div className="p-4">
                  <h4 className="text-lg font-bold text-gray-800 text-center">
                    {product.name}
                  </h4>
                  <p className="text-sm text-gray-600 text-center">
                    Category:{" "}
                    <span className="font-medium">{product.category}</span>
                  </p>
                  <p className="text-md text-gray-700 font-semibold text-center">
                    ₹{product.price}
                  </p>
                  <p className="text-sm text-gray-600 text-center">
                    Quantity: {product.quantity}
                  </p>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg font-medium transition duration-300 hover:bg-red-600 focus:outline-none"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No products available.
            </p>
          )}
        </div>
      )}

      <div className="mt-8 w-full flex items-center justify-center">
        <button
          onClick={() => setShowAddProduct(!showAddProduct)}
          className="bg-green-500 rounded-xl p-4 text-white font-medium"
        >
          {showAddProduct ? "Close Form" : "Add Product"}
        </button>
      </div>

      {showAddProduct && (
        <AddProduct onAdd={handleAddProduct} refreshProducts={fetchProducts} />
      )}
    </div>
  );
};

export default Inventory;
