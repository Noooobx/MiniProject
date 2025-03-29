import React, { useState } from "react";
import FarmerDetails from "./FarmerDetails";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { User2, Info, ShoppingCart, ChevronDown, ChevronUp, Video } from "lucide-react";

const ViewProduct = () => {
  const [showSeller, setShowSeller] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product || {};

  const handleProceed = () => {
    navigate("/confirm-buy", { state: { product } });
  };

  return (
    <div className="min-h-screen flex-col items-center bg-gray-100 p-6 flex justify-center gap-6">
      {/* Product Container */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-300 w-full max-w-6xl flex flex-col md:flex-row overflow-hidden">
        {/* Left - Product Image & Media */}
        <div className="md:w-1/2 p-4 flex flex-col items-center justify-center">
          <img
            src={
              product?.image ||
              "https://t4.ftcdn.net/jpg/04/32/30/55/360_F_432305577_JB4kKOPESHH2gZculYUZlj5U2vCbdjxn.jpg"
            }
            alt={product?.name}
            className="rounded-xl w-full max-w-md h-[400px] object-cover border border-gray-300"
          />

          {/* Additional Images */}
          {product?.images?.length > 0 && (
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Product image ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                />
              ))}
            </div>
          )}

          {/* Video */}
          {product?.video && (
            <div className="mt-4 w-full">
              <p className="font-semibold text-gray-700 mb-1 flex items-center gap-2">
                <Video className="w-4 h-4" /> Product Video:
              </p>
              <video controls className="w-full rounded-xl">
                <source src={product.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>

        {/* Right - Product Info */}
        <div className="md:w-1/2 p-6 flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Info className="w-6 h-6 text-blue-500" />
            {product?.name || "Product Name"}
          </h2>

          <p className="text-lg text-gray-700">Category: {product?.category || "N/A"}</p>
          <p className="text-sm text-gray-600">Type: {product?.productType || "N/A"}</p>
          <p className="text-sm text-gray-600">Quantity Available: {product?.quantity || "N/A"}</p>

          <p className="text-xl font-bold text-green-700">₹{product?.price ?? "N/A"}</p>

          <p className="leading-relaxed text-gray-700">
            {product?.description || "No description available."}
          </p>

          <div className="flex flex-col gap-2 mt-4 text-sm text-gray-500">
            <p>Created On: {product?.createdAt ? new Date(product.createdAt).toLocaleString() : "N/A"}</p>
            <p>Last Updated: {product?.updatedAt ? new Date(product.updatedAt).toLocaleString() : "N/A"}</p>
          </div>

          {/* Seller Details */}
          {!showSeller ? (
            <button
              className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
              onClick={() => setShowSeller(true)}
            >
              <User2 className="w-5 h-5" /> View Farmer Details <ChevronDown className="w-4 h-4" />
            </button>
          ) : (
            <>
              <FarmerDetails id={id} />
              <button
                className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                onClick={() => setShowSeller(false)}
              >
                <ChevronUp className="w-4 h-4" /> Hide Farmer Details
              </button>
            </>
          )}
        </div>
      </div>

      {/* Proceed Button */}
      <div className="w-full max-w-6xl">
        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2"
          onClick={handleProceed}
        >
          <ShoppingCart className="w-5 h-5" /> Proceed to Confirm Buy
        </button>
      </div>
    </div>
  );
};

export default ViewProduct;