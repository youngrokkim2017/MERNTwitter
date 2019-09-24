const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateTweetInput(data) {
    let errors = {};

    // check type property
    data.text = validText(data.text) ? data.text : "";

    // validator checks
    if (!Validator.isLength(data.text, { min: 5, max: 140 })) {
        errors.text = "Tweet must be between 5 and 140 chars";
    }

    // check if tweet is not empty
    if (Validator.isEmpty(data.text)) {
        errors.text = "Text field is required";
    }

    //return errors obj
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}