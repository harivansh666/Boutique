import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true, min: 1 },
  size: { type: String, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // Clerk user ID or similar auth ID
    items: [orderItemSchema],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["placed", "confirmed", "stitching", "shipped", "delivered"],
      default: "placed",
    },
    shippingAddress: {
      fullName: { type: String, required: true },
      addressLine1: { type: String, required: true },
      addressLine2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String, required: true },
    },
    trackingId: { type: String },
  },
  { timestamps: true },
);

export const Order = mongoose.model("Order", orderSchema);
