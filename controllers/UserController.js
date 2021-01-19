const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const omit = require('just-omit')

// const isAuthenticated = (req, res, next) => {
//     if (req.session.currentUser) {
//         return next();
//     } else {
//         res.status(StatusCodes.FORBIDDEN).send({ error: "You are not authorized to view this page." });
//     }
// };

router.get("/seed", (req, res) => {
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
                // receivedList: ["id1", "id2"]
            },
            // {
            //     firstName: "Happy",
            //     lastName: "Two",
            //     organisation: "Sharity",
            //     contactNum: 60987654,
            //     email: "sharity@email.com",
            //     username: "Recipient2",
            //     password: "bbbb2222",
            //     type: "Recipient",
            //     // receivedList: ["id3"],
            // },
            // {
            //     firstName: "Yoyo",
            //     lastName: "Hu",
            //     contactNum: 69483625,
            //     email: "yoyohu@email.com",
            //     username: "Contributor1",
            //     password: "1111aaaa",
            //     type: "Contributor",
            //     // batchList: ["idA", "idB"],
            // },
            // {
            //     firstName: "Jello",
            //     lastName: "Jo",
            //     contactNum: 62857463,
            //     email: "jellojo@email.com",
            //     username: "Contributor2",
            //     password: "2222bbbb",
            //     type: "Contributor",
            //     // batchList: ["idC", "idD", "idE"],
            // }
        ],
        (error, user) => {
            if (error) {
                console.log(error)
                return res.send(error);
            }
            console.log("users", user)
            res.send("user seeded", user)

        }
    )
})

// SHOW /user/:id (user account details)
router.get("/:id", (req, res) => {
    User.findById(req.params.id, (error, user) => {
        if (error) {
            res
                .status(StatusCodes.BAD_REQUEST)
                .send({
                    ...error,
                    reason: `ERROR ${StatusCodes.BAD_REQUEST}, not valid id`,
                }); //trying to add reason in to reason {}
        } else {
            console.log("user", user)
            const usernopw = { ...user, password: '' } //return user account without password for security reasons
            res.status(StatusCodes.OK).send(usernopw);
        }
    }).lean(); //returns response.data instead of mongoose collection
})

//POST new user creation to /user
router.post("/",
    // body("firstName", "Please enter your first name.").trim().notEmpty(),
    // body("lastName", "Please enter your last name.").trim().notEmpty(),
    // body("organisation").optional().trim().isString(),
    // body("contactNum", "Please enter your 8-digit contact number.").isNumeric().isIn([{gt: 10000000, lt:99999999}]),
    // body("email", "Please enter a valid email address").isEmail(),
    body("username", "Username has to be at least 8 alphanumeric characters long.").trim().isLength({ min: 8 }),
    // body("password", "Password has to be at least 8 alphanumeric characters long.").trim().isLength({ min: 8 }).isAlphanumeric(),
    // body("type", `Choose between "Contributor", "Recipient" and "Admin"`).trim().isIn(["Contributor", "Recipient", "Admin"]),
    // body("status", `Only "Active" or "Inactive"`).trim().isIn(["Active", "Inactive"]),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Errors returned in an array `errors.array()`.
            const locals = { UserInput: req.body, errors: errors.array() };
            res.status(StatusCodes.BAD_REQUEST).send(locals);
        } else { //Data is valid
            console.log(req.body)
            //overwrite the user password with the hashed password, then pass that in to our database
            req.body.password = bcrypt.hashSync(
                req.body.password,
                bcrypt.genSaltSync()
            );
            User.create(req.body, (err, createdUser) => {
                if (err) {
                    res.status(StatusCodes.BAD_REQUEST).send(err);
                } else {
                    console.log("user is created", createdUser);
                    req.session.currentUser = createdUser
                    //req.session creates a session, we are also creating a field called currentUser = createdUser
                    res.status(StatusCodes.CREATED).send(createdUser);
                }
            });
        }
    });

//UPDATE user account
router.put("/:id",
    // body("firstName", "Please enter your first name.").optional().trim().notEmpty(),
    // body("lastName", "Please enter your last name.").optional().trim().notEmpty(),
    // body("organisation").optional().trim().isString(),
    // body("contactNum", "Please enter your 8-digit contact number.").optional().isNumeric().isIn([{gt: 10000000, lt:99999999}]),
    // body("email", "Please enter a valid email address").optional().isEmail(),
    body("username", "Username has to be at least 8 alphanumeric characters long.").optional().trim().isLength({ min: 8 }).isAlphanumeric(),
    // body("password", "Password has to be at least 8 alphanumeric characters long.").optional().trim().isLength({ min: 8 }).isAlphanumeric(),
    // body("type", `Choose between "Contributor", "Recipient" and "Admin"`).optional().trim().isIn(["Contributor", "Recipient", "Admin"]),
    // body("status", `Only "Active" or "Inactive"`).optional().trim().isIn(["Active", "Inactive"]), 

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Errors returned in an array `errors.array()`.
            const locals = { UserInput: req.body, errors: errors.array() };
            res.status(StatusCodes.BAD_REQUEST).send(locals);
        }
        // if (userInput.receivedList) { // triggers when Recipient received something
        //     User.findByIdAndUpdate(req.params.id, { $push: { receivedList: req.body.receivedList} }, { new: true }, (error, user) => {
        //         if (error) {
        //             return res.send(error)
        //         }
        //         return res.send(user)
        //     })
        // }
        // if (userInput.batchList) { // triggers when Contributor contribute something
        //     User.findByIdAndUpdate(req.params.id, { $push: { batchList: req.body.batchList} }, { new: true }, (error, user) => {
        //         if (error) {
        //             return res.send(error)
        //         }
        //         return res.send(user)
        //     })
        // }
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
    });


// DELETE or use React Axios to send DELETE and PUT
router.delete("/:id", (req, res) => {
    User.findByIdAndRemove(req.params.id, (error, user) => {
        if (error) {
            res.status(StatusCodes.BAD_REQUEST).send(error);
        } else {
            res.status(StatusCodes.OK).send(user);
        }
    });
});


module.exports = router;
