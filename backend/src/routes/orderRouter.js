import express from "express";
import Order from "../models/OrderModel.js";
import Listing from "../models/Listing.js";
import userAuth from "../middlewares/auth.js";
import User from "../models/User.js";

const orderRouter = express.Router();

// Create Order - POST /api/orders
orderRouter.post("/", userAuth, async (req, res) => {
  try {
    const { listingId, quantity, pickupLocation, pickupDate } = req.body;
    const buyerEmail = req.currentUser.email;

    // Get buyer name inside try block to prevent potential crashes
    const buyer = await User.findById(req.currentUser.id).select("name");
    if (!buyer)
      return res
        .status(400)
        .json({ success: false, message: "Buyer not found." });

    // Ensure all fields are provided
    if (
      !listingId ||
      !quantity ||
      !pickupLocation ||
      !pickupDate ||
      !buyer.name ||
      !buyerEmail
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    // Get the listing details
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res
        .status(404)
        .json({ success: false, message: "Listing not found." });
    }

    // Create new order
    const newOrder = new Order({
      productId: listingId,
      quantity,
      pickupLocation,
      pickupDate,
      buyer: {
        name: buyer.name,
        email: buyerEmail,
      },
      sellerId: listing.sellerId,
    });

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
orderRouter.get("/", userAuth, async (req, res) => {
  try {
    const { email } = req.currentUser;
    const orders = await Order.find({ "buyer.email": email })
      .populate("productId")
      .populate("sellerId");

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
});

// Check for confirmed deals - GET /api/orders/show-pending
orderRouter.get("/show-pending", async (req, res) => {
  try {
    const orders = await Order.find({ status: { $ne: "pending" } });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get Order by ID - GET /api/orders/:id
orderRouter.get("/:id", userAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("productId")
      .populate("sellerId");

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

// Confirm the pickup and deal - PATCH /api/orders/:orderId/pickup
orderRouter.patch("/:orderId/pickup", userAuth, async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find the order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Find the listing associated with this order
    const listing = await Listing.findById(order.productId);
    if (!listing) {
      return res.status(404).json({ success: false, message: "Listing not found" });
    }

    // Reduce listing quantity
    listing.quantity -= order.quantity;
    if (listing.quantity < 0) listing.quantity = 0; // Prevent negative values

    // Save the updated listing
    await listing.save();

    // Mark order as finished
    order.status = "Finished";
    await order.save();

    res.json({ success: true, message: "Order marked as picked up", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


export default orderRouter;
