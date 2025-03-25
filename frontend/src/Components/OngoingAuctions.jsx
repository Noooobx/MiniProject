import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OngoingAuctions() {
  const [auctions, setAuctions] = useState([]);
  const [error, setError] = useState(null); // Track errors
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/auctions/ongoing")
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
        return res.json();
      })
      .then((data) => setAuctions(data))
      .catch((error) => setError(error.message)); // Store error
  }, []);

  if (error) {
    return <div className="text-red-500 text-center mt-5">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-50 py-12 px-6">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-8 border border-gray-200">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Ongoing Auctions</h2>

        <button
          onClick={() => navigate("/newAuction")}
          className="w-full sm:w-auto block mx-auto mb-6 px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md hover:from-indigo-500 hover:to-purple-600 transition-all duration-300"
        >
          + Create New Auction
        </button>

        {auctions.length === 0 ? (
          <p className="text-center text-gray-500 text-lg"> No ongoing auctions at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {auctions.map((auction) => (
              <div key={auction._id} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 transition-transform hover:scale-[1.02] hover:shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900">{auction.name}</h3>
                <p className="text-gray-600 mt-1">
                  <span className="font-medium">Base Price:</span> <span className="text-green-600">${auction.basePrice}</span>
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Quantity:</span> {auction.quantity} {auction.unit}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Category:</span> {auction.category}
                </p>
                <p className="text-gray-500">
                  ⏳ Ends on: <span className="font-medium">{new Date(auction.endTime).toLocaleString()}</span>
                </p>

                {auction.images && auction.images.length > 0 && (
                  <img 
                    src={auction.images[0]} 
                    alt="Auction" 
                    className="mt-4 w-full h-40 object-cover rounded-lg shadow-md"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
