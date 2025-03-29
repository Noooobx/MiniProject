import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    startingPrice: { type: Number, required: true },
    minBidIncrement: { type: Number, required: true, default: 1 },
    reservePrice: { type: Number }, // Optional
    images: [{ type: String }], // Array of image URLs
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    highestBid: {
      amount: { type: Number, default: 0 },
      bidderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    bids: [
      {
        bidderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        amount: { type: Number, required: true },
        bidTime: { type: Date, default: Date.now },
      },
    ],
    auctionType: { type: String, enum: ["open", "sealed"], default: "open" },
    status: {
      type: String,
      enum: ["active", "completed", "canceled"],
      default: "active",
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Added field
  },
  { timestamps: true }
);

const Auction = mongoose.model("Auction", auctionSchema);
export default Auction;
