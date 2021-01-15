const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema(
  {
    listingsCollection: { type: String, type: Array, unique: true },
    contactPerson: { type: String },
    contactNum: { type: Number },
    collectionAddress: { type: String },
    contributor: { type: String },
    status: { type: String },
  },
  { timestamps: true }
);

const Batch = mongoose.model("Batch", batchSchema);

module.exports = Batch;
