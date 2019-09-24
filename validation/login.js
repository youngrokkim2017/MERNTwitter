const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function(data) {
    let errors = {}

    // make sure keys for email and password exist
    data.email = validText(data.email) ? data.email : ""
    data.password = validText(data.password) ? data.password : ""

    // now check and make sure that the email is in the format of an email
    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    // check if the email field is empty
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }

    // check if password is not empty
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    // NOW return some type of object to use later on to determine what the outcome of this function was
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}