const bcrypt = require("bcrypt");
const express = require("express");
const sessions = express.Router();
const User = require("../models/user.js");
const { StatusCodes } = require("http-status-codes");

sessions.get("/", (req, res) => {
  req.session.currentUser = currentUser;
  res.send(currentUser);
});

// POST on log-in /session
sessions.post("/", (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.status(500).send({ error: "Oops there's a problem with the server database" });
    } else if (!foundUser) {
      // res.status(401).send({ error: "Sorry, no user found" });
      res.status(401).send({ error: `Sorry, no user found <a href="/">Return</a>` });
    } else {//no error with server database and found user in database
      if (bcrypt.compareSync(req.body.password, foundUser.password)) { //password match
        req.session.currentUser = foundUser;
        res.status(200).send(foundUser);
      } else {
        // res.status(401).send({ error: "Password doesn't match" });
        res.status(401).send({ error: `Password does not match. <a href="/">Return</a>` });
      }
    }
  });
});

sessions.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie(this.cookie, { path: "/" });
    res.status(StatusCodes.OK).send({ msg: "Logging out" });
  });
});

module.exports = sessions;
