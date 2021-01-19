const mongoose = require("mongoose");
const listingSchema = require("./listing");

const batchSchema = new mongoose.Schema(
  {
    contactPerson: { type: String },
    contactNum: { type: Number },
    collectionAddress: { type: String },
    contributorID: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
    status: { type: String, default: "active" },
    foodListings: [listingSchema],
  },
  { timestamps: true }
);

const Batch = mongoose.model("Batch", batchSchema);

module.exports = Batch;
