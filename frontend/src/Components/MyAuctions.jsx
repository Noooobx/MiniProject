import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function MyAuctions() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [auctions, setAuctions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const cookies = document.cookie;
        const match = cookies.match(/token=([^;]*)/);
        const token = match ? match[1] : null;

        if (!token) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        const payloadBase64 = token.split(".")[1];
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);
        const sellerId = payload.userId;

        const res = await axios.get(
          `${baseUrl}/api/auctions/seller/${sellerId}/auctions`
        );

        setAuctions(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  return (
    <div className="min-h-screen w-full justify-center  bg-green-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-8">
          Your Auctions
        </h2>

        <button
          onClick={() => navigate("/newAuction")}
          className="w-full sm:w-auto block mx-auto mb-10 px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md hover:from-indigo-500 hover:to-purple-600 transition-all duration-300"
        >
          + Create New Auction
        </button>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 text-gray-500 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center mt-5 font-medium">
            Error: {error}
          </div>
        ) : auctions.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            You haven't created any auctions yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {auctions.map((auction) => (
              <div
                key={auction._id}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-transform hover:scale-[1.02] flex flex-col"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {auction.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {auction.description}
                </p>

                {auction.images && auction.images.length > 0 ? (
                  <img
                    src={auction.images[0]}
                    alt="Auction"
                    className="w-full h-44 object-cover rounded-lg shadow-sm mb-4"
                  />
                ) : (
                  <div className="w-full h-44 flex items-center justify-center bg-gray-100 text-gray-400 rounded-lg mb-4 text-sm">
                    No image available
                  </div>
                )}

                <div className="space-y-2 text-sm sm:text-base mt-auto">
                  <p className="text-gray-700">
                    <span className="font-medium">Starting Price:</span>{" "}
                    <span className="text-green-600">
                      ₹{auction.startingPrice}
                    </span>
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Minimum Bid Increment:</span>{" "}
                    ₹{auction.minBidIncrement}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Highest Bid:</span> ₹
                    {auction.highestBid.amount}
                  </p>
                  <p className="text-gray-500 text-sm">
                    ⏳ Ends on:{" "}
                    <span className="font-medium">
                      {new Date(auction.endTime).toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
