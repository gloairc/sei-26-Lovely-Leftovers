const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    familyName: { type: String, required: true },
    organisation: { type: String, default: "NIL" },
    contactNum: { type: Number, required: true, min: 10000000, max: 99999999 },
    email: { type: String, required: true },
    username: { type: String, required: true, unique: true, minlength: 8 },
    password: { type: String, required: true },
    type: { type: String, required: true, enum: ["Contributor", "Recipient", "Admin"] },
    contributedList: [{ type: mongoose.Schema.Types.ObjectID, ref: "Batch" }],
    myCart: [{ type: mongoose.Schema.Types.ObjectID, ref: "Listing" }],
    receivedList: Array, //e.g [{batchID, listingID},{batchID, listingID}] // [{ type: mongoose.Schema.Types.ObjectID, ref: "Listing" }],
    status: { type: String, default: "Active", enum: ["Active", "Inactive"] },
    imgFile: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;