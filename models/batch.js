const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema(
  {
    contactPerson: { type: String },
    contactNum: { type: Number },
    collectionAddress: { type: String },
    contributorID: { type: String },
    status: { type: String },
  },
  { timestamps: true }
);

const Batch = mongoose.model("Batch", batchSchema);

module.exports = Batch;
