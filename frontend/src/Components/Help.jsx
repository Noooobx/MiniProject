import React from "react";

function Help() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md text-center border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Need Help?</h2>
        <p className="text-gray-600 mb-6">We're here to assist you!</p>
        
        <div className="space-y-4">
          <p className="text-lg font-medium text-gray-700">
            📧 Email: <a href="mailto:support@example.com" className="text-blue-600 hover:underline">support@example.com</a>
          </p>
          <p className="text-lg font-medium text-gray-700">
            📞 Phone: <a href="tel:+1234567890" className="text-blue-600 hover:underline">+1 234 567 890</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Help;
