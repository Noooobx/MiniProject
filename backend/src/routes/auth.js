import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import validateEmail from "../utils/validation.js";
import userAuth from "../middlewares/auth.js";

const authRouter = express.Router();

// POST /api/auth/signup
authRouter.post("/signup", async (req, res) => {
  try {
    let { name, email, phone, password, location } = req.body;

    email = email.toLowerCase();
    if (!validateEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format." });
    }

    // Check if all feilds are present.
    if (!name || !email || !phone || !password || !location) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields. Please provide name, email, phone, password, and location.",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      phone,
      passwordHash,
      location,
    });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
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
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format." });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    // Verify password
    if (!bcrypt.compareSync(password, user.passwordHash)) {
      // Clear any existing auth token in case of failed login
      res.clearCookie("token");
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true, // Prevent client-side access (important for security)
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "None", // Prevent CSRF attacks
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

authRouter.get("/check", userAuth, (req, res) => {
  res.json({ authenticated: true, user: req.user });
});

export default authRouter;
