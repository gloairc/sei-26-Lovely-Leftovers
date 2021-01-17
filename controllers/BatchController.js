const express = require("express");
const router = express.Router();
// const { body, validationResult } = require("express-validator");
// const { StatusCodes } = require("http-status-codes");
// const Batch = require("../models/batch");

router.get("/", (req, res) => {
  res.send("batch");
});

module.exports = router;
