const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // grab the fields from data object, or if they are not there then add them on to the object
    data.handle = validText(data.handle) ? data.handle : "";
    data.email = validText(data.email) ? data.email : "";
    data.password = validText(data.password) ? data.password : "";
    data.password2 = validText(data.password2) ? data.password2 : "";

    //validate handle is between 2 and 30 char long
    if (!Validator.isLength(data.handle, { min: 2, max: 30 })) {
        errors.handle = "Handle must be between 2 and 30 chars";
    }

    // make sure validator is not empty
    if (Validator.isEmpty(data.handle)) {
        errors.handle = "Handle field is required";
    }

    // check if email is empty
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }

    // check if email is an email
    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid"
    }

    // check if password is empty
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    // check length of password, between 6 and 30 chars long
    if (!Validator.isLength(data.password, { min: 2, max: 30 })) {
        errors.password = "Password must be between 2 and 30 chars";
    }

    // check if the two passwords are equal to each other
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passowrds must match";
    }

    // return errors object
    return {
        errors,
        isValid: Object.keys(error).length === 0
    }
}