import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: String, required: true },
    productType:{type:String,required:true},
    image:{type:String,required:true},
    video:{type:String,required:true},
    description: { type: String },
    category: { type: String, required: true },
    images: [{ type: String }] // Array of image URLs
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);
export default Listing;
