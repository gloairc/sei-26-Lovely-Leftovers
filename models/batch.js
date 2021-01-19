const mongoose = require("mongoose");
const listingSchema = require("./listing");

const batchSchema = new mongoose.Schema(
  {
    contactPerson: { type: String },
    contactNum: { type: Number, min: 10000000, max: 99999999 },
    collectionAddress: { type: String },
    contributorID: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
    status: { type: String, default: "active" },
    foodListings: [listingSchema],
  },
  { timestamps: true }
);

const Batch = mongoose.model("Batch", batchSchema);

module.exports = Batch;
