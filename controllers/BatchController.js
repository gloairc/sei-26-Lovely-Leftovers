const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const Batch = require("../models/batch");
// const { batchFind } = require("../functions/mongooseFn");

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

router.get("/", async (req, res) => {
  try {
    const data = await Batch.find();
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get("/:batchID", async (req, res) => {
  const batchID = req.params.batchID;
  try {
    const data = await Batch.findById(batchID, (err, oneBatch) => {
      return oneBatch;
    });
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.post(
  "/",
  body("foodListings", "Please enter food items").notEmpty(),
  body("contactPerson").trim().optional().notEmpty(),
  body("contactNum", "Please enter only digits").trim().optional(),
  body("collectionAddress").trim().optional(),
  body(
    "foodListings.*.title",
    "Food title has to be at least 3 characters long"
  )
    .trim()
    .isLength({ min: 3 }),
  body("foodListings.*.quantity", "Quantity must be at least 1")
    .trim()
    .isInt({ min: 1 })
    .notEmpty(),
  body("foodListings.*.category", "Please select at least one entry")
    .isArray({ min: 1 })
    .notEmpty()
    .trim(),
  body(
    "foodListings.*.category.*",
    "Only categories provided are considered valid entries"
  ).isIn([
    "pork",
    "chicken",
    "beef",
    "frozen food",
    "vegetable",
    "bread",
    "dessert",
    "noodles",
    "rice",
    "cooked meal",
    "snacks",
  ]),
  body("foodListings.*.isHalal", "Please pick an option for halal")
    .notEmpty()
    .isBoolean(),
  body("foodListings.*.isVegetarian", "Please pick an option for vegetarian")
    .notEmpty()
    .isBoolean(),
  body("foodListings.*.description").trim().optional(),
  body("foodListings.*.bestBefore", "Please enter a valid date/time")
    .trim()
    .notEmpty()
    .isBefore(Date.now()),
  body("foodListings.*.imgFile").trim().optional(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const locals = { newContribution: req.body, errors: errors.array() };
      res.status(StatusCodes.BAD_REQUEST).send(locals);
    } else {
      const newContribution = req.body;
      console.log(newContribution);
      Batch.create(newContribution, (error, data) => {
        res.status(StatusCodes.CREATED).send(data);
      });
    }
  }
);

// router.get("/:batchID/listing", async (req, res) => {
//   const batchID = req.params.batchID;
//   try {
//     const data = await Batch.findById(batchID, (err, oneBatchListing) => {
//       console.log(oneBatchListing.foodListings);
//       const lists = oneBatchListing.foodListings;
//       return lists;
//     });
//     const test = data.foodListings;
//     res.status(200).json({ success: true, test });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// });

// router.get("/:batchID/listing/:foodListingID", (req, res) => {
//   const batchID = req.params.batchID;
//   const foodListingID = req.params.foodListingID;
//   Batch.findById(batchID, (err, oneBatchListing) => {
//     const food = oneBatchListing.foodListings.id(foodListingID);
//     res.send(food);
//   });
// });

module.exports = router;
