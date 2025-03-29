import express from "express";
import Listing from "../models/Listing.js";
import mongoose from "mongoose";
import userAuth from "../middlewares/auth.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinaryConfig.js";

const listingRouter = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "product_images", // Change this to your desired folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});
const upload = multer({ storage });


// Upload image to cloudinary.
listingRouter.post("/upload",userAuth, upload.single("image"), async (req, res) => {
  try {
    res.json({ imageUrl: req.file.path }); // Cloudinary returns the image URL
  } catch (error) {
    res.status(500).json({ error: "Image upload failed" });
  }
});

// Add item to inventory
listingRouter.post("/add/item",userAuth, async (req, res) => {
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

    // Extract the user ID from the authentication middleware
    const id = req.currentUser.id;
    const sellerId = id; // This should come from the decoded JWT token

    if (!sellerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Seller ID not found",
      });
    }

    const newListing = new Listing({
      sellerId, // Use the correct seller ID from the logged-in user
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
      data: newListing,
    });
  } catch (error) {
    console.error("Add product failed", error);
    res
      .status(500)
      .json({ message: "Add product failed", error: error.message });
  }
});


listingRouter.get("/listings/seller/:sellerId", async (req, res) => {
  try {
    const { sellerId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid seller ID format" });
    }

    const sellerListings = await Listing.find({ sellerId });

    if (sellerListings.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No products found for this seller" });
    }

    res.status(200).json({ success: true, data: sellerListings });
  } catch (error) {
    console.error("Error fetching seller listings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch seller listings",
      error: error.message,
    });
  }
});

// Delete item fromt the inventory 
listingRouter.delete("/remove",userAuth, async (req, res) => {
  try {
    
    const { id } = req.currentUser;
    const userId = id.toString();

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid ID format" });
    }

    // Find and delete listing
    const deletedItem = await Listing.findOneAndDelete({ sellerId: userId });

    if (!deletedItem) {
      console.warn(`Listing not found: ${userId}`);
      return res
        .status(404)
        .json({ success: false, message: "Listing not found" });
    }


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

listingRouter.get("/listings/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid ID format" });
    }

    const product = await Listing.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch product details",
      error: error.message,
    });
  }
});

// For Buy.jsx ie.. all items except the currentUsers inventory Item.
listingRouter.get("/listings",userAuth, async (req, res) => {
  try {
    const { id } = req.currentUser; // Get sellerId from query params

    if (!id) {
      return res.status(400).json({ success: false, message: "sellerId is required" });
    }

    const listings = await Listing.find({ sellerId: { $ne: id } });

    res.status(200).json({ success: true, data: listings });
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch listings",
      error: error.message,
    });
  }
});


export default listingRouter;
