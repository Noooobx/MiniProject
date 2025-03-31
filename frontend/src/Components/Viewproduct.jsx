import React, { useState } from "react";
import FarmerDetails from "./FarmerDetails";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  User2,
  PhoneCall,
  CalendarCheck,
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  ArrowDownToLine,
} from "lucide-react";

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
    <div className="min-h-screen bg-gray-100 py-40 py-16 px-4 flex flex-col lg:flex-row items-center lg:items-center justify-center gap-10 lg:gap-20">
      {/* Left Section - Process Flow & Farmer Details */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg border border-gray-300 p-6 lg:p-8 flex flex-col items-center gap-8">
        <h3 className="text-2xl font-bold text-gray-800 tracking-wide">
          How It Works
        </h3>
        <div className="flex flex-col gap-6 items-center">
          {[
            { icon: User2, label: "View Farmer", color: "text-indigo-500" },
            { icon: PhoneCall, label: "Contact Seller", color: "text-green-500" },
            { icon: CalendarCheck, label: "Schedule Pickup", color: "text-blue-500" },
            { icon: ShoppingCart, label: "Confirm Buy", color: "text-red-500", noArrow: true },
          ].map(({ icon: Icon, label, color, noArrow }, index) => (
            <div key={index} className="flex flex-col items-center text-gray-800">
              <Icon className={`w-9 h-9 ${color} drop-shadow-lg`} />
              <p className="text-lg font-semibold mt-2">{label}</p>
              {!noArrow && (
                <ArrowDownToLine className="w-6 h-6 text-gray-500 mt-3 animate-bounce" />
              )}
            </div>
          ))}
        </div>

        {/* Farmer Details */}
        <div className="w-full">
          <button
            className={`w-full py-3 rounded-2xl font-semibold text-lg transition-all flex items-center justify-center gap-4
              ${showSeller ? "bg-red-600 hover:bg-red-700" : "bg-indigo-600 hover:bg-indigo-700"} 
              text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-100`}
            onClick={() => setShowSeller(!showSeller)}
          >
            <User2 className="w-7 h-7" />
            {showSeller ? "Hide Farmer Details" : "View Farmer Details"}
            {showSeller ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </button>

          {showSeller && (
            <div className="mt-6 bg-white p-6 rounded-2xl shadow-lg border border-gray-300">
              <FarmerDetails id={id} />
            </div>
          )}
        </div>
      </div>

      {/* Right Section - Product Info */}
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-gray-300 p-6 lg:p-8 flex flex-col gap-6">
        {/* Product Image */}
        <div className="w-full flex justify-center">
          <img
            src={product?.image || "/placeholder.jpg"}
            alt={product?.name || "Product Image"}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-40 sm:h-48 md:h-64 object-contain rounded-lg shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center lg:text-left">
            {product?.name || "Product Name"}
          </h2>
          <div className="text-gray-700 text-lg flex flex-col gap-1">
            <p>
              <span className="font-semibold">Category:</span> {product?.category || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Type:</span> {product?.productType || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Quantity Available:</span> {product?.quantity || "N/A"}
            </p>
          </div>
          <p className="text-2xl font-extrabold text-green-700 text-center lg:text-left">
            ₹{product?.price ?? "N/A"}
          </p>
          <p className="leading-relaxed text-gray-700 text-center lg:text-left">
            {product?.description || "No description available."}
          </p>
        </div>

        {/* Proceed Button */}
        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl font-semibold text-lg transition-all flex items-center justify-center gap-3 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-100"
          onClick={handleProceed}
        >
          <ShoppingCart className="w-6 h-6" /> Proceed to Confirm Buy
        </button>
      </div>
    </div>
  );
};

export default ViewProduct;
