import express from "express";
import nodemailer from "nodemailer";
import crypto from "crypto";
import OTPModel from "../models/OTP.js";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();
const otpRouter = express.Router();

// Log email config status on startup (without exposing secrets)
console.log("OTP Email Config:", {
  EMAIL: process.env.EMAIL ? `${process.env.EMAIL.substring(0, 4)}...` : "NOT SET",
  APP_PASSWORD: process.env.APP_PASSWORD ? "SET" : "NOT SET",
});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

// Function to generate OTP
const generateOTP = () => crypto.randomInt(100000, 999999).toString();

// Route to send OTP
otpRouter.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();

  try {
    // Store OTP in DB
    await OTPModel.findOneAndUpdate(
      { email },
      { otp, createdAt: Date.now() },
      { upsert: true }
    );

    // Send OTP via email
    transporter.sendMail(
      {
        from: process.env.EMAIL,
        to: email,
        subject: "FarmDirect - Your One-Time Password (OTP)",
        text: `Your FarmDirect OTP is: ${otp}. Please do not share this code with anyone.`,
      },
      (error, info) => {
        if (error) {
          console.error("Email sending failed:", error.message, error.code);
          return res
            .status(500)
            .json({ success: false, message: "Error sending OTP: " + error.message });
        }
        console.log("Email sent:", info.response);
        res.json({ success: true, message: "OTP sent successfully" });
      }
    );
  } catch (error) {
    console.error("Error in send-otp route:", error.message);
    res.status(500).json({ success: false, message: "Error sending OTP: " + error.message });
  }
});

// Route to verify OTP
otpRouter.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const storedOTP = await OTPModel.findOne({ email });

    if (!storedOTP || storedOTP.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // OTP verified successfully
    res.json({ success: true, message: "OTP verified" });
  } catch (error) {
    console.error("Error in verify-otp route:", error);
    res.status(500).json({ success: false, message: "Error verifying OTP" });
  }
});

// Reset Password otp generator
otpRouter.post("/login-send-otp", async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email exists in the User collection
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email not found" });
    }

    // Generate OTP
    const otp = generateOTP();

    // Store OTP in the OTP collection
    await OTPModel.findOneAndUpdate(
      { email },
      { otp, createdAt: Date.now() },
      { upsert: true }
    );

    // Send OTP via email
    transporter.sendMail(
      {
        from: process.env.EMAIL,
        to: email,
        subject: "FarmDirect - Your password reset OTP",
        text: `Your FarmDirect OTP for reset password is: ${otp}. Please do not share this code with anyone.`,
      },
      (error, info) => {
        if (error) {
          console.error("Email sending failed:", error.message, error.code);
          return res
            .status(500)
            .json({ success: false, message: "Error sending OTP: " + error.message });
        }
        console.log("Email sent:", info.response);
        res.json({ success: true, message: "OTP sent successfully" });
      }
    );
  } catch (error) {
    console.error("Error in login-send-otp route:", error.message);
    res.status(500).json({ success: false, message: "Error sending OTP: " + error.message });
  }
});

// Verify the otp for reset password
otpRouter.post("/login-verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const storedOTP = await OTPModel.findOne({ email });

    if (!storedOTP || storedOTP.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // OTP verified successfully, initiate login process
    res.json({ success: true, message: "OTP verified. Proceed to login" });
  } catch (error) {
    console.error("Error in login-verify-otp route:", error);
    res.status(500).json({ success: false, message: "Error verifying OTP" });
  }
});

export default otpRouter;
