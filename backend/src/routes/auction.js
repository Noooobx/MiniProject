import express from "express";
import Auction from "../models/Auction.js";
import userAuth from "../middlewares/auth.js";

const router = express.Router();

// Create an auction
router.post("/create",userAuth, async (req, res) => {
  try {
    const inputData =  req.body;
    //console.log(inputData);
    inputData["sellerId"] = req.currentUser.id;
    console.log(inputData)
    const auction = new Auction(req.body);
    await auction.save();
    res.status(201).json({ message: "Auction created successfully", auction });
  } catch (error) {
    res.status(500).json({ error: "Failed to create auction", details: error });
  }
});

router.get("/seller/list",userAuth, async (req, res) => {
  try {
    const auctions = await Auction.find({ sellerId: req.currentUser.id });

    // if (!auctions || auctions.length === 0) {
    //   return res
    //     .status(404)
    //     .json({ error: "No auctions found for this seller" });
    // }

    res.status(200).json(auctions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch seller auctions" });
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

router.get("/ongoing", userAuth, async (req, res) => {
  try {
    const userId = req.currentUser.id;

    const auctions = await Auction.find({
      status: "active",
      sellerId: { $ne: userId }, // Exclude auctions created by the current user
    })
      .sort({ startTime: 1 })
      .populate({
        path: "highestBid.bidderId", // Populating bidderId inside highestBid
        select: "name", // Only fetch the name field of the user
      });

    res.status(200).json(auctions);
  } catch (error) {
    console.error("Error fetching ongoing auctions:", error);
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
router.post("/:id/bid", userAuth, async (req, res) => {
  try {
    const { id: bidderId } = req.currentUser; // ✅ Extract bidderId correctly
    const { amount } = req.body; // ✅ Get only amount from body
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
    console.error("Bid Error:", error);
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
