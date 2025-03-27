import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import validateEmail from "../utils/validation.js";
import userAuth from "../middlewares/auth.js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const authRouter = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret"; // Use env variable, fallback for safety

// POST /api/auth/signup
authRouter.post("/signup", async (req, res) => {
  try {
    let { name, email, phone, password, location } = req.body;
    email = email.toLowerCase();

    if (!validateEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format." });
    }

    if (!name || !email || !phone || !password || !location) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields. Please provide name, email, phone, password, and location.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, phone, passwordHash, location });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
      httpOnly: true, // Security improvement
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    res.status(201).json({ message: "Signup successful", token });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// POST /api/auth/login
authRouter.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase();

    if (!validateEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format." });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    if (!bcrypt.compareSync(password, user.passwordHash)) {
      res.clearCookie("token");
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
      httpOnly: true, // Security improvement
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/auth/check
authRouter.get("/check", userAuth, (req, res) => {
  res.json({ authenticated: true, user: req.user });
});

export default authRouter;
