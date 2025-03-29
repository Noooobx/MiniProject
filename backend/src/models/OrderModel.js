import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",  // Changed from "Product" to "Listing"
    required: true,
  },
  quantity: { type: Number, required: true },
  pickupLocation: { type: String, required: true },
  pickupDate: { type: Date, required: true },
  status: { type: String, default: "pending" },
  buyer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  sellerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  }, // Only store the seller's ID
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
