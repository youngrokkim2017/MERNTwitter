const mongoose = require("mongoose");
//need to access schema
const Schema = mongoose.Schema:

// define what it means to be a tweet
const TweetSchema = new Schema({
    user: { // similar to activerecord assocation
        type: Schema.Types.ObjectId,
        ref: "users" // name of the model you want to associate this with,
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// pass it into the mongoose model before exporting
const Tweet = mongoose.model("tweet", TweetSchema);

module.exports = Tweet;