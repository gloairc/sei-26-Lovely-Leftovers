const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    familyName: { type: String, required: true },
    organisation: { type: String },
    contactNum: { type: Number, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
    batchList: [{ type: mongoose.Schema.Types.ObjectID, ref: "Batch" }],
    myCart: [{ type: mongoose.Schema.Types.ObjectID, ref: "Listing" }],
    receivedList: [{ type: mongoose.Schema.Types.ObjectID, ref: "Listing" }],
    status: { type: String, default: "active" },
    imgFile: { type: String },
  },
  { timestamps: true }
);

const Listing = mongoose.model("User", userSchema);

module.exports = Listing;
