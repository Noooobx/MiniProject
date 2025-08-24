import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const emailRouter = express.Router();

// Store OTPs temporarily (use a database in production)
const otpStorage = {};


// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// 📌 **Send OTP Route**
emailRouter.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required" });

  const otp = generateOTP();
  otpStorage[email] = otp; // Store OTP temporarily

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

// 📌 **Verify OTP Route**
emailRouter.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) return res.status(400).json({ error: "Email and OTP required" });

  if (otpStorage[email] === otp) {
    delete otpStorage[email]; // Remove OTP after successful verification
    res.status(200).json({ message: "OTP verified successfully" });
  } else {
    res.status(400).json({ error: "Invalid OTP" });
  }
});

export default emailRouter;
