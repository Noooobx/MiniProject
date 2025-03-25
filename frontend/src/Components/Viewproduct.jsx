import React, { useState } from "react";

const ViewProduct = ({ product = {} }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="p-6 shadow-md rounded-xl border bg-white hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-semibold text-gray-800">
          {product?.name || "Product Name Not Available"}
        </h2>
        <p className="text-gray-500 text-lg mt-1">
          Price: <span className="text-gray-900 font-medium">
            ${product?.price ?? "N/A"}
          </span>
        </p>
        <button
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-all"
          onClick={() => setIsOpen(true)}
        >
          View Details
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {product?.name || "Product Name Not Available"}
            </h2>
            <p className="text-gray-600 mb-2">
              <strong>Category:</strong> {product?.category || "N/A"}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Description:</strong> {product?.description || "No description provided"}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Price:</strong> <span className="text-gray-900 font-medium">
                ${product?.price ?? "N/A"}
              </span>
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Seller:</strong> {product?.sellerName || "Unknown"}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Contact:</strong> {product?.sellerContact || "No Contact Info"}
            </p>
            <button
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition-all"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewProduct;