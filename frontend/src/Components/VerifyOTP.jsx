import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/otp/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: localStorage.getItem("email"), otp }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "OTP verification failed");

      alert("Login successful!");
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleVerify} className="p-6 bg-white shadow-md rounded-md">
        <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          placeholder="Enter OTP"
          required
        />
        <button type="submit" className="w-full mt-4 bg-green-600 text-white py-2 rounded-md" disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
}
