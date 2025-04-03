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

  console.log(product);

  return (
    <div className="min-h-screen bg-gray-100  py-28 px-4 flex flex-col lg:flex-row items-center lg:items-center justify-center gap-6 lg:gap-12">
      {/* Left Section - Process Flow & Farmer Details */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-300 p-4 lg:p-6 flex flex-col items-center gap-6">
        <h3 className="text-xl lg:text-2xl font-bold text-gray-800 tracking-wide">How It Works</h3>
        <div className="flex flex-col gap-4 items-center">
          {[
            { icon: User2, label: "View Farmer", color: "text-indigo-500" },
            { icon: PhoneCall, label: "Contact Seller", color: "text-green-500" },
            { icon: CalendarCheck, label: "Schedule Pickup", color: "text-blue-500" },
            { icon: ShoppingCart, label: "Confirm Buy", color: "text-red-500", noArrow: true },
          ].map(({ icon: Icon, label, color, noArrow }, index) => (
            <div key={index} className="flex flex-col items-center text-gray-800 text-sm lg:text-base">
              <Icon className={`w-8 h-8 ${color} drop-shadow-lg`} />
              <p className="font-semibold mt-1">{label}</p>
              {!noArrow && <ArrowDownToLine className="w-5 h-5 text-gray-500 mt-2 animate-bounce" />}
            </div>
          ))}
        </div>

        {/* Farmer Details */}
        <div className="w-full">
          <button
            className={`w-full py-2 lg:py-3 rounded-xl font-semibold text-base lg:text-lg transition-all flex items-center justify-center gap-3
              ${showSeller ? "bg-red-600 hover:bg-red-700" : "bg-indigo-600 hover:bg-indigo-700"} 
              text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-100`}
            onClick={() => setShowSeller(!showSeller)}
          >
            <User2 className="w-6 h-6" />
            {showSeller ? "Hide Farmer Details" : "View Farmer Details"}
            {showSeller ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {showSeller && (
            <div className="mt-4 bg-white p-4 rounded-xl shadow-lg border border-gray-300">
              <FarmerDetails id={id} />
            </div>
          )}
        </div>
      </div>

      {/* Right Section - Product Info */}
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-gray-300 p-4 lg:p-6 flex flex-col gap-4">
        {/* Product Image */}
        <div className="w-full flex justify-center">
          <img
            src={product?.image || "/placeholder.jpg"}
            alt={product?.name || "Product Image"}
            className="w-full max-w-xs sm:max-w-sm h-32 sm:h-40 md:h-56 object-contain rounded-lg shadow-md"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col pl-10 gap-3 text-sm lg:text-base">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800 text-center lg:text-left">
            {product?.name || "Product Name"}
          </h2>
          <div className="text-gray-700 flex flex-col gap-1">
            <p>
              <span className="font-semibold">Category:</span> {product?.category || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Type:</span> {product?.productType || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Quantity Available:</span> {product?.quantity || "N/A"}kg
            </p>
          </div>
          <p className="text-lg lg:text-2xl font-extrabold text-green-700 text-center lg:text-left">
            ₹{product?.price ?? "N/A"} per kg
          </p>
          <p className="leading-relaxed text-gray-700 text-center lg:text-left text-sm lg:text-base">
            {product?.description || "No description available."}
          </p>
        </div>

        {/* Proceed Button */}
        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 lg:py-3 rounded-xl font-semibold text-base lg:text-lg transition-all flex items-center justify-center gap-3 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-100"
          onClick={handleProceed}
        >
          <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6" /> Proceed to Confirm Buy
        </button>
      </div>
    </div>
  );
};

export default ViewProduct;
