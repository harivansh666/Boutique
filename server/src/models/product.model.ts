import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: {
    type: String,
    enum: ["suits", "saree", "lehenga", "readymade", "kurta", "dresses"],
    required: true,
  },
  images: [{ type: String, required: true }],
  fabric: { type: String, required: true },
  sizes: [{ type: String, required: true }],
  originalPrice: { type: Number },
  featured: { type: Boolean, default: false },
  inStock: { type: Boolean, default: true },
});

export const Product = mongoose.model("Product", productSchema);
