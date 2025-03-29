import express from "express";
import Order from "../models/OrderModel.js";
import Listing from "../models/Listing.js";
import userAuth from "../middlewares/auth.js";
import User from "../models/User.js";

const orderRouter = express.Router();

// Create Order - POST /api/orders
orderRouter.post("/",userAuth, async (req, res) => {
  const { listingId, quantity, pickupLocation, pickupDate } = req.body;
  
  const buyerEmail = req.currentUser.email;
  const buyerName = await User.findOne({ _id: req.currentUser.id.toString() }).select('name');

  // Ensure all fields are provided
  if (!listingId || !quantity || !pickupLocation || !pickupDate || !buyerName || !buyerEmail) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  try {
    // Get the listing details to fetch seller information
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res
        .status(404)
        .json({ success: false, message: "Listing not found." });
    }

    // Create new order with buyer and seller information from the client
    const newOrder = new Order({
      productId: listingId, // Updated to listingId
      quantity,
      pickupLocation,
      pickupDate,
      buyer: {
        name: buyerName.name, // From the client
        email: buyerEmail, // From the client
      },
      sellerId: listing.sellerId, // Only store sellerId as per your updated schema
    });

    // Save the order to the database
    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order successfully created!",
      order: newOrder,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
});

// Get All Orders - GET /api/orders
orderRouter.get("/",userAuth, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("productId") // Populate listing details for product
      .populate("sellerId"); // Populate sellerId field (now just the seller's ID)

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
});

// Get Order by ID - GET /api/orders/:id
orderRouter.get("/:id",userAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id)
      .populate("productId") // Populate listing details
      .populate("sellerId"); // Populate sellerId field

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch order" });
  }
});

export default orderRouter;
