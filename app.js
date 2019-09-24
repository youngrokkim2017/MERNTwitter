const express = require("express");
const app = express(); //this gives back an app object

app.get("/", (requestObj, responseObj) => { //app listening for get requests
    responseObj.send("Hello a/A!");
});

// tell the object to listen to a given port
// const port = 5000;

//heroku might want us to listen to a different port
const port = process.env.PORT || 5000;

app.listen(port, () => { console.log(`listening on port ${port}`) });

