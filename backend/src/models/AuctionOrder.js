import mongoose from "mongoose";

const auctionOrderSchema = new mongoose.Schema(
  {
    auctionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auction",
      required: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed"],
      default: "pending",
    },
    pickupLocation: {
      type: String,  // This can be updated later when the buyer confirms
      default: null,
    },
    contactInfo: {
      type: String,  // This can be updated later as well
      default: null,
    },
    auctionEndTime: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const AuctionOrder = mongoose.model("AuctionOrder", auctionOrderSchema);
export default AuctionOrder;
