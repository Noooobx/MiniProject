import express from "express";
import Auction from "../models/Auction.js";

const router = express.Router();

// Create an auction
router.post("/create", async (req, res) => {
  try {
    const auction = new Auction(req.body);
    await auction.save();
    res.status(201).json({ message: "Auction created successfully", auction });
  } catch (error) {
    res.status(500).json({ error: "Failed to create auction", details: error });
  }
});

router.get("/:id/bids", async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    if (!auction) return res.status(404).json({ error: "Auction not found" });

    res.status(200).json(auction.bids);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bid history" });
  }
});


// Get all active auctions (for polling)
router.get("/active", async (req, res) => {
  try {
    const auctions = await Auction.find({ status: "active" }).sort({
      startTime: 1,
    });
    res.status(200).json(auctions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch auctions" });
  }
});

router.get("/ongoing", async (req, res) => {
  console.log("hello i am inside /ongoing");
  try {
    // ✅ FIX: Change "ongoing" to "active"
    const auctions = await Auction.find({ status: "active" }).sort({
      startTime: 1,
    });
    console.log("Auctions found:", auctions);
    res.status(200).json(auctions);
  } catch (error) {
    console.log("Error fetching ongoing auctions:", error);
    res.status(500).json({ error: "Failed to fetch ongoing auctions" });
  }
});

// Get auction details by ID (for polling)
router.get("/:id", async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    if (!auction) return res.status(404).json({ error: "Auction not found" });
    res.status(200).json(auction);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch auction details" });
  }
});

// Place a bid
router.post("/:id/bid", async (req, res) => {
  try {
    const { amount, bidderId } = req.body;
    const auction = await Auction.findById(req.params.id);

    if (!auction) return res.status(404).json({ error: "Auction not found" });
    if (Date.now() > new Date(auction.endTime))
      return res.status(400).json({ error: "Auction has ended" });

    const lastBid = auction.highestBid.amount || auction.startingPrice;
    if (amount < lastBid + auction.minBidIncrement)
      return res.status(400).json({
        error: "Bid must be higher than the last bid + min increment",
      });

    auction.bids.push({ bidderId, amount });
    auction.highestBid = { amount, bidderId };
    await auction.save();

    res.status(200).json({ message: "Bid placed successfully", auction });
  } catch (error) {
    res.status(500).json({ error: "Failed to place bid" });
  }
});

// End an auction manually
router.post("/:id/end", async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    if (!auction) return res.status(404).json({ error: "Auction not found" });

    auction.status = "completed";
    await auction.save();

    res.status(200).json({ message: "Auction ended successfully", auction });
  } catch (error) {
    res.status(500).json({ error: "Failed to end auction" });
  }
});

export default router;
