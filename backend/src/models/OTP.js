import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // Expires in 5 mins
});

const OTPModel = mongoose.model("OTP", OTPSchema);
export default OTPModel;
