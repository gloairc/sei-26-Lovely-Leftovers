require("dotenv").config();

const path = require("path");
const express = require("express");
const methodOverride = require("method-override");
const app = express();
// const MONGODB_URI="mongodb+srv://sei-26-lll-user-00:JD78CpLePbhgh4X@lovelyleftovers-sg.whj60.mongodb.net/lovely?retryWrites=true&w=majority";
var MONGODB_URI =
  "mongodb+srv://sei-26-lll-user-00:JD78CpLePbhgh4X@lovelyleftovers-sg.whj60.mongodb.net/lovely?retryWrites=true&w=majority";

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json());

const session = require("express-session");
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

const mongoose = require("mongoose");
mongoose.connect(MONGODB_URI || "mongodb://127.0.0.1:27017/lovely", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const BatchController = require("./controllers/BatchController");
app.use("/batch", BatchController);

const ListingController = require("./controllers/ListingController");
app.use("/listing", ListingController);

const UserController = require("./controllers/UserController");
app.use("/user", UserController);

const sessionController = require("./controllers/SessionsController");
app.use("/session", sessionController);

app.get("/", (req, res) => {
  res.send("test");
});

const port = process.env.PORT || 4001;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client-react/build"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "client-react", "build", "index.html")
    );
  });
}

app.listen(port, () => {
  console.log("Server is listening on port" + port);
});
