import mongoose from "mongoose";

const customStitchSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    measurements: {
      bust: { type: Number, required: true },
      waist: { type: Number, required: true },
      hip: { type: Number, required: true },
      shoulder: { type: Number, required: true },
      armLength: { type: Number, required: true },
      height: { type: Number, required: true },
    },
    designStyle: {
      type: String,
      required: true,
      enum: [
        "Traditional",
        "Modern Fusion",
        "Minimalist",
        "Heavy Embroidery",
        "Mirror Work",
        "Block Print",
        "Floral",
      ],
    },
    referenceImage: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "reviewing", "approved", "stitching", "completed"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export const CustomStitch = mongoose.model("CustomStitch", customStitchSchema);
