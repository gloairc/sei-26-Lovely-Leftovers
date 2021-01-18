const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    organisation: { type: String },
    contactNum: { type: Number, required: true, min: 10000000, max: 99999999 },
    email: { type: String, required: true },
    username: { type: String, unique: true, required: true, minlength: 8 },
    password: { type: String, required: true },
    type: { type: String, required: true, enum: ["Contributor", "Recipient", "Admin"] },
    batchList: { type: Array },
    myCart: { type: Array },
    receivedList: { type: Array },
    imgFile: { type: String },
    status: { type: String, default: "Active", enum: ["Active", "Inactive"] },
},
    { timestamps: true },
)

const User = mongoose.model('User', userSchema)

module.exports = User