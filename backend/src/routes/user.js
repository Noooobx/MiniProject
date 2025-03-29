import express from "express";
import User from "../models/User.js"; // Adjust path based on your structure

const userRouter = express.Router();

// GET user by ID
userRouter.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      name: user.name,
      contact: user.contact,
      location: user.location,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

export default userRouter;
