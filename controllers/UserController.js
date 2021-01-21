const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const omit = require("just-omit");
const Batch = require("../models/batch");

// const isAuthenticated = (req, res, next) => {
//     if (req.session.currentUser) {
//         return next();
//     } else {
//         res.status(StatusCodes.FORBIDDEN).send({ error: "You are not authorized to view this page." });
//     }
// };

// INDEX (show all users - admin access only)
router.get("/", (req, res) => {
    if (req.query.username) { //if there is a query, check if it exist
        console.log("req.query.username", req.query.username);
        User.find({ username: req.query.username }, (error, oneUser) => {
            if (error) {
                res.status(StatusCodes.BAD_REQUEST).send(error);
            } else { //user exist
                res.status(StatusCodes.OK).send(oneUser);
            }
        })
    } else { //return all users
        User.find({}, (error, users) => {
            if (error) {
                res.send(error);
            } else {
                res.send(users);
            }
        });
    }
});


// SEEDING
router.get("/seed", (req, res) => {
    console.log("seeding");
    User.create(
        [
            {
                firstName: "Allo",
                familyName: "Ha",
                organisation: "Big Hearts",
                contactNum: 61234567,
                email: "bighearts@email.com",
                username: "Recipient1",
                password: "aaaa1111",
                type: "Recipient",
                receivedList: ["id1", "id2"],
            },
            {
                firstName: "Happy",
                familyName: "Two",
                organisation: "Sharity",
                contactNum: 60987654,
                email: "sharity@email.com",
                username: "Recipient2",
                password: "bbbb2222",
                type: "Recipient",
                receivedList: ["id3"],
            },
            {
                firstName: "Yoyo",
                familyName: "Hu",
                contactNum: 69483625,
                email: "yoyohu@email.com",
                username: "Contributor1",
                password: "1111aaaa",
                type: "Contributor",
                contributorList: ["idA", "idB"],
            },
            {
                firstName: "Jello",
                familyName: "Jo",
                contactNum: 62857463,
                email: "jellojo@email.com",
                username: "Contributor2",
                password: "2222bbbb",
                type: "Contributor",
                contributorList: ["idC", "idD", "idE"],
            },
        ],
        (error, user) => {
            if (error) {
                console.log(error);
                return res.send({ ...error, message: "likely user already exist" });
            }
            console.log("users", user);
            res.redirect("/user");
        }
    );
});

//PUT /user/collections/new updates recipient's received list 
router.put("/collections/new", (req, res) => {
    Batch.findById(req.body.batchID, (error, batch) => {
        if (error) {
            res.status(StatusCodes.BAD_REQUEST).send({ ...error, message: "cant find batch" });
        } else { //no error in finding batch ID
            // res.send(req.body) //testing
            batch.foodListings.id(req.body.listID).status = "hidden"; //make that one listing hidden
            batch.foodListings.id(req.body.listID).recipient = req.body.userID;
            // add in recipient's user._id to the listing. // alternative (req.session.currentUser)._id
            // res.send(batch.foodListings) // testing

            batch.save((err, updatedBatch) => {
                if (err) {
                    console.log(err);
                    res.status(StatusCodes.BAD_REQUEST).send({ ...error, message: "err saving batch" });
                }
                else {
                    // res.send(result)
                    console.log("batch saved, ", updatedBatch, "now to update user...");
                    User.findByIdAndUpdate(
                        req.body.userID, // alternative:  (req.session.currentUser)._id or req.params.id
                        { $push: { receivedList: { batchId: req.body.batchID, listingId: req.body.listID } } }, // req.body, // what to update: 
                        { upsert: true, new: true }, //upsert doesnt seem to be working, will add duplicate if click twice
                        (error, updatedUser) => {
                            if (error) {
                                res.status(StatusCodes.BAD_REQUEST).send(error);
                            } else {
                                res.status(StatusCodes.OK).send(updatedUser);
                            }
                        }
                    )
                };
            })
        }
    });
})

//PUT /user/mycontributions/new updates Contributor's çonstribution list
router.put("/contributions/new", (req, res) => {
    User.findByIdAndUpdate(
        req.body.userID, // alternative:  (req.session.currentUser)._id or req.params.id 
        { $push: { contributedList: req.body.batchID } }, // req.body, // what to update: 
        { upsert: true, new: true },
        (error, updatedUser) => {
            if (error) {
                res.status(StatusCodes.BAD_REQUEST).send(error);
            } else {
                res.status(StatusCodes.OK).send(updatedUser);
            }
        }
    );
});

