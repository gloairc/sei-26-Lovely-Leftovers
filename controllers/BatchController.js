const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const Batch = require("../models/batch");
// const foodCat = require("../dataDump/dataDump");
const moment = require("moment");
const { isDate } = require("moment");
const User = require("../models/user");
// const { batchFind } = require("../functions/mongooseFn");
const foodCat = [
  "Meat",
  "Seafood",
  "Fruits",
  "Vegetables",
  "Carbs",
  "Snack",
  "Dairy & Eggs",
  "Canned food",
  "Dessert",
  "Drinks",
  "Frozen",
  "Chilled",
];

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
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:batchID", async (req, res) => {
  const batchID = req.params.batchID;
  try {
    const data = await Batch.findById(batchID, (err, oneBatch) => {
      return oneBatch;
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post(
  "/",
  // body("foodListings", "Please enter food items").notEmpty(),
  body("contactPerson").trim().optional(),
  body("contactNum", "Please enter only digits").trim().optional(),
  body("collectionAddress").trim().optional(),
  body(
    "foodListings.*.title",
    "Food title has to be at least 3 characters long"
  )
    .trim()
    .isLength({ min: 3 })
    .matches(/^[A-Za-z ]+$/)
    .withMessage("only alphabets please"),
  body("foodListings.*.quantity", "Quantity must be at least 1")
    .trim()
    .isInt({ min: 1 }),
  body("foodListings.*.weight", "Please enter weight").trim().isInt({ gt: 0 }),
  body("foodListings.*.unit", "Please select a unit").trim().notEmpty(),
  body("foodListings.*.category", "Please select at least one entry").isArray({
    min: 1,
  }),
  // body(
  //   "foodListings.*.category.*",
  //   "Only categories provided are considered valid entries"
  // ).isIn(foodCat),
  body("foodListings.*.isHalal", "Please pick an option for halal")
    .notEmpty()
    .isBoolean(),
  body("foodListings.*.isVegetarian", "Please pick an option for vegetarian")
    .notEmpty()
    .isBoolean(),
  body("foodListings.*.description").trim().optional(),
  body("foodListings.*.bestBefore", "Please enter a valid date/time").isDate(
    "DD/MM/YYYY"
  ),
  // .isAfter()
  // .withMessage("Please enter a date later than today"),
  body("foodListings.*.imgFile").optional(),

  (req, res) => {
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

router.delete("/deletebatch", (req, res) => {
  const _id = req.body.id;
  console.log(_id);
  Batch.findByIdAndDelete(_id, (err, data) => {
    if (err) return res.status(500).send(err);
    res.send(data);
  });
});

router.delete("/deletelisting/", (req, res) => {
  const batchID = req.body.batchID;
  const listID = req.body.listID;
  Batch.findById(batchID, (err, list) => {
    if (err) return res.status(404).send("oops", err);
    list.foodListings.id(listID).remove();
    list.save();
    res.send(list);
  });
});

router.put("/sdeletebatch", (req, res) => {
  const batchID = req.body.batchID;
  Batch.findById(batchID, (err, batch) => {
    batch.status = "hidden";
    for (let i = 0; i < batch.foodListings.length; i++) {
      batch.foodListings[i].status = "hidden";
    }
    batch.save((err) => {
      if (err) res.send(err);
      res.send(batch);
    });
  });
});

router.put("/sdeletelist", (req, res) => {
  const batchID = req.body.batchID;
  const listID = req.body.listID;
  Batch.findById(batchID, (err, batch) => {
    batch.foodListings.id(listID).status = "hidden";
    batch.save();
    res.send(batch);
  });
});

// need validation
router.put(
  "/edit/batch",
  body("contactPerson", "only alphabets with at least 3 letters")
    .trim()
    .optional()
    .isAlpha()
    .isLength({ min: 3 }),
  body("contactNum", "only digits at least 8 digits")
    .optional()
    .trim()
    .isInt({ gt: 9999999, lt: 100000000 }),
  body("collectionAddress", "at least 8 digits")
    .optional()
    .trim()
    .isLength({ min: 8 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const locals = { newContribution: req.body, errors: errors.array() };
      res.status(StatusCodes.BAD_REQUEST).send(locals);
    } else {
      const data = req.body;
      Batch.findById(data.batchID, (err, batch) => {
        batch.contactPerson = req.body.contactPerson;
        batch.contactNum = req.body.contactNum;
        batch.collectionAddress = req.body.collectionAddress;
        batch.save();
        res.send(batch);
      });
    }
  }
);

router.put(
  "/edit/listing",
  body("title", "Only Alphabets with at least 3 letters")
    .trim()
    .isAlpha()
    .isLength({ min: 3 }),
  body(
    "quantity",
    "Only positive integer accepted more than 0 is accepted"
  ).isInt({ gt: 0 }),
  body("foodListings.*.weight", "Please enter weight").isInt({ gt: 0 }),
  body("foodListings.*.unit", "Please select a unit").trim().notEmpty(),
  body("category", "pick at least one category").notEmpty(), //test test
  // body("category.*", "category not valid").isIn(foodCat),
  body("isHalal", "input must be true or false").isBoolean(),
  body("isVegetarian", "input must be true or false").isBoolean(),
  body("bestBefore", "Enter valid dateformat dd/mm/yyyy")
    .isDate("DD/MM/YYYY")
    .isAfter()
    .withMessage("Please enter a date later than today"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const locals = { newContribution: req.body, errors: errors.array() };
      res.status(StatusCodes.BAD_REQUEST).send(locals);
    } else {
      const data = req.body;
      console.log(data.batchID);
      Batch.findById(data.batchID, (err, batch) => {
        const listItem = batch.foodListings.id(data.listID);
        listItem.title = req.body.title;
        listItem.quantity = req.body.quantity;
        listItem.weight = req.body.weight;
        listItem.unit = req.body.unit;
        listItem.category = req.body.category;
        listItem.isHalal = req.body.isHalal;
        listItem.isVegetarian = req.body.isVegetarian;
        listItem.description = req.body.description;
        listItem.bestBefore = req.body.bestBefore;
        listItem.imgFile = req.body.imgFile;
        batch.save();
        res.send(batch);
      });
    }
  }
);

module.exports = router;
