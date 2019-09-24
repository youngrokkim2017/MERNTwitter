const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("user");
const keys = require("./keys");

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); //built in method to pass in jwt
// extracts bearerwebtoken the way we want it
options.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(new JwtStrategy(options, (jwt_payload, done) => { //takes in options hash, and takes in callback
        console.log(jwt_payload);
        done(); // done says the function has finished running and hands it off to the next. passport doesn't just hang
    })) 
}