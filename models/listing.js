const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    title: { type: String, required: false },
    quantity: { type: Number, default: 1 },
    weight: { type: Number },
    unit: { type: String },
    category: [{ type: String }],
    isHalal: { type: Boolean, required: false },
    isVegetarian: { type: Boolean, required: false },
    description: { type: String, default: "nil" },
    bestBefore: { type: String, required: false },
    imgFile: { type: String, default: "https://www.kindpng.com/picc/m/29-294916_food-donation-transparent-hd-png-download.png" },
    status: { type: String, default: "active" },
    recipient: { type: String, default: "null" },
  },
  { timestamps: true }
);

module.exports = listingSchema;

//  alternative image https://i0.wp.com/www.eatthis.com/wp-content/uploads/2019/12/grain-free-diet.jpg?resize=640%2C360&ssl=1