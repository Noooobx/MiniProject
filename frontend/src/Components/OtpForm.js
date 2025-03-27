import { useState } from "react";
import axios from "axios";

const OtpForm = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: Enter Email, 2: Enter OTP
  const [message, setMessage] = useState("");

  const sendOtp = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/email/send-otp", { email });
      setMessage(res.data.message);
      setStep(2);
    } catch (error) {
      setMessage(error.response?.data?.error || "Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/email/verify-otp", { email, otp });
      setMessage(res.data.message);
      setStep(3); // OTP verified
    } catch (error) {
      setMessage(error.response?.data?.error || "Invalid OTP");
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">OTP Verification</h2>
      {step === 1 && (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <button onClick={sendOtp} className="w-full bg-blue-500 text-white p-2 rounded">Send OTP</button>
        </>
      )}
      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <button onClick={verifyOtp} className="w-full bg-green-500 text-white p-2 rounded">Verify OTP</button>
        </>
      )}
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default OtpForm;
