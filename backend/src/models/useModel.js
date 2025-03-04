import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{10}$/, "Invalid phone number"], // Ensures a 10-digit phone number
  },
  password: { type: String, required: true, minlength: 6 }, // Minimum password length
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

export default User;
