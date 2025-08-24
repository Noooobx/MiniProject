import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../utils/authUtils";

export default function AuthForm() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  console.log(baseUrl);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    location: "",
  });

  useEffect(() => {
    const checkUserAuth = async () => {
      const isAuthenticated = await checkAuth();
      if (isAuthenticated) {
        navigate("/buy");
      }
    };
    checkUserAuth();
  }, [navigate]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOTP = async () => {
    setError(null);
    try {
      const response = await fetch(`http://localhost:3000/api/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to send OTP");
      setOtpSent(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const verifyOTP = async () => {
    setError(null);
    try {
      const response = await fetch(`http://localhost:3000/api/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Invalid OTP");
      setOtpVerified(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
    const body = isLogin
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (!response.ok) throw new Error(data.message || "Something went wrong");

      localStorage.setItem("token", data.token);
      window.location.reload();
      navigate("/buy");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center relative"
      style={{ backgroundImage: "url('/Agriculture-budget.png')" }}
    >
      <div className="absolute inset-0 bg-opacity-30"></div>
      <div className="w-full max-w-md bg-white opacity-90 shadow-2xl border border-gray-200 rounded-xl p-8 relative z-10">
        <h2 className="text-2xl font-semibold text-center text-green-700 mb-6">
          {isLogin ? "Login to FarmDirect" : "Join FarmDirect"}
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              placeholder="Enter your name"
              required
            />
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              placeholder="Enter your email"
              required
              disabled={!isLogin && otpSent}
            />
            {!isLogin && !otpSent && (
              <button
                type="button"
                onClick={sendOTP}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Verify Email
              </button>
            )}
          </div>

          {/* OTP Verification (Only for Signup) */}
          {!isLogin && otpSent && !otpVerified && (
            <div className="space-y-2">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="Enter OTP"
              />
              <button
                type="button"
                onClick={verifyOTP}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium"
              >
                Verify OTP
              </button>
            </div>
          )}

          {!isLogin && (
            <>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="Enter your phone number"
                required
                disabled={!otpVerified}
              />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="Enter your location"
                required
                disabled={!otpVerified}
              />
            </>
          )}

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            placeholder="Enter your password"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium"
            disabled={!isLogin && (!otpVerified || loading)}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
          </button>

          {/* Forgot Password Link (Only in Login) */}
          {isLogin && (
            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate("/reset-password")}
                className="text-blue-600 flex text-sm font-medium cursor-pointer hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          )}
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm">
          {isLogin ? "New to FarmDirect?" : "Already have an account?"}{" "}
          <button
            className="text-green-700 font-semibold hover:underline"
            onClick={() => setIsLogin(!isLogin)}
            disabled={loading}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
