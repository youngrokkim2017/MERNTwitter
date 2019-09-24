const express = require("express");
const router = express.Router(); //gets a router object off the router
const passport = require("passport");
const validateTweetInput = require("../../validation/tweets");
// import tweets models
const Tweet = require("../../models/Tweet");

router.get("/test", (req, res) => {
    res.json({ ms: "this is the tweet route" }); //sends back a json string that looks like the string passed in
});

// create routes we can use with our tweets router
// index GET route, to get all the tweets
router.get("/", (req, res) => {
    // no passport authenticate b/c doesnt matter which user
    
    Tweet
    .find() // no parameters, so get everything back
    .sort({ date: -1 })  // sort by date reversed
    .then(tweets => res.json(tweets))
    .catch(err => res.status(400).json(err))
});

// use this router to look up tweets by given user
router.get("/user/:user_id", (req, res) => {
    // find the tweets by the given id
    Tweet
    .find({ user: req.params.user_id })
    .then(tweets => res.json(tweets))
    .catch(err => res.status(400).json(err))
});

// GET to a specific id
router.get("/:id", (req, res) => {
    Tweet
    .findById(req.params.id)
    .then(tweet = res.json(tweet))
    .catch(err => res.status(400).json(err))    
});


router.post("/", (req, res) => {
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        // validate that the tweet has text and will work 
        // destructure isValid and errors from validation/ttweets
        const { isValid, errors } = validateTweetInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        // if nmade it to here, successfully made a tweet
        const newTweet = new Tweet({
            user: req.user.id,
            text: req.body.text
        });

        // save tweet and send response back
        newTweet.save()
        .then(tweet => res.json(tweet));
    }
})

module.exports = router;