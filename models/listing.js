const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    title: { type: String },
    quantity: { type: Number },
    category: { type: String, type: Array },
    isHalal: { type: Boolean },
    isVegetarian: { type: Boolean },
    description: { type: String },
    bestBefore: { type: Date },
    image: { type: String },
    status: { type: String },
    recipient: { type: String },
    batchID: { type: String },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
