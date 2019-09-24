const express = require("express");
const app = express(); //this gives back an app object
const mongoose = require("mongoose");
const db = require("./config/keys.mongoURI");
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const User = requre("./models/User");
const bodyParser = require("body-parser"); //body-parser tells app what source of request it should respond to


mongoose
.connect(db, { useNewUrlParser: true }) // .connect returns a promise
.then(() => console.log("Connected to mongoDB"))
.catch(err => console.log(err));

app.use(bodyParser.urlencoded({ // app responds to responds from other apps, like postman
    extended: false
}));

app.use(bodyParser.json()); //these tells the app that it wants to respond to json

app.get("/", (requestObj, responseObj) => { //app listening for get requests
    // debugger
    const user = newUser({
        handle: "testuser",
        email: "email@email.com",
        password: "password"
    });
    user.save();
    responseObj.send("Hello a/A!");
});

app.use("/api/users", users);
app.use("/api/tweets", tweets);

// tell the object to listen to a given port
// const port = 5000;

//heroku might want us to listen to a different port
const port = process.env.PORT || 5000;

app.listen(port, () => { console.log(`listening on port ${port}`) });

