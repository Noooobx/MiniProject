import React, { useState, useEffect } from "react";
import AddProduct from "./AddProduct";

const baseUrl = import.meta.env.VITE_BASE_URL; // Use Vite env variable

const Inventory = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/product/listings`);
        const { data } = await response.json();
        if (!response.ok) throw new Error("Failed to fetch products");
        setProducts(data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Default to empty
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async (newProduct) => {
    try {
      const formattedProduct = {
        name: newProduct.name,
        price: Number(newProduct.rate), // Convert string to number
        quantity: Number(newProduct.quantity.value), // Extract value
        productType: "Vegetable", // Add missing productType
        category: newProduct.category,
        description: newProduct.description || "No description provided",
        image: newProduct.image || "https://example.com/default.jpg", // Default image
        video: newProduct.video || "", // Ensure empty string instead of null
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
      console.log(data);

      if (!response.ok) throw new Error("Failed to add product");

      setProducts([...products, data.data]);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/api/product/remove/${id}`, { // Change 'listings' to 'product' if needed
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json()
      console.log(data);
  
      if (!response.ok) throw new Error("Failed to delete product");
  
      setProducts(products.filter((product) => product._id !== id)); // Remove from UI
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  

  return (
    <div className="p-6 max-w-4xl pt-24 mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Manage Your Inventory
      </h2>

      <h3 className="text-xl font-semibold mb-3">Your Products</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-4 shadow-md rounded-lg flex flex-col items-center"
            >
              <img
                src={
                  "https://media.istockphoto.com/id/1203599923/photo/food-background-with-assortment-of-fresh-organic-vegetables.jpg?b=1&s=612x612&w=0&k=20&c=Xy80cP0SvyaaWPpZInnt3Ioib1Wff3xQSBBrooT2nB4="
                }
                alt="Product"
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h4 className="text-lg font-semibold text-center">
                {product.name}
              </h4>
              <p className="text-sm text-gray-600">
                Category: {product.category}
              </p>
              <p className="text-sm text-gray-600">Price: ₹{product.price}</p>
              <p className="text-sm text-gray-600">
                Quantity: {product.quantity}
              </p>
              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="mt-3 px-4 py-2 bg-red-500 text-white rounded w-full hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No products available.
          </p>
        )}
      </div>
      <AddProduct onAdd={handleAddProduct} />
    </div>
  );
};

export default Inventory;