// SHOW /user/:id (user account details)
router.get("/:id", (req, res) => {
    User.findById(req.params.id, (error, user) => {
        if (error) {
            res.status(StatusCodes.BAD_REQUEST).send({
                ...error,
                reason: `ERROR ${StatusCodes.BAD_REQUEST}, not valid id`,
            }); //trying to add reason in to reason {}
        } else {
            console.log("user", user);
            const usernopw = { ...user, password: "" }; //return user account without password for security reasons
            res.status(StatusCodes.OK).send(usernopw);
        }
    }).lean(); //returns response.data instead of mongoose collection
});

//POST new user creation to /user
router.post(
    "/",
    body("firstName", "Please enter your first name.").trim().notEmpty(),
    body("familyName", "Please enter your last name.").trim().notEmpty(),
    body("organisation").optional().trim().isString(),
    body("contactNum", "Please enter a valid 8-digit contact number.").isNumeric().isInt({ gt: 10000000, lt: 99999999 }),
    body("email", "Please enter a valid email address").isEmail(),
    body("username", "Username has to be at least 8 alphanumeric characters long.").trim().isLength({ min: 8 }),
    body("password", "Password has to be at least 8 alphanumeric characters long.").trim().isLength({ min: 8 }).isAlphanumeric(),
    body("type", `Choose between "Contributor", "Recipient" and "Admin"`).trim().isIn(["Contributor", "Recipient", "Admin"]),
    body("status", `Only "Active" or "Inactive"`).optional().trim().isIn(["Active", "Inactive"]),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Errors returned in an array `errors.array()`.
            const locals = { UserInput: req.body, errors: errors.array() };
            res.status(StatusCodes.BAD_REQUEST).send(locals);
        } else {
            //Data is valid
            console.log(req.body);
            //overwrite the user password with the hashed password, then pass that in to our database
            req.body.password = bcrypt.hashSync(
                req.body.password,
                bcrypt.genSaltSync()
            );
            User.create(req.body, (err, createdUser) => {
                if (err) {
                    res.status(StatusCodes.BAD_REQUEST).send(err);
                } else {
                    console.log("user is created");
                    req.session.currentUser = createdUser;
                    //req.session creates a session, we are also creating a field called currentUser = createdUser
                    res.status(StatusCodes.CREATED).send(createdUser);
                }
            });

        }
    }
);

//UPDATE user account
router.put(
    "/:id",
    body("firstName", "Please enter your first name.").optional().trim().notEmpty(),
    body("familyName", "Please enter your last name.").optional().trim().notEmpty(),
    body("organisation").optional().trim().isString(),
    body("contactNum", "Please enter a valid 8-digit contact number.").optional().isNumeric().isInt({ gt: 10000000, lt: 99999999 }),
    body("email", "Please enter a valid email address").optional().isEmail(),
    body("username", "Username has to be at least 8 alphanumeric characters long.").optional().trim().isLength({ min: 8 }).isAlphanumeric(),
    body("password", "Password has to be at least 8 alphanumeric characters long.").optional().trim().isLength({ min: 8 }).isAlphanumeric(),
    body("type", `Choose between "Contributor", "Recipient" and "Admin"`).optional().trim().isIn(["Contributor", "Recipient", "Admin"]),
    body("status", `Only "Active" or "Inactive"`).optional().trim().isIn(["Active", "Inactive"]),

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Errors returned in an array `errors.array()`.
            const locals = { UserInput: req.body, errors: errors.array() };
            res.status(StatusCodes.BAD_REQUEST).send(locals);
        }
        else {// when user update account page
            if (req.body.password && req.body.password !== "") {//user changes password
                req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync())
            } else if (req.body.password === "") { // users didnt change password, remove the field "password"
                delete req.body.password
            }
            User.findByIdAndUpdate(
                req.params.id, // id
                req.body, // what to update
                { new: true },
                (error, updatedUser) => {
                    if (error) {
                        res.status(StatusCodes.BAD_REQUEST).send(error);
                    } else {
                        res.status(StatusCodes.OK).send(updatedUser);
                    }
                }
            );
        }
    }
);

// // DELETE (not used as we inactivate the user instead)
// router.delete("/:id", (req, res) => {
//     User.findByIdAndRemove(req.params.id, (error, user) => {
//         if (error) {
//             res.status(StatusCodes.BAD_REQUEST).send(error);
//         } else {
//             res.status(StatusCodes.OK).send(user);
//         }
//     });
// });

module.exports = router;
