import { useState } from "react";
import { MessageCircle, Clock, User, MapPin } from "lucide-react";

export default function Requests() {
  const [requests] = useState([
    {
      id: 1,
      buyer: "Arjun Kumar",
      location: "Bangalore, India",
      request: "Looking for 50kg of organic tomatoes.",
      time: "2 hours ago",
    },
    {
      id: 2,
      buyer: "Neha Sharma",
      location: "Mumbai, India",
      request: "Need 100kg of premium Basmati rice.",
      time: "4 hours ago",
    },
    {
      id: 3,
      buyer: "Rahul Verma",
      location: "Delhi, India",
      request: "Searching for 30kg of fresh mangoes.",
      time: "6 hours ago",
    },
  ]);

  return (
    <div className="min-h-screen flex flex-col items-center py-10 bg-gray-50 pt-24 px-4">
      <h1 className="text-3xl font-bold text-green-700 mb-6">📥 Buyer Requests</h1>
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-6">
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all"
          >
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <User size={20} className="text-green-600" /> {req.buyer}
            </h2>
            <p className="text-gray-600 mt-2 flex items-center gap-2">
              <MapPin size={18} className="text-red-500" /> {req.location}
            </p>
            <p className="text-gray-700 mt-4 flex items-center gap-2">
              <MessageCircle size={18} className="text-blue-500" /> {req.request}
            </p>
            <p className="text-gray-500 text-sm mt-3 flex items-center gap-2">
              <Clock size={16} /> {req.time}
            </p>
            <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-green-600 transition">
              Respond
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
