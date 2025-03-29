import { Link } from "react-router-dom";
import { Package, DollarSign, Users, Box, CreditCard, MessageSquare, Star, Gavel, LifeBuoy } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-20 justify-evenly w-full px-4 bg-green-50">
      {/* Classy Heading with Icon */}
      <h1 className="text-2xl font-bold text-green-700 text-center my-4 flex items-center justify-center gap-2">
        📊 Dashboard Overview
      </h1>

      {/* Dashboard Overview Section */}
      <main className="p-6 flex justify-center">
        <div className="bg-white w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 rounded-lg shadow-md border border-green-300">
          {[
            { title: "Total Orders", value: "120", icon: <Package size={24} /> },
            { title: "Total Sales", value: "$5,320", icon: <DollarSign size={24} /> },
            { title: "Active Users", value: "250", icon: <Users size={24} /> },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center"
            >
              <h3 className="text-lg font-semibold text-green-700 flex items-center gap-2">
                {card.icon} {card.title}
              </h3>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Dashboard Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 max-w-5xl mx-auto">
        {[
          {
            name: "Inventory",
            path: "/inventory",
            description: "Manage your products and stock.",
            icon: <Box size={32} />,
          },
          {
            name: "Messages",
            path: "/messages",
            description: "Check messages from buyers.",
            icon: <MessageSquare size={32} />,
          },
          {
            name: "Reviews",
            path: "/reviews",
            description: "See feedback from customers.",
            icon: <Star size={32} />,
          },
          {
            name: "Auction",
            path: "/myAuction",
            description: "Start Your Auction Here.",
            icon: <Gavel size={32} />,
          },
          {
            name: "Requests",
            path: "/requests",
            description: "Manage incoming requests.",
            icon: <CreditCard size={32} />,
          },
          {
            name: "Help and Support",
            path: "/help",
            description: "If Any Queries Follow This.",
            icon: <LifeBuoy size={32} />,
          },
          {
            name: "Orders",
            path: "/view-orders",
            description: "Checkout the orders.",
            icon: <LifeBuoy size={32} />,
          },
        ].map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex flex-col justify-center items-center bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="text-green-700">{item.icon}</div>
            <h2 className="text-xl font-semibold text-gray-700 mt-2">{item.name}</h2>
            <p className="text-gray-600">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
