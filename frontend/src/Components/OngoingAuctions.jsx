import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Clock, ImageOff, IndianRupee, ArrowUpRight } from "lucide-react";

export default function OngoingAuctions() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [auctions, setAuctions] = useState([]);
  const [error, setError] = useState(null);
  const [bidAmount, setBidAmount] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const cookies = document.cookie;
        const match = cookies.match(/token=([^;]*)/);
        const token = match ? match[1] : null;
        if (!token) {
          setError("User not authenticated");
          return;
        }
        const payloadBase64 = token.split(".")[1];
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);
        const sellerId = payload.userId;
        const res = await axios.get(
          `${baseUrl}/api/auctions/ongoing/${sellerId}`
        );
        setAuctions(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    };
    fetchBids();
  }, []);

  const handleBid = async (auctionId) => {
    try {
      const amount = Number(bidAmount[auctionId]);
      if (!amount || amount <= 0) return alert("Enter a valid bid amount");

      await axios.post(`${baseUrl}/api/auctions/${auctionId}/bid`, {
        amount,
        bidderId: "67e3ffb1462c1abf09e03255", // For now static
      });

      alert("Bid placed successfully!");

      setAuctions((prevAuctions) =>
        prevAuctions.map((auction) =>
          auction._id === auctionId
            ? { ...auction, highestBid: { amount } }
            : auction
        )
      );
      setBidAmount({ ...bidAmount, [auctionId]: "" });
    } catch (err) {
      alert(err.response?.data?.error || "Failed to place bid");
    }
  };

  if (error) {
    return (
      <div className="text-red-500 text-center mt-5 text-lg">Error: {error}</div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-8">
      <div className="max-w-7xl w-full bg-white shadow-xl rounded-2xl p-10 border border-gray-300">
        <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">
          Ongoing Auctions
        </h2>

        {auctions.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No ongoing auctions at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {auctions.map((auction) => (
              <div
                key={auction._id}
                className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {auction.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{auction.description}</p>

                  <div className="space-y-2 text-sm sm:text-base mb-4">
                    <p className="text-gray-700 flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-green-600" />
                      <span className="font-medium">Starting Price:</span>{" "}
                      ₹{auction.startingPrice}
                    </p>
                    <p className="text-gray-700 flex items-center gap-2">
                      <ArrowUpRight className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">Min Bid Increment:</span>{" "}
                      ₹{auction.minBidIncrement}
                    </p>
                    <p className="text-gray-700 flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-gray-800" />
                      <span className="font-medium">Highest Bid:</span>{" "}
                      ₹{auction.highestBid.amount}
                    </p>
                    <p className="text-gray-500 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      Ends on:{" "}
                      <span className="font-medium">
                        {new Date(auction.endTime).toLocaleString()}
                      </span>
                    </p>
                  </div>

                  {auction.images && auction.images.length > 0 ? (
                    <img
                      src={auction.images[0]}
                      alt="Auction"
                      className="mt-3 w-full h-44 object-cover rounded-lg shadow-md border"
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-gray-400 mt-4 text-sm">
                      <ImageOff className="w-4 h-4" />
                      No image available
                    </div>
                  )}
                </div>

                {/* Bid input */}
                <div className="mt-6 space-y-3">
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all font-medium"
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
