const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    category: [{ type: String }],
    isHalal: { type: Boolean, required: true },
    isVegetarian: { type: Boolean, required: true },
    description: { type: String },
    bestBefore: { type: Date, required: true },
    imgFile: { type: String },
    status: { type: String, default: "active" },
    recipient: { type: String, default: "null" },
  },
  { timestamps: true }
);

module.exports = listingSchema;
