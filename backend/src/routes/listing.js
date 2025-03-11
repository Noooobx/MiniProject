import express from "express";
import Listing from "../models/Listing.js";
import mongoose from "mongoose";

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

export default listingRouter;
