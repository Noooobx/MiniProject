import express from "express";
import Order from "../models/Order.js";

const orderRouter = express.Router();

// Buyer places an order request
orderRouter.post("/", async (req, res) => {
  const { buyerId, sellerId, productId, amount } = req.body;

  try {
    const order = new Order({
      buyerId,
      sellerId,
      productId,
      amount,
      status: "pending",
    });
    console.log("inside the buyer");
    await order.save();
    res.status(201).json({ message: "Order placed. Waiting for seller confirmation.", order });
  } catch (error) {
    res.status(500).json({ error: "Error placing order" });
  }
});

// Seller confirms order pickup
orderRouter.put("/:orderId/confirm", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ error: "Order not found" });

    order.status = "confirmed";
    await order.save();

    res.json({ message: "Order confirmed!", order });
  } catch (error) {
    res.status(500).json({ error: "Error confirming order" });
  }
});

// Get all orders for a specific buyer or seller
orderRouter.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ buyerId: req.params.userId }, { sellerId: req.params.userId }],
    }).populate("productId");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching orders" });
  }
});

export default orderRouter;
