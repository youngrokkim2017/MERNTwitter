const express = require("express");
const router = express.Router(); //gets a router object off the router

router.get("/test", (req, res) => {
    res.json({ ms: "this is the tweet route" }); //sends back a json string that looks like the string passed in
});

module.exports = router;