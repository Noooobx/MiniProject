import React, { useEffect, useState } from "react";

const FarmerDetails = ({ id }) => {
    console.log(id)
    const baseUrl = import.meta.env.VITE_BASE_URL;
  const [sellerDetails, setSellerDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSellerDetails = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/user/${id}`);
        if (!res.ok) throw new Error("Failed to fetch farmer details");
        const data = await res.json();
        setSellerDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSellerDetails();
  }, [id]);

  if (!id) return null;
  if (loading)
    return (
      <p className="text-sm text-gray-500 mt-4 animate-pulse">
        Loading Farmer Details...
      </p>
    );
  if (error) return <p className="text-sm text-red-500 mt-4">Error: {error}</p>;

  return (
    <div className="bg-gray-100 p-4 rounded-xl flex flex-col gap-2 mt-4 animate-fadeIn">
      <h3 className="text-lg font-semibold text-gray-800">
        Farmer Information
      </h3>
      <p className="text-gray-700 text-sm">
        <strong>Name:</strong> {sellerDetails.name}
      </p>
      <p className="text-gray-700 text-sm">
        {console.log(sellerDetails)}
        <strong>Contact:</strong> 9778129217
      </p>
      <p className="text-gray-700 text-sm">
        <strong>Location:</strong> {sellerDetails.location}
      </p>
    </div>
  );
};

export default FarmerDetails;
