import React, { useState } from "react";
import axios from "axios";

const OtpTest = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");

  const sendOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/send-otp", { email });
      setOtpSent(true);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error sending OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/verify-otp", { email, otp });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">OTP Verification</h2>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={sendOtp}
          disabled={otpSent}
          className={`w-full mt-4 p-3 rounded-lg ${
            otpSent ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
          } text-white font-semibold`}
        >
          Send OTP
        </button>

        {otpSent && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full mt-4 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={verifyOtp}
              className="w-full mt-4 p-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold"
            >
              Verify OTP
            </button>
          </>
        )}

        {message && <p className="mt-4 text-center font-semibold text-yellow-400">{message}</p>}
      </div>
    </div>
  );
};

export default OtpTest;
