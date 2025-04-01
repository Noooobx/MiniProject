import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [otp, setOtp] = useState(""); // For OTP input
  const [otpSent, setOtpSent] = useState(false); // To track if OTP was sent

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleOtpChange = (e) => setOtp(e.target.value); // Handle OTP input

  // Send OTP email for password reset
  const sendEmailVerification = async () => {
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/api/login-send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to send OTP");
      setOtpSent(true); // OTP sent successfully
    } catch (error) {
      setError(error.message);
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/api/login-verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Invalid OTP");

      // OTP verified, show password reset field
      setEmailVerified(true);
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle password reset request
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (emailVerified) {
      try {
        const response = await axios.post(
          `${baseUrl}/api/auth/reset-password/${email}`,
          { password }
        );
        navigate("/login");
      } catch (error) {
        setError(error.response?.data?.message || "Password reset failed");
      }
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center relative"
      style={{ backgroundImage: "url('/Agriculture-budget.png')" }}
    >
      <div className="absolute inset-0 bg-opacity-30"></div>
      <div className="w-full max-w-md bg-white opacity-90 shadow-2xl border border-gray-200 rounded-xl p-8 relative z-10">
        <h2 className="text-2xl font-semibold text-center text-green-700 mb-6">
          Reset Your Password
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        <form onSubmit={handlePasswordReset} className="space-y-5">
          <div className="space-y-2">
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              placeholder="Enter your email"
              required
            />
            {!otpSent && (
              <button
                type="button"
                onClick={sendEmailVerification}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Send OTP
              </button>
            )}
          </div>

          {otpSent && !emailVerified && (
            <div className="space-y-2">
              <input
                type="text"
                name="otp"
                value={otp}
                onChange={handleOtpChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="Enter OTP"
                required
              />
              <button
                type="button"
                onClick={verifyOtp}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium"
                disabled={loading}
              >
                {loading ? "Verifying OTP..." : "Verify OTP"}
              </button>
            </div>
          )}

          {emailVerified && (
            <div className="space-y-2">
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="Enter your new password"
                required
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium"
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          )}
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Remembered your password?{" "}
          <button
            className="text-green-700 font-semibold hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
