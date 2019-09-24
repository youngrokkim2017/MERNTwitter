const express = require("express");
const router = express.Router(); //gets a router object off the router
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

router.get("/test", (req, res) => {
    res.json({ ms: "this is the user route" }); //sends back a json string that looks like the string passed in
});

router.post('/register', (req, res) => {
    //register validations
    // call validateRegisterInput on the body
    const { errors, isValid } = validateRegisterInput(req.body);

    //check
    if (!isValid) {
        return res.status(400).json(errors);
    }



    // Check to make sure nobody has already registered with a duplicate email
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                // Throw a 400 error if the email address already exists
                return res.status(400).json({ email: "A user has already registered with this address" })
            } else {
                // Otherwise create a new user
                const newUser = new User({
                    handle: req.body.handle,
                    email: req.body.email,
                    password: req.body.password
                })

                // testing
                // newUser.save().then(user => res.send(user)).catch(err => res.send(err));

                bcrypt.genSalt(10, (err, salt) => { 
                    //10 is number of rounds doing to generate salt,,, second is a callback function when finished generating the salt and continues
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
})

router.post('./login', (req, res) => {
    //login validations
    // destructure errors and isvalid, just like for register
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    



    const email = req.body.email;
    const password = req.body.password;

    //look up a user by that email, and if the password is valid using bcrypt
    User.findOne({ email }) // findOne gives us one object,,, 
    .then( user => {
        if(!user) { //if no user, let frontend know that user doesnt exist
            return res.status(404).json({ email: "This user does not exist" });
        }

        // if made it to here, we know we have a user
        bcrypt.compare(password, user.password)
            .then(isMatch => {  //.then returns a boolean
            if(isMatch) {
                // res.json({ msg: "Success" });
                const payload = {
                    id: user.id,
                    handle: user.handle,
                    email: user.email
                }

                // use jwt to create the json webtoken
                jwt.sign(
                    payload, 
                    keys.secretOrKey,
                    { expiresIn: 3600 },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                )
            } else {    
                return res.status(400).json({ password: "Incorrect password" });
            }
        })
    })
})

module.exports = router;