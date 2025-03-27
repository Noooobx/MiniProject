import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OngoingAuctions() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [auctions, setAuctions] = useState([]);
  const [error, setError] = useState(null);
  const [bidAmount, setBidAmount] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const res = await axios.get(
          baseUrl+"/api/auctions/ongoing"
        );
        setAuctions(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    };

    fetchAuctions();
  }, []);

  const handleBid = async (auctionId) => {
    try {
      const amount = Number(bidAmount[auctionId]); // Convert to number
      if (!amount || amount <= 0) return alert("Enter a valid bid amount");

      const res = await axios.post(
        `${baseUrl}/api/auctions/${auctionId}/bid`,
        {
          amount,
          bidderId: "67e3ffb1462c1abf09e03255", // Replace with actual user ID
        }
      );

      alert("Bid placed successfully!");

      // Update only the affected auction in state
      setAuctions((prevAuctions) =>
        prevAuctions.map((auction) =>
          auction._id === auctionId
            ? { ...auction, highestBid: { amount } }
            : auction
        )
      );

      // Clear input field after bid
      setBidAmount({ ...bidAmount, [auctionId]: "" });
    } catch (err) {
      alert(err.response?.data?.error || "Failed to place bid");
    }
  };

  if (error) {
    return <div className="text-red-500 text-center mt-5">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-50 py-12 px-6">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-8 border border-gray-200">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Ongoing Auctions
        </h2>

        <button
          onClick={() => navigate("/newAuction")}
          className="w-full sm:w-auto block mx-auto mb-6 px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md hover:from-indigo-500 hover:to-purple-600 transition-all duration-300"
        >
          + Create New Auction
        </button>

        {auctions.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            {" "}
            No ongoing auctions at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {auctions.map((auction) => (
              <div
                key={auction._id}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-200 transition-transform hover:scale-[1.02] hover:shadow-lg"
              >
                <h3 className="text-xl font-semibold text-gray-900">
                  {auction.title}
                </h3>
                <p className="text-gray-600 mt-1">{auction.description}</p>

                <p className="text-gray-600">
                  <span className="font-medium">Starting Price:</span>{" "}
                  <span className="text-green-600">
                    ₹{auction.startingPrice}
                  </span>
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Minimum Bid Increment:</span> ₹
                  {auction.minBidIncrement}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Highest Bid:</span> ₹
                  {auction.highestBid.amount}
                </p>
                <p className="text-gray-500">
                  ⏳ Ends on:{" "}
                  <span className="font-medium">
                    {new Date(auction.endTime).toLocaleString()}
                  </span>
                </p>

                {auction.images && auction.images.length > 0 ? (
                  <img
                    src={auction.images[0]}
                    alt="Auction"
                    className="mt-4 w-full h-40 object-cover rounded-lg shadow-md"
                  />
                ) : (
                  <p className="text-gray-400 mt-4 text-sm">
                    No image available
                  </p>
                )}

                {/* Bid input and button */}
                <div className="mt-4">
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter bid amount"
                    value={bidAmount[auction._id] || ""}
                    onChange={(e) =>
                      setBidAmount({
                        ...bidAmount,
                        [auction._id]: e.target.value,
                      })
                    }
                  />
                  <button
                    onClick={() => handleBid(auction._id)}
                    className="mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
                  >
                    Place Bid
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
