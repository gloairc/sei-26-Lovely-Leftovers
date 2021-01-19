const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    title: { type: String, required: false },
    quantity: { type: Number, default: 1 },
    category: [{ type: String }],
    isHalal: { type: Boolean, required: false },
    isVegetarian: { type: Boolean, required: false },
    description: { type: String },
    bestBefore: { type: Date, required: false },
    imgFile: { type: String },
    status: { type: String, default: "active" },
    recipient: { type: String, default: "null" },
  },
  { timestamps: true }
);

module.exports = listingSchema;
