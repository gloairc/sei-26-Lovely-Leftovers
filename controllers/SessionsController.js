const bcrypt = require("bcrypt");
const express = require("express");
const sessions = express.Router();
const User = require("../models/user.js");
const { StatusCodes } = require("http-status-codes");

sessions.get("/", (req, res) => {
  req.session.currentUser = currentUser;
  res.send(currentUser);
});

module.exports = sessions;
