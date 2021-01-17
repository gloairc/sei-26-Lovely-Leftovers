const express = require("express");
const router = express.Router();
// const { body, validationResult } = require("express-validator");
// const { StatusCodes } = require("http-status-codes");
// const Listing = require("../models/listing");

router.get("/", (req, res) => {
  res.send("listing");
});

module.exports = router;
