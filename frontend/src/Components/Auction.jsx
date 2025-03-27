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
      const response = await fetch(
        baseUrl+"/api/auctions/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: auction.title,
            description: auction.description,
            startingPrice: parseFloat(auction.startingPrice),
            minBidIncrement: parseFloat(auction.minBidIncrement),
            startTime: new Date(auction.startTime),
            endTime: new Date(auction.endTime),
            images: [], // Placeholder for now
            status: "active",
          }),
        }
      );

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto p-6 shadow-lg rounded-lg border border-gray-300 bg-white">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-700">
          Create an Auction
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-3 border rounded"
            name="title"
            placeholder="Auction Title"
            value={auction.title}
            onChange={handleChange}
            required
          />
          <textarea
            className="w-full p-3 border rounded"
            name="description"
            placeholder="Description"
            value={auction.description}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-3 border rounded"
            name="startingPrice"
            placeholder="Starting Price"
            type="number"
            value={auction.startingPrice}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-3 border rounded"
            name="minBidIncrement"
            placeholder="Minimum Bid Increment"
            type="number"
            value={auction.minBidIncrement}
            onChange={handleChange}
            required
          />
          <select
            className="w-full p-3 border rounded"
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
            className="w-full p-3 border rounded"
            name="contact"
            placeholder="Contact Details"
            value={auction.contact}
            onChange={handleChange}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-600">Auction Start Time</label>
              <input
                className="w-full p-3 border rounded"
                name="startTime"
                type="datetime-local"
                value={auction.startTime}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="text-gray-600">Auction End Time</label>
              <input
                className="w-full p-3 border rounded"
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
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Submit Auction
          </button>
        </form>
      </div>
    </div>
  );
}
