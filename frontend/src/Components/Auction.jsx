import { useState } from "react";

export default function AuctionForm() {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [auction, setAuction] = useState({
    title: "",
    description: "",
    startingPrice: "",
    minBidIncrement: "1",
    quantity: "",
    unit: "kg",
    contact: "",
    category: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuction((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cookies = document.cookie;
      const match = cookies.match(/token=([^;]*)/);
      const token = match[1];
      const payloadBase64 = token.split(".")[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);

      const response = await fetch(baseUrl + "/api/auctions/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: auction.title,
          description: auction.description,
          startingPrice: parseFloat(auction.startingPrice),
          minBidIncrement: parseFloat(auction.minBidIncrement),
          startTime: new Date(auction.startTime),
          endTime: new Date(auction.endTime),
          images: [],
          status: "active",
          sellerId: payload.userId,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Auction submitted successfully!");
        setAuction({
          title: "",
          description: "",
          startingPrice: "",
          minBidIncrement: "1",
          quantity: "",
          unit: "kg",
          contact: "",
          category: "",
          startTime: "",
          endTime: "",
        });
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting auction:", error);
      alert("Failed to submit auction.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-6">
      <div className="w-full max-w-xl bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
          Create an Auction
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            name="title"
            placeholder="Auction Title"
            value={auction.title}
            onChange={handleChange}
            required
          />
          <textarea
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all resize-none"
            name="description"
            rows="3"
            placeholder="Description"
            value={auction.description}
            onChange={handleChange}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              name="startingPrice"
              placeholder="Starting Price"
              type="number"
              value={auction.startingPrice}
              onChange={handleChange}
              required
            />
            <input
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              name="minBidIncrement"
              placeholder="Min Bid Increment"
              type="number"
              value={auction.minBidIncrement}
              onChange={handleChange}
              required
            />
          </div>
          <select
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            name="category"
            value={auction.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="fruits">Fruits</option>
            <option value="vegetables">Vegetables</option>
            <option value="grains">Grains</option>
          </select>
          <input
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            name="contact"
            placeholder="Contact Details"
            value={auction.contact}
            onChange={handleChange}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-600">Start Time</label>
              <input
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                name="startTime"
                type="datetime-local"
                value={auction.startTime}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-600">End Time</label>
              <input
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                name="endTime"
                type="datetime-local"
                value={auction.endTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-md"
          >
            Submit Auction
          </button>
        </form>
      </div>
    </div>
  );
}
