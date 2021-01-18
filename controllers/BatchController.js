const express = require("express");
const router = express.Router();
// const { body, validationResult } = require("express-validator");
// const { StatusCodes } = require("http-status-codes");
const Batch = require("../models/batch");

router.get("/seed", (req, res) => {
  Batch.create(
    [
      {
        contactPerson: "Zoro",
        contactNum: 91234567,
        collectionAddress: "123 Anson Road",
        status: "active",
        foodListings: [
          {
            title: "Papaya",
            quantity: 5,
            category: ["fruit"],
            isHalal: true,
            isVegetarian: true,
            description: "Juicy Yummy",
            bestBefore: Date.now(),
            status: "inactive",
          },
        ],
      },
      {
        contactPerson: "Toro",
        contactNum: 89898989,
        collectionAddress: "99 Anson Avenue",
        status: "inactive",
        foodListings: [
          {
            title: "Durian",
            quantity: 50,
            category: ["fruit"],
            isHalal: true,
            isVegetarian: true,
            description: "Smelly Yummy",
            bestBefore: Date.now(),
            status: "active",
          },
          {
            title: "Pear",
            quantity: 500,
            category: ["fruit"],
            isHalal: true,
            isVegetarian: true,
            description: "Juicy Yummy Crunchy",
            bestBefore: Date.now(),
            status: "active",
          },
        ],
      },
      {
        contactPerson: "Boro",
        contactNum: 12345678,
        collectionAddress: "-10 Anson Avenue",
        status: "active",
        foodListings: [
          {
            title: "Mango",
            quantity: 50,
            category: ["fruit"],
            isHalal: true,
            isVegetarian: true,
            description: "Yellow Juicy Yummy",
            bestBefore: Date.now(),
            status: "active",
          },
          {
            title: "Jackfruit",
            quantity: 44,
            category: ["fruit"],
            isHalal: true,
            isVegetarian: true,
            description: "Juicy nice cool Crunchy",
            bestBefore: Date.now(),
            status: "active",
          },
          {
            title: "Durian",
            quantity: 99,
            category: ["fruit"],
            isHalal: true,
            isVegetarian: true,
            description: "Not fresh",
            bestBefore: Date.now(),
            status: "inactive",
          },
        ],
      },
    ],

    (error, batch) => {
      if (error) {
        res.send(error);
      } else {
        res.send(batch);
      }
    }
  );
});

router.get("/", (req, res) => {
  Batch.find({}, (err, batch) => {
    res.send(batch);
  });
});

router.get("/:batchID", (req, res) => {
  const batchID = req.params.batchID;
  Batch.findById(batchID, (err, oneBatch) => {
    res.send(oneBatch);
  });
});

router.get("/:batchID/listing", (req, res) => {
  const batchID = req.params.batchID;
  Batch.findById(batchID, (err, oneBatchListing) => {
    res.send(oneBatchListing.foodListings);
  });
});

router.get("/:batchID/listing/:foodListingID", (req, res) => {
  const batchID = req.params.batchID;
  const foodListingID = req.params.foodListingID;
  Batch.findById(batchID, (err, oneBatchListing) => {
    const food = oneBatchListing.foodListings.id(foodListingID);
    res.send(food);
  });
});

module.exports = router;
