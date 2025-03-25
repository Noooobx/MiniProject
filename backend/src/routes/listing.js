import express from "express";
import Listing from "../models/Listing.js";
import mongoose from "mongoose";
import userAuth from "../middlewares/auth.js";

const listingRouter = express.Router();

listingRouter.post("/add/item", async (req, res) => {
  try {
    const {
      name,
      price,
      quantity,
      productType,
      image,
      video,
      description,
      category,
    } = req.body;

    if (!name || !price || !quantity || !category || !productType) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: name, price, quantity, category, productType",
      });
    }

    const sellerId = new mongoose.Types.ObjectId();

    const newListing = new Listing({
      sellerId,
      name,
      price,
      quantity,
      productType,
      image,
      video,
      description,
      category,
    });

    await newListing.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully!",
      data: {
        _id: newListing._id,
        name: newListing.name,
        price: newListing.price,
        quantity: newListing.quantity,
        productType: newListing.productType,
        category: newListing.category,
        image: newListing.image,
        video: newListing.video,
        description: newListing.description,
        sellerId: newListing.sellerId,
      },
    });
  } catch (error) {
    console.error("Add product failed", error);
    res
      .status(500)
      .json({ message: "Add product failed", error: error.message });
  }
});

listingRouter.delete("/remove/:id", async (req, res) => {
  try {
    console.log("inside")
    const { id } = req.params;
    console.log(id)

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID format" });
    }

    // Find and delete listing
    const deletedItem = await Listing.findByIdAndDelete(id);

    if (!deletedItem) {
      console.warn(`Listing not found: ${id}`);
      return res.status(404).json({ success: false, message: "Listing not found" });
    }

    console.log(`Listing deleted successfully: ${id}`);

    res.status(200).json({
      success: true,
      message: "Listing removed successfully!",
      deletedItem, // Return deleted item if needed
    });

  } catch (error) {
    console.error("Error removing listing:", error);

    res.status(500).json({
      success: false,
      message: "Failed to remove listing",
      error: error.message,
    });
  }
});

listingRouter.get("/listings", async (req, res) => {
  try {
    const listings = await Listing.find();
    res.status(200).json({ success: true, data: listings });
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ success: false, message: "Failed to fetch listings", error: error.message });
  }
});


export default listingRouter;
