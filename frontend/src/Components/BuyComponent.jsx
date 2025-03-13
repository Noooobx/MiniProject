
import React from "react";

const products = [
  { name: "Spinach", category: "leafy" },
  { name: "Carrot", category: "rooty" },
  { name: "Onion", category: "rooty" },
  { name: "Apple", category: "fruits" },
  { name: "Orange", category: "fruits" },
  { name: "Rice", category: "grains" },
];

export default function BuyComponent({ category }) {
  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;

  return (
    <section className="p-4">
      <h2 className="text-lg font-semibold mb-2">Available Products</h2>
      <div className="grid grid-cols-2 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div key={index} className="bg-white p-4 shadow-md rounded-lg">
              <h3 className="text-md font-bold">{product.name}</h3>
              <p className="text-gray-600">Category: {product.category}</p>
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">
                Buy
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No products found in this category.</p>
        )}
      </div>
    </section>
  );
}
 